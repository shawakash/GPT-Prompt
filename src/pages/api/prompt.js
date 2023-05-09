const { Configuration, OpenAIApi } = require("openai");

export default async function handler(req, res) {


    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "Tell Me About NextJs",
            max_tokens: 4090
        });
        res.send(completion.data.choices[0].text);
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
    }

}