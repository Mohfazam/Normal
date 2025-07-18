import { useEffect, useState } from "react"
import { Navbar } from "../Components/Navbar"
import axios from "axios"
// import { PostCard } from "../Components/PostCard"

interface Post {
    id: number;
    title: string;
    body: string;
    createdAt: string;
}

export const Home = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const postsData = await axios.get("https://normalbackend.vercel.app/latestPosts");
            setPosts(postsData.data.posts);
            console.log("Posts fetched", postsData);
        }

        fetchPosts();
    }, []);

    const truncateBody = (htmlContent: string, maxLength: number = 150): string => {

        const textContent = htmlContent.replace(/<[^>]*>/g, '');

        if (textContent.length <= maxLength) {
            return htmlContent;
        }


        const truncated = textContent.substring(0, maxLength);
        const lastSpace = truncated.lastIndexOf(' ');
        const finalLength = lastSpace > 0 ? lastSpace : maxLength;


        if (htmlContent !== textContent) {

            return textContent.substring(0, finalLength) + '...';
        }

        return truncated.substring(0, finalLength) + '...';
    };

    return (
        <div className="bg-white">
            <Navbar />

            
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex gap-16">
                    
                    <div className="flex-1 max-w-2xl">
                        <div className="flex items-center gap-6 mb-8 border-b border-gray-200 pb-4">
                            <button className="text-sm font-medium text-black border-b-2 border-black pb-3">
                                For you
                            </button>
                            <button className="text-sm font-medium text-gray-500 hover:text-black pb-3">
                                Following
                            </button>
                        </div>

                        <div className="space-y-8">
                            {posts.map((post, index) => (
                                <div key={post.id} className="flex gap-6 py-6 border-b border-gray-100 last:border-b-0">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                                            <span className="text-sm text-black font-medium">Author Name</span>
                                            <span className="text-gray-500 text-sm">·</span>
                                            <span className="text-gray-500 text-sm">{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                        </div>
                                        
                                        <h2 className="text-xl font-bold text-black mb-2 leading-tight hover:cursor-pointer" dangerouslySetInnerHTML={{ __html: post.title }}>
                                            
                                        </h2>
                                        
                                        <p className="text-gray-600 text-base mb-4 line-clamp-2" dangerouslySetInnerHTML={{ __html: truncateBody(post.body) }}>
                                            
                                        </p>
                                        
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                                    Technology
                                                </div>
                                                <span className="text-gray-500 text-sm">3 min read</span>
                                            </div>
                                            
                                            <div className="flex items-center gap-4">
                                                <button className="text-gray-500 hover:text-black">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                        <path d="M17.5 1.25C16.44 1.25 15.395 1.474 14.427 1.906L12.016 3.011L9.573 1.906C8.605 1.474 7.56 1.25 6.5 1.25C2.77 1.25 1.25 4.324 1.25 6.667C1.25 10.834 5.54 15.417 12.016 22.5C18.492 15.417 22.783 10.834 22.783 6.667C22.75 4.324 21.23 1.25 17.5 1.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </button>
                                                <button className="text-gray-500 hover:text-black">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                        <path d="M7 13L12 8L17 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </button>
                                                <button className="text-gray-500 hover:text-black">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                        <circle cx="12" cy="12" r="1" stroke="currentColor" strokeWidth="1.5"/>
                                                        <circle cx="12" cy="5" r="1" stroke="currentColor" strokeWidth="1.5"/>
                                                        <circle cx="12" cy="19" r="1" stroke="currentColor" strokeWidth="1.5"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {index % 3 === 0 && (
                                        <div className="w-32 h-32 bg-gray-200 rounded flex-shrink-0">
                                            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 rounded"></div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    
                    <div className="w-80 hidden lg:block">
                        <div className="sticky top-24">
                            
                            <div className="mb-12">
                                <h3 className="text-lg font-bold text-black mb-6">Trending on Medium</h3>
                                <div className="space-y-4">
                                    {[1, 2, 3, 4, 5, 6].map((item) => (
                                        <div key={item} className="flex gap-4">
                                            <span className="text-3xl font-bold text-gray-200 leading-none">0{item}</span>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="w-5 h-5 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
                                                    <span className="text-sm text-black font-medium">Author Name</span>
                                                </div>
                                                <h4 className="text-base font-bold text-black leading-tight mb-1 hover:cursor-pointer">
                                                    The Future of Web Development: What's Coming Next
                                                </h4>
                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    <span>Dec 15</span>
                                                    <span>·</span>
                                                    <span>4 min read</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            
                            <div className="mb-12">
                                <h3 className="text-lg font-bold text-black mb-6">Discover more of what matters to you</h3>
                                <div className="flex flex-wrap gap-3">
                                    {[
                                        "Programming", "Data Science", "Technology", "Self Improvement",
                                        "Writing", "Relationships", "Machine Learning", "Productivity",
                                        "Politics", "Cryptocurrency", "Psychology", "Money", "Business",
                                        "Python", "Health", "Science", "Mental Health", "Life", "Startup"
                                    ].map((topic) => (
                                        <button
                                            key={topic}
                                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors duration-200"
                                        >
                                            {topic}
                                        </button>
                                    ))}
                                </div>
                                <button className="text-green-600 text-sm font-medium mt-4 hover:text-green-700">
                                    See more topics
                                </button>
                            </div>

                        
                            <div className="text-xs text-gray-500 space-y-1">
                                <div className="flex flex-wrap gap-x-4 gap-y-1">
                                    <a href="#" className="hover:text-black">Help</a>
                                    <a href="#" className="hover:text-black">Status</a>
                                    <a href="#" className="hover:text-black">About</a>
                                    <a href="#" className="hover:text-black">Careers</a>
                                    <a href="#" className="hover:text-black">Blog</a>
                                    <a href="#" className="hover:text-black">Privacy</a>
                                    <a href="#" className="hover:text-black">Terms</a>
                                    <a href="#" className="hover:text-black">Text to speech</a>
                                    <a href="#" className="hover:text-black">Teams</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}