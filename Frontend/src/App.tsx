

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './Pages/Home'
import { AllBlogs } from './Pages/AllBlogs'
import { NewBlog } from './Pages/NewBlog'

const router = createBrowserRouter([
  {
    path:"/",
    element: <Home />
  },
  {
    path:"/allBlogs",
    element: <AllBlogs />,
  },
  {
    path:"/newBlogs",
    element: <NewBlog />
  },
])

function App() {
    return <RouterProvider router={router} />
  
}

export default App
