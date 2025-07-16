interface PostCardProps{
    post: {
        title: string;
        body: string;
        date: string
    }
}       
export const PostCard = ({post}:PostCardProps) => {
    return(
        <div className="bg-white border-b border-gray-100 pb-8 mb-8 last:border-b-0 last:mb-0 group cursor-pointer mr-8">
            <div>
                <h2 className="text-xl font-bold text-gray-900 leading-tight mb-2 group-hover:text-gray-700 transition-colors duration-200 text-left">
                    {post.title}
                </h2>
            </div>


            <div className="mt-4">
                <p className="text-gray-600 leading-relaxed text-base">{post.body}</p>
            </div>

            <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-500">
                    {post.date}
                </div>

                <div>
                    <button className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-md px-2 py-1 hover:cursor-pointer">
                        Read More
                    </button>
                </div>
            </div>
        </div>
    )
}