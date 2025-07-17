import { Navbar } from "../Components/Navbar"

export const Home = () => {
    return(
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
                            <button className="bg-gray-900 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors duration-200">Start Reading</button>
                        </div>
                    </div>
                </div>
                </div>

                <div className="max-w-6xl mx-auto px-6 py-12">
                    <div className="text-3xl font-bold">
                        Latest Post's
                    </div>
                </div>
            </div>
            
        </div>
    )
}