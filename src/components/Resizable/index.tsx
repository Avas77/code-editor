import React from "react";
import "./styles.css";
import { ResizableBox } from "react-resizable";

interface IProps {
  direction: "horizontal" | "vertical";
  children: React.ReactNode;
}

const Resizable = ({ children, direction }: IProps) => {
  return (
    <ResizableBox width={Infinity} height={1000} resizeHandles={["s"]}>
      {children}
    </ResizableBox>
  );
};

export default Resizable;
