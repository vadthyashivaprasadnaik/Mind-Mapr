import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Upload,
  Cpu,
  Sparkles,
  ArrowRight,
  FileText,
  BrainCircuit,
  Zap,
  Target,
  BarChart3,
  CheckCircle2,
  Check,
  Calendar,
  Layers,
  Search,
  BookOpen,
  TrendingUp,
  AlertTriangle,
  Clock,
  ArrowDown,
  RefreshCw,
  FileCode,
  CheckCheck
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';

export default function HowItWorks() {
  // Active Interactive Step state for top diagram highlight
  const [activeStep, setActiveStep] = useState(1);

  // Step 3 Interactive Asset Selector
  const [selectedAssetTab, setSelectedAssetTab] = useState('mindmap'); // 'summary' | 'mindmap' | 'flashcards' | 'quiz'

  // Step 4 Interactive Flashcard State
  const [isFlashcardFlipped, setIsFlashcardFlipped] = useState(false);
  const [practiceQuizAnswer, setPracticeQuizAnswer] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-16 selection:bg-primary-500 selection:text-white">
      {/* ========================================================================= */}
      {/* HEADER SECTION                                                           */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-20 border-b border-slate-200/70 bg-gradient-to-b from-white via-slate-50/50 to-slate-50">
        {/* Ambient lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-primary-400/15 via-secondary-400/15 to-transparent blur-[130px] pointer-events-none -z-10 rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 text-primary-700 text-xs sm:text-sm font-semibold rounded-full border border-primary-100/80 shadow-sm mb-6 animate-in fade-in duration-500">
            <Sparkles className="w-4 h-4 text-primary-600 animate-pulse" />
            <span>End-to-End Workflow • 5 Simple Steps</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6 max-w-4xl mx-auto">
            From Study Material to <span className="gradient-text">Smart Revision</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal mb-12">
            A streamlined workflow that turns raw study materials into targeted revision resources.
          </p>

          {/* ========================================================================= */}
          {/* CONNECTED 5-STEP WORKFLOW DIAGRAM                                        */}
          {/* ========================================================================= */}
          <div className="max-w-5xl mx-auto bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-xl shadow-slate-200/50">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-2">
              {/* Step 1 Pill */}
              <a
                href="#step-1"
                onClick={() => setActiveStep(1)}
                className={`w-full lg:flex-1 p-3 rounded-2xl border transition-all text-center flex flex-col items-center gap-1 group ${
                  activeStep === 1
                    ? 'bg-primary-50/80 border-primary-500 ring-2 ring-primary-500/30 shadow-md'
                    : 'bg-slate-50 border-slate-100 hover:border-slate-300 hover:bg-slate-100/70'
                }`}
              >
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
                  activeStep === 1 ? 'bg-primary-600 text-white' : 'bg-slate-200 text-slate-700 group-hover:bg-primary-100 group-hover:text-primary-700'
                }`}>
                  01
                </div>
                <span className="text-xs font-bold text-slate-900">Upload Notes</span>
                <span className="text-[10px] text-slate-500">PDF, PPT, Text</span>
              </a>

              {/* Connector 1 */}
              <div className="hidden lg:flex items-center text-primary-400 shrink-0 px-1">
                <ArrowRight className="w-4 h-4" />
              </div>

              {/* Step 2 Pill */}
              <a
                href="#step-2"
                onClick={() => setActiveStep(2)}
                className={`w-full lg:flex-1 p-3 rounded-2xl border transition-all text-center flex flex-col items-center gap-1 group ${
                  activeStep === 2
                    ? 'bg-secondary-50/80 border-secondary-500 ring-2 ring-secondary-500/30 shadow-md'
                    : 'bg-slate-50 border-slate-100 hover:border-slate-300 hover:bg-slate-100/70'
                }`}
              >
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
                  activeStep === 2 ? 'bg-secondary-600 text-white' : 'bg-slate-200 text-slate-700 group-hover:bg-secondary-100 group-hover:text-secondary-700'
                }`}>
                  02
                </div>
                <span className="text-xs font-bold text-slate-900">AI Analysis</span>
                <span className="text-[10px] text-slate-500">Topic Extraction</span>
              </a>

              {/* Connector 2 */}
              <div className="hidden lg:flex items-center text-secondary-400 shrink-0 px-1">
                <ArrowRight className="w-4 h-4" />
              </div>

              {/* Step 3 Pill */}
              <a
                href="#step-3"
                onClick={() => setActiveStep(3)}
                className={`w-full lg:flex-1 p-3 rounded-2xl border transition-all text-center flex flex-col items-center gap-1 group ${
                  activeStep === 3
                    ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/30 shadow-md'
                    : 'bg-slate-50 border-slate-100 hover:border-slate-300 hover:bg-slate-100/70'
                }`}
              >
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
                  activeStep === 3 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700 group-hover:bg-blue-100 group-hover:text-blue-700'
                }`}>
                  03
                </div>
                <span className="text-xs font-bold text-slate-900">Generate</span>
                <span className="text-[10px] text-slate-500">4 Study Assets</span>
              </a>

              {/* Connector 3 */}
              <div className="hidden lg:flex items-center text-blue-400 shrink-0 px-1">
                <ArrowRight className="w-4 h-4" />
              </div>

              {/* Step 4 Pill */}
              <a
                href="#step-4"
                onClick={() => setActiveStep(4)}
                className={`w-full lg:flex-1 p-3 rounded-2xl border transition-all text-center flex flex-col items-center gap-1 group ${
                  activeStep === 4
                    ? 'bg-amber-50/80 border-amber-500 ring-2 ring-amber-500/30 shadow-md'
                    : 'bg-slate-50 border-slate-100 hover:border-slate-300 hover:bg-slate-100/70'
                }`}
              >
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
                  activeStep === 4 ? 'bg-amber-600 text-white' : 'bg-slate-200 text-slate-700 group-hover:bg-amber-100 group-hover:text-amber-700'
                }`}>
                  04
                </div>
                <span className="text-xs font-bold text-slate-900">Practice</span>
                <span className="text-[10px] text-slate-500">Cards & Quizzes</span>
              </a>

              {/* Connector 4 */}
              <div className="hidden lg:flex items-center text-amber-400 shrink-0 px-1">
                <ArrowRight className="w-4 h-4" />
              </div>

              {/* Step 5 Pill */}
              <a
                href="#step-5"
                onClick={() => setActiveStep(5)}
                className={`w-full lg:flex-1 p-3 rounded-2xl border transition-all text-center flex flex-col items-center gap-1 group ${
                  activeStep === 5
                    ? 'bg-green-50/80 border-green-500 ring-2 ring-green-500/30 shadow-md'
                    : 'bg-slate-50 border-slate-100 hover:border-slate-300 hover:bg-slate-100/70'
                }`}
              >
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
                  activeStep === 5 ? 'bg-green-600 text-white' : 'bg-slate-200 text-slate-700 group-hover:bg-green-100 group-hover:text-green-700'
                }`}>
                  05
                </div>
                <span className="text-xs font-bold text-slate-900">Track Progress</span>
                <span className="text-[10px] text-slate-500">Mastery & Plan</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* STEP 1 — UPLOAD NOTES                                                     */}
      {/* ========================================================================= */}
      <section id="step-1" className="py-20 sm:py-28 bg-white border-b border-slate-100 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Description Column */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="primary" outline>
                  Step 01 • Multi-Format Ingestion
                </Badge>
                <span className="text-xs text-slate-400 font-mono">01 / 05</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                Upload Your Notes
              </h2>
              <p className="text-base text-slate-600 leading-relaxed mb-6">
                Drag and drop your raw coursework materials into Mind Mapr. Whether you have 50-slide PowerPoint presentations, multi-chapter textbook PDFs, Word documents, or raw text notes, our ingestion engine handles them seamlessly.
              </p>

              <div className="space-y-3.5 mb-6">
                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <div className="w-7 h-7 rounded-lg bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-xs">
                    PDF
                  </div>
                  <span><strong>PDF Textbooks & Handouts:</strong> Multi-page lecture notes and reading materials.</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <div className="w-7 h-7 rounded-lg bg-secondary-100 text-secondary-700 flex items-center justify-center font-bold text-xs">
                    PPT
                  </div>
                  <span><strong>PowerPoint Slides (.ppt / .pptx):</strong> Slide decks with diagrams and lecture bullets.</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                    DOC
                  </div>
                  <span><strong>Word & Markdown Documents:</strong> Class essays, syllabus guidelines, and study outlines.</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
                    TXT
                  </div>
                  <span><strong>Raw Typed Notes:</strong> Paste raw notes or transcript text directly.</span>
                </div>
              </div>
            </div>

            {/* Right Upload UI Mockup */}
            <div className="lg:col-span-7">
              <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-slate-950/20 border border-slate-800 text-white">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Upload className="w-5 h-5 text-primary-400" />
                    <h3 className="text-base font-bold text-white">Study Material Ingestion Hub</h3>
                  </div>
                  <Badge variant="primary" className="bg-primary-950 text-primary-300 border-primary-700">
                    Ready to Upload
                  </Badge>
                </div>

                {/* Dropzone mockup */}
                <div className="border-2 border-dashed border-slate-700 hover:border-primary-500 rounded-2xl p-8 text-center transition-all bg-slate-800/40 cursor-pointer group">
                  <div className="w-14 h-14 rounded-2xl bg-primary-500/10 text-primary-400 flex items-center justify-center mx-auto mb-4 border border-primary-500/20 group-hover:scale-105 transition">
                    <Upload className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-1">
                    Drag & Drop course files here
                  </h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
                    Supports PDF, PPT, PPTX, DOCX, and TXT (up to 50MB per file)
                  </p>
                  <Button variant="primary" size="sm" className="bg-primary-600 hover:bg-primary-500 text-xs px-4">
                    Browse Local Files
                  </Button>
                </div>

                {/* Simulated Ingested Files List */}
                <div className="mt-6 space-y-3">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    Uploaded Course Files (2)
                  </span>

                  <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-orange-500/20 text-orange-400 font-bold text-xs">
                        PPTX
                      </div>
                      <div>
                        <strong className="block text-xs text-white">CS402_Operating_Systems_Unit3.pptx</strong>
                        <span className="text-[10px] text-slate-400">14.2 MB • 48 Slides</span>
                      </div>
                    </div>
                    <Badge variant="success" className="bg-green-950 text-green-300 border-green-700 text-[10px]">
                      ✓ Ingested
                    </Badge>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-red-500/20 text-red-400 font-bold text-xs">
                        PDF
                      </div>
                      <div>
                        <strong className="block text-xs text-white">Database_Storage_Chapter4.pdf</strong>
                        <span className="text-[10px] text-slate-400">8.6 MB • 32 Pages</span>
                      </div>
                    </div>
                    <Badge variant="success" className="bg-green-950 text-green-300 border-green-700 text-[10px]">
                      ✓ Ingested
                    </Badge>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
                  <Button variant="primary" size="md" iconRight={ArrowRight} className="bg-primary-600 hover:bg-primary-500 text-xs font-semibold">
                    Proceed to AI Analysis
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* STEP 2 — AI ANALYSIS                                                     */}
      {/* ========================================================================= */}
      <section id="step-2" className="py-20 sm:py-28 bg-slate-50 border-b border-slate-100 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left AI Terminal Mockup */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-slate-950/20 border border-slate-800 text-white font-mono text-xs">
                {/* Top Terminal Bar */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                  <div className="flex items-center gap-2 font-sans font-bold">
                    <Cpu className="w-5 h-5 text-secondary-400 animate-pulse" />
                    <span>AI Semantic Knowledge Extraction Engine</span>
                  </div>
                  <Badge variant="secondary" className="bg-secondary-950 text-secondary-300 border-secondary-700 font-sans">
                    Processing Complete
                  </Badge>
                </div>

                {/* 4 Analysis Stages with Status */}
                <div className="space-y-4 font-sans">
                  {/* Stage 1 */}
                  <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary-950 text-primary-400 border border-primary-800/50 mt-0.5">
                      <Search className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <strong className="text-white text-xs">1. Text Extraction & Optical Parsing</strong>
                        <span className="text-[10px] text-green-400 font-mono">100% Completed</span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Extracted 12,450 clean tokens across 48 slides. Filtered presentation headers, page footers, and redundant slide animations.
                      </p>
                    </div>
                  </div>

                  {/* Stage 2 */}
                  <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-secondary-950 text-secondary-400 border border-secondary-800/50 mt-0.5">
                      <BrainCircuit className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <strong className="text-white text-xs">2. Topic & Hierarchy Identification</strong>
                        <span className="text-[10px] text-green-400 font-mono">100% Completed</span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Constructed knowledge tree with 1 Central Topic, 4 Core Modules, and 14 Subtopics with cross-module parent-child relationships.
                      </p>
                    </div>
                  </div>

                  {/* Stage 3 */}
                  <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-amber-950 text-amber-400 border border-amber-800/50 mt-0.5">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <strong className="text-white text-xs">3. Concept & Definition Detection</strong>
                        <span className="text-[10px] text-green-400 font-mono">100% Completed</span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Isolated 32 key technical definitions, 6 mathematical formulas (e.g. EMAT, Page Fault Math), and 4 algorithmic step sequences.
                      </p>
                    </div>
                  </div>

                  {/* Stage 4 */}
                  <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-red-950 text-red-400 border border-red-800/50 mt-0.5">
                      <Target className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <strong className="text-white text-xs">4. Important-Topic & Exam Probability Analysis</strong>
                        <span className="text-[10px] text-green-400 font-mono">100% Completed</span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Classified 3 High-Priority topics (95% Exam Weight), 2 Medium-Priority, and 1 Low-Priority based on syllabus frequency.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom processing badge */}
                <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-slate-400">
                  <span>Decomposition latency: <strong className="text-white">18.4s</strong></span>
                  <span className="text-green-400 flex items-center gap-1">
                    <CheckCheck className="w-4 h-4" />
                    Knowledge Structure Ready
                  </span>
                </div>
              </div>
            </div>

            {/* Right Description Column */}
            <div className="lg:col-span-5 flex flex-col justify-center order-1 lg:order-2">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" outline>
                  Step 02 • Semantic Extraction
                </Badge>
                <span className="text-xs text-slate-400 font-mono">02 / 05</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                AI Deep Analysis
              </h2>
              <p className="text-base text-slate-600 leading-relaxed mb-6">
                Our parser breaks down your uploaded documents into a structured semantic graph, extracting key definitions, formulas, relationships, and exam priorities in seconds.
              </p>

              <div className="space-y-3 text-sm text-slate-700">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-secondary-600 shrink-0 mt-0.5" />
                  <span><strong>Text Extraction:</strong> Cleans raw text, eliminates slide noise, and detects headers.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-secondary-600 shrink-0 mt-0.5" />
                  <span><strong>Topic Identification:</strong> Establishes root, parent, and subtopic trees.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-secondary-600 shrink-0 mt-0.5" />
                  <span><strong>Concept Detection:</strong> Pulls out exact formulas, theorems, and proof points.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-secondary-600 shrink-0 mt-0.5" />
                  <span><strong>Important-Topic Analysis:</strong> Tags high-yield concepts most likely to be tested.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* STEP 3 — GENERATE RESOURCES                                               */}
      {/* ========================================================================= */}
      <section id="step-3" className="py-20 sm:py-28 bg-white border-b border-slate-100 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <Badge variant="primary" outline>
                Step 03 • Resource Generation
              </Badge>
              <span className="text-xs text-slate-400 font-mono">03 / 05</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Generate Smart Revision Assets
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Mind Mapr instantly transforms the extracted knowledge into 4 interactive study formats tailored to active recall.
            </p>
          </div>

          {/* 4 Generated Assets Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Asset 1: Summary */}
            <Card hoverEffect className="p-6 bg-white border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-secondary-50 text-secondary-600 flex items-center justify-center mb-5 border border-secondary-100">
                  <FileText className="w-6 h-6" />
                </div>
                <Badge variant="secondary" className="mb-2">Exam Synopses</Badge>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Structured Summary</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Concise outlines highlighting key definitions, equations, and 2-minute pre-exam cram takeaways without fluff.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-xs font-semibold text-secondary-600 flex items-center gap-1">
                <span>Formulas & Key Points</span>
              </div>
            </Card>

            {/* Asset 2: Mind Map */}
            <Card hoverEffect className="p-6 bg-white border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mb-5 border border-primary-100">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <Badge variant="primary" className="mb-2">Visual Hierarchy</Badge>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Interactive Mind Map</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Interactive multi-branch concept graph with zoom controls, expandable nodes, and relational dependency links.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-xs font-semibold text-primary-600 flex items-center gap-1">
                <span>Zoom & Node Inspector</span>
              </div>
            </Card>

            {/* Asset 3: Flashcards */}
            <Card hoverEffect className="p-6 bg-white border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5 border border-amber-100">
                  <Zap className="w-6 h-6" />
                </div>
                <Badge variant="warning" className="mb-2">Spaced Repetition</Badge>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Active Flashcards</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Spaced retrieval question-and-answer pairs with 4-tier difficulty ratings (Again, Hard, Good, Easy) and streak tracking.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-xs font-semibold text-amber-600 flex items-center gap-1">
                <span>Prompt-Answer Pairs</span>
              </div>
            </Card>

            {/* Asset 4: Quiz */}
            <Card hoverEffect className="p-6 bg-white border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mb-5 border border-green-100">
                  <Target className="w-6 h-6" />
                </div>
                <Badge variant="success" className="mb-2">Adaptive Tests</Badge>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Adaptive Quiz</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Dynamic practice test with Easy → Medium → Hard question scaling and instant AI theoretical explanations.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-xs font-semibold text-green-600 flex items-center gap-1">
                <span>Real-Time Feedback</span>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* STEP 4 — PRACTICE                                                         */}
      {/* ========================================================================= */}
      <section id="step-4" className="py-20 sm:py-28 bg-slate-50 border-b border-slate-100 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Description Column */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="warning" outline>
                  Step 04 • Active Learning
                </Badge>
                <span className="text-xs text-slate-400 font-mono">04 / 05</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                Practice & Revise
              </h2>
              <p className="text-base text-slate-600 leading-relaxed mb-6">
                Active learning outperforms passive re-reading. Use your generated flashcards to strengthen memory recall, take adaptive quizzes that challenge weak areas, and inspect topic details for deep conceptual clarity.
              </p>

              <div className="space-y-3.5 text-sm text-slate-700">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                  <strong className="block text-slate-900 font-semibold mb-1">⚡ Spaced Retrieval Flashcards</strong>
                  <span className="text-xs text-slate-500">Test memory retrieval under timed intervals and track mastery streaks.</span>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                  <strong className="block text-slate-900 font-semibold mb-1">🎯 Adaptive Practice Quizzes</strong>
                  <span className="text-xs text-slate-500">Scale difficulty dynamically to prepare for challenging university exam questions.</span>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                  <strong className="block text-slate-900 font-semibold mb-1">📑 Rapid Topic Review</strong>
                  <span className="text-xs text-slate-500">Review formulas and exam traps right before walking into the test hall.</span>
                </div>
              </div>
            </div>

            {/* Right Practice Simulator Mockup */}
            <div className="lg:col-span-7">
              <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-slate-950/20 border border-slate-800 text-white">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                  <div>
                    <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                      Interactive Practice Suite
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">
                      Active Recall & Adaptive Testing
                    </h3>
                  </div>
                  <Badge variant="warning" className="bg-amber-950 text-amber-300 border-amber-700">
                    Live Session
                  </Badge>
                </div>

                {/* Sub-card 1: Mini Flashcard */}
                <div
                  onClick={() => setIsFlashcardFlipped(!isFlashcardFlipped)}
                  className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-slate-600 transition cursor-pointer mb-5"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-semibold text-primary-400">Flashcard Mode</span>
                    <span className="text-[11px] bg-slate-900 px-2 py-0.5 rounded text-slate-400">
                      {isFlashcardFlipped ? 'Answer Revealed (Click to flip)' : 'Click to Reveal Answer'}
                    </span>
                  </div>

                  {!isFlashcardFlipped ? (
                    <p className="text-sm font-semibold text-white">
                      Q: What is the primary difference between Preemptive and Non-Preemptive CPU Scheduling?
                    </p>
                  ) : (
                    <p className="text-sm text-slate-200">
                      A: Preemptive allows the OS to interrupt a running process (e.g. Round Robin, SRTF). Non-preemptive lets a process hold CPU until it completes or yields voluntarily (e.g. FCFS).
                    </p>
                  )}
                </div>

                {/* Sub-card 2: Mini Adaptive Quiz Item */}
                <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-semibold text-green-400">Adaptive Quiz Mode</span>
                    <span className="text-[11px] text-slate-400">Medium Difficulty</span>
                  </div>

                  <p className="text-sm font-semibold text-white mb-3">
                    Which disk scheduling algorithm guarantees no starvation while sweeping back and forth across cylinders?
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      { id: '1', text: 'FCFS', correct: false },
                      { id: '2', text: 'SCAN (Elevator Algorithm)', correct: true },
                      { id: '3', text: 'SSTF', correct: false },
                      { id: '4', text: 'Shortest Seek First', correct: false },
                    ].map((opt) => {
                      const isSelected = practiceQuizAnswer === opt.id;
                      let style = 'bg-slate-900/80 border-slate-700 text-slate-200 hover:bg-slate-900';
                      if (isSelected) {
                        style = opt.correct
                          ? 'bg-green-950 border-green-500 text-green-200 ring-1 ring-green-500'
                          : 'bg-red-950 border-red-500 text-red-200';
                      }
                      return (
                        <div
                          key={opt.id}
                          onClick={() => setPracticeQuizAnswer(opt.id)}
                          className={`p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition ${style}`}
                        >
                          {opt.text}
                        </div>
                      );
                    })}
                  </div>

                  {practiceQuizAnswer === '2' && (
                    <div className="mt-3 p-2 rounded-lg bg-green-950/60 border border-green-800/40 text-[11px] text-green-300">
                      ✓ Correct! SCAN moves in one direction servicing requests, then reverses direction at the end.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* STEP 5 — TRACK PROGRESS                                                   */}
      {/* ========================================================================= */}
      <section id="step-5" className="py-20 sm:py-28 bg-white border-b border-slate-100 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Dashboard Mockup */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
                {/* Top Metrics Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-2xl bg-green-50/70 border border-green-100">
                    <span className="text-[11px] font-semibold text-green-700">Overall Mastery</span>
                    <h4 className="text-2xl font-black text-green-900 mt-1">86%</h4>
                    <span className="text-[10px] text-green-600 font-medium">+14% this week</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-100">
                    <span className="text-[11px] font-semibold text-amber-700">Study Streak</span>
                    <h4 className="text-2xl font-black text-amber-900 mt-1">6 Days</h4>
                    <span className="text-[10px] text-amber-600 font-medium">Consistent 🔥</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-primary-50/70 border border-primary-100">
                    <span className="text-[11px] font-semibold text-primary-700">Quiz Accuracy</span>
                    <h4 className="text-2xl font-black text-primary-900 mt-1">91%</h4>
                    <span className="text-[10px] text-primary-600 font-medium">24 Quizzes Taken</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-secondary-50/70 border border-secondary-100">
                    <span className="text-[11px] font-semibold text-secondary-700">Exam Days Left</span>
                    <h4 className="text-2xl font-black text-secondary-900 mt-1">4 Days</h4>
                    <span className="text-[10px] text-secondary-600 font-medium">On Track</span>
                  </div>
                </div>

                {/* Unit Mastery Bars */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                    Subject Module Mastery
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                        <span>Module 1: Process Scheduling & Threads</span>
                        <span className="font-bold text-green-600">92% (Mastered)</span>
                      </div>
                      <ProgressBar value={92} variant="success" size="sm" />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                        <span>Module 2: Virtual Memory & Page Replacement</span>
                        <span className="font-bold text-primary-600">85% (Proficient)</span>
                      </div>
                      <ProgressBar value={85} variant="primary" size="sm" />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                        <span>Module 3: Deadlocks & Banker's Algorithm</span>
                        <span className="font-bold text-amber-600">64% (Needs Review)</span>
                      </div>
                      <ProgressBar value={64} variant="warning" size="sm" />
                    </div>
                  </div>
                </div>

                {/* Weak Topics Warning Callout */}
                <div className="p-4 rounded-2xl bg-red-50/70 border border-red-200 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-red-800 font-bold">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span>Diagnosed Weak Area: Banker's Algorithm Safety State</span>
                  </div>
                  <p className="text-red-700">
                    Accuracy is currently 50% on resource allocation matrices. Recommended to review proof before exam.
                  </p>
                </div>

                {/* Revision Plan Timeline */}
                <div className="p-4 rounded-2xl bg-slate-900 text-white text-xs space-y-2">
                  <div className="flex items-center justify-between text-secondary-300 font-bold">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      Dynamic Revision Plan (Next 3 Days)
                    </span>
                    <span className="text-[10px] text-slate-400 font-normal">Automated Schedule</span>
                  </div>
                  <div className="space-y-1.5 pt-1 text-slate-300">
                    <div className="flex items-center justify-between">
                      <span>• Today: 5 Flashcards in Banker's Algorithm</span>
                      <span className="font-mono text-slate-400">10 mins</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>• Tomorrow: Adaptive Quiz on Virtual Memory</span>
                      <span className="font-mono text-slate-400">15 mins</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>• Day 3: Full Concept Map Review + Formulas</span>
                      <span className="font-mono text-slate-400">20 mins</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Description Column */}
            <div className="lg:col-span-5 flex flex-col justify-center order-1 lg:order-2">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="success" outline>
                  Step 05 • Mastery & Revision Plan
                </Badge>
                <span className="text-xs text-slate-400 font-mono">05 / 05</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                Track Progress & Follow Revision Plan
              </h2>
              <p className="text-base text-slate-600 leading-relaxed mb-6">
                Always know exactly where you stand before exams. Mind Mapr tracks your topic-by-topic mastery, flags conceptual weaknesses, and auto-generates a daily step-by-step revision calendar.
              </p>

              <div className="space-y-3 text-sm text-slate-700">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                  <span><strong>Overall Mastery:</strong> Percentage-based readiness benchmark.</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                  <span><strong>Weak Topics Diagnosis:</strong> Instantly pinpoints low-accuracy concepts.</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                  <span><strong>Dynamic Revision Plan:</strong> Daily task suggestions calculated to your exam date.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FINAL SECTION & CTA                                                       */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-tr from-primary-900 via-slate-900 to-secondary-900 p-8 sm:p-14 text-center text-white shadow-2xl shadow-primary-950/30 border border-primary-700/40">
            {/* Ambient background glow */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-secondary-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <Badge variant="primary" className="bg-primary-950/90 text-primary-300 border-primary-700/60 mb-6">
                Start Today
              </Badge>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
                Your Materials. <br className="hidden sm:inline" />
                <span className="gradient-text">Your Revision. Your Progress.</span>
              </h2>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
                Upload your course materials now and see how effortless exam preparation can feel with AI-structured resources.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/register" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" iconRight={ArrowRight} className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold shadow-lg shadow-primary-600/40 bg-primary-600 hover:bg-primary-500">
                    Start With Your Notes
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
