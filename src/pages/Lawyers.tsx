import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Phone, MessageCircle, Send, Star, MapPin, 
  Clock, CheckCircle, Filter, Search, Shield
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/landing/Footer";
import { FloatingAssistant } from "@/components/layout/FloatingAssistant";
import { PageTransition } from "@/components/ui/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const lawyers = [
  {
    id: 1,
    name: "Adv. Priya Sharma",
    specialization: "Property & Land Disputes",
    experience: "15 years",
    location: "Delhi",
    rating: 4.9,
    reviews: 127,
    available: true,
    verified: true,
    image: "PS",
    fee: "₹2,000/consultation",
  },
  {
    id: 2,
    name: "Adv. Rajesh Gupta",
    specialization: "Civil Litigation",
    experience: "12 years",
    location: "Gurgaon",
    rating: 4.7,
    reviews: 89,
    available: true,
    verified: true,
    image: "RG",
    fee: "₹1,500/consultation",
  },
  {
    id: 3,
    name: "Adv. Meera Patel",
    specialization: "Property Law",
    experience: "8 years",
    location: "Noida",
    rating: 4.8,
    reviews: 64,
    available: false,
    verified: true,
    image: "MP",
    fee: "₹1,800/consultation",
  },
  {
    id: 4,
    name: "Adv. Sunil Kumar",
    specialization: "Land & Revenue",
    experience: "20 years",
    location: "Delhi",
    rating: 4.9,
    reviews: 203,
    available: true,
    verified: true,
    image: "SK",
    fee: "₹2,500/consultation",
  },
];

export default function Lawyers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLawyer, setSelectedLawyer] = useState<number | null>(null);

  const filteredLawyers = lawyers.filter(lawyer => 
    lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lawyer.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                Connect with a Lawyer
              </h1>
              <p className="text-lg text-muted-foreground">
                Verified legal professionals ready to help with your case
              </p>
            </motion.div>

            {/* Search & Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="max-w-4xl mx-auto mb-8"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name or specialization..."
                    className="pl-12 h-12 rounded-xl"
                  />
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="outline" className="h-12 px-6 rounded-xl flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filters
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Lawyers Grid */}
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                {filteredLawyers.map((lawyer, index) => (
                  <motion.div
                    key={lawyer.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    whileHover={{ y: -5, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.15)" }}
                    onClick={() => setSelectedLawyer(selectedLawyer === lawyer.id ? null : lawyer.id)}
                    className={`card-premium cursor-pointer transition-all duration-300 ${
                      selectedLawyer === lawyer.id ? "ring-2 ring-accent" : ""
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                          {lawyer.image}
                        </div>
                        {lawyer.available && (
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-card"
                          />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground truncate">{lawyer.name}</h3>
                          {lawyer.verified && (
                            <Shield className="w-4 h-4 text-accent flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-accent mb-1">{lawyer.specialization}</p>
                        <p className="text-xs text-muted-foreground">{lawyer.experience} experience</p>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-accent fill-accent" />
                        <span className="font-medium text-foreground">{lawyer.rating}</span>
                        <span className="text-muted-foreground">({lawyer.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {lawyer.location}
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {lawyer.available ? (
                          <span className="text-success">Available Now</span>
                        ) : (
                          <span>Available Tomorrow</span>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                      <p className="font-semibold text-foreground">{lawyer.fee}</p>
                      <div className="flex gap-2">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button size="sm" variant="outline" className="rounded-xl flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            Call
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button size="sm" variant="outline" className="rounded-xl flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            WhatsApp
                          </Button>
                        </motion.div>
                      </div>
                    </div>

                    {/* Expanded Actions */}
                    <motion.div
                      initial={false}
                      animate={{ 
                        height: selectedLawyer === lawyer.id ? "auto" : 0,
                        opacity: selectedLawyer === lawyer.id ? 1 : 0
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 mt-4 border-t border-border">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button className="btn-accent w-full flex items-center justify-center gap-2">
                            <Send className="w-4 h-4" />
                            Send Dossier to {lawyer.name.split(" ")[1]}
                          </Button>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Empty State */}
              {filteredLawyers.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <p className="text-muted-foreground">No lawyers found matching your search.</p>
                </motion.div>
              )}
            </div>
          </div>
        </main>

        <Footer />
        <FloatingAssistant />
      </div>
    </PageTransition>
  );
}
