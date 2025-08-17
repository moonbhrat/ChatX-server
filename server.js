import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";

import chatRoutes from "./routes/chat.js"
// import mongoose from "mongoose";

const app = express();
const port = 8080;
app.use(express.json());
app.use(cors());  // <- parentheses lagana zaruri hai


app.use("/api",chatRoutes);





const connectionDB = async () => {
    try {
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URL)
        console.log("Connected with database");


    } catch (error) {
        console.log("Failed to connect Db", error);


    }

}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectionDB();
});



























// app.post("/test", async (req, res) => {
//     const options = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//         },
//         body: JSON.stringify({
//             model: "gpt-4o-mini",
//             messages: [              // plural and array
//                 {
//                     role: "user",        // lowercase
//                     content: req.body.message,
//                 },
//             ],
//         }),
//     };

//     try {
//         const response = await fetch("https://api.openai.com/v1/chat/completions", options);
//         const data = await response.json();
//         console.log(data.choices[0].message.content);
//         res.send(data.choices[0].message.content);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ error: "Server error" });
//     }
// });
