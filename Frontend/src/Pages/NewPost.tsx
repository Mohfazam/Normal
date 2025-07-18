import { Navbar } from "../Components/Navbar";
import { XtextEditor } from "../Components/XTextEditor";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from "react";

export const NewPost = () => {
    const navigate = useNavigate();
    const editorRef = useRef<HTMLDivElement>(null);

    const newPost = async (content: { title: string; body: string }) => {
        try {
            console.log("New Post API Ready");
            const response = await axios.post("https://normalbackend.vercel.app/addPost", content);
            console.log("Post added successfully,", response);
            toast.success("Post Published Successfully");
            setTimeout(() => navigate("/allposts"), 1000); 
        } catch (error) {
            toast.error("❌ Something went wrong!");
            console.error("Error:", error);
        }
    };

    const handlePublish = () => {
        const publishButton = editorRef.current?.querySelector('button');
        if (publishButton) {
            publishButton.click();
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <Navbar isNewPost={true} onPublish={handlePublish} />
            <div ref={editorRef} style={{ position: 'relative' }}>
                <XtextEditor editable={true} onSave={newPost} />
                <style>{`
                    .fixed {
                        display: none !important;
                    }
                `}</style>
            </div>
        </div>
    );
};