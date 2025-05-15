import { useState } from "react";
import { motion } from "framer-motion";

const Resume = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleDownload = () => {
    // Download the resume PDF
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Robert_A_Sanchez_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-light py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        {/* Download Button */}
        <div className="flex justify-end mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={handleDownload}
            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg shadow-lg hover:bg-opacity-90 transition-all duration-300"
          >
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${
                isHovered ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download Resume
          </motion.button>
        </div>

        {/* Resume PDF Preview */}
        <div className="flex justify-center bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
          <iframe
            src="/resume.pdf"
            title="Robert A. Sanchez Resume PDF"
            className="w-full h-[80vh]"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Resume;
