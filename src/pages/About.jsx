import React from 'react';
import { Link } from 'react-router-dom';
import {
  BrainCircuit,
  ArrowRight,
  Sparkles,
  BookOpen,
  Zap,
  Target,
  FileText,
  Layers,
  FileX,
  CalendarX,
  Cpu,
  Globe,
  BarChart3,
  CheckCircle2,
  Check,
  ShieldCheck,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  Workflow,
  Compass
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-16 selection:bg-primary-500 selection:text-white">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION                                                          */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-slate-200/70 bg-gradient-to-b from-white via-slate-50/50 to-slate-50">
        {/* Ambient background lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-primary-400/15 via-secondary-400/15 to-transparent blur-[130px] pointer-events-none -z-10 rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Announcement Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 text-primary-700 text-xs sm:text-sm font-semibold rounded-full border border-primary-100/80 shadow-sm mb-6 animate-in fade-in duration-500">
            <Sparkles className="w-4 h-4 text-primary-600 animate-pulse" />
            <span>Project-Based Learning (PBL) Academic Initiative</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6 max-w-4xl mx-auto">
            A Smarter Way to <span className="gradient-text">Revise</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal mb-10">
            Mind Mapr is an AI-powered Smart Revision Assistant designed to help college students organize learning materials, understand important concepts and practice effectively.
          </p>

          {/* Trust/Context Mini Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-primary-600" />
              <span>Designed for Higher Education</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BrainCircuit className="w-4 h-4 text-secondary-600" />
              <span>Grounded in Active Recall</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              <span>Academic Integrity Focused</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE PROBLEM SECTION                                                    */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="danger" outline className="mb-4">
              Why We Built Mind Mapr
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Traditional Study Habits Are Broken
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              College students spend countless hours preparing for exams, yet traditional study routines often lead to fatigue, disorganization, and low retention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Problem 1 */}
            <Card className="border-red-100/80 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-6 border border-red-100">
                  <FileX className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Information Overload
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Endless 100-slide lecture presentations, dense PDF handouts, and 500-page textbooks without clear visual hierarchy make it overwhelming to determine what is truly high-yield for exams.
                </p>
              </CardContent>
            </Card>

            {/* Problem 2 */}
            <Card className="border-amber-100/80 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6 border border-amber-100">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Scattered Notes
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Course materials fragmented across WhatsApp groups, Google Drive folders, messy phone photos, and paper notebooks lead to chaotic and stressful last-minute cramming.
                </p>
              </CardContent>
            </Card>

            {/* Problem 3 */}
            <Card className="border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center mb-6 border border-slate-200">
                  <CalendarX className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Poor Revision Planning
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Guessing which concepts are high-weightage and studying without objective mastery benchmarks results in wasted time on low-yield material and exam-day surprises.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THE VISION SECTION                                                     */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="primary" outline className="mb-4">
              Our Vision
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
              Making Revision More Focused
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Mind Mapr aims to help students move from raw, unstructured study materials to organized, high-impact revision. Instead of passively re-reading static handouts, students should be actively exploring conceptual trees, testing recall with flashcards, and eliminating weak areas with adaptive practice.
            </p>
          </div>

          {/* Transformation Comparison Visual */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* The Old Way */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="danger">Traditional Study Approach</Badge>
                  <span className="text-xs text-slate-400">Inefficient & Passive</span>
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-3">Passive Re-reading</h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✕</span>
                    <span>Wasting 70% of study time re-organizing notes and finding formulas.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✕</span>
                    <span>Highlighting textbook pages gives an illusion of competence.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✕</span>
                    <span>No objective metric to measure readiness before exam day.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* The Mind Mapr Way */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-primary-900 to-slate-900 text-white shadow-xl shadow-primary-950/20 border border-primary-700/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="primary" className="bg-primary-950 text-primary-300 border-primary-700">
                    The Mind Mapr Method
                  </Badge>
                  <span className="text-xs text-primary-300 font-semibold">Active & Targeted</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-3">Structured, Active Revision</h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                    <span>Instant extraction of hierarchical concept maps and concise summaries.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                    <span>Spaced retrieval flashcards and adaptive practice quizzes.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                    <span>Objective readiness scores and weak-topic diagnostics.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CORE PHILOSOPHY SECTION (3 CARDS: LEARN, RECALL, MASTER)              */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="primary" outline className="mb-4">
              The Three Pillars
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our Core Philosophy
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Every feature in Mind Mapr is structured around three interconnected cognitive stages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1: Learn */}
            <Card hoverEffect className="bg-slate-50/60 p-8 border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mb-6 border border-primary-100">
                  <BrainCircuit className="w-7 h-7" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-black text-slate-900">Learn</h3>
                  <Badge variant="primary">Pillar 01</Badge>
                </div>
                <p className="text-sm font-semibold text-primary-700 mb-3">
                  Understand concepts through summaries and visual maps.
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Deconstruct complex, multi-chapter coursework into clear visual hierarchy trees. View how proofs, formulas, and subtopics interconnect without getting lost in walls of text.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/80 text-xs font-semibold text-primary-600">
                Interactive Mind Maps • Exam Synopses
              </div>
            </Card>

            {/* Pillar 2: Recall */}
            <Card hoverEffect className="bg-slate-50/60 p-8 border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-secondary-50 text-secondary-600 flex items-center justify-center mb-6 border border-secondary-100">
                  <Zap className="w-7 h-7" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-black text-slate-900">Recall</h3>
                  <Badge variant="secondary">Pillar 02</Badge>
                </div>
                <p className="text-sm font-semibold text-secondary-700 mb-3">
                  Strengthen memory using flashcards and quizzes.
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Move knowledge from working memory to permanent long-term recall. Spaced repetition flashcards and adaptive practice tests actively prompt your brain to retrieve knowledge.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/80 text-xs font-semibold text-secondary-600">
                Spaced Repetition • Dynamic Quizzes
              </div>
            </Card>

            {/* Pillar 3: Master */}
            <Card hoverEffect className="bg-slate-50/60 p-8 border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mb-6 border border-green-100">
                  <Target className="w-7 h-7" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-black text-slate-900">Master</h3>
                  <Badge variant="success">Pillar 03</Badge>
                </div>
                <p className="text-sm font-semibold text-green-700 mb-3">
                  Identify weak areas and focus revision where it matters.
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Track objective mastery scores across individual units. Mind Mapr automatically diagnoses low-accuracy topics and builds targeted revision schedules to eliminate blind spots.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/80 text-xs font-semibold text-green-600">
                Weak Topic Diagnostics • Revision Plans
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. TECHNOLOGY SECTION                                                     */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="secondary" outline className="mb-4">
              Architecture & Stack
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Technology Behind Mind Mapr
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              A high-performance modern web architecture designed for rapid, client-side interactions and intelligent revision generation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tech 1: AI / NLP */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mb-6 border border-primary-100">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">AI / NLP Processing</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Utilizes Natural Language Processing (NLP) to parse unstructured coursework documents, extract relational topic graphs, detect technical formulas, and generate active recall test items.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
                Topic Extraction • Exam Prioritization
              </div>
            </div>

            {/* Tech 2: Modern Web Platform */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-secondary-50 text-secondary-600 flex items-center justify-center mb-6 border border-secondary-100">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Modern Web Platform</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Engineered as a single-page application using React, Vite, and responsive styling. Delivers instant screen transitions, fluid node graph interactions, and mobile-friendly usability.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
                React • Vite • Responsive Design
              </div>
            </div>

            {/* Tech 3: Data-Driven Guidance */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mb-6 border border-green-100">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Data-Driven Progress Guidance</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Incorporates algorithm-driven mastery tracking, spaced repetition interval calculations, and automatic weak-spot detection to optimize study schedules leading up to exams.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
                Mastery Metrics • Spaced Repetition
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. CLOSING & FINAL CTA SECTION                                            */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-tr from-primary-900 via-slate-900 to-secondary-900 p-8 sm:p-14 text-center text-white shadow-2xl shadow-primary-950/30 border border-primary-700/40">
            {/* Ambient glow */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-secondary-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <Badge variant="primary" className="bg-primary-950/90 text-primary-300 border-primary-700/60 mb-6">
                Start Your Smart Revision
              </Badge>

              <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-6 leading-tight">
                Learn. Map. <br className="hidden sm:inline" />
                <span className="gradient-text">Recall. Master.</span>
              </h2>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
                Transform your raw course notes into structured visual maps, summaries, flashcards, and adaptive quizzes today.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/register" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" iconRight={ArrowRight} className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold shadow-lg shadow-primary-600/40 bg-primary-600 hover:bg-primary-500">
                    Start Revising Smarter
                  </Button>
                </Link>
                <Link to="/dashboard" className="w-full sm:w-auto">
                  <Button variant="glass" size="lg" className="w-full sm:w-auto px-6 py-3.5 text-base font-semibold">
                    Explore Demo Dashboard
                  </Button>
                </Link>
              </div>

              <p className="mt-6 text-xs text-slate-400">
                Project-Based Learning (PBL) Academic EdTech Assistant
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
