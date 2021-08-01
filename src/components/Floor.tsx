import React from "react";
import styled from "styled-components";

import ElevatorState from "../context/ElevatorState";

import FloorRequest from "../types/FloorRequest";
import ElevatorStateUpdate from "../types/ElevatorStateUpdate";

import { FaArrowUp, FaArrowDown } from "react-icons/fa";

interface IProps {
  className?: string;
  index: number;
  total: number;
}

const Floor: React.FC<IProps> = styled((props: IProps) => {
  const [data, setData] = React.useState({
    queue: []
  });

  const queuedFloorIndex: number = data.queue.findIndex(
    (j: { floor: number }) => j.floor === props.index
  );
  const queuedFloor: FloorRequest = data.queue[queuedFloorIndex];
  const isQueued: Boolean = queuedFloorIndex !== -1;

  React.useEffect(() => {
    // Subscribe to the update event.
    ElevatorState.on("update", (update: ElevatorStateUpdate) => {
      setData(update);
    });
  }, []);

  return (
    <div className={props.className}>
      <div className="floor">Floor {props.index + 1}</div>
      <div className="buttons">
        {props.index + 1 !== props.total && (
          <button onClick={() => ElevatorState.requestFloor(props.index, "up")}>
            <FaArrowUp
              color={
                isQueued && queuedFloor.direction === "up"
                  ? "var(--accentColor)"
                  : "#000"
              }
            />
          </button>
        )}
        {props.index !== 0 && (
          <button
            onClick={() => ElevatorState.requestFloor(props.index, "down")}
          >
            <FaArrowDown
              color={
                isQueued && queuedFloor.direction === "down"
                  ? "var(--accentColor)"
                  : "#000"
              }
            />
          </button>
        )}
      </div>
    </div>
  );
})`
  display: flex;
  align-items: center;
  margin-top: 12px;

  .floor {
    width: var(--floorSize);
    height: var(--floorSize);
    background-color: #4d4d68;
    border-radius: var(--borderRadius);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin-right: 12px;
  }

  .buttons {
    display: flex;
    flex-direction: column;

    button {
      border: 0;
      outline: 0;
      border-radius: 50%;
    }
  }
`;

export default Floor;
