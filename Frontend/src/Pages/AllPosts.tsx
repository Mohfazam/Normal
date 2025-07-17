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

type SortOrder = "latest" | "oldest";

export const AllPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>("latest");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("https://normalbackend.vercel.app/allPosts");
        setPosts(res.data.Posts); 
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = (deletedid: number) => {
    setPosts((prevPosts) => prevPosts.filter(post => post.id !== deletedid));
  }

  
  const sortedPosts = [...posts].sort((a, b) => {
    if (sortOrder === "latest") {
      return b.id - a.id; 
    } else {
      return a.id - b.id; 
    }
  });

  return (
    <div>
      <Navbar />

      <div className="flex flex-col justify-center items-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 font-serif m-4 leading-tight">
          Stories
        </h1>
        <div className="text-wrap text-center w-108">
          <span className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
            <strong>Normal</strong> - a clone of Medium with post creation, editing, and viewing. Built for <strong>CODING-JUNIOR</strong>.
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mb-6">
        <div className="flex gap-4 items-center">
          <span className="text-gray-700 font-medium">Sort by:</span>
          <button
            onClick={() => setSortOrder("latest")}
            className={`px-4 py-2 rounded-md border transition-colors ${
              sortOrder === "latest"
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Latest Top
          </button>
          <button
            onClick={() => setSortOrder("oldest")}
            className={`px-4 py-2 rounded-md border transition-colors ${
              sortOrder === "oldest"
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Oldest Top
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col gap-4 px-4">
        {sortedPosts.map((post) => (
          <PostCard key={post.id} post={post} onDelete={handleDelete}/>
        ))}
      </div>
    </div>
  );
};