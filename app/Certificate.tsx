import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResultSheetMaker = () => {
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [className, setClassName] = useState("");
  const [examName, setExamName] = useState("");
  const [examDate, setExamDate] = useState("");
  const [subjects, setSubjects] = useState([
    { name: "", marks: "", totalMarks: "" }
  ]);
  const [resultSheets, setResultSheets] = useState([]);

  const handleAddSubject = () => {
    setSubjects([...subjects, { name: "", marks: "", totalMarks: "" }]);
    toast.info('নতুন বিষয় যোগ করা হয়েছে!', {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleRemoveSubject = (index) => {
    if (subjects.length > 1) {
      const updatedSubjects = subjects.filter((_, i) => i !== index);
      setSubjects(updatedSubjects);
      toast.warning('বিষয় মুছে ফেলা হয়েছে!', {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      toast.error('অন্তত একটি বিষয় থাকতে হবে!', {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = subjects.map((subject, i) => 
      i === index ? { ...subject, [field]: value } : subject
    );
    setSubjects(updatedSubjects);
  };

  const calculateTotal = () => {
    return subjects.reduce((sum, subject) => {
      return sum + (parseFloat(subject.marks) || 0);
    }, 0);
  };

  const calculatePercentage = () => {
    const totalObtained = calculateTotal();
    const totalPossible = subjects.reduce((sum, subject) => {
      return sum + (parseFloat(subject.totalMarks) || 0);
    }, 0);
    
    return totalPossible > 0 ? ((totalObtained / totalPossible) * 100).toFixed(2) : 0;
  };

  const getGrade = (percentage) => {
    if (percentage >= 80) return "A+";
    if (percentage >= 70) return "A";
    if (percentage >= 60) return "A-";
    if (percentage >= 50) return "B";
    if (percentage >= 40) return "C";
    return "F";
  };

  const handleCreateResultSheet = () => {
    if (!studentName || !studentId || !className || !examName || !examDate) {
      toast.error('সব প্রয়োজনীয় ফিল্ড পূরণ করুন!', {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (subjects.some(subject => !subject.name || !subject.marks || !subject.totalMarks)) {
      toast.error('সব বিষয়ের তথ্য পূরণ করুন!', {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // Validate marks
    for (const subject of subjects) {
      const marks = parseFloat(subject.marks);
      const totalMarks = parseFloat(subject.totalMarks);
      
      if (marks > totalMarks) {
        toast.error(`${subject.name} বিষয়ে প্রাপ্ত নম্বর সর্বমোট নম্বরের বেশি হতে পারে না!`, {
          position: "top-right",
          autoClose: 4000,
        });
        return;
      }
      
      if (marks < 0 || totalMarks < 0) {
        toast.error('নম্বর ঋণাত্মক হতে পারে না!', {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }
    }

    const totalMarks = calculateTotal();
    const percentage = calculatePercentage();
    const grade = getGrade(percentage);

    const newResultSheet = { 
      studentName, 
      studentId, 
      className, 
      examName, 
      examDate,
      subjects: [...subjects],
      totalMarks,
      percentage,
      grade,
      createdAt: new Date().toLocaleString('bn-BD')
    };

    setResultSheets([...resultSheets, newResultSheet]);
    
    // Reset form
    setStudentName("");
    setStudentId("");
    setClassName("");
    setExamName("");
    setExamDate("");
    setSubjects([{ name: "", marks: "", totalMarks: "" }]);

    toast.success('রেজাল্ট শিট সফলভাবে তৈরি হয়েছে!', {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleDownloadResultSheet = (result) => {
    const resultContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Result Sheet - ${result.studentName}</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 40px;
            background-color: #f5f5f5;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
          }
          .result-sheet {
            width: 800px;
            background: white;
            border: 2px solid #1a365d;
            padding: 30px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #1a365d;
            padding-bottom: 15px;
          }
          .school-name {
            font-size: 24px;
            font-weight: bold;
            color: #1a365d;
            margin-bottom: 5px;
          }
          .result-title {
            font-size: 20px;
            font-weight: bold;
            color: #2d3748;
            margin: 10px 0;
          }
          .student-info {
            margin-bottom: 20px;
            background: #f7fafc;
            padding: 15px;
            border-radius: 5px;
          }
          .info-row {
            display: flex;
            margin-bottom: 8px;
          }
          .info-label {
            font-weight: bold;
            width: 120px;
            color: #4a5568;
          }
          .info-value {
            flex: 1;
            color: #2d3748;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          th, td {
            border: 1px solid #e2e8f0;
            padding: 12px;
            text-align: left;
          }
          th {
            background-color: #1a365d;
            color: white;
            font-weight: bold;
          }
          tr:nth-child(even) {
            background-color: #f7fafc;
          }
          .summary {
            background: #ebf8ff;
            padding: 15px;
            border-radius: 5px;
            margin-top: 20px;
          }
          .summary-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            font-size: 16px;
          }
          .highlight {
            font-weight: bold;
            color: #1a365d;
          }
          .grade {
            font-size: 18px;
            font-weight: bold;
            color: #2b6cb0;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 14px;
            color: #718096;
          }
          @media print {
            body {
              background-color: white;
            }
            .result-sheet {
              box-shadow: none;
              border: 1px solid #1a365d;
            }
          }
        </style>
      </head>
      <body>
        <div class="result-sheet">
          <div class="header">
            <div class="school-name">Annadanagar Demukhi Girls High School</div>
            <div class="result-title">Academic Result Sheet</div>
            <div>${result.examName} Examination</div>
          </div>
          
          <div class="student-info">
            <div class="info-row">
              <div class="info-label">Student Name:</div>
              <div class="info-value">${result.studentName}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Student ID:</div>
              <div class="info-value">${result.studentId}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Class:</div>
              <div class="info-value">${result.className}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Exam Date:</div>
              <div class="info-value">${result.examDate}</div>
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Marks Obtained</th>
                <th>Total Marks</th>
              </tr>
            </thead>
            <tbody>
              ${result.subjects.map(subject => `
                <tr>
                  <td>${subject.name}</td>
                  <td>${subject.marks}</td>
                  <td>${subject.totalMarks}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="summary">
            <div class="summary-row">
              <span>Total Marks Obtained:</span>
              <span class="highlight">${result.totalMarks}</span>
            </div>
            <div class="summary-row">
              <span>Percentage:</span>
              <span class="highlight">${result.percentage}%</span>
            </div>
            <div class="summary-row">
              <span>Grade:</span>
              <span class="grade">${result.grade}</span>
            </div>
          </div>
          
          <div class="footer">
            Generated on: ${result.createdAt}
          </div>
        </div>
      </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(resultContent);
    printWindow.document.close();
    
    printWindow.onload = function() {
      printWindow.print();
      toast.info('রেজাল্ট শিট প্রিন্ট করার জন্য প্রস্তুত!', {
        position: "top-right",
        autoClose: 3000,
      });
    };
  };

  const handleDeleteResultSheet = (index) => {
    const updatedSheets = resultSheets.filter((_, i) => i !== index);
    setResultSheets(updatedSheets);
    toast.error('রেজাল্ট শিট মুছে ফেলা হয়েছে!', {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center p-6 font-sans text-white">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
      {/* Input Section */}
      <div className="w-full max-w-2xl bg-gray-800 bg-opacity-80 p-6 rounded-xl shadow-lg mb-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-white">Result Sheet Maker</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="ছাত্র/ছাত্রীর নাম"
            className="p-3 rounded-md bg-gray-700 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="ছাত্র/ছাত্রী আইডি"
            className="p-3 rounded-md bg-gray-700 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            placeholder="ক্লাস"
            className="p-3 rounded-md bg-gray-700 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            placeholder="পরীক্ষার নাম"
            className="p-3 rounded-md bg-gray-700 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            className="p-3 rounded-md bg-gray-700 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">বিষয়সমূহ</h3>
          {subjects.map((subject, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2">
              <input
                type="text"
                value={subject.name}
                onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
                placeholder="বিষয়ের নাম"
                className="p-2 rounded-md bg-gray-700 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                value={subject.marks}
                onChange={(e) => handleSubjectChange(index, 'marks', e.target.value)}
                placeholder="প্রাপ্ত নম্বর"
                className="p-2 rounded-md bg-gray-700 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                value={subject.totalMarks}
                onChange={(e) => handleSubjectChange(index, 'totalMarks', e.target.value)}
                placeholder="সর্বমোট নম্বর"
                className="p-2 rounded-md bg-gray-700 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {subjects.length > 1 && (
                <button
                  onClick={() => handleRemoveSubject(index)}
                  className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  মুছুন
                </button>
              )}
            </div>
          ))}
          <button
            onClick={handleAddSubject}
            className="mt-2 p-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            + আরেকটি বিষয় যোগ করুন
          </button>
        </div>

        <button
          onClick={handleCreateResultSheet}
          className="w-full py-2 mt-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
        >
          রেজাল্ট শিট তৈরি করুন
        </button>
      </div>

      {/* Result Sheets List */}
      {resultSheets.length > 0 && (
        <div className="w-full max-w-4xl space-y-6">
          <h2 className="text-xl font-bold text-center mb-4">তৈরি করা রেজাল্ট শিটগুলো ({resultSheets.length})</h2>
          
          {resultSheets.map((result, index) => (
            <div
              key={index}
              className="bg-gray-800 bg-opacity-80 p-6 rounded-xl shadow-lg"
            >
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-white">Academic Result Sheet</h2>
                <p className="text-sm text-gray-400">{result.examName}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-lg">
                    <span className="font-semibold">নাম:</span> {result.studentName}
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold">আইডি:</span> {result.studentId}
                  </p>
                </div>
                <div>
                  <p className="text-lg">
                    <span className="font-semibold">ক্লাস:</span> {result.className}
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold">তারিখ:</span> {result.examDate}
                  </p>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">বিষয়ভিত্তিক নম্বর</h3>
                <div className="grid grid-cols-1 gap-2">
                  {result.subjects.map((subject, subIndex) => (
                    <div key={subIndex} className="flex justify-between bg-gray-700 p-2 rounded">
                      <span>{subject.name}:</span>
                      <span>{subject.marks} / {subject.totalMarks}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-blue-900 p-4 rounded mb-4">
                <div className="flex justify-between">
                  <span className="font-semibold">মোট প্রাপ্ত নম্বর:</span>
                  <span>{result.totalMarks}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">পার্সেন্টেজ:</span>
                  <span>{result.percentage}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">গ্রেড:</span>
                  <span className="text-xl font-bold">{result.grade}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleDownloadResultSheet(result)}
                  className="flex-1 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700"
                >
                  ডাউনলোড করুন
                </button>
                <button
                  onClick={() => handleDeleteResultSheet(index)}
                  className="flex-1 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
                >
                  মুছুন
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultSheetMaker;