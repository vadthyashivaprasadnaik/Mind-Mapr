import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FileText,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Network,
  Layers,
  GraduationCap,
  Bookmark,
  RefreshCw,
  Check,
  FileCheck2,
  AlertTriangle,
  Play,
  XCircle,
  Clock
} from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import BackButton from '../components/ui/BackButton';
import Card, { CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import ProgressBar from '../components/ui/ProgressBar';
import { useToast } from '../components/ui/Toast';

export default function AIAnalysis() {
  const toast = useToast();
  const location = useLocation();

  // Active Material (passed from route state or default realistic demo data)
  const defaultMaterial = {
    title: 'Operating Systems Notes.pdf',
    fileName: 'Operating_Systems_Lecture_Unit3.pdf',
    fileType: 'PDF',
    fileSize: '4.2 MB',
    pages: 42,
    pagesLabel: '42 pages',
    topic: 'Operating Systems',
    category: 'Computer Science',
  };

  const material = location.state?.material || defaultMaterial;

  // Processing Lifecycle State: 'idle' | 'processing' | 'completed' | 'error'
  const [processingState, setProcessingState] = useState('idle');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const timerRef = useRef(null);

  // Exact 8 Processing Steps specified in requirements
  const steps = [
    {
      id: 1,
      title: 'File Uploaded',
      description: 'Your study material has been received.',
      operation: 'File Uploaded',
      operationDesc: 'Document binary verified and cached in memory.',
    },
    {
      id: 2,
      title: 'Extracting Content',
      description: 'Reading and preparing the material.',
      operation: 'Extracting Content',
      operationDesc: 'Reading and preparing the document text, figures, and structural hierarchy.',
    },
    {
      id: 3,
      title: 'Identifying Topics',
      description: 'Finding major topics and concepts.',
      operation: 'Identifying Topics',
      operationDesc: 'Finding the major concepts and organizing them for structured revision.',
    },
    {
      id: 4,
      title: 'Finding Important Concepts',
      description: 'Identifying high-priority concepts for revision.',
      operation: 'Finding Important Concepts',
      operationDesc: 'Identifying high-priority exam concepts, formulas, algorithms, and key definitions.',
    },
    {
      id: 5,
      title: 'Generating Summary',
      description: 'Creating a concise exam-focused summary.',
      operation: 'Generating Summary',
      operationDesc: 'Synthesizing key takeaways and bulleted chapter digests.',
    },
    {
      id: 6,
      title: 'Building Mind Map',
      description: 'Organizing concepts and relationships visually.',
      operation: 'Building Mind Map',
      operationDesc: 'Organizing visual node connections and semantic knowledge relationships.',
    },
    {
      id: 7,
      title: 'Creating Flashcards',
      description: 'Generating active-recall flashcards.',
      operation: 'Creating Flashcards',
      operationDesc: 'Generating active-recall study cards with spaced repetition triggers.',
    },
    {
      id: 8,
      title: 'Preparing Quiz',
      description: 'Creating practice questions based on the material.',
      operation: 'Preparing Quiz',
      operationDesc: 'Creating adaptive practice questions with answer rationales based on your notes.',
    },
  ];

  // 5 Generated Revision Resource Cards
  const resourceCards = [
    {
      id: 'summary',
      title: 'Smart Summary',
      description: 'Review the most important concepts and points from your material.',
      buttonText: 'Open Summary',
      route: '/summary',
      icon: FileText,
      color: 'bg-blue-50 text-blue-600 border-blue-100',
      badge: 'Ready',
      stats: '1,450 words • 8 key topics',
    },
    {
      id: 'mind-map',
      title: 'Mind Map',
      description: 'Explore concepts and their relationships visually.',
      buttonText: 'Open Mind Map',
      route: '/mind-map',
      icon: Network,
      color: 'bg-primary-50 text-primary-600 border-primary-100',
      badge: 'Ready',
      stats: '24 interactive nodes',
    },
    {
      id: 'flashcards',
      title: 'Flashcards',
      description: 'Practice active recall using generated study cards.',
      buttonText: 'Practice Flashcards',
      route: '/flashcards',
      icon: Layers,
      color: 'bg-secondary-50 text-secondary-600 border-secondary-100',
      badge: 'Ready',
      stats: '28 cards in active deck',
    },
    {
      id: 'quiz',
      title: 'Adaptive Quiz',
      description: 'Test your understanding with practice questions.',
      buttonText: 'Start Quiz',
      route: '/quiz',
      icon: GraduationCap,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      badge: 'Ready',
      stats: '10 practice questions',
    },
    {
      id: 'important-topics',
      title: 'Important Topics',
      description: 'Focus your revision on high-priority concepts.',
      buttonText: 'View Topics',
      route: '/important-topics',
      icon: Bookmark,
      color: 'bg-amber-50 text-amber-600 border-amber-100',
      badge: 'Ready',
      stats: '6 high-yield priorities',
    },
  ];

  // Simulation Controller: Runs the 8 sequential steps
  const startSimulation = (simulateError = false) => {
    if (timerRef.current) clearInterval(timerRef.current);

    setProcessingState('processing');
    setCurrentStepIndex(0);

    let currentStep = 0;
    const stepDuration = 550; // ms per step

    timerRef.current = setInterval(() => {
      currentStep += 1;

      // Simulated error branch (if triggered for testing error states)
      if (simulateError && currentStep === 4) {
        clearInterval(timerRef.current);
        setCurrentStepIndex(3);
        setProcessingState('error');
        toast.error('Analysis Failed: Process interrupted.');
        return;
      }

      if (currentStep < steps.length) {
        setCurrentStepIndex(currentStep);
      } else {
        clearInterval(timerRef.current);
        setCurrentStepIndex(steps.length);
        setProcessingState('completed');
        toast.success('Analysis Complete! Your revision resources are ready.');
      }
    }, stepDuration);
  };

  // Cancel Analysis handler
  const handleCancelAnalysis = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setProcessingState('idle');
    setCurrentStepIndex(0);
    toast.info('Analysis cancelled.');
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Calculate live progress percentage
  const progressPercentage = processingState === 'idle'
    ? 0
    : processingState === 'completed'
      ? 100
      : Math.min(99, Math.round(((currentStepIndex + 0.5) / steps.length) * 100));

  // Current active step details for the secondary information section
  const activeStep = steps[Math.min(currentStepIndex, steps.length - 1)];

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* ========================================================================= */}
      {/* 1. BREADCRUMB & PAGE HEADER                                               */}
      {/* ========================================================================= */}
      <div>
        <BackButton label="Back to My Materials" fallback="/materials" to="/materials" />

        <PageHeader
          title="AI Analysis"
          description="Turning your study material into smart revision resources."
        >
          <div className="flex items-center gap-2.5">
            {/* Back to My Materials CTA */}
            <Link to="/materials">
              <Button
                variant="outline"
                size="sm"
                iconLeft={ArrowLeft}
                className="font-semibold text-xs cursor-pointer"
              >
                Back to My Materials
              </Button>
            </Link>
          </div>
        </PageHeader>
      </div>

      {/* ========================================================================= */}
      {/* 2. MATERIAL BEING ANALYZED CARD                                           */}
      {/* ========================================================================= */}
      <Card className="border-slate-200/80 bg-white shadow-xs overflow-hidden">
        <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 text-red-600 flex items-center justify-center font-bold text-sm shadow-2xs shrink-0">
              <FileText className="w-6 h-6" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
                  {material.fileType}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {material.fileSize} • {material.pagesLabel}
                </span>
                <span className="hidden md:inline text-slate-300">•</span>
                <span className="hidden md:inline text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  {material.topic}
                </span>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-slate-900 truncate">
                {material.title}
              </h2>
            </div>
          </div>

          {/* Status Badge Indicator */}
          <div className="flex items-center gap-2 shrink-0">
            {processingState === 'idle' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                <Clock className="w-3.5 h-3.5" />
                <span>Status: Ready for Analysis</span>
              </span>
            )}
            {processingState === 'processing' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 animate-pulse">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Status: Analyzing</span>
              </span>
            )}
            {processingState === 'completed' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Status: Ready</span>
              </span>
            )}
            {processingState === 'error' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Status: Failed</span>
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ========================================================================= */}
      {/* 3. MULTI-STAGE WORKFLOW ENGINE (IDLE | PROCESSING | ERROR | COMPLETED)    */}
      {/* ========================================================================= */}

      {/* ------------------------------------------------------------------------- */}
      {/* STAGE 1: IDLE / READY TO ANALYZE                                          */}
      {/* ------------------------------------------------------------------------- */}
      {processingState === 'idle' && (
        <Card className="border-slate-200/90 shadow-md bg-gradient-to-br from-white via-slate-50/50 to-primary-50/20 animate-in fade-in duration-300">
          <CardContent className="p-8 sm:p-12 text-center max-w-xl mx-auto flex flex-col items-center">
            <div className="w-16 h-16 rounded-3xl bg-primary-50 text-primary-600 border border-primary-100 flex items-center justify-center shadow-md shadow-primary-500/10 mb-4">
              <Sparkles className="w-8 h-8 text-primary-600 animate-pulse" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Ready to analyze your material?
            </h3>

            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Mind Mapr will identify important concepts and prepare revision resources from your study material.
            </p>

            {/* Feature Highlights Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-6 w-full text-left">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-700">Exam Summary</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-700">Visual Mind Map</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-700">Recall Flashcards</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-700">Practice Quiz</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs sm:col-span-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-700">Key Priority Topics</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-8 w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                onClick={() => startSimulation(false)}
                iconLeft={Play}
                className="w-full sm:w-auto font-bold px-8 py-3.5 shadow-lg shadow-primary-500/25 text-sm sm:text-base cursor-pointer"
              >
                Start AI Analysis
              </Button>

              <Link to="/materials" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto font-semibold text-xs sm:text-sm"
                >
                  Back to My Materials
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ------------------------------------------------------------------------- */}
      {/* STAGE 2: PROCESSING STATE                                                 */}
      {/* ------------------------------------------------------------------------- */}
      {processingState === 'processing' && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-300">
          {/* Progress Header Card */}
          <Card className="border-primary-200/90 shadow-md shadow-primary-500/5 bg-gradient-to-br from-white to-primary-50/20">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-bold border border-primary-100 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-primary-600 animate-pulse" />
                    <span>AI Synthesis Engine</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    Analyzing your study material
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Please wait while Mind Mapr processes your material.
                  </p>
                </div>

                <div className="flex items-center gap-4 sm:flex-col sm:items-end shrink-0">
                  <div className="text-left sm:text-right">
                    <span className="text-3xl sm:text-4xl font-extrabold text-primary-600 font-mono tracking-tight">
                      {progressPercentage}% Complete
                    </span>
                    <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider mt-0.5">
                      Step {Math.min(currentStepIndex + 1, steps.length)} of {steps.length}
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancelAnalysis}
                    iconLeft={XCircle}
                    className="text-xs font-semibold text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                  >
                    Cancel Analysis
                  </Button>
                </div>
              </div>

              {/* Live Animated Progress Bar */}
              <div className="mt-3">
                <ProgressBar
                  value={progressPercentage}
                  max={100}
                  variant="primary"
                  size="lg"
                />
              </div>
            </CardContent>
          </Card>

          {/* Dynamic Active Operation Details Section */}
          <Card className="border-primary-100 bg-primary-50/40 shadow-2xs">
            <CardContent className="p-4 sm:p-5 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-primary-600 text-white flex items-center justify-center shadow-xs shrink-0 mt-0.5">
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold text-primary-700 tracking-wider">
                    Current Operation
                  </span>
                  <span className="text-xs text-slate-300">•</span>
                  <span className="text-xs font-bold text-slate-900">
                    {activeStep.operation}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {activeStep.operationDesc}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 8 Sequential Steps Checklist */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-1">
              AI Processing Pipeline (8 Steps)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {steps.map((step, idx) => {
                const isCompleted = currentStepIndex > idx;
                const isCurrent = currentStepIndex === idx;
                const isPending = currentStepIndex < idx;

                return (
                  <Card
                    key={step.id}
                    className={`
                      transition-all duration-300 border
                      ${isCompleted
                        ? 'bg-emerald-50/50 border-emerald-200/80 text-emerald-950 shadow-2xs'
                        : isCurrent
                          ? 'bg-white border-primary-500 shadow-md ring-4 ring-primary-100/60 scale-[1.01]'
                          : 'bg-white/60 border-slate-200/60 opacity-65'
                      }
                    `}
                  >
                    <CardContent className="p-4 flex items-start gap-3.5">
                      {/* State Icon Indicator */}
                      <div className="mt-0.5 shrink-0">
                        {isCompleted && (
                          <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                        {isCurrent && (
                          <div className="w-6 h-6 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-xs">
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          </div>
                        )}
                        {isPending && (
                          <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 border border-slate-200 flex items-center justify-center text-xs font-mono font-bold">
                            {idx + 1}
                          </div>
                        )}
                      </div>

                      {/* Step Text Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h5 className={`text-xs sm:text-sm font-bold ${isCurrent ? 'text-primary-700' : isCompleted ? 'text-emerald-950' : 'text-slate-700'}`}>
                            Step {step.id}: {step.title}
                          </h5>
                          <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                            isCompleted
                              ? 'bg-emerald-100 text-emerald-800'
                              : isCurrent
                                ? 'bg-primary-100 text-primary-800 animate-pulse'
                                : 'bg-slate-100 text-slate-400'
                          }`}>
                            {isCompleted ? 'Completed' : isCurrent ? 'Processing...' : 'Pending'}
                          </span>
                        </div>

                        <p className={`text-xs mt-0.5 ${isCurrent ? 'text-slate-800 font-medium' : 'text-slate-500'}`}>
                          {step.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------------- */}
      {/* STAGE 3: ERROR STATE                                                      */}
      {/* ------------------------------------------------------------------------- */}
      {processingState === 'error' && (
        <Card className="border-red-200 bg-red-50/20 shadow-md animate-in fade-in duration-300">
          <CardContent className="p-8 sm:p-12 text-center max-w-lg mx-auto flex flex-col items-center">
            <div className="w-16 h-16 rounded-3xl bg-red-100 text-red-600 flex items-center justify-center mb-4 border border-red-200 shadow-xs">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Analysis Failed
            </h3>

            <p className="text-sm text-slate-600 mt-2 leading-relaxed max-w-md">
              We couldn't finish analyzing this material. Please try again.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 mt-6 w-full sm:w-auto">
              <Button
                variant="primary"
                size="md"
                onClick={() => startSimulation(false)}
                iconLeft={RefreshCw}
                className="w-full sm:w-auto font-semibold text-xs sm:text-sm shadow-md shadow-primary-500/20"
              >
                Try Again
              </Button>

              <Link to="/materials" className="w-full sm:w-auto">
                <Button variant="outline" size="md" className="w-full sm:w-auto font-semibold text-xs sm:text-sm">
                  Back to My Materials
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ------------------------------------------------------------------------- */}
      {/* STAGE 4: COMPLETION STATE WITH 5 RESOURCE CARDS                            */}
      {/* ------------------------------------------------------------------------- */}
      {processingState === 'completed' && (
        <div className="flex flex-col gap-8 animate-in fade-in zoom-in-95 duration-300">
          {/* Success Banner */}
          <div className="bg-gradient-to-r from-primary-900 via-slate-900 to-secondary-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
            {/* Ambient Background Glow Orbs */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary-500/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-secondary-500/30 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 shrink-0">
                  <FileCheck2 className="w-7 h-7 stroke-[2.5]" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold mb-1.5 border border-emerald-400/30">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Analysis Complete!</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                    Your study material is ready for smart revision.
                  </h3>
                  <p className="text-sm text-slate-300 mt-1 max-w-xl">
                    Choose a revision tool below to start active recall, explore conceptual mind maps, or test your retention.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <Button
                  variant="glass"
                  size="md"
                  onClick={() => startSimulation(false)}
                  iconLeft={RefreshCw}
                  className="font-semibold text-xs text-white"
                  title="Re-run simulation"
                >
                  Re-analyze Material
                </Button>
                <Link to="/materials">
                  <Button
                    variant="white"
                    size="md"
                    className="font-semibold text-xs text-slate-900"
                  >
                    View All Materials
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* 5 Generated Resource Cards Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-base font-bold text-slate-900 tracking-tight">
                  Generated Revision Resources
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select any tool to start your active recall and visual study workflow.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {resourceCards.map((card) => {
                const Icon = card.icon;
                return (
                  <Card
                    key={card.id}
                    hoverEffect
                    className="flex flex-col justify-between border-slate-200/90 hover:border-primary-300 transition-all duration-200 group"
                  >
                    <CardContent className="p-6 flex flex-col h-full justify-between">
                      <div>
                        {/* Top: Icon & Ready Badge */}
                        <div className="flex items-center justify-between mb-4">
                          <div className={`p-3 rounded-2xl border ${card.color} shadow-2xs group-hover:scale-105 transition-transform`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                            <Check className="w-3 h-3 stroke-[2.5]" />
                            <span>{card.badge}</span>
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="text-lg font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                          {card.title}
                        </h4>

                        {/* Description */}
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          {card.description}
                        </p>

                        {/* Stats pill */}
                        <div className="mt-3">
                          <span className="text-[11px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                            {card.stats}
                          </span>
                        </div>
                      </div>

                      {/* Action Button with preserved navigation state */}
                      <div className="mt-6 pt-4 border-t border-slate-100">
                        <Link to={card.route} state={{ from: '/ai-analysis', material }} className="block w-full">
                          <Button
                            variant="primary"
                            size="md"
                            iconRight={ArrowRight}
                            className="w-full font-semibold justify-between shadow-xs text-xs sm:text-sm cursor-pointer"
                          >
                            <span>{card.buttonText}</span>
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
