import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  Info,
  LogOut,
  FileText,
  Share2
} from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import BackButton from '../components/ui/BackButton';
import Card, { CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';
import Modal from '../components/ui/Modal';
import EmptyState from '../components/ui/EmptyState';
import LoadingState from '../components/ui/LoadingState';
import { useToast } from '../components/ui/Toast';

export default function Quiz() {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

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

  // View state: 'ready' | 'loading' | 'empty' | 'error'
  const [viewState, setViewState] = useState('ready');

  // Quiz phase: 'intro' | 'active'
  const [quizPhase, setQuizPhase] = useState('intro');

  // 10 Structured Operating Systems Questions (future AI output ready)
  const questions = useMemo(
    () => [
      {
        id: 'q-1',
        topic: 'CPU Scheduling',
        difficulty: 'Easy',
        question: 'Which scheduling algorithm assigns each ready process a fixed slice of CPU time?',
        options: [
          'First-Come First-Served (FCFS)',
          'Round Robin (RR)',
          'Priority Scheduling',
          'Shortest Job First (SJF)',
        ],
        correctAnswer: 1,
        explanation:
          'Round Robin is a preemptive scheduling algorithm that allocates a fixed time quantum to each process and cycles through the ready queue.',
      },
      {
        id: 'q-2',
        topic: 'Process Management',
        difficulty: 'Medium',
        question:
          'What kernel data structure stores the execution state, program counter, and CPU registers of an active process?',
        options: [
          'Translation Lookaside Buffer (TLB)',
          'Process Control Block (PCB)',
          'File Allocation Table (FAT)',
          'Interrupt Vector Table (IVT)',
        ],
        correctAnswer: 1,
        explanation:
          'The Process Control Block (PCB) holds all crucial metadata needed by the OS to manage and context-switch an active process.',
      },
      {
        id: 'q-3',
        topic: 'Memory Management',
        difficulty: 'Easy',
        question: 'What type of memory fragmentation is completely eliminated by Paging?',
        options: [
          'Internal Fragmentation',
          'External Fragmentation',
          'Segment Fragmentation',
          'Data Fragmentation',
        ],
        correctAnswer: 1,
        explanation:
          'Paging divides physical memory into fixed-size frames and logical memory into pages, allowing non-contiguous allocation and completely eliminating external fragmentation.',
      },
      {
        id: 'q-4',
        topic: 'Deadlocks',
        difficulty: 'Hard',
        question:
          'Which of the following is NOT one of the four Coffman conditions required for a Deadlock to occur?',
        options: [
          'Mutual Exclusion',
          'Hold and Wait',
          'Preemption Allowed',
          'Circular Wait',
        ],
        correctAnswer: 2,
        explanation:
          'No Preemption is required for deadlock. If preemption is allowed (resources can be forcefully reclaimed), a deadlock cannot occur.',
      },
      {
        id: 'q-5',
        topic: 'CPU Scheduling',
        difficulty: 'Medium',
        question:
          'In Priority Scheduling, how is the problem of Starvation (indefinite blocking of low-priority processes) typically resolved?',
        options: [
          'Increasing time quantum',
          'Aging technique',
          'Banker\'s Algorithm',
          'Belady\'s Anomaly',
        ],
        correctAnswer: 1,
        explanation:
          'Aging gradually increases the priority rank of processes waiting in the ready queue over time, guaranteeing they will eventually execute.',
      },
      {
        id: 'q-6',
        topic: 'Virtual Memory',
        difficulty: 'Hard',
        question: 'What is Thrashing in an operating system?',
        options: [
          'A CPU scheduler deadlock condition',
          'A state where the system spends more time swapping pages than executing instructions',
          'A file system directory index corruption',
          'Hardware clock synchronization failure',
        ],
        correctAnswer: 1,
        explanation:
          'Thrashing occurs when the total working set demand of active processes exceeds physical RAM, causing continuous page faults and heavy disk I/O.',
      },
      {
        id: 'q-7',
        topic: 'Deadlocks',
        difficulty: 'Hard',
        question: 'What is the primary purpose of the Banker\'s Algorithm?',
        options: [
          'Deadlock Detection',
          'Deadlock Prevention',
          'Deadlock Avoidance',
          'CPU Time Allocation',
        ],
        correctAnswer: 2,
        explanation:
          'Banker\'s Algorithm is a Deadlock Avoidance algorithm that tests prospective resource requests to ensure the system always transitions between safe states.',
      },
      {
        id: 'q-8',
        topic: 'Process Management',
        difficulty: 'Easy',
        question: 'How do threads within the same process differ from independent processes?',
        options: [
          'Threads share address space and memory with sibling threads',
          'Threads cannot execute concurrently',
          'Threads have isolated virtual address spaces',
          'Threads require separate kernel PCBs',
        ],
        correctAnswer: 0,
        explanation:
          'Threads within a process share the same virtual address space, data segment, and open files, enabling lightweight context switching.',
      },
      {
        id: 'q-9',
        topic: 'Synchronization',
        difficulty: 'Medium',
        question: 'What is a Race Condition in concurrent programming?',
        options: [
          'Two CPUs competing for motherboard power',
          'A situation where execution outcome depends on non-deterministic thread timing',
          'A hardware bus communication failure',
          'When a process executes faster than its assigned time quantum',
        ],
        correctAnswer: 1,
        explanation:
          'A race condition occurs when multiple threads access shared mutable data concurrently without synchronization, and the output depends on thread interleaving.',
      },
      {
        id: 'q-10',
        topic: 'File Systems',
        difficulty: 'Medium',
        question:
          'Which file allocation method brings all disk block pointers together into an index block for direct file access?',
        options: [
          'Contiguous Allocation',
          'Linked Allocation',
          'Indexed Allocation (Inodes)',
          'Sequential Allocation',
        ],
        correctAnswer: 2,
        explanation:
          'Indexed allocation stores all block pointers in a centralized index block (such as UNIX Inodes), allowing direct random access without external fragmentation.',
      },
    ],
    []
  );

  // Active Quiz State
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null); // Option index for active question
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answersHistory, setAnswersHistory] = useState({}); // { [questionIndex]: { selectedOption, isSubmitted, isCorrect } }
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  // Timer State (10 minutes = 600s)
  const [timeLeft, setTimeLeft] = useState(600);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const currentQuestion = questions[currentIdx];

  // Finish Quiz and navigate to Quiz Result
  const handleFinishQuiz = useCallback(() => {
    setIsTimerRunning(false);

    // Calculate score and topic analytics
    let correctCount = 0;
    let incorrectCount = 0;
    const topicStats = {};

    questions.forEach((q, idx) => {
      const history = answersHistory[idx];
      const isCorrect = history?.isCorrect || false;

      if (history?.isSubmitted) {
        if (isCorrect) correctCount += 1;
        else incorrectCount += 1;
      }

      if (!topicStats[q.topic]) {
        topicStats[q.topic] = { total: 0, correct: 0 };
      }
      topicStats[q.topic].total += 1;
      if (isCorrect) {
        topicStats[q.topic].correct += 1;
      }
    });

    const total = questions.length;
    const pct = Math.round((correctCount / total) * 100);
    const timeSpentSeconds = 600 - timeLeft;
    const minutes = Math.floor(timeSpentSeconds / 60);
    const seconds = timeSpentSeconds % 60;
    const formattedTimeSpent = `${minutes}m ${seconds < 10 ? '0' : ''}${seconds}s`;

    toast.success('Quiz completed! Generating your assessment report.');

    navigate('/quiz-result', {
      state: {
        score: correctCount,
        total,
        correctAnswers: correctCount,
        incorrectAnswers: incorrectCount,
        scorePercentage: pct,
        answerHistory: answersHistory,
        topicPerformance: topicStats,
        timeSpent: formattedTimeSpent,
        questions,
        material,
        from: '/quiz',
        previousFrom: location.state?.from || '/ai-analysis',
      },
    });
  }, [answersHistory, location.state?.from, material, navigate, questions, timeLeft, toast]);

  // Timer Countdown Effect
  useEffect(() => {
    if (!isTimerRunning || quizPhase !== 'active') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          toast.warning('Time expired! Submitting your quiz.');
          handleFinishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning, quizPhase, handleFinishQuiz, toast]);

  // Start Quiz
  const handleStartQuiz = () => {
    setQuizPhase('active');
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setAnswersHistory({});
    setTimeLeft(600);
    setIsTimerRunning(true);
    toast.info('Quiz started! Good luck.');
  };

  // Select Option
  const handleSelectOption = (optIdx) => {
    if (isSubmitted) return; // Prevent change after submission
    setSelectedOption(optIdx);
  };

  // Submit Answer
  const handleSubmitAnswer = () => {
    if (selectedOption === null) {
      toast.error('Please select an option first.');
      return;
    }

    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    setIsSubmitted(true);

    setAnswersHistory((prev) => ({
      ...prev,
      [currentIdx]: {
        selectedOption,
        isSubmitted: true,
        isCorrect,
        topic: currentQuestion.topic,
        difficulty: currentQuestion.difficulty,
      },
    }));

    if (isCorrect) {
      toast.success('Correct answer!');
    } else {
      toast.info('Good attempt! Review the explanation.');
    }
  };

  // Move to Next Question
  const handleNextQuestion = () => {
    if (currentIdx + 1 < questions.length) {
      const nextIdx = currentIdx + 1;
      setCurrentIdx(nextIdx);

      // Restore answer state if previously answered
      const previousState = answersHistory[nextIdx];
      if (previousState) {
        setSelectedOption(previousState.selectedOption);
        setIsSubmitted(previousState.isSubmitted);
      } else {
        setSelectedOption(null);
        setIsSubmitted(false);
      }
    } else {
      handleFinishQuiz();
    }
  };

  // Move to Previous Question
  const handlePrevQuestion = () => {
    if (currentIdx > 0) {
      const prevIdx = currentIdx - 1;
      setCurrentIdx(prevIdx);

      // Restore answer state
      const previousState = answersHistory[prevIdx];
      if (previousState) {
        setSelectedOption(previousState.selectedOption);
        setIsSubmitted(previousState.isSubmitted);
      } else {
        setSelectedOption(null);
        setIsSubmitted(false);
      }
    }
  };

  // Exit Quiz handler
  const handleConfirmExit = () => {
    setIsExitModalOpen(false);
    setIsTimerRunning(false);
    navigate(location.state?.from || '/ai-analysis', {
      state: { material },
    });
  };

  // Format Time Remaining
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="flex flex-col gap-6 pb-16">
      {/* ========================================================================= */}
      {/* 1. BREADCRUMB, BACK BUTTON & HEADER                                       */}
      {/* ========================================================================= */}
      <div className="flex flex-col gap-3">
        <BackButton
          label="Back"
          fallback="/ai-analysis"
          to={location.state?.from || '/ai-analysis'}
        />

        <PageHeader
          title="Adaptive Quiz"
          description="Test your understanding and identify areas that need more revision."
        >
          <div className="flex flex-wrap items-center gap-2">
            <Link to="/summary">
              <Button
                variant="outline"
                size="sm"
                iconLeft={FileText}
                className="font-semibold text-xs cursor-pointer shadow-2xs"
              >
                View Summary
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              iconLeft={Share2}
              onClick={() => toast.info('Quiz link copied!')}
              className="font-semibold text-xs cursor-pointer shadow-2xs"
            >
              Share Quiz
            </Button>
          </div>
        </PageHeader>
      </div>

      {/* ========================================================================= */}
      {/* 2. SOURCE MATERIAL & QUIZ SUMMARY CARD                                    */}
      {/* ========================================================================= */}
      <Card className="border-slate-200/80 bg-white shadow-xs">
        <CardContent className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center font-bold text-sm shadow-2xs shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                  {material.fileType}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {material.fileSize} • {material.pagesLabel}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  {material.topic}
                </span>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-slate-900 truncate">
                {material.title}
              </h2>
            </div>
          </div>

          {/* Compact Quiz Overview Counters */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 flex-wrap">
            <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/70 text-center">
              <span className="text-xs font-mono font-extrabold text-slate-900 block">{questions.length}</span>
              <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Questions</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/70 text-center">
              <span className="text-xs font-mono font-extrabold text-primary-700 block">5</span>
              <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Topics</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/70 text-center">
              <span className="text-xs font-mono font-extrabold text-amber-700 block">10 Min</span>
              <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Timer</span>
            </div>
            <Badge variant="success" className="gap-1.5 px-3 py-1 text-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Generated</span>
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* ========================================================================= */}
      {/* 3. MULTI-STATE SUPPORT (LOADING | EMPTY | ERROR)                          */}
      {/* ========================================================================= */}
      {viewState === 'loading' && (
        <LoadingState
          message="Preparing your quiz..."
          description="Generating adaptive assessment questions from your study material."
          size="lg"
          className="my-8"
        />
      )}

      {viewState === 'empty' && (
        <EmptyState
          icon={GraduationCap}
          title="Quiz Not Available"
          description="Analyze a study material to generate a practice quiz."
          actionLabel="Go to My Materials"
          onActionClick={() => window.location.assign('/materials')}
          actionIcon={ArrowLeft}
          className="my-8"
        />
      )}

      {viewState === 'error' && (
        <Card className="border-red-200 bg-red-50/20 shadow-md my-6">
          <CardContent className="p-8 text-center max-w-md mx-auto flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-3">
              <XCircle className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Unable to load quiz
            </h3>
            <p className="text-xs text-slate-600 mt-1 mb-5">
              Something went wrong while preparing your quiz.
            </p>
            <Button
              variant="primary"
              size="sm"
              iconLeft={RotateCcw}
              onClick={() => setViewState('ready')}
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      {/* ========================================================================= */}
      {/* 4. READY STATE: INTRODUCTION OR ACTIVE QUIZ INTERFACE                     */}
      {/* ========================================================================= */}
      {viewState === 'ready' && (
        <>
          {quizPhase === 'intro' ? (
            /* ----------------------------------------------------------------- */
            /* QUIZ INTRODUCTION SCREEN                                          */
            /* ----------------------------------------------------------------- */
            <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full animate-in fade-in zoom-in-95 duration-250">
              <Card className="border-slate-200/90 shadow-md bg-white p-6 sm:p-10 text-center">
                <CardContent className="flex flex-col items-center gap-6">
                  <div className="w-20 h-20 rounded-3xl bg-primary-50 text-primary-600 border border-primary-100 flex items-center justify-center shadow-lg shadow-primary-500/10">
                    <GraduationCap className="w-10 h-10" />
                  </div>

                  <div>
                    <Badge variant="primary" className="mb-2 text-xs">
                      Active Assessment
                    </Badge>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      Ready to test your knowledge?
                    </h2>
                    <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
                      Answer questions based on your study material and discover which topics need more attention before exams.
                    </p>
                  </div>

                  {/* Information Breakdown Cards */}
                  <div className="grid grid-cols-3 gap-3 w-full max-w-md my-2">
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <span className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono block">
                        10
                      </span>
                      <span className="text-[10px] uppercase font-bold text-slate-400">
                        Questions
                      </span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <span className="text-xl sm:text-2xl font-extrabold text-primary-700 font-mono block">
                        5
                      </span>
                      <span className="text-[10px] uppercase font-bold text-slate-400">
                        Core Topics
                      </span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <span className="text-xl sm:text-2xl font-extrabold text-emerald-700 font-mono block">
                        Adaptive
                      </span>
                      <span className="text-[10px] uppercase font-bold text-slate-400">
                        Difficulty
                      </span>
                    </div>
                  </div>

                  {/* Start Actions */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center mt-2">
                    <Button
                      variant="primary"
                      size="lg"
                      iconRight={ArrowRight}
                      onClick={handleStartQuiz}
                      className="w-full sm:w-auto font-bold shadow-md shadow-primary-500/20 text-sm px-8"
                    >
                      Start Quiz
                    </Button>

                    <Link to={location.state?.from || '/ai-analysis'} className="w-full sm:w-auto">
                      <Button
                        variant="outline"
                        size="lg"
                        iconLeft={ArrowLeft}
                        className="w-full sm:w-auto font-semibold text-xs sm:text-sm"
                      >
                        Back to AI Analysis
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Instructions Note */}
              <div className="p-4 rounded-2xl bg-slate-100/70 border border-slate-200/80 flex items-center gap-3 text-slate-500 text-xs">
                <Info className="w-4 h-4 text-slate-400 shrink-0" />
                <p>
                  <strong>Assessment Note:</strong> Immediate explanations will be revealed after each submission to reinforce learning.
                </p>
              </div>
            </div>
          ) : (
            /* ----------------------------------------------------------------- */
            /* ACTIVE QUESTION INTERFACE                                         */
            /* ----------------------------------------------------------------- */
            <div className="flex flex-col gap-5 max-w-2xl mx-auto w-full animate-in fade-in duration-200">
              {/* Question Header: Progress, Timer, Exit */}
              <div className="flex items-center justify-between gap-3 bg-white p-3.5 px-4 rounded-2xl border border-slate-200 shadow-2xs">
                {/* Progress count */}
                <div className="flex items-center gap-2">
                  <span className="font-mono text-slate-900 font-extrabold text-sm">
                    Question {currentIdx + 1} of {questions.length}
                  </span>
                  <span className="text-slate-300">•</span>
                  <Badge variant="primary" outline className="text-[10px] font-bold">
                    {currentQuestion.topic}
                  </Badge>
                </div>

                {/* Timer & Exit Button */}
                <div className="flex items-center gap-3">
                  <div
                    className={`
                      flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-bold border
                      ${timeLeft < 120
                        ? 'bg-rose-50 border-rose-200 text-rose-700 animate-pulse'
                        : 'bg-slate-100 border-slate-200 text-slate-700'
                      }
                    `}
                    title="Remaining Time"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>{formatTime(timeLeft)}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsExitModalOpen(true)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Exit Quiz"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <ProgressBar
                value={currentIdx + 1}
                max={questions.length}
                variant="primary"
                size="md"
              />

              {/* --------------------------------------------------------------- */}
              {/* SINGLE QUESTION CARD                                            */}
              {/* --------------------------------------------------------------- */}
              <Card className="border-slate-200/90 shadow-md bg-white overflow-hidden transition-all duration-300">
                {/* Topic & Difficulty Header */}
                <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between gap-3 bg-slate-50/50">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-600 bg-slate-200/70 px-2.5 py-1 rounded-lg">
                      Topic: {currentQuestion.topic}
                    </span>
                  </div>

                  <Badge
                    variant={
                      currentQuestion.difficulty === 'Easy'
                        ? 'success'
                        : currentQuestion.difficulty === 'Medium'
                          ? 'warning'
                          : 'danger'
                    }
                    outline
                    className="text-[10px] font-bold"
                  >
                    {currentQuestion.difficulty}
                  </Badge>
                </div>

                <CardContent className="p-6 sm:p-8 flex flex-col gap-6">
                  {/* Question Text */}
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-xl bg-primary-50 border border-primary-100 text-primary-700 flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5">
                      Q{currentIdx + 1}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {currentQuestion.question}
                    </h3>
                  </div>

                  {/* 4 Selectable Options */}
                  <div className="flex flex-col gap-3">
                    {currentQuestion.options.map((optionText, optIdx) => {
                      const isSelected = selectedOption === optIdx;
                      const isCorrectAnswer = optIdx === currentQuestion.correctAnswer;
                      const isWrongSelected = isSubmitted && isSelected && !isCorrectAnswer;

                      // Visual states after submission
                      let optionStyle = 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50';
                      let letterStyle = 'bg-slate-100 text-slate-600 border-slate-200';

                      if (isSubmitted) {
                        if (isCorrectAnswer) {
                          optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-300 font-bold';
                          letterStyle = 'bg-emerald-600 text-white border-emerald-600';
                        } else if (isWrongSelected) {
                          optionStyle = 'border-rose-400 bg-rose-50 text-rose-950 ring-2 ring-rose-200';
                          letterStyle = 'bg-rose-600 text-white border-rose-600';
                        } else {
                          optionStyle = 'border-slate-100 bg-slate-50 text-slate-400 opacity-60';
                        }
                      } else if (isSelected) {
                        optionStyle = 'border-primary-600 bg-primary-50/70 text-primary-950 ring-2 ring-primary-200 font-bold shadow-xs';
                        letterStyle = 'bg-primary-600 text-white border-primary-600';
                      }

                      const optionLetters = ['A', 'B', 'C', 'D'];

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          disabled={isSubmitted}
                          onClick={() => handleSelectOption(optIdx)}
                          className={`
                            w-full p-3.5 sm:p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all duration-150
                            flex items-center justify-between gap-3 cursor-pointer select-none disabled:cursor-default
                            ${optionStyle}
                          `}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`
                                w-6 h-6 rounded-lg text-xs font-extrabold flex items-center justify-center border shrink-0 transition-colors
                                ${letterStyle}
                              `}
                            >
                              {optionLetters[optIdx]}
                            </span>
                            <span className="leading-relaxed">{optionText}</span>
                          </div>

                          {/* Post-submission icon indicator */}
                          {isSubmitted && isCorrectAnswer && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          )}
                          {isSubmitted && isWrongSelected && (
                            <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Post-Submission Feedback & Explanation Box */}
                  {isSubmitted && (
                    <div
                      className={`
                        p-5 rounded-2xl border animate-in fade-in slide-in-from-bottom-2 duration-200 flex flex-col gap-2.5
                        ${selectedOption === currentQuestion.correctAnswer
                          ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                          : 'bg-rose-50/80 border-rose-200 text-rose-950'
                        }
                      `}
                    >
                      <div className="flex items-center gap-2 font-bold text-sm">
                        {selectedOption === currentQuestion.correctAnswer ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span className="text-emerald-800">Correct!</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-rose-600" />
                            <span className="text-rose-800">Not quite</span>
                          </>
                        )}
                      </div>

                      {selectedOption !== currentQuestion.correctAnswer && (
                        <div className="text-xs font-semibold text-slate-800">
                          Correct Answer:{' '}
                          <strong className="text-emerald-700 font-bold">
                            {currentQuestion.options[currentQuestion.correctAnswer]}
                          </strong>
                        </div>
                      )}

                      <div className="text-xs text-slate-700 bg-white/80 p-3 rounded-xl border border-slate-200/60 leading-relaxed">
                        <span className="font-bold text-slate-900 block mb-1">
                          Explanation:
                        </span>
                        {currentQuestion.explanation}
                      </div>
                    </div>
                  )}
                </CardContent>

                {/* Card Navigation Footer */}
                <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
                  <Button
                    variant="outline"
                    size="md"
                    iconLeft={ArrowLeft}
                    onClick={handlePrevQuestion}
                    disabled={currentIdx === 0}
                    className="font-semibold text-xs cursor-pointer disabled:opacity-40"
                  >
                    Previous
                  </Button>

                  {!isSubmitted ? (
                    <Button
                      variant="primary"
                      size="md"
                      onClick={handleSubmitAnswer}
                      disabled={selectedOption === null}
                      className="font-bold text-xs sm:text-sm px-6 cursor-pointer shadow-sm disabled:opacity-40"
                    >
                      Submit Answer
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      size="md"
                      iconRight={ArrowRight}
                      onClick={handleNextQuestion}
                      className="font-bold text-xs sm:text-sm px-6 cursor-pointer shadow-sm"
                    >
                      {currentIdx + 1 === questions.length ? 'Finish Quiz' : 'Next Question'}
                    </Button>
                  )}
                </div>
              </Card>
            </div>
          )}

          {/* AI Disclaimer Footer Note */}
          <div className="p-4 rounded-2xl bg-slate-100/70 border border-slate-200/80 flex items-center gap-3 text-slate-500 text-xs max-w-2xl mx-auto w-full">
            <Info className="w-4 h-4 text-slate-400 shrink-0" />
            <p>
              <strong>AI-generated practice quiz:</strong> Questions verify syllabus retention. Detailed topic analytics will be generated on completion.
            </p>
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* EXIT QUIZ CONFIRMATION MODAL                                              */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isExitModalOpen}
        onClose={() => setIsExitModalOpen(false)}
        title="Exit this quiz?"
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExitModalOpen(false)}
            >
              Continue Quiz
            </Button>
            <Button
              variant="danger"
              size="sm"
              iconLeft={LogOut}
              onClick={handleConfirmExit}
            >
              Exit
            </Button>
          </>
        }
      >
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 shrink-0">
            <LogOut className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm text-slate-700">
              Your current quiz answers and timer progress will be lost.
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Do you want to return to AI Analysis?
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
