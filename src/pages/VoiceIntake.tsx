import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Mic, MicOff, Globe, MessageCircle, ArrowRight, Volume2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/landing/Footer";
import { FloatingAssistant } from "@/components/layout/FloatingAssistant";
import { PageTransition } from "@/components/ui/PageTransition";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिन्दी (Hindi)" },
  { code: "ta", name: "தமிழ் (Tamil)" },
  { code: "te", name: "తెలుగు (Telugu)" },
  { code: "mr", name: "मराठी (Marathi)" },
  { code: "bn", name: "বাংলা (Bengali)" },
];

const sampleMessages = [
  { role: "assistant", content: "Hello! I'm PRAMAAN AI. Please describe your legal issue in your own words. I'm listening..." },
];

export default function VoiceIntake() {
  const [isRecording, setIsRecording] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [messages, setMessages] = useState(sampleMessages);
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulate voice recording
  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Simulate gradual transcript appearance
      const sampleText = "I have a land dispute with my neighbor. They have encroached on my property and built a fence. I have the land documents but they are refusing to acknowledge my ownership.";
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < sampleText.length) {
          setTranscript(sampleText.substring(0, currentIndex + 5));
          currentIndex += 5;
        } else {
          clearInterval(interval);
        }
      }, 50);
    } else {
      setIsRecording(false);
      setIsProcessing(true);
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { role: "user", content: transcript },
          { role: "assistant", content: "I understand you have a land dispute. Based on your description, this appears to be a civil matter under the Indian Transfer of Property Act. Let me ask you a few questions to better understand your case..." }
        ]);
        setIsProcessing(false);
        setTranscript("");
      }, 1500);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-2xl mx-auto mb-12"
            >
              <h1 className="text-3xl md:text-display-sm font-bold text-foreground mb-4">
                Tell Us What Happened
              </h1>
              <p className="text-lg text-muted-foreground">
                Speak in your own words, in your own language. Our AI will understand and document everything.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {/* Language Selector */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex justify-center mb-8"
              >
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                    className="flex items-center gap-3 px-5 py-3 bg-card border border-border rounded-2xl shadow-sm hover:shadow-md transition-all"
                  >
                    <Globe className="w-5 h-5 text-accent" />
                    <span className="font-medium">
                      {languages.find(l => l.code === selectedLanguage)?.name}
                    </span>
                  </motion.button>

                  <AnimatePresence>
                    {showLanguageMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-2xl shadow-xl overflow-hidden z-20"
                      >
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setSelectedLanguage(lang.code);
                              setShowLanguageMenu(false);
                            }}
                            className={`w-full px-5 py-3 text-left hover:bg-secondary transition-colors ${
                              selectedLanguage === lang.code ? "bg-secondary" : ""
                            }`}
                          >
                            {lang.name}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Main Recording Interface */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-3xl border border-border shadow-xl p-8 md:p-12 mb-8"
              >
                {/* Microphone Button */}
                <div className="flex flex-col items-center mb-10">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleRecording}
                    className="relative"
                  >
                    {/* Pulse Rings */}
                    {isRecording && (
                      <>
                        <motion.div
                          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="absolute inset-0 rounded-full bg-accent"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                          className="absolute inset-0 rounded-full bg-accent"
                        />
                        <motion.div
                          animate={{ scale: [1, 2], opacity: [0.2, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                          className="absolute inset-0 rounded-full bg-accent"
                        />
                      </>
                    )}

                    <motion.div
                      animate={isRecording ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.5, repeat: isRecording ? Infinity : 0 }}
                      className={`relative z-10 w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isRecording
                          ? "bg-accent text-accent-foreground shadow-glow"
                          : "bg-primary text-primary-foreground hover:bg-primary/90"
                      }`}
                    >
                      {isRecording ? (
                        <MicOff className="w-12 h-12" />
                      ) : (
                        <Mic className="w-12 h-12" />
                      )}
                    </motion.div>
                  </motion.button>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 text-lg font-medium text-foreground"
                  >
                    {isRecording ? "Tap to stop recording" : "Tap to start speaking"}
                  </motion.p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {isRecording ? "Listening..." : "Your voice will be converted to text"}
                  </p>
                </div>

                {/* Live Transcript Panel */}
                <AnimatePresence>
                  {(transcript || isRecording) && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: 20, height: 0 }}
                      className="bg-secondary/50 rounded-2xl p-6 mb-6"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Volume2 className="w-4 h-4 text-accent" />
                        <span className="text-sm font-medium text-muted-foreground">
                          Live Transcript
                        </span>
                        {isRecording && (
                          <motion.span
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="w-2 h-2 rounded-full bg-accent ml-2"
                          />
                        )}
                      </div>
                      <p className="text-foreground leading-relaxed">
                        {transcript}
                        {isRecording && (
                          <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="inline-block w-0.5 h-5 bg-accent ml-1 align-middle"
                          />
                        )}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* AI Chat Messages */}
                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex items-start gap-3 max-w-[85%] ${
                          msg.role === "user" ? "flex-row-reverse" : ""
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            msg.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-accent text-accent-foreground"
                          }`}
                        >
                          <MessageCircle className="w-5 h-5" />
                        </div>
                        <div
                          className={`px-5 py-3 rounded-2xl ${
                            msg.role === "user"
                              ? "bg-primary text-primary-foreground rounded-tr-md"
                              : "bg-secondary text-secondary-foreground rounded-tl-md"
                          }`}
                        >
                          <p className="leading-relaxed">{msg.content}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isProcessing && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-10 h-10 rounded-xl bg-accent text-accent-foreground flex items-center justify-center">
                        <MessageCircle className="w-5 h-5" />
                      </div>
                      <div className="px-5 py-4 rounded-2xl rounded-tl-md bg-secondary">
                        <div className="flex items-center gap-1.5">
                          <span className="typing-dot" />
                          <span className="typing-dot" />
                          <span className="typing-dot" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Continue Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center"
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link to="/upload-evidence">
                    <Button className="btn-hero flex items-center gap-3">
                      Continue to Evidence Upload
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </main>

        <Footer />
        <FloatingAssistant />
      </div>
    </PageTransition>
  );
}
