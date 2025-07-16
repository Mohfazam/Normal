import { House, List, PenLine } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm px-12 py-8">
      
      <div className="flex items-center justify-between w-full">
        
        
        <h1 className="text-4xl text-gray-900 font-bold">Normal</h1>
        
        
        <div className="flex gap-12 items-center">
          <div className="flex gap-2 items-center cursor-pointer" onClick={() => navigate("/")}>
            <House />
            <span className="text-gray-900 font-bold">Home</span>
          </div>

          <div className="flex gap-2 items-center cursor-pointer" onClick={() => navigate("/allPosts")}>
            <List />
            <span className="text-gray-900 font-bold">All Posts</span>
          </div>

          <div className="flex gap-2 items-center cursor-pointer" onClick={() => navigate("/newPost")}>
            <PenLine />
            <span className="text-gray-900 font-bold">New Post</span>
          </div>
        </div>
      </div>
    </div>
  );
};
