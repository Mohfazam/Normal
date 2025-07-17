

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './Pages/Home'
import { AllPosts } from './Pages/AllPosts'
import { NewPost } from './Pages/NewPost'
import { PostEdit } from './Pages/PostEdit'

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
    path:"/postEdit",
    element: <PostEdit />
  },
])

function App() {
    return <RouterProvider router={router} />
  
}

export default App
