interface PostCardProps{
    post: {
        id: number;
        title: string;
        body: string;
        createdAt: string
    }
}       
export const PostCard = ({post}:PostCardProps) => {
    return(
        <div className="bg-white border-b border-gray-100 pb-8 mb-8 last:border-b-0 last:mb-0 group cursor-pointer mr-8">
            <div>
                <h2 className="text-xl font-bold text-gray-900 leading-tight mb-2 group-hover:text-gray-700 transition-colors duration-200 text-left" dangerouslySetInnerHTML={{__html: post.title}}>
                    
                </h2>
            </div>


            <div className="mt-4">
                <p className="text-gray-600 leading-relaxed text-base" dangerouslySetInnerHTML={{__html: post.body}}>
                    

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

                <div>
                    <button className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-md px-2 py-1 hover:cursor-pointer">
                        Read More
                    </button>
                </div>
            </div>
            <div className="w-full border-b border-gray-400 my-6"></div>


        </div>
    )
}