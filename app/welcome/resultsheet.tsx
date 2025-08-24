import React, { useState } from "react";

const Result = () => {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [date, setDate] = useState("");
  const [instructor, setInstructor] = useState("");
  const [duration, setDuration] = useState("");
  const [certificates, setCertificates] = useState([]);

  const handleCreateCertificate = () => {
    if (!name || !course || !date || !instructor || !duration) {
      alert("সব ফিল্ড পূরণ করুন।");
      return;
    }
    const newCert = { 
      name, 
      course, 
      date, 
      instructor, 
      duration,
      serial: certificates.length + 1,
      issueDate: new Date().toLocaleDateString('bn-BD')
    };
    setCertificates([...certificates, newCert]);
    setName("");
    setCourse("");
    setDate("");
    setInstructor("");
    setDuration("");
  };

  const handleDownloadCertificate = (cert) => {
    const certificateContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Certificate - ${cert.name}</title>
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
          .certificate {
            width: 800px;
            height: 600px;
            background: linear-gradient(135deg, #f9f9f9 0%, #ffffff 100%);
            border: 20px solid #1a365d;
            padding: 40px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
            position: relative;
          }
          .header {
            margin-bottom: 30px;
          }
          .title {
            font-size: 36px;
            font-weight: bold;
            color: #1a365d;
            margin-bottom: 10px;
          }
          .subtitle {
            font-size: 20px;
            color: #2d3748;
            margin-bottom: 40px;
          }
          .recipient {
            font-size: 28px;
            font-weight: bold;
            color: #2d3748;
            margin: 30px 0;
          }
          .text {
            font-size: 18px;
            color: #4a5568;
            margin: 15px 0;
            line-height: 1.6;
          }
          .highlight {
            font-weight: bold;
            color: #1a365d;
          }
          .footer {
            margin-top: 50px;
            display: flex;
            justify-content: space-between;
          }
          .signature {
            width: 200px;
            border-top: 2px solid #2d3748;
            padding-top: 10px;
            font-size: 16px;
          }
          .certificate-id {
            position: absolute;
            bottom: 20px;
            right: 40px;
            font-size: 12px;
            color: #718096;
          }
          .decoration {
            position: absolute;
            width: 100px;
            height: 100px;
            opacity: 0.1;
          }
          .decoration-1 {
            top: 50px;
            left: 50px;
            border-radius: 50%;
            border: 8px solid #1a365d;
          }
          .decoration-2 {
            bottom: 50px;
            right: 50px;
            transform: rotate(45deg);
            border: 8px solid #1a365d;
          }
          .stamp {
            position: absolute;
            top: 40px;
            right: 40px;
            width: 80px;
            height: 80px;
            border: 3px solid #e53e3e;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            color: #e53e3e;
            transform: rotate(-15deg);
          }
          @media print {
            body {
              background-color: white;
            }
            .certificate {
              box-shadow: none;
              border: 15px solid #1a365d;
            }
          }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div class="decoration decoration-1"></div>
          <div class="decoration decoration-2"></div>
          <div class="stamp">VERIFIED</div>
          
          <div class="header">
            <div class="title">Certificate of Achievement</div>
            <div class="subtitle">This certifies that</div>
          </div>
          
          <div class="recipient">${cert.name}</div>
          
          <div class="text">
            has successfully completed the <span class="highlight">${cert.course}</span> course
          </div>
          
          <div class="text">
            with a duration of <span class="highlight">${cert.duration}</span>
          </div>
          
          <div class="text">
            under the guidance of <span class="highlight">${cert.instructor}</span>
          </div>
          
          <div class="text">
            on <span class="highlight">${cert.date}</span>
          </div>
          
          <div class="footer">
            <div class="signature">
              <div>Instructor</div>
              <div>${cert.instructor}</div>
            </div>
            <div class="signature">
              <div>Date of Issue</div>
              <div>${cert.issueDate}</div>
            </div>
          </div>
          
          <div class="certificate-id">
            Certificate ID: CERT-${cert.serial.toString().padStart(4, '0')}
          </div>
        </div>
      </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(certificateContent);
    printWindow.document.close();
    
    printWindow.onload = function() {
      printWindow.print();
    };
  };

  const handleDeleteCertificate = (index) => {
    const updatedCertificates = certificates.filter((_, i) => i !== index);
    setCertificates(updatedCertificates);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center p-6 font-sans text-white">
      {/* Input Section */}
      <div className="w-full max-w-lg bg-gray-800 bg-opacity-80 p-6 rounded-xl shadow-lg mb-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-white">Certificate Maker</h1>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="নাম লিখুন"
          className="w-full mb-3 p-3 rounded-md bg-gray-700 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          placeholder="কোর্সের নাম"
          className="w-full mb-3 p-3 rounded-md bg-gray-700 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          value={instructor}
          onChange={(e) => setInstructor(e.target.value)}
          placeholder="ইনস্ট্রাক্টরের নাম"
          className="w-full mb-3 p-3 rounded-md bg-gray-700 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="কোর্সের সময়কাল (উদা: ৩ মাস)"
          className="w-full mb-3 p-3 rounded-md bg-gray-700 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full mb-3 p-3 rounded-md bg-gray-700 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleCreateCertificate}
          className="w-full py-2 mt-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
        >
          সার্টিফিকেট তৈরি করুন
        </button>
      </div>

      {/* Certificates List */}
      {certificates.length > 0 && (
        <div className="w-full max-w-2xl space-y-6">
          <h2 className="text-xl font-bold text-center mb-4">তৈরি করা সার্টিফিকেটগুলো ({certificates.length})</h2>
          
          {certificates.map((cert, index) => (
            <div
              key={index}
              className="bg-gray-800 bg-opacity-80 p-6 rounded-xl shadow-lg"
            >
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-white">Certificate of Completion</h2>
                <p className="text-sm text-gray-400">সিরিয়াল নং: {cert.serial}</p>
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-lg">
                  <span className="font-semibold">নাম:</span> {cert.name}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">কোর্স:</span> {cert.course}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">ইনস্ট্রাক্টর:</span> {cert.instructor}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">সময়কাল:</span> {cert.duration}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">সমাপ্তির তারিখ:</span> {cert.date}
                </p>
                <p className="text-sm text-gray-400">
                  <span className="font-semibold">ইস্যুর তারিখ:</span> {cert.issueDate}
                </p>
              </div>
              
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleDownloadCertificate(cert)}
                  className="flex-1 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700"
                >
                  ডাউনলোড করুন
                </button>
                <button
                  onClick={() => handleDeleteCertificate(index)}
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

export default Result;