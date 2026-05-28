"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";

export default function LandingPage() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const uploadedFiles = Array.from(e.target.files);
    setFiles(uploadedFiles);
  };

  const handleStartReview = () => {
    if (files.length === 0) {
      alert("Please upload at least one receipt.");
      return;
    }

    router.push("/review");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f5f0] to-[#dfe9e3] flex items-center justify-center px-6">
      <div className="relative w-full max-w-md h-screen">
        <motion.div
          className="absolute inset-0 rounded-[36px] blur-3xl opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, #4ade80 0%, transparent 60%)",
              "radial-gradient(circle at 80% 70%, #22c55e 0%, transparent 60%)",
              "radial-gradient(circle at 40% 60%, #16a34a 0%, transparent 60%)",
            ],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative border border-white/40 rounded-[36px] p-8 bg-white/60 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] flex flex-col justify-between h-full"
        >
          <motion.div
            className="mt-4 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold shadow-md">
              AI
            </div>
          </motion.div>

          <div className="text-center">
            <motion.h1
              className="text-4xl font-serif text-green-900 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Review Expenses.
              <br />
              <span className="text-green-700 italic">With Policy AI.</span>
            </motion.h1>

            <motion.p
              className="text-gray-700 text-sm mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Upload receipt PDFs or images and get AI-powered policy checks,
              risk flags, citations, and reviewer-ready decisions.
            </motion.p>

            <div className="mt-10 flex justify-center gap-3 opacity-70">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="w-16 h-16 bg-green-200 rounded-full blur-[2px]"
              />
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="w-20 h-20 bg-green-300 rounded-full blur-[1px]"
              />
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5.5, repeat: Infinity }}
                className="w-16 h-16 bg-green-100 rounded-full blur-[2px]"
              />
            </div>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
            >
              <label className="block border-2 border-dashed border-green-300 rounded-2xl p-5 bg-white/50 cursor-pointer hover:bg-white/70 transition">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                <p className="text-green-900 font-semibold">
                  Upload receipts
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  PDF, JPG, JPEG, PNG supported
                </p>
              </label>

              {files.length > 0 && (
                <div className="mt-3 text-left bg-white/60 rounded-xl p-3 max-h-24 overflow-y-auto">
                  {files.map((file, index) => (
                    <p key={index} className="text-xs text-gray-700 truncate">
                      {index + 1}. {file.name}
                    </p>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.button
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.01 }}
              onClick={handleStartReview}
              className="w-full bg-green-700 text-white py-4 rounded-2xl text-lg font-semibold shadow-md hover:bg-green-800 transition"
            >
              Start AI Review
            </motion.button>

            <p className="text-center text-xs text-gray-500 mt-3">
              PDF + image receipts · Policy-grounded review
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}