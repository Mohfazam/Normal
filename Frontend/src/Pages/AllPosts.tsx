import { useEffect, useState } from "react";
import { Navbar } from "../Components/Navbar";
import { PostCard } from "../Components/PostCard";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  createdAt: string;
}

export const AllPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("https://normalbackend.vercel.app/allPosts");
        setPosts(res.data.Posts); // this assumes the backend returns { Posts: [...] }
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="flex flex-col justify-center items-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 font-serif m-4 leading-tight">
          Stories
        </h1>
        <div className="text-wrap text-center w-108">
          <span className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
            <strong>Normal</strong> — a clone of Medium with post creation, editing, and viewing. Built for <strong>CODING-JUNIOR</strong>.
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col gap-4 px-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};
