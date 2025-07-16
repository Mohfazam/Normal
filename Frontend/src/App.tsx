

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { TextEditor } from './Components/TextEditor'
import { Home } from './Pages/Home'
import { AllBlogs } from './Pages/AllBlogs'

const router = createBrowserRouter([
  {
    path:"/",
    element: <Home />
  },
  {
    path:"/allBlogs",
    element: <AllBlogs />,
  },
])

function App() {
    return <RouterProvider router={router} />
  
}

export default App
