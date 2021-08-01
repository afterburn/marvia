import React from "react";
import styled from "styled-components";

import Floor from "./Floor";
import Elevator from "./Elevator";

interface IProps {
  className: string;
}

const Building: React.FC = styled((props: IProps) => {
  return (
    <div className={props.className}>
      {Array.from(Array(5)).map((_, i) => {
        return <Floor key={i} index={4 - i} total={5} />;
      })}
      <Elevator />
    </div>
  );
})`
  position: relative;
`;

export default Building;
