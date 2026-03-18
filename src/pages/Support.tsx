import React from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  MessageSquare, 
  LifeBuoy, 
  ArrowLeft, 
  ExternalLink, 
  ShieldCheck, 
  Clock, 
  Globe 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Support = () => {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <nav className="bg-white border-b border-zinc-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <ArrowLeft className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-bold text-zinc-600 group-hover:text-blue-600 transition-colors">Back to Academy</span>
            </Link>
            <div className="flex items-center gap-2">
              <LifeBuoy className="w-5 h-5 text-blue-600" />
              <span className="text-lg font-bold tracking-tight text-zinc-900">Support Center</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4 tracking-tight">
              How can we help you today?
            </h1>
            <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
              Our dedicated support team is here to ensure your learning experience at Nexus Academy is seamless and productive.
            </p>
          </motion.div>
        </div>

        {/* Support Options Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
              <Mail className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-2xl font-bold text-zinc-900 mb-3">Email Support</h3>
            <p className="text-zinc-500 mb-6 leading-relaxed">
              For detailed inquiries regarding your account, technical issues, or academic records, our email support is available 24/7.
            </p>
            <a 
              href="mailto:nexusacademics2@gmail.com"
              className="inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all"
            >
              nexusacademics2@gmail.com <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
              <MessageSquare className="w-7 h-7 text-emerald-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-2xl font-bold text-zinc-900 mb-3">Admissions Help</h3>
            <p className="text-zinc-500 mb-6 leading-relaxed">
              Interested in joining Nexus Academy? Our admissions counselors can guide you through the enrollment process.
            </p>
            <button className="bg-zinc-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-zinc-800 transition-all">
              Request Information
            </button>
          </motion.div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12 border-t border-zinc-200">
          <div className="flex flex-col items-center text-center">
            <Clock className="w-6 h-6 text-zinc-400 mb-3" />
            <span className="text-sm font-bold text-zinc-900">24h Response</span>
            <span className="text-xs text-zinc-400">Average time</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <ShieldCheck className="w-6 h-6 text-zinc-400 mb-3" />
            <span className="text-sm font-bold text-zinc-900">Secure Data</span>
            <span className="text-xs text-zinc-400">Privacy first</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Globe className="w-6 h-6 text-zinc-400 mb-3" />
            <span className="text-sm font-bold text-zinc-900">Global Access</span>
            <span className="text-xs text-zinc-400">Study anywhere</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <LifeBuoy className="w-6 h-6 text-zinc-400 mb-3" />
            <span className="text-sm font-bold text-zinc-900">Expert Staff</span>
            <span className="text-xs text-zinc-400">Academic pros</span>
          </div>
        </div>

        {/* FAQ Preview */}
        <div className="mt-16 bg-blue-600 rounded-[2.5rem] p-12 text-white overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Quick Help</h2>
            <p className="text-blue-100 mb-8 max-w-xl">
              Can't find what you're looking for? Check our knowledge base or reach out directly. We're committed to your success.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all">
                Visit Help Center
              </button>
              <button className="bg-blue-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-400 transition-all border border-blue-400">
                System Status
              </button>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full -mr-20 -mt-20 blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400 rounded-full -ml-10 -mb-10 blur-2xl opacity-30" />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-zinc-200 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-zinc-400 text-sm">
            © 2026 Nexus Academy Support. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Support;
