import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  Sparkles,
  Flame,
  FileText,
  Network,
  Layers,
  GraduationCap,
  Play,
  Sliders,
  Check,
  TrendingUp,
  Target,
  Zap,
  CheckCheck,
  CalendarDays,
  Circle,
  Sun,
  Sunset,
  Moon
} from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import BackButton from '../components/ui/BackButton';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';
import Modal from '../components/ui/Modal';
import { useToast } from '../components/ui/Toast';

export default function RevisionPlan() {
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

  // Active Selected Day of the Week (Mon..Sun)
  const [selectedDayKey, setSelectedDayKey] = useState('Mon');

  // Active Focused Revision Modal State (topic session object or null)
  const [activeRevisionSession, setActiveRevisionSession] = useState(null);

  // Customize Plan Modal State
  const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);
  const [customDailyTime, setCustomDailyTime] = useState('2h'); // '30m' | '1h' | '2h' | '3h'
  const [customPeriod, setCustomPeriod] = useState('morning'); // 'morning' | 'afternoon' | 'evening' | 'flexible'
  const [customFocus, setCustomFocus] = useState('high'); // 'high' | 'weak' | 'all'

  // Weekly Days Definition
  const daysOfWeek = useMemo(
    () => [
      { key: 'Mon', label: 'Mon', fullName: 'Monday', date: 'Oct 20', isToday: true },
      { key: 'Tue', label: 'Tue', fullName: 'Tuesday', date: 'Oct 21', isToday: false },
      { key: 'Wed', label: 'Wed', fullName: 'Wednesday', date: 'Oct 22', isToday: false },
      { key: 'Thu', label: 'Thu', fullName: 'Thursday', date: 'Oct 23', isToday: false },
      { key: 'Fri', label: 'Fri', fullName: 'Friday', date: 'Oct 24', isToday: false },
      { key: 'Sat', label: 'Sat', fullName: 'Saturday', date: 'Oct 25', isToday: false },
      { key: 'Sun', label: 'Sun', fullName: 'Sunday', date: 'Oct 26', isToday: false },
    ],
    []
  );

  // Default Structured Sessions Dataset across the 7 days of the week
  const initialWeeklySchedule = useMemo(
    () => ({
      Mon: [
        {
          id: 'ses-mon-1',
          time: '9:00 AM',
          topic: 'Memory Management',
          duration: 45,
          priority: 'High',
          focusAreas: ['Paging & Page Tables', 'Virtual Memory', 'Page Replacement (FIFO/LRU)'],
          status: 'In Progress', // 'Upcoming' | 'In Progress' | 'Completed'
          description: 'Focus on non-contiguous allocation and page fault handling routines.',
          recommendedRoute: '/summary',
        },
        {
          id: 'ses-mon-2',
          time: '11:00 AM',
          topic: 'CPU Scheduling',
          duration: 40,
          priority: 'High',
          focusAreas: ['FCFS', 'Round Robin & Time Quantum', 'Priority Scheduling & Aging'],
          status: 'Upcoming',
          description: 'Review turnaround time formulas, waiting time, and preemption mechanics.',
          recommendedRoute: '/summary',
        },
        {
          id: 'ses-mon-3',
          time: '4:00 PM',
          topic: 'Flashcard Review & Recall',
          duration: 20,
          priority: 'Medium',
          focusAreas: ['Operating Systems Key Concepts', 'Terminology & Definitions'],
          status: 'Upcoming',
          description: 'Rapid active-recall session targeting high-yield exam keywords.',
          recommendedRoute: '/flashcards',
        },
      ],
      Tue: [
        {
          id: 'ses-tue-1',
          time: '9:30 AM',
          topic: 'Virtual Memory & Thrashing',
          duration: 45,
          priority: 'High',
          focusAreas: ['Demand Paging', 'Thrashing & Working Set Model', 'TLB Translation'],
          status: 'Upcoming',
          description: 'Study page fault frequency management and Belady\'s anomaly examples.',
          recommendedRoute: '/mind-map',
        },
        {
          id: 'ses-tue-2',
          time: '2:00 PM',
          topic: 'Process Synchronization',
          duration: 40,
          priority: 'Medium',
          focusAreas: ['Critical Section', 'Mutex & Semaphores', 'Peterson\'s Algorithm'],
          status: 'Upcoming',
          description: 'Deep dive into race condition elimination and lock synchronization.',
          recommendedRoute: '/flashcards',
        },
        {
          id: 'ses-tue-3',
          time: '5:30 PM',
          topic: 'Adaptive Quiz Practice',
          duration: 25,
          priority: 'High',
          focusAreas: ['10 Multi-Topic Questions', 'Mistake Analysis'],
          status: 'Upcoming',
          description: 'Diagnostic test assessing retention across Memory and Scheduling.',
          recommendedRoute: '/quiz',
        },
      ],
      Wed: [
        {
          id: 'ses-wed-1',
          time: '10:00 AM',
          topic: 'File Systems & Storage',
          duration: 40,
          priority: 'Medium',
          focusAreas: ['Inodes & Metadata', 'Indexed vs Linked Allocation', 'Directory Trees'],
          status: 'Upcoming',
          description: 'Master storage block allocation schemes and directory indexing.',
          recommendedRoute: '/summary',
        },
        {
          id: 'ses-wed-2',
          time: '3:30 PM',
          topic: 'Deadlocks & Avoidance',
          duration: 35,
          priority: 'Low',
          focusAreas: ['4 Coffman Conditions', 'Banker\'s Algorithm', 'Safe vs Unsafe States'],
          status: 'Upcoming',
          description: 'Refresher on resource allocation graphs and matrix safety checks.',
          recommendedRoute: '/mind-map',
        },
      ],
      Thu: [
        {
          id: 'ses-thu-1',
          time: '9:00 AM',
          topic: 'Process Management & Fork',
          duration: 35,
          priority: 'Low',
          focusAreas: ['PCB Architecture', 'Context Switch Overhead', 'Process Lifecycle'],
          status: 'Upcoming',
          description: 'Brief overview of thread vs process address spaces.',
          recommendedRoute: '/summary',
        },
        {
          id: 'ses-thu-2',
          time: '11:30 AM',
          topic: 'Memory Management Part 2',
          duration: 45,
          priority: 'High',
          focusAreas: ['Segmentation', 'Multi-level Paging', 'Inverted Page Tables'],
          status: 'Upcoming',
          description: 'Solve memory address offset computation problem sets.',
          recommendedRoute: '/summary',
        },
        {
          id: 'ses-thu-3',
          time: '4:00 PM',
          topic: 'Spaced Recall Flashcards',
          duration: 20,
          priority: 'Medium',
          focusAreas: ['All 28 Flashcards Deck', 'Spaced Repetition Review'],
          status: 'Upcoming',
          description: 'Review cards marked with difficulty in previous sessions.',
          recommendedRoute: '/flashcards',
        },
      ],
      Fri: [
        {
          id: 'ses-fri-1',
          time: '10:00 AM',
          topic: 'CPU Scheduling Algorithms Drill',
          duration: 45,
          priority: 'High',
          focusAreas: ['Gantt Chart Problems', 'Average Turnaround & Waiting Calculations'],
          status: 'Upcoming',
          description: 'Solve numerical scheduling questions typical of midterm exams.',
          recommendedRoute: '/summary',
        },
        {
          id: 'ses-fri-2',
          time: '2:30 PM',
          topic: 'Concurrency & Deadlocks Quiz',
          duration: 30,
          priority: 'High',
          focusAreas: ['Banker\'s Calculation', 'Semaphore Code Tracing'],
          status: 'Upcoming',
          description: 'Timed quiz testing synchronization primitives and deadlock proofs.',
          recommendedRoute: '/quiz',
        },
      ],
      Sat: [
        {
          id: 'ses-sat-1',
          time: '11:00 AM',
          topic: 'Full Mind Map Conceptual Review',
          duration: 50,
          priority: 'Medium',
          focusAreas: ['Cross-Topic Linkages', 'Visual Knowledge Graph Navigation'],
          status: 'Upcoming',
          description: 'Trace relationships between virtual memory, scheduling, and file systems.',
          recommendedRoute: '/mind-map',
        },
        {
          id: 'ses-sat-2',
          time: '3:00 PM',
          topic: 'Weak Topics Consolidation',
          duration: 40,
          priority: 'High',
          focusAreas: ['Memory Management', 'Virtual Memory Page Faults'],
          status: 'Upcoming',
          description: 'Targeted reinforcement on items with lowest quiz accuracy.',
          recommendedRoute: '/summary',
        },
      ],
      Sun: [
        {
          id: 'ses-sun-1',
          time: '4:00 PM',
          topic: 'Weekly Revision Milestone Quiz',
          duration: 40,
          priority: 'Medium',
          focusAreas: ['Comprehensive 15-Question Exam', 'Weekly Progress Evaluation'],
          status: 'Upcoming',
          description: 'End-of-week test to measure retention gains across all unit topics.',
          recommendedRoute: '/quiz',
        },
      ],
    }),
    []
  );

  // Active schedule state in local React state
  const [weeklySchedule, setWeeklySchedule] = useState(initialWeeklySchedule);

  // Toggle Session Completion Handler
  const handleToggleComplete = (dayKey, sessionId, e) => {
    if (e) e.stopPropagation();

    const daySessions = weeklySchedule[dayKey] || [];
    const currentSession = daySessions.find((s) => s.id === sessionId);
    const isNowCompleted = currentSession?.status !== 'Completed';

    setWeeklySchedule((prev) => {
      const prevDaySessions = prev[dayKey] || [];
      const updated = prevDaySessions.map((s) => {
        if (s.id === sessionId) {
          const newStatus = s.status === 'Completed' ? 'Upcoming' : 'Completed';
          return { ...s, status: newStatus };
        }
        return s;
      });

      return {
        ...prev,
        [dayKey]: updated,
      };
    });

    if (isNowCompleted) {
      toast.success(`Completed "${currentSession?.topic}"! (+${currentSession?.duration} min)`);
    } else {
      toast.info(`Marked "${currentSession?.topic}" as upcoming.`);
    }
  };

  // Deterministic Plan Generator
  const handleGenerateNewPlan = () => {
    let durationMultiplier = 1;
    if (customDailyTime === '30m') durationMultiplier = 0.5;
    else if (customDailyTime === '1h') durationMultiplier = 0.8;
    else if (customDailyTime === '2h') durationMultiplier = 1;
    else if (customDailyTime === '3h') durationMultiplier = 1.4;

    const timeSlots = {
      morning: ['8:30 AM', '10:30 AM', '11:45 AM'],
      afternoon: ['1:30 PM', '3:00 PM', '4:30 PM'],
      evening: ['6:00 PM', '7:30 PM', '8:45 PM'],
      flexible: ['9:00 AM', '2:00 PM', '7:00 PM'],
    }[customPeriod];

    const newSchedule = {};

    daysOfWeek.forEach((day, dayIdx) => {
      let topicsForDay = [];

      if (customFocus === 'high') {
        topicsForDay = [
          {
            topic: 'Memory Management',
            priority: 'High',
            duration: Math.round(45 * durationMultiplier),
            focusAreas: ['Paging', 'Virtual Memory', 'Page Replacement'],
            route: '/summary',
          },
          {
            topic: 'CPU Scheduling',
            priority: 'High',
            duration: Math.round(40 * durationMultiplier),
            focusAreas: ['FCFS', 'Round Robin', 'Priority Scheduling'],
            route: '/summary',
          },
          {
            topic: 'Virtual Memory & Thrashing',
            priority: 'High',
            duration: Math.round(35 * durationMultiplier),
            focusAreas: ['Demand Paging', 'Page Faults', 'TLB'],
            route: '/mind-map',
          },
        ];
      } else if (customFocus === 'weak') {
        topicsForDay = [
          {
            topic: 'Memory Management (Lowest Accuracy)',
            priority: 'High',
            duration: Math.round(50 * durationMultiplier),
            focusAreas: ['Address Translation', 'Page Tables', 'Fragmentation'],
            route: '/summary',
          },
          {
            topic: 'Process Synchronization',
            priority: 'Medium',
            duration: Math.round(40 * durationMultiplier),
            focusAreas: ['Critical Section', 'Mutex & Semaphores', 'Peterson\'s'],
            route: '/flashcards',
          },
        ];
      } else {
        // 'all' balanced focus
        const catalog = [
          { topic: 'Memory Management', priority: 'High', duration: 40, route: '/summary', focusAreas: ['Paging', 'Virtual Memory'] },
          { topic: 'CPU Scheduling', priority: 'High', duration: 35, route: '/summary', focusAreas: ['FCFS', 'Round Robin'] },
          { topic: 'Process Synchronization', priority: 'Medium', duration: 35, route: '/flashcards', focusAreas: ['Mutex', 'Semaphores'] },
          { topic: 'File Systems', priority: 'Medium', duration: 30, route: '/summary', focusAreas: ['Inodes', 'Indexed Allocation'] },
          { topic: 'Deadlocks', priority: 'Low', duration: 30, route: '/mind-map', focusAreas: ['Banker\'s Algorithm', 'Coffman'] },
          { topic: 'Process Management', priority: 'Low', duration: 25, route: '/quiz', focusAreas: ['PCB', 'Context Switching'] },
        ];
        const t1 = catalog[dayIdx % catalog.length];
        const t2 = catalog[(dayIdx + 2) % catalog.length];
        topicsForDay = [
          { ...t1, duration: Math.round(t1.duration * durationMultiplier) },
          { ...t2, duration: Math.round(t2.duration * durationMultiplier) },
        ];
      }

      newSchedule[day.key] = topicsForDay.map((t, idx) => ({
        id: `custom-${day.key}-${idx}-${Date.now()}`,
        time: timeSlots[idx % timeSlots.length],
        topic: t.topic,
        duration: t.duration,
        priority: t.priority,
        focusAreas: t.focusAreas,
        status: idx === 0 && day.key === 'Mon' ? 'In Progress' : 'Upcoming',
        description: `Customized session based on ${customFocus} priority focus and ${customDailyTime} daily target.`,
        recommendedRoute: t.route,
      }));
    });

    setWeeklySchedule(newSchedule);
    setIsCustomizeModalOpen(false);
    toast.success('Generated new revision schedule successfully!');
  };

  // Active Sessions for Selected Day
  const activeDaySessions = useMemo(() => {
    return weeklySchedule[selectedDayKey] || [];
  }, [weeklySchedule, selectedDayKey]);

  // Overall Plan Metrics (Calculated dynamically across the entire weekly schedule)
  const overallMetrics = useMemo(() => {
    let totalSessions = 0;
    let totalMinutes = 0;
    const topicSet = new Set();
    let highPriorityCount = 0;

    Object.values(weeklySchedule).forEach((sessions) => {
      sessions.forEach((s) => {
        totalSessions += 1;
        totalMinutes += s.duration || 0;
        topicSet.add(s.topic);
        if (s.priority === 'High') highPriorityCount += 1;
      });
    });

    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    const timeFormatted = hours > 0 ? `${hours}h ${mins > 0 ? `${mins}m` : ''}` : `${mins}m`;

    return {
      totalTopics: Math.max(7, topicSet.size),
      totalSessions,
      totalMinutes,
      plannedTimeFormatted: timeFormatted,
      highPriorityTopicsCount: 3, // Core high priority concepts
      todaySessionsCount: activeDaySessions.length,
    };
  }, [weeklySchedule, activeDaySessions]);

  // Daily Progress Calculations for Selected Day
  const dailyProgress = useMemo(() => {
    const total = activeDaySessions.length;
    const completed = activeDaySessions.filter((s) => s.status === 'Completed').length;
    const totalPlannedMins = activeDaySessions.reduce((acc, s) => acc + s.duration, 0);
    const completedMins = activeDaySessions
      .filter((s) => s.status === 'Completed')
      .reduce((acc, s) => acc + s.duration, 0);

    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      totalSessions: total,
      completedSessions: completed,
      totalPlannedMins,
      completedMins,
      percentage,
    };
  }, [activeDaySessions]);

  // Weekly Progress per Day
  const weeklyProgressData = useMemo(() => {
    return daysOfWeek.map((day) => {
      const sessions = weeklySchedule[day.key] || [];
      const total = sessions.length;
      const completed = sessions.filter((s) => s.status === 'Completed').length;
      const isComplete = total > 0 && completed === total;
      return {
        ...day,
        total,
        completed,
        isComplete,
      };
    });
  }, [daysOfWeek, weeklySchedule]);

  // Priority Distribution Time Breakdown (Calculated from weekly plan)
  const priorityDistribution = useMemo(() => {
    let highMins = 0;
    let medMins = 0;
    let lowMins = 0;

    Object.values(weeklySchedule).forEach((sessions) => {
      sessions.forEach((s) => {
        if (s.priority === 'High') highMins += s.duration;
        else if (s.priority === 'Medium') medMins += s.duration;
        else lowMins += s.duration;
      });
    });

    const formatMins = (m) => {
      const h = Math.floor(m / 60);
      const rem = m % 60;
      return h > 0 ? `${h}h ${rem > 0 ? `${rem}m` : ''}` : `${rem}m`;
    };

    const total = highMins + medMins + lowMins || 1;

    return {
      high: { mins: highMins, formatted: formatMins(highMins), pct: Math.round((highMins / total) * 100) },
      medium: { mins: medMins, formatted: formatMins(medMins), pct: Math.round((medMins / total) * 100) },
      low: { mins: lowMins, formatted: formatMins(lowMins), pct: Math.round((lowMins / total) * 100) },
    };
  }, [weeklySchedule]);

  // Upcoming Revision Sessions (future non-completed sessions outside currently selected day or in current day)
  const upcomingRevisionList = useMemo(() => {
    const list = [];
    Object.entries(weeklySchedule).forEach(([dayKey, sessions]) => {
      const dayObj = daysOfWeek.find((d) => d.key === dayKey);
      sessions.forEach((s) => {
        if (s.status !== 'Completed' && list.length < 3) {
          list.push({
            ...s,
            dayName: dayObj?.fullName || dayKey,
            dayDate: dayObj?.date || '',
          });
        }
      });
    });
    return list;
  }, [weeklySchedule, daysOfWeek]);

  // Recently Completed Sessions across all days
  const recentlyCompletedList = useMemo(() => {
    const list = [];
    Object.entries(weeklySchedule).forEach(([dayKey, sessions]) => {
      const dayObj = daysOfWeek.find((d) => d.key === dayKey);
      sessions.forEach((s) => {
        if (s.status === 'Completed') {
          list.push({
            ...s,
            dayName: dayObj?.fullName || dayKey,
          });
        }
      });
    });
    return list;
  }, [weeklySchedule, daysOfWeek]);

  // Selected Day Object
  const selectedDayObj = daysOfWeek.find((d) => d.key === selectedDayKey) || daysOfWeek[0];

  // Helper Navigation Preserving Route Context
  const handleNavigateToResource = (route) => {
    navigate(route, {
      state: {
        from: '/revision-plan',
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
          fallback="/important-topics"
          to={location.state?.from || '/important-topics'}
        />

        <PageHeader
          title="Revision Planner"
          description="Plan your revision and stay focused on what matters most."
        >
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              iconLeft={Sliders}
              onClick={() => setIsCustomizeModalOpen(true)}
              className="font-semibold text-xs cursor-pointer"
            >
              Customize Plan
            </Button>
          </div>
        </PageHeader>
      </div>

      {/* ========================================================================= */}
      {/* 2. SOURCE MATERIAL CARD                                                   */}
      {/* ========================================================================= */}
      <Card className="border-slate-200/80 bg-white shadow-xs overflow-hidden">
        <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-primary-50 border border-primary-100 text-primary-600 flex items-center justify-center font-bold text-sm shadow-2xs shrink-0">
              <CalendarDays className="w-6 h-6" />
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

          <div className="flex items-center gap-2 shrink-0">
            <Badge variant="primary" className="gap-1.5 px-3 py-1 text-xs">
              <CalendarIcon className="w-3.5 h-3.5 text-primary-600" />
              <span>Study Plan</span>
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-6 animate-in fade-in duration-200">
          {/* ===================================================================== */}
          {/* 4. PLAN OVERVIEW CARD (Heading, Description, 4 Metric Pills)          */}
          {/* ===================================================================== */}
          <Card className="border-slate-200/90 shadow-xs bg-gradient-to-br from-white via-slate-50/40 to-primary-50/25">
            <CardContent className="p-5 sm:p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary-50 text-primary-700 text-xs font-bold border border-primary-100 mb-2">
                    <Zap className="w-3.5 h-3.5 text-primary-600" />
                    <span>Active Study Roadmap</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    Your Revision Plan
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    A structured study plan based on your current revision priorities.
                  </p>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  iconLeft={Sliders}
                  onClick={() => setIsCustomizeModalOpen(true)}
                  className="font-bold text-xs shadow-xs self-start md:self-auto cursor-pointer"
                >
                  Customize Plan
                </Button>
              </div>

              {/* 4 Key Statistics Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Curriculum Coverage
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-2xl font-extrabold font-mono text-slate-900">
                      {overallMetrics.totalTopics}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">Topics</span>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">
                    Full Operating Systems syllabus
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Weekly Sessions
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-2xl font-extrabold font-mono text-primary-600">
                      {overallMetrics.totalSessions}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">Study Sessions</span>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">
                    Distributed across 7 days
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Total Study Time
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-2xl font-extrabold font-mono text-slate-900">
                      {overallMetrics.plannedTimeFormatted}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">Planned</span>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">
                    Optimal spacing duration
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-red-600 block">
                    Urgent Focus
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-2xl font-extrabold font-mono text-red-600">
                      {overallMetrics.highPriorityTopicsCount}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">High-Priority Topics</span>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">
                    Targeting weak quiz areas
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ===================================================================== */}
          {/* 5. STUDY DATE / PERIOD: INTERACTIVE WEEK SELECTOR                    */}
          {/* ===================================================================== */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-primary-600" />
                <h4 className="text-sm font-bold text-slate-900">
                  Planning Period: <span className="text-primary-600">This Week</span>
                </h4>
              </div>
              <span className="text-xs text-slate-400">
                Select a day to inspect and start sessions
              </span>
            </div>

            <div className="grid grid-cols-7 gap-2 p-2 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
              {daysOfWeek.map((day) => {
                const isSelected = selectedDayKey === day.key;
                const sessions = weeklySchedule[day.key] || [];
                const completedCount = sessions.filter((s) => s.status === 'Completed').length;
                const allDone = sessions.length > 0 && completedCount === sessions.length;

                return (
                  <button
                    key={day.key}
                    type="button"
                    onClick={() => setSelectedDayKey(day.key)}
                    className={`
                      flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl transition-all duration-150 cursor-pointer select-none
                      ${
                        isSelected
                          ? 'bg-primary-600 text-white shadow-md shadow-primary-500/25 scale-[1.02]'
                          : 'bg-slate-50/70 hover:bg-slate-100 text-slate-700 border border-slate-100'
                      }
                    `}
                  >
                    <span
                      className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${
                        isSelected ? 'text-primary-100' : 'text-slate-400'
                      }`}
                    >
                      {day.label}
                    </span>

                    <span className="text-sm sm:text-base font-extrabold font-mono mt-0.5">
                      {day.date.split(' ')[1]}
                    </span>

                    {/* Completion indicators */}
                    <div className="flex items-center gap-1 mt-1.5">
                      {sessions.length > 0 ? (
                        allDone ? (
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isSelected ? 'bg-emerald-300' : 'bg-emerald-500'
                            }`}
                            title="All sessions completed"
                          />
                        ) : (
                          <span
                            className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full ${
                              isSelected
                                ? 'bg-white/20 text-white'
                                : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {completedCount}/{sessions.length}
                          </span>
                        )
                      ) : (
                        <span className="text-[10px] text-slate-300">-</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ===================================================================== */}
          {/* 6. MAIN CONTENT TWO-COLUMN LAYOUT                                     */}
          {/* ===================================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ------------------------------------------------------------------- */}
            {/* LEFT COLUMN (2/3): TODAY'S PLAN / ACTIVE DAY STUDY SESSIONS         */}
            {/* ------------------------------------------------------------------- */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span>
                      {selectedDayObj.isToday ? "Today's Plan" : `${selectedDayObj.fullName}'s Plan`}
                    </span>
                    <span className="text-xs font-normal text-slate-400">
                      ({selectedDayObj.date})
                    </span>
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {activeDaySessions.length} revision {activeDaySessions.length === 1 ? 'session' : 'sessions'} scheduled.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                    {dailyProgress.completedMins} / {dailyProgress.totalPlannedMins} min done
                  </span>
                </div>
              </div>

              {/* Zero Sessions Scheduled for Day State */}
              {activeDaySessions.length === 0 && (
                <Card className="border-dashed border-slate-200 p-8 text-center bg-white">
                  <CardContent className="flex flex-col items-center">
                    <CalendarIcon className="w-8 h-8 text-slate-300 mb-2" />
                    <h5 className="text-sm font-bold text-slate-700">No sessions scheduled</h5>
                    <p className="text-xs text-slate-400 mt-1">Enjoy your rest day or customize your plan.</p>
                  </CardContent>
                </Card>
              )}

              {/* Study Session Cards List */}
              <div className="flex flex-col gap-3.5">
                {activeDaySessions.map((session) => {
                  const isCompleted = session.status === 'Completed';
                  const isInProgress = session.status === 'In Progress';
                  const isUpcoming = session.status === 'Upcoming';

                  const isHigh = session.priority === 'High';
                  const isMedium = session.priority === 'Medium';

                  return (
                    <Card
                      key={session.id}
                      hoverEffect={!isCompleted}
                      className={`
                        transition-all duration-200 border
                        ${
                          isCompleted
                            ? 'bg-slate-50/70 border-emerald-200/80 opacity-85'
                            : isInProgress
                              ? 'bg-white border-primary-400 shadow-md ring-2 ring-primary-100'
                              : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-2xs'
                        }
                      `}
                    >
                      <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        {/* Left Checkbox & Time Pill */}
                        <div className="flex items-start gap-3.5 min-w-0 flex-1">
                          {/* Mark Complete Checkbox Button */}
                          <button
                            type="button"
                            onClick={(e) => handleToggleComplete(selectedDayKey, session.id, e)}
                            className={`
                              mt-1 w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-all cursor-pointer select-none
                              ${
                                isCompleted
                                  ? 'bg-emerald-600 text-white shadow-2xs hover:bg-emerald-700'
                                  : 'border-2 border-slate-300 text-transparent hover:border-emerald-500 hover:text-emerald-500'
                              }
                            `}
                            title={isCompleted ? 'Mark as incomplete' : 'Mark session as completed'}
                          >
                            <Check className="w-4 h-4 stroke-[3]" />
                          </button>

                          {/* Session Info */}
                          <div className="min-w-0 flex-1">
                            {/* Meta row: Time, Duration, Priority Badge, Status Badge */}
                            <div className="flex flex-wrap items-center gap-2 mb-1.5">
                              <span className="text-xs font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                                {session.time}
                              </span>
                              <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                                <Clock className="w-3 h-3 text-slate-400" />
                                {session.duration} min
                              </span>
                              <Badge
                                variant={isHigh ? 'danger' : isMedium ? 'warning' : 'success'}
                                className="text-[10px] px-2 py-0.2"
                              >
                                {session.priority} Priority
                              </Badge>

                              {/* State badge: text + icon + visual styling */}
                              {isCompleted && (
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                                  <CheckCheck className="w-3 h-3" />
                                  <span>Completed</span>
                                </span>
                              )}
                              {isInProgress && (
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-primary-700 bg-primary-50 border border-primary-200 px-2 py-0.5 rounded-full animate-pulse">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary-600" />
                                  <span>In Progress</span>
                                </span>
                              )}
                              {isUpcoming && (
                                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                                  <Circle className="w-2.5 h-2.5 text-slate-400" />
                                  <span>Upcoming</span>
                                </span>
                              )}
                            </div>

                            {/* Topic Title */}
                            <h5
                              className={`text-base font-bold transition-colors ${
                                isCompleted
                                  ? 'line-through text-slate-500'
                                  : 'text-slate-900 group-hover:text-primary-600'
                              }`}
                            >
                              {session.topic}
                            </h5>

                            {/* Description */}
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                              {session.description}
                            </p>

                            {/* Focus Concepts Pills */}
                            <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                              <span className="text-[11px] font-bold text-slate-400 mr-0.5">
                                Focus:
                              </span>
                              {session.focusAreas.map((concept, idx) => (
                                <span
                                  key={idx}
                                  className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${
                                    isCompleted
                                      ? 'bg-slate-100 text-slate-400'
                                      : 'bg-slate-100 text-slate-700'
                                  }`}
                                >
                                  {concept}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right Action Buttons */}
                        <div className="flex sm:flex-col items-center gap-2 shrink-0 self-end sm:self-center w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                          <Button
                            variant={isCompleted ? 'outline' : 'primary'}
                            size="sm"
                            iconLeft={Play}
                            onClick={() => setActiveRevisionSession(session)}
                            className="w-full sm:w-auto font-bold text-xs shadow-xs cursor-pointer justify-center"
                          >
                            {isCompleted ? 'Review Again' : 'Start Revision'}
                          </Button>

                          <button
                            type="button"
                            onClick={(e) => handleToggleComplete(selectedDayKey, session.id, e)}
                            className="text-xs text-slate-500 hover:text-slate-800 font-medium py-1 px-2 hover:underline cursor-pointer"
                          >
                            {isCompleted ? 'Mark Incomplete' : 'Mark Complete'}
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* ------------------------------------------------------------------- */}
            {/* RIGHT COLUMN (1/3): PROGRESS, STREAK, PRIORITY, WEEKLY SUMMARY     */}
            {/* ------------------------------------------------------------------- */}
            <div className="flex flex-col gap-5">
              {/* TODAY'S PROGRESS CARD */}
              <Card className="border-slate-200/90 shadow-xs bg-white">
                <CardHeader className="p-4 pb-3 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary-600" />
                    <h4 className="text-sm font-bold text-slate-900">Today's Progress</h4>
                  </div>
                  <span className="text-xs font-mono font-bold text-primary-600">
                    {dailyProgress.percentage}%
                  </span>
                </CardHeader>
                <CardContent className="p-4 pt-3 flex flex-col gap-3">
                  <ProgressBar
                    value={dailyProgress.percentage}
                    max={100}
                    variant={dailyProgress.percentage === 100 ? 'success' : 'primary'}
                    size="md"
                  />

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-slate-400 block text-[11px]">Sessions Done</span>
                      <span className="font-bold font-mono text-slate-800 text-sm">
                        {dailyProgress.completedSessions} / {dailyProgress.totalSessions}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-slate-400 block text-[11px]">Time Completed</span>
                      <span className="font-bold font-mono text-slate-800 text-sm">
                        {dailyProgress.completedMins} / {dailyProgress.totalPlannedMins} min
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 mt-1">
                    {dailyProgress.percentage === 100
                      ? "Outstanding! You've finished all sessions scheduled for today."
                      : dailyProgress.percentage > 0
                        ? 'Great momentum! Keep going to hit your daily study goal.'
                        : 'Start your first scheduled session to begin tracking progress.'}
                  </p>
                </CardContent>
              </Card>

              {/* STUDY STREAK CARD */}
              <Card className="border-amber-200/80 bg-gradient-to-br from-white via-amber-50/20 to-amber-50/40 shadow-xs">
                <CardContent className="p-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-base shadow-2xs shrink-0">
                      <Flame className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 block">
                        Study Streak
                      </span>
                      <h5 className="text-lg font-extrabold text-slate-900">4 Days 🔥</h5>
                      <span className="text-xs text-slate-500">Keep your streak going!</span>
                    </div>
                  </div>

                  <Badge variant="warning" className="text-xs font-bold px-2 py-0.5">
                    Consistent
                  </Badge>
                </CardContent>
              </Card>

              {/* PRIORITY DISTRIBUTION CARD */}
              <Card className="border-slate-200/90 shadow-xs bg-white">
                <CardHeader className="p-4 pb-3 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary-600" />
                      <h4 className="text-sm font-bold text-slate-900">Study Priority</h4>
                    </div>
                    <span className="text-xs text-slate-400">Weekly plan</span>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-3 flex flex-col gap-3">
                  {/* Visual Multi-Segment Bar */}
                  <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden flex">
                    <div
                      style={{ width: `${priorityDistribution.high.pct}%` }}
                      className="bg-red-500 h-full"
                      title={`High Priority: ${priorityDistribution.high.formatted}`}
                    />
                    <div
                      style={{ width: `${priorityDistribution.medium.pct}%` }}
                      className="bg-amber-400 h-full"
                      title={`Medium Priority: ${priorityDistribution.medium.formatted}`}
                    />
                    <div
                      style={{ width: `${priorityDistribution.low.pct}%` }}
                      className="bg-emerald-500 h-full"
                      title={`Low Priority: ${priorityDistribution.low.formatted}`}
                    />
                  </div>

                  {/* Priority Breakdown Items */}
                  <div className="flex flex-col gap-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" />
                        <span className="font-semibold text-slate-700">High Priority</span>
                      </div>
                      <span className="font-mono font-bold text-slate-900">
                        {priorityDistribution.high.formatted} ({priorityDistribution.high.pct}%)
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
                        <span className="font-semibold text-slate-700">Medium Priority</span>
                      </div>
                      <span className="font-mono font-bold text-slate-900">
                        {priorityDistribution.medium.formatted} ({priorityDistribution.medium.pct}%)
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                        <span className="font-semibold text-slate-700">Low Priority</span>
                      </div>
                      <span className="font-mono font-bold text-slate-900">
                        {priorityDistribution.low.formatted} ({priorityDistribution.low.pct}%)
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* WEEKLY PROGRESS LIST ("This Week") */}
              <Card className="border-slate-200/90 shadow-xs bg-white">
                <CardHeader className="p-4 pb-3 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-primary-600" />
                      <h4 className="text-sm font-bold text-slate-900">This Week</h4>
                    </div>
                    <span className="text-xs text-slate-400">Completion</span>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-3 flex flex-col gap-2">
                  {weeklyProgressData.map((d) => (
                    <div
                      key={d.key}
                      onClick={() => setSelectedDayKey(d.key)}
                      className={`
                        flex items-center justify-between p-2 rounded-lg transition-colors cursor-pointer text-xs
                        ${selectedDayKey === d.key ? 'bg-primary-50 text-primary-900 font-bold' : 'hover:bg-slate-50 text-slate-700'}
                      `}
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-16 font-semibold">{d.fullName}</span>
                        {d.isComplete && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        )}
                      </span>

                      <span className="font-mono text-slate-500">
                        {d.completed} / {d.total} done
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* COMING UP PREVIEW */}
              <Card className="border-slate-200/90 shadow-xs bg-white">
                <CardHeader className="p-4 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary-600" />
                    <h4 className="text-sm font-bold text-slate-900">Coming Up</h4>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-3 flex flex-col gap-2.5 text-xs">
                  {upcomingRevisionList.length > 0 ? (
                    upcomingRevisionList.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between"
                      >
                        <div className="min-w-0 pr-2">
                          <span className="font-bold text-slate-800 block truncate">
                            {item.topic}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {item.dayName} • {item.time}
                          </span>
                        </div>
                        <span className="font-mono text-xs text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200 shrink-0">
                          {item.duration} min
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-400 text-xs py-2 text-center">No upcoming sessions.</p>
                  )}
                </CardContent>
              </Card>

              {/* RECENTLY COMPLETED */}
              <Card className="border-slate-200/90 shadow-xs bg-white">
                <CardHeader className="p-4 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <CheckCheck className="w-4 h-4 text-emerald-600" />
                    <h4 className="text-sm font-bold text-slate-900">Recently Completed</h4>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-3 flex flex-col gap-2 text-xs">
                  {recentlyCompletedList.length > 0 ? (
                    recentlyCompletedList.slice(0, 4).map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0"
                      >
                        <span className="flex items-center gap-2 text-slate-700 truncate">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[2.5]" />
                          <span className="truncate">{item.topic}</span>
                        </span>
                        <span className="text-[11px] font-mono text-slate-400 shrink-0">
                          {item.duration} min
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-400 text-xs py-2 text-center">
                      No completed sessions yet.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* 7. AI DISCLAIMER FOOTER                                               */}
          {/* ===================================================================== */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-primary-500" />
              Future plans can be personalized using your learning activity and AI-generated study guidance.
            </span>
          </div>
        </div>

      {/* ========================================================================= */}
      {/* 8. FOCUSED START REVISION MODAL                                           */}
      {/* ========================================================================= */}
      <Modal
        isOpen={!!activeRevisionSession}
        onClose={() => setActiveRevisionSession(null)}
        title={activeRevisionSession?.topic || 'Revision Session'}
        size="lg"
        footer={
          <div className="flex flex-wrap items-center justify-between w-full gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveRevisionSession(null)}
              className="text-xs font-semibold"
            >
              Close
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant={activeRevisionSession?.status === 'Completed' ? 'outline' : 'primary'}
                size="sm"
                iconLeft={Check}
                onClick={() => {
                  if (activeRevisionSession) {
                    handleToggleComplete(selectedDayKey, activeRevisionSession.id);
                    setActiveRevisionSession((prev) =>
                      prev
                        ? {
                            ...prev,
                            status: prev.status === 'Completed' ? 'Upcoming' : 'Completed',
                          }
                        : null
                    );
                  }
                }}
                className="text-xs font-semibold cursor-pointer"
              >
                {activeRevisionSession?.status === 'Completed'
                  ? 'Mark Incomplete'
                  : 'Mark as Completed'}
              </Button>
            </div>
          </div>
        }
      >
        {activeRevisionSession && (
          <div className="flex flex-col gap-5">
            {/* Session Metadata Banner */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    activeRevisionSession.priority === 'High'
                      ? 'danger'
                      : activeRevisionSession.priority === 'Medium'
                        ? 'warning'
                        : 'success'
                  }
                  className="px-2.5 py-1 text-xs font-bold"
                >
                  {activeRevisionSession.priority} Priority
                </Badge>
                <span className="text-xs font-mono font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {activeRevisionSession.time} • {activeRevisionSession.duration} Minutes
                </span>
              </div>

              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  activeRevisionSession.status === 'Completed'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-primary-100 text-primary-800'
                }`}
              >
                Status: {activeRevisionSession.status}
              </span>
            </div>

            {/* Description */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Session Objective
              </h5>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {activeRevisionSession.description}
              </p>
            </div>

            {/* Focus Areas Checklist */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Focus Concepts to Revise
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeRevisionSession.focusAreas.map((concept, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70 text-xs font-semibold text-slate-800 flex items-center gap-2"
                  >
                    <Check className="w-3.5 h-3.5 text-primary-600 shrink-0 stroke-[2.5]" />
                    <span>{concept}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Revision Tool Navigation CTAs */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Choose Study Resource
              </h5>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <Button
                  variant="outline"
                  size="sm"
                  iconLeft={FileText}
                  onClick={() => {
                    setActiveRevisionSession(null);
                    handleNavigateToResource('/summary');
                  }}
                  className="w-full text-xs font-semibold cursor-pointer justify-center"
                >
                  Summary
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  iconLeft={Network}
                  onClick={() => {
                    setActiveRevisionSession(null);
                    handleNavigateToResource('/mind-map');
                  }}
                  className="w-full text-xs font-semibold cursor-pointer justify-center"
                >
                  Mind Map
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  iconLeft={Layers}
                  onClick={() => {
                    setActiveRevisionSession(null);
                    handleNavigateToResource('/flashcards');
                  }}
                  className="w-full text-xs font-semibold cursor-pointer justify-center"
                >
                  Flashcards
                </Button>

                <Button
                  variant="primary"
                  size="sm"
                  iconLeft={GraduationCap}
                  onClick={() => {
                    setActiveRevisionSession(null);
                    handleNavigateToResource('/quiz');
                  }}
                  className="w-full text-xs font-bold cursor-pointer justify-center shadow-xs"
                >
                  Quiz
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* ========================================================================= */}
      {/* 9. CUSTOMIZE PLAN MODAL                                                   */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isCustomizeModalOpen}
        onClose={() => setIsCustomizeModalOpen(false)}
        title="Customize Revision Plan"
        size="md"
        footer={
          <div className="flex items-center justify-between w-full">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCustomizeModalOpen(false)}
              className="text-xs font-semibold"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              iconLeft={Sparkles}
              onClick={handleGenerateNewPlan}
              className="text-xs font-bold cursor-pointer shadow-xs"
            >
              Generate New Plan
            </Button>
          </div>
        }
      >
        <div className="flex flex-col gap-5">
          {/* Daily Study Time Selection */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Daily Study Time
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: '30m', label: '30 min' },
                { id: '1h', label: '1 hour' },
                { id: '2h', label: '2 hours' },
                { id: '3h', label: '3 hours' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setCustomDailyTime(opt.id)}
                  className={`
                    p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center
                    ${
                      customDailyTime === opt.id
                        ? 'border-primary-600 bg-primary-50 text-primary-700 shadow-2xs ring-2 ring-primary-100'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }
                  `}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Preferred Study Period */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Preferred Study Period
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'morning', label: 'Morning', desc: '8:00 AM - 12:00 PM', icon: Sun },
                { id: 'afternoon', label: 'Afternoon', desc: '12:00 PM - 5:00 PM', icon: Sunset },
                { id: 'evening', label: 'Evening', desc: '5:00 PM - 9:00 PM', icon: Moon },
                { id: 'flexible', label: 'Flexible', desc: 'Distributed throughout day', icon: Zap },
              ].map((slot) => {
                const Icon = slot.icon;
                return (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setCustomPeriod(slot.id)}
                    className={`
                      p-3 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-2.5
                      ${
                        customPeriod === slot.id
                          ? 'border-primary-600 bg-primary-50 text-primary-900 shadow-2xs ring-2 ring-primary-100'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold block">{slot.label}</span>
                      <span className="text-[10px] text-slate-400">{slot.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Revision Focus */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Revision Focus Strategy
            </label>
            <div className="flex flex-col gap-2">
              {[
                { id: 'high', label: 'High Priority First', desc: 'Maximize study time on topics needing the most urgent revision.' },
                { id: 'weak', label: 'Weak Topics Consolidation', desc: 'Prioritize lowest-scoring quiz and recall diagnostic areas.' },
                { id: 'all', label: 'Balanced Full Syllabus', desc: 'Evenly distribute time across all 7 unit topics.' },
              ].map((strat) => (
                <button
                  key={strat.id}
                  type="button"
                  onClick={() => setCustomFocus(strat.id)}
                  className={`
                    p-3 rounded-xl border text-left transition-all cursor-pointer
                    ${
                      customFocus === strat.id
                        ? 'border-primary-600 bg-primary-50 text-primary-900 shadow-2xs ring-2 ring-primary-100'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }
                  `}
                >
                  <span className="text-xs font-bold block text-slate-900">{strat.label}</span>
                  <span className="text-[11px] text-slate-500 mt-0.5 block">{strat.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
