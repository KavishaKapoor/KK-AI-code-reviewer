import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const analyzeCodeBlock = async (code, language, reviewType) => {
  if (!API_KEY) {
    throw new Error("Missing system environment variable: VITE_GEMINI_API_KEY is not defined.");
  }
  
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const structuralPrompt = `
    You are an expert static analyzer and security architecture auditor.
    Analyze the following ${language} code block prioritizing the focus area: "${reviewType}".
    
    Code to evaluate:
    \`\`\`${language}
    ${code}
    \`\`\`

    CRITICAL: You must return ONLY a structural JSON payload matching this exact interface definition schema. No markdown formatting blocks, no trailing symbols, no backticks enclosing the JSON.
    {
      "globalScore": 84, 
      "metrics": {
        "logic": 90, "security": 45, "speed": 65, "docs": 40, "dry": 85, "testing": 20, "strictness": 90, "modular": 75
      },
      "summary": "Short architectural diagnostic summary here detailing major vulnerabilities.",
      "vulnerabilities": [
        { "type": "SQL Injection (Unsanitized Input)", "severity": "CRITICAL", "details": "Dynamic query validation failure detected.", "line": 2 }
      ],
      "refactoredSolution": "Provide clean optimized complete code snippet here.",
      "proTip": "Architectural standard insight statement."
    }
  `;

  const response = await model.generateContent(structuralPrompt);
  const text = response.response.text();
  
  const cleanJson = text.replace(/```json|```/g, "").trim();
  return JSON.parse(cleanJson);
};