// const generateResponse = require("../service/ai.service");

// exports.generateResponseController = async (req, res) => {
//     try {
//         const prompt = req.body.prompt;

//         // Check if prompt is provided
//         if (!prompt) {
//             return res.status(400).send("Prompt is required");
//         }

//         // Generate response using the service
//         const result = await generateResponse(prompt);

//         // Send the result back to the client
//         res.send(result);
//     } catch (error) {
//         // Handle any errors that occur during the process
//         console.error("Error generating response:", error);
//         res.status(500).send("An error occurred while generating the response");
//     }
// };


const generateResponse = require("../service/ai.service");

exports.generateResponseController = async (req, res) => {
    try {
        const code = req.body.code;
       console.log(code)
        if (!code) {
            return res.status(400).json({ error: "Code is required" });
        }

        const result = await generateResponse(code);
  
        res.json({ review: result });  // Sending response as JSON
    } catch (error) {
        console.error("Error generating response:", error);
        res.status(500).json({ error: "An error occurred while generating the response" });
    }
};
