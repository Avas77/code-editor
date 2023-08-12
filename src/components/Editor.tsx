import { Editor } from "@monaco-editor/react";
import React from "react";

interface EditorProps {
  initialValue: string;
}

const CodeEditor = ({ initialValue }: EditorProps) => {
  return (
    <Editor
      value={initialValue}
      height="500px"
      language="javascript"
      theme="vs-dark"
      options={{
        wordWrap: "on",
        minimap: {
          enabled: false,
        },
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  );
};

export default CodeEditor;
