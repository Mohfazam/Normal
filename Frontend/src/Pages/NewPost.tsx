import { Navbar } from "../Components/Navbar"
import { TextEditor } from "../Components/TextEditor"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const NewPost = () => {
    const navigate = useNavigate();

    const newPost = async (content: { title: string; body: string }) => {
        try {
            console.log("New Post API Ready");
            const response = await axios.post("https://normalbackend.vercel.app/addPost", content);
            console.log("Post added successfully,", response);
            alert("New Post Created Successfully");
            navigate("/allposts");
        } catch (error) {
            console.log("Something went wrong. \n error:", error);
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <div>
                <Navbar />
            </div>
            <div>
                <TextEditor editable={true} onSave={newPost} />
            </div>
        </div>
    );
};
