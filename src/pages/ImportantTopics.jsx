import React, { useState, useMemo } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  Bookmark,
  Sparkles,
  Search,
  ArrowRight,
  Flame,
  CheckCircle2,
  FileText,
  Network,
  Layers,
  GraduationCap,
  Info,
  Zap,
  Check,
  X,
  Target,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import BackButton from '../components/ui/BackButton';
import Card, { CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import ProgressBar from '../components/ui/ProgressBar';
import Modal from '../components/ui/Modal';

export default function ImportantTopics() {
  const location = useLocation();
  const navigate = useNavigate();

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

  // Search, filter & sort states
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all'); // 'all' | 'high' | 'medium' | 'low'
  const [sortBy, setSortBy] = useState('priority'); // 'priority' | 'perf_asc' | 'perf_desc' | 'name'

  // Modal inspection state for a selected topic
  const [selectedTopic, setSelectedTopic] = useState(null);

  // Realistic Base Operating Systems Topic Dataset
  const baseTopics = useMemo(
    () => [
      {
        id: 'top-1',
        name: 'Memory Management',
        basePerformance: 50,
        defaultPriority: 'High',
        reason: 'Your quiz performance suggests this topic needs additional revision.',
        whyItMatters:
          'Memory allocation, paging algorithms, and fragmentation are core OS principles tested heavily in exams and critical for understanding low-level computing architectures.',
        concepts: [
          'Paging & Page Tables',
          'Virtual Memory',
          'Page Replacement (FIFO, LRU)',
          'Internal vs External Fragmentation',
          'Segmentation',
        ],
        description:
          'Techniques and algorithms for managing computer memory hierarchy, including dynamic partitioning, non-contiguous allocation, and hardware TLB translation.',
        recommendedAction: {
          label: 'Review Summary',
          route: '/summary',
          icon: FileText,
          variant: 'primary',
        },
        secondaryAction: {
          label: 'View Mind Map',
          route: '/mind-map',
          icon: Network,
        },
      },
      {
        id: 'top-2',
        name: 'CPU Scheduling',
        basePerformance: 67,
        defaultPriority: 'High',
        reason: 'Review scheduling algorithms and their differences.',
        whyItMatters:
          'Understanding preemptive vs non-preemptive scheduling, turnaround time, waiting time, and starvation prevention is critical for concurrency mastery.',
        concepts: [
          'FCFS (First-Come First-Served)',
          'Round Robin & Time Quantum',
          'Priority Scheduling & Aging',
          'Shortest Job First (SJF)',
          'Multilevel Feedback Queues',
        ],
        description:
          'Mechanisms determining which ready processes obtain CPU execution cores and the algorithmic trade-offs between throughput, latency, and fairness.',
        recommendedAction: {
          label: 'Review Summary',
          route: '/summary',
          icon: FileText,
          variant: 'primary',
        },
        secondaryAction: {
          label: 'Practice Flashcards',
          route: '/flashcards',
          icon: Layers,
        },
      },
      {
        id: 'top-3',
        name: 'Virtual Memory',
        basePerformance: 60,
        defaultPriority: 'High',
        reason: 'Address translation, page faults, and thrashing mechanics require closer study.',
        whyItMatters:
          'Page fault handling and thrashing cause major performance degradation if not understood, making it a favorite conceptual exam area.',
        concepts: [
          'Demand Paging',
          'Page Fault Handling Lifecycle',
          'Thrashing & Working Set Model',
          'Translation Lookaside Buffer (TLB)',
          'Belady\'s Anomaly',
        ],
        description:
          'Memory management capability that provides an idealized abstraction of storage resources, allowing execution of processes exceeding physical RAM.',
        recommendedAction: {
          label: 'View Mind Map',
          route: '/mind-map',
          icon: Network,
          variant: 'primary',
        },
        secondaryAction: {
          label: 'Practice Quiz',
          route: '/quiz',
          icon: GraduationCap,
        },
      },
      {
        id: 'top-4',
        name: 'Process Synchronization',
        basePerformance: 78,
        defaultPriority: 'Medium',
        reason: 'Good conceptual grasp, but critical section conditions and semaphores need review.',
        whyItMatters:
          'Race conditions and concurrency bugs are notoriously difficult to debug without clean mutual exclusion and atomic primitives.',
        concepts: [
          'Race Conditions',
          'Critical Section Problem',
          'Mutex Locks & Counting Semaphores',
          'Peterson\'s Solution',
          'Classical Problems (Dining Philosophers)',
        ],
        description:
          'Coordination of concurrent execution threads and processes to ensure orderly access to shared resources and maintain global data consistency.',
        recommendedAction: {
          label: 'Practice Flashcards',
          route: '/flashcards',
          icon: Layers,
          variant: 'outline',
        },
        secondaryAction: {
          label: 'Review Summary',
          route: '/summary',
          icon: FileText,
        },
      },
      {
        id: 'top-5',
        name: 'File Systems',
        basePerformance: 80,
        defaultPriority: 'Medium',
        reason: 'Solid baseline on inodes; revisit directory structures and allocation methods.',
        whyItMatters:
          'Disk allocation methods dictate random access efficiency, crash consistency, and metadata overhead in modern storage engines.',
        concepts: [
          'Inodes & File Metadata',
          'Contiguous, Linked & Indexed Allocation',
          'Directory Structures & Tree Hierarchies',
          'File Permissions & Access Control',
        ],
        description:
          'Methods and data structures that an operating system uses to control how persistent data is stored, indexed, and retrieved on secondary storage.',
        recommendedAction: {
          label: 'Review Summary',
          route: '/summary',
          icon: FileText,
          variant: 'outline',
        },
        secondaryAction: {
          label: 'Practice Quiz',
          route: '/quiz',
          icon: GraduationCap,
        },
      },
      {
        id: 'top-6',
        name: 'Process Management',
        basePerformance: 95,
        defaultPriority: 'Low',
        reason: 'Strong understanding of process lifecycle, PCB structure, and context switching.',
        whyItMatters:
          'Core foundation for operating system concurrency, kernel scheduling, and multi-threading models.',
        concepts: [
          'Process State Transitions',
          'Process Control Block (PCB)',
          'Context Switching Overhead',
          'Fork & Exec System Calls',
          'User vs Kernel Threads',
        ],
        description:
          'Creation, scheduling, and termination of execution threads and system processes, maintaining isolation and execution context.',
        recommendedAction: {
          label: 'Practice Quiz',
          route: '/quiz',
          icon: GraduationCap,
          variant: 'outline',
        },
        secondaryAction: {
          label: 'View Mind Map',
          route: '/mind-map',
          icon: Network,
        },
      },
      {
        id: 'top-7',
        name: 'Deadlocks',
        basePerformance: 100,
        defaultPriority: 'Low',
        reason: 'Mastered all 4 Coffman conditions and Banker\'s algorithm avoidance principles.',
        whyItMatters:
          'Prevents catastrophic system halts due to circular wait locks on non-shareable resources in distributed and multi-core environments.',
        concepts: [
          '4 Coffman Conditions',
          'Resource Allocation Graph (RAG)',
          'Banker\'s Algorithm for Avoidance',
          'Deadlock Detection & Recovery',
        ],
        description:
          'Conditions, detection mechanisms, and algorithmic safeguards for preventing, avoiding, and recovering from mutual blocking states.',
        recommendedAction: {
          label: 'View Mind Map',
          route: '/mind-map',
          icon: Network,
          variant: 'outline',
        },
        secondaryAction: {
          label: 'Practice Flashcards',
          route: '/flashcards',
          icon: Layers,
        },
      },
    ],
    []
  );

  // Compute Processed Topics with Dynamic Priority Rules
  const processedTopics = useMemo(() => {
    return baseTopics.map((topic) => {
      const score = topic.basePerformance;
      let priority = 'High';
      let status = 'Needs Attention';
      let statusVariant = 'danger';

      // Rule 8:
      // 90-100%: LOW PRIORITY
      // 75-89%: MEDIUM PRIORITY
      // Below 75%: HIGH PRIORITY
      if (score >= 90) {
        priority = 'Low';
        status = 'Strong';
        statusVariant = 'success';
      } else if (score >= 75) {
        priority = 'Medium';
        status = 'Good';
        statusVariant = 'warning';
      } else {
        priority = 'High';
        status = 'Needs Attention';
        statusVariant = 'danger';
      }

      return {
        ...topic,
        performance: score,
        priority,
        status,
        statusVariant,
      };
    });
  }, [baseTopics]);

  // Priority Counts for Metric Summary Cards
  const priorityCounts = useMemo(() => {
    const high = processedTopics.filter((t) => t.priority === 'High').length;
    const medium = processedTopics.filter((t) => t.priority === 'Medium').length;
    const low = processedTopics.filter((t) => t.priority === 'Low').length;
    return { high, medium, low, total: processedTopics.length };
  }, [processedTopics]);

  // Overall Recommendation: "Where Should You Start?"
  // Deterministic rule: Highest priority with lowest performance
  const topRecommendation = useMemo(() => {
    if (processedTopics.length === 0) return null;

    // Filter high priority first, sort by performance ascending
    const highPriorityTopics = processedTopics
      .filter((t) => t.priority === 'High')
      .sort((a, b) => (a.performance ?? 100) - (b.performance ?? 100));

    if (highPriorityTopics.length > 0) {
      const top = highPriorityTopics[0];
      return {
        topic: top,
        title: `Start with ${top.name}`,
        reason:
          top.performance !== null
            ? `It currently has the lowest quiz performance (${top.performance}%) among your high-priority topics.`
            : 'It is flagged as your highest priority revision topic based on syllabus weight.',
      };
    }

    // Fallback if no high priority: medium priority with lowest score
    const mediumPriorityTopics = processedTopics
      .filter((t) => t.priority === 'Medium')
      .sort((a, b) => (a.performance ?? 100) - (b.performance ?? 100));

    if (mediumPriorityTopics.length > 0) {
      const top = mediumPriorityTopics[0];
      return {
        topic: top,
        title: `Review ${top.name}`,
        reason: `Your highest priority topics are in good shape. Revisit ${top.name} next to solidify your score.`,
      };
    }

    const first = processedTopics[0];
    return {
      topic: first,
      title: `Keep ${first.name} Fresh`,
      reason: 'All topics are performing strongly. Do a quick refresher to maintain mastery.',
    };
  }, [processedTopics]);

  // Strong Areas (>= 90%)
  const strongAreas = useMemo(() => {
    return processedTopics.filter((t) => (t.performance ?? 0) >= 90);
  }, [processedTopics]);

  // Filtered & Sorted Topics for the list / sections
  const filteredAndSortedTopics = useMemo(() => {
    let result = [...processedTopics];

    // Search query filter (matches topic name or concept names)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query) ||
          t.concepts.some((c) => c.toLowerCase().includes(query))
      );
    }

    // Priority filter
    if (priorityFilter !== 'all') {
      const targetPriority =
        priorityFilter === 'high'
          ? 'High'
          : priorityFilter === 'medium'
            ? 'Medium'
            : 'Low';
      result = result.filter((t) => t.priority === targetPriority);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'priority') {
        const order = { High: 1, Medium: 2, Low: 3 };
        const diff = order[a.priority] - order[b.priority];
        if (diff !== 0) return diff;
        return (a.performance ?? 100) - (b.performance ?? 100);
      }
      if (sortBy === 'perf_asc') {
        return (a.performance ?? 100) - (b.performance ?? 100);
      }
      if (sortBy === 'perf_desc') {
        return (b.performance ?? 0) - (a.performance ?? 0);
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    return result;
  }, [processedTopics, searchQuery, priorityFilter, sortBy]);

  // Grouped topics by priority for section-based rendering when priorityFilter === 'all'
  const highPriorityList = useMemo(
    () => filteredAndSortedTopics.filter((t) => t.priority === 'High'),
    [filteredAndSortedTopics]
  );
  const mediumPriorityList = useMemo(
    () => filteredAndSortedTopics.filter((t) => t.priority === 'Medium'),
    [filteredAndSortedTopics]
  );
  const lowPriorityList = useMemo(
    () => filteredAndSortedTopics.filter((t) => t.priority === 'Low'),
    [filteredAndSortedTopics]
  );

  // Helper navigation to preserve state
  const handleNavigate = (route) => {
    navigate(route, {
      state: {
        from: '/important-topics',
        material,
      },
    });
  };

  // Reusable Topic Card Renderer
  const renderTopicCard = (topic) => {
    const isHigh = topic.priority === 'High';
    const isMedium = topic.priority === 'Medium';
    const isLow = topic.priority === 'Low';

    const PriorityIcon = isHigh ? Flame : isMedium ? Target : CheckCircle2;
    const RecommendedIcon = topic.recommendedAction?.icon || FileText;
    const SecondaryIcon = topic.secondaryAction?.icon || Network;

    const badgeVariant = isHigh ? 'danger' : isMedium ? 'warning' : 'success';
    const progressVariant = isHigh ? 'danger' : isMedium ? 'warning' : 'success';

    return (
      <Card
        key={topic.id}
        hoverEffect
        className={`
          flex flex-col justify-between border transition-all duration-200 group
          ${isHigh ? 'border-red-100/90 hover:border-red-300 hover:shadow-md' : ''}
          ${isMedium ? 'border-amber-100/90 hover:border-amber-300 hover:shadow-md' : ''}
          ${isLow ? 'border-slate-200/90 hover:border-emerald-300 hover:shadow-md' : ''}
        `}
      >
        <CardContent className="p-5 sm:p-6 flex flex-col h-full justify-between">
          <div>
            {/* Header: Priority Badge, Performance Badge & Details trigger */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <Badge variant={badgeVariant} className="gap-1 px-2.5 py-1 text-xs">
                  <PriorityIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>{topic.priority} Priority</span>
                </Badge>

                {topic.performance !== null ? (
                  <span
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                      isHigh
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : isMedium
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    {topic.performance}% Mastery
                  </span>
                ) : (
                  <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                    No Quiz Data
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => setSelectedTopic(topic)}
                className="text-xs font-semibold text-primary-600 hover:text-primary-800 hover:underline inline-flex items-center gap-1 cursor-pointer"
                title="View in-depth topic breakdown"
              >
                <span>Details</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            {/* Topic Title */}
            <h4
              onClick={() => setSelectedTopic(topic)}
              className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-primary-600 transition-colors cursor-pointer"
            >
              {topic.name}
            </h4>

            {/* Reason / Explanation */}
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              {topic.reason}
            </p>

            {/* Progress Bar (if performance data exists) */}
            {topic.performance !== null && (
              <div className="mt-4 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-600 mb-1.5">
                  <span className="text-slate-500 font-medium">Quiz Performance</span>
                  <span className="font-bold font-mono">{topic.performance}%</span>
                </div>
                <ProgressBar
                  value={topic.performance}
                  max={100}
                  variant={progressVariant}
                  size="sm"
                />
              </div>
            )}

            {/* Related Concepts */}
            <div className="mt-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Key Concepts:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {topic.concepts.map((concept, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md transition-colors"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-2">
            <Button
              variant={isHigh ? 'primary' : 'outline'}
              size="sm"
              iconLeft={RecommendedIcon}
              onClick={() => handleNavigate(topic.recommendedAction.route)}
              className="w-full sm:flex-1 font-semibold text-xs cursor-pointer justify-center"
            >
              {topic.recommendedAction.label}
            </Button>

            {topic.secondaryAction && (
              <Button
                variant="ghost"
                size="sm"
                iconLeft={SecondaryIcon}
                onClick={() => handleNavigate(topic.secondaryAction.route)}
                className="w-full sm:w-auto font-medium text-xs text-slate-600 hover:text-slate-900 border border-slate-200/80 sm:border-transparent cursor-pointer"
                title={topic.secondaryAction.label}
              >
                {topic.secondaryAction.label}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* ========================================================================= */}
      {/* 1. BREADCRUMB & PAGE HEADER                                               */}
      {/* ========================================================================= */}
      <div>
        <BackButton
          label="Back"
          fallback="/ai-analysis"
          to={location.state?.from || '/ai-analysis'}
        />

        <PageHeader
          title="Important Topics"
          description="Focus your revision on the concepts that matter most."
        >
          <div className="flex items-center gap-2">
            <Link to="/ai-analysis">
              <Button
                variant="outline"
                size="sm"
                className="font-semibold text-xs cursor-pointer"
              >
                AI Analysis
              </Button>
            </Link>
          </div>
        </PageHeader>
      </div>

      {/* ========================================================================= */}
      {/* 2. SOURCE MATERIAL CARD                                                   */}
      {/* ========================================================================= */}
      <Card className="border-slate-200/80 bg-white shadow-xs overflow-hidden">
        <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center font-bold text-sm shadow-2xs shrink-0">
              <Bookmark className="w-6 h-6" />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-0.5">
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

          {/* Material Stats Summary */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
            <div className="text-left sm:text-right">
              <span className="text-xs text-slate-400 font-medium block">Key Topics</span>
              <span className="text-sm font-extrabold text-slate-900">{filteredAndSortedTopics.length} Prioritized</span>
            </div>
            <div className="h-7 w-px bg-slate-200 hidden sm:block" />
            <Link to="/summary" state={{ from: '/important-topics', material }}>
              <Button
                variant="outline"
                size="sm"
                iconLeft={FileText}
                className="text-xs font-semibold cursor-pointer"
              >
                Summary
              </Button>
            </Link>
            <Link to="/mind-map" state={{ from: '/important-topics', material }}>
              <Button
                variant="primary"
                size="sm"
                iconLeft={Network}
                className="text-xs font-semibold cursor-pointer shadow-xs"
              >
                Mind Map
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-6 animate-in fade-in duration-200">
          {/* ===================================================================== */}
          {/* NO QUIZ DATA INFORMATIONAL BANNER (Fallback Mode)                    */}
          {/* ===================================================================== */}
          {!filteredAndSortedTopics.some(t => t.performance !== null) && (
            <Card className="border-amber-200 bg-amber-50/50 shadow-2xs">
              <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Info className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-amber-900">
                      Personalized priority data will appear after you complete a quiz.
                    </h4>
                    <p className="text-xs text-amber-800 mt-0.5">
                      Showing curriculum-based priority estimations. Take a quick quiz to generate custom mastery percentages.
                    </p>
                  </div>
                </div>

                <Link to="/quiz" state={{ from: '/important-topics', material }} className="shrink-0">
                  <Button
                    variant="primary"
                    size="sm"
                    iconLeft={GraduationCap}
                    className="font-bold text-xs cursor-pointer shadow-xs w-full sm:w-auto"
                  >
                    Take a Quiz
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* ===================================================================== */}
          {/* 4. INTRODUCTION & DISCLAIMER CARD                                     */}
          {/* ===================================================================== */}
          <Card className="border-slate-200/90 shadow-xs bg-gradient-to-br from-white via-slate-50/40 to-primary-50/20">
            <CardContent className="p-5 sm:p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary-50 text-primary-700 text-xs font-bold border border-primary-100 mb-2">
                    <Zap className="w-3.5 h-3.5 text-primary-600" />
                    <span>Smart Revision Strategy</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    Your Revision Priorities
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                    Mind Mapr organizes topics into priority levels so you can spend your study time where it matters most.
                  </p>
                </div>

                {/* Disclaimer pill */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-500 text-xs leading-relaxed max-w-sm flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-700 font-semibold block mb-0.5">Study Guidance Note</strong>
                    Priority levels are study guidance, not predictions of exam questions.
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ===================================================================== */}
          {/* 5. PRIORITY SUMMARY STATS (High, Medium, Low)                         */}
          {/* ===================================================================== */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* High Priority Stat */}
            <Card
              onClick={() => setPriorityFilter(priorityFilter === 'high' ? 'all' : 'high')}
              className={`border transition-all cursor-pointer select-none ${
                priorityFilter === 'high'
                  ? 'border-red-400 ring-2 ring-red-200 bg-red-50/30 shadow-sm'
                  : 'border-red-100 bg-gradient-to-br from-white to-red-50/20 hover:border-red-300'
              }`}
            >
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-red-600 block">
                    High Priority
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-extrabold font-mono text-slate-900">
                      {priorityCounts.high}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {priorityCounts.high === 1 ? 'Topic' : 'Topics'}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Needs immediate attention
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shadow-2xs shrink-0">
                  <Flame className="w-6 h-6" />
                </div>
              </CardContent>
            </Card>

            {/* Medium Priority Stat */}
            <Card
              onClick={() => setPriorityFilter(priorityFilter === 'medium' ? 'all' : 'medium')}
              className={`border transition-all cursor-pointer select-none ${
                priorityFilter === 'medium'
                  ? 'border-amber-400 ring-2 ring-amber-200 bg-amber-50/30 shadow-sm'
                  : 'border-amber-100 bg-gradient-to-br from-white to-amber-50/20 hover:border-amber-300'
              }`}
            >
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block">
                    Medium Priority
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-extrabold font-mono text-slate-900">
                      {priorityCounts.medium}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {priorityCounts.medium === 1 ? 'Topic' : 'Topics'}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Worth revisiting next
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shadow-2xs shrink-0">
                  <Target className="w-6 h-6" />
                </div>
              </CardContent>
            </Card>

            {/* Low Priority Stat */}
            <Card
              onClick={() => setPriorityFilter(priorityFilter === 'low' ? 'all' : 'low')}
              className={`border transition-all cursor-pointer select-none ${
                priorityFilter === 'low'
                  ? 'border-emerald-400 ring-2 ring-emerald-200 bg-emerald-50/30 shadow-sm'
                  : 'border-emerald-100 bg-gradient-to-br from-white to-emerald-50/20 hover:border-emerald-300'
              }`}
            >
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block">
                    Low Priority
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-extrabold font-mono text-slate-900">
                      {priorityCounts.low}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {priorityCounts.low === 1 ? 'Topic' : 'Topics'}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Relatively strong concepts
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-2xs shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ===================================================================== */}
          {/* 6. "WHERE SHOULD YOU START?" PROMINENT RECOMMENDATION CALLOUT         */}
          {/* ===================================================================== */}
          {topRecommendation && (
            <Card className="border-primary-200/90 shadow-md shadow-primary-500/5 bg-gradient-to-r from-slate-900 via-primary-950 to-slate-900 text-white overflow-hidden relative">
              {/* Subtle background decorative shapes */}
              <div className="absolute -top-12 -right-12 w-52 h-52 bg-primary-500/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-52 h-52 bg-secondary-500/20 rounded-full blur-2xl pointer-events-none" />

              <CardContent className="p-6 sm:p-7 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary-500 text-white flex items-center justify-center shadow-md shadow-primary-500/30 shrink-0 mt-0.5">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary-400/20 text-primary-300 text-xs font-bold mb-1.5 border border-primary-400/30">
                      <Sparkles className="w-3 h-3" />
                      <span>Where Should You Start?</span>
                    </div>

                    <h4 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                      {topRecommendation.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
                      {topRecommendation.reason}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <span className="text-[11px] font-mono font-bold bg-white/10 text-white px-2 py-0.5 rounded border border-white/15">
                        Priority: {topRecommendation.topic.priority}
                      </span>
                      {topRecommendation.topic.performance !== null && (
                        <span className="text-[11px] font-mono font-bold bg-red-400/20 text-red-300 px-2 py-0.5 rounded border border-red-400/30">
                          Current Score: {topRecommendation.topic.performance}%
                        </span>
                      )}
                      <span className="text-xs text-slate-400">
                        Based on current study and quiz data
                      </span>
                    </div>
                  </div>
                </div>

                {/* Primary CTA button */}
                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                  <Button
                    variant="primary"
                    size="md"
                    iconLeft={FileText}
                    onClick={() => handleNavigate(topRecommendation.topic.recommendedAction.route)}
                    className="w-full sm:w-auto font-bold text-xs sm:text-sm px-5 py-3 shadow-lg shadow-primary-500/25 cursor-pointer"
                  >
                    Review {topRecommendation.topic.name}
                  </Button>

                  <Button
                    variant="glass"
                    size="md"
                    iconLeft={Network}
                    onClick={() => handleNavigate('/mind-map')}
                    className="w-full sm:w-auto font-semibold text-xs text-white"
                  >
                    Open Mind Map
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* ===================================================================== */}
          {/* 7. SEARCH, FILTER & SORT TOOLBAR                                      */}
          {/* ===================================================================== */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Input
                placeholder="Search topics or concepts (e.g. Memory, Inodes, Paging)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                iconLeft={Search}
                rightElement={
                  searchQuery ? (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="text-slate-400 hover:text-slate-600 p-1"
                      title="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  ) : null
                }
                className="w-full"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 shrink-0">
              <span className="text-xs font-semibold text-slate-400 hidden sm:inline mr-1">
                Filter:
              </span>
              {[
                { id: 'all', label: 'All', count: priorityCounts.total },
                { id: 'high', label: 'High', count: priorityCounts.high },
                { id: 'medium', label: 'Medium', count: priorityCounts.medium },
                { id: 'low', label: 'Low', count: priorityCounts.low },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setPriorityFilter(f.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    priorityFilter === f.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span>{f.label}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      priorityFilter === f.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {f.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-semibold text-slate-400 hidden lg:inline">
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-primary-500 cursor-pointer"
              >
                <option value="priority">Priority (High to Low)</option>
                <option value="perf_asc">Performance: Low to High</option>
                <option value="perf_desc">Performance: High to Low</option>
                <option value="name">Topic Name (A–Z)</option>
              </select>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* 8. TOPIC SECTIONS (HIGH, MEDIUM, LOW)                                 */}
          {/* ===================================================================== */}

          {/* Zero Search Results State */}
          {filteredAndSortedTopics.length === 0 && (
            <Card className="border-dashed border-slate-300 p-8 text-center bg-white">
              <CardContent className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
                  <Search className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-800">
                  No matching topics found
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm">
                  We couldn't find any topics matching "{searchQuery}". Try a different keyword or reset filters.
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery('');
                      setPriorityFilter('all');
                    }}
                    className="text-xs font-semibold"
                  >
                    Clear Search & Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* When Priority Filter is NOT 'all', show a single clean grid */}
          {priorityFilter !== 'all' && filteredAndSortedTopics.length > 0 && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-slate-900 capitalize flex items-center gap-2">
                  <span>{priorityFilter} Priority Topics</span>
                  <Badge
                    variant={
                      priorityFilter === 'high'
                        ? 'danger'
                        : priorityFilter === 'medium'
                          ? 'warning'
                          : 'success'
                    }
                  >
                    {filteredAndSortedTopics.length}
                  </Badge>
                </h4>
                <span className="text-xs text-slate-400">
                  Showing filtered topics
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredAndSortedTopics.map((topic) => renderTopicCard(topic))}
              </div>
            </div>
          )}

          {/* When Priority Filter is 'all', show organized Priority Hierarchy Sections */}
          {priorityFilter === 'all' && filteredAndSortedTopics.length > 0 && (
            <div className="flex flex-col gap-8">
              {/* SECTION 1: HIGH PRIORITY */}
              {highPriorityList.length > 0 && (
                <div className="flex flex-col gap-3.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-red-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                        <Flame className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-900 tracking-tight">
                          High Priority
                        </h4>
                        <p className="text-xs text-slate-500">
                          Topics that need the most revision attention.
                        </p>
                      </div>
                    </div>

                    <span className="text-xs font-mono font-bold text-red-700 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full self-start sm:self-auto">
                      {highPriorityList.length} High Priority
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {highPriorityList.map((topic) => renderTopicCard(topic))}
                  </div>
                </div>
              )}

              {/* SECTION 2: MEDIUM PRIORITY */}
              {mediumPriorityList.length > 0 && (
                <div className="flex flex-col gap-3.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-amber-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                        <Target className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-900 tracking-tight">
                          Medium Priority
                        </h4>
                        <p className="text-xs text-slate-500">
                          Topics worth revisiting after your highest-priority areas.
                        </p>
                      </div>
                    </div>

                    <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full self-start sm:self-auto">
                      {mediumPriorityList.length} Medium Priority
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {mediumPriorityList.map((topic) => renderTopicCard(topic))}
                  </div>
                </div>
              )}

              {/* SECTION 3: LOW PRIORITY / STRONG TOPICS */}
              {lowPriorityList.length > 0 && (
                <div className="flex flex-col gap-3.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-emerald-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-900 tracking-tight">
                          Low Priority
                        </h4>
                        <p className="text-xs text-slate-500">
                          Topics where your current performance is relatively strong.
                        </p>
                      </div>
                    </div>

                    <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full self-start sm:self-auto">
                      {lowPriorityList.length} Low Priority
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {lowPriorityList.map((topic) => renderTopicCard(topic))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ===================================================================== */}
          {/* 9. STRONG AREAS SECTION ("You're Doing Well In")                       */}
          {/* ===================================================================== */}
          {strongAreas.length > 0 && (
            <Card className="border-emerald-200 bg-gradient-to-br from-white via-emerald-50/20 to-emerald-50/40 shadow-xs">
              <CardContent className="p-5 sm:p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-slate-900">
                        You're Doing Well In
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Keep these topics fresh with occasional review.
                      </p>
                    </div>
                  </div>

                  <Link to="/quiz" state={{ from: '/important-topics', material }}>
                    <Button
                      variant="outline"
                      size="sm"
                      iconLeft={GraduationCap}
                      className="text-xs font-semibold border-emerald-200 text-emerald-800 hover:bg-emerald-50 cursor-pointer"
                    >
                      Test Mastery Again
                    </Button>
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {strongAreas.map((area) => (
                    <div
                      key={area.id}
                      className="p-3.5 rounded-xl bg-white border border-emerald-100 shadow-2xs flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-slate-900 block truncate">
                          {area.name}
                        </span>
                        <span className="text-[11px] text-emerald-700 font-medium">
                          Status: Strong Concept
                        </span>
                      </div>

                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                        {area.performance}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* ===================================================================== */}
          {/* 10. AI GUIDANCE & EXAM DISCLAIMER FOOTER CARD                          */}
          {/* ===================================================================== */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-primary-500" />
              AI-generated study guidance should be reviewed alongside your course material.
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span>Priority levels are not predictions of exam questions.</span>
          </div>
        </div>

      {/* ========================================================================= */}
      {/* 11. TOPIC DETAILS MODAL                                                   */}
      {/* ========================================================================= */}
      <Modal
        isOpen={!!selectedTopic}
        onClose={() => setSelectedTopic(null)}
        title={selectedTopic?.name || 'Topic Details'}
        size="lg"
        footer={
          <div className="flex flex-wrap items-center justify-between w-full gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedTopic(null)}
              className="text-xs font-semibold"
            >
              Close
            </Button>

            <div className="flex items-center gap-2">
              {selectedTopic?.secondaryAction && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const route = selectedTopic.secondaryAction.route;
                    setSelectedTopic(null);
                    handleNavigate(route);
                  }}
                  className="text-xs font-semibold cursor-pointer"
                >
                  {selectedTopic.secondaryAction.label}
                </Button>
              )}

              {selectedTopic?.recommendedAction && (
                <Button
                  variant="primary"
                  size="sm"
                  iconRight={ArrowRight}
                  onClick={() => {
                    const route = selectedTopic.recommendedAction.route;
                    setSelectedTopic(null);
                    handleNavigate(route);
                  }}
                  className="text-xs font-bold cursor-pointer shadow-xs"
                >
                  {selectedTopic.recommendedAction.label}
                </Button>
              )}
            </div>
          </div>
        }
      >
        {selectedTopic && (
          <div className="flex flex-col gap-5">
            {/* Modal Header Priority & Performance Bar */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    selectedTopic.priority === 'High'
                      ? 'danger'
                      : selectedTopic.priority === 'Medium'
                        ? 'warning'
                        : 'success'
                  }
                  className="px-2.5 py-1 text-xs font-bold"
                >
                  {selectedTopic.priority} Priority
                </Badge>
                <span className="text-xs text-slate-500 font-medium">
                  Based on current study and quiz data
                </span>
              </div>

              {selectedTopic.performance !== null && (
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-slate-500">Current Mastery:</span>
                  <span className="text-sm font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {selectedTopic.performance}%
                  </span>
                </div>
              )}
            </div>

            {/* Why Review / Why it Matters */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Why Review This Topic?
              </h5>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium bg-amber-50/50 p-3 rounded-xl border border-amber-100">
                {selectedTopic.whyItMatters}
              </p>
            </div>

            {/* Description */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Overview & Description
              </h5>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {selectedTopic.description}
              </p>
            </div>

            {/* Key Concepts to Revise */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Concepts to Revise ({selectedTopic.concepts.length})
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedTopic.concepts.map((concept, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70 text-xs font-semibold text-slate-700 flex items-center gap-2"
                  >
                    <Check className="w-3.5 h-3.5 text-primary-600 shrink-0 stroke-[2.5]" />
                    <span>{concept}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Action Callout */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Suggested revision tool:</span>
              <span className="font-bold text-primary-700">
                {selectedTopic.recommendedAction?.label} ({selectedTopic.recommendedAction?.route})
              </span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
