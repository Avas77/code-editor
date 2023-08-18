import { Editor } from "@monaco-editor/react";
import React, { Fragment, useRef } from "react";
import prettier from "prettier";
import parser from "prettier/parser-babel";

interface EditorProps {
  initialValue: string;
  handleChange: (value?: string) => void;
}

const CodeEditor = ({ initialValue, handleChange }: EditorProps) => {
  const editorRef = useRef<any>(null);
  const onEditorMountChange = (editor: any) => {
    editorRef.current = editor;
  };

  const onFormatClick = () => {
    if (editorRef.current) {
      // get current value from editor
      const unformatted = editorRef.current.getModel().getValue();

      // format that value
      const formatted = prettier.format(unformatted, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      });

      // set the formatted value back in the editor
      editorRef.current.setValue(formatted);
    }
  };

  return (
    <Fragment>
      <button onClick={onFormatClick}>Format</button>
      <Editor
        onMount={onEditorMountChange}
        onChange={(value) => handleChange(value)}
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
    </Fragment>
  );
};

export default CodeEditor;
