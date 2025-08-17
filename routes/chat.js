import express from "express"
import Thread from "../models/Thread.js";
import getOpenAIAPIResponse from "../utils/openai.js"


const router = express.Router();


router.post("/test", async (req, res) => {

    try {

        const thread = new Thread({
            threadId: "changur",
            title: "hii my name is changur"
        })
        const response = await thread.save();
        res.send(response)

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to save in DB" })


    }

})

//Get all Threads

router.get("/thread", async (req, res) => {
    try {

        const threads = await Thread.find({}).sort({ updatedAt: -1 })//Sort in ascending order
        res.json(threads)

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get thread" })



    }

})

router.get("/thread/:threadId", async (req, res) => {
    const { threadId } = req.params;

    try {
        const thread = await Thread.findOne({ threadId })

        if (!thread) {
            return res.status(500).json({ error: "thread is not found" })

        }

        res.json(thread.messages)

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get fetch chat" })



    }
})



//Deletionn

router.delete("/thread/:threadId", async (req, res) => {


    const { threadId } = req.params;

    try {
        const deletedThread = await Thread.findOneAndDelete({ threadId })

        if (!deletedThread) {
            return res.status(400).json({ error: "thread is not deleted" })

        }

        res.status(200).json({ success: "Thread deleted succesfully" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to delet id" })



    }

})

router.post("/chat", async (req, res) => {
    const { threadId, message } = req.body;
    if (!threadId || !message) {
        res.status(400).json({ error: "missing required failed" })
    }
    try {
        let thread = await Thread.findOne({threadId})

        if (!thread) {
            thread = new Thread({
                threadId,
                title: message,
                messages: [{ role: "user", content: message }]
            })

        } else {
            thread.messages.push({ role: "user", content: message })
        }

        const assistantReply =await getOpenAIAPIResponse(message);
        thread.messages.push({ role: "assistant", content: assistantReply })
        thread.updatedAt = Date.now()
        await thread.save();
        res.json({ reply: assistantReply })


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" })


    }
})

export default router




