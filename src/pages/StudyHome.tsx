import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  X,
  Plus,
  Play,
  Trash2,
  Save,
  BrainCircuit
} from 'lucide-react';

interface StudyHomeProps {
  onUnlock: () => void;
}

interface Question {
  id: string;
  question: string;
  answer: string;
  options: string[];
}

export const StudyHome: React.FC<StudyHomeProps> = ({ onUnlock }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [activeTab, setActiveTab] = useState<'home' | 'trivia'>('home');
  
  // Trivia State
  const [questions, setQuestions] = useState<Question[]>(() => {
    const saved = localStorage.getItem('nexus_trivia_data');
    return saved ? JSON.parse(saved) : [
      { id: '1', question: 'What is the capital of France?', answer: 'Paris', options: ['London', 'Berlin', 'Paris', 'Madrid'] }
    ];
  });
  const [newQuestion, setNewQuestion] = useState({ question: '', answer: '', options: ['', '', '', ''] });
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    localStorage.setItem('nexus_trivia_data', JSON.stringify(questions));
  }, [questions]);

  const handleSecretClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 3) {
      onUnlock();
    }
  };

  const addQuestion = () => {
    if (!newQuestion.question || !newQuestion.answer) return;
    const q: Question = {
      id: Date.now().toString(),
      ...newQuestion
    };
    setQuestions([...questions, q]);
    setNewQuestion({ question: '', answer: '', options: ['', '', '', ''] });
    setIsCreating(false);
  };

  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans selection:bg-blue-100">
      {/* Navigation */}
      <nav className="bg-white border-b border-zinc-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-blue-900">NexusAcademy</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => setActiveTab('home')}
                className={`text-sm font-medium transition-colors ${activeTab === 'home' ? 'text-blue-600' : 'text-zinc-600 hover:text-blue-600'}`}
              >
                Home
              </button>
              <button 
                onClick={() => setActiveTab('trivia')}
                className={`text-sm font-medium transition-colors ${activeTab === 'trivia' ? 'text-blue-600' : 'text-zinc-600 hover:text-blue-600'}`}
              >
                Trivia Maker
              </button>
              <a href="#" className="text-sm font-medium text-zinc-600 hover:text-blue-600 transition-colors">Resources</a>
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

      <AnimatePresence mode="wait">
        {activeTab === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Hero Section */}
            <section className="relative py-20 lg:py-32 overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
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
                      <button 
                        onClick={() => setActiveTab('trivia')}
                        className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2"
                      >
                        Start Learning <ArrowRight className="w-5 h-5" />
                      </button>
                      <button className="bg-white border border-zinc-200 text-zinc-900 px-8 py-4 rounded-xl font-bold hover:bg-zinc-50 transition-all">
                        View Curriculum
                      </button>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="aspect-video bg-white rounded-3xl shadow-2xl border border-zinc-100 overflow-hidden relative">
                      <img 
                        src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000" 
                        alt="Students studying" 
                        className="w-full h-full object-cover opacity-90"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
                    </div>
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
                  </div>
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
          </motion.div>
        ) : (
          <motion.div
            key="trivia"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="max-w-5xl mx-auto px-4 py-12"
          >
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold text-zinc-900 flex items-center gap-3">
                  <BrainCircuit className="text-blue-600" />
                  Trivia Maker
                </h2>
                <p className="text-zinc-500 mt-2">Create and manage your own study quizzes.</p>
              </div>
              <button 
                onClick={() => setIsCreating(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" /> Create New
              </button>
            </div>

            {isCreating && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 rounded-3xl shadow-xl border border-zinc-100 mb-12"
              >
                <div className="grid gap-6">
                  <div>
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">Question</label>
                    <input 
                      type="text"
                      placeholder="Enter your question..."
                      value={newQuestion.question}
                      onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {newQuestion.options.map((opt, i) => (
                      <div key={i}>
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">Option {i + 1}</label>
                        <input 
                          type="text"
                          placeholder={`Option ${i + 1}`}
                          value={opt}
                          onChange={(e) => {
                            const newOpts = [...newQuestion.options];
                            newOpts[i] = e.target.value;
                            setNewQuestion({...newQuestion, options: newOpts});
                          }}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2 text-zinc-900 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">Correct Answer</label>
                    <input 
                      type="text"
                      placeholder="Must match one of the options"
                      value={newQuestion.answer}
                      onChange={(e) => setNewQuestion({...newQuestion, answer: e.target.value})}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button 
                      onClick={addQuestion}
                      className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2"
                    >
                      <Save className="w-5 h-5" /> Save Question
                    </button>
                    <button 
                      onClick={() => setIsCreating(false)}
                      className="bg-zinc-100 text-zinc-600 px-8 py-3 rounded-xl font-bold hover:bg-zinc-200 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="grid gap-6">
              {questions.map((q) => (
                <div key={q.id} className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm flex justify-between items-center group hover:border-blue-200 transition-all">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900 mb-1">{q.question}</h3>
                    <div className="flex gap-4 text-sm text-zinc-500">
                      <span>Answer: <span className="text-emerald-600 font-bold">{q.answer}</span></span>
                      <span>•</span>
                      <span>{q.options.length} Options</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-zinc-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                      <Play className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => deleteQuestion(q.id)}
                      className="p-2 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
              {questions.length === 0 && (
                <div className="text-center py-20 bg-zinc-50 rounded-3xl border-2 border-dashed border-zinc-200">
                  <p className="text-zinc-400 font-medium">No questions yet. Create your first trivia question!</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
