import React from "react";
import "./styles.css";
import { ResizableBox } from "react-resizable";

interface IProps {
  direction: "horizontal" | "vertical";
  children: React.ReactNode;
}

const Resizable = ({ children, direction }: IProps) => {
  return (
    <ResizableBox
      width={Infinity}
      height={1000}
      resizeHandles={["s"]}
      maxConstraints={[Infinity, window.innerHeight * 0.9]}
      minConstraints={[Infinity, 24]}
    >
      {children}
    </ResizableBox>
  );
};

export default Resizable;
