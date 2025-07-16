import { useEffect, useState } from "react";
import { Navbar } from "../Components/Navbar";
import { PostCard } from "../Components/PostCard";
interface Post{
    id: number;
    title: string;
    body:string;
    createdAt: string;
}

const allPosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect
}

const Post = {
    title: "Title for the post which should be fetched from the backend",
    body: "loresdjfvb ieuriwbebdvwbde iwheiwebwbe ier ierhf  rrei",
    date:"July 17 2025"
}

export const AllPosts = () => {
    return(
        <div>
            <div>
                <Navbar />
            </div>
            
            
            <div className="flex flex-col justify-center items-center mb-16">
                <div className="text-5xl font-bold text-gray-900 font-serif m-4 leading-tight">
                    <h1>Stories</h1>
                </div>
                <div className="text-wrap text-center w-108">
                    <span className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed"><strong>Normal</strong> a clone of medium with post addition, updation and veiw functionalities. assignment for <strong>CODING-JUNIOR</strong></span>
                </div>
            </div>

            <div className="flex justify-center">
                <PostCard post={Post}/>
            </div>
        </div>
    )
}