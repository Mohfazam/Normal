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
import { useState, useEffect } from 'react'
import { common, createLowlight } from 'lowlight'

const lowlight = createLowlight(common)


const DEFAULT_TITLE = '<h1>Title goes here</h1>'
const DEFAULT_BODY = '<p>Start writing your story...</p>'

interface TextEditorProps {
  editable: boolean;
  initialTitle?: string;
  initialBody?: string;
  onSave: (content: { title: string; body: string }) => void;
}

export const TextEditor = ({ 
  editable,
  initialTitle = DEFAULT_TITLE,
  initialBody = DEFAULT_BODY,
  onSave 
}: TextEditorProps) => {
  
  const [previewTitle, setPreviewTitle] = useState(initialTitle)
  const [previewBody, setPreviewBody] = useState(initialBody)

  const headingEditor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      Heading.configure({ 
        levels: [1, 2, 3],
        HTMLAttributes: {
          class: 'font-serif font-bold tracking-tight'
        }
      }),
      Underline,
      TextAlign.configure({ types: ['heading'] }),
      Link.configure({
        openOnClick: true,
        HTMLAttributes: { class: 'text-green-600 hover:underline' }
      }),
    ],
    content: initialTitle,
    editable: editable,
    editorProps: {
      attributes: {
        class: 'focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      setPreviewTitle(editor.getHTML())
    },
  })

  const bodyEditor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: 'font-serif text-xl leading-8 mb-6 text-gray-700'
          }
        }
      }),
      TextAlign.configure({ types: ['paragraph', 'heading'] }),
      Link.configure({
        openOnClick: true,
        HTMLAttributes: { class: 'text-green-600 hover:underline' }
      }),
      BulletList.configure({
        HTMLAttributes: { class: 'list-disc pl-10 mb-6' },
      }),
      OrderedList.configure({
        HTMLAttributes: { class: 'list-decimal pl-10 mb-6' },
      }),
      Blockquote.configure({
        HTMLAttributes: { 
          class: 'border-l-4 border-gray-300 pl-6 italic my-6 py-2 text-gray-600' 
        },
      }),
      Code.configure({
        HTMLAttributes: { class: 'bg-gray-100 p-1 rounded font-mono' },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: { 
          class: 'bg-gray-900 text-gray-100 p-4 rounded my-6 font-mono' 
        },
      }),
      Underline,
    ],
    content: initialBody,
    editable: editable,
    editorProps: {
      attributes: {
        class: 'focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      setPreviewBody(editor.getHTML())
    },
  })


  useEffect(() => {
    if (headingEditor && initialTitle) {
      headingEditor.commands.setContent(initialTitle)
      setPreviewTitle(initialTitle)
    }
    if (bodyEditor && initialBody) {
      bodyEditor.commands.setContent(initialBody)
      setPreviewBody(initialBody)
    }
  }, [initialTitle, initialBody, headingEditor, bodyEditor])

  const handleSave = () => {
    if (headingEditor && bodyEditor) {
      const newContent = {
        title: headingEditor.getHTML(),
        body: bodyEditor.getHTML(),
      }
      onSave(newContent)
    }
  }

  const renderBubbleMenu = (editor: any, isTitle: boolean = false) => (
    <BubbleMenu 
      editor={editor} 
    //   @ts-ignore
      tippyOptions={{ 
        duration: 0,
        placement: 'top',
        offset: [0, 10],
        zIndex: 999,
      }}
      shouldShow={({ editor }) => {
        return editor.view.state.selection.content().size > 0
      }}
    >
      <div className="flex gap-0.5 p-1 bg-gray-900 text-white rounded shadow-lg">
        {[
          { label: 'Bold', command: 'toggleBold', icon: 'B' },
          { label: 'Italic', command: 'toggleItalic', icon: 'I' },
          { label: 'Underline', command: 'toggleUnderline', icon: 'U' },
          ...(isTitle ? [] : [
            { label: 'H2', command: 'toggleHeading', args: [{ level: 2 }], icon: 'H2' },
          ]),
          ...(isTitle ? [] : [
            { label: 'Quote', command: 'toggleBlockquote', icon: '❝' },
            { label: 'Code', command: 'toggleCodeBlock', icon: '</>' },
            { label: 'Bullets', command: 'toggleBulletList', icon: '•' },
          ]),
        ].map(({ label, command, args = [], icon }) => {
          let isActive = false;
          
          if (command === 'toggleHeading') {
            isActive = editor.isActive('heading', { level: args[0]?.level || 2 });
          } else if (command === 'toggleBlockquote') {
            isActive = editor.isActive('blockquote');
          } else if (command === 'toggleBulletList') {
            isActive = editor.isActive('bulletList');
          } else if (command === 'toggleCodeBlock') {
            isActive = editor.isActive('codeBlock');
          } else {
            const baseCommand = command.replace('toggle', '').toLowerCase();
            isActive = editor.isActive(baseCommand);
          }
          
          return (
            <button
              key={label}
              onClick={() => editor.chain().focus()[command](...args).run()}
              className={`p-2 rounded hover:bg-gray-700 text-sm font-medium ${
                isActive ? 'bg-gray-700' : ''
              }`}
              title={label}
            >
              {icon}
            </button>
          )
        })}
      </div>
    </BubbleMenu>
  )

  const isEditMode = initialTitle !== DEFAULT_TITLE || initialBody !== DEFAULT_BODY

  return (
    <div className="max-w-3xl mx-auto pb-20">
      
      <div className="fixed top-4 right-4 z-10">
        <button 
          onClick={handleSave} 
          className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition shadow-md"
        >
          {isEditMode ? 'Update' : 'Publish'}
        </button>
      </div>

      
      <div className="p-12 m-10 relative border rounded-4xl border-gray-300">
        {headingEditor && renderBubbleMenu(headingEditor, true)}
        <EditorContent 
          editor={headingEditor} 
          className="heading-editor min-h-[60px] text-center"
        />
      </div>

      
      <div className="w-3xl border rounded-4xl border-gray-300 p-8">
        {bodyEditor && renderBubbleMenu(bodyEditor)}
        <EditorContent 
          editor={bodyEditor} 
          className="body-editor min-h-[300px]"
        />
      </div>

      <div className="mt-20 pt-10 border-t border-gray-200">
        <h3 className="text-2xl font-bold mb-8 text-gray-500">Preview</h3>
        <div className="prose max-w-none prose-lg mx-auto">
          <div 
            className="font-serif text-5xl font-bold text-center mb-12"
            dangerouslySetInnerHTML={{ __html: previewTitle }} 
          />
          <div 
            className="font-serif text-xl leading-8 text-gray-700"
            dangerouslySetInnerHTML={{ __html: previewBody }} 
          />
        </div>
      </div>
    </div>
  )
}