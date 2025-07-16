export const Navbar = () => {
    return (
        <div className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm p-4 pb-6">
            <div className="flex">
                <h1 className="text-4xl w-4xl text-gray-900 font-bold">Normal</h1>

                <div className="flex gap-22 justify-between items-center">
                    <div>
                        <button>Home</button>
                    </div>

                    <div>
                        <button>All Blogs</button>
                    </div>

                    <div>
                        <button>New Blog</button>
                    </div>
                </div>
            </div>
        </div>
    )
}