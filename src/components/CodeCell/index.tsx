import React, { useRef } from "react";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import CodeEditor from "../Editor/Editor";
import Preview from "../Preview";
import bundler from "../../bundler";

function CodeCell() {
  const iframe = useRef<any>();
  const [code, setCode] = React.useState("");

  const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener("message", (event) => {
            try {
              eval(event.data)
            } catch (err){
              const root = document.getElementById('root');
              root.innerHTML = '<div style="color: red;">' + err + '</div>';
              throw err;
            }
          }, false)
        </script>
      </body>
    </html>
  `;

  const onCodeChange = (value?: string) => {
    if (value) {
      setCode(value);
    } else {
      setCode("");
    }
  };

  const onSubmitCode = async () => {
    const output = await bundler(code);
    iframe.current.srcdoc = html;
    iframe.current.contentWindow.postMessage(output, "*");
  };

  return (
    <div>
      <CodeEditor initialValue={code} handleChange={onCodeChange} />
      <div>
        <button onClick={onSubmitCode}>Submit</button>
      </div>
      <Preview html={html} iframe={iframe} />
    </div>
  );
}

export default CodeCell;
