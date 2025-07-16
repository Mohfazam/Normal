

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './Pages/Home'
import { AllBlogs } from './Pages/AllPosts'
import { NewBlog } from './Pages/NewPost'

const router = createBrowserRouter([
  {
    path:"/",
    element: <Home />
  },
  {
    path:"/allPosts",
    element: <AllBlogs />,
  },
  {
    path:"/newPost",
    element: <NewBlog />
  },
])

function App() {
    return <RouterProvider router={router} />
  
}

export default App
