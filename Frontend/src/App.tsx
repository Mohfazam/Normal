

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './Pages/Home'
import { AllPosts } from './Pages/AllPosts'
import { NewPost } from './Pages/NewPost'
import { PostEdit } from './Pages/PostEdit'
import { ViewPost } from './Pages/ViewPost'
import { ToastContainer } from 'react-toastify';
import { XtextEditor } from './Components/XTextEditor'

const router = createBrowserRouter([
  {
    path:"/",
    element: <Home />
  },
  {
    path:"/allPosts",
    element: <AllPosts />,
  },
  {
    path:"/newPost",
    element: <NewPost />
  },
  {
    path:"/postEdit/:id",
    element: <PostEdit />
  },
  {
    path:"/ViewPost/:id",
    element: <ViewPost />
  },
  {
    path:"/test",
    element: <XtextEditor />
  },
])

function App() {
    return <div>
      <RouterProvider router={router} />
    <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="dark"
            />
    </div>
  
}

export default App
