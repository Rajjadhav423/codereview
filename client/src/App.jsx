

// import React, { useState } from 'react';
// import Editor from "react-simple-code-editor";
// import { highlight, languages } from 'prismjs';
// import "prismjs/components/prism-javascript";
// import "prismjs/components/prism-java";
// import "prismjs/themes/prism-tomorrow.css";
// import { Loader2, Code2, FileWarning, CheckCircle, Lightbulb, Bug } from 'lucide-react';
// import ReactMarkdown from 'react-markdown';
// import rehypeHighlight from 'rehype-highlight';
// import 'highlight.js/styles/github-dark.css';

// const CodeReviewApp = () => {
//   const [code, setCode] = useState(
// `class Main {
//   main() {
//     // Your code here
//   }
// }`);
//   const [review, setReview] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleReviewCode = async () => {
//     setIsLoading(true);
//     setError('');

//     try {
//       const response = await fetch('http://localhost:5000/get-response', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ code }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to get review');
//       }

//       const data = await response.json();
//       setReview(data.review || 'No review available');
//     } catch (err) {
//       setError('Failed to get code review. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const ReviewSection = ({ title, icon: Icon, content, variant }) => {
//     const getBgColor = () => {
//       switch (variant) {
//         case 'review': return 'bg-blue-500/10 border-blue-500/20';
//         case 'suggestions': return 'bg-yellow-500/10 border-yellow-500/20';
//         case 'issues': return 'bg-red-500/10 border-red-500/20';
//         default: return 'bg-gray-500/10 border-gray-500/20';
//       }
//     };

//     const getIconColor = () => {
//       switch (variant) {
//         case 'review': return 'text-blue-500';
//         case 'suggestions': return 'text-yellow-500';
//         case 'issues': return 'text-red-500';
//         default: return 'text-gray-500';
//       }
//     };

//     return (
//       <div className={`rounded-lg border ${getBgColor()} p-4 mb-4`}>
//         <div className="flex items-center gap-2 mb-3">
//           <Icon className={`w-5 h-5 ${getIconColor()}`} />
//           <h3 className="font-semibold text-lg">{title}</h3>
//         </div>
//         <div className="prose prose-invert max-w-none">
//           <ReactMarkdown
//             rehypePlugins={[rehypeHighlight]}
//             components={{
//               code: ({ node, inline, className, children, ...props }) => {
//                 const match = /language-(\w+)/.exec(className || '');
//                 return !inline && match ? (
//                   <div className="relative">
//                     <pre className="!bg-gray-900 rounded-lg">
//                       <code className={className} {...props}>
//                         {children}
//                       </code>
//                     </pre>
//                   </div>
//                 ) : (
//                   <code className={className} {...props}>
//                     {children}
//                   </code>
//                 );
//               }
//             }}
//           >
//             {content}
//           </ReactMarkdown>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-100">
//       <div className="container mx-auto px-4 py-8">
//         <header className="mb-8">
//           <div className="flex items-center gap-2 mb-2">
//             <Code2 className="w-8 h-8 text-blue-400" />
//             <h1 className="text-2xl font-bold">Code Review Assistant</h1>
//           </div>
//         </header>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Code Editor Panel */}
//           <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700">
//             <div className="bg-gray-700 px-4 py-2 border-b border-gray-600">
//               <h2 className="font-semibold">Code Editor</h2>
//             </div>
//             <div className="p-4">
//               <Editor
//                 value={code}
//                 onValueChange={code => setCode(code)}
//                 highlight={code => highlight(code, languages.java, 'java')}
//                 padding={10}
//                 style={{
//                   fontFamily: '"Fira Code", "JetBrains Mono", monospace',
//                   fontSize: 14,
//                   backgroundColor: '#1a1a1a',
//                   minHeight: '500px',
//                 }}
//                 className="min-h-[500px] border border-gray-700 rounded-lg"
//               />
//             </div>
//             <div className="bg-gray-700 px-4 py-3 flex justify-end">
//               <button
//                 onClick={handleReviewCode}
//                 disabled={isLoading}
//                 className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                     Reviewing...
//                   </>
//                 ) : (
//                   <>
//                     <CheckCircle className="w-4 h-4" />
//                     Review Code
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Review Panel */}
//           <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700">
//             <div className="bg-gray-700 px-4 py-2 border-b border-gray-600">
//               <h2 className="font-semibold">Code Review Results</h2>
//             </div>
//             <div className="p-6 h-[calc(100%-3rem)] overflow-auto">
//               {isLoading ? (
//                 <div className="flex flex-col items-center justify-center h-full text-gray-400">
//                   <Loader2 className="w-8 h-8 animate-spin mb-4" />
//                   <p>Analyzing your code...</p>
//                 </div>
//               ) : error ? (
//                 <div className="flex flex-col items-center justify-center h-full text-red-400">
//                   <FileWarning className="w-8 h-8 mb-4" />
//                   <p>{error}</p>
//                 </div>
//               ) : review ? (
//                 <div className="space-y-6">
//                   <ReviewSection
//                     title="Code Review"
//                     icon={CheckCircle}
//                     content={review.match(/\*\*Review:\*\*(.*?)(?=\*\*Suggestions:|$)/s)?.[1] || ''}
//                     variant="review"
//                   />
//                   <ReviewSection
//                     title="Suggestions"
//                     icon={Lightbulb}
//                     content={review.match(/\*\*Suggestions:\*\*(.*?)(?=\*\*Issues:|$)/s)?.[1] || ''}
//                     variant="suggestions"
//                   />
//                   <ReviewSection
//                     title="Issues"
//                     icon={Bug}
//                     content={review.match(/\*\*Issues:\*\*(.*?)$/s)?.[1] || ''}
//                     variant="issues"
//                   />
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center justify-center h-full text-gray-400">
//                   <Code2 className="w-8 h-8 mb-4" />
//                   <p>Click "Review Code" to get feedback</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CodeReviewApp;


import  { useState } from 'react';
import Editor from "react-simple-code-editor";
import { highlight, languages } from 'prismjs';
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-java";
import "prismjs/themes/prism-tomorrow.css";
import { Loader2, Code2, FileWarning, CheckCircle,  Lightbulb, Bug } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
const url=import.meta.env.VITE_API_URL
const CodeReviewApp = () => {
  const [code, setCode] = useState(
`class Main {
  main() {
    // Your code here
  }
}`);
  const [review, setReview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleReviewCode = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${url}/get-response`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error('Failed to get review');
      }

      const data = await response.json();
      setReview(data.review || 'No review available');
    } catch (err) {
      setError('Failed to get code review. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const ReviewSection = ({ title, icon: Icon, content, variant }) => {
    const getBgColor = () => {
      switch (variant) {
        case 'review': return 'bg-blue-500/10 border-blue-500/20';
        case 'suggestions': return 'bg-yellow-500/10 border-yellow-500/20';
        case 'issues': return 'bg-red-500/10 border-red-500/20';
        default: return 'bg-gray-500/10 border-gray-500/20';
      }
    };

    const getIconColor = () => {
      switch (variant) {
        case 'review': return 'text-blue-500';
        case 'suggestions': return 'text-yellow-500';
        case 'issues': return 'text-red-500';
        default: return 'text-gray-500';
      }
    };

    return (
      <div className={`rounded-lg border ${getBgColor()} p-4 mb-4`}>
        <div className="flex items-center gap-2 mb-3">
          <Icon className={`w-5 h-5 ${getIconColor()}`} />
          <h3 className="font-semibold text-lg">{title}</h3>
        </div>
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown
            rehypePlugins={[rehypeHighlight]}
            components={{
              code: ({ node, inline, className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <div className="relative">
                    <pre className="!bg-gray-900 rounded-lg">
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </pre>
                  </div>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Code2 className="w-8 h-8 text-blue-400" />
            <h1 className="text-2xl font-bold">Code Review Assistant</h1>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Editor Panel */}
          <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700">
            <div className="bg-gray-700 px-4 py-2 border-b border-gray-600">
              <h2 className="font-semibold">Code Editor</h2>
            </div>
            <div className="p-4">
              <Editor
                value={code}
                onValueChange={code => setCode(code)}
                highlight={code => highlight(code, languages.java, 'java')}
                padding={10}
                style={{
                  fontFamily: '"Fira Code", "JetBrains Mono", monospace',
                  fontSize: 14,
                  backgroundColor: '#1a1a1a',
                  minHeight: '500px',
                }}
                className="min-h-[500px] border border-gray-700 rounded-lg"
              />
            </div>
            <div className="bg-gray-700 px-4 py-3 flex justify-end">
              <button
                onClick={handleReviewCode}
                disabled={isLoading}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Reviewing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Review Code
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Review Panel */}
          <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700">
            <div className="bg-gray-700 px-4 py-2 border-b border-gray-600">
              <h2 className="font-semibold">Code Review Results</h2>
            </div>
            <div className="p-6 h-[calc(100%-3rem)] overflow-auto">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <Loader2 className="w-8 h-8 animate-spin mb-4" />
                  <p>Analyzing your code...</p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center h-full text-red-400">
                  <FileWarning className="w-8 h-8 mb-4" />
                  <p>{error}</p>
                </div>
              ) : review ? (
                <div className="space-y-6">
                  <ReviewSection
                    title="Code Review"
                    icon={CheckCircle}
                    content={review.match(/\*\*Review:\*\*(.*?)(?=\*\*Suggestions:|$)/s)?.[1] || ''}
                    variant="review"
                  />
                  <ReviewSection
                    title="Suggestions"
                    icon={Lightbulb}
                    content={review.match(/\*\*Suggestions:\*\*(.*?)(?=\*\*Issues:|$)/s)?.[1] || ''}
                    variant="suggestions"
                  />
                  <ReviewSection
                    title="Issues"
                    icon={Bug}
                    content={review.match(/\*\*Issues:\*\*(.*?)$/s)?.[1] || ''}
                    variant="issues"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <Code2 className="w-8 h-8 mb-4" />
                  <p>Click "Review Code" to get feedback</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeReviewApp;