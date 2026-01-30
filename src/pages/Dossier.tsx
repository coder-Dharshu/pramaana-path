import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import confetti from "canvas-confetti";
import { 
  FileText, Download, Share2, CheckCircle, ChevronRight, 
  Scale, User, Gavel, Shield, ArrowRight
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/landing/Footer";
import { FloatingAssistant } from "@/components/layout/FloatingAssistant";
import { PageTransition } from "@/components/ui/PageTransition";
import { Button } from "@/components/ui/button";

const dossierSections = [
  { id: 1, title: "Case Overview", pages: "1-3" },
  { id: 2, title: "Complainant Statement", pages: "4-6" },
  { id: 3, title: "Evidence Summary", pages: "7-12" },
  { id: 4, title: "Legal Framework", pages: "13-18" },
  { id: 5, title: "Precedent Analysis", pages: "19-24" },
  { id: 6, title: "Prayer/Relief Sought", pages: "25-26" },
];

export default function Dossier() {
  const [isReady, setIsReady] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Simulate dossier preparation
    const timer = setTimeout(() => {
      setIsReady(true);
      setShowSuccess(true);
      
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#F59E0B", "#1E3A5F", "#10B981"],
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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
                Your Legal Dossier
              </h1>
              <p className="text-lg text-muted-foreground">
                AI-generated, court-ready documentation for your case
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto">
              {/* Status Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="flex justify-center mb-8"
              >
                <motion.div
                  animate={isReady ? { 
                    scale: [1, 1.05, 1],
                  } : {}}
                  transition={{ duration: 0.5 }}
                  className={`inline-flex items-center gap-3 px-6 py-3 rounded-full ${
                    isReady 
                      ? "bg-success/10 text-success border border-success/30" 
                      : "bg-accent/10 text-accent border border-accent/30"
                  }`}
                >
                  {isReady ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold">Human Verified Draft</span>
                    </>
                  ) : (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Scale className="w-5 h-5" />
                      </motion.div>
                      <span className="font-semibold">Preparing Dossier...</span>
                    </>
                  )}
                </motion.div>
              </motion.div>

              {/* 3D Folder Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <motion.div
                  whileHover={{ 
                    rotateY: -5, 
                    rotateX: 5, 
                    translateZ: 20,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 40px rgba(251, 191, 36, 0.2)"
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                  className="bg-card rounded-3xl border border-border p-8 md:p-10 shadow-xl"
                >
                  {/* Folder Tab */}
                  <div className="absolute -top-4 left-8 right-8 h-6 bg-primary rounded-t-xl opacity-10" />
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Dossier Preview */}
                    <div>
                      <div className="bg-secondary/50 rounded-2xl p-6 mb-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
                            <FileText className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="font-bold text-foreground">PRAMAAN Dossier</h3>
                            <p className="text-sm text-muted-foreground">Case #PRM-2024-0847</p>
                          </div>
                        </div>

                        {/* Mini Document Preview */}
                        <div className="space-y-2 mb-4">
                          {[...Array(6)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + i * 0.1 }}
                              className="h-2 bg-border rounded"
                              style={{ width: `${Math.random() * 30 + 60}%` }}
                            />
                          ))}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>26 Pages</span>
                          <span>•</span>
                          <span>PDF Format</span>
                          <span>•</span>
                          <span>2.4 MB</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                          <Button className="btn-accent w-full flex items-center justify-center gap-2">
                            <Download className="w-4 h-4" />
                            Download PDF
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                          <Button variant="outline" className="w-full flex items-center justify-center gap-2 rounded-xl py-3 h-auto">
                            <Share2 className="w-4 h-4" />
                            Share with Lawyer
                          </Button>
                        </motion.div>
                      </div>
                    </div>

                    {/* Table of Contents */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Gavel className="w-4 h-4 text-accent" />
                        Document Contents
                      </h4>
                      <div className="space-y-2">
                        {dossierSections.map((section, index) => (
                          <motion.div
                            key={section.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            whileHover={{ x: 5, backgroundColor: "hsl(var(--secondary))" }}
                            className="flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all"
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-6 h-6 rounded-lg bg-accent/10 text-accent text-xs font-bold flex items-center justify-center">
                                {section.id}
                              </span>
                              <span className="text-sm font-medium text-foreground">{section.title}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>pp. {section.pages}</span>
                              <ChevronRight className="w-4 h-4" />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Brief Preview */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-8 p-6 rounded-2xl bg-secondary/30 border border-border"
                  >
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Scale className="w-4 h-4 text-accent" />
                      AI-Generated Brief Preview
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      <strong>IN THE MATTER OF:</strong> Land encroachment dispute between Shri Rajesh Kumar 
                      (Complainant) and Shri Suresh Sharma (Respondent) regarding Plot No. 142/A, 
                      Sector 15, District Gurgaon. The complainant seeks restoration of possession 
                      and removal of encroachment based on valid ownership documents dated 2015...
                    </p>
                    <div className="mt-4 flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="text-accent">
                        Read Full Brief
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Next Step CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex flex-col items-center"
              >
                <p className="text-muted-foreground mb-4">Ready to take legal action?</p>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link to="/lawyers">
                    <Button className="btn-hero flex items-center gap-3">
                      <User className="w-5 h-5" />
                      Connect with a Lawyer
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
