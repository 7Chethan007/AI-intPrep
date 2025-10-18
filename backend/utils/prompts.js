// Function to generate a prompt for creating a set of interview questions and answers.
const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => `
You are an expert technical interviewer and AI trainer. Your task is to generate questions and **concise, keyword-focused answers**.

Task:
- Role: ${role}
- Candidate Experience: ${experience} years
- Focus Topics: ${topicsToFocus}
- Write exactly ${numberOfQuestions} interview questions.
- For each question, generate an answer that is **brief, clear, and highlights essential technical keywords and concepts immediately**. The answer should be suitable for a verbal interview—not an essay.
- **Answer Format:** Use bullet points or numbered lists where possible for clarity. Avoid unnecessary conversational filler.
- If the answer needs a code example, add a small code block inside.
- Keep formatting very clean.
- Return a pure JSON array like:

[
  {
    "question": "Question here?",
    "answer": "Answer here."
  },
  {
    "question": "Another question here?",
    "answer": "Another answer here."
  }
]

Important: Do NOT add any extra text. **Only return valid JSON.**
`;

// Function to generate a prompt for explaining a single concept in depth.
const conceptExplainPrompt = (question) => `
You are an AI trained to generate in-depth explanations for technical interview concepts.

Task:
- Explain the following interview question and its concept **in depth**, using analogies and clear examples, as if you're teaching a beginner developer. This output should be detailed, unlike the interview answer.
- Question: ${question}
- After the explanation, provide a short and clear title that summarizes the concept for the article or page header.
- If the explanation includes a code example, provide a small code block.
- Keep the formatting very clean and clear.
- Return the result as a valid JSON object in the following format:

{
  "title": "Short title here?",
  "explanation": "Explanation here."
}

Important: Do NOT add any extra text outside the JSON format. Only return valid JSON.
`;

module.exports = {
  questionAnswerPrompt,
  conceptExplainPrompt,
};


// // Function to generate a prompt for creating a set of interview questions and answers.
// const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => `
// You are an AI trained to generate technical interview questions and answers.

// Task:
// - Role: ${role}
// - Candidate Experience: ${experience} years
// - Focus Topics: ${topicsToFocus}
// - Write ${numberOfQuestions} interview questions.
// - For each question, generate a detailed but beginner-friendly answer.
// - If the answer needs a code example, add a small code block inside.
// - Keep formatting very clean.
// - Return a pure JSON array like:

// [
//   {
//     "question": "Question here?",
//     "answer": "Answer here."
//   },
//   {
//     "question": "Another question here?",
//     "answer": "Another answer here."
//   }
// ]

// Important: Do NOT add any extra text. Only return valid JSON.
// `;

// // Function to generate a prompt for explaining a single concept in depth.
// const conceptExplainPrompt = (question) => `
// You are an AI trained to generate explanations for a given interview question.

// Task:
// - Explain the following interview question and its concept in depth as if you're teaching a beginner developer.
// - Question: ${question}
// - After the explanation, provide a short and clear title that summarizes the concept for the article or page header
// - If the explanation includes a code example, provide a small code block.
// - Keep the formatting very clean and clear.
// - Return the result as a valid JSON object in the following format:

// {
//   "title": "Short title here?",
//   "explanation": "Explanation here."
// }

// Important: Do NOT add any extra text outside the JSON format. Only return valid JSON.
// `;

// module.exports = {
//   questionAnswerPrompt,
//   conceptExplainPrompt,
// };