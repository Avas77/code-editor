import { Editor } from "@monaco-editor/react";
import { useRef } from "react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import "./Editor.css";

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
      const unformatted = editorRef.current.getModel().getValue();
      const formatted = prettier.format(unformatted, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      });
      editorRef.current.setValue(formatted);
    }
  };

  return (
    <div className="editor-wrapper">
      <button
        onClick={onFormatClick}
        className="button button-format is-primary is-small"
      >
        Format
      </button>
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
    </div>
  );
};

export default CodeEditor;
