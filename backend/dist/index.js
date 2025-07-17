"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const client = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/health", (req, res) => {
    console.log("Health end point hit");
    return res.status(200).json({
        Message: "Backend Up and Running"
    });
});
app.get("/allPosts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allPosts = yield client.post.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });
    return res.status(200).json({
        Message: "All posts fetched successfully",
        Posts: allPosts
    });
}));
app.get("/getPost", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.query.id);
    console.log(id);
    try {
        const post = yield client.post.findFirst({
            where: {
                id: id
            }
        });
        console.log(post);
        if (!post) {
            return res.status(404).json({
                Error: "Post Not Found"
            });
        }
        return res.status(200).json({
            Message: "Post Fetched Successfully",
            post
        });
    }
    catch (error) {
        return res.status(500).json({
            Message: "Something went wrong",
            "error": error
        });
    }
}));
app.post("/addPost", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, body } = req.body;
    try {
        const response = yield client.post.create({
            data: {
                title: title,
                body: body,
            }
        });
        return res.status(200).json({
            Message: "Post Added Successfully",
            response
        });
    }
    catch (error) {
        return res.status(500).json({
            Message: "Something wrong",
            error: error
        });
    }
}));
app.put("/updatePost", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, body, id } = req.body;
    try {
        const updatedPost = yield client.post.update({
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
    }
    catch (error) {
        return res.status(500).json({
            Message: "Something went wrong",
            error: error
        });
    }
}));
app.delete("/deletePost", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    try {
        const response = yield client.post.delete({
            where: {
                id: Number(id)
            }
        });
        return res.status(200).json({
            message: `Post with id: ${id} deleted successfully`,
            response
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to delete post",
            error
        });
    }
}));
app.listen(3000, () => {
    console.log("Server Running at port 3000");
});
