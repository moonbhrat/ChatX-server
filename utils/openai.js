import "dotenv/config"

const getOpenAIAPIResponse = async (message) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [              // plural and array
                {
                    role: "user",        // lowercase
                    content: message,
                },
            ],
        }),
    };

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", options);
        const data = await response.json();
        console.log(data.choices[0].message.content);
        return (data.choices[0].message.content);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Server error" });
    }
}

export default getOpenAIAPIResponse;