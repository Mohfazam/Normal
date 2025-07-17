import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const Back = () => {

    const navigate = useNavigate();

    return(
        <div className="border-b border-gray-200 " >
            <div className="flex max-w pl-10 mx-auto px-6 py-6 gap-2 items-center justify-start">
                <div className="flex justify-start  h-[36px] p-3 gap-2 hover:cursor-pointer items-center hover:bg-gray-100 hover:rounded-xl" onClick={() => navigate("/allPosts")}>
                    <ArrowLeft/>
                <span className="text-lg font-medium">Back</span>
                </div>
            </div>
        </div>
    )
}