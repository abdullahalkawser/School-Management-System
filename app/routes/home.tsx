import React, { useState } from "react";
import ResultSheetMaker from "~/Certificate";
import CertificateMaker from "~/Certificate";
import MCQPage from "~/MCQ";
import Navbar from "~/Navbar";
import Result from "~/welcome/resultsheet";
import Welcome from "~/welcome/welcome"; 

export default function Home() {
  const [active, setActive] = useState("Question");

  return (
    <div className="bg-gray-900 min-h-screen text-white pt-20">
      {/* Navbar */}
      <Navbar active={active} setActive={setActive} />

      {/* Main content */}
      <div className="container mx-auto p-6">
        {active === "Question" && <Welcome />}

        {active === "MCQ" && <MCQPage />}

        {active === "Certificate" && <Result />
    }

        {active === "Result Sheet" && <ResultSheetMaker/>}
      </div>
    </div>
  );
}
