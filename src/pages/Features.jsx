import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BrainCircuit,
  ArrowRight,
  Sparkles,
  Zap,
  Target,
  FileText,
  BarChart3,
  CheckCircle2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  RotateCcw,
  BookOpen,
  Award,
  AlertTriangle,
  Clock,
  Flame,
  Check,
  TrendingUp,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Compass,
  ListOrdered
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';

export default function Features() {
  // ==========================================
  // 1. Mind Map Interactive State
  // ==========================================
  const [zoomLevel, setZoomLevel] = useState(100);
  const [expandedNodes, setExpandedNodes] = useState({
    storage: true,
    tx: true,
    query: false,
  });
  const [selectedMindMapTopic, setSelectedMindMapTopic] = useState('ACID Properties');

  const toggleNode = (nodeKey) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeKey]: !prev[nodeKey],
    }));
  };

  // ==========================================
  // 2. Flashcards Interactive State
  // ==========================================
  const flashcardDeck = [
    {
      id: 1,
      topic: 'Algorithm Analysis & Sorting',
      question: 'What is the worst-case time complexity of QuickSort, what pivot pattern triggers it, and how does Randomized QuickSort prevent it?',
      answer: 'Worst-case is O(n²) when the pivot selected is consistently the extreme (minimum or maximum) element in an already sorted or reverse-sorted array. Randomized QuickSort randomly picks a pivot to achieve an expected O(n log n) average runtime.',
      importance: 'High Yield',
    },
    {
      id: 2,
      topic: 'Database Management Systems',
      question: 'Explain the difference between Strict Two-Phase Locking (Strict 2PL) and Rigorous 2PL in Transaction Concurrency.',
      answer: 'Strict 2PL requires all Exclusive (X) locks to be held until transaction commit/abort to prevent cascading aborts. Rigorous 2PL requires ALL locks (both Shared and Exclusive) to be held until commit, guaranteeing strict serializability in commit order.',
      importance: 'Exam Favorite',
    },
    {
      id: 3,
      topic: 'Computer Networks',
      question: 'How does TCP Slow Start differ from TCP Congestion Avoidance in controlling congestion window (cwnd)?',
      answer: 'In Slow Start, cwnd increases exponentially (doubling every RTT) until it reaches ssthresh. In Congestion Avoidance, cwnd increases linearly (by 1 MSS every RTT) for additive increase.',
      importance: 'Core Theory',
    },
  ];

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [cardRatingFeedback, setCardRatingFeedback] = useState(null);
  const [streakCount, setStreakCount] = useState(6);

  const handleRateCard = (rating) => {
    setCardRatingFeedback(`Marked as "${rating}" • Scheduled next review`);
    setTimeout(() => {
      setCardRatingFeedback(null);
      setIsAnswerRevealed(false);
      setCurrentCardIndex((prev) => (prev + 1) % flashcardDeck.length);
      setStreakCount((s) => s + 1);
    }, 900);
  };

  // ==========================================
  // 3. Adaptive Quiz Interactive State
  // ==========================================
  const [quizDifficulty, setQuizDifficulty] = useState('medium'); // 'easy' | 'medium' | 'hard'
  const [selectedQuizOption, setSelectedQuizOption] = useState(null);

  const quizQuestions = {
    easy: {
      question: 'Which SQL keyword is used to ensure no duplicate rows are returned in the result set?',
      options: [
        { id: 'A', text: 'UNIQUE', correct: false },
        { id: 'B', text: 'DISTINCT', correct: true },
        { id: 'C', text: 'GROUP BY', correct: false },
        { id: 'D', text: 'NO_DUPLICATE', correct: false },
      ],
      explanation: 'DISTINCT removes duplicate tuples from the query projection result.',
    },
    medium: {
      question: 'In a B+ Tree of order m containing N total records, what is the maximum number of disk I/O operations needed to search for a single key?',
      options: [
        { id: 'A', text: 'O(N)', correct: false },
        { id: 'B', text: 'O(log_m N)', correct: true },
        { id: 'C', text: 'O(m · log N)', correct: false },
        { id: 'D', text: 'O(1)', correct: false },
      ],
      explanation: 'Because B+ Trees are height-balanced with all data pointers in leaf nodes, lookup cost is bounded by tree height O(log_m N) disk seeks.',
    },
    hard: {
      question: 'Under the ARIES database recovery protocol, which phase occurs immediately AFTER the Analysis phase during system restart?',
      options: [
        { id: 'A', text: 'Undo Phase (Scanning backwards to abort uncommitted tx)', correct: false },
        { id: 'B', text: 'Redo Phase (Repeating history forward from smallest recLSN)', correct: true },
        { id: 'C', text: 'Checkpoint Commit Phase', correct: false },
        { id: 'D', text: 'Buffer Allocation Phase', correct: false },
      ],
      explanation: 'ARIES executes in three exact sequential phases: Analysis (find dirty pages & active tx) → Redo (repeating history forward) → Undo (rolling back active uncommitted transactions).',
    },
  };

  // ==========================================
  // 4. Important Topics Interactive State
  // ==========================================
  const [topicFilter, setTopicFilter] = useState('all'); // 'all' | 'high' | 'medium' | 'low'

  const topicsList = [
    {
      id: 1,
      title: 'ACID Transactions & Two-Phase Locking (2PL)',
      unit: 'Unit 4 • Concurrency',
      priority: 'high',
      weight: '95% Exam Weight',
      estTime: '45 mins',
      concepts: ['Strict 2PL', 'Serializability Graph', 'Deadlock Detection', 'Cascading Rollback Prevention'],
      reason: 'Frequently tested in university final exams; 3 questions expected on scheduling graphs.',
    },
    {
      id: 2,
      title: 'B+ Tree Indexing & Search Cost Analysis',
      unit: 'Unit 3 • Storage Engines',
      priority: 'high',
      weight: '92% Exam Weight',
      estTime: '35 mins',
      concepts: ['Index Node Structure', 'Leaf Pointers', 'Insertion Splits', 'Disk Seek Math'],
      reason: 'Essential calculation problems covering order m, tree depth, and block storage overhead.',
    },
    {
      id: 3,
      title: 'SQL Normalization (1NF, 2NF, 3NF, BCNF)',
      unit: 'Unit 2 • Relational Schema Design',
      priority: 'high',
      weight: '88% Exam Weight',
      estTime: '40 mins',
      concepts: ['Functional Dependencies', 'Candidate Keys', 'Lossless Decomposition', 'Dependency Preservation'],
      reason: 'Standard 15-mark schema decomposition and canonical cover proof problem.',
    },
    {
      id: 4,
      title: 'Relational Algebra Expressions & Join Trees',
      unit: 'Unit 1 • Relational Foundation',
      priority: 'medium',
      weight: '72% Exam Weight',
      estTime: '25 mins',
      concepts: ['Selection σ', 'Projection π', 'Natural Join ⋈', 'Theta Joins & Division'],
      reason: 'Fundamental prerequisite for query optimization questions.',
    },
    {
      id: 5,
      title: 'RAID Storage Architectures (RAID 0, 1, 5, 10)',
      unit: 'Unit 3 • Physical Media',
      priority: 'medium',
      weight: '65% Exam Weight',
      estTime: '20 mins',
      concepts: ['Striping vs Mirroring', 'Parity Calculations', 'Mean Time to Data Loss'],
      reason: 'Common 5-mark conceptual comparison between reliability vs disk cost tradeoffs.',
    },
    {
      id: 6,
      title: 'History of DBMS vs Flat-File Systems',
      unit: 'Unit 1 • Overview',
      priority: 'low',
      weight: '30% Exam Weight',
      estTime: '10 mins',
      concepts: ['Data Redundancy', 'Program-Data Dependence', 'ANSI-SPARC 3-Level Architecture'],
      reason: 'Introductory overview topic; rarely tested beyond basic multiple choice or 2-mark definitions.',
    },
  ];

  const filteredTopics = topicsList.filter((t) => {
    if (topicFilter === 'all') return true;
    return t.priority === topicFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-16 selection:bg-primary-500 selection:text-white">
      {/* ========================================================================= */}
      {/* HEADER SECTION                                                           */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-slate-200/70 bg-gradient-to-b from-white via-slate-50/50 to-slate-50">
        {/* Ambient lighting effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-primary-400/15 via-secondary-400/15 to-transparent blur-[130px] pointer-events-none -z-10 rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Header Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 text-primary-700 text-xs sm:text-sm font-semibold rounded-full border border-primary-100/80 shadow-sm mb-6 animate-in fade-in duration-500">
            <Sparkles className="w-4 h-4 text-primary-600 animate-pulse" />
            <span>Intelligent Study Suite • 6 Core Capabilities</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6 max-w-4xl mx-auto">
            Powerful Tools for <span className="gradient-text">Smarter Revision</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal mb-10">
            Mind Mapr turns study materials into structured, interactive and personalized revision resources.
          </p>

          {/* Quick Jump Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto text-xs sm:text-sm font-medium">
            <a href="#mind-maps" className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-full hover:border-primary-500 hover:text-primary-600 transition shadow-sm">
              🗺️ Mind Maps
            </a>
            <a href="#summaries" className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-full hover:border-secondary-500 hover:text-secondary-600 transition shadow-sm">
              📑 Exam Summaries
            </a>
            <a href="#flashcards" className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-full hover:border-amber-500 hover:text-amber-600 transition shadow-sm">
              ⚡ Active Flashcards
            </a>
            <a href="#quizzes" className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-full hover:border-green-500 hover:text-green-600 transition shadow-sm">
              🎯 Adaptive Quizzes
            </a>
            <a href="#important-topics" className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-full hover:border-indigo-500 hover:text-indigo-600 transition shadow-sm">
              📌 Important Topics
            </a>
            <a href="#progress-tracking" className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-full hover:border-rose-500 hover:text-rose-600 transition shadow-sm">
              📊 Progress Tracking
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FEATURE 1 — MIND MAPS                                                     */}
      {/* ========================================================================= */}
      <section id="mind-maps" className="py-20 sm:py-28 bg-white border-b border-slate-100 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Description Column */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <Badge variant="primary" outline className="w-fit mb-4">
                Feature 01 • Visual Hierarchy
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                AI-Generated Mind Maps
              </h2>
              <p className="text-base text-slate-600 leading-relaxed mb-6">
                Understand conceptual architecture at a glance. Mind Mapr analyzes your course readings, slides, and notes to construct hierarchical concept trees showing multi-level relationships and dependencies.
              </p>

              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="p-1.5 rounded-lg bg-primary-100 text-primary-700 shrink-0">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold">Interactive Zoom & Pan</strong>
                    <span className="text-xs text-slate-500">Zoom seamlessly into granular proofs or pan out to view high-level subject architecture.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="p-1.5 rounded-lg bg-secondary-100 text-secondary-700 shrink-0">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold">Expandable & Collapsible Branches</strong>
                    <span className="text-xs text-slate-500">Toggle subtopics on and off to eliminate visual clutter and focus on specific modules.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="p-1.5 rounded-lg bg-green-100 text-green-700 shrink-0">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold">Relationship & Cross-Link Visualization</strong>
                    <span className="text-xs text-slate-500">Curved edges highlight directional dependencies such as formulas, guarantees, and algorithmic steps.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Mock Mind Map Illustration */}
            <div className="lg:col-span-7">
              <div className="bg-slate-900 rounded-3xl p-4 sm:p-6 shadow-2xl shadow-primary-950/20 border border-slate-800 text-white relative">
                {/* Mock Viewport Top Toolbar */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-6">
                  <div className="flex items-center gap-2">
                    <BrainCircuit className="w-5 h-5 text-primary-400" />
                    <span className="text-xs sm:text-sm font-bold text-white">
                      Concept Map: Database Systems Architecture
                    </span>
                  </div>

                  {/* Zoom & Reset Controls */}
                  <div className="flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-xl border border-slate-700 text-xs">
                    <button
                      onClick={() => setZoomLevel((z) => Math.max(70, z - 10))}
                      title="Zoom Out"
                      className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-300 transition"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-2 font-mono text-[11px] text-primary-300 font-semibold">
                      {zoomLevel}%
                    </span>
                    <button
                      onClick={() => setZoomLevel((z) => Math.min(130, z + 10))}
                      title="Zoom In"
                      className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-300 transition"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setZoomLevel(100)}
                      title="Reset Zoom"
                      className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-300 transition"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Mind Map Canvas */}
                <div
                  className="space-y-6 transition-all duration-300 py-2"
                  style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
                >
                  {/* Central Topic Node */}
                  <div className="flex justify-center">
                    <div className="px-6 py-4 rounded-2xl bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600 text-white shadow-lg shadow-primary-900/50 border border-primary-400/40 text-center relative group">
                      <div className="text-[10px] uppercase tracking-wider font-extrabold text-secondary-200">
                        Central Topic
                      </div>
                      <h4 className="text-base sm:text-lg font-bold mt-0.5">Database Management Systems</h4>
                      <p className="text-[11px] text-primary-100">CS402 • Core Knowledge Hierarchy</p>
                    </div>
                  </div>

                  {/* Subtopics Branches Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    {/* Branch 1: Storage & Indexing */}
                    <div className="rounded-2xl bg-slate-800/60 border border-slate-700/80 p-3.5 flex flex-col justify-between">
                      <div>
                        <div
                          onClick={() => toggleNode('storage')}
                          className="flex items-center justify-between cursor-pointer p-1.5 -m-1.5 rounded-lg hover:bg-slate-800 transition"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary-400" />
                            <h5 className="text-xs font-bold text-slate-200">Storage & Indexing</h5>
                          </div>
                          {expandedNodes.storage ? (
                            <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                          )}
                        </div>

                        {expandedNodes.storage && (
                          <div className="mt-3 pl-3 border-l-2 border-primary-500/40 space-y-2 text-xs">
                            <div
                              onClick={() => setSelectedMindMapTopic('B+ Trees')}
                              className={`p-2 rounded-lg cursor-pointer transition ${
                                selectedMindMapTopic === 'B+ Trees'
                                  ? 'bg-primary-950 border border-primary-700 text-primary-200'
                                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                              }`}
                            >
                              <strong className="block text-[11px]">B+ Trees</strong>
                              <span className="text-[10px] text-slate-400">O(log_m N) search, leaf linked list</span>
                            </div>
                            <div
                              onClick={() => setSelectedMindMapTopic('Buffer Pool')}
                              className={`p-2 rounded-lg cursor-pointer transition ${
                                selectedMindMapTopic === 'Buffer Pool'
                                  ? 'bg-primary-950 border border-primary-700 text-primary-200'
                                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                              }`}
                            >
                              <strong className="block text-[11px]">Buffer Pool Manager</strong>
                              <span className="text-[10px] text-slate-400">LRU-K replacement, dirty page flush</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-2 block">2 Subtopics</span>
                    </div>

                    {/* Branch 2: Transaction Processing */}
                    <div className="rounded-2xl bg-slate-800/60 border border-slate-700/80 p-3.5 flex flex-col justify-between">
                      <div>
                        <div
                          onClick={() => toggleNode('tx')}
                          className="flex items-center justify-between cursor-pointer p-1.5 -m-1.5 rounded-lg hover:bg-slate-800 transition"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-secondary-400" />
                            <h5 className="text-xs font-bold text-slate-200">Transaction Processing</h5>
                          </div>
                          {expandedNodes.tx ? (
                            <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                          )}
                        </div>

                        {expandedNodes.tx && (
                          <div className="mt-3 pl-3 border-l-2 border-secondary-500/40 space-y-2 text-xs">
                            <div
                              onClick={() => setSelectedMindMapTopic('ACID Properties')}
                              className={`p-2 rounded-lg cursor-pointer transition ${
                                selectedMindMapTopic === 'ACID Properties'
                                  ? 'bg-secondary-950 border border-secondary-700 text-secondary-200'
                                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                              }`}
                            >
                              <strong className="block text-[11px]">ACID Properties</strong>
                              <span className="text-[10px] text-slate-400">Atomicity, Consistency, Isolation, Durability</span>
                            </div>
                            <div
                              onClick={() => setSelectedMindMapTopic('2PL Concurrency')}
                              className={`p-2 rounded-lg cursor-pointer transition ${
                                selectedMindMapTopic === '2PL Concurrency'
                                  ? 'bg-secondary-950 border border-secondary-700 text-secondary-200'
                                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                              }`}
                            >
                              <strong className="block text-[11px]">Two-Phase Locking (2PL)</strong>
                              <span className="text-[10px] text-slate-400">Growing & Shrinking phases</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-2 block">2 Subtopics</span>
                    </div>

                    {/* Branch 3: Query Processing */}
                    <div className="rounded-2xl bg-slate-800/60 border border-slate-700/80 p-3.5 flex flex-col justify-between">
                      <div>
                        <div
                          onClick={() => toggleNode('query')}
                          className="flex items-center justify-between cursor-pointer p-1.5 -m-1.5 rounded-lg hover:bg-slate-800 transition"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-400" />
                            <h5 className="text-xs font-bold text-slate-200">Query Optimization</h5>
                          </div>
                          {expandedNodes.query ? (
                            <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                          )}
                        </div>

                        {expandedNodes.query && (
                          <div className="mt-3 pl-3 border-l-2 border-green-500/40 space-y-2 text-xs">
                            <div
                              onClick={() => setSelectedMindMapTopic('Relational Algebra')}
                              className={`p-2 rounded-lg cursor-pointer transition ${
                                selectedMindMapTopic === 'Relational Algebra'
                                  ? 'bg-green-950 border border-green-700 text-green-200'
                                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                              }`}
                            >
                              <strong className="block text-[11px]">Relational Algebra</strong>
                              <span className="text-[10px] text-slate-400">Selection σ, Projection π, Joins ⋈</span>
                            </div>
                          </div>
                        )}
                        {!expandedNodes.query && (
                          <p className="text-[11px] text-slate-400 mt-2 italic">Click to expand query join algorithms</p>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-2 block">Collapsed</span>
                    </div>
                  </div>
                </div>

                {/* Relationship Connection Note */}
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span>Cross-Link: <strong>Write-Ahead Logging (WAL)</strong> ➔ <em>guarantees</em> <strong>Durability (ACID)</strong></span>
                  </div>
                  <Badge variant="primary" className="bg-primary-950 text-primary-300 border-primary-700">
                    Live Node Preview
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FEATURE 2 — SUMMARIES                                                     */}
      {/* ========================================================================= */}
      <section id="summaries" className="py-20 sm:py-28 bg-slate-50 border-b border-slate-100 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Example Summary Card */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <Card className="bg-white border-slate-200/80 shadow-xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-5 border-none">
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-secondary-400">
                        Exam-Ready Study Sheet
                      </span>
                      <h3 className="text-lg font-bold text-white mt-0.5">
                        Unit 4: Concurrency Control & Recovery Summary
                      </h3>
                    </div>
                    <Badge variant="secondary" className="bg-secondary-950 text-secondary-300 border-secondary-700">
                      High Yield
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-6 space-y-6 text-slate-700 text-sm">
                  {/* 1. Key Concepts */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-primary-600" />
                      <span>1. Key Concepts</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <strong className="block text-xs font-semibold text-slate-900">Conflict Serializability</strong>
                        <p className="text-xs text-slate-500 mt-1">
                          A schedule is conflict serializable if its precedence graph contains zero cycles.
                        </p>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <strong className="block text-xs font-semibold text-slate-900">Two-Phase Locking (2PL)</strong>
                        <p className="text-xs text-slate-500 mt-1">
                          Ensures serializability by forbidding lock acquisitions once any lock is released.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 2. Important Points & Exam Traps */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      <span>2. Important Points & Common Exam Traps</span>
                    </h4>
                    <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs text-amber-900 space-y-1.5">
                      <p>
                        • <strong>Cascading Rollback:</strong> Prevented by <em>Strict 2PL</em> (holding exclusive locks until commit).
                      </p>
                      <p>
                        • <strong>Deadlocks:</strong> 2PL does <em>not</em> prevent deadlocks. Use Wait-Die, Wound-Wait, or timeout detection.
                      </p>
                    </div>
                  </div>

                  {/* 3. Mathematical Formulas & Rules */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-secondary-600" />
                      <span>3. Core Formulas & Recovery Rules</span>
                    </h4>
                    <div className="p-3 rounded-xl bg-slate-900 text-white font-mono text-xs space-y-2">
                      <div className="flex justify-between items-center text-slate-300">
                        <span>WAL Invariant:</span>
                        <code className="text-secondary-300 bg-slate-800 px-2 py-0.5 rounded">pageLSN ≤ flushedLSN</code>
                      </div>
                      <div className="flex justify-between items-center text-slate-300">
                        <span>ARIES Redo Starting Point:</span>
                        <code className="text-primary-300 bg-slate-800 px-2 py-0.5 rounded">RedoLSN = min(DirtyPageTable.recLSN)</code>
                      </div>
                    </div>
                  </div>

                  {/* 4. Quick Revision Section */}
                  <div className="pt-2 border-t border-slate-100">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-green-600" />
                      <span>4. 2-Minute Pre-Exam Cram Notes</span>
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-xs text-slate-600">
                      <li>Serializability = Precedence Graph acyclic test.</li>
                      <li>Strict 2PL = Avoids cascading aborts.</li>
                      <li>Rigorous 2PL = Guarantees commit order serializability.</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Description Column */}
            <div className="lg:col-span-5 flex flex-col justify-center order-1 lg:order-2">
              <Badge variant="secondary" outline className="w-fit mb-4">
                Feature 02 • Exam Synopses
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                Exam-Focused Summaries
              </h2>
              <p className="text-base text-slate-600 leading-relaxed mb-6">
                Never waste time sifting through 100-page presentations. Mind Mapr distills lengthy textbook chapters into concise, exam-focused outlines highlighting definitions, equations, and critical exam pitfalls.
              </p>

              <div className="space-y-3 text-sm text-slate-700">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-secondary-600 shrink-0" />
                  <span><strong>Formulas & Equations:</strong> Formatted mathematical expressions and algorithmic invariants.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-secondary-600 shrink-0" />
                  <span><strong>Important Exam Traps:</strong> AI identifies where students frequently lose marks.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-secondary-600 shrink-0" />
                  <span><strong>Quick Revision Section:</strong> Bulleted key takeaways for fast pre-exam review.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FEATURE 3 — FLASHCARDS                                                    */}
      {/* ========================================================================= */}
      <section id="flashcards" className="py-20 sm:py-28 bg-white border-b border-slate-100 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Description Column */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <Badge variant="warning" outline className="w-fit mb-4">
                Feature 03 • Spaced Retrieval
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                Active Recall Flashcards
              </h2>
              <p className="text-base text-slate-600 leading-relaxed mb-6">
                Active recall is the most effective way to retain technical concepts for long periods. Mind Mapr automatically parses questions and answers from your study material and organizes them with intelligent repetition intervals.
              </p>

              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 mb-6 space-y-2">
                <div className="flex items-center gap-2 text-amber-900 font-semibold text-xs sm:text-sm">
                  <Flame className="w-4 h-4 text-amber-600" />
                  <span>Spaced Repetition Rating Engine</span>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Rate each card based on your recall ease. Harder cards appear more frequently while mastered cards are spaced out to cement your long-term memory.
                </p>
              </div>

              <div className="flex items-center gap-6 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Self-Paced Learning</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Card Flip Animations</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Streak Tracking</span>
                </div>
              </div>
            </div>

            {/* Right Realistic Flashcard Interface */}
            <div className="lg:col-span-7">
              <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-slate-950/20 border border-slate-800 text-white">
                {/* Header info */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                  <div>
                    <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                      Spaced Recall Session
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">
                      {flashcardDeck[currentCardIndex].topic}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-mono">
                      Card {currentCardIndex + 1} of {flashcardDeck.length}
                    </span>
                    <Badge variant="warning" className="bg-amber-950 text-amber-300 border-amber-700">
                      Streak: {streakCount} 🔥
                    </Badge>
                  </div>
                </div>

                {/* Flashcard Box */}
                <div
                  onClick={() => setIsAnswerRevealed(!isAnswerRevealed)}
                  className={`min-h-[220px] sm:min-h-[240px] rounded-2xl p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 border ${
                    isAnswerRevealed
                      ? 'bg-gradient-to-br from-slate-900 to-amber-950/40 border-amber-500/50 shadow-lg'
                      : 'bg-slate-800/80 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-amber-400 uppercase tracking-wider text-[11px]">
                      {isAnswerRevealed ? 'Revealed Answer' : 'Question Prompt'}
                    </span>
                    <span className="text-[11px] bg-slate-950 px-2 py-0.5 rounded text-slate-400 border border-slate-800">
                      {isAnswerRevealed ? 'Click to re-hide' : 'Click to reveal'}
                    </span>
                  </div>

                  <div className="my-4">
                    {!isAnswerRevealed ? (
                      <h4 className="text-base sm:text-lg font-semibold text-white leading-snug">
                        {flashcardDeck[currentCardIndex].question}
                      </h4>
                    ) : (
                      <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                        {flashcardDeck[currentCardIndex].answer}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-700/60 text-xs text-slate-400">
                    <span>Priority: <strong className="text-white">{flashcardDeck[currentCardIndex].importance}</strong></span>
                    <span className="text-amber-400 font-medium">Spaced Interval Queue</span>
                  </div>
                </div>

                {/* Feedback Toast */}
                {cardRatingFeedback && (
                  <div className="my-3 p-2 text-center rounded-xl bg-amber-950/80 border border-amber-600/50 text-xs text-amber-200 animate-in fade-in">
                    ✓ {cardRatingFeedback}
                  </div>
                )}

                {/* Reveal / Rate Controls */}
                <div className="mt-6">
                  {!isAnswerRevealed ? (
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => setIsAnswerRevealed(true)}
                      className="w-full bg-amber-600 hover:bg-amber-500 text-white font-semibold shadow-md shadow-amber-900/30"
                    >
                      Reveal Answer
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <span className="block text-center text-xs text-slate-400 font-medium">
                        Rate how well you recalled this concept:
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {/* 1. Again */}
                        <button
                          onClick={() => handleRateCard('Again')}
                          className="px-3 py-2.5 rounded-xl bg-red-950/70 border border-red-800/80 text-red-200 hover:bg-red-900 transition flex flex-col items-center gap-0.5"
                        >
                          <span className="text-xs font-bold">Again</span>
                          <span className="text-[10px] text-red-400 font-mono">&lt; 1 min</span>
                        </button>

                        {/* 2. Hard */}
                        <button
                          onClick={() => handleRateCard('Hard')}
                          className="px-3 py-2.5 rounded-xl bg-amber-950/70 border border-amber-800/80 text-amber-200 hover:bg-amber-900 transition flex flex-col items-center gap-0.5"
                        >
                          <span className="text-xs font-bold">Hard</span>
                          <span className="text-[10px] text-amber-400 font-mono">12 hrs</span>
                        </button>

                        {/* 3. Good */}
                        <button
                          onClick={() => handleRateCard('Good')}
                          className="px-3 py-2.5 rounded-xl bg-blue-950/70 border border-blue-800/80 text-blue-200 hover:bg-blue-900 transition flex flex-col items-center gap-0.5"
                        >
                          <span className="text-xs font-bold">Good</span>
                          <span className="text-[10px] text-blue-400 font-mono">1 day</span>
                        </button>

                        {/* 4. Easy */}
                        <button
                          onClick={() => handleRateCard('Easy')}
                          className="px-3 py-2.5 rounded-xl bg-green-950/70 border border-green-800/80 text-green-200 hover:bg-green-900 transition flex flex-col items-center gap-0.5"
                        >
                          <span className="text-xs font-bold">Easy</span>
                          <span className="text-[10px] text-green-400 font-mono">4 days</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FEATURE 4 — ADAPTIVE QUIZZES                                              */}
      {/* ========================================================================= */}
      <section id="quizzes" className="py-20 sm:py-28 bg-slate-50 border-b border-slate-100 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Quiz Mockup */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-slate-950/20 border border-slate-800 text-white">
                {/* Dynamic Difficulty Progression Bar */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                  <div>
                    <span className="text-xs font-semibold text-green-400 uppercase tracking-wider">
                      Adaptive Difficulty Engine
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">
                      Progressive Practice Test
                    </h3>
                  </div>

                  {/* Difficulty Switcher Preview */}
                  <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl text-xs">
                    <button
                      onClick={() => {
                        setQuizDifficulty('easy');
                        setSelectedQuizOption(null);
                      }}
                      className={`px-3 py-1 rounded-lg font-medium transition ${
                        quizDifficulty === 'easy'
                          ? 'bg-green-600 text-white font-semibold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Easy
                    </button>
                    <button
                      onClick={() => {
                        setQuizDifficulty('medium');
                        setSelectedQuizOption(null);
                      }}
                      className={`px-3 py-1 rounded-lg font-medium transition ${
                        quizDifficulty === 'medium'
                          ? 'bg-amber-600 text-white font-semibold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Medium
                    </button>
                    <button
                      onClick={() => {
                        setQuizDifficulty('hard');
                        setSelectedQuizOption(null);
                      }}
                      className={`px-3 py-1 rounded-lg font-medium transition ${
                        quizDifficulty === 'hard'
                          ? 'bg-red-600 text-white font-semibold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Hard
                    </button>
                  </div>
                </div>

                {/* Difficulty Flow Indicator */}
                <div className="flex items-center justify-between text-xs text-slate-400 mb-5 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">Path:</span>
                    <span className={quizDifficulty === 'easy' ? 'text-green-400 font-bold' : 'text-slate-500'}>Easy</span>
                    <span>→</span>
                    <span className={quizDifficulty === 'medium' ? 'text-amber-400 font-bold' : 'text-slate-500'}>Medium</span>
                    <span>→</span>
                    <span className={quizDifficulty === 'hard' ? 'text-red-400 font-bold' : 'text-slate-500'}>Hard</span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Difficulty dynamically scales with your answers
                  </span>
                </div>

                {/* Question Box */}
                <div className="mb-5">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-400">Question 3 of 10</span>
                    <Badge
                      variant={quizDifficulty === 'easy' ? 'success' : quizDifficulty === 'medium' ? 'warning' : 'danger'}
                      className="capitalize"
                    >
                      {quizDifficulty} Tier
                    </Badge>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                    {quizQuestions[quizDifficulty].question}
                  </h4>
                </div>

                {/* Options List */}
                <div className="space-y-2.5">
                  {quizQuestions[quizDifficulty].options.map((opt) => {
                    const isSelected = selectedQuizOption === opt.id;
                    let optStyle = 'bg-slate-800/60 border-slate-700 text-slate-200 hover:bg-slate-800';

                    if (isSelected) {
                      if (opt.correct) {
                        optStyle = 'bg-green-950/90 border-green-500 text-green-200 ring-2 ring-green-500/30';
                      } else {
                        optStyle = 'bg-red-950/90 border-red-500 text-red-200 ring-2 ring-red-500/30';
                      }
                    }

                    return (
                      <div
                        key={opt.id}
                        onClick={() => setSelectedQuizOption(opt.id)}
                        className={`p-3 rounded-xl border text-xs sm:text-sm font-medium flex items-center justify-between cursor-pointer transition ${optStyle}`}
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

                {/* Explanation */}
                {selectedQuizOption && (
                  <div className="mt-4 p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
                    <strong className="text-white block mb-1">💡 Concept Breakdown:</strong>
                    <p>{quizQuestions[quizDifficulty].explanation}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Description Column */}
            <div className="lg:col-span-5 flex flex-col justify-center order-1 lg:order-2">
              <Badge variant="success" outline className="w-fit mb-4">
                Feature 04 • Dynamic Difficulty
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                Adaptive Practice Quizzes
              </h2>
              <p className="text-base text-slate-600 leading-relaxed mb-6">
                Static question banks provide false confidence. Mind Mapr tests your conceptual mastery with generated questions that adaptively adjust difficulty based on your ongoing performance.
              </p>

              <div className="space-y-3.5 text-sm text-slate-700">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200">
                  <div className="p-1.5 rounded-lg bg-green-100 text-green-700 shrink-0">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold">Easy → Medium → Hard Scaling</strong>
                    <span className="text-xs text-slate-500">Correct answers automatically unlock deeper, scenario-based exam questions.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200">
                  <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold">Instant Explanations</strong>
                    <span className="text-xs text-slate-500">Understand the exact theoretical reason why an option is right or wrong immediately.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FEATURE 5 — IMPORTANT TOPICS                                              */}
      {/* ========================================================================= */}
      <section id="important-topics" className="py-20 sm:py-28 bg-white border-b border-slate-100 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Description Column */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <Badge variant="primary" outline className="w-fit mb-4">
                Feature 05 • High-Yield Prioritization
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                Important Topics Detector
              </h2>
              <p className="text-base text-slate-600 leading-relaxed mb-6">
                Never guess what to revise first. Mind Mapr parses your uploaded lecture materials, slides, and syllabus weightage to rank concepts into clear High, Medium, and Low priority tiers.
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-6 space-y-2.5">
                <div className="flex items-center gap-2 font-semibold text-xs text-slate-900">
                  <ListOrdered className="w-4 h-4 text-primary-600" />
                  <span>3-Tier Priority Categorization</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 font-bold">High Priority</span>
                  <span className="text-slate-500">Core exam questions & mandatory proofs</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-700 font-bold">Medium Priority</span>
                  <span className="text-slate-500">Important supportive mechanisms</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">Low Priority</span>
                  <span className="text-slate-500">Introductory context & background info</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Priority List Component */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl">
                {/* Header & Filter Tabs */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      High-Yield Priority Breakdown
                    </h3>
                    <p className="text-xs text-slate-500">Extracted from Coursework & Syllabus Guidelines</p>
                  </div>

                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
                    <button
                      onClick={() => setTopicFilter('all')}
                      className={`px-2.5 py-1 rounded-lg font-medium transition ${
                        topicFilter === 'all' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-600'
                      }`}
                    >
                      All ({topicsList.length})
                    </button>
                    <button
                      onClick={() => setTopicFilter('high')}
                      className={`px-2.5 py-1 rounded-lg font-medium transition ${
                        topicFilter === 'high' ? 'bg-red-600 text-white font-semibold' : 'text-slate-600'
                      }`}
                    >
                      High
                    </button>
                    <button
                      onClick={() => setTopicFilter('medium')}
                      className={`px-2.5 py-1 rounded-lg font-medium transition ${
                        topicFilter === 'medium' ? 'bg-amber-600 text-white font-semibold' : 'text-slate-600'
                      }`}
                    >
                      Medium
                    </button>
                    <button
                      onClick={() => setTopicFilter('low')}
                      className={`px-2.5 py-1 rounded-lg font-medium transition ${
                        topicFilter === 'low' ? 'bg-slate-700 text-white font-semibold' : 'text-slate-600'
                      }`}
                    >
                      Low
                    </button>
                  </div>
                </div>

                {/* Topics Cards List */}
                <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                  {filteredTopics.map((topic) => (
                    <div
                      key={topic.id}
                      className="p-4 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <Badge
                          variant={
                            topic.priority === 'high'
                              ? 'danger'
                              : topic.priority === 'medium'
                              ? 'warning'
                              : 'neutral'
                          }
                          className="uppercase text-[10px]"
                        >
                          {topic.priority} Priority
                        </Badge>
                        <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                          <span className="font-semibold text-slate-700">{topic.weight}</span>
                          <span>•</span>
                          <span>{topic.estTime}</span>
                        </div>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 mb-1">
                        {topic.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed mb-2.5">
                        {topic.reason}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {topic.concepts.map((concept, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] text-slate-600"
                          >
                            {concept}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FEATURE 6 — PROGRESS TRACKING                                             */}
      {/* ========================================================================= */}
      <section id="progress-tracking" className="py-20 sm:py-28 bg-slate-50 border-b border-slate-100 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Dashboard Mockup */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
                {/* Top Metrics Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-2xl bg-primary-50/70 border border-primary-100">
                    <span className="text-[11px] font-semibold text-primary-700">Overall Mastery</span>
                    <h4 className="text-2xl font-black text-primary-900 mt-1">84%</h4>
                    <span className="text-[10px] text-primary-600 font-medium">+12% this week</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-100">
                    <span className="text-[11px] font-semibold text-amber-700">Study Streak</span>
                    <h4 className="text-2xl font-black text-amber-900 mt-1">5 Days</h4>
                    <span className="text-[10px] text-amber-600 font-medium">Personal best 🔥</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-secondary-50/70 border border-secondary-100">
                    <span className="text-[11px] font-semibold text-secondary-700">Flashcards Mastered</span>
                    <h4 className="text-2xl font-black text-secondary-900 mt-1">148</h4>
                    <span className="text-[10px] text-secondary-600 font-medium">180 total</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-green-50/70 border border-green-100">
                    <span className="text-[11px] font-semibold text-green-700">Quiz Accuracy</span>
                    <h4 className="text-2xl font-black text-green-900 mt-1">88%</h4>
                    <span className="text-[10px] text-green-600 font-medium">Medium & Hard</span>
                  </div>
                </div>

                {/* Topic Mastery Progress Bars */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                    Unit-by-Unit Mastery Breakdown
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                        <span>Unit 1: Relational Algebra & Calculus</span>
                        <span className="font-bold text-green-600">94% (Mastered)</span>
                      </div>
                      <ProgressBar value={94} variant="success" size="sm" />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                        <span>Unit 2: SQL & Relational Constraints</span>
                        <span className="font-bold text-primary-600">88% (Proficient)</span>
                      </div>
                      <ProgressBar value={88} variant="primary" size="sm" />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                        <span>Unit 3: Storage, B+ Trees & Indexing</span>
                        <span className="font-bold text-primary-600">82% (Proficient)</span>
                      </div>
                      <ProgressBar value={82} variant="primary" size="sm" />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                        <span>Unit 4: Concurrency & Recovery</span>
                        <span className="font-bold text-amber-600">62% (Needs Review)</span>
                      </div>
                      <ProgressBar value={62} variant="warning" size="sm" />
                    </div>
                  </div>
                </div>

                {/* Weak Topics Warning Callout */}
                <div className="p-4 rounded-2xl bg-red-50/70 border border-red-200 text-xs space-y-1.5">
                  <div className="flex items-center gap-1.5 text-red-800 font-bold">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span>Identified Weak Topics Requiring Attention</span>
                  </div>
                  <p className="text-red-700">
                    • <strong>Conflict Serializability & Graphs</strong>: 55% accuracy on recent quiz.
                  </p>
                  <p className="text-red-700">
                    • <strong>B+ Tree Delete Redistribution</strong>: 3 cards marked 'Hard' in spaced queue.
                  </p>
                </div>

                {/* Recommended Next Steps */}
                <div className="p-4 rounded-2xl bg-slate-900 text-white text-xs space-y-2">
                  <strong className="text-secondary-300 block">🎯 AI Recommended Next Steps:</strong>
                  <div className="flex items-center justify-between text-slate-300 pt-1 border-t border-slate-800">
                    <span>1. Review Serializability concept nodes in Mind Map</span>
                    <span className="text-slate-400 font-mono">10 mins</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>2. Practice 5 flashcards marked 'Again'</span>
                    <span className="text-slate-400 font-mono">8 mins</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Description Column */}
            <div className="lg:col-span-5 flex flex-col justify-center order-1 lg:order-2">
              <Badge variant="danger" outline className="w-fit mb-4">
                Feature 06 • Mastery Analytics
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                Progress & Retention Tracking
              </h2>
              <p className="text-base text-slate-600 leading-relaxed mb-6">
                Never enter an exam room with unseen blind spots. Mind Mapr tracks your study sessions, test accuracies, and spaced repetition retention rates in one centralized analytics dashboard.
              </p>

              <div className="space-y-3.5 text-sm text-slate-700">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-600 shrink-0" />
                  <span><strong>Overall Mastery & Readiness Score:</strong> Objective readiness benchmark.</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-600 shrink-0" />
                  <span><strong>Topic-by-Topic Breakdown:</strong> Clear visual progress bars for each unit.</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-600 shrink-0" />
                  <span><strong>Weak Topic Flags:</strong> Automatic diagnosis of areas needing immediate attention.</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-600 shrink-0" />
                  <span><strong>Actionable Next Steps:</strong> Guided study suggestions tailored to your schedule.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FINAL CALL-TO-ACTION (CTA)                                                */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-tr from-primary-900 via-slate-900 to-secondary-900 p-8 sm:p-14 text-center text-white shadow-2xl shadow-primary-950/30 border border-primary-700/40">
            {/* Ambient background glow */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-secondary-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <Badge variant="primary" className="bg-primary-950/90 text-primary-300 border-primary-700/60 mb-6">
                Start Your Smart Revision
              </Badge>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
                Ready to Revise Smarter?
              </h2>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
                Upload your course materials and let Mind Mapr generate interactive mind maps, summaries, flashcards, and quizzes in seconds.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/register" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" iconRight={ArrowRight} className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold shadow-lg shadow-primary-600/40 bg-primary-600 hover:bg-primary-500">
                    Get Started
                  </Button>
                </Link>
                <Link to="/dashboard" className="w-full sm:w-auto">
                  <Button variant="glass" size="lg" className="w-full sm:w-auto px-6 py-3.5 text-base font-semibold">
                    Explore Demo Dashboard
                  </Button>
                </Link>
              </div>

              <p className="mt-6 text-xs text-slate-400">
                Free student tier • No credit card required • Instant generation
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
