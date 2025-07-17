import { useEffect, useState } from "react"
import { Navbar } from "../Components/Navbar"
import axios from "axios"
import { PostCard } from "../Components/PostCard"
import { useNavigate } from "react-router-dom";

interface Post {
    id: number;
    title: string;
    body: string;
    createdAt: string;
}

export const Home = () => {

    const navigate = useNavigate();

    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const postsData = await axios.get("https://normalbackend.vercel.app/latestPosts");
            setPosts(postsData.data.posts);
            console.log("Posts fetched", postsData);
        }

        fetchPosts();
    }, []);

    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                    <div className="max-w-6xl mx-auto px-6 py-16">
                        <div className="max-w-6xl mx-auto px-6 py-16">
                            <div className="max-w-3xl">
                                <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">Stay curious.</h2>
                            </div>
                            <div>
                                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                                    Discover stories, thinking, and expertise from writers on any topic.
                                </p>
                            </div>

                            <div>
                                <button className="bg-gray-900 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors duration-200 hover:cursor-pointer" onClick={() => navigate("/allPosts")}>Start Reading</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2">
                            <div className="text-3xl font-bold mb-4">
                                Latest Post's
                            </div>
                            <div className="max-w-6xl mx-auto flex flex-col gap-4">
                                {posts.map((post) => (
                                    <PostCard key={post.id} post={post} />
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="sticky top-24">
                                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                                    <h4 className="text-lg font-bold text-gray-900 mb-4">Trending Topics</h4>
                                    <div className="space-y-3">
                                        <a href="#" className="block text-gray-600 hover:text-gray-900 transition-colors duration-200">#React</a>
                                        <a href="#" className="block text-gray-600 hover:text-gray-900 transition-colors duration-200">#TypeScript</a>
                                        <a href="#" className="block text-gray-600 hover:text-gray-900 transition-colors duration-200">#Web Development</a>
                                        <a href="#" className="block text-gray-600 hover:text-gray-900 transition-colors duration-200">#Design Systems</a>
                                        <a href="#" className="block text-gray-600 hover:text-gray-900 transition-colors duration-200">#User Experience</a>
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h4 className="text-lg font-bold text-gray-900 mb-4">Recommended Reading</h4>
                                    <div className="space-y-4">
                                        <div className="border-l-4 border-blue-500 pl-4">
                                            <h5 className="font-medium text-gray-900 mb-1">Getting Started with React</h5>
                                            <p className="text-sm text-gray-600">A comprehensive guide for beginners</p>
                                        </div>
                                        <div className="border-l-4 border-green-500 pl-4">
                                            <h5 className="font-medium text-gray-900 mb-1">Modern CSS Techniques</h5>
                                            <p className="text-sm text-gray-600">Advanced styling patterns and best practices</p>
                                        </div>
                                        <div className="border-l-4 border-purple-500 pl-4">
                                            <h5 className="font-medium text-gray-900 mb-1">JavaScript Performance</h5>
                                            <p className="text-sm text-gray-600">Optimizing your code for better performance</p>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}