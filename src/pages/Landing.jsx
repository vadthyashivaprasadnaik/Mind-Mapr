import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BrainCircuit,
  ArrowRight,
  Sparkles,
  Zap,
  BookOpen,
  Target,
  FileText,
  BarChart3,
  CheckCircle2,
  Layers,
  FileX,
  CalendarX,
  Upload,
  Cpu,
  Check,
  ChevronRight,
  TrendingUp,
  Award,
  RefreshCw,
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';

export default function Landing() {
  // Hero Mockup Interactive States
  const [activeTab, setActiveTab] = useState('mindmap'); // 'mindmap' | 'flashcards' | 'quiz' | 'summary'
  const [selectedNode, setSelectedNode] = useState('Process Scheduling');
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedQuizOption, setSelectedQuizOption] = useState(null);

  // Mind map nodes data for hero interactive preview
  const mindMapNodes = [
    { id: 'proc', label: 'Process Scheduling', desc: 'Preemptive vs Non-preemptive, Round Robin, SJF', count: '4 Subtopics', color: 'primary' },
    { id: 'mem', label: 'Virtual Memory', desc: 'Paging, Segmentation, TLB, Page Replacement', count: '6 Subtopics', color: 'secondary' },
    { id: 'sync', label: 'Concurrency & Locks', desc: 'Mutex, Semaphores, Deadlock Avoidance (Banker\'s)', count: '5 Subtopics', color: 'success' },
    { id: 'fs', label: 'File Systems', desc: 'Inodes, FAT, Directory Structure, Allocation', count: '3 Subtopics', color: 'warning' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-16 selection:bg-primary-500 selection:text-white">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION                                                          */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
        {/* Background ambient lighting effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-primary-400/20 via-secondary-400/20 to-transparent blur-[120px] pointer-events-none -z-10 rounded-full" />
        <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-primary-300/15 blur-[100px] pointer-events-none -z-10 rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            {/* Top Pill / Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full border border-primary-200/60 shadow-sm shadow-primary-100/50 mb-8 animate-in fade-in duration-700">
              <span className="flex h-2 w-2 rounded-full bg-primary-600 animate-ping" />
              <Sparkles className="w-4 h-4 text-primary-600" />
              <span className="text-xs sm:text-sm font-semibold text-slate-800">
                AI-Powered Smart Revision Assistant
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
              Learn. Map. Recall. <br className="hidden sm:inline" />
              <span className="gradient-text">Master.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
              Mind Mapr automatically converts your lectures, lecture slides, and notes into interactive mind maps, structured summaries, active recall flashcards, and adaptive quizzes.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-8">
              <Link to="/register" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" iconRight={ArrowRight} className="w-full sm:w-auto shadow-lg shadow-primary-500/25 px-8 py-3.5 text-base font-semibold">
                  Get Started Free
                </Button>
              </Link>
              <a href="#how-it-works" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-6 py-3.5 text-base font-semibold hover:border-slate-300">
                  See How It Works
                </Button>
              </a>
            </div>

            {/* Trust Micro-Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Zero configuration needed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Supports PDFs, PPTs & Notes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Instant revision generation</span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* HERO INTERACTIVE MOCK DASHBOARD                                          */}
          {/* ========================================================================= */}
          <div className="mt-14 sm:mt-20 max-w-5xl mx-auto">
            <div className="relative rounded-3xl bg-slate-900/90 p-2 sm:p-3 ring-1 ring-white/20 shadow-2xl shadow-primary-900/20 backdrop-blur-xl">
              {/* Browser / App Frame Top Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-slate-800 bg-slate-950/60 rounded-t-2xl">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-xs font-medium text-slate-400 font-mono hidden sm:inline">
                    mindmapr.app/revision/operating-systems-unit-3
                  </span>
                </div>

                {/* Module switcher tabs inside preview */}
                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
                  <button
                    onClick={() => setActiveTab('mindmap')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                      activeTab === 'mindmap'
                        ? 'bg-primary-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <BrainCircuit className="w-3.5 h-3.5" />
                    <span>Mind Map</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('flashcards')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                      activeTab === 'flashcards'
                        ? 'bg-primary-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Flashcards</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('quiz')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                      activeTab === 'quiz'
                        ? 'bg-primary-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Target className="w-3.5 h-3.5" />
                    <span>Quiz</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('summary')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                      activeTab === 'summary'
                        ? 'bg-primary-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Summary</span>
                  </button>
                </div>
              </div>

              {/* Main Content Area of Mockup */}
              <div className="bg-slate-900 rounded-b-2xl p-4 sm:p-8 min-h-[380px] sm:min-h-[440px] flex flex-col justify-between text-slate-100">
                {/* 1. Mind Map Interactive Preview */}
                {activeTab === 'mindmap' && (
                  <div className="flex-1 flex flex-col">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                      <div>
                        <span className="text-xs font-semibold text-primary-400 uppercase tracking-wider">Concept Hierarchy Map</span>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                          <span>Operating Systems: Core Architecture</span>
                          <Badge variant="primary" className="bg-primary-950/80 text-primary-300 border-primary-700/50">
                            AI Generated
                          </Badge>
                        </h3>
                      </div>
                      <span className="text-xs text-slate-400">Click any subtopic to inspect details</span>
                    </div>

                    {/* Interactive Node Graph Visualization */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      {/* Central Root Node */}
                      <div className="md:col-span-4 flex flex-col items-center">
                        <div className="w-full p-4 rounded-2xl bg-gradient-to-br from-primary-600 to-secondary-600 text-white shadow-xl shadow-primary-950/50 border border-primary-400/30 text-center relative group cursor-default">
                          <div className="absolute -top-2.5 right-3 bg-secondary-400 text-slate-950 font-extrabold text-[10px] uppercase px-2 py-0.5 rounded-full shadow">
                            Root Concept
                          </div>
                          <BrainCircuit className="w-8 h-8 mx-auto mb-2 text-primary-100" />
                          <h4 className="text-base font-bold">Operating Systems</h4>
                          <p className="text-xs text-primary-100 mt-1">CS301 • Unit 3 Revision Map</p>
                        </div>
                      </div>

                      {/* Connecting Tree Nodes */}
                      <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {mindMapNodes.map((node) => {
                          const isSelected = selectedNode === node.label;
                          return (
                            <div
                              key={node.id}
                              onClick={() => setSelectedNode(node.label)}
                              className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer text-left ${
                                isSelected
                                  ? 'bg-slate-800/90 border-primary-500 ring-2 ring-primary-500/30 shadow-lg'
                                  : 'bg-slate-800/40 border-slate-700/70 hover:bg-slate-800/70 hover:border-slate-600'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className={`text-sm font-semibold ${isSelected ? 'text-primary-300' : 'text-slate-200'}`}>
                                  {node.label}
                                </span>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900/80 text-slate-300 border border-slate-700">
                                  {node.count}
                                </span>
                              </div>
                              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                                {node.desc}
                              </p>
                              {isSelected && (
                                <div className="mt-2.5 pt-2 border-t border-slate-700 flex items-center justify-between text-[11px] text-primary-400 font-medium">
                                  <span>Active Focus Topic</span>
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Flashcards Interactive Preview */}
                {activeTab === 'flashcards' && (
                  <div className="flex-1 flex flex-col items-center justify-center max-w-xl mx-auto w-full py-2">
                    <div className="text-center mb-4">
                      <span className="text-xs font-semibold text-secondary-400 uppercase tracking-wider">Active Recall Flashcard</span>
                      <p className="text-xs text-slate-400 mt-0.5">Card 3 of 12 • High-Yield Exam Concept</p>
                    </div>

                    {/* Flippable Card */}
                    <div
                      onClick={() => setIsFlipped(!isFlipped)}
                      className={`w-full min-h-[190px] sm:min-h-[210px] rounded-2xl p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 border ${
                        isFlipped
                          ? 'bg-gradient-to-br from-secondary-950 to-slate-900 border-secondary-500/50 shadow-lg shadow-secondary-950/50'
                          : 'bg-slate-800/80 border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span className="font-semibold text-primary-400">
                          {isFlipped ? 'Answer (Concept Breakdown)' : 'Question (Prompt)'}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-slate-400 bg-slate-900/60 px-2 py-1 rounded-lg border border-slate-800">
                          <RefreshCw className="w-3 h-3 text-slate-400" />
                          Click to Flip
                        </span>
                      </div>

                      <div className="my-3">
                        {!isFlipped ? (
                          <h4 className="text-base sm:text-lg font-semibold text-white leading-snug">
                            What is the primary cause of <span className="text-secondary-300 underline decoration-secondary-500/40">Thrashing</span> in Virtual Memory systems, and how can it be resolved?
                          </h4>
                        ) : (
                          <div className="space-y-2 text-sm text-slate-200">
                            <p className="font-medium text-white">
                              Cause: A process spends more time swapping pages in and out than executing CPU instructions because total working set size exceeds physical memory.
                            </p>
                            <p className="text-xs text-slate-400">
                              Resolution: Use the <strong className="text-secondary-300">Working-Set Model</strong> or Page-Fault Frequency strategy to allocate sufficient page frames or suspend processes.
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-700/60 text-xs">
                        <span className="text-slate-400 text-[11px]">Topic: Virtual Memory & Paging</span>
                        <span className="text-amber-400 font-semibold text-[11px] bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/50">
                          92% Exam Probability
                        </span>
                      </div>
                    </div>

                    {/* Self-Rating Controls */}
                    <div className="flex items-center gap-3 mt-4 w-full justify-center">
                      <button
                        onClick={() => {
                          setIsFlashcardMastered(false);
                          setIsFlipped(false);
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-700 hover:bg-slate-700 transition"
                      >
                        Needs Review
                      </button>
                      <button
                        onClick={() => {
                          setIsFlashcardMastered(true);
                          setIsFlipped(false);
                        }}
                        className="px-4 py-2 rounded-xl bg-primary-600 text-xs font-semibold text-white shadow-sm hover:bg-primary-500 transition flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Mastered (+10 XP)
                      </button>
                    </div>
                  </div>
                )}

                {/* 3. Adaptive Quiz Interactive Preview */}
                {activeTab === 'quiz' && (
                  <div className="flex-1 flex flex-col justify-center max-w-xl mx-auto w-full py-1">
                    <div className="flex items-center justify-between mb-3 text-xs">
                      <span className="font-semibold text-primary-400 uppercase tracking-wider">Adaptive Practice Quiz</span>
                      <span className="text-slate-400">Question 4 of 8 • Medium Difficulty</span>
                    </div>

                    <h4 className="text-base sm:text-lg font-bold text-white mb-4 leading-snug">
                      Which CPU scheduling algorithm is mathematically provable to yield the minimum average waiting time for a given set of processes?
                    </h4>

                    <div className="space-y-2.5">
                      {[
                        { id: 'A', text: 'First-Come, First-Served (FCFS)', correct: false },
                        { id: 'B', text: 'Shortest Job First (SJF / Shortest Remaining Time First)', correct: true },
                        { id: 'C', text: 'Round Robin with 20ms Time Quantum', correct: false },
                        { id: 'D', text: 'Priority Scheduling without Aging', correct: false },
                      ].map((opt) => {
                        const isSelected = selectedQuizOption === opt.id;
                        let optionStyles = 'bg-slate-800/60 border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-600';
                        if (isSelected) {
                          if (opt.correct) {
                            optionStyles = 'bg-green-950/80 border-green-500 text-green-200 ring-2 ring-green-500/30';
                          } else {
                            optionStyles = 'bg-red-950/80 border-red-500 text-red-200 ring-2 ring-red-500/30';
                          }
                        }

                        return (
                          <div
                            key={opt.id}
                            onClick={() => setSelectedQuizOption(opt.id)}
                            className={`p-3 rounded-xl border text-xs sm:text-sm font-medium flex items-center justify-between cursor-pointer transition-all ${optionStyles}`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-5 h-5 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-[11px] text-slate-300">
                                {opt.id}
                              </span>
                              <span>{opt.text}</span>
                            </div>
                            {isSelected && opt.correct && (
                              <Badge variant="success" className="bg-green-900 text-green-200 border-green-700 text-[10px]">
                                Correct!
                              </Badge>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {selectedQuizOption === 'B' && (
                      <div className="mt-3 p-2.5 rounded-xl bg-green-950/40 border border-green-800/40 text-xs text-green-300">
                        ✨ <strong>AI Explanation:</strong> SJF is optimal because scheduling shortest CPU bursts first minimizes the accumulation of waiting time across all queued processes.
                      </div>
                    )}
                  </div>
                )}

                {/* 4. Smart Summary Interactive Preview */}
                {activeTab === 'summary' && (
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                      <div>
                        <span className="text-xs font-semibold text-primary-400 uppercase tracking-wider">AI Executive Synopsis</span>
                        <h4 className="text-base font-bold text-white">Memory Management & Virtual Storage Summary</h4>
                      </div>
                      <Badge variant="primary" className="bg-primary-950 text-primary-300 border-primary-700">
                        Exam Highlights
                      </Badge>
                    </div>

                    <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                        <strong className="text-white block mb-1">Key Takeaway 1: Effective Memory Access Time (EMAT)</strong>
                        <p className="text-slate-400 text-xs">
                          Formula: <code className="bg-slate-900 text-primary-300 px-1.5 py-0.5 rounded font-mono">EMAT = Hit_Ratio × (TLB + Mem) + (1 - Hit_Ratio) × (TLB + 2×Mem)</code>
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                        <strong className="text-white block mb-1">Key Takeaway 2: Page Replacement Algorithms</strong>
                        <ul className="list-disc list-inside space-y-1 text-slate-400 text-xs">
                          <li><strong>FIFO:</strong> Suffers from Belady's Anomaly (more frames = more page faults).</li>
                          <li><strong>Optimal (OPT):</strong> Replaces page that won't be used for longest time (benchmark).</li>
                          <li><strong>LRU:</strong> Approximates OPT by replacing least recently referenced page.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mockup Bottom Status / Mastery Bar */}
                <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-amber-400" />
                      <span>Exam Readiness Score: <strong className="text-white">88%</strong></span>
                    </div>
                    <div className="hidden sm:flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span>+16% Retention</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-48">
                    <span className="text-[11px] text-slate-500 whitespace-nowrap">Unit Mastery:</span>
                    <ProgressBar value={88} variant="primary" size="sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. TRUST & CORE VALUE PROPOSITIONS SECTION                                */}
      {/* ========================================================================= */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-4 p-4 rounded-2xl transition hover:bg-slate-50">
              <div className="p-3 rounded-2xl bg-primary-50 text-primary-600 shrink-0 border border-primary-100">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Smarter Revision</h3>
                <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                  Turn hours of dense textbook re-reading into structured visual concept maps.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl transition hover:bg-slate-50">
              <div className="p-3 rounded-2xl bg-secondary-50 text-secondary-600 shrink-0 border border-secondary-100">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Active Recall</h3>
                <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                  Scientifically proven spaced retrieval flashcards to cement long-term memory.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl transition hover:bg-slate-50">
              <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 shrink-0 border border-blue-100">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">AI-Powered Analysis</h3>
                <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                  Instant extraction of formulas, key definitions, and high-weightage topics.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl transition hover:bg-slate-50">
              <div className="p-3 rounded-2xl bg-amber-50 text-amber-600 shrink-0 border border-amber-100">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Personalized Learning</h3>
                <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                  Dynamic quizzes that automatically pinpoint and resolve your knowledge gaps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. PROBLEM SECTION ("Revision Shouldn't Feel Scattered")                 */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="danger" outline className="mb-4">
              The Exam Revision Problem
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Revision Shouldn't Feel Scattered
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Traditional study methods force students to waste 70% of their preparation time organizing raw materials instead of actually retaining concepts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Problem Card 1 */}
            <Card className="border-red-100/80 bg-white/80 backdrop-blur hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-6 border border-red-100">
                  <FileX className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Information Overload
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Endless 100-slide PDF handouts and 500-page textbooks without clear visual hierarchy make it overwhelming to know what actually matters for exam day.
                </p>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-red-600">
                  <span>Results in passive re-reading & burnout</span>
                </div>
              </CardContent>
            </Card>

            {/* Problem Card 2 */}
            <Card className="border-amber-100/80 bg-white/80 backdrop-blur hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6 border border-amber-100">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Scattered Study Notes
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Study files fragmented across WhatsApp groups, Google Drive folders, messy phone photos, and paper notebooks lead to chaotic, last-minute cramming.
                </p>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-amber-600">
                  <span>Lost hours searching for specific formulas</span>
                </div>
              </CardContent>
            </Card>

            {/* Problem Card 3 */}
            <Card className="border-slate-200 bg-white/80 backdrop-blur hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center mb-6 border border-slate-200">
                  <CalendarX className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Uncertain Revision Strategy
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Guessing which concepts are high-yield and testing yourself with static, predictable questions gives false confidence and reveals blind spots too late.
                </p>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <span>No objective gauge of exam readiness</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SOLUTION TRANSFORMATION PIPELINE SECTION                                */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="primary" outline className="mb-4">
              The Mind Mapr Solution
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              From Raw Notes to Revision in Minutes
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Upload your raw coursework and let our intelligent engine structure everything into 5 high-impact revision formats.
            </p>
          </div>

          {/* 3-Stage Visual Pipeline */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative items-stretch">
            {/* Stage 1 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between relative group hover:border-primary-300 transition-all">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-lg">
                    01
                  </div>
                  <Badge variant="neutral">Input Stage</Badge>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Upload Study Material</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Drop lecture slides (PDF, PPT), textbook chapters, syllabus outlines, or raw lecture transcript text.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-2 text-slate-800 font-semibold">
                  <Upload className="w-4 h-4 text-primary-600" />
                  <span>Supports Multi-Format Ingestion</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="px-2 py-0.5 bg-slate-100 rounded text-[11px] font-mono">.pdf</span>
                  <span className="px-2 py-0.5 bg-slate-100 rounded text-[11px] font-mono">.pptx</span>
                  <span className="px-2 py-0.5 bg-slate-100 rounded text-[11px] font-mono">.docx</span>
                  <span className="px-2 py-0.5 bg-slate-100 rounded text-[11px] font-mono">.txt</span>
                </div>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-primary-900 to-slate-900 text-white shadow-xl shadow-primary-950/20 border border-primary-700/50 flex flex-col justify-between relative">
              <div className="absolute -top-3 right-6 bg-gradient-to-r from-primary-400 to-secondary-400 text-slate-950 font-extrabold text-[11px] uppercase tracking-wider px-3 py-1 rounded-full shadow">
                AI Engine
              </div>
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 text-primary-300 flex items-center justify-center font-bold text-lg border border-white/20">
                    02
                  </div>
                  <Badge variant="primary" className="bg-primary-950 text-primary-300 border-primary-700">
                    Processing
                  </Badge>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Semantic Extraction</h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  Our LLM parser analyzes conceptual dependencies, extracts formulas and definitions, and ranks exam weightage.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 space-y-2">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <Cpu className="w-4 h-4 text-primary-400 animate-pulse" />
                  <span>Cognitive Structuring</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Identifies primary concept nodes, child associations, and active recall question-answer pairs.
                </p>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between relative group hover:border-secondary-300 transition-all">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-secondary-100 text-secondary-700 flex items-center justify-center font-bold text-lg">
                    03
                  </div>
                  <Badge variant="secondary">Output Suite</Badge>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">5 Revision Assets</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Instantly access generated mind maps, summaries, flashcards, adaptive quizzes, and mastery metrics.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-slate-700 font-medium">
                  <span className="flex items-center gap-1.5">
                    <BrainCircuit className="w-3.5 h-3.5 text-primary-600" />
                    Interactive Mind Maps
                  </span>
                  <Check className="w-3.5 h-3.5 text-green-600" />
                </div>
                <div className="flex items-center justify-between text-slate-700 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-secondary-600" />
                    Active Recall Cards
                  </span>
                  <Check className="w-3.5 h-3.5 text-green-600" />
                </div>
                <div className="flex items-center justify-between text-slate-700 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-amber-600" />
                    Adaptive Quizzes
                  </span>
                  <Check className="w-3.5 h-3.5 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CORE FEATURES SECTION                                                  */}
      {/* ========================================================================= */}
      <section id="features" className="py-20 sm:py-28 bg-slate-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="primary" outline className="mb-4">
              Comprehensive Revision Suite
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Everything You Need to Revise Smarter
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Every tool is engineered around active learning and cognitive psychology principles for maximum exam retention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1: Mind Maps */}
            <Card hoverEffect className="bg-white p-6 border-slate-100 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mb-6 border border-primary-100">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-slate-900">Interactive Mind Maps</h3>
                  <Badge variant="primary">Visual Tree</Badge>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Visual hierarchical concept trees showing relationships between topics, subtopics, formulas, and proofs. Zoom and navigate complex theories with ease.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-primary-600 flex items-center gap-1">
                <span>View node hierarchies & dependencies</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Card>

            {/* Feature 2: Smart Summaries */}
            <Card hoverEffect className="bg-white p-6 border-slate-100 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-secondary-50 text-secondary-600 flex items-center justify-center mb-6 border border-secondary-100">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-slate-900">Smart Exam Summaries</h3>
                  <Badge variant="secondary">Concise Synopses</Badge>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  AI-extracted bullet points highlighting core definitions, theorems, mathematical formulas, and key exam takeaways without unnecessary filler.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-secondary-600 flex items-center gap-1">
                <span>Instant high-yield takeaway bullet points</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Card>

            {/* Feature 3: Flashcards */}
            <Card hoverEffect className="bg-white p-6 border-slate-100 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6 border border-amber-100">
                  <Zap className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-slate-900">Active Recall Flashcards</h3>
                  <Badge variant="warning">Spaced Repetition</Badge>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Spaced repetition flashcards automatically generated from your materials. Self-rate your recall to schedule intelligent review cycles before exam day.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-amber-600 flex items-center gap-1">
                <span>Flip, test recall & track mastered cards</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Card>

            {/* Feature 4: Adaptive Quizzes */}
            <Card hoverEffect className="bg-white p-6 border-slate-100 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mb-6 border border-green-100">
                  <Target className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-slate-900">Adaptive Practice Quizzes</h3>
                  <Badge variant="success">Auto Difficulty</Badge>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Practice tests that dynamically adapt question difficulty based on your answers. Instant explanations clarify why each option is correct or incorrect.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-green-600 flex items-center gap-1">
                <span>Real-time feedback & detailed explanations</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Card>

            {/* Feature 5: Important Topics AI */}
            <Card hoverEffect className="bg-white p-6 border-slate-100 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 border border-indigo-100">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-slate-900">High-Yield Topic Detector</h3>
                  <Badge variant="primary">Exam Probability</Badge>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Our algorithm scans syllabus guidelines and past papers to identify high-weightage topics and likely exam questions so you prioritize high-impact areas.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-indigo-600 flex items-center gap-1">
                <span>Weightage score & revision priority ranks</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Card>

            {/* Feature 6: Progress & Mastery Analytics */}
            <Card hoverEffect className="bg-white p-6 border-slate-100 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-6 border border-rose-100">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-slate-900">Mastery & Progress Tracker</h3>
                  <Badge variant="danger">Readiness %</Badge>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Visual dashboards tracking study streaks, unit completion percentages, and retention rates to eliminate blind spots prior to entering the exam hall.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-rose-600 flex items-center gap-1">
                <span>Objective exam readiness percentage score</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. HOW IT WORKS PREVIEW TIMELINE SECTION                                  */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="py-20 sm:py-28 bg-white border-y border-slate-100 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="secondary" outline className="mb-4">
              Simple 4-Step Process
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How Mind Mapr Works
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Experience the fastest, most effective way to turn raw lectures into mastered concepts.
            </p>
          </div>

          {/* Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="relative flex flex-col p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:shadow-md transition">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-black text-primary-600">01</span>
                <div className="p-2 bg-primary-100 text-primary-700 rounded-xl">
                  <Upload className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Upload Your Notes</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Drag and drop your PDF handouts, PowerPoint slides, textbook chapters, or paste markdown notes directly into the upload portal.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:shadow-md transition">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-black text-secondary-600">02</span>
                <div className="p-2 bg-secondary-100 text-secondary-700 rounded-xl">
                  <Cpu className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">AI Analyzes & Structures</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Our model extracts key topics, establishes relational concept hierarchies, and creates structured active recall cards in seconds.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:shadow-md transition">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-black text-amber-600">03</span>
                <div className="p-2 bg-amber-100 text-amber-700 rounded-xl">
                  <Zap className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Revise & Practice</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Navigate the visual mind map, study summaries, flip flashcards, and test your retention with adaptive practice quizzes.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative flex flex-col p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:shadow-md transition">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-black text-green-600">04</span>
                <div className="p-2 bg-green-100 text-green-700 rounded-xl">
                  <Award className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Track & Master</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Monitor your readiness score, eliminate weak spots before exams, and achieve complete mastery with confidence.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link to="/how-it-works">
              <Button variant="outline" size="md" iconRight={ArrowRight} className="font-semibold">
                Explore Full How-It-Works Guide
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. FINAL CALL-TO-ACTION (CTA) BANNER                                      */}
      {/* ========================================================================= */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-tr from-primary-900 via-slate-900 to-secondary-900 p-8 sm:p-14 text-center text-white shadow-2xl shadow-primary-950/30 border border-primary-700/40">
            {/* Ambient background glow */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-secondary-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <Badge variant="primary" className="bg-primary-950/90 text-primary-300 border-primary-700/60 mb-6">
                Start Your Smart Revision Today
              </Badge>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
                Turn Your Notes Into <br className="hidden sm:inline" />
                <span className="gradient-text">Smarter Revision</span>
              </h2>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
                Upload your study material and let Mind Mapr organize, summarize, and quiz you on what matters most.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/register" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" iconRight={ArrowRight} className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold shadow-lg shadow-primary-600/40 bg-primary-600 hover:bg-primary-500">
                    Get Started Free
                  </Button>
                </Link>
                <Link to="/dashboard" className="w-full sm:w-auto">
                  <Button
                    variant="glass"
                    size="lg"
                    className="w-full sm:w-auto px-6 py-3.5 text-base font-semibold"
                  >
                    Explore Demo Dashboard
                  </Button>
                </Link>
              </div>

              <p className="mt-6 text-xs text-slate-400">
                Free student tier available • No credit card required • Instant generation
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
