import React, { useEffect, useRef } from "react";
import * as esbuild from "esbuild-wasm";

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

  const onSubmitCode = () => {
    if(!ref.current){
      return;
    }
    console.log(ref.current);
  };

  return (
    <div>
      <textarea value={code} onChange={onCodeChange} />
      <div>
        <button onClick={onSubmitCode}>Submit</button>
      </div>
      <pre></pre>
    </div>
  );
}

export default App;
