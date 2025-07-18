import { Pen, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm px-8 h-[57px]">
      
      <div className="flex items-center justify-between w-full">
        
        
        <h1 className="text-4xl text-gray-900 font-bold hover:cursor-pointer ml-[160px]" onClick={() => navigate("/")}>Normal</h1>
        
        
        <div className="flex gap-8 items-center">
          {/* <div className="flex gap-2 items-center cursor-pointer hover:bg-gray-100 p-[12px] hover:rounded-2xl" onClick={() => navigate("/")}>
            <House />
            <span className="text-gray-900 font-bold">Home</span>
          </div> */}

          {/* <div className="flex gap-2 items-center cursor-pointer hover:bg-gray-100 p-[12px] hover:rounded-2xl" onClick={() => navigate("/allPosts")}>
            <List />
            <span className="text-gray-900 font-bold">All Posts</span>
          </div> */}

          <div className="flex gap-2 items-center cursor-pointer hover:bg-gray-100 p-[12px] hover:rounded-2xl" onClick={() => navigate("/newPost")}>
            <div className="text-[#6B6B6B]">
              <Pen />
            </div>
            <span className="text-[#6B6B6B]">Write</span>
          </div>

          <div className="flex gap-2 items-center cursor-pointer text-[#6B6B6B] hover:bg-gray-100 p-[12px] hover:rounded-2xl" onClick={() => navigate("/newPost")}>
            <Bell size={24}/>
          </div>

          <div className="flex gap-1 items-center mt-1 cursor-pointer text-[#6B6B6B] hover:bg-gray-100 p-[4px] hover:rounded-2xl bg-gray-900 rounded-4xl" onClick={() => navigate("/newPost")}>
            <img 
  src="/cat.jpg" 
  alt="Profile" 
  className="w-9 h-9 object-cover rounded-full" 
/>

          </div>
        </div>
      </div>
    </div>
  );
};
