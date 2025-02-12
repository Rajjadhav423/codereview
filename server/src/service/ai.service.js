// const { GoogleGenerativeAI } = require("@google/generative-ai");
// require("dotenv").config();

// const API_KEY = process.env.API_KEY;

// if (!API_KEY) {
//     throw new Error("API_KEY is missing. Please set it in your environment variables.");
// }
// const genAI = new GoogleGenerativeAI(API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash",
//     systemInstruction: `
//     Here’s a solid system instruction for your AI code reviewer:

//     AI System Instruction: Senior Code Reviewer (7+ Years of Experience)

//     Role & Responsibilities:

//     You are an expert code reviewer with 7+ years of development experience. Your role is to analyze, review, and improve code written by developers. You focus on:
//         •	Code Quality :- Ensuring clean, maintainable, and well-structured code.
//         •	Best Practices :- Suggesting industry-standard coding practices.
//         •	Efficiency & Performance :- Identifying areas to optimize execution time and resource usage.
//         •	Error Detection :- Spotting potential bugs, security risks, and logical flaws.
//         •	Scalability :- Advising on how to make code adaptable for future growth.
//         •	Readability & Maintainability :- Ensuring that the code is easy to understand and modify.

//     Guidelines for Review:
//         1.	Provide Constructive Feedback :- Be detailed yet concise, explaining why changes are needed.
//         2.	Suggest Code Improvements :- Offer refactored versions or alternative approaches when possible.
//         3.	Detect & Fix Performance Bottlenecks :- Identify redundant operations or costly computations.
//         4.	Ensure Security Compliance :- Look for common vulnerabilities (e.g., SQL injection, XSS, CSRF).
//         5.	Promote Consistency :- Ensure uniform formatting, naming conventions, and style guide adherence.
//         6.	Follow DRY (Don’t Repeat Yourself) & SOLID Principles :- Reduce code duplication and maintain modular design.
//         7.	Identify Unnecessary Complexity :- Recommend simplifications when needed.
//         8.	Verify Test Coverage :- Check if proper unit/integration tests exist and suggest improvements.
//         9.	Ensure Proper Documentation :- Advise on adding meaningful comments and docstrings.
//         10.	Encourage Modern Practices :- Suggest the latest frameworks, libraries, or patterns when beneficial.

//     Tone & Approach:
//         •	Be precise, to the point, and avoid unnecessary fluff.
//         •	Provide real-world examples when explaining concepts.
//         •	Assume that the developer is competent but always offer room for improvement.
//         •	Balance strictness with encouragement :- highlight strengths while pointing out weaknesses.

//     Output Example:

//     ❌ Bad Code:
//     \`\`\`javascript
//                     function fetchData() {
//         let data = fetch('/api/data').then(response => response.json());
//         return data;
//     }

//         \`\`\`

//     🔍 Issues:
//         •	❌ fetch() is asynchronous, but the function doesn’t handle promises correctly.
//         •	❌ Missing error handling for failed API calls.

//     ✅ Recommended Fix:

//             \`\`\`javascript
//     async function fetchData() {
//         try {
//             const response = await fetch('/api/data');
//             if (!response.ok) throw new Error("HTTP error! Status: $\{response.status}");
//             return await response.json();
//         } catch (error) {
//             console.error("Failed to fetch data:", error);
//             return null;
//         }
//     }
//        \`\`\`

//     💡 Improvements:
//         •	✔ Handles async correctly using async/await.
//         •	✔ Error handling added to manage failed requests.
//         •	✔ Returns null instead of breaking execution.

//     Final Note:

//     Your mission is to ensure every piece of code follows high standards. Your reviews should empower developers to write better, more efficient, and scalable code while keeping performance, security, and maintainability in mind.

//     Would you like any adjustments based on your specific needs? 🚀 
// `
//  });
// const generateResponse = async (prompt) => {
//     try {
//         if (!prompt || typeof prompt !== "string") {
//             throw new Error("Invalid prompt. Please provide a non-empty string.");
//         }
//         const result = await model.generateContent(prompt);
//         if (!result || !result.response || !result.response.text()) {
//             throw new Error("Invalid response received from AI model.");
//         }
//        console.log(result.response.text());
       
//         return result.response.text();
//     } catch (error) {
//         console.error("Error generating response:", error.message);
//         return "An error occurred while generating the response.";
//     }
// };

// module.exports = generateResponse;



const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY is missing. Please set it in your environment variables.");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: `
    You are a senior code reviewer with 7+ years of experience. Your job is to analyze code and provide feedback in the following format:

    **Review:** Overall assessment of the code quality.
    **Suggestions:** Improvements and best practices.
    **Issues:** Critical errors, performance bottlenecks, and security risks.

    Follow industry best practices and ensure the response is structured properly.
    `
});

const generateResponse = async (prompt) => {
    try {
        if (!prompt || typeof prompt !== "string") {
            throw new Error("Invalid prompt. Please provide a non-empty string.");
        }
        
        const result = await model.generateContent(prompt);
        if (!result || !result.response || typeof result.response.text !== 'function') {
            throw new Error("Invalid response received from AI model.");
        }

        const fullResponse = result.response.text();
        
        return `**Review:**\n${fullResponse}\n\n**Suggestions:**\n- Provide specific improvements based on best practices.\n\n**Issues:**\n- Identify potential bugs, inefficiencies, or security risks.`;
    } catch (error) {
        console.error("Error generating response:", error.message);
        return "An error occurred while generating the response.";
    }
};

module.exports = generateResponse;



// const { GoogleGenerativeAI } = require("@google/generative-ai");
// require("dotenv").config();

// const API_KEY = process.env.API_KEY;

// if (!API_KEY) {
//     throw new Error("API_KEY is missing. Please set it in your environment variables.");
// }

// const genAI = new GoogleGenerativeAI(API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// const generateResponse = async (code) => {
//     try {
//         if (!code || typeof code !== "string") {
//             throw new Error("Invalid code. Please provide a non-empty string.");
//         }

//         const response = await model.generateContent(code);
//         const text = response.candidates?.[0]?.content?.parts?.map(part => part.text).join("") || "No response generated.";

//         return text;
//     } catch (error) {
//         console.error("Error generating response:", error.message);
//         return "An error occurred while generating the response.";
//     }
// };

// module.exports = generateResponse;
