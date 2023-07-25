import React from "react";

function App() {
  const [code, setCode] = React.useState("");
  const [convertedCode, setConvertedCode] = React.useState("");

  const onCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(event.target.value);
  };

  const onSubmitCode = () => {
    console.log({ code });
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
