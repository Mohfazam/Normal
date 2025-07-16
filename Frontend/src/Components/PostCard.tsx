interface PostCardProps{
    post: {
        title: string;
        body: string;
    }
}       
export const PostCard = ({post}:PostCardProps) => {
    return(
        <div className="bg-white border-b border-gray-100 pb-8 mb-8 last:border-b-0 last:mb-0 group cursor-pointer">
            <div>
                <h2 className="text-xl font-bold text-gray-900 leading-tight mb-2 group-hover:text-gray-700 transition-colors duration-200 text-left">
                    {post.title}
                </h2>
            </div>


            <div>
                <p className="text-gray-600 leading-relaxed text-base">{post.body}</p>
            </div>
        </div>
    )
}