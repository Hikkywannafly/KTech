import React from 'react';
import './App.css';

function App() {
  return (
    <div className="flex flex-col md:flex-row p-8 bg-white font-sans max-w-5xl mx-auto shadow-md">

      <div className="bg-black text-white w-full md:w-1/3 p-6 flex flex-col items-center">
        <h1 className="text-xl mb-4">RESUME</h1>
        <img
          src="https://i.redd.it/dxdjz0kfu6f41.png"
          alt="Nguyen Chi Tam"
          className="w-40 h-40 object-cover rounded-full mb-4"
        />
        <div className="text-start flex-col gap-4 flex">
          <h2 className="text-lg font-bold mb-2">PROFILE</h2>
          <p className="text-sm">Name: <span className="italic">Nguyen Chi Tam</span></p>
          <p className="text-sm">Date of Birth: 29/06/2003</p>
          <p className="text-sm mt-2">Phone: 0708899391</p>
          <p className="text-sm">Email: ggraygon@gmai.com</p>
          <p className="text-sm mb-4">Github: Hikkywannafly</p>

          <h2 className="text-lg font-bold mt-4">HOBBIES</h2>
          <ul className="list-disc list-inside text-sm">
            <li>Coding</li>
            <li>Read Book</li>
            <li>Vibing</li>
          </ul>
        </div>
      </div>

      <div className="w-full md:w-2/3 p-6">
        <h1 className="text-4xl font-light text-gray-700">Nguyen Chi Tam</h1>
        <p className="text-gray-500 text-xl mb-6">Fullstack Developer</p>

        <h2 className="text-xl font-bold text-gray-800 mb-2">JOB EXPERIENCES</h2>
        {[
          {
            year: "2023 - Present",
            company: "ABC Tech Solutions",
            position: "Full Stack Developer",
            details: [
              "Developed and maintained web applications using React, Node.js, and MongoDB.",
              "Collaborated with UI/UX designers to implement responsive interfaces.",
              "Integrated RESTful APIs and optimized application performance."
            ]
          },
          {
            year: "2021 - 2023",
            company: "XYZ Software",
            position: "Frontend Developer",
            details: [
              "Built reusable React components and managed state with Redux.",
              "Improved website speed and SEO, resulting in a 30% increase in user engagement."
            ]
          },
          {
            year: "2020 - 2021",
            company: "Freelance",
            position: "Web Developer",
            details: [
              "Delivered custom websites for small businesses using MERN stack.",
              "Provided technical support and training for clients."
            ]
          },
        ].map((job, i) => (
          <div key={i} className="mb-4">
            <p className="font-bold text-sm">{job.year}</p>
            <p className="uppercase text-gray-800 font-bold text-sm">{job.company}</p>
            <p className="italic text-gray-600 text-sm">{job.position}</p>
            <ul className="list-disc list-inside text-sm text-gray-500 pl-4">
              {job.details.map((d, j) => (
                <li key={j}>{d}</li>
              ))}
            </ul>
          </div>
        ))}

        {/* Education */}
        <h2 className="text-xl font-bold text-gray-800 mt-6 mb-2">EDUCATION</h2>
        {[
          {
            year: "2019 - 2023",
            school: "VKU University of Technology",
            course: "Bachelor of Science in Computer Science",
            details: "Relevant coursework: Web Development, Database Systems, Software Engineering."
          },
          {
            year: "2017 - 2019",
            school: "High School for the Gifted",
            course: "Specialized in Mathematics and Informatics",
            details: ""
          },
        ].map((edu, i) => (
          <div key={i} className="mb-4">
            <p className="font-bold text-sm">{edu.year}</p>
            <p className="uppercase text-gray-800 font-bold text-sm">{edu.school}</p>
            <p className="italic text-gray-600 text-sm">{edu.course}</p>
            {edu.details && (
              <p className="text-sm text-gray-500">{edu.details}</p>
            )}
          </div>
        ))}

        <h2 className="text-xl font-bold text-gray-800 mt-6 mb-2">PROFESSIONAL SKILLS</h2>
        {[
          { skill: "JavaScript / TypeScript", level: "w-11/12" },
          { skill: "React.js / Next.js", level: "w-11/12" },
          { skill: "Node.js / Express.js", level: "w-10/12" },
          { skill: "HTML5 & CSS3 / Tailwind CSS", level: "w-10/12" },
          { skill: "MongoDB / SQL", level: "w-9/12" },
          { skill: "Git & GitHub", level: "w-9/12" },
          { skill: "RESTful APIs", level: "w-9/12" },
        ].map((skill, i) => (
          <div key={i} className="mb-2">
            <p className="text-sm font-medium text-gray-700">{skill.skill}</p>
            <div className="w-full bg-gray-200 h-2 rounded">
              <div className={`bg-black h-2 rounded ${skill.level}`}></div>
            </div>
          </div>
        ))}

        <h2 className="text-xl font-bold text-gray-800 mt-6 mb-2">PERSONAL SKILLS</h2>
        {[
          "Teamwork & Collaboration",
          "Problem Solving",
          "Time Management",
          "Communication",
          "Adaptability",
        ].map((skill, i) => (
          <div key={i} className="mb-2">
            <p className="text-sm font-medium text-gray-700">{skill}</p>
            <div className="w-full bg-gray-200 h-2 rounded">
              <div className="bg-black h-2 w-10/12 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
