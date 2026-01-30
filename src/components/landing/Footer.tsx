import { motion } from "framer-motion";
import { Scale, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = {
  platform: [
    { name: "Voice Intake", path: "/voice-intake" },
    { name: "Upload Evidence", path: "/upload-evidence" },
    { name: "Case Dashboard", path: "/dashboard" },
    { name: "Find Lawyer", path: "/lawyers" },
  ],
  support: [
    { name: "Help Center", path: "#" },
    { name: "FAQs", path: "#" },
    { name: "Contact Us", path: "#" },
    { name: "Report Issue", path: "#" },
  ],
  legal: [
    { name: "Terms of Service", path: "#" },
    { name: "Privacy Policy", path: "#" },
    { name: "Cookie Policy", path: "#" },
    { name: "Disclaimer", path: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-navy-900 text-navy-100 pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent text-accent-foreground">
                <Scale className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold">PRAMAAN</span>
            </Link>
            <p className="text-navy-300 mb-6 max-w-sm">
              AI-powered legal aid platform helping rural citizens in India access justice through technology.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-navy-300">
                <Mail className="w-4 h-4" />
                <span className="text-sm">support@pramaan.in</span>
              </div>
              <div className="flex items-center gap-3 text-navy-300">
                <Phone className="w-4 h-4" />
                <span className="text-sm">1800-XXX-XXXX (Toll Free)</span>
              </div>
              <div className="flex items-center gap-3 text-navy-300">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">New Delhi, India</span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Platform</h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-navy-300 hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-navy-300 hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-navy-300 hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-navy-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-navy-400 text-sm">
              © 2024 PRAMAAN. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-navy-400 text-sm">
              <span>Made with</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-accent"
              >
                ❤️
              </motion.span>
              <span>for India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
