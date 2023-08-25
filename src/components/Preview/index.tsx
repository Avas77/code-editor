import React from "react";
import "./styles.css";

interface IProps {
  html: string;
  iframe: React.MutableRefObject<any>;
}

const Preview = ({ html, iframe }: IProps) => {
  return (
    <div className="preview-wrapper">
      <iframe
        sandbox="allow-scripts"
        srcDoc={html}
        title="output"
        ref={iframe}
        style={{ backgroundColor: "#fff" }}
      />
    </div>
  );
};

export default Preview;
