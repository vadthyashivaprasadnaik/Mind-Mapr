import React, { useState, useMemo } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  Award,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Filter,
  Flame,
  FileText,
  Share2,
  Info,
  Zap,
  Target,
  GraduationCap,
  Layers
} from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import BackButton from '../components/ui/BackButton';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';
import EmptyState from '../components/ui/EmptyState';
import LoadingState from '../components/ui/LoadingState';
import { useToast } from '../components/ui/Toast';

export default function QuizResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  // View state: 'ready' | 'loading' | 'empty' | 'error'
  const [viewState, setViewState] = useState('ready');

  // Answer review filter: 'all' | 'correct' | 'incorrect'
  const [reviewFilter, setReviewFilter] = useState('all');

  // Answer review expanded accordion
  const [isReviewOpen, setIsReviewOpen] = useState(true);

  // Default fallback data for direct visits
  const defaultQuestions = useMemo(
    () => [
      {
        id: 'q-1',
        topic: 'CPU Scheduling',
        difficulty: 'Easy',
        question: 'Which scheduling algorithm assigns each ready process a fixed slice of CPU time?',
        options: ['First-Come First-Served (FCFS)', 'Round Robin (RR)', 'Priority Scheduling', 'Shortest Job First (SJF)'],
        correctAnswer: 1,
        explanation: 'Round Robin is a preemptive scheduling algorithm that allocates a fixed time quantum to each process and cycles through the ready queue.',
      },
      {
        id: 'q-2',
        topic: 'Process Management',
        difficulty: 'Medium',
        question: 'What kernel data structure stores the execution state, program counter, and CPU registers of an active process?',
        options: ['Translation Lookaside Buffer (TLB)', 'Process Control Block (PCB)', 'File Allocation Table (FAT)', 'Interrupt Vector Table (IVT)'],
        correctAnswer: 1,
        explanation: 'The Process Control Block (PCB) holds all crucial metadata needed by the OS to manage and context-switch an active process.',
      },
      {
        id: 'q-3',
        topic: 'Memory Management',
        difficulty: 'Easy',
        question: 'What type of memory fragmentation is completely eliminated by Paging?',
        options: ['Internal Fragmentation', 'External Fragmentation', 'Segment Fragmentation', 'Data Fragmentation'],
        correctAnswer: 1,
        explanation: 'Paging divides physical memory into fixed-size frames and logical memory into pages, allowing non-contiguous allocation and completely eliminating external fragmentation.',
      },
      {
        id: 'q-4',
        topic: 'Deadlocks',
        difficulty: 'Hard',
        question: 'Which of the following is NOT one of the four Coffman conditions required for a Deadlock to occur?',
        options: ['Mutual Exclusion', 'Hold and Wait', 'Preemption Allowed', 'Circular Wait'],
        correctAnswer: 2,
        explanation: 'No Preemption is required for deadlock. If preemption is allowed (resources can be forcefully reclaimed), a deadlock cannot occur.',
      },
      {
        id: 'q-5',
        topic: 'CPU Scheduling',
        difficulty: 'Medium',
        question: 'In Priority Scheduling, how is the problem of Starvation (indefinite blocking of low-priority processes) typically resolved?',
        options: ['Increasing time quantum', 'Aging technique', 'Banker\'s Algorithm', 'Belady\'s Anomaly'],
        correctAnswer: 1,
        explanation: 'Aging gradually increases the priority rank of processes waiting in the ready queue over time, guaranteeing they will eventually execute.',
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
        explanation: 'Thrashing occurs when the total working set demand of active processes exceeds physical RAM, causing continuous page faults and heavy disk I/O.',
      },
      {
        id: 'q-7',
        topic: 'Deadlocks',
        difficulty: 'Hard',
        question: 'What is the primary purpose of the Banker\'s Algorithm?',
        options: ['Deadlock Detection', 'Deadlock Prevention', 'Deadlock Avoidance', 'CPU Time Allocation'],
        correctAnswer: 2,
        explanation: 'Banker\'s Algorithm is a Deadlock Avoidance algorithm that tests prospective resource requests to ensure the system always transitions between safe states.',
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
        explanation: 'Threads within a process share the same virtual address space, data segment, and open files, enabling lightweight context switching.',
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
        explanation: 'A race condition occurs when multiple threads access shared mutable data concurrently without synchronization, and the output depends on thread interleaving.',
      },
      {
        id: 'q-10',
        topic: 'File Systems',
        difficulty: 'Medium',
        question: 'Which file allocation method brings all disk block pointers together into an index block for direct file access?',
        options: ['Contiguous Allocation', 'Linked Allocation', 'Indexed Allocation (Inodes)', 'Sequential Allocation'],
        correctAnswer: 2,
        explanation: 'Indexed allocation stores all block pointers in a centralized index block (such as UNIX Inodes), allowing direct random access without external fragmentation.',
      },
    ],
    []
  );

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

  // Extract router state or use robust default attempt data
  const passedState = location.state;

  const material = passedState?.material || defaultMaterial;
  const questionsList = passedState?.questions || defaultQuestions;
  const timeSpent = passedState?.timeSpent || '2m 45s';

  // Answer history (map of question index -> answer details)
  const answersHistory = useMemo(() => {
    if (passedState?.answerHistory && Object.keys(passedState.answerHistory).length > 0) {
      return passedState.answerHistory;
    }
    // Default mock history: 8 correct, 2 incorrect (Q4 and Q6)
    const mock = {};
    questionsList.forEach((q, idx) => {
      const isWrong = idx === 3 || idx === 5; // Q4 and Q6 wrong
      const selected = isWrong ? (q.correctAnswer + 1) % 4 : q.correctAnswer;
      mock[idx] = {
        selectedOption: selected,
        isSubmitted: true,
        isCorrect: !isWrong,
        topic: q.topic,
        difficulty: q.difficulty,
      };
    });
    return mock;
  }, [passedState?.answerHistory, questionsList]);

  // Calculations
  const calculations = useMemo(() => {
    let correct = 0;
    let incorrect = 0;
    const topicMap = {};
    const difficultyMap = {
      Easy: { total: 0, correct: 0 },
      Medium: { total: 0, correct: 0 },
      Hard: { total: 0, correct: 0 },
    };

    questionsList.forEach((q, idx) => {
      const history = answersHistory[idx];
      const isCorrect = history?.isCorrect || false;

      if (isCorrect) correct += 1;
      else incorrect += 1;

      // Topic grouping
      if (!topicMap[q.topic]) {
        topicMap[q.topic] = { total: 0, correct: 0 };
      }
      topicMap[q.topic].total += 1;
      if (isCorrect) topicMap[q.topic].correct += 1;

      // Difficulty grouping
      if (difficultyMap[q.difficulty]) {
        difficultyMap[q.difficulty].total += 1;
        if (isCorrect) difficultyMap[q.difficulty].correct += 1;
      }
    });

    const total = questionsList.length || 1;
    const scorePct = Math.round((correct / total) * 100);

    // Topic list with calculated percentage & status
    const topicList = Object.entries(topicMap).map(([name, data]) => {
      const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
      let status = 'Needs Attention';
      let statusVariant = 'danger';

      if (pct >= 90) {
        status = 'Strong';
        statusVariant = 'success';
      } else if (pct >= 75) {
        status = 'Good';
        statusVariant = 'primary';
      } else if (pct >= 50) {
        status = 'Needs Review';
        statusVariant = 'warning';
      }

      return {
        name,
        total: data.total,
        correct: data.correct,
        pct,
        status,
        statusVariant,
      };
    });

    // Sort topics: weak topics (<75%) sorted from lowest to highest
    const weakTopics = topicList
      .filter((t) => t.pct < 75)
      .sort((a, b) => a.pct - b.pct);

    // Strong topics (>=90%)
    const strongTopics = topicList
      .filter((t) => t.pct >= 90)
      .sort((a, b) => b.pct - a.pct);

    return {
      total,
      correct,
      incorrect,
      scorePct,
      topicList,
      weakTopics,
      strongTopics,
      difficultyMap,
    };
  }, [questionsList, answersHistory]);

  // Performance Message based on Score %
  const performanceMessage = useMemo(() => {
    const s = calculations.scorePct;
    if (s >= 90) {
      return 'Excellent work! You have a strong understanding of this material.';
    }
    if (s >= 75) {
      return 'Great job! You understand most of the material, with a few areas worth revising.';
    }
    if (s >= 50) {
      return 'Good effort! Review your weaker topics and try the quiz again.';
    }
    return 'Keep practicing. Focus on the weaker topics before attempting the quiz again.';
  }, [calculations.scorePct]);

  // Filtered Questions for Answer Review
  const filteredQuestions = useMemo(() => {
    return questionsList
      .map((q, idx) => ({
        ...q,
        idx,
        userAnswer: answersHistory[idx]?.selectedOption,
        isCorrect: answersHistory[idx]?.isCorrect,
      }))
      .filter((item) => {
        if (reviewFilter === 'correct') return item.isCorrect;
        if (reviewFilter === 'incorrect') return !item.isCorrect;
        return true;
      });
  }, [questionsList, answersHistory, reviewFilter]);

  // Retake Quiz Handler
  const handleRetakeQuiz = () => {
    navigate('/quiz', {
      state: {
        from: location.state?.previousFrom || '/ai-analysis',
        material,
      },
    });
  };

  return (
    <div className="flex flex-col gap-6 pb-16">
      {/* ========================================================================= */}
      {/* 1. BREADCRUMB, BACK BUTTON & HEADER                                       */}
      {/* ========================================================================= */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <BackButton label="Back to Quiz" fallback="/quiz" to="/quiz" />

          {/* Dev State Switcher (for automated/manual testing of states) */}
          <div className="flex items-center gap-1 text-[11px] text-slate-400 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <span className="px-1.5 font-mono text-[10px] uppercase font-bold text-slate-500">Preview:</span>
            <button
              type="button"
              onClick={() => setViewState('ready')}
              className={`px-2 py-0.5 rounded-lg font-medium cursor-pointer transition-colors ${
                viewState === 'ready' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'hover:text-slate-700'
              }`}
            >
              Ready
            </button>
            <button
              type="button"
              onClick={() => setViewState('loading')}
              className={`px-2 py-0.5 rounded-lg font-medium cursor-pointer transition-colors ${
                viewState === 'loading' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'hover:text-slate-700'
              }`}
            >
              Loading
            </button>
            <button
              type="button"
              onClick={() => setViewState('empty')}
              className={`px-2 py-0.5 rounded-lg font-medium cursor-pointer transition-colors ${
                viewState === 'empty' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'hover:text-slate-700'
              }`}
            >
              Empty
            </button>
            <button
              type="button"
              onClick={() => setViewState('error')}
              className={`px-2 py-0.5 rounded-lg font-medium cursor-pointer transition-colors ${
                viewState === 'error' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'hover:text-slate-700'
              }`}
            >
              Error
            </button>
          </div>
        </div>

        <PageHeader
          title="Quiz Results"
          description="Review your performance and identify where to focus your revision."
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
              onClick={() => toast.info('Scorecard copied to clipboard!')}
              className="font-semibold text-xs cursor-pointer shadow-2xs"
            >
              Share Results
            </Button>
          </div>
        </PageHeader>
      </div>

      {/* ========================================================================= */}
      {/* 2. SOURCE MATERIAL CONTEXT CARD                                           */}
      {/* ========================================================================= */}
      <Card className="border-slate-200/80 bg-white shadow-xs">
        <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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

          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            <span className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
              Adaptive Practice Quiz
            </span>
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
          message="Analyzing your performance..."
          description="Evaluating topic retention and structuring revision priorities."
          size="lg"
          className="my-8"
        />
      )}

      {viewState === 'empty' && (
        <EmptyState
          icon={Award}
          title="Quiz Result Unavailable"
          description="Complete a practice quiz to view your performance analysis."
          actionLabel="Start Quiz"
          onActionClick={() => navigate('/quiz')}
          actionIcon={ArrowRight}
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
              Unable to calculate results
            </h3>
            <p className="text-xs text-slate-600 mt-1 mb-5">
              Something went wrong while preparing your performance analysis.
            </p>
            <Button
              variant="primary"
              size="sm"
              iconLeft={RefreshCw}
              onClick={() => setViewState('ready')}
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      {/* ========================================================================= */}
      {/* 4. READY STATE: FULL RESULTS & PERFORMANCE ANALYSIS                       */}
      {/* ========================================================================= */}
      {viewState === 'ready' && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-200">
          {/* ------------------------------------------------------------------- */}
          {/* OVERALL RESULT HERO CARD                                            */}
          {/* ------------------------------------------------------------------- */}
          <Card className="border-slate-200 shadow-md bg-gradient-to-br from-white via-slate-50/40 to-primary-50/20 overflow-hidden">
            <CardContent className="p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5 text-center md:text-left flex-col md:flex-row">
                <div
                  className={`
                    w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center shrink-0 border-2 shadow-lg
                    ${calculations.scorePct >= 75
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-200 shadow-emerald-500/20'
                      : 'bg-amber-50 text-amber-600 border-amber-200 shadow-amber-500/20'
                    }
                  `}
                >
                  <Award className="w-10 h-10 sm:w-12 sm:h-12 animate-bounce" />
                </div>

                <div>
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                    <Badge
                      variant={calculations.scorePct >= 75 ? 'success' : 'warning'}
                      className="text-xs font-bold"
                    >
                      Quiz Complete!
                    </Badge>
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{timeSpent}</span>
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono tracking-tight">
                    {calculations.scorePct}%
                  </h2>

                  <p className="text-sm font-bold text-slate-700 mt-0.5">
                    {calculations.correct} / {calculations.total} Questions Correct
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-lg leading-relaxed">
                    {performanceMessage}
                  </p>
                </div>
              </div>

              {/* Action Buttons in Hero */}
              <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto shrink-0">
                <Button
                  variant="primary"
                  size="md"
                  iconLeft={RefreshCw}
                  onClick={handleRetakeQuiz}
                  className="w-full justify-center font-bold text-xs sm:text-sm shadow-md shadow-primary-500/20"
                >
                  Retake Quiz
                </Button>

                <Link to="/important-topics" className="w-full">
                  <Button
                    variant="outline"
                    size="md"
                    iconLeft={Target}
                    className="w-full justify-center font-semibold text-xs sm:text-sm"
                  >
                    Important Topics
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* ------------------------------------------------------------------- */}
          {/* SCORE SUMMARY METRICS ROW & VISUAL BAR                              */}
          {/* ------------------------------------------------------------------- */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-slate-200 bg-white p-4 shadow-2xs">
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                Total Questions
              </span>
              <span className="text-2xl font-extrabold text-slate-900 font-mono">
                {calculations.total}
              </span>
            </Card>

            <Card className="border-emerald-200 bg-emerald-50/40 p-4 shadow-2xs">
              <span className="text-[11px] text-emerald-800 font-bold uppercase tracking-wider block mb-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Correct</span>
              </span>
              <span className="text-2xl font-extrabold text-emerald-700 font-mono">
                {calculations.correct}
              </span>
            </Card>

            <Card className="border-rose-200 bg-rose-50/40 p-4 shadow-2xs">
              <span className="text-[11px] text-rose-800 font-bold uppercase tracking-wider block mb-1 flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5 text-rose-600" />
                <span>Incorrect</span>
              </span>
              <span className="text-2xl font-extrabold text-rose-700 font-mono">
                {calculations.incorrect}
              </span>
            </Card>

            <Card className="border-primary-200 bg-primary-50/40 p-4 shadow-2xs">
              <span className="text-[11px] text-primary-800 font-bold uppercase tracking-wider block mb-1 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-primary-600" />
                <span>Accuracy Score</span>
              </span>
              <span className="text-2xl font-extrabold text-primary-700 font-mono">
                {calculations.scorePct}%
              </span>
            </Card>
          </div>

          {/* Correct / Incorrect Segmented Visualizer */}
          <Card className="border-slate-200 bg-white p-4 shadow-2xs">
            <CardContent className="p-0 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-emerald-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>Correct: {calculations.correct} ({calculations.scorePct}%)</span>
                </span>
                <span className="flex items-center gap-1.5 text-rose-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span>Incorrect: {calculations.incorrect} ({100 - calculations.scorePct}%)</span>
                </span>
              </div>

              {/* Segmented Bar */}
              <div className="w-full h-3 rounded-full bg-slate-100 flex overflow-hidden border border-slate-200">
                <div
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${calculations.scorePct}%` }}
                />
                <div
                  className="bg-rose-400 h-full transition-all duration-300"
                  style={{ width: `${100 - calculations.scorePct}%` }}
                />
              </div>
            </CardContent>
          </Card>

          {/* ------------------------------------------------------------------- */}
          {/* TOPIC PERFORMANCE & DIFFICULTY BREAKDOWN (2 Columns)                */}
          {/* ------------------------------------------------------------------- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* TOPIC PERFORMANCE (7 Columns) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <Card className="border-slate-200 shadow-sm h-full">
                <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-primary-600" />
                      <span>Topic Performance</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Understanding by syllabus unit based on your quiz answers.
                    </p>
                  </div>
                </CardHeader>

                <CardContent className="p-4 sm:p-5 flex flex-col gap-4">
                  {calculations.topicList.map((topic, idx) => (
                    <div key={idx} className="flex flex-col gap-1.5 p-3 rounded-xl bg-slate-50/70 border border-slate-200/70">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800">
                          {topic.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-slate-500 font-medium text-[11px]">
                            {topic.correct} / {topic.total} ({topic.pct}%)
                          </span>
                          <Badge variant={topic.statusVariant} className="text-[10px]">
                            {topic.status}
                          </Badge>
                        </div>
                      </div>

                      <ProgressBar
                        value={topic.correct}
                        max={topic.total}
                        variant={
                          topic.pct >= 75
                            ? 'success'
                            : topic.pct >= 50
                              ? 'warning'
                              : 'danger'
                        }
                        size="sm"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* DIFFICULTY BREAKDOWN & STRONG TOPICS (5 Columns) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {/* Difficulty Breakdown */}
              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary-600" />
                    <span>Difficulty Breakdown</span>
                  </h3>
                </CardHeader>

                <CardContent className="p-4 flex flex-col gap-3">
                  {Object.entries(calculations.difficultyMap).map(([diffName, data]) => {
                    const diffPct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;

                    return (
                      <div key={diffName} className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              diffName === 'Easy'
                                ? 'success'
                                : diffName === 'Medium'
                                  ? 'warning'
                                  : 'danger'
                            }
                            outline
                            className="text-[10px] font-bold"
                          >
                            {diffName}
                          </Badge>
                          <span className="text-slate-500 font-medium text-[11px]">
                            {data.total} Questions
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-800">
                            {data.correct} / {data.total}
                          </span>
                          <span
                            className={`
                              font-mono font-bold text-xs px-2 py-0.5 rounded-md
                              ${diffPct >= 75
                                ? 'bg-emerald-100 text-emerald-800'
                                : diffPct >= 50
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-rose-100 text-rose-800'
                              }
                            `}
                          >
                            {diffPct}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Strong Topics Card */}
              <Card className="border-emerald-200 bg-emerald-50/20 shadow-sm">
                <CardHeader className="pb-2 border-b border-emerald-100/60">
                  <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Strong Topics (90%+)</span>
                  </h4>
                </CardHeader>

                <CardContent className="p-4">
                  {calculations.strongTopics.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {calculations.strongTopics.map((t, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-1.5 rounded-xl bg-white border border-emerald-200 text-emerald-900 text-xs font-bold shadow-2xs flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{t.name}</span>
                          <span className="font-mono text-emerald-700">({t.pct}%)</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500">
                      Keep practicing to build stronger topic mastery.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* ------------------------------------------------------------------- */}
          {/* TOPICS TO REVIEW (WEAK TOPICS) & RECOMMENDED NEXT STEP              */}
          {/* ------------------------------------------------------------------- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Weak Topics Card */}
            <Card className="border-rose-200 bg-rose-50/20 shadow-sm">
              <CardHeader className="pb-3 border-b border-rose-100/80">
                <div className="flex items-center gap-2 text-rose-900">
                  <Flame className="w-4 h-4 text-rose-600" />
                  <h3 className="text-sm font-bold">Topics to Review (&lt; 75%)</h3>
                </div>
              </CardHeader>

              <CardContent className="p-4 sm:p-5 flex flex-col gap-2.5">
                {calculations.weakTopics.length > 0 ? (
                  calculations.weakTopics.map((wt, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white border border-rose-200 text-xs flex items-center justify-between shadow-2xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-extrabold text-[10px] flex items-center justify-center font-mono">
                          {idx + 1}
                        </span>
                        <span className="font-bold text-slate-900">{wt.name}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-rose-700">
                          {wt.pct}% ({wt.correct}/{wt.total})
                        </span>
                        <Badge variant="danger" className="text-[10px]">
                          {wt.status}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-xs text-slate-500">
                    <p className="font-bold text-emerald-800 mb-1">🎉 No major weak areas found</p>
                    <p>Great work! Your performance is strong across the tested topics.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recommended Next Step Card */}
            <Card className="border-primary-200 bg-primary-50/20 shadow-sm">
              <CardHeader className="pb-3 border-b border-primary-100/80">
                <div className="flex items-center gap-2 text-primary-950">
                  <Zap className="w-4 h-4 text-primary-600" />
                  <h3 className="text-sm font-bold">Recommended Next Step</h3>
                </div>
              </CardHeader>

              <CardContent className="p-4 sm:p-5 flex flex-col justify-between gap-4">
                <p className="text-xs text-slate-700 leading-relaxed">
                  {calculations.weakTopics.length > 0
                    ? `Based on your results, we recommend revising ${calculations.weakTopics.map((t) => t.name).join(' and ')} before attempting another quiz.`
                    : "You're performing well! Continue reinforcing your recall with flashcards or retake the quiz to cement your mastery."
                  }
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {calculations.weakTopics.length > 0 ? (
                    <Link to="/important-topics" className="w-full sm:w-auto">
                      <Button
                        variant="primary"
                        size="sm"
                        iconRight={ArrowRight}
                        className="w-full font-bold text-xs shadow-sm"
                      >
                        Review Important Topics
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Link to="/flashcards" className="w-full sm:w-auto">
                        <Button
                          variant="primary"
                          size="sm"
                          iconLeft={Layers}
                          className="w-full font-bold text-xs shadow-sm"
                        >
                          Practice Flashcards
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        iconLeft={RefreshCw}
                        onClick={handleRetakeQuiz}
                        className="w-full sm:w-auto font-semibold text-xs"
                      >
                        Retake Quiz
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ------------------------------------------------------------------- */}
          {/* REVIEW ANSWERS SECTION (Expandable & Filterable)                     */}
          {/* ------------------------------------------------------------------- */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsReviewOpen(!isReviewOpen)}
                  className="flex items-center gap-2 text-left cursor-pointer group"
                >
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                    Review Answers ({calculations.total} Questions)
                  </h3>
                  {isReviewOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>
              </div>

              {/* Filter Pills */}
              {isReviewOpen && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1 mr-1">
                    <Filter className="w-3.5 h-3.5" />
                    <span>Filter:</span>
                  </span>
                  {[
                    { id: 'all', label: `All (${calculations.total})` },
                    { id: 'correct', label: `Correct (${calculations.correct})` },
                    { id: 'incorrect', label: `Incorrect (${calculations.incorrect})` },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setReviewFilter(f.id)}
                      className={`
                        px-2.5 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none
                        ${reviewFilter === f.id
                          ? 'bg-primary-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }
                      `}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              )}
            </CardHeader>

            {isReviewOpen && (
              <CardContent className="p-4 sm:p-6 flex flex-col gap-4">
                {filteredQuestions.length > 0 ? (
                  filteredQuestions.map((q) => {
                    const isUserCorrect = q.isCorrect;
                    const selectedText =
                      q.userAnswer !== undefined && q.userAnswer !== null
                        ? q.options[q.userAnswer]
                        : 'No option chosen';
                    const correctText = q.options[q.correctAnswer];

                    return (
                      <div
                        key={q.id}
                        className={`
                          p-4 sm:p-5 rounded-2xl border flex flex-col gap-3 transition-all
                          ${isUserCorrect
                            ? 'bg-white border-slate-200'
                            : 'bg-rose-50/30 border-rose-200'
                          }
                        `}
                      >
                        {/* Question Top Strip */}
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-lg bg-slate-100 font-bold text-xs text-slate-700 flex items-center justify-center font-mono">
                              Q{q.idx + 1}
                            </span>
                            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                              {q.topic}
                            </span>
                            <Badge
                              variant={
                                q.difficulty === 'Easy'
                                  ? 'success'
                                  : q.difficulty === 'Medium'
                                    ? 'warning'
                                    : 'danger'
                              }
                              outline
                              className="text-[10px]"
                            >
                              {q.difficulty}
                            </Badge>
                          </div>

                          <Badge
                            variant={isUserCorrect ? 'success' : 'danger'}
                            className="gap-1 text-[11px]"
                          >
                            {isUserCorrect ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Correct</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3.5 h-3.5" />
                                <span>Incorrect</span>
                              </>
                            )}
                          </Badge>
                        </div>

                        {/* Question Text */}
                        <p className="text-sm font-bold text-slate-900 leading-snug">
                          {q.question}
                        </p>

                        {/* Selected vs Correct Answers */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                              Your Answer:
                            </span>
                            <span
                              className={`
                                font-semibold
                                ${isUserCorrect ? 'text-emerald-700' : 'text-rose-700'}
                              `}
                            >
                              {selectedText}
                            </span>
                          </div>

                          {!isUserCorrect && (
                            <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200">
                              <span className="text-[10px] uppercase font-bold text-emerald-700 block mb-0.5">
                                Correct Answer:
                              </span>
                              <span className="font-bold text-emerald-900">
                                {correctText}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Explanation */}
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs text-slate-700 leading-relaxed">
                          <span className="font-bold text-slate-900 block mb-0.5">
                            Explanation:
                          </span>
                          {q.explanation}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-xs text-slate-400">
                    {reviewFilter === 'incorrect' ? (
                      <div className="flex flex-col items-center gap-2 text-emerald-700">
                        <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                        <p className="font-bold text-sm">No incorrect answers!</p>
                        <p className="text-slate-500">Excellent! You answered every question correctly.</p>
                      </div>
                    ) : (
                      <p>No questions match the selected filter.</p>
                    )}
                  </div>
                )}
              </CardContent>
            )}
          </Card>

          {/* ------------------------------------------------------------------- */}
          {/* STUDY RECOMMENDATION SUMMARY FOOTER                                 */}
          {/* ------------------------------------------------------------------- */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-primary-50 to-indigo-50 border border-primary-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-primary-100 text-primary-700 shrink-0 mt-0.5">
                <Info className="w-4 h-4" />
              </div>
              <div className="text-xs text-slate-700 leading-relaxed">
                <span className="font-bold text-slate-900 block text-sm mb-0.5">
                  Suggested Revision Based on Quiz Performance
                </span>
                {calculations.weakTopics.length > 0 ? (
                  <p>
                    Spend more time reviewing <strong>{calculations.weakTopics.map((t) => t.name).join(' and ')}</strong> before taking the quiz again.
                  </p>
                ) : (
                  <p>
                    Strong overall mastery demonstrated. Proceed to flashcard revision or review additional exam topics.
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
              <Link to="/important-topics" className="w-full sm:w-auto">
                <Button variant="primary" size="sm" className="w-full font-bold text-xs shadow-sm">
                  View Important Topics
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
