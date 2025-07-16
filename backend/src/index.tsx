import  express  from "express";
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

app.post("/addPost", async (req, res) => {
    const {title, body} = req.body;

    try{
        const response = await client.post.create({
        data:{
            title: title,
            body: body,
        }
    });

    res.status(200).json({
        Message: "Post Added Successfully",
        response
    });
    } catch(error){
        res.status(500).json({
            Message: "Something wrong",
            error: error
        });
    }
});

app.listen(3000, () => {
    console.log("Server Running at port 3000");
});