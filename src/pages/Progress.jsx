import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  Award,
  GraduationCap,
  Layers,
  Calendar,
  Clock,
  Flame,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Zap,
  Bookmark,
  Target,
  FileText,
  BarChart3,
  ShieldCheck,
} from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import BackButton from '../components/ui/BackButton';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';
import { useToast } from '../components/ui/Toast';

export default function Progress() {
  const location = useLocation();
  const navigate = useNavigate();
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

  // Date Range Period Filter: 'week' | 'month' | 'all'
  const [timeRange, setTimeRange] = useState('week');

  // Realistic Operating Systems Topic Mastery Dataset (Internally consistent across Mind Mapr)
  const rawTopics = useMemo(
    () => [
      {
        id: 'top-1',
        name: 'Process Management',
        mastery: 100,
        quizzesTaken: 2,
        cardsMastered: 10,
        category: 'Core OS',
      },
      {
        id: 'top-2',
        name: 'Deadlocks',
        mastery: 95,
        quizzesTaken: 2,
        cardsMastered: 8,
        category: 'Resource Management',
      },
      {
        id: 'top-3',
        name: 'File Systems',
        mastery: 80,
        quizzesTaken: 1,
        cardsMastered: 6,
        category: 'Storage Management',
      },
      {
        id: 'top-4',
        name: 'Process Synchronization',
        mastery: 78,
        quizzesTaken: 2,
        cardsMastered: 7,
        category: 'Concurrency',
      },
      {
        id: 'top-5',
        name: 'CPU Scheduling',
        mastery: 67,
        quizzesTaken: 3,
        cardsMastered: 5,
        category: 'CPU Management',
      },
      {
        id: 'top-6',
        name: 'Virtual Memory',
        mastery: 60,
        quizzesTaken: 2,
        cardsMastered: 4,
        category: 'Memory Systems',
      },
      {
        id: 'top-7',
        name: 'Memory Management',
        mastery: 50,
        quizzesTaken: 2,
        cardsMastered: 2,
        category: 'Memory Systems',
      },
    ],
    []
  );

  // Status mapping rule (Rule 6)
  // 90-100%: Mastered
  // 75-89%: Good
  // 50-74%: Needs Practice
  // Below 50%: Needs Attention
  const processedTopics = useMemo(() => {
    return rawTopics.map((t) => {
      let status = 'Needs Practice';
      let badgeVariant = 'warning';
      let icon = AlertTriangle;

      if (t.mastery >= 90) {
        status = 'Mastered';
        badgeVariant = 'success';
        icon = CheckCircle2;
      } else if (t.mastery >= 75) {
        status = 'Good';
        badgeVariant = 'primary';
        icon = ShieldCheck;
      } else if (t.mastery >= 50) {
        status = 'Needs Practice';
        badgeVariant = 'warning';
        icon = AlertTriangle;
      } else {
        status = 'Needs Attention';
        badgeVariant = 'danger';
        icon = AlertTriangle;
      }

      return {
        ...t,
        status,
        badgeVariant,
        icon,
      };
    });
  }, [rawTopics]);

  // Overall Calculated Metric Scores
  const calculatedMetrics = useMemo(() => {
    // Dynamic time range modifiers for demo fidelity
    const multiplier = timeRange === 'week' ? 1 : timeRange === 'month' ? 2.4 : 4.5;

    const quizScore = 82;
    const flashcardsReviewed = Math.round(42 * (timeRange === 'week' ? 1 : multiplier * 0.7));
    const totalTopics = processedTopics.length;
    const masteredTopicsCount = processedTopics.filter((t) => t.mastery >= 75).length; // 5 out of 7 with >=75%
    const studyHours = timeRange === 'week' ? '6h 30m' : timeRange === 'month' ? '24h 15m' : '58h 40m';

    // High Level Learning Overview Percentages
    const quizPerformance = 82;
    const flashcardCompletion = 68;
    const revisionCompletion = 74;
    const avgTopicMastery = Math.round(
      processedTopics.reduce((acc, t) => acc + t.mastery, 0) / (totalTopics || 1)
    );

    // Overall Progress is the weighted average of the 4 key learning pillars
    const overallProgress = Math.round(
      (quizPerformance * 0.35 + flashcardCompletion * 0.2 + revisionCompletion * 0.25 + avgTopicMastery * 0.2)
    );

    return {
      quizScore,
      flashcardsReviewed,
      masteredTopicsCount,
      totalTopics,
      studyHours,
      quizPerformance,
      flashcardCompletion,
      revisionCompletion,
      avgTopicMastery,
      overallProgress,
    };
  }, [processedTopics, timeRange]);

  // Strongest Topics (Top 3 by mastery descending)
  const strongestTopics = useMemo(() => {
    return [...processedTopics].sort((a, b) => b.mastery - a.mastery).slice(0, 3);
  }, [processedTopics]);

  // Topics to Improve (Bottom 3 by mastery ascending)
  const topicsToImprove = useMemo(() => {
    return [...processedTopics].sort((a, b) => a.mastery - b.mastery).slice(0, 3);
  }, [processedTopics]);

  // Recommended Next Step (Deterministic based on lowest mastery topic)
  const recommendedNextStep = useMemo(() => {
    if (topicsToImprove.length === 0) return null;
    const lowest = topicsToImprove[0];

    return {
      topic: lowest.name,
      mastery: lowest.mastery,
      title: `Review ${lowest.name}`,
      reason: `It currently has the lowest mastery score (${lowest.mastery}%). Focus on core concepts and address translation before taking your next quiz.`,
      targetRoute: '/important-topics',
    };
  }, [topicsToImprove]);

  // Weekly Study Activity Bar Chart Data (Mon–Sun)
  const weeklyActivity = useMemo(
    () => [
      { day: 'Mon', fullDay: 'Monday', mins: 45, sessions: 2, height: 60 },
      { day: 'Tue', fullDay: 'Tuesday', mins: 60, sessions: 3, height: 80 },
      { day: 'Wed', fullDay: 'Wednesday', mins: 35, sessions: 1, height: 45 },
      { day: 'Thu', fullDay: 'Thursday', mins: 55, sessions: 2, height: 75 },
      { day: 'Fri', fullDay: 'Friday', mins: 40, sessions: 2, height: 55 },
      { day: 'Sat', fullDay: 'Saturday', mins: 75, sessions: 3, height: 100 },
      { day: 'Sun', fullDay: 'Sunday', mins: 40, sessions: 1, height: 55 },
    ],
    []
  );

  // Total Weekly Minutes
  const totalWeeklyMins = useMemo(() => {
    return weeklyActivity.reduce((acc, curr) => acc + curr.mins, 0);
  }, [weeklyActivity]);

  // Recent Activity Items
  const recentActivities = useMemo(
    () => [
      {
        id: 1,
        title: 'Completed CPU Scheduling quiz',
        topic: 'CPU Scheduling',
        time: 'Today, 11:45 AM',
        icon: GraduationCap,
        badge: '80% Score',
        color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      },
      {
        id: 2,
        title: 'Reviewed 15 flashcards',
        topic: 'Virtual Memory',
        time: 'Today, 9:20 AM',
        icon: Layers,
        badge: '15 Cards',
        color: 'text-primary-600 bg-primary-50 border-primary-100',
      },
      {
        id: 3,
        title: 'Completed Memory Management revision',
        topic: 'Memory Management',
        time: 'Yesterday, 4:10 PM',
        icon: Calendar,
        badge: '45 min',
        color: 'text-amber-600 bg-amber-50 border-amber-100',
      },
      {
        id: 4,
        title: 'Generated Operating Systems summary',
        topic: 'Operating Systems',
        time: '2 days ago',
        icon: FileText,
        badge: 'Study Deck',
        color: 'text-blue-600 bg-blue-50 border-blue-100',
      },
    ],
    []
  );

  // Helper Navigation with Context Preservation
  const handleNavigate = (route) => {
    navigate(route, {
      state: {
        from: '/progress',
        material,
      },
    });
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* ========================================================================= */}
      {/* 1. BREADCRUMB & PAGE HEADER                                               */}
      {/* ========================================================================= */}
      <div>
        <BackButton
          label="Back"
          fallback="/dashboard"
          to={location.state?.from || '/dashboard'}
        />

        <PageHeader
          title="Progress"
          description="Track your learning progress and see how your study habits are improving."
        >
          {/* Time Range Filter */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 shadow-2xs text-xs font-semibold">
              {[
                { id: 'week', label: 'This Week' },
                { id: 'month', label: 'This Month' },
                { id: 'all', label: 'All Time' },
              ].map((pill) => (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => {
                    setTimeRange(pill.id);
                    toast.info(`Filtered to ${pill.label}`);
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    timeRange === pill.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>
        </PageHeader>
      </div>

      {/* Subtle Material Context Pill */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Course Context:</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold font-mono">
            <Bookmark className="w-3 h-3 text-slate-500" />
            {material.topic}
          </span>
        </div>
        <span className="text-xs text-slate-400">
          Showing activity for <strong className="text-slate-700 font-semibold">{timeRange === 'week' ? 'Past 7 Days' : timeRange === 'month' ? 'Past 30 Days' : 'Full Semester'}</strong>
        </span>
      </div>

      <div className="flex flex-col gap-6 animate-in fade-in duration-200">
          {/* ===================================================================== */}
          {/* 3. HERO: OVERALL PROGRESS & 4 KEY STATISTICS                          */}
          {/* ===================================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Overall Progress Card with Circular Meter */}
            <Card className="border-slate-200/90 bg-gradient-to-br from-white via-slate-50/40 to-primary-50/20 shadow-xs flex flex-col justify-between">
              <CardContent className="p-6 flex flex-col items-center text-center justify-center h-full">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary-50 text-primary-700 text-xs font-bold border border-primary-100 mb-4">
                  <Zap className="w-3.5 h-3.5 text-primary-600" />
                  <span>Curriculum Mastery</span>
                </div>

                {/* Modern Circular SVG Progress Ring */}
                <div className="relative w-36 h-36 flex items-center justify-center my-1">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      className="text-slate-100"
                      strokeWidth="10"
                      stroke="currentColor"
                      fill="transparent"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      className="text-primary-600 transition-all duration-1000 ease-out"
                      strokeWidth="10"
                      strokeDasharray={314.159}
                      strokeDashoffset={314.159 * (1 - calculatedMetrics.overallProgress / 100)}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-3xl font-extrabold font-mono text-slate-900 tracking-tight">
                      {calculatedMetrics.overallProgress}%
                    </span>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Overall
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mt-3">
                  Overall Progress
                </h3>
                <p className="text-xs text-slate-600 mt-1 max-w-xs leading-relaxed">
                  Good progress — keep focusing on your weaker topics.
                </p>
              </CardContent>
            </Card>

            {/* 4 Compact Key Statistics Cards */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Stat 1: Quiz Score */}
              <Card className="border-slate-200/80 bg-white shadow-2xs hover:border-slate-300 transition">
                <CardContent className="p-5 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      Quiz Score Average
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl font-extrabold font-mono text-slate-900">
                        {calculatedMetrics.quizScore}%
                      </span>
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                        +5% this week
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 mt-1 block">
                      Across 4 adaptive quizzes
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shadow-2xs shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                </CardContent>
              </Card>

              {/* Stat 2: Flashcards Reviewed */}
              <Card className="border-slate-200/80 bg-white shadow-2xs hover:border-slate-300 transition">
                <CardContent className="p-5 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      Flashcards Reviewed
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl font-extrabold font-mono text-primary-600">
                        {calculatedMetrics.flashcardsReviewed}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">Cards</span>
                    </div>
                    <span className="text-xs text-slate-500 mt-1 block">
                      Spaced recall active queue
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-primary-50 border border-primary-100 text-primary-600 flex items-center justify-center shadow-2xs shrink-0">
                    <Layers className="w-6 h-6" />
                  </div>
                </CardContent>
              </Card>

              {/* Stat 3: Topics Mastered */}
              <Card className="border-slate-200/80 bg-white shadow-2xs hover:border-slate-300 transition">
                <CardContent className="p-5 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      Topics Mastered
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl font-extrabold font-mono text-slate-900">
                        {calculatedMetrics.masteredTopicsCount} / {calculatedMetrics.totalTopics}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">Topics</span>
                    </div>
                    <span className="text-xs text-slate-500 mt-1 block">
                      Achieving 75%+ comprehension
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center shadow-2xs shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                </CardContent>
              </Card>

              {/* Stat 4: Total Study Time */}
              <Card className="border-slate-200/80 bg-white shadow-2xs hover:border-slate-300 transition">
                <CardContent className="p-5 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      Total Study Time
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl font-extrabold font-mono text-slate-900">
                        {calculatedMetrics.studyHours}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 mt-1 block">
                      On-schedule revision hours
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shadow-2xs shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* 4. LEARNING OVERVIEW & RECOMMENDED NEXT STEP CALLOUT                  */}
          {/* ===================================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Learning Overview Bars */}
            <Card className="lg:col-span-2 border-slate-200/90 bg-white shadow-xs">
              <CardHeader className="p-5 pb-3 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-primary-600" />
                  <h4 className="text-sm font-bold text-slate-900">Learning Overview</h4>
                </div>
                <span className="text-xs text-slate-400">Pillar completion</span>
              </CardHeader>
              <CardContent className="p-5 flex flex-col gap-4">
                {/* 1. Quiz Performance */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-800">Quiz Performance</span>
                    <span className="font-mono font-bold text-slate-900">
                      {calculatedMetrics.quizPerformance}%
                    </span>
                  </div>
                  <ProgressBar
                    value={calculatedMetrics.quizPerformance}
                    max={100}
                    variant="success"
                    size="md"
                  />
                </div>

                {/* 2. Flashcard Completion */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-800">Flashcard Completion</span>
                    <span className="font-mono font-bold text-slate-900">
                      {calculatedMetrics.flashcardCompletion}%
                    </span>
                  </div>
                  <ProgressBar
                    value={calculatedMetrics.flashcardCompletion}
                    max={100}
                    variant="primary"
                    size="md"
                  />
                </div>

                {/* 3. Revision Completion */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-800">Revision Completion</span>
                    <span className="font-mono font-bold text-slate-900">
                      {calculatedMetrics.revisionCompletion}%
                    </span>
                  </div>
                  <ProgressBar
                    value={calculatedMetrics.revisionCompletion}
                    max={100}
                    variant="secondary"
                    size="md"
                  />
                </div>

                {/* 4. Topic Mastery */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-800">Topic Mastery</span>
                    <span className="font-mono font-bold text-slate-900">
                      {calculatedMetrics.avgTopicMastery}%
                    </span>
                  </div>
                  <ProgressBar
                    value={calculatedMetrics.avgTopicMastery}
                    max={100}
                    variant="warning"
                    size="md"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Recommended Next Step Callout */}
            {recommendedNextStep && (
              <Card className="border-primary-200/90 shadow-sm bg-gradient-to-br from-slate-900 via-primary-950 to-slate-900 text-white flex flex-col justify-between overflow-hidden relative">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-500/20 rounded-full blur-xl pointer-events-none" />

                <CardContent className="p-6 relative z-10 flex flex-col justify-between h-full">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary-400/20 text-primary-300 text-xs font-bold mb-2.5 border border-primary-400/30">
                      <Sparkles className="w-3 h-3" />
                      <span>Recommended Next Step</span>
                    </div>

                    <h4 className="text-xl font-extrabold tracking-tight text-white">
                      {recommendedNextStep.title}
                    </h4>

                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {recommendedNextStep.reason}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-col gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      iconRight={ArrowRight}
                      onClick={() => handleNavigate('/important-topics')}
                      className="w-full font-bold text-xs shadow-md shadow-primary-500/25 cursor-pointer justify-between"
                    >
                      <span>Review Important Topics</span>
                    </Button>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="glass"
                        size="sm"
                        onClick={() => handleNavigate('/quiz')}
                        className="text-xs text-white justify-center"
                      >
                        Take Quiz
                      </Button>
                      <Button
                        variant="glass"
                        size="sm"
                        onClick={() => handleNavigate('/flashcards')}
                        className="text-xs text-white justify-center"
                      >
                        Flashcards
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* ===================================================================== */}
          {/* 5. TOPIC MASTERY SECTION (7 Operating Systems Topics)                 */}
          {/* ===================================================================== */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900">
                  Topic Mastery
                </h4>
                <p className="text-xs text-slate-500">
                  Mastery percentage and retention status across major Operating Systems topics.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                7 Topics Evaluated
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {processedTopics.map((topic) => {
                const isMastered = topic.mastery >= 90;
                const isGood = topic.mastery >= 75 && topic.mastery < 90;
                const isNeedsPractice = topic.mastery >= 50 && topic.mastery < 75;

                const StatusIcon = topic.icon;
                const progressVariant = isMastered
                  ? 'success'
                  : isGood
                    ? 'primary'
                    : isNeedsPractice
                      ? 'warning'
                      : 'danger';

                return (
                  <Card
                    key={topic.id}
                    hoverEffect
                    className="border-slate-200/90 bg-white shadow-2xs flex flex-col justify-between"
                  >
                    <CardContent className="p-5 flex flex-col justify-between h-full">
                      <div>
                        {/* Header: Title & Status Badge */}
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <h5 className="text-sm font-bold text-slate-900 leading-snug">
                            {topic.name}
                          </h5>
                          <Badge
                            variant={topic.badgeVariant}
                            className="gap-1 text-[11px] px-2 py-0.5 shrink-0"
                          >
                            <StatusIcon className="w-3 h-3" />
                            <span>{topic.status}</span>
                          </Badge>
                        </div>

                        {/* Progress Bar & Percentage */}
                        <div className="flex justify-between items-center text-xs font-semibold text-slate-600 mb-1.5">
                          <span className="text-slate-400 font-medium">Comprehension</span>
                          <span className="font-bold font-mono text-slate-800">{topic.mastery}%</span>
                        </div>
                        <ProgressBar
                          value={topic.mastery}
                          max={100}
                          variant={progressVariant}
                          size="sm"
                        />

                        {/* Mini Activity Metadata */}
                        <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-3 pt-2.5 border-t border-slate-100">
                          <span>{topic.quizzesTaken} Quizzes Taken</span>
                          <span>•</span>
                          <span>{topic.cardsMastered} Cards Mastered</span>
                        </div>
                      </div>

                      {/* Quick Review Link */}
                      <div className="mt-4 pt-2 flex justify-end">
                        <Link
                          to="/important-topics"
                          state={{ from: '/progress', material }}
                          className="text-xs font-semibold text-primary-600 hover:text-primary-800 inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>Review Topic</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* ===================================================================== */}
          {/* 6. STRONGEST TOPICS VS TOPICS TO IMPROVE COMPARISON WIDGETS           */}
          {/* ===================================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Strongest Topics */}
            <Card className="border-emerald-100 bg-emerald-50/20 shadow-2xs">
              <CardHeader className="p-4 pb-3 border-b border-emerald-100/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <h4 className="text-sm font-bold text-slate-900">Your Strongest Topics</h4>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded">
                  Top 3 Mastery
                </span>
              </CardHeader>
              <CardContent className="p-4 flex flex-col gap-2.5">
                {strongestTopics.map((topic, idx) => (
                  <div
                    key={topic.id}
                    className="p-3 rounded-xl bg-white border border-emerald-100 shadow-2xs flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-bold text-slate-900 truncate">
                        {topic.name}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                      {topic.mastery}% Mastered
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Topics to Improve */}
            <Card className="border-amber-100 bg-amber-50/20 shadow-2xs">
              <CardHeader className="p-4 pb-3 border-b border-amber-100/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-amber-600" />
                  <h4 className="text-sm font-bold text-slate-900">Topics to Improve</h4>
                </div>
                <span className="text-xs font-bold text-amber-700 bg-amber-100/60 px-2 py-0.5 rounded">
                  Needs Revision
                </span>
              </CardHeader>
              <CardContent className="p-4 flex flex-col gap-2.5">
                {topicsToImprove.map((topic) => (
                  <div
                    key={topic.id}
                    className="p-3 rounded-xl bg-white border border-amber-100 shadow-2xs flex items-center justify-between"
                  >
                    <div className="min-w-0 pr-2">
                      <span className="text-xs font-bold text-slate-900 block truncate">
                        {topic.name}
                      </span>
                      <span className="text-[11px] text-amber-700 font-medium">
                        Score: {topic.mastery}% • Needs Practice
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleNavigate('/important-topics')}
                      className="text-xs font-semibold shrink-0 cursor-pointer"
                    >
                      Review
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* ===================================================================== */}
          {/* 7. ACTIVITY HUB: QUIZ + FLASHCARDS + REVISION ACTIVITY                */}
          {/* ===================================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Quiz Performance Card */}
            <Card className="border-slate-200/90 bg-white shadow-xs flex flex-col justify-between">
              <CardHeader className="p-4 pb-3 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-emerald-600" />
                  <h4 className="text-sm font-bold text-slate-900">Quiz Performance</h4>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-3 flex flex-col justify-between h-full gap-4">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block text-[11px]">Average Score</span>
                    <span className="font-bold font-mono text-slate-900 text-base">78%</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block text-[11px]">Best Score</span>
                    <span className="font-bold font-mono text-emerald-600 text-base">90%</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block text-[11px]">Quizzes Done</span>
                    <span className="font-bold font-mono text-slate-900 text-base">4</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block text-[11px]">Questions</span>
                    <span className="font-bold font-mono text-slate-900 text-base">40</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  iconLeft={GraduationCap}
                  onClick={() => handleNavigate('/quiz')}
                  className="w-full text-xs font-semibold cursor-pointer justify-center"
                >
                  Take a Quiz
                </Button>
              </CardContent>
            </Card>

            {/* Flashcard Activity Card */}
            <Card className="border-slate-200/90 bg-white shadow-xs flex flex-col justify-between">
              <CardHeader className="p-4 pb-3 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-primary-600" />
                  <h4 className="text-sm font-bold text-slate-900">Flashcard Activity</h4>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-3 flex flex-col justify-between h-full gap-4">
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-center">
                    <span className="text-emerald-700 block text-[11px] font-bold">Easy</span>
                    <span className="font-bold font-mono text-emerald-900 text-base">24</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-100 text-center">
                    <span className="text-amber-700 block text-[11px] font-bold">Medium</span>
                    <span className="font-bold font-mono text-amber-900 text-base">12</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-red-50 border border-red-100 text-center">
                    <span className="text-red-700 block text-[11px] font-bold">Hard</span>
                    <span className="font-bold font-mono text-red-900 text-base">6</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl">
                  <span>Total Reviewed:</span>
                  <span className="font-bold font-mono text-slate-800">42 Cards</span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  iconLeft={Layers}
                  onClick={() => handleNavigate('/flashcards')}
                  className="w-full text-xs font-semibold cursor-pointer justify-center"
                >
                  Practice Flashcards
                </Button>
              </CardContent>
            </Card>

            {/* Revision Activity Card */}
            <Card className="border-slate-200/90 bg-white shadow-xs flex flex-col justify-between">
              <CardHeader className="p-4 pb-3 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <h4 className="text-sm font-bold text-slate-900">Revision Activity</h4>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-3 flex flex-col justify-between h-full gap-4">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block text-[11px]">Sessions</span>
                    <span className="font-bold font-mono text-slate-900 text-base">9 / 12</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 block text-[11px]">Completion</span>
                    <span className="font-bold font-mono text-emerald-600 text-base">75%</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl">
                  <span>Study Time Tracked:</span>
                  <span className="font-bold font-mono text-slate-800">6h 30m</span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  iconLeft={Calendar}
                  onClick={() => handleNavigate('/revision-plan')}
                  className="w-full text-xs font-semibold cursor-pointer justify-center"
                >
                  View Planner
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* ===================================================================== */}
          {/* 8. WEEKLY ACTIVITY BAR CHART + STUDY STREAK + RECENT ACTIVITY FEED    */}
          {/* ===================================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 7-Day Weekly Activity Bar Chart */}
            <Card className="lg:col-span-2 border-slate-200/90 bg-white shadow-xs">
              <CardHeader className="p-5 pb-3 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-primary-600" />
                  <h4 className="text-sm font-bold text-slate-900">Weekly Activity</h4>
                </div>
                <span className="text-xs font-mono font-bold text-primary-600 bg-primary-50 px-2.5 py-0.5 rounded-full border border-primary-100">
                  {totalWeeklyMins} mins total (5h 50m)
                </span>
              </CardHeader>
              <CardContent className="p-5 flex flex-col justify-between gap-6">
                {/* Lightweight Custom CSS Bar Visualization */}
                <div className="flex items-end justify-between gap-2 sm:gap-4 h-40 pt-4 px-2">
                  {weeklyActivity.map((dayItem) => (
                    <div
                      key={dayItem.day}
                      className="flex-1 flex flex-col items-center gap-2 h-full justify-end group"
                    >
                      {/* Bar Value Tooltip */}
                      <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-600 opacity-80 group-hover:opacity-100 group-hover:text-primary-600 transition-all">
                        {dayItem.mins}m
                      </span>

                      {/* Bar Container */}
                      <div className="w-full max-w-[36px] bg-slate-100 rounded-t-lg h-28 flex items-end overflow-hidden p-0.5">
                        <div
                          style={{ height: `${dayItem.height}%` }}
                          className="w-full bg-primary-500 group-hover:bg-primary-600 transition-all duration-300 rounded-t-md shadow-2xs"
                          title={`${dayItem.fullDay}: ${dayItem.mins} mins (${dayItem.sessions} sessions)`}
                        />
                      </div>

                      {/* Day Label */}
                      <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900">
                        {dayItem.day}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100">
                  <span>Target: 45 min / day</span>
                  <span className="text-emerald-600 font-semibold">Consistent daily study pace</span>
                </div>
              </CardContent>
            </Card>

            {/* Study Streak & Recent Activity Column */}
            <div className="flex flex-col gap-4">
              {/* Study Streak Card */}
              <Card className="border-amber-200/90 bg-gradient-to-br from-white via-amber-50/20 to-amber-50/40 shadow-xs">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-base shadow-2xs shrink-0">
                      <Flame className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 block">
                        Study Streak
                      </span>
                      <h5 className="text-xl font-extrabold text-slate-900">4 Days 🔥</h5>
                      <span className="text-xs text-slate-500">Keep your streak going!</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Best Streak
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200 mt-0.5 inline-block">
                      7 Days
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity Feed */}
              <Card className="border-slate-200/90 bg-white shadow-xs flex-1 flex flex-col justify-between">
                <CardHeader className="p-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900">Recent Activity</h4>
                </CardHeader>
                <CardContent className="p-4 flex flex-col gap-3">
                  {recentActivities.map((act) => {
                    const Icon = act.icon;
                    return (
                      <div
                        key={act.id}
                        className="flex items-start gap-3 pb-2.5 border-b border-slate-100 last:border-0 last:pb-0"
                      >
                        <div className={`p-2 rounded-xl border shrink-0 mt-0.5 ${act.color}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-xs font-bold text-slate-900 block truncate">
                            {act.title}
                          </span>
                          <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                            <span>{act.time}</span>
                            <span>•</span>
                            <span className="font-semibold text-slate-600">{act.badge}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* 9. AI & STUDY GUIDANCE DISCLAIMER FOOTER CARD                          */}
          {/* ===================================================================== */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center flex items-center justify-center text-xs text-slate-500">
            <span className="inline-flex items-center gap-1 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-primary-500" />
              Progress insights are based on your available study activity and quiz performance.
            </span>
          </div>
        </div>
    </div>
  );
}
