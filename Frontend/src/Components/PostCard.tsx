import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface PostCardProps {
    post: {
        id: number;
        title: string;
        body: string;
        createdAt: string
    };
    onDelete?: (id:number) => void;
}

export const PostCard = ({ post, onDelete }: PostCardProps) => {

    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/postEdit/${post.id}`);
    }

    const handlereadMore = () => {
        navigate(`/ViewPost/${post.id}`);
    }

    const handleDelete = async () => {
        const id = post.id;
        try{
            const response = await axios.delete(`https://normalbackend.vercel.app/deletePost?id=${id}`);
        console.log(`Post with id: ${id} deleted` + response);
        // alert("Post Deleted");
        toast.success("Post deleted Successfully");
         onDelete?.(id);
        } catch(error){
            // console.log("Something went wrong. \n error: " + error);
            toast.error("Something went wrong"+ error);
        }
    };


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

        <div>
            <div className="group cursor-pointer bg-white rounded-lg p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200">


            <div className="bg-white border-b border-gray-100 pb-1 mb-8 last:border-b-0 last:mb-0 group cursor-pointer mr-8">


                <div>
                    <h2 className="text-xl font-bold text-gray-900 leading-tight mb-2 group-hover:text-gray-700 transition-colors duration-200 text-left" dangerouslySetInnerHTML={{ __html: post.title }}>

                    </h2>
                </div>

                <div className="mt-4">
                    <p className="text-gray-600 leading-relaxed text-base line-clamp-2" dangerouslySetInnerHTML={{ __html: truncateBody(post.body) }}>

                    </p>
                </div>

                <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric"
                        })}
                    </div>

                    <div className="flex gap-2">
                        <button className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-md px-2 py-1 hover:cursor-pointer" onClick={handlereadMore}>
                            Read More
                        </button>
                        <button className="text-sm text-blue-600 hover:text-blue-600 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded-md px-2 py-1 hover:cursor-pointer" onClick={handleEdit}>
                            Edit
                        </button>
                        <button className="text-sm text-red-600 hover:text-red-600 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 rounded-md px-2 py-1 hover:cursor-pointer" onClick={handleDelete}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
                <div className="w-full border-b border-gray-400 my-6"></div>
        </div>
    )
}