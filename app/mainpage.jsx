"use client";
import { useState, useRef } from "react";
import {processScribdUrl, triggerPdfDownload} from "../api/scribddownloader.js"

export default function ScribdDownloader() {
  const [url, setUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadData, setDownloadData] = useState(null);
  const [error, setError] = useState("");
  const downloadSectionRef = useRef(null);

  const handleDownload = async () => {
    if (!url.trim()) {
      setError("Please enter a valid Scribd URL");
      return;
    }

    setIsProcessing(true);
    setError("");
    setDownloadData(null);

    try {
      const response = await processScribdUrl(url);

      if (response.success) {
        setDownloadData(response);
        // Scroll to download section with smooth animation
        setTimeout(() => {
          downloadSectionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 300);
      } else {
        setError(response.message || "Failed to process PDF");
      }
    } catch (err) {
      setError("An error occurred while processing the PDF");
      console.log(err)
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFinalDownload = async () => {
    if (!downloadData?.downloadUrl) return;

    try {
      await triggerPdfDownload(downloadData.downloadUrl);
    } catch (err) {
      setError("Failed to download PDF");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-8 backdrop-blur-sm">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Scribd Downloader PDF Free
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Download any Scribd document as PDF instantly. Fast, secure, and
            completely free.
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
            {/* URL Input Section */}
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold mb-3 text-blue-100">
                  Enter Scribd URL
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://www.scribd.com/document/..."
                    className="w-full px-6 py-4 bg-white/5 border border-white/30 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-300 text-lg backdrop-blur-sm"
                    disabled={isProcessing}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-6">
                    <svg
                      className="w-5 h-5 text-blue-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.102m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/20 border border-red-400/50 rounded-xl p-4 text-red-200 backdrop-blur-sm">
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-5 h-5 text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{error}</span>
                  </div>
                </div>
              )}

              {/* Download Button */}
              <button
                onClick={handleDownload}
                disabled={isProcessing || !url.trim()}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:scale-100 disabled:cursor-not-allowed text-lg shadow-lg"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Please Wait PDF is being Generated...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span>Download PDF</span>
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Download Result Section */}
          {downloadData && (
            <div
              ref={downloadSectionRef}
              className="mt-12 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-3xl p-8 border border-green-400/30 shadow-2xl"
              style={{
                animation: "fadeInUp 0.6s ease-out",
              }}
            >
              <div className="text-center space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/30 rounded-full mb-4">
                  <svg
                    className="w-8 h-8 text-green-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-green-200 mb-2">
                    Download - {downloadData.title}
                  </h3>
                  <p className="text-green-300 text-lg">
                    Your PDF is ready for download!
                  </p>
                </div>

                <button
                  onClick={handleFinalDownload}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-lg shadow-lg"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg
                      className="w-6 h-6"
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
                    <span>Download PDF to your device</span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-24 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              icon: "⚡",
              title: "Lightning Fast",
              desc: "Download PDFs in seconds with our optimized servers",
            },
            {
              icon: "🔒",
              title: "Secure & Private",
              desc: "Your data is protected and never stored on our servers",
            },
            {
              icon: "💯",
              title: "Always Free",
              desc: "No subscriptions, no hidden fees, completely free forever",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-blue-200">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
