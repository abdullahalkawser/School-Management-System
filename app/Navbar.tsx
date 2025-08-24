import React from "react";

export default function Navbar({ active, setActive }) {
  const navItems = ["MCQ", "Question", "Certificate", "Result Sheet"];

  return (
    <nav className="bg-gray-900 bg-opacity-90 text-white p-4 shadow-md fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-400">School Portal</h1>
        <ul className="flex gap-6">
          {navItems.map((item) => (
            <li
              key={item}
              onClick={() => setActive(item)}
              className={`cursor-pointer px-2 py-1 rounded transition-colors ${
                active === item
                  ? "bg-indigo-500 text-white font-semibold"
                  : "hover:text-indigo-400"
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
