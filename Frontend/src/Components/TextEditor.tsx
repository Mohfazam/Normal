import Editor from "react-medium-editor";

import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';

export const TextEditor = () => {
    return (
        <div>
            {Editor}
            Text Editor
        </div>
    )    
}