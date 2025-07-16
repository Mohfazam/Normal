import { Navbar } from "../Components/Navbar"

export const AllPosts = () => {
    return(
        <div>
            <div>
                <Navbar />
            </div>
            
            
            <div className="flex flex-col justify-center items-center mb-16">
                <div className="text-4xl font-bold text-gray-900 font-serif m-4 leading-tight">
                    <h1>Stories</h1>
                </div>
                <div className="text-wrap text-center w-108">
                    <span className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">Discover insights about web development, design, and modern technology trends.</span>
                </div>
            </div>
        </div>
    )
}