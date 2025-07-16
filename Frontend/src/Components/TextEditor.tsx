import { useEditor, EditorContent } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import { Heading } from '@tiptap/extension-heading'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import Blockquote from '@tiptap/extension-blockquote'
import Code from '@tiptap/extension-code'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { useState } from 'react'
import { common, createLowlight } from 'lowlight'

const lowlight = createLowlight(common)

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
      Underline,
      TextAlign.configure({ types: ['heading'] }),
      Link.configure({
        openOnClick: true,
        HTMLAttributes: { class: 'text-blue-500 hover:underline' }
      }),
    ],
    content: '<h1>Title goes here</h1>',
    editable: Editable,
  })

  const bodyEditor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ['paragraph', 'heading'] }),
      Link.configure({
        openOnClick: true,
        HTMLAttributes: { class: 'text-blue-500 hover:underline' }
      }),
      BulletList.configure({
        HTMLAttributes: { class: 'list-disc pl-5' },
      }),
      OrderedList.configure({
        HTMLAttributes: { class: 'list-decimal pl-5' },
      }),
      Blockquote.configure({
        HTMLAttributes: { class: 'border-l-4 border-gray-300 pl-4 italic' },
      }),
      Code.configure({
        HTMLAttributes: { class: 'bg-gray-100 p-1 rounded' },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: { class: 'bg-gray-800 text-gray-100 p-4 rounded' },
      }),
    ],
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
      <div className="flex gap-1 p-1 bg-white border border-gray-200 rounded shadow-md">
        {[
          { label: 'Bold', command: 'toggleBold', icon: 'B' },
          { label: 'Italic', command: 'toggleItalic', icon: 'I' },
          { label: 'Strike', command: 'toggleStrike', icon: 'S' },
          { label: 'Underline', command: 'toggleUnderline', icon: 'U' },
          { label: 'Align Left', command: 'setTextAlign', args: ['left'], icon: '⬅' },
          { label: 'Align Center', command: 'setTextAlign', args: ['center'], icon: '⨀' },
          { label: 'Align Right', command: 'setTextAlign', args: ['right'], icon: '➡' },
        ].map(({ label, command, args = [], icon }) => (
          <button
            key={label}
            onClick={() => editor.chain().focus()[command](...args).run()}
            className={`p-2 rounded hover:bg-gray-100 ${
              editor.isActive(command.replace('toggle', '').toLowerCase()) ||
              (command === 'setTextAlign' && editor.isActive({ textAlign: args[0] }))
                ? 'bg-gray-200'
                : ''
            }`}
            title={label}
          >
            {icon}
          </button>
        ))}
      </div>
    </BubbleMenu>
  )
    console.log(content);
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <button 
        onClick={handleSave} 
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Save Content
      </button>

      {headingEditor && renderBubbleMenu(headingEditor)}
      <EditorContent 
        editor={headingEditor} 
        className="heading-editor border border-gray-300 rounded p-4 mb-6 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-blue-300"
      />

      {bodyEditor && renderBubbleMenu(bodyEditor)}
      <EditorContent 
        editor={bodyEditor} 
        className="body-editor border border-gray-300 rounded p-4 min-h-[200px] focus:outline-none focus:ring-2 focus:ring-blue-300"
      />

      <hr className="my-8 border-t border-gray-300" />
      <h3 className="text-xl font-bold mb-4">🧾 Preview Saved Content</h3>
      
      <div className="preview-section mb-6 p-4 bg-gray-50 rounded border border-gray-200">
        <div 
          className="prose max-w-none" 
          dangerouslySetInnerHTML={{ __html: content.title }} 
        />
        <div 
          className="prose max-w-none" 
          dangerouslySetInnerHTML={{ __html: content.body }} 
        />
      </div>
    </div>
  )
}