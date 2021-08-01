import FloorRequest from "../types/FloorRequest";

class ElevatorState {
  queue: Array<FloorRequest>;
  isMoving: Boolean;
  currentFloor: number;
  direction: string;
  movementTimeout: ReturnType<typeof setTimeout>;
  waitTimeout: ReturnType<typeof setTimeout>;
  raf: any;
  offset: number;
  events: any;
  onUpdate: Function;

  constructor() {
    this.queue = [];
    this.isMoving = false;
    this.currentFloor = 0;
    this.direction = "up";
    this.movementTimeout = null;
    this.raf = null;
    this.simulate();
  }

  // Function that is called from the elevator to go to a certain floor.
  addFloor(floor: number) {
    if (this.queue.findIndex((f) => f.floor === floor) !== -1) {
      return;
    }
    const direction = floor > this.currentFloor ? "up" : "down";
    this.queue.push({ floor, direction });
    this.sendUpdate();
  }

  // Function that is called from a floor to request an elevator.
  requestFloor(floor: number, direction: String) {
    if (this.queue.findIndex((f) => f.floor === floor) !== -1) {
      return;
    }
    this.stop();
    this.queue.push({ floor, direction });
    this.queue = this.optimize(this.queue, this.direction);
    this.sendUpdate();
  }

  // Function that optimizes the route.
  optimize(queue: Array<FloorRequest>, direction: String) {
    const onRoute = [...queue.filter((f) => f.direction === direction)].sort(
      (a, b) => {
        if (direction === "up") {
          if (a.floor > b.floor) return 1;
          else if (a.floor < b.floor) return -1;
          return 0;
        }
        if (a.floor > b.floor) return -1;
        else if (a.floor < b.floor) return 1;
        return 0;
      }
    );

    const offRoute = queue
      .filter((f) => f.direction !== null && f.direction !== direction)
      .sort((a, b) => {
        if (direction === "up") {
          if (a.floor > b.floor) return -1;
          else if (a.floor < b.floor) return 1;
          return 0;
        }
        if (a.floor > b.floor) return 1;
        else if (a.floor < b.floor) return -1;
        return 0;
      });

    return [...onRoute, ...offRoute];
  }

  // Function that stops the elevator so it can reevaluate its route.
  stop() {
    clearTimeout(this.movementTimeout);
    clearTimeout(this.waitTimeout);
    this.isMoving = false;
    cancelAnimationFrame(this.raf);
    this.raf = window.requestAnimationFrame(() => this.simulate());
  }

  // Function that simulates the moving elevator.
  async simulate() {
    if (this.queue.length > 0 && !this.isMoving) {
      this.isMoving = true;

      const { floor, direction } = this.queue[0];
      this.direction = floor > this.currentFloor ? "up" : "down";
      this.offset = calculateOffset(floor);

      this.sendUpdate();
      this.call("wait", true);

      await this.moveToFloor(floor);

      this.currentFloor = floor;
      this.queue.shift();
      this.sendUpdate();

      this.call("wait", false);

      await this.waitAtFloor();

      this.isMoving = false;
    }

    this.raf = window.requestAnimationFrame(() => this.simulate());
  }

  // Function that simulates moving to a floor.
  moveToFloor(floor: number) {
    return new Promise((resolve, reject) => {
      this.movementTimeout = setTimeout(resolve, 3000);
    });
  }

  // Function that simulates waiting on a floor.
  waitAtFloor() {
    return new Promise((resolve, reject) => {
      this.waitTimeout = setTimeout(resolve, 3000);
    });
  }

  // Helper function to send updates to subscribed components.
  sendUpdate() {
    this.call("update", {
      queue: this.queue,
      direction: this.direction,
      currentFloor: this.currentFloor,
      yOffset: this.offset
    });
  }

  // EventEmitter on, used for registering subscribers.
  on(namespace: string, callback: Function) {
    if (!this.events) {
      this.events = {};
    }

    if (!this.events.hasOwnProperty(namespace)) {
      this.events[namespace] = [];
    }

    this.events[namespace].push(callback);
  }

  // EventEmitter call, used for calling subscribers.
  call(...args: any[]) {
    const namespace = args.shift();
    if (this.events.hasOwnProperty(namespace)) {
      this.events[namespace].forEach((cb: Function) => {
        cb(...args);
      });
    }
  }
}

// Function that calculates a y offset for a given floor.
const calculateOffset = (floor: number) => {
  return floor * 132;
};

export default new ElevatorState();
