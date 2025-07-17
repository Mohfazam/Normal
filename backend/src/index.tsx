import express from "express";
import cors from "cors"
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const app = express();
app.use(cors());

app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({
        Message: "Backend Up and Running"
    });
});

app.get("/allPosts", async (req, res) => {
    const allPosts = await client.post.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });

    return res.status(200).json({
        Message: "All posts fetched successfully",
        Posts: allPosts
    });
});

app.get("/getPost", async (req, res) => {
    const id = Number(req.query.id);

    try {
        const post = await client.post.findFirst({
            where: {
                id: id
            }
        });

        if (!post) {
            return res.status(404).json({
                Error: "Post Not Found"
            });
        }

        return res.status(200).json({
            Message: "Post Fetched Successfully",
            post
        });
    } catch (error) {
        return res.status(500).json({
            Message: "Something went wrong",
            "error": error
        })
    }


});

app.post("/addPost", async (req, res) => {
    const { title, body } = req.body;

    try {
        const response = await client.post.create({
            data: {
                title: title,
                body: body,
            }
        });

        return res.status(200).json({
            Message: "Post Added Successfully",
            response
        });
    } catch (error) {
        return res.status(500).json({
            Message: "Something wrong",
            error: error
        });
    }
});

app.put("/updatePost", async (req, res) => {
    const { title, body, id } = req.body;

    try {

        const updatedPost = await client.post.update({
            where: { id: id },
            data: {
                title: title,
                body: body
            }
        });

        return res.status(200).json({
            Message: "Post Updated successfully",
            updatedPost
        });

    } catch (error) {
        return res.status(500).json({
            Message: "Something went wrong",
            error: error
        });
    }
});

app.listen(3000, () => {
    console.log("Server Running at port 3000");
});