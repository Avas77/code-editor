import React from "react";

function App() {
  const [code, setCode] = React.useState("");
  const [convertedCode, setConvertedCode] = React.useState("");

  const onSubmitCode = () => {};

  return (
    <div>
      <textarea value={code} />
      <div>
        <button onClick={onSubmitCode}>Submit</button>
      </div>
      <pre></pre>
    </div>
  );
}

export default App;
