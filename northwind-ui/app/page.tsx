"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LandingPage() {
  const router = useRouter();

  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;

    const uploadedFiles = Array.from(event.target.files);
    setFiles(uploadedFiles);
  };

  const handleStartReview = async () => {
    if (files.length === 0) {
      alert("Please upload at least one receipt.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("employee_name", "Vedant Padole");
      formData.append("department", "Engineering");
      formData.append("grade", "L3");

      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/review`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Backend review failed");
      }

      const result = await response.json();

      localStorage.setItem(
        "reviewResult",
        JSON.stringify(result)
      );

      router.push("/review");
    } catch (error) {
      console.error(error);
      alert("Something went wrong while reviewing receipts.");
    } finally {
      setLoading(false);
    }
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
            <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white font-bold shadow-md text-xl">
              $
            </div>
          </motion.div>

          <div className="text-center">
            <motion.h1
              className="text-4xl font-serif text-green-900 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              AI Expense
              <br />
              <span className="text-green-700 italic">
                Policy Review
              </span>
            </motion.h1>

            <motion.p
              className="text-gray-700 text-sm mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Upload receipts and let AI review employee
              expense submissions against company policy.
            </motion.p>

            <div className="mt-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Upload Receipts
              </label>

              <input
                type="file"
                multiple
                accept=".pdf,image/*"
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded-2xl p-3 bg-white"
              />

              {files.length > 0 && (
                <div className="mt-4 text-left">
                  <p className="text-sm font-semibold text-gray-700">
                    Uploaded Files:
                  </p>

                  <ul className="mt-2 space-y-2">
                    {files.map((file, index) => (
                      <li
                        key={index}
                        className="text-xs bg-green-50 p-2 rounded-xl border border-green-100"
                      >
                        {file.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

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
              disabled={loading}
              className="w-full bg-green-700 text-white py-4 rounded-2xl text-lg font-semibold shadow-md hover:bg-green-800 transition"
            >
              {loading ? "Reviewing..." : "Start AI Review"}
            </motion.button>

            <p className="text-center text-xs text-gray-500 mt-3">
              Groq + LangGraph + ChromaDB powered
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}