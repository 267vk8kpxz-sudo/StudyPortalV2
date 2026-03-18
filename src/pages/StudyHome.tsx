import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
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
  BrainCircuit,
  Mail,
  Globe,
  FileText,
  ShieldCheck,
  Cookie,
  ArrowLeft,
  Trophy,
  HelpCircle,
  LifeBuoy
} from 'lucide-react';
import { COURSES_DATA, Course, Trivia, Question as TriviaQuestion } from '../data/courses';

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
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [activeTab, setActiveTab] = useState<'home' | 'trivia' | 'courses' | 'legal'>('home');
  const [legalContent, setLegalContent] = useState<'terms' | 'privacy' | 'cookies'>('terms');
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ id: '', password: '' });
  const [userName, setUserName] = useState('');
  
  // Detailed Course View State
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedTrivia, setSelectedTrivia] = useState<Trivia | null>(null);
  
  // Trivia Session State
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameMode, setGameMode] = useState<'study' | 'time-attack'>('study');
  const [isTimerActive, setIsTimerActive] = useState(false);
  
  // Trivia State
  const [questions, setQuestions] = useState<Question[]>(() => {
    const saved = localStorage.getItem('nexus_trivia_data');
    return saved ? JSON.parse(saved) : [
      { id: '1', question: 'What is the capital of France?', answer: 'Paris', options: ['London', 'Berlin', 'Paris', 'Madrid'] }
    ];
  });
  const [newQuestion, setNewQuestion] = useState({ question: '', answer: '', options: ['', '', '', ''] });
  const [isCreating, setIsCreating] = useState(false);

  // Courses Data (Now using imported COURSES_DATA)
  const courses = COURSES_DATA;

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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock login
    if (loginData.id && loginData.password) {
      setIsLoggedIn(true);
      setUserName(loginData.id.split('@')[0] || 'Student');
      setShowLogin(false);
      setLoginData({ id: '', password: '' });
      alert('Login successful! Welcome back to Nexus Academy.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setActiveTab('home');
  };

  const playCustomTrivia = () => {
    if (questions.length === 0) return;
    const customTrivia: Trivia = {
      id: 'custom-trivia',
      title: 'Your Custom Trivia',
      questions: questions
    };
    setSelectedTrivia(customTrivia);
    setUserAnswers({});
    setShowResults(false);
    setScore(0);
    setTimeLeft(questions.length * 30);
    setGameMode('study');
    setIsTimerActive(false);
    setActiveTab('courses');
    window.scrollTo(0, 0);
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

  const showLegal = (type: 'terms' | 'privacy' | 'cookies') => {
    setLegalContent(type);
    setActiveTab('legal');
    window.scrollTo(0, 0);
  };

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
    setSelectedTrivia(null);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerActive && timeLeft > 0 && !showResults) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerActive && !showResults) {
      handleSubmitTrivia();
    }
    return () => clearInterval(timer);
  }, [isTimerActive, timeLeft, showResults]);

  const handleTriviaClick = (trivia: Trivia) => {
    setSelectedTrivia(trivia);
    setUserAnswers({});
    setShowResults(false);
    setScore(0);
    setGameMode('study');
    setTimeLeft(30);
    setIsTimerActive(false);
    window.scrollTo(0, 0);
  };

  const startTrivia = (mode: 'study' | 'time-attack') => {
    setGameMode(mode);
    if (mode === 'time-attack') {
      setTimeLeft(selectedTrivia?.questions.length ? selectedTrivia.questions.length * 10 : 60);
      setIsTimerActive(true);
    }
    window.scrollTo(0, 0);
  };

  const handleAnswerSelect = (questionId: string, option: string) => {
    if (showResults) return;
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: option
    }));
  };

  const handleSubmitTrivia = () => {
    if (!selectedTrivia) return;
    
    let correctCount = 0;
    selectedTrivia.questions.forEach(q => {
      if (userAnswers[q.id] === q.answer) {
        correctCount++;
      }
    });
    
    setScore(correctCount);
    setShowResults(true);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans selection:bg-blue-100">
      {/* Login Modal */}
      <AnimatePresence>
        {showLogin && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogin(false)}
              className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-blue-600" />
              <button 
                onClick={() => setShowLogin(false)}
                className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-zinc-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-7 h-7 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-zinc-900">Welcome Back</h2>
                <p className="text-zinc-500 mt-1">Sign in to your student account</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">Student ID</label>
                  <input 
                    type="text"
                    required
                    placeholder="Enter your ID"
                    value={loginData.id}
                    onChange={(e) => setLoginData({...loginData, id: e.target.value})}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">Password</label>
                  <input 
                    type="password"
                    required
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-zinc-600 cursor-pointer">
                    <input type="checkbox" className="rounded border-zinc-300 text-blue-600 focus:ring-blue-500" />
                    Remember me
                  </label>
                  <button 
                    type="button" 
                    onClick={() => navigate('/support')}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                >
                  Log in
                </button>
              </form>

              <p className="text-center text-zinc-500 text-sm mt-8">
                Don't have an account? <button onClick={() => navigate('/support')} className="text-blue-600 font-semibold hover:underline">Contact Admissions</button>
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="bg-white border-b border-zinc-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setActiveTab('home'); setSelectedCourse(null); setSelectedTrivia(null); }}>
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-blue-900">NexusAcademy</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => { setActiveTab('home'); setSelectedCourse(null); setSelectedTrivia(null); }}
                className={`text-sm font-medium transition-colors ${activeTab === 'home' ? 'text-blue-600' : 'text-zinc-600 hover:text-blue-600'}`}
              >
                Home
              </button>
              <button 
                onClick={() => { setActiveTab('courses'); setSelectedCourse(null); setSelectedTrivia(null); }}
                className={`text-sm font-medium transition-colors ${activeTab === 'courses' ? 'text-blue-600' : 'text-zinc-600 hover:text-blue-600'}`}
              >
                Courses
              </button>
              <button 
                onClick={() => { setActiveTab('trivia'); setSelectedCourse(null); setSelectedTrivia(null); }}
                className={`text-sm font-medium transition-colors ${activeTab === 'trivia' ? 'text-blue-600' : 'text-zinc-600 hover:text-blue-600'}`}
              >
                Trivia Maker
              </button>
              <button 
                onClick={() => navigate('/support')}
                className="text-sm font-medium text-zinc-600 hover:text-blue-600 transition-colors"
              >
                Support
              </button>
              
              {isLoggedIn ? (
                <div className="flex items-center gap-4 pl-4 border-l border-zinc-200">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-bold text-zinc-900">{userName}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors"
                  >
                    Log out
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setShowLogin(true)}
                  className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm"
                >
                  Log in
                </button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Content */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-zinc-200 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                <button 
                  onClick={() => { setActiveTab('home'); setSelectedCourse(null); setSelectedTrivia(null); setIsMenuOpen(false); }}
                  className="block w-full text-left text-sm font-medium text-zinc-600 hover:text-blue-600"
                >
                  Home
                </button>
                <button 
                  onClick={() => { setActiveTab('courses'); setSelectedCourse(null); setSelectedTrivia(null); setIsMenuOpen(false); }}
                  className="block w-full text-left text-sm font-medium text-zinc-600 hover:text-blue-600"
                >
                  Courses
                </button>
                <button 
                  onClick={() => { setActiveTab('trivia'); setSelectedCourse(null); setSelectedTrivia(null); setIsMenuOpen(false); }}
                  className="block w-full text-left text-sm font-medium text-zinc-600 hover:text-blue-600"
                >
                  Trivia Maker
                </button>
                <button 
                  onClick={() => { navigate('/support'); setIsMenuOpen(false); }}
                  className="block w-full text-left text-sm font-medium text-zinc-600 hover:text-blue-600"
                >
                  Support
                </button>
                
                {isLoggedIn ? (
                  <div className="pt-4 border-t border-zinc-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                        {userName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-zinc-900">{userName}</div>
                        <div className="text-xs text-zinc-500">Student Account</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                      className="w-full bg-rose-50 text-rose-600 px-5 py-3 rounded-xl text-sm font-semibold hover:bg-rose-100 transition-all"
                    >
                      Log out
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => { setShowLogin(true); setIsMenuOpen(false); }}
                    className="w-full bg-blue-600 text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all"
                  >
                    Log in
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence mode="wait">
        {activeTab === 'home' && (
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
                        onClick={() => { setActiveTab('courses'); window.scrollTo(0, 0); }}
                        className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2"
                      >
                        Start Learning <ArrowRight className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => { setActiveTab('courses'); window.scrollTo(0, 0); }}
                        className="bg-white border border-zinc-200 text-zinc-900 px-8 py-4 rounded-xl font-bold hover:bg-zinc-50 transition-all"
                      >
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
        )}

        {activeTab === 'courses' && (
          <motion.div
            key="courses"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto px-4 py-20"
          >
            {!selectedCourse ? (
              <>
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-zinc-900 mb-4">Course Catalog</h2>
                  <p className="text-zinc-500">Browse our extensive library of academic courses for all grade levels.</p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {courses.map((course) => (
                    <div key={course.id} className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm hover:shadow-md transition-all">
                      <div className="flex justify-between items-start mb-4">
                        <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">
                          {course.subject}
                        </span>
                        <span className="text-xs font-medium text-zinc-400">{course.grade}</span>
                      </div>
                      <h3 className="text-xl font-bold text-zinc-900 mb-3">{course.title}</h3>
                      <p className="text-zinc-600 text-sm leading-relaxed mb-6">{course.description}</p>
                      <button 
                        onClick={() => handleCourseClick(course)}
                        className="text-blue-600 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all"
                      >
                        View Course Details <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            ) : !selectedTrivia ? (
              <div className="max-w-4xl mx-auto">
                <button 
                  onClick={() => setSelectedCourse(null)}
                  className="mb-8 text-zinc-500 font-medium flex items-center gap-2 hover:text-blue-600 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Catalog
                </button>
                
                <div className="bg-white p-10 rounded-[2.5rem] border border-zinc-100 shadow-sm mb-12">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest">
                      {selectedCourse.subject}
                    </span>
                    <span className="text-sm font-medium text-zinc-400">{selectedCourse.grade}</span>
                  </div>
                  <h2 className="text-4xl font-extrabold text-zinc-900 mb-4">{selectedCourse.title}</h2>
                  <p className="text-lg text-zinc-600 leading-relaxed mb-8">{selectedCourse.description}</p>
                  
                  <div className="grid sm:grid-cols-3 gap-6 pt-8 border-t border-zinc-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center">
                        <Clock className="w-5 h-5 text-zinc-400" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Duration</div>
                        <div className="text-sm font-bold text-zinc-900">12 Weeks</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center">
                        <Users className="w-5 h-5 text-zinc-400" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Students</div>
                        <div className="text-sm font-bold text-zinc-900">1.2k Enrolled</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-zinc-400" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Level</div>
                        <div className="text-sm font-bold text-zinc-900">Intermediate</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
                    <Trophy className="text-amber-500" /> Available Study Trivias
                  </h3>
                  <div className="flex bg-zinc-100 p-1 rounded-xl">
                    <button 
                      onClick={() => setGameMode('study')}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${gameMode === 'study' ? 'bg-white text-blue-600 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
                    >
                      Study Mode
                    </button>
                    <button 
                      onClick={() => setGameMode('time-attack')}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${gameMode === 'time-attack' ? 'bg-white text-blue-600 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
                    >
                      Time Attack
                    </button>
                  </div>
                </div>
                
                <div className="grid gap-4">
                  {selectedCourse.trivias.map((trivia) => (
                    <button 
                      key={trivia.id}
                      onClick={() => {
                        setSelectedTrivia(trivia);
                        setUserAnswers({});
                        setShowResults(false);
                        setScore(0);
                        if (gameMode === 'time-attack') {
                          setTimeLeft(trivia.questions.length * 10);
                          setIsTimerActive(true);
                        } else {
                          setIsTimerActive(false);
                        }
                        window.scrollTo(0, 0);
                      }}
                      className="w-full bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm hover:border-blue-200 hover:shadow-md transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                          <BrainCircuit className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                        </div>
                        <div className="text-left">
                          <h4 className="text-lg font-bold text-zinc-900">{trivia.title}</h4>
                          <p className="text-sm text-zinc-500">{trivia.questions.length} Questions • {gameMode === 'study' ? 'Untimed' : 'Timed Session'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {gameMode === 'time-attack' && (
                          <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                            {trivia.questions.length * 10}s
                          </span>
                        )}
                        <div className="w-10 h-10 rounded-full border border-zinc-100 flex items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-200 transition-all">
                          <ChevronRight className="w-5 h-5 text-zinc-400 group-hover:text-blue-600" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                  <button 
                    onClick={() => {
                      setSelectedTrivia(null);
                      setShowResults(false);
                    }}
                    className="text-zinc-500 font-medium flex items-center gap-2 hover:text-blue-600 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back to Course
                  </button>
                  {showResults && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-bold border border-amber-100">
                      <Trophy className="w-4 h-4" />
                      Score: {score} / {selectedTrivia.questions.length}
                    </div>
                  )}
                </div>

                {showResults ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-[2.5rem] border border-zinc-100 shadow-xl overflow-hidden mb-12"
                  >
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-12 text-white text-center">
                      <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <Trophy className="w-12 h-12 text-white" />
                      </div>
                      <h2 className="text-4xl font-black mb-2">Study Session Complete!</h2>
                      <p className="text-blue-100 text-lg mb-8">You've mastered another module at Nexus Academy.</p>
                      
                      <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                          <div className="text-3xl font-black">{Math.round((score / selectedTrivia.questions.length) * 100)}%</div>
                          <div className="text-xs font-bold uppercase tracking-widest opacity-60">Accuracy</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                          <div className="text-3xl font-black">{score}</div>
                          <div className="text-xs font-bold uppercase tracking-widest opacity-60">Correct</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-10">
                      <h3 className="text-xl font-bold text-zinc-900 mb-6">Review Your Answers</h3>
                      <div className="space-y-6">
                        {selectedTrivia.questions.map((q, idx) => {
                          const isCorrect = userAnswers[q.id] === q.answer;
                          return (
                            <div key={q.id} className={`p-6 rounded-2xl border ${isCorrect ? 'border-emerald-100 bg-emerald-50/30' : 'border-rose-100 bg-rose-50/30'}`}>
                              <div className="flex gap-4">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${isCorrect ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                                  {idx + 1}
                                </div>
                                <div>
                                  <p className="font-bold text-zinc-900 mb-3">{q.question}</p>
                                  <div className="flex flex-wrap gap-4 text-sm">
                                    <div className="flex items-center gap-2">
                                      <span className="text-zinc-400 font-medium uppercase text-[10px] tracking-widest">Your Answer:</span>
                                      <span className={`font-bold ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                                        {userAnswers[q.id] || 'Skipped'}
                                      </span>
                                    </div>
                                    {!isCorrect && (
                                      <div className="flex items-center gap-2">
                                        <span className="text-zinc-400 font-medium uppercase text-[10px] tracking-widest">Correct:</span>
                                        <span className="font-bold text-emerald-600">{q.answer}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="mt-12 flex gap-4">
                        <button 
                          onClick={() => handleTriviaClick(selectedTrivia)}
                          className="flex-1 bg-zinc-900 text-white py-4 rounded-xl font-bold hover:bg-zinc-800 transition-all"
                        >
                          Try Again
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedTrivia(null);
                            setShowResults(false);
                          }}
                          className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all"
                        >
                          Back to Course
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm overflow-hidden">
                    <div className="bg-blue-600 p-8 text-white">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3 opacity-80">
                          <GraduationCap className="w-5 h-5" />
                          <span className="text-xs font-bold uppercase tracking-widest">{selectedCourse.title}</span>
                        </div>
                        {gameMode === 'time-attack' && (
                          <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full font-bold text-sm backdrop-blur-md border ${timeLeft < 10 ? 'bg-rose-500/20 border-rose-500 text-rose-100 animate-pulse' : 'bg-white/20 border-white/20 text-white'}`}>
                            <Clock className="w-4 h-4" />
                            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
                          </div>
                        )}
                      </div>
                      <h2 className="text-3xl font-bold">{selectedTrivia.title}</h2>
                      
                      {/* Progress Bar */}
                      <div className="mt-6 h-2 bg-white/20 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-white"
                          initial={{ width: 0 }}
                          animate={{ width: `${(Object.keys(userAnswers).length / selectedTrivia.questions.length) * 100}%` }}
                        />
                      </div>
                      <div className="mt-2 text-[10px] font-bold uppercase tracking-widest opacity-60">
                        Progress: {Object.keys(userAnswers).length} / {selectedTrivia.questions.length} Questions Answered
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <div className="space-y-12">
                        {selectedTrivia.questions.map((q, idx) => (
                          <div key={q.id} className="relative pl-12">
                            <div className="absolute left-0 top-0 w-8 h-8 bg-zinc-50 rounded-lg flex items-center justify-center text-xs font-bold text-zinc-400 border border-zinc-100">
                              {idx + 1}
                            </div>
                            <h4 className="text-lg font-bold text-zinc-900 mb-6 leading-relaxed">{q.question}</h4>
                            <div className="grid sm:grid-cols-2 gap-3">
                              {q.options.map((opt, i) => {
                                const isSelected = userAnswers[q.id] === opt;
                                return (
                                  <button 
                                    key={i}
                                    onClick={() => handleAnswerSelect(q.id, opt)}
                                    className={`p-4 rounded-xl border text-left text-sm font-medium transition-all flex items-center gap-3 ${
                                      isSelected 
                                        ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600' 
                                        : 'border-zinc-100 text-zinc-600 hover:border-blue-200 hover:bg-blue-50/50'
                                    }`}
                                  >
                                    <span className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold border transition-colors ${
                                      isSelected 
                                        ? 'bg-blue-600 text-white border-blue-600' 
                                        : 'bg-zinc-50 text-zinc-400 border-zinc-100'
                                    }`}>
                                      {String.fromCharCode(65 + i)}
                                    </span>
                                    {opt}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-16 pt-8 border-t border-zinc-100 text-center">
                        <button 
                          onClick={handleSubmitTrivia}
                          disabled={Object.keys(userAnswers).length < selectedTrivia.questions.length}
                          className={`px-12 py-4 rounded-xl font-bold transition-all shadow-lg ${
                            Object.keys(userAnswers).length < selectedTrivia.questions.length
                              ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/20'
                          }`}
                        >
                          {Object.keys(userAnswers).length < selectedTrivia.questions.length 
                            ? `Answer all questions (${Object.keys(userAnswers).length}/${selectedTrivia.questions.length})`
                            : 'Submit Study Session'
                          }
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'trivia' && (
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
              <div className="flex gap-4">
                {questions.length > 0 && (
                  <button 
                    onClick={playCustomTrivia}
                    className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 flex items-center gap-2"
                  >
                    <Play className="w-5 h-5" /> Play Your Trivia
                  </button>
                )}
                <button 
                  onClick={() => setIsCreating(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" /> Create New
                </button>
              </div>
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

        {activeTab === 'legal' && (
          <motion.div
            key="legal"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto px-4 py-20"
          >
            <div className="bg-white p-12 rounded-3xl border border-zinc-100 shadow-sm">
              {legalContent === 'terms' && (
                <div className="prose prose-zinc max-w-none">
                  <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                    <FileText className="text-blue-600" /> Terms of Service
                  </h2>
                  <p className="text-zinc-600 leading-relaxed mb-6">Welcome to Nexus Academy. By accessing our platform, you agree to comply with and be bound by the following terms and conditions of use.</p>
                  <h3 className="text-xl font-bold mb-4">1. Acceptance of Terms</h3>
                  <p className="text-zinc-600 mb-6">The services that Nexus Academy provides to you are subject to the following Terms of Service ("TOS"). Nexus Academy reserves the right to update the TOS at any time without notice to you.</p>
                  <h3 className="text-xl font-bold mb-4">2. Description of Services</h3>
                  <p className="text-zinc-600 mb-6">Nexus Academy provides you with access to a variety of resources, including learning materials, communication forums, and educational tools.</p>
                  <h3 className="text-xl font-bold mb-4">3. User Conduct</h3>
                  <p className="text-zinc-600 mb-6">As a condition of your use of the Services, you will not use the Services for any purpose that is unlawful or prohibited by these terms, conditions, and notices.</p>
                </div>
              )}
              {legalContent === 'privacy' && (
                <div className="prose prose-zinc max-w-none">
                  <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                    <ShieldCheck className="text-blue-600" /> Privacy Policy
                  </h2>
                  <p className="text-zinc-600 leading-relaxed mb-6">Your privacy is important to us. It is Nexus Academy's policy to respect your privacy regarding any information we may collect from you across our website.</p>
                  <h3 className="text-xl font-bold mb-4">1. Information We Collect</h3>
                  <p className="text-zinc-600 mb-6">We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.</p>
                  <h3 className="text-xl font-bold mb-4">2. Use of Information</h3>
                  <p className="text-zinc-600 mb-6">We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft.</p>
                </div>
              )}
              {legalContent === 'cookies' && (
                <div className="prose prose-zinc max-w-none">
                  <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                    <Cookie className="text-blue-600" /> Cookie Policy
                  </h2>
                  <p className="text-zinc-600 leading-relaxed mb-6">This is the Cookie Policy for Nexus Academy, accessible from our platform.</p>
                  <h3 className="text-xl font-bold mb-4">What Are Cookies</h3>
                  <p className="text-zinc-600 mb-6">As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience.</p>
                  <h3 className="text-xl font-bold mb-4">How We Use Cookies</h3>
                  <p className="text-zinc-600 mb-6">We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site.</p>
                </div>
              )}
              <button 
                onClick={() => setActiveTab('home')}
                className="mt-12 text-blue-600 font-bold flex items-center gap-2"
              >
                <ArrowRight className="w-4 h-4 rotate-180" /> Back to Home
              </button>
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
                <li>
                  <button onClick={() => setActiveTab('courses')} className="hover:text-white transition-colors">
                    Course Catalog
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('trivia')} className="hover:text-white transition-colors">
                    Trivia Maker
                  </button>
                </li>
                <li>
                  <button onClick={() => showLegal('privacy')} className="hover:text-white transition-colors">
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Support</h4>
              <ul className="space-y-4 text-zinc-400">
                <li>
                  <button onClick={() => navigate('/support')} className="hover:text-white transition-colors flex items-center gap-2">
                    <LifeBuoy className="w-4 h-4" /> Support Center
                  </button>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" /> nexusacademics2@gmail.com
                </li>
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
              <button onClick={() => showLegal('terms')} className="hover:text-white transition-colors">Terms</button>
              <button onClick={() => showLegal('privacy')} className="hover:text-white transition-colors">Privacy</button>
              <button onClick={() => showLegal('cookies')} className="hover:text-white transition-colors">Cookies</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
