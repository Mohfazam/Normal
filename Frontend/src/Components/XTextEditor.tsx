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
import Image from '@tiptap/extension-image'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import { useEffect, useRef, useState } from 'react'
import { common, createLowlight } from 'lowlight'

const lowlight = createLowlight(common)

const DEFAULT_TITLE = '<h1>Start your Story</h1>'
const DEFAULT_BODY = '<p>Start your Story</p>'

interface XtextEditorProps {
  editable?: boolean;
  initialTitle?: string;
  initialBody?: string;
  onSave?: (content: { title: string; body: string; images?: File[] }) => void;
}

export const XtextEditor = ({
  editable = true,
  initialTitle = DEFAULT_TITLE,
  initialBody = DEFAULT_BODY,
  onSave = () => { }
}: XtextEditorProps) => {

  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadedImages = useRef<File[]>([]);
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [showYouTubeInput, setShowYouTubeInput] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');

  const headingEditor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      Heading.configure({
        levels: [1],
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
        class: 'focus:outline-none text-6xl border-none outline-none ring-0 focus:outline-none focus:ring-0',
      },
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
      Heading.configure({
        levels: [1, 2, 3],
        HTMLAttributes: {
          class: 'font-serif font-bold mt-8 mb-4'
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
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg shadow-md my-4',
        },
      }),
      HorizontalRule.configure({
        HTMLAttributes: {
          class: 'my-8 border-t-2 border-gray-300',
        },
      }),
      Underline,
    ],
    content: initialBody,
    editable: editable,
    editorProps: {
      attributes: {
        class: 'focus:outline-none text-2xl border-none outline-none ring-0 focus:outline-none focus:ring-0',
      },
    },
  })

  useEffect(() => {
    if (headingEditor && initialTitle) {
      headingEditor.commands.setContent(initialTitle)
    }
    if (bodyEditor && initialBody) {
      bodyEditor.commands.setContent(initialBody)
    }
  }, [initialTitle, initialBody, headingEditor, bodyEditor])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && bodyEditor) {
      // Create a temporary URL for preview
      const imageUrl = URL.createObjectURL(file);

      // Store the file for later upload
      uploadedImages.current.push(file);

      // Insert the image into the editor
      bodyEditor.chain().focus().setImage({ src: imageUrl }).run();

      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
    setShowPlusMenu(false);
  };

  const extractYouTubeVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleYouTubeEmbed = () => {
    if (youtubeUrl && bodyEditor) {
      const videoId = extractYouTubeVideoId(youtubeUrl);
      if (videoId) {
        const embedHTML = `
          <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 1.5rem 0;">
            <iframe 
              src="https://www.youtube.com/embed/${videoId}" 
              style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
              frameborder="0" 
              allowfullscreen>
            </iframe>
          </div>
        `;
        bodyEditor.chain().focus().insertContent(embedHTML).run();
        setYoutubeUrl('');
        setShowYouTubeInput(false);
      } else {
        alert('Please enter a valid YouTube URL');
      }
    }
    setShowPlusMenu(false);
  };

  const handleSave = () => {
    if (headingEditor && bodyEditor) {
      const newContent = {
        title: headingEditor.getHTML(),
        body: bodyEditor.getHTML(),
        images: uploadedImages.current
      }
      onSave(newContent)
    }
  }

  const renderBubbleMenu = (editor: any, isTitle: boolean = false) => (
    <BubbleMenu
      editor={editor}
      // @ts-ignore
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
            { label: 'Quote', command: 'toggleBlockquote', icon: '❝' },
            { label: 'Code', command: 'toggleCodeBlock', icon: '</>' },
            { label: 'Bullets', command: 'toggleBulletList', icon: '•' },
          ]),
        ].map(({ label, command, icon }) => {
          let isActive = false;

          if (command === 'toggleBlockquote') {
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
              onClick={() => {
                editor.chain().focus()[command]().run();
              }}
              className={`p-2 rounded hover:bg-gray-700 text-sm font-medium ${isActive ? 'bg-gray-700' : ''
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
    <div>
      {/* Hidden file input for image upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />

      <div className="fixed top-42 right-40 z-10">
        <button
          onClick={handleSave}
          className="px-8 py-4 bg-green-600 text-white rounded-full hover:bg-green-700 transition shadow-md hover:cursor-pointer"
        >
          {isEditMode ? 'Update' : 'Publish'}
        </button>
      </div>

      <div className='flex flex-col items-start mt-8 gap-4 w-fit ml-[385px]'>
        <div className='flex items-center gap-3'>
          <div className="w-8 h-8 pb-1 border-2 border-gray-400 rounded-full flex items-center justify-center">
            <button className='hover:cursor-pointer text-gray-600 font-bold text-lg'>+</button>
          </div>
          <div className='h-[64px] border border-gray-200 opacity-0 hover:opacity-100'></div>
          <div>
            <div className='text-6xl border-gray-300 pl-4 border-l-2 border-0'>
              {headingEditor && renderBubbleMenu(headingEditor, true)}
              <EditorContent
                editor={headingEditor}
                className="heading-editor min-h-[60px]"
              />
            </div>
          </div>
        </div>

        <div className='flex items-start gap-3 relative'>
          <div className="w-8 h-8 pb-1 border-2 border-gray-400 rounded-full flex items-center justify-center relative">
            <button
              className='hover:cursor-pointer text-gray-600 font-bold text-lg hover:bg-gray-100 w-full h-full rounded-full flex items-center justify-center transition-colors'
              onClick={() => setShowPlusMenu(!showPlusMenu)}
              title="Add content"
            >
              +
            </button>


            {showPlusMenu && (
              <div className="absolute top-0 left-10 bg-white rounded-full shadow-lg z-50 flex items-center px-1 py-1" style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)' }}>

                <button
                  onClick={() => setShowPlusMenu(false)}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-all duration-200 mx-1"
                  title="Close"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>




                <button
                  onClick={() => {
                    fileInputRef.current?.click();
                  }}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-green-50 hover:border-green-400 transition-all duration-200 mx-1"
                  title="Upload from Device"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                    <circle cx="12" cy="13" r="3"></circle>
                  </svg>
                </button>




                <button
                  onClick={() => {
                    bodyEditor?.chain().focus().toggleCodeBlock().run();
                    setShowPlusMenu(false);
                  }}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-green-50 hover:border-green-400 transition-all duration-200 mx-1"
                  title="Code Block"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                    <polyline points="16,18 22,12 16,6"></polyline>
                    <polyline points="8,6 2,12 8,18"></polyline>
                  </svg>
                </button>


                <button
                  onClick={() => {
                    bodyEditor?.chain().focus().setHorizontalRule().run();
                    setShowPlusMenu(false);
                  }}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-green-50 hover:border-green-400 transition-all duration-200 mx-1"
                  title="Divider"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                  </svg>
                </button>

                <button
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-green-50 hover:border-green-400 transition-all duration-200 mx-1"
                  title="More Options"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                  </svg>
                </button>
              </div>
            )}
          </div>

          <div className='h-[64px] border border-gray-200 opacity-0 hover:opacity-100'></div>
          <div className="flex-1">
            {/* YouTube Input */}
            {showYouTubeInput && (
              <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="Paste YouTube URL here..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    onClick={handleYouTubeEmbed}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                  >
                    Embed
                  </button>
                  <button
                    onClick={() => {
                      setShowYouTubeInput(false);
                      setYoutubeUrl('');
                      setShowPlusMenu(false);
                    }}
                    className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className='text-2xl border-gray-300 pl-4 border-l-2 border-0'>
              {bodyEditor && renderBubbleMenu(bodyEditor)}
              <EditorContent
                editor={bodyEditor}
                className="body-editor min-h-[300px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close menu */}
      {showPlusMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowPlusMenu(false)}
        />
      )}
    </div>
  )
}