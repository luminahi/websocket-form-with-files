import express from "express";
import cors from "cors";
import multer from "multer";
import { Server } from "socket.io";

const app = express();

const port = 3000;

let requestId = 0;
let db: Array<{ filename: string; content: string; id: number }> = [];

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(cors({ origin: "*" }));

const io = new Server(4000, { cors: { origin: "*" } });

io.on("connection", (socket) => {
    console.log(`connected with id ${socket.id}`);
    socket.on("message", async (data) => {
        console.log(`${socket.id} request id is ${data}`);
        socket.emit("message", "gotcha!");
        await delay(5000);
        socket.emit("result", db[data]);
    });
    socket.on("disconnect", (reason) => {
        console.log(`connected with id ${socket.id}\n${reason}`);
    });
});

function delay(time: number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("delayed!");
        }, time);
    });
}

function prepareData(filename: string, buffer: Buffer, id: number) {
    const content = buffer.toString("utf-8");
    db[id] = { filename, content, id };
}

app.post("/", upload.single("file"), async (req, res) => {
    if (!req.file) return res.send(400).json({ error: "not good" });

    const { buffer, originalname } = req.file;
    prepareData(originalname, buffer, requestId);

    res.status(201).json({ requestId });
    requestId++;
});

app.listen(port, () => {
    console.log(`app running at port ${port}`);
});
