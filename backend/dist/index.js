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
    res.status(200).json({
        Message: "Backend Up and Running"
    });
});
app.post("/addPost", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, body } = req.body;
    try {
        const response = yield client.post.create({
            data: {
                title: title,
                body: body,
            }
        });
        res.status(200).json({
            Message: "Post Added Successfully",
            response
        });
    }
    catch (error) {
        res.status(500).json({
            Message: "Something wrong",
            error: error
        });
    }
}));
app.listen(3000, () => {
    console.log("Server Running at port 3000");
});
