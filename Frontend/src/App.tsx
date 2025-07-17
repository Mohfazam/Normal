

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './Pages/Home'
import { AllPosts } from './Pages/AllPosts'
import { NewPost } from './Pages/NewPost'
import { PostEdit } from './Pages/PostEdit'
import { ViewPost } from './Pages/ViewPost'

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
])

function App() {
    return <RouterProvider router={router} />
  
}

export default App
