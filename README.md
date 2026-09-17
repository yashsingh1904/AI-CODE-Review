# 🚀 AI Code Architect

A full-stack, AI-powered code evaluation and debugging platform built with the MERN/PERN stack. This tool acts as an intelligent coding assistant, offering dedicated modes for evaluating Data Structures and Algorithms (DSA) and debugging Web Development code.

## ✨ Features

* **Dual-Mode AI Engine:**
  * **DSA Evaluator:** Paste a LeetCode/HackerRank problem statement alongside your code. The AI analyzes time/space complexity, identifies logical & syntax bugs, suggests core concepts to review, and provides optimized code.
  * **Web Debugger:** Identifies framework-specific errors (React, Node, etc.) and provides corrected code along with conceptual explanations.
* **Pro-Grade Editor Experience:** Integrated **Monaco Editor** (the engine behind VS Code) for native syntax highlighting, auto-indentation, and a premium typing experience.
* **Context-Aware Analysis:** Accepts specific problem statements to ensure the code logic actually solves the intended problem, not just checks for syntax.
* **Intelligent Output UI:** 
  * Renders AI responses using formatted Markdown.
  * Custom Syntax Highlighting for AI-generated code blocks.
  * **Smart Copy:** Dedicated copy buttons that extract *only* the corrected code, stripping away the chat text for fast implementation.
* **Premium Dark Mode UI:** A highly polished, custom dark theme inspired by GitHub Dark and modern IDEs, built with Tailwind CSS.

## 🛠️ Tech Stack

**Frontend:**
* React (Vite)
* Tailwind CSS
* `@monaco-editor/react`
* `react-markdown` & `react-syntax-highlighter`
* Lucide React (Icons)

**Backend:**
* Node.js & Express.js
* Groq API SDK (OpenAI compatible fast-inference LLMs)
* MongoDB / Mongoose (Pre-configured for user auth and history saving)

## ⚙️ Local Setup & Installation

### 1. Clone the repository
```bash
git clone [https://github.com/yourusername/ai-code-architect.git](https://github.com/yourusername/ai-code-architect.git)
cd ai-code-architect
