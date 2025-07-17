import { ArrowLeft } from "lucide-react"

export const Back = () => {
    return(
        <div className="border-b border-gray-200 " >
            <div className="flex max-w-4xl mx-auto px-6 py-6 gap-2 items-center justify-start">
                <div className="flex justify-start  h-[36px] p-3 gap-2 hover:cursor-pointer items-center hover:bg-gray-100 hover:rounded-xl">
                    <ArrowLeft/>
                <span className="text-lg font-medium">Back</span>
                </div>
            </div>
        </div>
    )
}