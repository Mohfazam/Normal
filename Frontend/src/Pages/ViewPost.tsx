import { useParams } from "react-router-dom"
import { Back } from "../Components/Back"
import { Navbar } from "../Components/Navbar"
import { useEffect, useState } from "react";
import axios from "axios";

export const ViewPost = () => {

    const { id } = useParams();

    const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("");
    const [createdAt, setcreatedAt] = useState("");


    useEffect(() => {
        const fetchPost = async () => {
            try {
                const post = await axios.get(`https://normalbackend.vercel.app/getPost?id=${id}`);
                setPostTitle(post.data.post.title);
                setPostBody(post.data.post.body);
                setcreatedAt(post.data.post.createdAt);
            } catch (error) {
                console.log("Something went wrong: ", error);
            }
        }

        fetchPost();
    }, [])

    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div>
                <Back />
            </div>

            {/* main */}
            <div className="max-w-3xl mx-auto px-6 py-12">
                <div>
                    <p className="text-gray-500 text-sm">
                        Published on {new Date(createdAt).toLocaleString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                        })}
                    </p>

                </div>

                <div className="w-4xl py-8 text-4xl">
                    <div dangerouslySetInnerHTML={{ __html: postTitle }} />


                </div>

                <div className="p-4 h-fit w-4xl">
                    <div dangerouslySetInnerHTML={{ __html: postBody }} />

                </div>

            </div>
        </div>
    )
}