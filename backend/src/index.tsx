import  express  from "express";
import cors from "cors"

const app = express();
app.use(cors());

app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({
        Message: "Backend Up and Running"
    });
});

app.listen(3000, () => {
    console.log("Server Running at port 3000");
});