import React from "react";
import styled from "styled-components";
import cn from "classnames";

import ElevatorState from "../context/ElevatorState";
import ElevatorStateUpdate from "../types/ElevatorStateUpdate";

interface IProps {
  className: string;
}

const Elevator: React.FC = styled((props: IProps) => {
  const progressRef = React.useRef();

  const [data, setData] = React.useState({
    queue: [],
    direction: "up",
    currentFloor: 0,
    yOffset: 0
  });

  React.useEffect(() => {
    // Subscribe to the update event.
    ElevatorState.on("update", (update: ElevatorStateUpdate) => {
      setData(update);
    });
  }, []);

  React.useEffect(() => {
    // Effect that subscribes to the wait event on the elevator.
    // This will trigger and reset that wait timer.
    if (progressRef.current) {
      ElevatorState.on("wait", (state: Boolean) => {
        const progress: any = progressRef.current;
        progress.style.transform = state
          ? `scale3d(1, 1, 1)`
          : `scale3d(0, 1, 1)`;
        if (state) {
          progress.classList.remove("animate");
        } else {
          progress.classList.add("animate");
          setTimeout(() => {
            progress.classList.remove("animate");
            progress.style.transform = `scale3d(1, 1, 1)`;
          }, 3000);
        }
      });
    }
  }, [progressRef.current]);

  return (
    <div
      className={props.className}
      style={{
        transform: `translate3d(0px, -${data.yOffset}px, 0)`,
        transition: `transform 3s linear`
      }}
    >
      <span>
        {data.currentFloor + 1} {data.direction}
      </span>
      <div className="buttons">
        {Array.from(Array(5)).map((_, i) => {
          const isQueued = data.queue.findIndex((j) => j.floor === i) !== -1;
          const buttonClass = cn({
            active: isQueued,
            current: data.currentFloor === i
          });

          return (
            <button
              key={i}
              className={buttonClass}
              onClick={() => ElevatorState.addFloor(i)}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
      <div className="progress">
        <div className="bar" ref={progressRef} />
      </div>
    </div>
  );
})`
  position: absolute;
  bottom: 0;
  left: 0;

  border-radius: var(--borderRadius);
  width: var(--floorSize);
  height: var(--floorSize);
  background-color: #13b38b;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    color: white;
    padding: 4px 12px;
    background-color: #000;
    border-radius: var(--borderRadius);
    margin-bottom: 8px;
  }

  .buttons {
    display: flex;
    flex-wrap: wrap;
    width: 48px;

    button {
      flex: 0 1 calc(50% - 4px);
      border-radius: 50%;
      border: 0;

      display: flex;
      align-items: center;
      justify-content: center;

      width: 20px;
      height: 20px;
      margin: 2px;
      font-weight: bold;

      &.active {
        border: 1px solid var(--accentColor);
        color: var(--accentColor);
      }

      &.current {
        background-color: var(--accentColor);
        color: white;
      }
    }
  }

  .progress {
    width: calc(100% - 8px);
    margin: 2px;
    height: 2px;
    background-color: white;
    border-radius: 1px;

    .bar {
      height: 100%;
      width: 100%;
      background-color: var(--accentColor);
      border-radius: 1px;
      transform: scale3d(1, 1, 1);
      transform-origin: center left;
      transition: unset;

      &.animate {
        transition: transform 3s linear;
      }
    }
  }
`;

export default Elevator;
