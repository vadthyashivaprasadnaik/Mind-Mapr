import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FolderOpen,
  FileText,
  Trash2,
  ArrowRight,
  Search,
  Plus,
  Sparkles,
  CheckCircle2,
  Clock,
  AlertCircle,
  SlidersHorizontal,
  ChevronDown,
  Layers,
  Network,
  GraduationCap,
  Bookmark,
  Eye,
  FileCode,
  Sliders,
  Check,
  Loader2
} from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Card, { CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Dropdown from '../components/ui/Dropdown';
import Modal from '../components/ui/Modal';
import EmptyState from '../components/ui/EmptyState';
import { useToast } from '../components/ui/Toast';

export default function Materials() {
  const toast = useToast();
  const navigate = useNavigate();

  // Initial Demo Materials Dataset (12 realistic university study items)
  const initialMaterials = [
    {
      id: 1,
      title: 'Operating Systems Notes',
      fileName: 'Operating_Systems_Lecture_Unit3.pdf',
      fileType: 'PDF',
      fileSize: '4.2 MB',
      uploadDate: '18 Aug 2026',
      timestamp: new Date('2026-08-18').getTime(),
      pages: 42,
      pagesLabel: '42 pages',
      status: 'Ready',
      topic: 'Operating Systems',
      category: 'Computer Science',
    },
    {
      id: 2,
      title: 'Database Management Systems',
      fileName: 'DBMS_Relational_Algebra_Slides.pptx',
      fileType: 'PPTX',
      fileSize: '8.7 MB',
      uploadDate: '17 Aug 2026',
      timestamp: new Date('2026-08-17').getTime(),
      pages: 65,
      pagesLabel: '65 slides',
      status: 'Ready',
      topic: 'Database Management',
      category: 'Data Engineering',
    },
    {
      id: 3,
      title: 'Java OOP & Collections',
      fileName: 'Java_Concurrency_OOP_Notes.pdf',
      fileType: 'PDF',
      fileSize: '3.1 MB',
      uploadDate: '15 Aug 2026',
      timestamp: new Date('2026-08-15').getTime(),
      pages: 28,
      pagesLabel: '28 pages',
      status: 'Ready',
      topic: 'Java Programming',
      category: 'Software Development',
    },
    {
      id: 4,
      title: 'Computer Networks Architecture',
      fileName: 'CN_Transport_Layer_Protocols.docx',
      fileType: 'DOCX',
      fileSize: '2.5 MB',
      uploadDate: '14 Aug 2026',
      timestamp: new Date('2026-08-14').getTime(),
      pages: 24,
      pagesLabel: '24 pages',
      status: 'Ready',
      topic: 'Computer Networks',
      category: 'Networking',
    },
    {
      id: 5,
      title: 'Data Structures & Algorithms',
      fileName: 'DSA_Trees_Graphs_DP.pdf',
      fileType: 'PDF',
      fileSize: '5.6 MB',
      uploadDate: '12 Aug 2026',
      timestamp: new Date('2026-08-12').getTime(),
      pages: 54,
      pagesLabel: '54 pages',
      status: 'Ready',
      topic: 'Data Structures',
      category: 'Core CS',
    },
    {
      id: 6,
      title: 'Software Engineering Principles',
      fileName: 'SE_Agile_SDLC_DesignPatterns.pptx',
      fileType: 'PPTX',
      fileSize: '6.4 MB',
      uploadDate: '10 Aug 2026',
      timestamp: new Date('2026-08-10').getTime(),
      pages: 48,
      pagesLabel: '48 slides',
      status: 'Ready',
      topic: 'Software Engineering',
      category: 'Software Development',
    },
    {
      id: 7,
      title: 'Discrete Mathematics & Graph Theory',
      fileName: 'Discrete_Math_Combinatorics.pdf',
      fileType: 'PDF',
      fileSize: '4.9 MB',
      uploadDate: '08 Aug 2026',
      timestamp: new Date('2026-08-08').getTime(),
      pages: 36,
      pagesLabel: '36 pages',
      status: 'Ready',
      topic: 'Discrete Mathematics',
      category: 'Mathematics',
    },
    {
      id: 8,
      title: 'Theory of Computation & Automata',
      fileName: 'TOC_Turing_Machines_DFA.pdf',
      fileType: 'PDF',
      fileSize: '3.8 MB',
      uploadDate: '05 Aug 2026',
      timestamp: new Date('2026-08-05').getTime(),
      pages: 32,
      pagesLabel: '32 pages',
      status: 'Ready',
      topic: 'Theory of Computation',
      category: 'Theoretical CS',
    },
    {
      id: 9,
      title: 'Cloud Computing & Microservices',
      fileName: 'Cloud_AWS_Docker_Kubernetes.pptx',
      fileType: 'PPTX',
      fileSize: '7.1 MB',
      uploadDate: '03 Aug 2026',
      timestamp: new Date('2026-08-03').getTime(),
      pages: 52,
      pagesLabel: '52 slides',
      status: 'Analyzing',
      topic: 'Cloud Computing',
      category: 'Cloud & DevOps',
    },
    {
      id: 10,
      title: 'Cyber Security & Cryptography',
      fileName: 'CyberSecurity_RSA_Hashing.pdf',
      fileType: 'PDF',
      fileSize: '4.5 MB',
      uploadDate: '01 Aug 2026',
      timestamp: new Date('2026-08-01').getTime(),
      pages: 40,
      pagesLabel: '40 pages',
      status: 'Analyzing',
      topic: 'Cyber Security',
      category: 'Information Security',
    },
    {
      id: 11,
      title: 'Web Development Full Stack Notes',
      fileName: 'WebDev_React_Node_REST.docx',
      fileType: 'DOCX',
      fileSize: '1.9 MB',
      uploadDate: '28 Jul 2026',
      timestamp: new Date('2026-07-28').getTime(),
      pages: 18,
      pagesLabel: '18 pages',
      status: 'Not Analyzed',
      topic: 'Web Development',
      category: 'Web Technologies',
    },
    {
      id: 12,
      title: 'Compiler Design & Lexical Analysis',
      fileName: 'Compiler_Design_Grammars.txt',
      fileType: 'TXT',
      fileSize: '480 KB',
      uploadDate: '25 Jul 2026',
      timestamp: new Date('2026-07-25').getTime(),
      pages: 12,
      pagesLabel: '12 pages',
      status: 'Not Analyzed',
      topic: 'Compiler Design',
      category: 'Systems Software',
    },
  ];

  // State
  const [materials, setMaterials] = useState(initialMaterials);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedSort, setSelectedSort] = useState('newest'); // 'newest' | 'oldest' | 'name-asc' | 'name-desc'

  // Modal States
  const [deleteTarget, setDeleteTarget] = useState(null); // material to delete
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [detailTarget, setDetailTarget] = useState(null); // material for details modal
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Filter Categories
  const filterOptions = ['All', 'PDF', 'PPT / PPTX', 'DOC / DOCX', 'TXT'];

  // Sort Options
  const sortOptionLabels = {
    newest: 'Newest',
    oldest: 'Oldest',
    'name-asc': 'Name A–Z',
    'name-desc': 'Name Z–A',
  };

  // Summary Metrics Counts
  const summaryMetrics = useMemo(() => {
    const total = materials.length;
    const ready = materials.filter((m) => m.status === 'Ready').length;
    const processing = materials.filter((m) => m.status === 'Analyzing').length;
    const notAnalyzed = materials.filter((m) => m.status === 'Not Analyzed').length;

    return { total, ready, processing, notAnalyzed };
  }, [materials]);

  // Filter & Search & Sort Computed List
  const filteredMaterials = useMemo(() => {
    let result = [...materials];

    // 1. Search Query Filter (title, fileType, topic, category, fileName)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.fileType.toLowerCase().includes(q) ||
          m.topic.toLowerCase().includes(q) ||
          m.category.toLowerCase().includes(q) ||
          m.fileName.toLowerCase().includes(q)
      );
    }

    // 2. Format Category Filter
    if (selectedFilter !== 'All') {
      if (selectedFilter === 'PDF') {
        result = result.filter((m) => m.fileType === 'PDF');
      } else if (selectedFilter === 'PPT / PPTX') {
        result = result.filter((m) => m.fileType === 'PPT' || m.fileType === 'PPTX');
      } else if (selectedFilter === 'DOC / DOCX') {
        result = result.filter((m) => m.fileType === 'DOC' || m.fileType === 'DOCX');
      } else if (selectedFilter === 'TXT') {
        result = result.filter((m) => m.fileType === 'TXT');
      }
    }

    // 3. Sorting
    result.sort((a, b) => {
      if (selectedSort === 'newest') return b.timestamp - a.timestamp;
      if (selectedSort === 'oldest') return a.timestamp - b.timestamp;
      if (selectedSort === 'name-asc') return a.title.localeCompare(b.title);
      if (selectedSort === 'name-desc') return b.title.localeCompare(a.title);
      return 0;
    });

    return result;
  }, [materials, searchQuery, selectedFilter, selectedSort]);

  // Helper: File Icon Styling based on type
  const getFileIconInfo = (type) => {
    switch (type) {
      case 'PDF':
        return {
          icon: FileText,
          bg: 'bg-red-50 text-red-600 border-red-100',
          badge: 'bg-red-50 text-red-700 border-red-200',
        };
      case 'PPT':
      case 'PPTX':
        return {
          icon: Sliders,
          bg: 'bg-orange-50 text-orange-600 border-orange-100',
          badge: 'bg-orange-50 text-orange-700 border-orange-200',
        };
      case 'DOC':
      case 'DOCX':
        return {
          icon: FileCode,
          bg: 'bg-blue-50 text-blue-600 border-blue-100',
          badge: 'bg-blue-50 text-blue-700 border-blue-200',
        };
      case 'TXT':
      default:
        return {
          icon: FileText,
          bg: 'bg-slate-100 text-slate-600 border-slate-200',
          badge: 'bg-slate-100 text-slate-700 border-slate-200',
        };
    }
  };

  // Status Badge Component
  const renderStatusBadge = (status) => {
    if (status === 'Ready') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Ready</span>
        </span>
      );
    }
    if (status === 'Analyzing') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          <span>Analyzing</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
        <Clock className="w-3.5 h-3.5" />
        <span>Not Analyzed</span>
      </span>
    );
  };

  // Trigger Delete Confirmation Modal
  const handlePromptDelete = (material) => {
    setDeleteTarget(material);
    setIsDeleteModalOpen(true);
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (deleteTarget) {
      setMaterials((prev) => prev.filter((m) => m.id !== deleteTarget.id));
      toast.success(`Removed "${deleteTarget.title}" from your study materials.`);
      setDeleteTarget(null);
      setIsDeleteModalOpen(false);
    }
  };

  // Trigger Details Modal
  const handleOpenDetails = (material) => {
    setDetailTarget(material);
    setIsDetailModalOpen(true);
  };

  // Reset Filters & Search
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedFilter('All');
    setSelectedSort('newest');
    toast.info('Filters and search cleared');
  };

  // Sort Dropdown Items
  const sortDropdownItems = [
    {
      label: 'Newest',
      icon: Clock,
      onClick: () => setSelectedSort('newest'),
    },
    {
      label: 'Oldest',
      icon: Clock,
      onClick: () => setSelectedSort('oldest'),
    },
    {
      label: 'Name A–Z',
      icon: FileText,
      onClick: () => setSelectedSort('name-asc'),
    },
    {
      label: 'Name Z–A',
      icon: FileText,
      onClick: () => setSelectedSort('name-desc'),
    },
  ];

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* ========================================================================= */}
      {/* 1. PAGE HEADER                                                            */}
      {/* ========================================================================= */}
      <PageHeader
        title="My Study Materials"
        description="All your revision materials in one place."
      >
        <Link to="/upload">
          <Button
            variant="primary"
            size="md"
            iconLeft={Plus}
            className="font-semibold shadow-sm shadow-primary-500/20 text-xs sm:text-sm cursor-pointer"
          >
            Upload Material
          </Button>
        </Link>
      </PageHeader>

      {/* ========================================================================= */}
      {/* 2. MATERIAL SUMMARY METRICS CARDS                                         */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Materials */}
        <Card hoverEffect className="relative overflow-hidden border-slate-200/80">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Total Materials
              </span>
              <div className="p-2 rounded-xl bg-primary-50 text-primary-600 border border-primary-100">
                <FolderOpen className="w-4.5 h-4.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {summaryMetrics.total}
              </span>
              <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                Demo
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Indexed in study library
            </p>
          </CardContent>
        </Card>

        {/* Ready for Revision */}
        <Card hoverEffect className="relative overflow-hidden border-slate-200/80">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Ready
              </span>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                <CheckCircle2 className="w-4.5 h-4.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-900 tracking-tight">
                {summaryMetrics.ready}
              </span>
              <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                AI Ready
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Mind maps & flashcards active
            </p>
          </CardContent>
        </Card>

        {/* Processing / Analyzing */}
        <Card hoverEffect className="relative overflow-hidden border-slate-200/80">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                Processing
              </span>
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
                <Loader2 className="w-4.5 h-4.5 animate-spin" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-900 tracking-tight">
                {summaryMetrics.processing}
              </span>
              <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                In Progress
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Extracting knowledge graphs
            </p>
          </CardContent>
        </Card>

        {/* Not Analyzed */}
        <Card hoverEffect className="relative overflow-hidden border-slate-200/80">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Not Analyzed
              </span>
              <div className="p-2 rounded-xl bg-slate-100 text-slate-600 border border-slate-200">
                <Clock className="w-4.5 h-4.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                {summaryMetrics.notAnalyzed}
              </span>
              <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                Queued
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Requires 1-click AI analysis
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ========================================================================= */}
      {/* 3. SEARCH, FILTERS & SORTING BAR                                          */}
      {/* ========================================================================= */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
        {/* Search Input */}
        <div className="w-full lg:w-80 relative">
          <Input
            placeholder="Search your materials..."
            iconLeft={Search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
            aria-label="Search your materials"
          />
        </div>

        {/* Filters & Sorting Controls */}
        <div className="flex flex-wrap items-center justify-between lg:justify-end gap-3 w-full lg:w-auto">
          {/* Format Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60">
            {filterOptions.map((opt) => {
              const isSelected = selectedFilter === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setSelectedFilter(opt)}
                  className={`
                    px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer
                    ${isSelected
                      ? 'bg-white text-primary-600 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                    }
                  `}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <Dropdown
              align="right"
              trigger={
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 transition-all cursor-pointer select-none"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                  <span>Sort: {sortOptionLabels[selectedSort]}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>
              }
              items={sortDropdownItems}
            />

            {/* Clear Filters Helper if active */}
            {(searchQuery || selectedFilter !== 'All' || selectedSort !== 'newest') && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="text-xs text-primary-600 hover:text-primary-700 p-2"
                title="Reset search and filters"
              >
                Reset
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. MATERIAL CARDS GRID / NO SEARCH RESULTS / EMPTY STATE                   */}
      {/* ========================================================================= */}
      {materials.length === 0 ? (
        /* Empty State: 0 materials overall */
        <EmptyState
          icon={FolderOpen}
          title="No study materials yet"
          description="Upload your first study material to start building your smart revision library."
          actionLabel="Upload Material"
          actionIcon={Plus}
          onActionClick={() => navigate('/upload')}
          className="my-8"
        />
      ) : filteredMaterials.length === 0 ? (
        /* No Search / Filter Results State */
        <div className="p-8 sm:p-12 bg-white rounded-2xl border border-dashed border-slate-200 text-center max-w-md mx-auto my-6">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No materials found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            Try a different search term or filter.
          </p>
          <Button
            variant="primary"
            size="sm"
            onClick={handleClearFilters}
            className="mt-4 font-semibold text-xs cursor-pointer"
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        /* Material Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMaterials.map((mat) => {
            const fileInfo = getFileIconInfo(mat.fileType);
            const FileIcon = fileInfo.icon;
            const isReady = mat.status === 'Ready';
            const isAnalyzing = mat.status === 'Analyzing';
            const isNotAnalyzed = mat.status === 'Not Analyzed';

            return (
              <Card
                key={mat.id}
                hoverEffect
                className="flex flex-col justify-between border-slate-200/80 hover:border-primary-300 transition-all duration-200 group"
              >
                <CardContent className="p-5 flex flex-col h-full justify-between">
                  {/* Top Section */}
                  <div>
                    {/* Header: Icon, Type Badge, Status */}
                    <div className="flex items-start justify-between gap-3 mb-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-2xl border ${fileInfo.bg} shadow-2xs group-hover:scale-105 transition-transform`}>
                          <FileIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold border ${fileInfo.badge}`}>
                            {mat.fileType}
                          </span>
                          <span className="text-[11px] text-slate-400 block mt-0.5">
                            {mat.fileSize} • {mat.pagesLabel}
                          </span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div>{renderStatusBadge(mat.status)}</div>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => handleOpenDetails(mat)}
                      className="text-base font-bold text-slate-900 group-hover:text-primary-600 transition-colors line-clamp-1 cursor-pointer"
                      title={mat.title}
                    >
                      {mat.title}
                    </h3>

                    {/* Category / Topic Pill */}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                        {mat.topic}
                      </span>
                    </div>

                    {/* Upload Date */}
                    <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Uploaded {mat.uploadDate}</span>
                    </p>
                  </div>

                  {/* Bottom Actions Bar */}
                  <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      {isReady && (
                        <Link to="/summary" state={{ from: '/materials', material: mat }}>
                          <Button
                            variant="primary"
                            size="sm"
                            iconRight={ArrowRight}
                            className="font-semibold text-xs py-1.5 px-3.5 cursor-pointer shadow-xs"
                          >
                            Open
                          </Button>
                        </Link>
                      )}

                      {isAnalyzing && (
                        <Button
                          variant="outline"
                          size="sm"
                          disabled
                          className="font-semibold text-xs py-1.5 px-3.5 bg-amber-50 text-amber-700 border-amber-200"
                        >
                          <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" />
                          <span>Analyzing...</span>
                        </Button>
                      )}

                      {isNotAnalyzed && (
                        <Link to="/ai-analysis" state={{ from: '/materials', material: mat }}>
                          <Button
                            variant="secondary"
                            size="sm"
                            iconLeft={Sparkles}
                            className="font-semibold text-xs py-1.5 px-3.5 cursor-pointer"
                          >
                            Analyze
                          </Button>
                        </Link>
                      )}

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenDetails(mat)}
                        iconLeft={Eye}
                        className="text-xs py-1.5 px-2.5 text-slate-500 hover:text-slate-800"
                        title="View details"
                      >
                        Details
                      </Button>
                    </div>

                    {/* Delete Action Trigger */}
                    <button
                      type="button"
                      onClick={() => handlePromptDelete(mat)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete material"
                      aria-label={`Delete ${mat.title}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. QUICK REVISION FOOTER HELPER                                           */}
      {/* ========================================================================= */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-600 text-white flex items-center justify-center shadow-xs shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900">
              Need to add more lecture slides or textbook notes?
            </h4>
            <p className="text-[11px] text-slate-500">
              Mind Mapr automatically extracts mind maps, active recall flashcards, and quizzes.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link to="/upload">
            <Button
              variant="primary"
              size="sm"
              iconLeft={Plus}
              className="text-xs font-semibold shadow-xs"
            >
              Upload Material
            </Button>
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. DELETE CONFIRMATION MODAL                                              */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeleteTarget(null);
        }}
        title="Delete this material?"
        size="sm"
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setDeleteTarget(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleConfirmDelete}
              iconLeft={Trash2}
            >
              Delete
            </Button>
          </>
        }
      >
        <div className="space-y-3 py-2">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-red-50 text-red-800 border border-red-100">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed">
              <p className="font-semibold text-red-900">Confirm Material Removal</p>
              <p className="text-red-700 mt-0.5">
                This study material will be removed from your materials list.
              </p>
            </div>
          </div>

          {deleteTarget && (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 space-y-1">
              <p className="font-bold text-slate-900 truncate">{deleteTarget.title}</p>
              <p className="text-slate-500 font-mono text-[11px]">{deleteTarget.fileName} • {deleteTarget.fileSize}</p>
            </div>
          )}
        </div>
      </Modal>

      {/* ========================================================================= */}
      {/* 7. VIEW MATERIAL DETAILS MODAL                                            */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setDetailTarget(null);
        }}
        title="Study Material Details"
        size="md"
        footer={
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setIsDetailModalOpen(false);
              setDetailTarget(null);
            }}
          >
            Close
          </Button>
        }
      >
        {detailTarget && (
          <div className="space-y-4 py-1 text-xs">
            {/* Header Details */}
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-slate-900 text-sm truncate">{detailTarget.title}</h4>
                <p className="text-slate-500 font-mono text-[11px] truncate">{detailTarget.fileName}</p>
              </div>
            </div>

            {/* Spec Matrix */}
            <div className="grid grid-cols-2 gap-2 text-slate-600 bg-white border border-slate-100 rounded-xl p-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">File Type</span>
                <span className="font-semibold text-slate-800">{detailTarget.fileType}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">File Size</span>
                <span className="font-semibold text-slate-800">{detailTarget.fileSize}</span>
              </div>
              <div className="mt-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Length</span>
                <span className="font-semibold text-slate-800">{detailTarget.pagesLabel}</span>
              </div>
              <div className="mt-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Upload Date</span>
                <span className="font-semibold text-slate-800">{detailTarget.uploadDate}</span>
              </div>
              <div className="mt-2 col-span-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Analysis Status</span>
                <div className="mt-1">{renderStatusBadge(detailTarget.status)}</div>
              </div>
            </div>

            {/* Available Revision Resources */}
            {detailTarget.status === 'Ready' && (
              <div className="pt-2">
                <h5 className="font-bold text-slate-900 mb-2">Generated Revision Resources:</h5>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <Link to="/summary" state={{ from: '/materials', material: detailTarget }} onClick={() => setIsDetailModalOpen(false)}>
                    <Button variant="outline" size="sm" iconLeft={FileText} className="w-full text-xs justify-start">
                      Summary
                    </Button>
                  </Link>
                  <Link to="/mind-map" state={{ from: '/materials', material: detailTarget }} onClick={() => setIsDetailModalOpen(false)}>
                    <Button variant="outline" size="sm" iconLeft={Network} className="w-full text-xs justify-start">
                      Mind Map
                    </Button>
                  </Link>
                  <Link to="/flashcards" state={{ from: '/materials', material: detailTarget }} onClick={() => setIsDetailModalOpen(false)}>
                    <Button variant="outline" size="sm" iconLeft={Layers} className="w-full text-xs justify-start">
                      Flashcards
                    </Button>
                  </Link>
                  <Link to="/quiz" state={{ from: '/materials', material: detailTarget }} onClick={() => setIsDetailModalOpen(false)}>
                    <Button variant="outline" size="sm" iconLeft={GraduationCap} className="w-full text-xs justify-start">
                      Quiz
                    </Button>
                  </Link>
                  <Link to="/important-topics" state={{ from: '/materials', material: detailTarget }} onClick={() => setIsDetailModalOpen(false)}>
                    <Button variant="outline" size="sm" iconLeft={Bookmark} className="w-full text-xs justify-start">
                      Key Topics
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
