import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Navbar } from '../Components/Navbar';
import { TextEditor } from '../Components/TextEditor';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const PostEdit = () => {

    const [postTitlefetched, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("");

    const { id } = useParams();

    const navigate = useNavigate();



    useEffect(() => {
        const fetchPost = async () => {
            try {
                const postdata = await axios.get(`https://normalbackend.vercel.app/getPost?id=${id}`);
                setPostTitle(postdata.data.post.title);
                setPostBody(postdata.data.post.body);
            } catch (error) {
                console.log("Error catched:", error);
            }
        }

        fetchPost();
    }, []);

    const handlePostUpdate = async (content: { title: string; body: string }) => {

        const updatedPost = {
            title: content.title,
            body: content.body,
            id: Number(id)
        };

        try{
            const response = await axios.put("https://normalbackend.vercel.app/updatePost", updatedPost);
            // alert("Post Updated");
            toast.success("Post Updated");
            console.log(response);
            navigate(`/ViewPost/${id}`);
        } catch(error){
            toast.error("Something went wrong. error:" + error);
        }


    }

    return (
        <div className="flex flex-col gap-4">
            <div>
                <Navbar />
            </div>
            <div>
                <TextEditor initialTitle={postTitlefetched} initialBody={postBody} editable={true} onSave={handlePostUpdate}/>
            </div>
        </div>
    )
}