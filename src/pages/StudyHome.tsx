import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  GraduationCap, 
  Users, 
  Search, 
  ChevronRight, 
  Layout, 
  Clock, 
  CheckCircle2,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';

interface StudyHomeProps {
  onUnlock: () => void;
}

export const StudyHome: React.FC<StudyHomeProps> = ({ onUnlock }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleSecretClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 3) {
      onUnlock();
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans selection:bg-blue-100">
      {/* Navigation */}
      <nav className="bg-white border-b border-zinc-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-blue-900">NexusAcademy</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-sm font-medium text-zinc-600 hover:text-blue-600 transition-colors">Courses</a>
              <a href="#" className="text-sm font-medium text-zinc-600 hover:text-blue-600 transition-colors">Resources</a>
              <a href="#" className="text-sm font-medium text-zinc-600 hover:text-blue-600 transition-colors">About</a>
              <button className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm">
                Student Login
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
                <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
                Enrollment Open for Spring 2026
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-zinc-900 leading-[1.1] mb-6">
                Master Your Future with <span className="text-blue-600">Precision.</span>
              </h1>
              <p className="text-lg text-zinc-600 mb-8 max-w-lg leading-relaxed">
                Access world-class educational resources, interactive modules, and a global community of learners. NexusAcademy provides the tools you need to excel in your academic journey.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2">
                  Explore Courses <ArrowRight className="w-5 h-5" />
                </button>
                <button className="bg-white border border-zinc-200 text-zinc-900 px-8 py-4 rounded-xl font-bold hover:bg-zinc-50 transition-all">
                  View Curriculum
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-video bg-white rounded-3xl shadow-2xl border border-zinc-100 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000" 
                  alt="Students studying" 
                  className="w-full h-full object-cover opacity-90"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
              </div>
              {/* Floating Stats */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-zinc-100 hidden sm:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-zinc-900">98%</div>
                    <div className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Success Rate</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 mb-4">Why Choose NexusAcademy?</h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">Our platform is designed to provide a seamless learning experience, combining technology with pedagogical excellence.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: "Curated Content", desc: "Expertly designed courses across 50+ disciplines." },
              { icon: Users, title: "Expert Mentors", desc: "Learn from industry leaders and academic pioneers." },
              { icon: Clock, title: "Flexible Learning", desc: "Study at your own pace with 24/7 access to resources." }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl bg-zinc-50 border border-zinc-100 hover:border-blue-200 transition-all hover:shadow-lg group">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-blue-600 transition-colors">
                  <feature.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-3">{feature.title}</h3>
                <p className="text-zinc-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight">NexusAcademy</span>
              </div>
              <p className="text-zinc-400 max-w-sm">
                Empowering students worldwide through innovative digital education solutions. Join over 500,000 learners today.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-zinc-400">
                <li><a href="#" className="hover:text-white transition-colors">Course Catalog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Scholarships</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Contact</h4>
              <ul className="space-y-4 text-zinc-400">
                <li>support@nexusacademy.edu</li>
                <li>1-800-NEXUS-EDU</li>
                <li>Global Support Center</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-zinc-500 text-sm">
              <span 
                onClick={handleSecretClick}
                className="cursor-default select-none"
              >
                &copy;
              </span> {new Date().getFullYear()} NexusAcademy. All rights reserved. Registered Educational Provider.
            </p>
            <div className="flex gap-6 text-zinc-500 text-sm">
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
