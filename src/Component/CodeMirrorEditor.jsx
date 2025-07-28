import { useEffect, useRef } from 'react'
import { EditorView, basicSetup } from '@codemirror/basic-setup';
import { javascript } from '@codemirror/lang-javascript';
import { EditorState } from "@codemirror/state";

export const CodeMirrorEditor = ({ value , onchange, status,height="600px" }) => {
  const editor = useRef();

  useEffect(() => {
    const customTheme = EditorView.theme({
      "&": {
        backgroundColor: status === "dark" ? "#6b6b70" : "white",
        color: status === "dark" ? "white" : "#1e1e1e",
        fontSize: "16px",
        borderRadius: "8px",
        height,
        border: "none",
      },
      ".cm-content": {
        fontFamily: "Fira Code, monospace",
        padding: "10px",
        color: status === "dark" ? "white" : "#1e1e1e",
      },
      ".cm-gutters": {
        backgroundColor: status === "dark" ? "#1a1a1a" : "#f5f5f5",
        color: status === "dark" ? "#888" : "#333",
      },
      ".cm-line":{
        backgroundColor: status === "dark" ? "#102754" : "#f3f9ff",
      },
    });

    const startState = EditorState.create({
      doc: value,
      extensions: [
        basicSetup,
        javascript(),
        customTheme,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            const doc = update.state.doc;
            const text = doc.toString();
            onchange?.(text);
          }
        }),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: editor.current,
    });

    return () => view.destroy();
  }, [status,onchange]);


  return (
    <div ref={editor}></div>
  );
};
