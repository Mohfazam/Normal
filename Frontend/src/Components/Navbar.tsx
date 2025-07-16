import {House, List, PenLine  } from "lucide-react";

import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate();
    return (
        <div className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm p-4 pb-6">
            <div className="flex">
                <h1 className="text-4xl w-4xl text-gray-900 font-bold">Normal</h1>

                <div className="flex gap-12 justify-between items-center">
                    <div className="flex gap-2">
                        <House/>
                        <button onClick={() => navigate("/")} className="text-gray-900 font-bold hover:cursor-pointer" >Home</button>
                    </div>

                    <div className="flex gap-2">
                        <List />
                        <button onClick={() => navigate("/")} className="text-gray-900 font-bold hover:cursor-pointer">All Posts</button>
                    </div>

                    <div className="flex gap-2">
                        <PenLine />
                        <button onClick={() => navigate("/")} className="text-gray-900 font-bold hover:cursor-pointer">New post</button>
                    </div>
                </div>
            </div>
        </div>
    )
}