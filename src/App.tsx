import React, { useEffect, useRef } from "react";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";
import CodeEditor from "./components/Editor";

function App() {
  const ref = useRef<esbuild.Service>();
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

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const onCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(event.target.value);
  };

  const onSubmitCode = async () => {
    if (!ref.current) {
      return;
    }
    const result = await ref.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(code)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, "*");
  };

  return (
    <div>
      <CodeEditor initialValue={code} />
      <textarea value={code} onChange={onCodeChange} />
      <div>
        <button onClick={onSubmitCode}>Submit</button>
      </div>
      <iframe
        sandbox="allow-scripts"
        srcDoc={html}
        title="output"
        ref={iframe}
      />
    </div>
  );
}

export default App;
