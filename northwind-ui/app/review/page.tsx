"use client";

import { useEffect, useState } from "react";

export default function ReviewPage() {
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("reviewResult");
    if (saved) setResult(JSON.parse(saved));
  }, []);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f5f0]">
        <p>No review result found.</p>
      </div>
    );
  }

  const getBadgeStyle = (verdict: string) => {
    if (verdict === "compliant") return "bg-green-100 text-green-800 border-green-200";
    if (verdict === "flagged") return "bg-yellow-100 text-yellow-800 border-yellow-200";
    if (verdict === "rejected") return "bg-red-100 text-red-800 border-red-200";
    return "bg-orange-100 text-orange-800 border-orange-200";
  };

  const formatVerdict = (verdict: string) => {
    return verdict.replace("_", " ");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f5f0] to-[#dfe9e3] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/75 backdrop-blur-xl border border-white rounded-[32px] p-8 shadow-sm">
          <p className="text-sm text-green-700 font-semibold">
            Northwind Logistics
          </p>

          <h1 className="text-4xl font-bold text-green-950 mt-2">
            AI Expense Review
          </h1>

          <p className="text-gray-600 mt-2">
            Submission ID: {result.submission_id}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {Object.entries(result.summary || {}).map(([key, value]: any) => (
              <div
                key={key}
                className="bg-white rounded-2xl p-4 border shadow-sm"
              >
                <p className="text-xs text-gray-500 uppercase">
                  {key.replace("_", " ")}
                </p>
                <p className="text-3xl font-bold text-green-900 mt-1">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 mt-8">
          {result.receipts?.map((receipt: any, index: number) => {
            const verdict = receipt.decision?.verdict || "needs_review";
            const reviewerAction =
              receipt.decision?.reviewer_action ||
              "Escalate this item to a human finance reviewer.";

            return (
              <div
                key={index}
                className="bg-white/85 backdrop-blur-xl rounded-[28px] shadow-sm border border-white p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs text-gray-400">
                      Receipt #{index + 1}
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-1">
                      {receipt.file_name}
                    </h2>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold border ${getBadgeStyle(
                      verdict
                    )}`}
                  >
                    {formatVerdict(verdict)}
                  </span>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-[#f7f5f0] rounded-2xl p-4">
                    <p className="text-xs text-gray-500">AI Verdict</p>
                    <p className="font-semibold text-gray-900 mt-1 capitalize">
                      {formatVerdict(verdict)}
                    </p>
                  </div>

                  <div className="bg-[#f7f5f0] rounded-2xl p-4">
                    <p className="text-xs text-gray-500">Confidence</p>
                    <p className="font-semibold text-gray-900 mt-1">
                      {Math.round((receipt.decision?.confidence || 0) * 100)}%
                    </p>
                  </div>

                  <div className="bg-[#f7f5f0] rounded-2xl p-4">
                    <p className="text-xs text-gray-500">Reviewer Action</p>
                    <p className="font-semibold text-gray-900 mt-1">
                      Groq generated
                    </p>
                  </div>
                </div>

                <div className="mt-6 bg-green-50 border border-green-100 rounded-2xl p-5">
                  <h3 className="font-bold text-green-950">
                    Groq AI Recommendation
                  </h3>

                  <p className="text-gray-800 mt-2">
                    {receipt.decision?.reasoning ||
                      "No reasoning was returned by the model."}
                  </p>
                </div>

                <div className="mt-4 bg-orange-50 border border-orange-100 rounded-2xl p-5">
                  <h3 className="font-bold text-orange-900">
                    What the reviewer should do next
                  </h3>

                  <p className="text-gray-800 mt-2">
                    {reviewerAction}
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="font-bold text-gray-900">Policy Evidence</h3>

                  {receipt.decision?.citations?.length > 0 ? (
                    receipt.decision.citations.map((citation: any, i: number) => (
                      <div
                        key={i}
                        className="mt-3 bg-gray-50 border rounded-2xl p-4"
                      >
                        <p className="text-sm font-semibold text-gray-900">
                          {citation.policy_id}{" "}
                          <span className="text-gray-500">
                            Section {citation.section}
                          </span>
                        </p>

                        <p className="text-sm text-gray-700 italic mt-2">
                          “{citation.quote}”
                        </p>

                        <p className="text-xs text-gray-500 mt-2">
                          Source: {citation.source_file}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 mt-2">
                      No policy evidence was returned.
                    </p>
                  )}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button className="px-5 py-3 rounded-2xl bg-green-700 text-white font-semibold hover:bg-green-800 transition">
                    Approve
                  </button>

                  <button className="px-5 py-3 rounded-2xl bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition">
                    Request Info
                  </button>

                  <button className="px-5 py-3 rounded-2xl bg-red-600 text-white font-semibold hover:bg-red-700 transition">
                    Reject
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}