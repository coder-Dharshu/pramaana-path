import { motion } from "framer-motion";
import { Mic, Upload, FileSearch, Users, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "Voice-First Intake",
    description: "Describe your issue in your own language. Our AI understands and documents everything.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Upload,
    title: "Smart Evidence Upload",
    description: "Upload documents, photos, and records. AI automatically categorizes and analyzes them.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: FileSearch,
    title: "AI Legal Analysis",
    description: "Get relevant laws, precedents, and case strategies tailored to your situation.",
    color: "bg-saffron-100 text-saffron-700",
  },
  {
    icon: Users,
    title: "Lawyer Connection",
    description: "Connect with verified lawyers who can review and represent your case.",
    color: "bg-success/10 text-success",
  },
  {
    icon: Shield,
    title: "Verified Dossiers",
    description: "Receive court-ready legal dossiers reviewed by legal professionals.",
    color: "bg-navy-100 text-navy-700",
  },
  {
    icon: Zap,
    title: "Fast Processing",
    description: "What takes weeks with traditional methods, PRAMAAN does in minutes.",
    color: "bg-accent/10 text-accent",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-display-sm font-bold text-foreground mb-4">
            How PRAMAAN Works
          </h2>
          <p className="text-lg text-muted-foreground">
            From complaint to court-ready dossier in four simple steps
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="card-premium group cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-5 transition-all duration-300`}
              >
                <feature.icon className="w-7 h-7" />
              </motion.div>
              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
