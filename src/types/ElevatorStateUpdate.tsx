import FloorRequest from "./FloorRequest";

type ElevatorStateUpdate = {
  queue: Array<FloorRequest>,
  direction: string,
  currentFloor: number,
  yOffset: number
};

export default ElevatorStateUpdate;
