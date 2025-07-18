import { Navbar } from './Navbar'
import './styles.css'

export const XtextEditor = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>


      <div className='flex flex-col items-start mt-8 gap-4 w-fit ml-[385px]'>


        <div className='flex items-center gap-3'>
          <div className="w-8 h-8 pb-1 border-2 border-gray-400 rounded-full flex items-center justify-center">
            <button className='hover:cursor-pointer'>+</button>
          </div>
          <div className='h-[64px] border border-gray-200 opacity-0 hover:opacity-100'></div>
          <div>
            <div className='text-6xl border-gray-300 pl-4 border-l-2 border-0'>
              <input
                type="text"
                placeholder='Start your Story'
                className="border-none outline-none ring-0 focus:outline-none focus:ring-0"
              />
            </div>
          </div>
        </div>


        <div className='flex items-center gap-3'>
          <div className="w-8 h-8 pb-1 border-2 border-gray-400 rounded-full flex items-center justify-center">
            <button className='hover:cursor-pointer'>+</button>
          </div>

          <div className='h-[64px] border border-gray-200 opacity-0 hover:opacity-100'></div>
          <div>
            <div className='text-2xl border-gray-300 pl-4 border-l-2 border-0'>
              <input
                type="text"
                placeholder='Start your Story'
                className="border-none outline-none ring-0 focus:outline-none focus:ring-0"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
