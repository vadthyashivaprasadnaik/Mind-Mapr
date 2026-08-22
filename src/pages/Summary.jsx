import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import {
  FileText,
  Copy,
  Printer,
  Sparkles,
  Share2,
  Search,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Zap,
  Database,
  Layers,
  Folder,
  AlertTriangle,
  Network,
  Cpu,
  CheckCircle2,
  Bookmark,
  Info,
  Check,
  RotateCcw,
  ArrowLeft,
  XCircle
} from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import BackButton from '../components/ui/BackButton';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import EmptyState from '../components/ui/EmptyState';
import LoadingState from '../components/ui/LoadingState';
import { useToast } from '../components/ui/Toast';

export default function Summary() {
  const toast = useToast();
  const location = useLocation();

  // Active Material (from route state or default realistic demo data)
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
  const [searchQuery, setSearchQuery] = useState('');
  const [readingProgress, setReadingProgress] = useState(0);

  // Accordion state for Topic-by-Topic summary (all expanded by default)
  const [expandedTopics, setExpandedTopics] = useState({
    t1: true,
    t2: true,
    t3: true,
    t4: false,
    t5: false,
    t6: false,
    t7: false,
  });

  // Track Reading Scroll Progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = Math.min(
          100,
          Math.max(0, Math.round((window.scrollY / totalHeight) * 100))
        );
        setReadingProgress(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Structured Summary Data Model (ready for future backend API response)
  const summaryData = useMemo(() => ({
    statistics: {
      keyTopicsCount: 7,
      importantPointsCount: 18,
      definitionsCount: 12,
      highPriorityCount: 5,
    },
    overview: {
      title: 'Quick Overview',
      content:
        'Operating systems manage computer hardware and provide essential services for application programs. They handle processes, memory, files, storage and system resources. The primary objective is to make the computer system convenient to use and execute user programs in an efficient, protected, and isolated environment.',
      keyTakeaways: [
        'Acts as the vital intermediary layer between user software and hardware resources.',
        'Provides hardware abstraction, concurrency management, and isolation barriers.',
        'Core architectural pillars include Process Management, Memory Hierarchies, Storage/File Systems, and I/O Protection.',
      ],
    },
    keyConcepts: [
      {
        id: 'c1',
        name: 'Process Management',
        explanation: 'Creation, scheduling, synchronization, and termination of executing programs.',
        priority: 'HIGH',
        tag: 'Core OS',
        icon: Cpu,
        color: 'text-blue-600 bg-blue-50 border-blue-100',
      },
      {
        id: 'c2',
        name: 'CPU Scheduling',
        explanation: 'Selecting which ready process gets CPU time using algorithms like FCFS, SJF, and Round Robin.',
        priority: 'HIGH',
        tag: 'Scheduling',
        icon: Zap,
        color: 'text-amber-600 bg-amber-50 border-amber-100',
      },
      {
        id: 'c3',
        name: 'Memory Management',
        explanation: 'Tracking and allocating physical memory addresses dynamically among active processes.',
        priority: 'HIGH',
        tag: 'Memory',
        icon: Database,
        color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      },
      {
        id: 'c4',
        name: 'Virtual Memory',
        explanation: 'Using secondary storage as an extension of main memory via demand paging and swapping.',
        priority: 'HIGH',
        tag: 'Paging',
        icon: Layers,
        color: 'text-primary-600 bg-primary-50 border-primary-100',
      },
      {
        id: 'c5',
        name: 'File Systems',
        explanation: 'Hierarchical organization, access control, metadata management, and persistent storage of files.',
        priority: 'MEDIUM',
        tag: 'Storage',
        icon: Folder,
        color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
      },
      {
        id: 'c6',
        name: 'Deadlocks',
        explanation: 'Handling conditions where processes wait indefinitely for resources held by one another.',
        priority: 'HIGH',
        tag: 'Concurrency',
        icon: AlertTriangle,
        color: 'text-rose-600 bg-rose-50 border-rose-100',
      },
      {
        id: 'c7',
        name: 'Process Synchronization',
        explanation: 'Coordinating concurrent processes using mutexes, semaphores, and critical sections.',
        priority: 'MEDIUM',
        tag: 'IPC',
        icon: Network,
        color: 'text-teal-600 bg-teal-50 border-teal-100',
      },
    ],
    importantPoints: [
      'A process is a program in execution containing program counter, stack, and data section.',
      'Threads share code and data segments within a process but maintain independent stack registers.',
      'CPU scheduling algorithms determine turnaround time, waiting time, and CPU throughput.',
      'Virtual memory allows programs to use more memory than physically available RAM through demand paging.',
      'Deadlocks occur when four conditions hold simultaneously: Mutual Exclusion, Hold & Wait, No Preemption, and Circular Wait.',
      'Semaphores and mutex locks solve race conditions in shared critical sections.',
      'Paging eliminates external fragmentation by allocating fixed-size physical frames.',
      'Thrashing occurs when the system spends more time paging than executing processes.',
      'File systems organize and manage stored data using inodes, directories, and file allocation tables.',
      'Context switching saves the state of the active process to PCB and loads the next scheduled process.',
      'Belady’s Anomaly can cause FIFO page replacement to produce more page faults with more memory frames.',
      'The Banker’s Algorithm is used for deadlock avoidance by verifying safe resource allocation states.',
    ],
    definitions: [
      {
        term: 'Process',
        definition: 'A program that is currently executing, including its program counter, registers, and memory variables.',
        category: 'Processes',
      },
      {
        term: 'Thread',
        definition: 'A lightweight unit of execution within a process that shares address space with sibling threads.',
        category: 'Concurrency',
      },
      {
        term: 'Deadlock',
        definition: 'A state where a set of processes are blocked because each is holding a resource and waiting for another.',
        category: 'Concurrency',
      },
      {
        term: 'Virtual Memory',
        definition: 'A memory-management technique that maps virtual addresses to physical addresses, providing an abstraction of larger space.',
        category: 'Memory',
      },
      {
        term: 'Context Switch',
        definition: 'The process of saving the execution context of a running thread/process and restoring another.',
        category: 'Processes',
      },
      {
        term: 'Semaphore',
        definition: 'A synchronization variable used to control access to common resources in concurrent programming.',
        category: 'Synchronization',
      },
      {
        term: 'Thrashing',
        definition: 'A condition where excessive page swapping prevents the CPU from performing productive execution.',
        category: 'Memory',
      },
      {
        term: 'Page Fault',
        definition: 'An interrupt raised when an executing program accesses a memory page not currently mapped in RAM.',
        category: 'Memory',
      },
    ],
    examFocus: {
      description: 'Suggested Revision Priority based on common examination weightings and conceptual complexity.',
      highPriority: [
        {
          title: 'CPU Scheduling Algorithms',
          notes: 'Know calculations for FCFS, SJF, SRTF, and Round Robin Gantt charts and average wait times.',
        },
        {
          title: 'Deadlock Characterization & Banker’s Algorithm',
          notes: '4 Coffman conditions and safe state calculation matrix with Available/Max/Need vectors.',
        },
        {
          title: 'Paging & Virtual Memory Calculations',
          notes: 'Logical to physical address translation, Page Fault handling overhead, and TLB hit ratios.',
        },
      ],
      mediumPriority: [
        {
          title: 'Process Synchronization & Classical Problems',
          notes: 'Producer-Consumer, Readers-Writers, and Dining Philosophers semaphore solutions.',
        },
        {
          title: 'File System Allocation Methods',
          notes: 'Contiguous, Linked, and Indexed allocation tradeoffs regarding disk seek and fragmentation.',
        },
      ],
    },
    topicSummaries: [
      {
        id: 't1',
        title: 'Process Management & Lifecycle',
        summary:
          'Processes transition through New, Ready, Running, Waiting, and Terminated states. The OS tracks state using Process Control Blocks (PCBs) containing PID, registers, priority, and accounting info.',
        points: [
          'Process states: New → Ready → Running → Terminated (or Waiting on I/O).',
          'Context switching overhead directly affects overall CPU throughput.',
          'Inter-Process Communication (IPC) is achieved via Shared Memory or Message Passing.',
        ],
      },
      {
        id: 't2',
        title: 'CPU Scheduling Algorithms',
        summary:
          'The CPU scheduler selects a process from the ready queue when the CPU becomes idle. Non-preemptive scheduling lets a process run until it terminates or yields; preemptive scheduling can interrupt execution.',
        points: [
          'First-Come First-Served (FCFS) suffers from the Convoy Effect.',
          'Shortest Job First (SJF) provides optimal minimum average waiting time.',
          'Round Robin (RR) allocates a fixed time quantum for fair interactive response.',
        ],
      },
      {
        id: 't3',
        title: 'Memory Management & Paging',
        summary:
          'Physical memory is divided into fixed-size frames, and logical memory is divided into pages of the same size. The Page Table translates logical addresses (page number + offset) into physical frame addresses.',
        points: [
          'Translation Lookaside Buffer (TLB) caches recent translations to speed up lookups.',
          'Paging eliminates external fragmentation but introduces minor internal fragmentation in the last page.',
          'Multi-level paging reduces page table memory footprint in 64-bit systems.',
        ],
      },
      {
        id: 't4',
        title: 'Virtual Memory & Page Replacement',
        summary:
          'Virtual memory separates user logical memory from physical storage. On a page fault, the OS brings the missing page from disk into RAM, replacing an existing page using replacement algorithms.',
        points: [
          'Demand paging loads pages into memory only when accessed.',
          'Least Recently Used (LRU) and Optimal (OPT) page replacement minimize fault rates.',
          'Working Set Model monitors process memory needs to prevent thrashing.',
        ],
      },
      {
        id: 't5',
        title: 'Deadlocks Prevention, Avoidance & Recovery',
        summary:
          'Deadlocks can be handled via Prevention (invalidating 1 of 4 conditions), Avoidance (Banker\'s algorithm safe states), or Detection and Recovery (terminating processes or preempting resources).',
        points: [
          '4 Coffman conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.',
          'Resource Allocation Graphs (RAG) detect cycles to identify potential deadlocks.',
          'Banker\'s algorithm tests if granting request maintains a safe execution sequence.',
        ],
      },
      {
        id: 't6',
        title: 'Process Synchronization & Critical Sections',
        summary:
          'Concurrent access to shared data may result in data inconsistency. Solutions to the Critical Section problem must satisfy Mutual Exclusion, Progress, and Bounded Waiting.',
        points: [
          'Critical Section holds shared code where race conditions can occur.',
          'Mutex provides binary locking; Semaphores provide counting and binary locks.',
          'Monitors provide high-level language-enforced synchronization constructs.',
        ],
      },
      {
        id: 't7',
        title: 'File Systems & Storage Management',
        summary:
          'File systems abstract secondary storage hardware into logical files and directory structures. Directory entries map file names to metadata structures (such as Inodes in UNIX).',
        points: [
          'File attributes include Name, Identifier, Type, Location, Size, and Protection.',
          'Indexed allocation brings all pointers together into an index block for direct access.',
          'Journaling file systems record transactions to prevent corruption after unexpected crashes.',
        ],
      },
    ],
  }), []);

  // Filtered Content based on Search Query
  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) {
      return {
        ...summaryData,
        hasMatches: true,
      };
    }

    const filteredOverview =
      summaryData.overview.content.toLowerCase().includes(q) ||
      summaryData.overview.keyTakeaways.some((t) => t.toLowerCase().includes(q))
        ? summaryData.overview
        : null;

    const filteredConcepts = summaryData.keyConcepts.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.explanation.toLowerCase().includes(q) ||
        c.tag.toLowerCase().includes(q)
    );

    const filteredPoints = summaryData.importantPoints.filter((p) =>
      p.toLowerCase().includes(q)
    );

    const filteredDefinitions = summaryData.definitions.filter(
      (d) =>
        d.term.toLowerCase().includes(q) ||
        d.definition.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q)
    );

    const filteredHighExam = summaryData.examFocus.highPriority.filter(
      (e) => e.title.toLowerCase().includes(q) || e.notes.toLowerCase().includes(q)
    );

    const filteredMedExam = summaryData.examFocus.mediumPriority.filter(
      (e) => e.title.toLowerCase().includes(q) || e.notes.toLowerCase().includes(q)
    );

    const filteredTopics = summaryData.topicSummaries.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.summary.toLowerCase().includes(q) ||
        t.points.some((pt) => pt.toLowerCase().includes(q))
    );

    const hasMatches = Boolean(
      filteredOverview ||
        filteredConcepts.length > 0 ||
        filteredPoints.length > 0 ||
        filteredDefinitions.length > 0 ||
        filteredHighExam.length > 0 ||
        filteredMedExam.length > 0 ||
        filteredTopics.length > 0
    );

    return {
      overview: filteredOverview,
      keyConcepts: filteredConcepts,
      importantPoints: filteredPoints,
      definitions: filteredDefinitions,
      examFocus: {
        ...summaryData.examFocus,
        highPriority: filteredHighExam,
        mediumPriority: filteredMedExam,
      },
      topicSummaries: filteredTopics,
      statistics: summaryData.statistics,
      hasMatches,
    };
  }, [summaryData, searchQuery]);

  // Accordion Toggle
  const toggleTopic = (id) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAllTopics = () => {
    const allExpanded = {};
    summaryData.topicSummaries.forEach((t) => {
      allExpanded[t.id] = true;
    });
    setExpandedTopics(allExpanded);
  };

  const collapseAllTopics = () => {
    const allCollapsed = {};
    summaryData.topicSummaries.forEach((t) => {
      allCollapsed[t.id] = false;
    });
    setExpandedTopics(allCollapsed);
  };

  // Copy Summary to Clipboard
  const handleCopySummary = async () => {
    try {
      const formattedText = `
# Smart Summary: ${material.title}
Source: ${material.title} (${material.fileType}, ${material.pagesLabel})

## Quick Overview
${summaryData.overview.content}

## Key Concepts
${summaryData.keyConcepts.map((c) => `- **${c.name}** [${c.priority}]: ${c.explanation}`).join('\n')}

## Important Revision Points
${summaryData.importantPoints.map((p) => `* ${p}`).join('\n')}

## Key Definitions
${summaryData.definitions.map((d) => `### ${d.term} (${d.category})\n${d.definition}`).join('\n\n')}

## Exam Focus (Suggested Revision Priority)
### High Priority
${summaryData.examFocus.highPriority.map((h) => `- **${h.title}**: ${h.notes}`).join('\n')}

### Medium Priority
${summaryData.examFocus.mediumPriority.map((m) => `- **${m.title}**: ${m.notes}`).join('\n')}

## Topic-by-Topic Summary
${summaryData.topicSummaries.map((t) => `### ${t.title}\n${t.summary}\n${t.points.map((pt) => `  * ${pt}`).join('\n')}`).join('\n\n')}

---
Generated by Mind Mapr AI Revision Engine.
`.trim();

      await navigator.clipboard.writeText(formattedText);
      toast.success('Summary copied to clipboard!');
    } catch {
      toast.error('Failed to copy to clipboard.');
    }
  };

  // Print Summary
  const handlePrintSummary = () => {
    window.print();
  };

  // Share Summary trigger
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Smart Summary: ${material.title}`,
        text: summaryData.overview.content,
        url: window.location.href,
      }).catch(() => {});
    } else {
      toast.info('Share link copied to clipboard.');
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-16 print:p-0 print:pb-0">
      {/* Top subtle reading progress line */}
      <div className="fixed top-16 left-0 sm:left-64 right-0 h-1 bg-slate-100 z-30 pointer-events-none print:hidden">
        <div
          className="h-full bg-gradient-to-r from-primary-500 via-indigo-500 to-emerald-500 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* ========================================================================= */}
      {/* 1. BREADCRUMB, BACK BUTTON & HEADER                                       */}
      {/* ========================================================================= */}
      <div className="flex flex-col gap-3 print:hidden relative z-10">
        <BackButton
          label="Back"
          fallback="/ai-analysis"
          to={location.state?.from || '/ai-analysis'}
        />

        <PageHeader
          title="Smart Summary"
          description="A concise, revision-focused summary of your study material."
        >
          <div className="flex flex-wrap items-center gap-2">
            {/* Reading Progress Pill */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
              <BookOpen className="w-3.5 h-3.5 text-primary-600" />
              <span>Reading: <strong className="font-mono text-slate-900">{readingProgress}%</strong></span>
            </span>

            <Button
              variant="outline"
              size="sm"
              iconLeft={Copy}
              onClick={handleCopySummary}
              className="font-semibold text-xs cursor-pointer shadow-2xs"
            >
              Copy Summary
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconLeft={Printer}
              onClick={handlePrintSummary}
              className="font-semibold text-xs cursor-pointer shadow-2xs"
            >
              Print Summary
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconLeft={Share2}
              onClick={handleShare}
              className="font-semibold text-xs cursor-pointer shadow-2xs"
            >
              Share
            </Button>
          </div>
        </PageHeader>
      </div>

      {/* ========================================================================= */}
      {/* 3. SOURCE MATERIAL & AI GENERATED METADATA CARD                           */}
      {/* ========================================================================= */}
      <Card className="border-slate-200/80 bg-white shadow-xs">
        <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-primary-50 border border-primary-100 text-primary-600 flex items-center justify-center font-bold text-sm shadow-2xs shrink-0">
              <FileText className="w-5 h-5" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-primary-50 text-primary-700 border border-primary-200">
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

          <div className="flex items-center gap-2 shrink-0">
            <Badge variant="success" className="gap-1.5 px-3 py-1 text-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Generated</span>
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* ========================================================================= */}
      {/* 4. SUMMARY STATISTICS BAR                                                 */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 print:grid-cols-4">
        <Card className="border-slate-200/80 bg-white shadow-2xs">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono">
                {summaryData.statistics.keyTopicsCount}
              </span>
              <span className="text-xs text-slate-500 font-medium block">
                Key Topics
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 bg-white shadow-2xs">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono">
                {summaryData.statistics.importantPointsCount}
              </span>
              <span className="text-xs text-slate-500 font-medium block">
                Important Points
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 bg-white shadow-2xs">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 shrink-0">
              <Bookmark className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono">
                {summaryData.statistics.definitionsCount}
              </span>
              <span className="text-xs text-slate-500 font-medium block">
                Definitions
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 bg-white shadow-2xs">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono">
                {summaryData.statistics.highPriorityCount}
              </span>
              <span className="text-xs text-slate-500 font-medium block">
                High-Priority Areas
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ========================================================================= */}
      {/* 5. SEARCH WITHIN SUMMARY                                                  */}
      {/* ========================================================================= */}
      <div className="print:hidden">
        <Input
          type="text"
          placeholder="Search this summary (e.g. CPU, Paging, Deadlock, Semaphore)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          iconLeft={Search}
          rightElement={
            searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded cursor-pointer transition-colors"
              >
                Clear
              </button>
            ) : null
          }
          className="max-w-xl"
        />
      </div>

      {/* ========================================================================= */}
      {/* 6. MAIN CONTENT STATES (READY | LOADING | EMPTY | ERROR)                  */}
      {/* ========================================================================= */}

      {/* STATE A: LOADING STATE */}
      {viewState === 'loading' && (
        <LoadingState
          message="Preparing your summary..."
          description="Synthesizing key topics, definitions, and exam focus points."
          size="lg"
          className="my-8"
        />
      )}

      {/* STATE B: EMPTY STATE */}
      {viewState === 'empty' && (
        <EmptyState
          icon={FileText}
          title="Summary Not Available"
          description="Analyze a study material to generate its smart summary."
          actionLabel="Go to My Materials"
          onActionClick={() => window.location.assign('/materials')}
          actionIcon={ArrowLeft}
          className="my-8"
        />
      )}

      {/* STATE C: ERROR STATE */}
      {viewState === 'error' && (
        <Card className="border-red-200 bg-red-50/20 shadow-md my-6">
          <CardContent className="p-8 text-center max-w-md mx-auto flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-3">
              <XCircle className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Unable to load summary
            </h3>
            <p className="text-xs text-slate-600 mt-1 mb-5">
              Something went wrong while loading this revision resource.
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

      {/* STATE D: READY STATE (NORMAL CONTENT) */}
      {viewState === 'ready' && (
        <>
          {/* No search matches state */}
          {!filteredData.hasMatches ? (
            <Card className="border-slate-200/80 bg-white p-8 text-center max-w-lg mx-auto">
              <CardContent className="flex flex-col items-center">
                <Search className="w-8 h-8 text-slate-400 mb-2" />
                <h4 className="text-base font-bold text-slate-800">
                  No matching content found
                </h4>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  No summary sections matched your search for <span className="font-semibold text-slate-700">"{searchQuery}"</span>.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchQuery('')}
                >
                  Clear Search Filter
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="flex flex-col gap-8 max-w-5xl">
              {/* ----------------------------------------------------------------- */}
              {/* SECTION 1: QUICK OVERVIEW CARD                                    */}
              {/* ----------------------------------------------------------------- */}
              {filteredData.overview && (
                <Card className="border-slate-200/90 shadow-sm bg-gradient-to-br from-white to-slate-50/50">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-primary-50 text-primary-600 border border-primary-100">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {filteredData.overview.title}
                      </h3>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4 text-sm text-slate-700 leading-relaxed">
                    <p className="font-medium text-slate-800">
                      {filteredData.overview.content}
                    </p>

                    <div className="bg-primary-50/60 border border-primary-100 rounded-2xl p-4 sm:p-5 mt-1">
                      <h4 className="text-xs uppercase font-bold text-primary-900 tracking-wider mb-2.5 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-primary-700 stroke-[3]" />
                        <span>Core Architectural Takeaways</span>
                      </h4>
                      <ul className="flex flex-col gap-2">
                        {filteredData.overview.keyTakeaways.map((takeaway, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-primary-950">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 shrink-0" />
                            <span>{takeaway}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* ----------------------------------------------------------------- */}
              {/* SECTION 2: KEY CONCEPTS                                           */}
              {/* ----------------------------------------------------------------- */}
              {filteredData.keyConcepts.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                        Key Concepts
                      </h3>
                      <p className="text-xs text-slate-500">
                        Foundational architectural building blocks covered in this material.
                      </p>
                    </div>
                    <span className="text-xs font-mono text-slate-400 font-semibold">
                      {filteredData.keyConcepts.length} concepts
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredData.keyConcepts.map((concept) => {
                      const Icon = concept.icon;
                      return (
                        <Card
                          key={concept.id}
                          hoverEffect
                          className="border-slate-200/80 hover:border-primary-200 transition-all flex flex-col justify-between"
                        >
                          <CardContent className="p-4 sm:p-5 flex flex-col h-full justify-between gap-3">
                            <div>
                              <div className="flex items-center justify-between mb-3">
                                <div className={`p-2.5 rounded-xl border ${concept.color}`}>
                                  <Icon className="w-4 h-4" />
                                </div>
                                <Badge
                                  variant={concept.priority === 'HIGH' ? 'danger' : 'warning'}
                                  outline
                                  className="text-[10px]"
                                >
                                  {concept.priority} PRIORITY
                                </Badge>
                              </div>

                              <h4 className="text-sm sm:text-base font-bold text-slate-900">
                                {concept.name}
                              </h4>
                              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                                {concept.explanation}
                              </p>
                            </div>

                            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                                {concept.tag}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ----------------------------------------------------------------- */}
              {/* SECTION 3: IMPORTANT REVISION POINTS                              */}
              {/* ----------------------------------------------------------------- */}
              {filteredData.importantPoints.length > 0 && (
                <Card className="border-slate-200/80 shadow-xs">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">
                            Important Points
                          </h3>
                          <p className="text-xs text-slate-500">
                            High-yield bullet points for quick memory retrieval.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {filteredData.importantPoints.map((point, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/70 border border-slate-100 hover:border-slate-200 transition-colors"
                        >
                          <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                            {idx + 1}
                          </div>
                          <p className="text-xs text-slate-700 leading-relaxed">
                            {point}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* ----------------------------------------------------------------- */}
              {/* SECTION 4: KEY DEFINITIONS                                        */}
              {/* ----------------------------------------------------------------- */}
              {filteredData.definitions.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                        Key Definitions
                      </h3>
                      <p className="text-xs text-slate-500">
                        Essential terminology and technical definitions to memorize.
                      </p>
                    </div>
                    <span className="text-xs font-mono text-slate-400 font-semibold">
                      {filteredData.definitions.length} definitions
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                    {filteredData.definitions.map((def, idx) => (
                      <Card
                        key={idx}
                        className="border-slate-200/80 bg-white hover:border-primary-200 transition-all flex flex-col justify-between"
                      >
                        <CardContent className="p-4 flex flex-col h-full justify-between gap-2.5">
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[10px] font-mono font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded">
                                {def.category}
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-slate-900">
                              {def.term}
                            </h4>
                            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                              {def.definition}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* ----------------------------------------------------------------- */}
              {/* SECTION 5: EXAM FOCUS (SUGGESTED REVISION PRIORITY)               */}
              {/* ----------------------------------------------------------------- */}
              {(filteredData.examFocus.highPriority.length > 0 ||
                filteredData.examFocus.mediumPriority.length > 0) && (
                <Card className="border-amber-200/80 bg-gradient-to-br from-amber-50/30 via-white to-white shadow-sm overflow-hidden">
                  <CardHeader className="border-b border-amber-100/60 pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 border border-amber-200">
                          <Zap className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-bold text-slate-900">
                              Exam Focus
                            </h3>
                            <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                              Suggested Revision Priority
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {filteredData.examFocus.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-5 flex flex-col gap-6">
                    {/* HIGH PRIORITY */}
                    {filteredData.examFocus.highPriority.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                          <h4 className="text-xs uppercase font-extrabold text-red-700 tracking-wider">
                            High Priority Topics
                          </h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {filteredData.examFocus.highPriority.map((item, idx) => (
                            <div
                              key={idx}
                              className="p-4 rounded-xl bg-red-50/40 border border-red-150 flex flex-col justify-between gap-2"
                            >
                              <h5 className="text-sm font-bold text-red-950">
                                {item.title}
                              </h5>
                              <p className="text-xs text-red-800/90 leading-relaxed">
                                {item.notes}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* MEDIUM PRIORITY */}
                    {filteredData.examFocus.mediumPriority.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                          <h4 className="text-xs uppercase font-extrabold text-amber-800 tracking-wider">
                            Medium Priority Topics
                          </h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {filteredData.examFocus.mediumPriority.map((item, idx) => (
                            <div
                              key={idx}
                              className="p-4 rounded-xl bg-amber-50/40 border border-amber-200/70 flex flex-col justify-between gap-2"
                            >
                              <h5 className="text-sm font-bold text-amber-950">
                                {item.title}
                              </h5>
                              <p className="text-xs text-amber-800 leading-relaxed">
                                {item.notes}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* ----------------------------------------------------------------- */}
              {/* SECTION 6: TOPIC-BY-TOPIC SUMMARY ACCORDION                       */}
              {/* ----------------------------------------------------------------- */}
              {filteredData.topicSummaries.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                        Topic-by-Topic Summary
                      </h3>
                      <p className="text-xs text-slate-500">
                        In-depth structured breakdown across all syllabus units.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={expandAllTopics}
                        className="text-xs font-semibold text-primary-600 hover:text-primary-800 cursor-pointer"
                      >
                        Expand All
                      </button>
                      <span className="text-slate-300">•</span>
                      <button
                        type="button"
                        onClick={collapseAllTopics}
                        className="text-xs font-semibold text-slate-500 hover:text-slate-700 cursor-pointer"
                      >
                        Collapse All
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    {filteredData.topicSummaries.map((topic, idx) => {
                      const isExpanded = Boolean(expandedTopics[topic.id]);
                      return (
                        <Card
                          key={topic.id}
                          className="border-slate-200/80 overflow-hidden transition-all"
                        >
                          <button
                            type="button"
                            onClick={() => toggleTopic(topic.id)}
                            className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors cursor-pointer select-none"
                            aria-expanded={isExpanded}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-7 h-7 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                                {idx + 1}
                              </div>
                              <h4 className="text-sm sm:text-base font-bold text-slate-900">
                                {topic.title}
                              </h4>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                                {topic.points.length} points
                              </span>
                              <div className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
                                {isExpanded ? (
                                  <ChevronUp className="w-4 h-4" />
                                ) : (
                                  <ChevronDown className="w-4 h-4" />
                                )}
                              </div>
                            </div>
                          </button>

                          {isExpanded && (
                            <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-1 border-t border-slate-100 flex flex-col gap-3 animate-in fade-in duration-200 bg-slate-50/30">
                              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                                {topic.summary}
                              </p>

                              <div className="bg-white rounded-xl p-3.5 border border-slate-200/70 flex flex-col gap-2">
                                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                                  Key Points & Proofs
                                </span>
                                <ul className="flex flex-col gap-1.5">
                                  {topic.points.map((pt, pIdx) => (
                                    <li
                                      key={pIdx}
                                      className="flex items-start gap-2 text-xs text-slate-600"
                                    >
                                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 shrink-0" />
                                      <span>{pt}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ----------------------------------------------------------------- */}
              {/* SECTION 7: AI DISCLAIMER FOOTER                                  */}
              {/* ----------------------------------------------------------------- */}
              <div className="p-4 rounded-2xl bg-slate-100/70 border border-slate-200/80 flex items-center gap-3 text-slate-500 text-xs">
                <Info className="w-4 h-4 text-slate-400 shrink-0" />
                <p>
                  <strong>Note:</strong> AI-generated study resources should be reviewed for accuracy before exam preparation. Content is structured to assist recall and concept mapping.
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
