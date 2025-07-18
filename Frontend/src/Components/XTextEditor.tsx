// import './styles.css'
// export const XtextEditor = () => {
//     return (
//         <div>
//             X Text Editor
//         </div>
//     )
// }
import { EditorContent, useEditor } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
// import React, { useEffect } from 'react'
import { Placeholder } from '@tiptap/extensions'

export const XtextEditor = () => {
  const editor = useEditor({
    extensions: [
        StarterKit,
        Placeholder.configure({
            placeholder: "Write Something"
        })
    ], 
    content:"Hello nigga"
  })


  return (
    <>

      {editor && (
        <BubbleMenu editor={editor} options={{ placement: 'bottom', offset: 8 }}>
          <div className="bubble-menu">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive('bold') ? 'is-active' : ''}
              type="button"
            >
              Bold
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive('italic') ? 'is-active' : ''}
              type="button"
            >
              Italic
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={editor.isActive('strike') ? 'is-active' : ''}
              type="button"
            >
              Strike
            </button>
            <div>
                wekcnwdnc 
            </div>
            
          </div>
        </BubbleMenu>
      )}

        
      <EditorContent editor={editor} />
    </>
  )
}