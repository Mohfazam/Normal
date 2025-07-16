import './styles.css'
import { useEditor, EditorContent } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import { Heading } from '@tiptap/extension-heading'
import { useState } from 'react'

interface TextEditorProps {
  Editable: boolean;
}

export const TextEditor = ({ Editable }: TextEditorProps) => {
  const [content, setContent] = useState({
    title: '',
    body: '',
  })

  const headingEditor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      Heading.configure({ levels: [1, 2, 3] }),
    ],
    content: '<h1>Title goes here</h1>',
    editable: Editable,
  })

  const bodyEditor = useEditor({
    extensions: [StarterKit],
    content: '<p>Start writing your story...</p>',
    editable: Editable,
  })

  const handleSave = () => {
    if (headingEditor && bodyEditor) {
      setContent({
        title: headingEditor.getHTML(),
        body: bodyEditor.getHTML(),
      })
    }
  }

  const renderBubbleMenu = (editor: any) => (
    // @ts-ignore
    <BubbleMenu editor={editor} tippyOptions={{ duration: 0 }}>
      <div className="bubble-menu">
        {['bold', 'italic', 'strike'].map((format) => (
          <button
            key={format}
            onClick={() =>
              editor
                .chain()
                .focus()
                [`toggle${format[0].toUpperCase()}${format.slice(1)}`]()
                .run()
            }
            className={editor.isActive(format) ? 'is-active' : ''}
          >
            {format}
          </button>
        ))}
      </div>
    </BubbleMenu>
  )

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: 'auto' }}>
      <button onClick={handleSave} style={{ marginBottom: '1rem' }}>
        Save Content
      </button>

      {headingEditor && renderBubbleMenu(headingEditor)}
      <EditorContent editor={headingEditor} className="heading-editor" />

      {bodyEditor && renderBubbleMenu(bodyEditor)}
      <EditorContent editor={bodyEditor} className="body-editor" />

      <hr style={{ margin: '2rem 0' }} />
      <h3>🧾 Preview Saved Content</h3>
      <div dangerouslySetInnerHTML={{ __html: content.title }} />
      <div dangerouslySetInnerHTML={{ __html: content.body }} />
    </div>
  )
}
