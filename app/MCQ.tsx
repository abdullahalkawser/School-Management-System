import React, { useState, useRef } from "react";

const MCQPage = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [submittedQuestions, setSubmittedQuestions] = useState([]);
  const [isFinal, setIsFinal] = useState(false);
  const paperRef = useRef();
  
  const currentDateTime = new Date().toLocaleString("bn-BD", { hour12: true });

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmitQuestion = () => {
    if (!question || options.some((opt) => !opt)) {
      alert("সবগুলো ফিল্ড পূরণ করুন।");
      return;
    }
    
    if (submittedQuestions.length >= 30) {
      alert("আপনি সর্বোচ্চ 30টি প্রশ্ন যোগ করতে পারবেন।");
      return;
    }
    
    const newQuestion = {
      question,
      options: [...options],
      created: currentDateTime,
      updated: currentDateTime,
    };
    
    setSubmittedQuestions([...submittedQuestions, newQuestion]);
    setQuestion("");
    setOptions(["", "", "", ""]);
  };

  const handleFinish = () => {
    if (submittedQuestions.length === 0) {
      alert("কোনো প্রশ্ন নেই।");
      return;
    }
    setIsFinal(true);
  };

  const handleDownloadPDF = async () => {
    if (submittedQuestions.length >= 30) {
      alert("আপনি সর্বোচ্চ 30টি প্রশ্ন যোগ করেছেন, PDF ডাউনলোড এখন সম্ভব নয়।");
      return;
    }
    
    if (typeof window === "undefined") return;
    
    try {
      // Use a different approach: Create a simple HTML structure without Tailwind classes
      const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Question Paper</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
              color: #000;
              background: #fff;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
            .school-name {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 5px;
            }
            .time {
              margin-bottom: 10px;
            }
            .paper-title {
              font-size: 20px;
              font-weight: bold;
              margin-bottom: 30px;
            }
            .question-container {
              display: flex;
              gap: 30px;
            }
            .column {
              flex: 1;
            }
            .question {
              margin-bottom: 20px;
              page-break-inside: avoid;
            }
            .question-text {
              font-weight: bold;
              margin-bottom: 8px;
            }
            .options {
              display: flex;
              flex-wrap: wrap;
              gap: 15px;
            }
            .option-pair {
              display: flex;
              gap: 15px;
              width: 100%;
              margin-bottom: 5px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="school-name">Annadanagar Demukhi Girls High School</div>
            <div class="time">সময়কাল: 30 মিনিট</div>
            <div class="paper-title">প্রশ্নপত্র</div>
          </div>
          
          <div class="question-container">
            <div class="column">
              ${submittedQuestions.slice(0, Math.ceil(submittedQuestions.length / 2)).map((mcq, index) => `
                <div class="question">
                  <div class="question-text">${index + 1}. ${mcq.question}</div>
                  <div class="option-pair">
                    <div>ক: ${mcq.options[0]}</div>
                    <div>খ: ${mcq.options[1]}</div>
                  </div>
                  <div class="option-pair">
                    <div>গ: ${mcq.options[2]}</div>
                    <div>ঘ: ${mcq.options[3]}</div>
                  </div>
                </div>
              `).join('')}
            </div>
            
            <div class="column">
              ${submittedQuestions.slice(Math.ceil(submittedQuestions.length / 2)).map((mcq, index) => `
                <div class="question">
                  <div class="question-text">${index + 1 + Math.ceil(submittedQuestions.length / 2)}. ${mcq.question}</div>
                  <div class="option-pair">
                    <div>ক: ${mcq.options[0]}</div>
                    <div>খ: ${mcq.options[1]}</div>
                  </div>
                  <div class="option-pair">
                    <div>গ: ${mcq.options[2]}</div>
                    <div>ঘ: ${mcq.options[3]}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </body>
        </html>
      `;
      
      // Create a new window for printing
      const printWindow = window.open('', '_blank');
      printWindow.document.write(printContent);
      printWindow.document.close();
      
      // Wait for content to load
      printWindow.onload = function() {
        // Use browser's print functionality instead of html2pdf
        printWindow.print();
      };
      
    } catch (error) {
      console.error("PDF generation error:", error);
      alert("PDF তৈরি করতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।");
    }
  };

  if (isFinal) {
    const midIndex = Math.ceil(submittedQuestions.length / 2);
    const firstColumn = submittedQuestions.slice(0, midIndex);
    const secondColumn = submittedQuestions.slice(midIndex);
    
    return (
      <div className="min-h-screen p-6 flex flex-col items-center font-sans text-white bg-gray-900">
        <div 
          className="w-full max-w-5xl p-6 bg-white text-black rounded-lg shadow-md" 
          ref={paperRef}
        >
          <h1 className="text-3xl font-bold mb-2 text-center">
            অন্নদানগর দ্বি-মুখী বালিকা উচ্চ বিদ্যালয়
          </h1>
          <p className="text-center mb-4">সময়কাল: 30 মিনিট</p>
          <h2 className="text-2xl font-bold mb-6 text-center">প্রশ্নপত্র</h2>
          
          <div className="flex gap-6">
            <div className="flex-1 space-y-4">
              {firstColumn.map((mcq, mcqIndex) => (
                <div key={mcqIndex} className="mb-4 break-inside-avoid">
                  <h3 className="text-lg font-semibold mb-1">
                    {mcqIndex + 1}. {mcq.question}
                  </h3>
                  <div className="flex gap-4">
                    <p>ক: {mcq.options[0]}</p>
                    <p>খ: {mcq.options[1]}</p>
                  </div>
                  <div className="flex gap-4">
                    <p>গ: {mcq.options[2]}</p>
                    <p>ঘ: {mcq.options[3]}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex-1 space-y-4">
              {secondColumn.map((mcq, mcqIndex) => (
                <div key={mcqIndex + midIndex} className="mb-4 break-inside-avoid">
                  <h3 className="text-lg font-semibold mb-1">
                    {mcqIndex + 1 + midIndex}. {mcq.question}
                  </h3>
                  <div className="flex gap-4">
                    <p>ক: {mcq.options[0]}</p>
                    <p>খ: {mcq.options[1]}</p>
                  </div>
                  <div className="flex gap-4">
                    <p>গ: {mcq.options[2]}</p>
                    <p>ঘ: {mcq.options[3]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <button 
          onClick={handleDownloadPDF}
          className={`mt-6 px-6 py-3 rounded-md font-semibold ${
            submittedQuestions.length >= 30 
              ? "bg-gray-500 cursor-not-allowed" 
              : "bg-green-600 hover:bg-green-700"
          }`}
          disabled={submittedQuestions.length >= 30}
        >
          Save as PDF
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6 flex flex-col items-center font-sans text-white">
      <div className="w-full max-w-xl p-6 rounded-xl shadow-lg bg-gray-800">
        <h1 className="text-2xl font-bold mb-4 text-center">
          MCQ তৈরি করুন ({submittedQuestions.length}/30)
        </h1>
        
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="আপনার MCQ প্রশ্ন লিখুন"
          className="w-full mb-4 p-3 rounded-md bg-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        {["ক", "খ", "গ", "ঘ"].map((label, index) => (
          <div key={label} className="mb-3 flex items-center gap-2">
            <span className="w-5">{label}:</span>
            <input
              type="text"
              value={options[index]}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`অপশন ${label} লিখুন`}
              className="flex-1 p-2 rounded-md bg-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleSubmitQuestion}
            className={`flex-1 py-2 rounded-md font-semibold ${
              !question || options.some((opt) => !opt)
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={!question || options.some((opt) => !opt)}
          >
            প্রশ্ন যোগ করুন
          </button>
          
          <button
            onClick={handleFinish}
            className="flex-1 py-2 rounded-md bg-green-600 hover:bg-green-700 font-semibold"
          >
            শেষ করুন ও প্রশ্নপত্র দেখুন
          </button>
        </div>
      </div>
    </div>
  );
};

export default MCQPage;