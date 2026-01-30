import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Clock, FileText, CheckCircle, AlertCircle, ArrowRight,
  Gavel, Scale, Users, FileSearch, ChevronDown, ChevronUp,
  Bookmark, Download
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/landing/Footer";
import { FloatingAssistant } from "@/components/layout/FloatingAssistant";
import { PageTransition } from "@/components/ui/PageTransition";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const caseSteps = [
  { id: 1, name: "Intake", status: "completed" },
  { id: 2, name: "Evidence", status: "completed" },
  { id: 3, name: "Draft", status: "current" },
  { id: 4, name: "Dossier", status: "pending" },
  { id: 5, name: "Lawyer", status: "pending" },
];

const timelineEvents = [
  { date: "Today, 2:30 PM", title: "Voice statement recorded", icon: FileText },
  { date: "Today, 2:35 PM", title: "Land documents uploaded", icon: FileText },
  { date: "Today, 2:40 PM", title: "AI analysis started", icon: FileSearch },
  { date: "Today, 2:45 PM", title: "Draft being prepared", icon: Scale },
];

const evidenceChecklist = [
  { id: 1, name: "Land ownership documents", uploaded: true },
  { id: 2, name: "Survey/plot map", uploaded: true },
  { id: 3, name: "Property tax receipts", uploaded: false },
  { id: 4, name: "Neighbor's encroachment photos", uploaded: true },
  { id: 5, name: "Previous correspondence", uploaded: false },
];

const applicableLaws = [
  {
    title: "Transfer of Property Act, 1882",
    sections: ["Section 53A - Part Performance", "Section 54 - Sale of Immovable Property"],
    relevance: "high",
  },
  {
    title: "Indian Evidence Act, 1872",
    sections: ["Section 3 - Evidence", "Section 65B - Electronic Records"],
    relevance: "medium",
  },
  {
    title: "Limitation Act, 1963",
    sections: ["Article 64 - For possession of immovable property"],
    relevance: "high",
  },
];

const precedents = [
  {
    case: "Suraj Lamp & Industries vs State Of Haryana (2012)",
    court: "Supreme Court of India",
    summary: "Clarified rights of buyers in property disputes and validity of sale agreements.",
  },
  {
    case: "Ramesh Chand vs Anil Panjwani (2018)",
    court: "Delhi High Court",
    summary: "Established criteria for proving adverse possession in land encroachment cases.",
  },
];

export default function Dashboard() {
  const [expandedSections, setExpandedSections] = useState<string[]>(["timeline"]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Step Progress Tracker */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl border border-border p-6 mb-8"
            >
              <div className="flex items-center justify-between overflow-x-auto">
                {caseSteps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex flex-col items-center"
                    >
                      <motion.div
                        animate={step.status === "current" ? { 
                          scale: [1, 1.1, 1],
                          boxShadow: ["0 0 0 0 rgba(251, 191, 36, 0)", "0 0 20px 5px rgba(251, 191, 36, 0.3)", "0 0 0 0 rgba(251, 191, 36, 0)"]
                        } : {}}
                        transition={{ duration: 2, repeat: step.status === "current" ? Infinity : 0 }}
                        className={`step-indicator ${step.status}`}
                      >
                        {step.status === "completed" ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          step.id
                        )}
                      </motion.div>
                      <span className={`mt-2 text-xs font-medium ${
                        step.status === "current" ? "text-accent" : 
                        step.status === "completed" ? "text-foreground" : "text-muted-foreground"
                      }`}>
                        {step.name}
                      </span>
                    </motion.div>
                    
                    {index < caseSteps.length - 1 && (
                      <div className={`w-12 md:w-24 h-0.5 mx-2 ${
                        step.status === "completed" ? "bg-primary" : "bg-border"
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-8">
              {/* Left Sidebar - Timeline & Checklist */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-3 space-y-6"
              >
                {/* Timeline */}
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-accent" />
                    Case Timeline
                  </h3>
                  <div className="space-y-4">
                    {timelineEvents.map((event, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex gap-3"
                      >
                        <div className="relative">
                          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                            <event.icon className="w-4 h-4 text-accent" />
                          </div>
                          {index < timelineEvents.length - 1 && (
                            <div className="absolute top-8 left-1/2 w-0.5 h-8 -translate-x-1/2 bg-border" />
                          )}
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">{event.date}</p>
                          <p className="text-sm font-medium text-foreground">{event.title}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Evidence Checklist */}
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-accent" />
                    Evidence Checklist
                  </h3>
                  <div className="space-y-3">
                    {evidenceChecklist.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                        className="flex items-center gap-3"
                      >
                        <div className={`w-5 h-5 rounded flex items-center justify-center ${
                          item.uploaded ? "bg-success text-white" : "bg-secondary"
                        }`}>
                          {item.uploaded && <CheckCircle className="w-3 h-3" />}
                        </div>
                        <span className={`text-sm ${
                          item.uploaded ? "text-foreground" : "text-muted-foreground"
                        }`}>
                          {item.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div whileHover={{ scale: 1.02 }} className="mt-4">
                    <Link to="/upload-evidence">
                      <Button variant="outline" size="sm" className="w-full">
                        Upload More Evidence
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>

              {/* Main Panel - Case Summary */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="lg:col-span-5 space-y-6"
              >
                {/* Case Summary Card */}
                <div className="bg-card rounded-2xl border border-border p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-2">
                        Land Dispute Case
                      </h2>
                      <p className="text-muted-foreground">Case ID: PRM-2024-0847</p>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                      In Progress
                    </div>
                  </div>

                  <div className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="p-4 rounded-xl bg-secondary/50"
                    >
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Gavel className="w-4 h-4 text-accent" />
                        Issue Summary
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        The complainant reports that their neighbor has encroached upon their property 
                        by building a fence approximately 3 feet into the complainant's land. 
                        The complainant has valid land ownership documents dating back to 2015.
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="p-4 rounded-xl bg-secondary/50"
                    >
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Users className="w-4 h-4 text-accent" />
                        Parties Involved
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Complainant</p>
                          <p className="font-medium text-foreground">Rajesh Kumar</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Respondent</p>
                          <p className="font-medium text-foreground">Suresh Sharma</p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="p-4 rounded-xl bg-secondary/50"
                    >
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Scale className="w-4 h-4 text-accent" />
                        AI Analysis Status
                      </h4>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "65%" }}
                            transition={{ duration: 1, delay: 0.7 }}
                            className="h-full bg-accent"
                          />
                        </div>
                        <span className="text-sm font-medium text-foreground">65%</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Analyzing legal precedents and applicable laws...
                      </p>
                    </motion.div>
                  </div>
                </div>

                {/* Continue Button */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link to="/dossier">
                    <Button className="btn-hero w-full flex items-center justify-center gap-3">
                      View Dossier Preview
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Right Panel - Laws & Precedents */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-4 space-y-6"
              >
                {/* Applicable Laws */}
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Bookmark className="w-5 h-5 text-accent" />
                    Applicable Laws
                  </h3>
                  
                  <Accordion type="multiple" className="space-y-3">
                    {applicableLaws.map((law, index) => (
                      <AccordionItem 
                        key={index} 
                        value={`law-${index}`}
                        className="border border-border rounded-xl overflow-hidden"
                      >
                        <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-secondary/50">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${
                              law.relevance === "high" ? "bg-accent" : "bg-muted-foreground"
                            }`} />
                            <span className="text-sm font-medium text-left">{law.title}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-3">
                          <ul className="space-y-2">
                            {law.sections.map((section, sIndex) => (
                              <li key={sIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-accent" />
                                {section}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>

                {/* Relevant Precedents */}
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Gavel className="w-5 h-5 text-accent" />
                    Relevant Precedents
                  </h3>
                  
                  <div className="space-y-4">
                    {precedents.map((precedent, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="p-4 rounded-xl bg-secondary/50 cursor-pointer hover:bg-secondary transition-colors"
                      >
                        <h4 className="text-sm font-semibold text-foreground mb-1">
                          {precedent.case}
                        </h4>
                        <p className="text-xs text-accent mb-2">{precedent.court}</p>
                        <p className="text-xs text-muted-foreground">{precedent.summary}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
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
