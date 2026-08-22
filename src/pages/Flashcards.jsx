import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Layers,
  RotateCcw,
  Sparkles,
  Eye,
  EyeOff,
  Shuffle,
  ArrowRight,
  ArrowLeft,
  Share2,
  FileText,
  Award,
  Info,
  HelpCircle,
  Flame,
  Filter,
  XCircle
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

export default function Flashcards() {
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

  // View state: 'ready' | 'loading' | 'empty' | 'error'
  const [viewState, setViewState] = useState('ready');

  // Initial 15 Structured Operating Systems Flashcards (future AI output ready)
  const initialCards = useMemo(
    () => [
      {
        id: 'card-1',
        topic: 'Process Management',
        difficulty: 'Easy',
        question: 'What is a process in an operating system?',
        answer:
          'A process is a program in active execution. It consists of the program code (text section), current activity (program counter and processor registers), process stack (temporary data like function parameters and return addresses), and data section (global variables).',
      },
      {
        id: 'card-2',
        topic: 'Process Management',
        difficulty: 'Medium',
        question: 'What is the main difference between a process and a thread?',
        answer:
          'A process is an independent execution unit with its own private address space and resources. A thread is a lightweight unit of execution within a process that shares the same address space, code, and data segment with peer threads.',
      },
      {
        id: 'card-3',
        topic: 'CPU Scheduling',
        difficulty: 'Easy',
        question: 'What is the primary objective of CPU scheduling?',
        answer:
          'The goal of CPU scheduling is to maximize CPU utilization and system throughput while minimizing turnaround time, waiting time, and interactive response latency by selecting ready processes from the queue.',
      },
      {
        id: 'card-4',
        topic: 'CPU Scheduling',
        difficulty: 'Medium',
        question: 'What is the Convoy Effect in First-Come, First-Served (FCFS) scheduling?',
        answer:
          'The Convoy Effect occurs when a CPU-bound process with a long burst time holds the processor, causing all subsequent short I/O-bound processes to wait in the ready queue, resulting in poor CPU and device utilization.',
      },
      {
        id: 'card-5',
        topic: 'CPU Scheduling',
        difficulty: 'Medium',
        question: 'How does Round Robin (RR) CPU scheduling work?',
        answer:
          'Round Robin is a preemptive scheduling algorithm that assigns each ready process a fixed slice of time called a Time Quantum. If a process does not finish within its quantum, it is preempted and returned to the tail of the ready queue.',
      },
      {
        id: 'card-6',
        topic: 'CPU Scheduling',
        difficulty: 'Hard',
        question: 'What is Starvation in Priority Scheduling and how can it be resolved?',
        answer:
          'Starvation (indefinite blocking) occurs when low-priority processes wait indefinitely because higher-priority processes continuously arrive. It is resolved through Aging, which gradually increases the priority of processes that wait in the system for long periods.',
      },
      {
        id: 'card-7',
        topic: 'Process Management',
        difficulty: 'Medium',
        question: 'What is a context switch in an operating system?',
        answer:
          'A context switch is the mechanism of saving the state of the currently running process (to its PCB) and restoring the state of the next scheduled process so that execution can resume seamlessly. It represents pure kernel overhead.',
      },
      {
        id: 'card-8',
        topic: 'Memory Management',
        difficulty: 'Easy',
        question: 'What is paging and what type of fragmentation does it eliminate?',
        answer:
          'Paging is a memory-management scheme that divides physical memory into fixed-size frames and logical memory into pages of the same size. It completely eliminates external fragmentation by allowing non-contiguous physical memory allocation.',
      },
      {
        id: 'card-9',
        topic: 'Memory Management',
        difficulty: 'Hard',
        question: 'What is virtual memory and how does demand paging operate?',
        answer:
          'Virtual memory provides programs with the abstraction of a large address space exceeding physical RAM. In demand paging, pages are brought into physical memory only when accessed during execution rather than loaded all at once.',
      },
      {
        id: 'card-10',
        topic: 'Memory Management',
        difficulty: 'Hard',
        question: 'What is the objective of Page Replacement Algorithms and name two common types?',
        answer:
          'Page replacement algorithms select which memory page to swap out when a page fault occurs and no free frames exist. Common algorithms include Least Recently Used (LRU), First-In First-Out (FIFO), and Optimal (OPT).',
      },
      {
        id: 'card-11',
        topic: 'Memory Management',
        difficulty: 'Hard',
        question: 'What is Thrashing in an operating system?',
        answer:
          'Thrashing occurs when a computer spends more time swapping pages in and out of secondary storage than executing productive instructions. It happens when the total working set demand of active processes exceeds available physical memory.',
      },
      {
        id: 'card-12',
        topic: 'Deadlocks',
        difficulty: 'Hard',
        question: 'What are the 4 Coffman conditions required for a Deadlock to occur?',
        answer:
          'A deadlock requires 4 simultaneous conditions: 1) Mutual Exclusion (at least one non-shareable resource), 2) Hold and Wait, 3) No Preemption (resources cannot be forcibly taken), and 4) Circular Wait (a circular chain of waiting processes).',
      },
      {
        id: 'card-13',
        topic: 'Deadlocks',
        difficulty: 'Medium',
        question: 'How does Deadlock Prevention differ from Deadlock Avoidance?',
        answer:
          'Deadlock Prevention eliminates at least one of the four Coffman conditions beforehand by constraining request protocol. Deadlock Avoidance dynamically inspects resource allocation states to ensure the system never enters an unsafe state.',
      },
      {
        id: 'card-14',
        topic: 'Deadlocks',
        difficulty: 'Hard',
        question: 'What is Banker\'s Algorithm used for in deadlock handling?',
        answer:
          'Banker\'s Algorithm is a deadlock avoidance algorithm that tests prospective resource allocations by evaluating available, maximum, and allocated resources to ensure that at least one safe execution sequence exists for all processes.',
      },
      {
        id: 'card-15',
        topic: 'Process Synchronization',
        difficulty: 'Medium',
        question: 'What is a race condition and how do semaphores prevent it?',
        answer:
          'A race condition occurs when multiple processes access and manipulate shared data concurrently, and the final outcome depends on execution timing. Semaphores provide atomic wait() and signal() primitives to enforce mutual exclusion inside critical sections.',
      },
    ],
    []
  );

  // Deck state
  const [deck, setDeck] = useState(initialCards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [ratings, setRatings] = useState({}); // { [cardId]: 'easy' | 'medium' | 'hard' }
  const [isSessionComplete, setIsSessionComplete] = useState(false);
  const [selectedDifficultyFilter, setSelectedDifficultyFilter] = useState('All'); // 'All' | 'Easy' | 'Medium' | 'Hard'
  const [isRestartModalOpen, setIsRestartModalOpen] = useState(false);
  const [isReviewingDifficult, setIsReviewingDifficult] = useState(false);

  // Active Filtered Deck
  const activeDeck = useMemo(() => {
    if (isReviewingDifficult) {
      return initialCards.filter((card) => ratings[card.id] === 'hard');
    }
    if (selectedDifficultyFilter === 'All') return deck;
    return deck.filter((card) => card.difficulty === selectedDifficultyFilter);
  }, [deck, initialCards, ratings, isReviewingDifficult, selectedDifficultyFilter]);

  const currentCard = activeDeck[currentIndex] || activeDeck[0];

  // Dynamic Session Statistics calculation
  const stats = useMemo(() => {
    const total = activeDeck.length;
    let easyCount = 0;
    let mediumCount = 0;
    let hardCount = 0;
    let reviewedCount = 0;

    activeDeck.forEach((card) => {
      const r = ratings[card.id];
      if (r === 'easy') {
        easyCount += 1;
        reviewedCount += 1;
      } else if (r === 'medium') {
        mediumCount += 1;
        reviewedCount += 1;
      } else if (r === 'hard') {
        hardCount += 1;
        reviewedCount += 1;
      }
    });

    const progressPct = total > 0 ? Math.round((reviewedCount / total) * 100) : 0;

    return {
      total,
      reviewed: reviewedCount,
      easy: easyCount,
      medium: mediumCount,
      hard: hardCount,
      progressPct,
    };
  }, [activeDeck, ratings]);

  // Handle Card Rating: 'easy' | 'medium' | 'hard'
  const handleRateCard = (ratingValue) => {
    if (!currentCard) return;
    setRatings((prev) => ({
      ...prev,
      [currentCard.id]: ratingValue,
    }));
    toast.info(`Marked as ${ratingValue.toUpperCase()}`);
  };

  // Next Card
  const handleNextCard = () => {
    if (currentIndex + 1 < activeDeck.length) {
      setCurrentIndex((prev) => prev + 1);
      setIsAnswerRevealed(false);
    } else {
      setIsSessionComplete(true);
      toast.success('Flashcard session complete! Check your scorecard.');
    }
  };

  // Previous Card
  const handlePrevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsAnswerRevealed(false);
    }
  };

  // Shuffle Deck
  const handleShuffle = () => {
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
    setIsAnswerRevealed(false);
    toast.info('Deck shuffled.');
  };

  // Restart Session Handler
  const handleConfirmRestart = () => {
    setDeck(initialCards);
    setCurrentIndex(0);
    setIsAnswerRevealed(false);
    setRatings({});
    setIsSessionComplete(false);
    setIsReviewingDifficult(false);
    setIsRestartModalOpen(false);
    toast.success('Session reset to start.');
  };

  // Filter Difficult Cards (Hard rating)
  const handleReviewDifficult = () => {
    const hardCards = initialCards.filter((card) => ratings[card.id] === 'hard');
    if (hardCards.length === 0) {
      toast.info('No cards marked as Hard! Great job.');
      return;
    }
    setIsReviewingDifficult(true);
    setCurrentIndex(0);
    setIsAnswerRevealed(false);
    setIsSessionComplete(false);
    toast.info(`Reviewing ${hardCards.length} difficult cards.`);
  };

  const handleBackToAllCards = () => {
    setIsReviewingDifficult(false);
    setCurrentIndex(0);
    setIsAnswerRevealed(false);
    setIsSessionComplete(false);
    toast.info('Returned to full flashcard deck.');
  };

  // Keyboard Shortcuts Support
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in an input/textarea
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setIsAnswerRevealed((prev) => !prev);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNextCard();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevCard();
      } else if (isAnswerRevealed) {
        if (e.key === '1') handleRateCard('hard');
        if (e.key === '2') handleRateCard('medium');
        if (e.key === '3') handleRateCard('easy');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

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
          title="Flashcards"
          description="Interactive flashcards generated from your study material."
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
              onClick={() => toast.info('Flashcard deck link copied!')}
              className="font-semibold text-xs cursor-pointer shadow-2xs"
            >
              Share Deck
            </Button>
          </div>
        </PageHeader>
      </div>

      {/* ========================================================================= */}
      {/* 2. SOURCE MATERIAL & SESSION SUMMARY CARD                                 */}
      {/* ========================================================================= */}
      <Card className="border-slate-200/80 bg-white shadow-xs">
        <CardContent className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-secondary-50 border border-secondary-100 text-secondary-600 flex items-center justify-center font-bold text-sm shadow-2xs shrink-0">
              <Layers className="w-5 h-5" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-secondary-50 text-secondary-700 border border-secondary-200">
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

          {/* Compact Session Summary Counters */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 flex-wrap">
            <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/70 text-center">
              <span className="text-xs font-mono font-extrabold text-slate-900 block">{stats.total}</span>
              <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Total Cards</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-100 text-center">
              <span className="text-xs font-mono font-extrabold text-emerald-700 block">{stats.easy}</span>
              <span className="text-[10px] text-emerald-600 font-medium uppercase tracking-wider">Easy</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-100 text-center">
              <span className="text-xs font-mono font-extrabold text-amber-700 block">{stats.medium}</span>
              <span className="text-[10px] text-amber-600 font-medium uppercase tracking-wider">Medium</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-100 text-center">
              <span className="text-xs font-mono font-extrabold text-rose-700 block">{stats.hard}</span>
              <span className="text-[10px] text-rose-600 font-medium uppercase tracking-wider">Hard</span>
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
          message="Preparing your flashcards..."
          description="Generating active-recall questions and answers from your study material."
          size="lg"
          className="my-8"
        />
      )}

      {viewState === 'empty' && (
        <EmptyState
          icon={Layers}
          title="No Flashcards Available"
          description="Analyze a study material to generate flashcards for revision."
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
              Unable to load flashcards
            </h3>
            <p className="text-xs text-slate-600 mt-1 mb-5">
              Something went wrong while preparing your flashcards.
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
      {/* 4. READY STATE: ACTIVE FLASHCARD SESSION / COMPLETION VIEW               */}
      {/* ========================================================================= */}
      {viewState === 'ready' && (
        <>
          {/* --------------------------------------------------------------------- */}
          {/* COMPLETION SCREEN (when all cards reviewed)                           */}
          {/* --------------------------------------------------------------------- */}
          {isSessionComplete ? (
            <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full animate-in fade-in zoom-in-95 duration-300">
              <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50/40 via-white to-primary-50/30 shadow-lg text-center p-6 sm:p-10">
                <CardContent className="flex flex-col items-center gap-5">
                  <div className="w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-600 border border-emerald-200 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <Award className="w-10 h-10 animate-bounce" />
                  </div>

                  <div>
                    <Badge variant="success" className="mb-2 text-xs">
                      Session Complete!
                    </Badge>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      Flashcard Session Complete!
                    </h2>
                    <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto leading-relaxed">
                      Great work. Review the cards you found difficult to strengthen your recall.
                    </p>
                  </div>

                  {/* Summary Scorecard Metrics */}
                  <div className="grid grid-cols-4 gap-3 w-full max-w-md my-2">
                    <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                      <span className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono block">
                        {stats.reviewed}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-slate-400">
                        Cards Reviewed
                      </span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 shadow-2xs">
                      <span className="text-xl sm:text-2xl font-extrabold text-emerald-700 font-mono block">
                        {stats.easy}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-emerald-700">
                        Easy
                      </span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 shadow-2xs">
                      <span className="text-xl sm:text-2xl font-extrabold text-amber-700 font-mono block">
                        {stats.medium}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-amber-700">
                        Medium
                      </span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-rose-50/80 border border-rose-200 shadow-2xs">
                      <span className="text-xl sm:text-2xl font-extrabold text-rose-700 font-mono block">
                        {stats.hard}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-rose-700">
                        Hard
                      </span>
                    </div>
                  </div>

                  {/* Completion Actions */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center mt-3">
                    {stats.hard > 0 ? (
                      <Button
                        variant="primary"
                        size="md"
                        iconLeft={Flame}
                        onClick={handleReviewDifficult}
                        className="w-full sm:w-auto font-bold shadow-md shadow-primary-500/20"
                      >
                        Review Difficult Cards ({stats.hard})
                      </Button>
                    ) : (
                      <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200">
                        🎉 Excellent! You marked every card as Easy or Medium.
                      </div>
                    )}

                    <Button
                      variant="outline"
                      size="md"
                      iconLeft={RotateCcw}
                      onClick={handleConfirmRestart}
                      className="w-full sm:w-auto font-semibold text-xs sm:text-sm"
                    >
                      Restart Session
                    </Button>

                    <Link to="/ai-analysis" className="w-full sm:w-auto">
                      <Button
                        variant="outline"
                        size="md"
                        iconLeft={ArrowLeft}
                        className="w-full sm:w-auto font-semibold text-xs sm:text-sm"
                      >
                        Back to AI Analysis
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            /* ----------------------------------------------------------------- */
            /* ACTIVE STUDY FLASHCARD WORKSPACE                                  */
            /* ----------------------------------------------------------------- */
            <div className="flex flex-col gap-5 max-w-2xl mx-auto w-full">
              {/* Difficult mode banner */}
              {isReviewingDifficult && (
                <div className="flex items-center justify-between p-3 px-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-rose-600" />
                    <span>Focus Mode: <strong>Reviewing {activeDeck.length} Difficult Cards</strong></span>
                  </div>
                  <button
                    type="button"
                    onClick={handleBackToAllCards}
                    className="font-bold text-rose-700 underline hover:text-rose-900 cursor-pointer"
                  >
                    Back to All Cards
                  </button>
                </div>
              )}

              {/* Difficulty Filter Bar & Deck Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
                {/* Difficulty Filter Pills */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1 mr-1">
                    <Filter className="w-3.5 h-3.5" />
                    <span>Filter:</span>
                  </span>
                  {['All', 'Easy', 'Medium', 'Hard'].map((filterName) => (
                    <button
                      key={filterName}
                      type="button"
                      disabled={isReviewingDifficult}
                      onClick={() => {
                        setSelectedDifficultyFilter(filterName);
                        setCurrentIndex(0);
                        setIsAnswerRevealed(false);
                      }}
                      className={`
                        px-2.5 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none
                        ${selectedDifficultyFilter === filterName && !isReviewingDifficult
                          ? 'bg-primary-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed'
                        }
                      `}
                    >
                      {filterName}
                    </button>
                  ))}
                </div>

                {/* Session Action Buttons */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconLeft={Shuffle}
                    onClick={handleShuffle}
                    className="text-xs font-semibold cursor-pointer"
                    title="Randomize card order"
                  >
                    Shuffle
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    iconLeft={RotateCcw}
                    onClick={() => setIsRestartModalOpen(true)}
                    className="text-xs font-semibold cursor-pointer"
                    title="Restart study session"
                  >
                    Restart
                  </Button>
                </div>
              </div>

              {/* Session Progress Header */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-900 font-bold">
                      Card {currentIndex + 1} of {activeDeck.length}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span>{stats.reviewed} of {activeDeck.length} rated</span>
                  </div>
                  <span className="font-mono text-primary-600 font-bold">
                    {stats.progressPct}% Complete
                  </span>
                </div>

                <ProgressBar
                  value={stats.reviewed}
                  max={activeDeck.length || 1}
                  variant="primary"
                  size="md"
                />
              </div>

              {/* ----------------------------------------------------------------- */}
              {/* CENTRAL ACTIVE FLASHCARD                                          */}
              {/* ----------------------------------------------------------------- */}
              {currentCard && (
                <Card className="border-slate-200/90 shadow-md bg-white overflow-hidden transition-all duration-300">
                  {/* Card Header: Topic & Difficulty */}
                  <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between gap-3 bg-slate-50/50">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-slate-600 bg-slate-200/70 px-2.5 py-1 rounded-lg">
                        Topic: {currentCard.topic}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          currentCard.difficulty === 'Easy'
                            ? 'success'
                            : currentCard.difficulty === 'Medium'
                              ? 'warning'
                              : 'danger'
                        }
                        outline
                        className="text-[10px] font-bold"
                      >
                        {currentCard.difficulty}
                      </Badge>

                      {ratings[currentCard.id] && (
                        <span
                          className={`
                            text-[10px] font-mono font-bold px-2 py-0.5 rounded-md uppercase
                            ${ratings[currentCard.id] === 'easy'
                              ? 'bg-emerald-100 text-emerald-800'
                              : ratings[currentCard.id] === 'medium'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-rose-100 text-rose-800'
                            }
                          `}
                        >
                          Rated: {ratings[currentCard.id]}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Body: Question & Answer States */}
                  <CardContent className="p-6 sm:p-8 flex flex-col justify-between min-h-[280px] gap-6">
                    {/* Question State */}
                    <div>
                      <div className="flex items-center gap-2 text-slate-400 mb-2">
                        <HelpCircle className="w-4 h-4 text-primary-500" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">
                          Question
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                        {currentCard.question}
                      </h3>
                    </div>

                    {/* Answer Reveal State */}
                    {isAnswerRevealed ? (
                      <div className="animate-in fade-in slide-in-from-bottom-3 duration-250 p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 shadow-md">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary-300 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-primary-400" />
                            <span>Detailed Answer</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => setIsAnswerRevealed(false)}
                            className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                          >
                            <EyeOff className="w-3.5 h-3.5" />
                            <span>Hide</span>
                          </button>
                        </div>
                        <p className="text-sm text-slate-100 leading-relaxed font-medium">
                          {currentCard.answer}
                        </p>
                      </div>
                    ) : (
                      /* Show Answer Action Button */
                      <div className="py-6 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-colors">
                        <Button
                          variant="primary"
                          size="md"
                          iconLeft={Eye}
                          onClick={() => setIsAnswerRevealed(true)}
                          className="font-bold shadow-md shadow-primary-500/20 text-xs sm:text-sm px-6 cursor-pointer"
                        >
                          Show Answer
                        </Button>
                        <span className="text-[11px] text-slate-400 mt-2">
                          Tip: Press Space or Enter to reveal
                        </span>
                      </div>
                    )}

                    {/* Self-Assessment Rating Buttons (Only shown after answer revealed) */}
                    {isAnswerRevealed && (
                      <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5 animate-in fade-in duration-200">
                        <span className="text-xs font-bold text-slate-700 text-center">
                          How well did you know this?
                        </span>
                        <div className="grid grid-cols-3 gap-2.5">
                          <button
                            type="button"
                            onClick={() => handleRateCard('hard')}
                            className={`
                              p-3 rounded-xl border text-center transition-all cursor-pointer select-none flex flex-col items-center gap-1
                              ${ratings[currentCard.id] === 'hard'
                                ? 'bg-rose-100 border-rose-400 text-rose-950 font-bold ring-2 ring-rose-300'
                                : 'bg-rose-50/70 border-rose-200 text-rose-900 hover:bg-rose-100'
                              }
                            `}
                          >
                            <span className="text-xs font-bold">Hard (1)</span>
                            <span className="text-[10px] text-rose-700 leading-tight">Didn't know it</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleRateCard('medium')}
                            className={`
                              p-3 rounded-xl border text-center transition-all cursor-pointer select-none flex flex-col items-center gap-1
                              ${ratings[currentCard.id] === 'medium'
                                ? 'bg-amber-100 border-amber-400 text-amber-950 font-bold ring-2 ring-amber-300'
                                : 'bg-amber-50/70 border-amber-200 text-amber-900 hover:bg-amber-100'
                              }
                            `}
                          >
                            <span className="text-xs font-bold">Medium (2)</span>
                            <span className="text-[10px] text-amber-700 leading-tight">Partly recalled</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleRateCard('easy')}
                            className={`
                              p-3 rounded-xl border text-center transition-all cursor-pointer select-none flex flex-col items-center gap-1
                              ${ratings[currentCard.id] === 'easy'
                                ? 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold ring-2 ring-emerald-300'
                                : 'bg-emerald-50/70 border-emerald-200 text-emerald-900 hover:bg-emerald-100'
                              }
                            `}
                          >
                            <span className="text-xs font-bold">Easy (3)</span>
                            <span className="text-[10px] text-emerald-700 leading-tight">Knew it well</span>
                          </button>
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
                      onClick={handlePrevCard}
                      disabled={currentIndex === 0}
                      className="font-semibold text-xs cursor-pointer disabled:opacity-40"
                    >
                      Previous
                    </Button>

                    <Button
                      variant="primary"
                      size="md"
                      iconRight={ArrowRight}
                      onClick={handleNextCard}
                      className="font-bold text-xs sm:text-sm px-6 cursor-pointer shadow-sm"
                    >
                      {currentIndex + 1 === activeDeck.length ? 'Finish Session' : 'Next Card'}
                    </Button>
                  </div>
                </Card>
              )}

              {/* Keyboard Navigation Cheatsheet */}
              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 select-none py-1">
                <span><kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 font-mono text-[10px]">Space</kbd> Flip</span>
                <span>•</span>
                <span><kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 font-mono text-[10px]">←</kbd> Prev</span>
                <span>•</span>
                <span><kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 font-mono text-[10px]">→</kbd> Next</span>
              </div>
            </div>
          )}

          {/* AI Disclaimer Footer Note */}
          <div className="p-4 rounded-2xl bg-slate-100/70 border border-slate-200/80 flex items-center gap-3 text-slate-500 text-xs max-w-2xl mx-auto w-full">
            <Info className="w-4 h-4 text-slate-400 shrink-0" />
            <p>
              <strong>AI-generated active recall deck:</strong> Review original notes to consolidate memory. Self-assessment ratings help prioritize future revision cycles.
            </p>
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* RESTART CONFIRMATION MODAL                                                */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isRestartModalOpen}
        onClose={() => setIsRestartModalOpen(false)}
        title="Restart this session?"
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsRestartModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              iconLeft={RotateCcw}
              onClick={handleConfirmRestart}
            >
              Restart
            </Button>
          </>
        }
      >
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 shrink-0">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm text-slate-700">
              Your current flashcard progress and ratings will be reset to the beginning.
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Do you want to continue?
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
