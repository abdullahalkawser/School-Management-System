import React, { useState } from "react";

export default function Welcome() {
  const [question, setQuestion] = useState(""); 
  const [optionA, setOptionA] = useState(""); 
  const [optionB, setOptionB] = useState(""); 
  const [optionC, setOptionC] = useState(""); 
  const [optionD, setOptionD] = useState(""); 
  const [questionsList, setQuestionsList] = useState([]); 

  const handleAddQuestion = () => {
    if (
      question.trim() !== "" &&
      optionA.trim() !== "" &&
      optionB.trim() !== "" &&
      optionC.trim() !== "" &&
      optionD.trim() !== ""
    ) {
      setQuestionsList((prev) => [
        ...prev,
        { question, options: [optionA, optionB, optionC, optionD] },
      ]);

      setQuestion("");
      setOptionA("");
      setOptionB("");
      setOptionC("");
      setOptionD("");
    } else {
      alert("সবগুলো ফিল্ড পূরণ করুন।");
    }
  };

  const handleDownloadPDF = async () => {
    if (questionsList.length === 0) {
      alert("কোনো প্রশ্ন নেই, PDF ডাউনলোড করা যাবে না।");
      return;
    }
    
    if (typeof window === "undefined") return;
    
    try {
      // Create a simple HTML structure for PDF without any Tailwind classes
      const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>প্রশ্নপত্র</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
              color: #000;
              background: #fff;
              line-height: 1.6;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 2px solid #000;
              padding-bottom: 15px;
            }
            .school-name {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 5px;
            }
            .time {
              margin-bottom: 10px;
              font-size: 16px;
            }
            .paper-title {
              font-size: 20px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .questions {
              width: 100%;
            }
            .question {
              margin-bottom: 30px;
              page-break-inside: avoid;
              border: 1px solid #ddd;
              padding: 15px;
              border-radius: 5px;
            }
            .question-text {
              font-weight: bold;
              margin-bottom: 12px;
              font-size: 16px;
            }
            .options {
              margin-left: 15px;
            }
            .option {
              margin-bottom: 8px;
              padding-left: 5px;
            }
            .page-break {
              page-break-after: always;
            }
            @media print {
              .question {
                page-break-inside: avoid;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="school-name">Annadanagar Demukhi Girls High School</div>
            <div class="time">সময়কাল: 30 মিনিট</div>
            <div class="paper-title">প্রশ্নপত্র</div>
          </div>
          
          <div class="questions">
            ${questionsList.map((q, index) => `
              <div class="question">
                <div class="question-text">${index + 1}. ${q.question}</div>
                <div class="options">
                  <div class="option">ক. ${q.options[0]}</div>
                  <div class="option">খ. ${q.options[1]}</div>
                  <div class="option">গ. ${q.options[2]}</div>
                  <div class="option">ঘ. ${q.options[3]}</div>
                </div>
              </div>
            `).join('')}
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
        // Use browser's print functionality
        printWindow.print();
      };
      
    } catch (error) {
      console.error("PDF generation error:", error);
      alert("PDF তৈরি করতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।");
    }
  };

  // Convert number to Bengali numerals
  const toBengaliNumber = (num) => {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().replace(/\d/g, digit => bengaliDigits[parseInt(digit)]);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-indigo-400">Question Paper Maker</h1>
        <p className="mt-2 text-gray-300">নতুন প্রশ্ন লিখুন এবং অপশনসহ যোগ করুন</p>
      </header>

      {/* Question Input */}
      <section className="bg-gray-800 bg-opacity-60 p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-300">নতুন প্রশ্ন লিখুন</h2>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            className="p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-300"
            placeholder="প্রশ্ন লিখুন..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <input
            type="text"
            className="p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-300"
            placeholder="ক"
            value={optionA}
            onChange={(e) => setOptionA(e.target.value)}
          />
          <input
            type="text"
            className="p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-300"
            placeholder="খ"
            value={optionB}
            onChange={(e) => setOptionB(e.target.value)}
          />
          <input
            type="text"
            className="p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-300"
            placeholder="গ"
            value={optionC}
            onChange={(e) => setOptionC(e.target.value)}
          />
          <input
            type="text"
            className="p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-300"
            placeholder="ঘ"
            value={optionD}
            onChange={(e) => setOptionD(e.target.value)}
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleAddQuestion}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded flex-1"
            >
              প্রশ্ন যোগ করুন
            </button>
            <button
              onClick={handleDownloadPDF}
              className={`px-4 py-2 rounded flex-1 ${
                questionsList.length === 0 
                  ? "bg-gray-500 cursor-not-allowed" 
                  : "bg-green-600 hover:bg-green-700"
              }`}
              disabled={questionsList.length === 0}
            >
              PDF ডাউনলোড
            </button>
          </div>
        </div>
      </section>

      {/* Question List */}
      <section className="bg-gray-800 bg-opacity-60 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-300">প্রশ্ন লিস্ট ({toBengaliNumber(questionsList.length)}টি প্রশ্ন)</h2>
        {questionsList.length === 0 ? (
          <p className="text-gray-400">এখনও কোনো প্রশ্ন যোগ করা হয়নি।</p>
        ) : (
          <ol className="list-decimal list-inside space-y-4 text-gray-200">
            {questionsList.map((q, index) => (
              <li key={index} className="p-3 bg-gray-700 rounded-md">
                <p className="font-semibold">{toBengaliNumber(index + 1)}. {q.question}</p>
                <ul className="list-none ml-4 space-y-1 mt-2">
                  <li>ক. {q.options[0]}</li>
                  <li>খ. {q.options[1]}</li>
                  <li>গ. {q.options[2]}</li>
                  <li>ঘ. {q.options[3]}</li>
                </ul>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}