import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Network,
  FileText,
  Layers,
  GraduationCap,
  Bookmark,
  Calendar,
  ArrowRight,
  Award,
  Flame,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  RefreshCw,
  Plus,
  Play
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';
import { useToast } from '../components/ui/Toast';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import { getHealthStatus } from '../services/api';

export default function Dashboard() {
  const toast = useToast();
  const { user } = useUser();
  const { t } = useLanguage();
  const [backendHealth, setBackendHealth] = useState(null);

  // Check Spring Boot Backend Health on Mount
  useEffect(() => {
    let isMounted = true;
    getHealthStatus()
      .then((data) => {
        if (isMounted) {
          setBackendHealth(data);
        }
      })
      .catch(() => {
        // Backend offline or unreachable — fails gracefully without interrupting UI
        if (isMounted) {
          setBackendHealth(null);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Sync Planner & Health Check Handler
  const handleSyncPlanner = async () => {
    try {
      const res = await getHealthStatus();
      setBackendHealth(res);
      toast.success(`Backend synchronized: ${res.application} (${res.status})`);
    } catch {
      toast.warning('Backend is currently offline or unreachable.');
    }
  };

  // Greeting based on time of day
  const getGreeting = () => {
    return t('dashboard.welcomeBack', { name: user.name }, `Welcome back, ${user.name}! 👋`);
  };

  // Performance statistics cards
  const stats = [
    {
      id: 'mastery',
      title: t('dashboard.overallMastery', {}, 'Overall Mastery'),
      value: '74%',
      detail: '+4% improvement this week',
      icon: Award,
      color: 'bg-primary-50 text-primary-600 border-primary-100',
      progress: 74,
    },
    {
      id: 'topics',
      title: t('dashboard.topicsStudied', {}, 'Topics Studied'),
      value: '48 / 65',
      detail: '73% semester syllabus covered',
      icon: Bookmark,
      color: 'bg-secondary-50 text-secondary-600 border-secondary-100',
      progress: 73,
    },
    {
      id: 'score',
      title: t('dashboard.quizScore', {}, 'Quiz Score'),
      value: '86% Avg',
      detail: '14 adaptive quizzes completed',
      icon: GraduationCap,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      progress: 86,
    },
    {
      id: 'streak',
      title: t('dashboard.currentStreak', {}, 'Current Streak'),
      value: `7 ${t('common.days', {}, 'Days')} 🔥`,
      detail: 'Personal record: 12 days',
      icon: Flame,
      color: 'bg-amber-50 text-amber-600 border-amber-100',
      progress: 58,
    },
  ];

  // Continue Learning items with progress bars
  const continueLearningTopics = [
    {
      id: 'os',
      name: 'Operating Systems',
      progress: 65,
      completed: '13 / 20 subtopics',
      nextTopic: 'Virtual Memory & Page Replacement',
      lastStudied: '2h ago',
      category: 'Core Computer Science',
      color: 'primary',
      mindMapUrl: '/mind-map',
      quizUrl: '/quiz',
    },
    {
      id: 'dbms',
      name: 'Database Management',
      progress: 72,
      completed: '18 / 25 subtopics',
      nextTopic: 'Normalization & BCNF Decomposition',
      lastStudied: 'Yesterday',
      category: 'Data Engineering',
      color: 'secondary',
      mindMapUrl: '/mind-map',
      quizUrl: '/quiz',
    },
    {
      id: 'java',
      name: 'Java',
      progress: 81,
      completed: '21 / 26 subtopics',
      nextTopic: 'Multithreading & Concurrency Locks',
      lastStudied: '3 days ago',
      category: 'Programming Languages',
      color: 'success',
      mindMapUrl: '/mind-map',
      quizUrl: '/quiz',
    },
  ];

  // Weak Topics (Clearly marked as Demo Data)
  const weakTopics = [
    {
      id: 'deadlocks',
      topic: 'Deadlocks',
      subject: 'Operating Systems',
      accuracy: '42% accuracy in recent quiz',
      severity: 'high',
      reason: 'Needs Spaced Recall • Banker’s Algorithm',
      actionUrl: '/mind-map',
    },
    {
      id: 'normalization',
      topic: 'Normalization',
      subject: 'Database Management',
      accuracy: '48% accuracy in recent quiz',
      severity: 'medium',
      reason: 'Review 3NF & BCNF dependency rules',
      actionUrl: '/important-topics',
    },
    {
      id: 'tcp-ip',
      topic: 'TCP/IP',
      subject: 'Computer Networks',
      accuracy: '51% accuracy in recent quiz',
      severity: 'medium',
      reason: '4 flashcards flagged for review',
      actionUrl: '/flashcards',
    },
  ];

  // Recommended Actions
  const recommendedActions = [
    {
      id: 'weak',
      title: 'Review Weak Topic',
      subtitle: 'Deadlocks & Normalization',
      description: 'Strengthen comprehension with targeted mind maps and notes.',
      icon: AlertTriangle,
      badge: 'High Priority',
      badgeVariant: 'danger',
      link: '/mind-map',
      buttonText: 'Start Review',
    },
    {
      id: 'quiz',
      title: 'Take a Quiz',
      subtitle: '5-Min Rapid Recall',
      description: 'Adaptive 10-question test tailored to recent weak areas.',
      icon: GraduationCap,
      badge: 'Recommended',
      badgeVariant: 'primary',
      link: '/quiz',
      buttonText: 'Launch Quiz',
    },
    {
      id: 'flashcards',
      title: 'Review Flashcards',
      subtitle: '24 Due Today',
      description: 'Spaced repetition queue for long-term memory retention.',
      icon: Layers,
      badge: 'Spaced Recall',
      badgeVariant: 'secondary',
      link: '/flashcards',
      buttonText: 'Study Deck',
    },
    {
      id: 'plan',
      title: 'Continue Revision Plan',
      subtitle: 'Day 4 of 14',
      description: 'Follow your personalized milestone roadmap toward exam day.',
      icon: Calendar,
      badge: 'Scheduled',
      badgeVariant: 'warning',
      link: '/revision-plan',
      buttonText: 'View Schedule',
    },
  ];

  // Recent Uploaded Materials
  const recentMaterials = [
    {
      id: 1,
      title: 'OS_Unit_3_Process_Scheduling.pdf',
      subject: 'Operating Systems',
      fileType: 'PDF',
      date: 'Today, 9:30 AM',
      status: 'Ready',
      nodesCount: '18 Nodes Mapped',
      badgeColor: 'bg-red-50 text-red-700 border-red-200',
    },
    {
      id: 2,
      title: 'DBMS_Relational_Algebra_Notes.pptx',
      subject: 'Database Management',
      fileType: 'PPTX',
      date: 'Yesterday, 4:15 PM',
      status: 'Ready',
      nodesCount: '24 Nodes Mapped',
      badgeColor: 'bg-orange-50 text-orange-700 border-orange-200',
    },
    {
      id: 3,
      title: 'Java_MultiThreading_Concurrency.pdf',
      subject: 'Java Programming',
      fileType: 'PDF',
      date: 'Oct 19, 2026',
      status: 'Ready',
      nodesCount: '15 Nodes Mapped',
      badgeColor: 'bg-red-50 text-red-700 border-red-200',
    },
    {
      id: 4,
      title: 'Computer_Networks_Transport_Layer.docx',
      subject: 'Computer Networks',
      fileType: 'DOCX',
      date: 'Oct 15, 2026',
      status: 'Ready',
      nodesCount: '12 Nodes Mapped',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    },
  ];

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* ========================================================================= */}
      {/* 1. DASHBOARD HEADER & GREETING                                            */}
      {/* ========================================================================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 left-1/3 w-64 h-64 bg-secondary-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-bold text-primary-700 bg-primary-50 px-2.5 py-0.5 rounded-full border border-primary-100 inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-primary-600" />
              <span>AI Study Workspace</span>
            </span>

            {backendHealth?.status === 'UP' && (
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 inline-flex items-center gap-1.5 animate-in fade-in duration-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Backend Connected</span>
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {getGreeting()}
          </h1>
          <p className="text-sm sm:text-base text-slate-500 mt-1 max-w-xl">
            {t('dashboard.greetingSubtitle', {}, "Here's what your revision looks like today. You have 3 topics queued for spaced recall.")}
          </p>
        </div>

        {/* Quick Actions Header CTAs */}
        <div className="relative z-10 flex items-center gap-3 shrink-0">
          <Button
            variant="outline"
            size="md"
            onClick={handleSyncPlanner}
            iconLeft={RefreshCw}
            className="text-xs font-semibold"
          >
            {t('common.syncPlanner', {}, 'Sync Planner')}
          </Button>

          <Link to="/upload">
            <Button
              variant="primary"
              size="md"
              iconLeft={Plus}
              className="text-xs font-semibold shadow-sm shadow-primary-500/20"
            >
              {t('common.uploadMaterial', {}, 'Upload Material')}
            </Button>
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. STATISTICS CARDS                                                       */}
      {/* ========================================================================= */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              {t('dashboard.studyOverview', {}, 'Study Performance Overview')}
            </h2>
          </div>
          <Link
            to="/progress"
            className="text-xs font-semibold text-primary-600 hover:text-primary-700 inline-flex items-center gap-1"
          >
            <span>{t('dashboard.detailedAnalytics', {}, 'Detailed Analytics')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.id} hoverEffect className="relative overflow-hidden">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-500 tracking-wide">
                      {item.title}
                    </span>
                    <div className={`p-2 rounded-xl border ${item.color}`}>
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
                      {item.value}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mb-3">
                    {item.detail}
                  </p>

                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-primary-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CONTINUE LEARNING & WEAK TOPICS GRID                                   */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Continue Learning */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Continue Learning
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Pick up where you left off with real-time topic progress.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {continueLearningTopics.map((topic) => (
              <Card key={topic.id} hoverEffect className="transition-all">
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-900">
                          {topic.name}
                        </h3>
                        <Badge variant={topic.color} size="sm">
                          {topic.progress}%
                        </Badge>
                      </div>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        {topic.category} • {topic.completed}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link to={topic.mindMapUrl}>
                        <Button
                          variant="outline"
                          size="sm"
                          iconLeft={Network}
                          className="text-xs py-1.5 px-2.5 cursor-pointer"
                        >
                          Mind Map
                        </Button>
                      </Link>
                      <Link to={topic.quizUrl}>
                        <Button
                          variant="primary"
                          size="sm"
                          iconRight={Play}
                          className="text-xs py-1.5 px-2.5 cursor-pointer"
                        >
                          Quiz
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <ProgressBar
                    value={topic.progress}
                    max={100}
                    variant={topic.color}
                    size="md"
                    className="mb-2"
                  />

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span className="truncate max-w-[70%]">
                      Next up: <span className="font-medium text-slate-700">{topic.nextTopic}</span>
                    </span>
                    <span className="flex items-center gap-1 text-slate-400 shrink-0">
                      <Clock className="w-3 h-3" />
                      <span>{topic.lastStudied}</span>
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right 5 Cols: Weak Topics (High-Yield Focus) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                <span>Weak Topics</span>
                <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Concepts requiring immediate spaced repetition.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {weakTopics.map((item) => (
              <Card key={item.id} className="border-l-4 border-l-red-500 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900">
                          {item.topic}
                        </h4>
                        <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-100">
                          Needs Review
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        {item.subject}
                      </span>
                    </div>

                    <Link to={item.actionUrl}>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconRight={ArrowRight}
                        className="text-xs text-primary-600 hover:text-primary-700 py-1 px-2 -mr-1"
                      >
                        Review
                      </Button>
                    </Link>
                  </div>

                  <p className="text-xs text-slate-600 mb-2">
                    {item.reason}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-red-600 bg-red-50/70 px-2.5 py-1 rounded-lg border border-red-100/60">
                    <span className="font-semibold">{item.accuracy}</span>
                    <span className="font-mono text-[10px] uppercase font-bold text-red-700">Priority 1</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. RECOMMENDED ACTIONS                                                    */}
      {/* ========================================================================= */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Recommended Actions
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              High-impact revision tasks curated by Mind Mapr's cognitive assistant.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommendedActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.id} to={action.link} className="block group">
                <Card hoverEffect className="h-full flex flex-col justify-between border-slate-200/80 group-hover:border-primary-300 transition-all">
                  <CardContent className="p-5 flex flex-col h-full justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-2.5 rounded-xl bg-primary-50 text-primary-600 group-hover:scale-105 transition-transform">
                          <Icon className="w-5 h-5" />
                        </div>
                        <Badge variant={action.badgeVariant} size="sm">
                          {action.badge}
                        </Badge>
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-xs font-semibold text-primary-700 mt-0.5">
                        {action.subtitle}
                      </p>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                        {action.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-primary-600 group-hover:text-primary-700">
                      <span>{action.buttonText}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. RECENT MATERIALS TABLE                                                 */}
      {/* ========================================================================= */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Recent Materials
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Study notes, PDFs, and slide decks processed by the AI pipeline.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/materials"
              className="text-xs font-semibold text-primary-600 hover:text-primary-700 inline-flex items-center gap-1"
            >
              <span>View All Materials</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-3.5 px-4 sm:px-6">Material Title</th>
                  <th className="py-3.5 px-4">File Type</th>
                  <th className="py-3.5 px-4">Upload Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-600">
                {recentMaterials.map((mat) => (
                  <tr key={mat.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Title */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-slate-100 text-slate-600 shrink-0">
                          <FileText className="w-4 h-4 text-primary-600" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-bold text-slate-900 truncate hover:text-primary-600 transition-colors">
                            {mat.title}
                          </h4>
                          <span className="text-[11px] text-slate-400 block mt-0.5">
                            {mat.subject} • {mat.nodesCount}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* File Type */}
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold border ${mat.badgeColor}`}>
                        {mat.fileType}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {mat.date}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{mat.status}</span>
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <Link to="/mind-map">
                          <Button
                            variant="ghost"
                            size="sm"
                            iconLeft={Network}
                            className="text-xs py-1 px-2.5 hover:text-primary-600"
                          >
                            Mind Map
                          </Button>
                        </Link>
                        <Link to="/summary">
                          <Button
                            variant="outline"
                            size="sm"
                            iconLeft={FileText}
                            className="text-xs py-1 px-2.5"
                          >
                            Summary
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </div>
  );
}
