import React from "react";

interface IProps {
  html: string;
  iframe: React.MutableRefObject<any>;
}

const Preview = ({ html, iframe }: IProps) => {
  return (
    <iframe
      sandbox="allow-scripts"
      srcDoc={html}
      title="output"
      ref={iframe}
      style={{ backgroundColor: "#fff" }}
    />
  );
};

export default Preview;
