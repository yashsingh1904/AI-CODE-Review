import { useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Play, Code2, LayoutTemplate, UserCircle, Save, Copy, CheckCircle2, Sparkles } from 'lucide-react';

function App() {
  const [question, setQuestion] = useState('');
  const [code, setCode] = useState('// Write or paste your code here...');
  const [mode, setMode] = useState('dsa');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    setAnalysis('');
    try {
      const response = await axios.post('http://localhost:5000/api/analyze', { code, mode, question });
      setAnalysis(response.data.result);
    } catch (error) {
      setAnalysis('**Error:** Failed to connect to backend.');
    }
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(analysis);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    // Advanced Premium Dark Theme colors (#0d1117 is GitHub Dark style)
    <div className="flex flex-col h-screen bg-[#0d1117] text-gray-300 font-sans selection:bg-blue-500/30">
      
      {/* Top Navbar */}
      <header className="flex items-center justify-between px-6 py-3 bg-[#161b22] border-b border-[#30363d] shadow-md">
        <div className="flex items-center gap-3 text-lg font-bold text-white tracking-wide">
          <div className="p-2 bg-blue-600/20 rounded-lg text-blue-400">
            <Code2 size={24} />
          </div>
          AI Code Architect
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] rounded-md">
          <UserCircle size={18} /> Sign In
        </button>
      </header>

      <main className="flex flex-1 overflow-hidden">
        
        {/* Left Panel: Inputs */}
        <div className="flex flex-col w-1/2 border-r border-[#30363d] bg-[#0d1117]">
          
          {/* Controls Bar */}
          <div className="flex items-center justify-between p-3 bg-[#161b22] border-b border-[#30363d]">
            <div className="flex bg-[#0d1117] rounded-md p-1 border border-[#30363d]">
              <button 
                onClick={() => setMode('dsa')}
                className={`px-4 py-1.5 text-xs font-semibold rounded-sm transition-all ${mode === 'dsa' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-gray-200'}`}
              >
                DSA Evaluator
              </button>
              <button 
                onClick={() => setMode('webdev')}
                className={`px-4 py-1.5 text-xs font-semibold rounded-sm transition-all ${mode === 'webdev' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-gray-200'}`}
              >
                Web Debugger
              </button>
            </div>
            
            <button 
              onClick={handleAnalyze} 
              disabled={loading}
              className="group flex items-center gap-2 px-5 py-2 text-sm font-bold text-black bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 rounded-md disabled:opacity-50 transition-all shadow-[0_0_15px_rgba(52,211,153,0.3)] hover:shadow-[0_0_25px_rgba(52,211,153,0.5)]"
            >
              {loading ? (
                <Sparkles size={16} className="animate-spin" />
              ) : (
                <Play size={16} className="group-hover:translate-x-0.5 transition-transform" />
              )} 
              {loading ? 'Analyzing...' : 'Run Analysis'}
            </button>
          </div>

          {/* DSA Question Box */}
          {mode === 'dsa' && (
            <div className="p-3 bg-[#0d1117] border-b border-[#30363d]">
              <textarea
                className="w-full bg-[#161b22] text-gray-200 border border-[#30363d] rounded-md p-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-500"
                rows="2"
                placeholder="Paste the problem statement here (e.g. LeetCode description)..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
          )}
          
          {/* Monaco Editor */}
          <div className="flex-1">
            <Editor
              height="100%"
              language={mode === 'webdev' ? 'javascript' : 'cpp'}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value)}
              options={{ minimap: { enabled: false }, fontSize: 14, fontFamily: "'JetBrains Mono', 'Fira Code', monospace", padding: { top: 16 } }}
            />
          </div>
        </div>

        {/* Right Panel: Output */}
        <div className="flex flex-col w-1/2 bg-[#0d1117] overflow-hidden">
          
          {/* Output Header */}
          <div className="p-3 bg-[#161b22] border-b border-[#30363d] text-sm font-semibold text-gray-300 flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-400">
              <Sparkles size={18} /> Output Console
            </div>
            
            {analysis && (
              <button 
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-gray-300 rounded-md transition-colors"
              >
                {copied ? <CheckCircle2 size={14} className="text-green-400"/> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
          
          {/* Markdown Rendering Area */}
          <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <div className="w-10 h-10 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
                <p className="text-emerald-400/80 font-medium animate-pulse">AI is inspecting logic and complexities...</p>
              </div>
            ) : analysis ? (
              <div className="prose prose-invert prose-pre:bg-transparent prose-pre:p-0 max-w-none text-gray-300">
                <ReactMarkdown
                  components={{
                    code({node, inline, className, children, ...props}) {
                      const match = /language-(\w+)/.exec(className || '')
                      return !inline && match ? (
                        <div className="rounded-md overflow-hidden border border-[#30363d] my-4 shadow-lg">
                          <SyntaxHighlighter
                            style={vscDarkPlus}
                            language={match[1]}
                            PreTag="div"
                            customStyle={{ margin: 0, padding: '1rem', background: '#161b22' }}
                            {...props}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        </div>
                      ) : (
                        <code className="bg-[#21262d] text-emerald-300 px-1.5 py-0.5 rounded-md text-sm" {...props}>
                          {children}
                        </code>
                      )
                    }
                  }}
                >
                  {analysis}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-600">
                <LayoutTemplate size={64} className="mb-4 opacity-20" />
                <p>Waiting for code execution...</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;