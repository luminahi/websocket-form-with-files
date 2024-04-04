import express from "express";
import cors from "cors";
import { Server } from "socket.io";

const app = express();

const port = 3000;

app.use(cors({ origin: "*" }));

// const io = new Server(4000, { cors: { origin: "*" } });

// io.on("connection", (socket) => {
//     console.log(`connected with id ${socket.id}`);
//     socket.on("message", async (interval: number) => {
//         if (Number.isInteger(interval)) return;
//         await delay(interval * 1000);
//         socket.emit("message", "work is finished!");
//         console.log("message sent");
//     });
// });

app.get("/", async (req, res) => {
    res.status(200).json({ msg: "txt" });
});

app.listen(port, () => {
    console.log(`app running at port ${port}`);
});
