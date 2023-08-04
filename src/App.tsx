import React, { useEffect, useRef } from "react";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";

function App() {
  const ref = useRef<esbuild.Service>();
  const [code, setCode] = React.useState("");
  const [convertedCode, setConvertedCode] = React.useState("");

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "/esbuild.wasm",
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
      plugins: [unpkgPathPlugin(code)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });
    console.log({ result });
    setConvertedCode(result.outputFiles[0].text);
  };
  console.log({ code });
  return (
    <div>
      <textarea value={code} onChange={onCodeChange} />
      <div>
        <button onClick={onSubmitCode}>Submit</button>
      </div>
      <pre>{convertedCode}</pre>
    </div>
  );
}

export default App;
