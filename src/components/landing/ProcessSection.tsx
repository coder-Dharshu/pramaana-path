import { motion } from "framer-motion";
import { Mic, Upload, Brain, FileCheck, Gavel } from "lucide-react";

const steps = [
  {
    step: 1,
    icon: Mic,
    title: "Voice Intake",
    description: "Describe your legal issue in your own words",
  },
  {
    step: 2,
    icon: Upload,
    title: "Upload Evidence",
    description: "Add supporting documents and photos",
  },
  {
    step: 3,
    icon: Brain,
    title: "AI Analysis",
    description: "Our AI finds relevant laws and precedents",
  },
  {
    step: 4,
    icon: FileCheck,
    title: "Dossier Ready",
    description: "Receive a court-ready legal document",
  },
  {
    step: 5,
    icon: Gavel,
    title: "Legal Action",
    description: "Connect with lawyers or proceed to court",
  },
];

export function ProcessSection() {
  return (
    <section className="py-24 bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] rounded-full border border-border/20 opacity-50"
      />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-display-sm font-bold text-foreground mb-4">
            Your Journey to Justice
          </h2>
          <p className="text-lg text-muted-foreground">
            Five simple steps from problem to solution
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Step Number with Icon */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative z-10 mb-6"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.2, type: "spring" }}
                    className="w-20 h-20 rounded-2xl bg-card border-2 border-accent shadow-lg flex items-center justify-center"
                  >
                    <step.icon className="w-8 h-8 text-accent" />
                  </motion.div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </motion.div>

                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground max-w-[200px]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
