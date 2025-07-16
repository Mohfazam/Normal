import Editor from "react-medium-editor";
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';
import { useState } from "react";

export const TextEditor = () => {
  const [text, setText] = useState("User content");

  const handleChange = (newText: string) => {
    setText(newText);
  };

  return (
    <div>
      <h1>React Medium Editor Demo</h1>

      <h2>Editable Content</h2>

      <Editor
        tag="div"
        text={text}
        onChange={handleChange}
        options={{
          toolbar: {
            buttons: ["bold", "italic", "underline"]
          },
        }}
      />

      <h3>Output Preview:</h3>
      <div dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
};
