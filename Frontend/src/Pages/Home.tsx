import { TextEditor } from "../Components/TextEditor"

export const Home = () => {
    return(
        <div>
            <TextEditor editable={true} onSave={() => null} />
        </div>
    )
}