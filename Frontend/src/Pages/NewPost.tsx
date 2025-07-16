import { Navbar } from "../Components/Navbar"
import { TextEditor } from "../Components/TextEditor"


export const NewPost = () => {
    return(
        <div className="flex flex-col gap-4">
            <div>
                <Navbar />
            </div>
            <div>
                <TextEditor editable={true} onSave={() => null}/>

            </div>
        </div>
    )
}