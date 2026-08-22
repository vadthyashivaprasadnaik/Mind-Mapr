import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  UploadCloud,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  Clock,
  Network,
  Layers,
  GraduationCap,
  Bookmark,
  RefreshCw,
  Plus,
  Trash2,
  Check,
  FileCheck2,
  AlertTriangle
} from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Card, { CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';
import EmptyState from '../components/ui/EmptyState';
import { useToast } from '../components/ui/Toast';

export default function Upload() {
  const toast = useToast();
  const fileInputRef = useRef(null);

  // File & Upload States
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  // Processing Flow States: 'idle' | 'processing' | 'completed' | 'error'
  const [status, setStatus] = useState('idle');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [shouldFailNextAnalysis, setShouldFailNextAnalysis] = useState(false);

  // Recent Uploads Demo State (with toggle for empty state demonstration)
  const [recentUploads, setRecentUploads] = useState([
    {
      id: 1,
      name: 'Operating Systems Notes.pdf',
      type: 'PDF',
      size: '4.2 MB',
      date: 'Today, 9:30 AM',
      status: 'Ready',
      statusColor: 'success',
      mindMapUrl: '/mind-map',
      summaryUrl: '/summary',
    },
    {
      id: 2,
      name: 'Database Management.pptx',
      type: 'PPTX',
      size: '8.7 MB',
      date: 'Yesterday, 3:15 PM',
      status: 'Ready',
      statusColor: 'success',
      mindMapUrl: '/mind-map',
      summaryUrl: '/summary',
    },
    {
      id: 3,
      name: 'Java OOP Notes.pdf',
      type: 'PDF',
      size: '3.1 MB',
      date: 'Oct 19, 2026',
      status: 'Ready',
      statusColor: 'success',
      mindMapUrl: '/mind-map',
      summaryUrl: '/summary',
    },
    {
      id: 4,
      name: 'Computer Networks Architecture.docx',
      type: 'DOCX',
      size: '2.5 MB',
      date: 'Oct 15, 2026',
      status: 'Not Analyzed',
      statusColor: 'warning',
      mindMapUrl: null,
      summaryUrl: null,
    },
  ]);

  // Valid File Extensions & Limits
  const ALLOWED_EXTENSIONS = ['.pdf', '.ppt', '.pptx', '.doc', '.docx', '.txt'];
  const MAX_FILE_SIZE_MB = 25;
  const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

  // 8 Sequential AI Processing Steps
  const processingSteps = [
    { id: 1, title: 'File uploaded', detail: 'Validating and caching source document.' },
    { id: 2, title: 'Extracting content', detail: 'Parsing document hierarchy, headings, and code snippets.' },
    { id: 3, title: 'Identifying topics', detail: 'Segmenting syllabus into logical study modules.' },
    { id: 4, title: 'Finding important concepts', detail: 'Highlighting high-yield exam definitions and theorems.' },
    { id: 5, title: 'Generating summary', detail: 'Creating structured executive revision notes.' },
    { id: 6, title: 'Building mind map', detail: 'Connecting parent-child nodes into interactive graph.' },
    { id: 7, title: 'Creating flashcards', detail: 'Formulating spaced-repetition question & answer pairs.' },
    { id: 8, title: 'Preparing quiz', detail: 'Synthesizing adaptive multiple-choice practice tests.' },
  ];

  // Helper: Format file size cleanly
  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  // Helper: Get File Extension
  const getFileExtension = (filename) => {
    if (!filename) return '';
    const lastDot = filename.lastIndexOf('.');
    return lastDot !== -1 ? filename.slice(lastDot).toLowerCase() : '';
  };

  // Helper: Color badge per extension
  const getExtensionBadgeColor = (ext) => {
    switch (ext) {
      case '.pdf':
      case 'PDF':
        return 'bg-red-50 text-red-700 border-red-200';
      case '.ppt':
      case '.pptx':
      case 'PPT':
      case 'PPTX':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case '.doc':
      case '.docx':
      case 'DOC':
      case 'DOCX':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case '.txt':
      case 'TXT':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-primary-50 text-primary-700 border-primary-200';
    }
  };

  // File Validation Logic
  const validateFile = (selectedFile) => {
    setFileError('');
    if (!selectedFile) return false;

    const ext = getFileExtension(selectedFile.name);
    const isAllowed = ALLOWED_EXTENSIONS.includes(ext);

    if (!isAllowed) {
      const errorMsg = 'This file type is not supported. Please upload PDF, PPT, DOC or TXT files.';
      setFileError(errorMsg);
      toast.error(errorMsg);
      return false;
    }

    if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
      const errorMsg = `File size exceeds the ${MAX_FILE_SIZE_MB} MB limit. Please upload a smaller file.`;
      setFileError(errorMsg);
      toast.error(errorMsg);
      return false;
    }

    return true;
  };

  // Handle Native File Change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        setStatus('idle');
        toast.info(`Selected "${selectedFile.name}" (${formatFileSize(selectedFile.size)})`);
      } else {
        setFile(null);
        e.target.value = '';
      }
    }
  };

  // Drag & Drop Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragOver) setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
        setStatus('idle');
        toast.info(`Selected "${droppedFile.name}"`);
      } else {
        setFile(null);
      }
    }
  };

  // Remove Selected File
  const handleRemoveFile = () => {
    setFile(null);
    setFileError('');
    setStatus('idle');
    setCurrentStepIndex(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Preset Demo File Loader (for fast evaluator testing)
  const handleLoadDemoFile = (type = 'pdf') => {
    let mockName = 'Operating Systems Lecture Unit 4.pdf';
    let mockSize = 4.8 * 1024 * 1024;

    if (type === 'pptx') {
      mockName = 'DBMS Normalization & Relational Algebra.pptx';
      mockSize = 7.2 * 1024 * 1024;
    }

    const mockFileObj = new File(['mock content data'], mockName, {
      type: type === 'pdf' ? 'application/pdf' : 'application/vnd.ms-powerpoint',
      lastModified: Date.now(),
    });
    // Override size for realistic display
    Object.defineProperty(mockFileObj, 'size', { value: mockSize });

    setFile(mockFileObj);
    setFileError('');
    setStatus('idle');
    toast.info(`Loaded demo material: "${mockName}"`);
  };

  // AI Mock Processing Simulation Loop
  const startProcessing = () => {
    if (!file) {
      toast.error('Please select a file to analyze.');
      return;
    }

    setStatus('processing');
    setCurrentStepIndex(0);
    setFileError('');

    // Sequential step simulation
    let currentStep = 0;
    const stepDuration = 650; // ms per step

    const stepInterval = setInterval(() => {
      currentStep += 1;

      // Simulated error branch (if toggled or if file has 'corrupt' in name)
      if ((shouldFailNextAnalysis || file.name.toLowerCase().includes('corrupt')) && currentStep === 4) {
        clearInterval(stepInterval);
        setStatus('error');
        setFileError('Something went wrong while analyzing your material.');
        setShouldFailNextAnalysis(false);
        toast.error('Processing interrupted: Mock network timeout.');
        return;
      }

      if (currentStep < processingSteps.length) {
        setCurrentStepIndex(currentStep);
      } else {
        clearInterval(stepInterval);
        setCurrentStepIndex(processingSteps.length);
        setStatus('completed');
        toast.success('Your revision resources are ready! Explore below.');

        // Add to recent uploads list dynamically
        const newUploadItem = {
          id: Date.now(),
          name: file.name,
          type: getFileExtension(file.name).replace('.', '').toUpperCase() || 'PDF',
          size: formatFileSize(file.size),
          date: 'Just now',
          status: 'Ready',
          statusColor: 'success',
          mindMapUrl: '/mind-map',
          summaryUrl: '/summary',
        };
        setRecentUploads((prev) => [newUploadItem, ...prev]);
      }
    }, stepDuration);
  };

  // Reset to Upload Another File
  const handleUploadAnother = () => {
    setFile(null);
    setStatus('idle');
    setCurrentStepIndex(0);
    setFileError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // 5 Resource Cards Config
  const resourceCards = [
    {
      id: 'summary',
      title: 'Summary',
      description: 'Review a concise, exam-focused summary.',
      buttonText: 'Open Summary',
      route: '/summary',
      icon: FileText,
      color: 'bg-blue-50 text-blue-600 border-blue-100',
      badge: 'High Yield',
    },
    {
      id: 'mind-map',
      title: 'Mind Map',
      description: 'Explore concepts and their relationships visually.',
      buttonText: 'Open Mind Map',
      route: '/mind-map',
      icon: Network,
      color: 'bg-primary-50 text-primary-600 border-primary-100',
      badge: 'Interactive',
    },
    {
      id: 'flashcards',
      title: 'Flashcards',
      description: 'Practice active recall with generated flashcards.',
      buttonText: 'Practice Flashcards',
      route: '/flashcards',
      icon: Layers,
      color: 'bg-secondary-50 text-secondary-600 border-secondary-100',
      badge: 'Spaced Recall',
    },
    {
      id: 'quiz',
      title: 'Quiz',
      description: 'Test your understanding with a practice quiz.',
      buttonText: 'Start Quiz',
      route: '/quiz',
      icon: GraduationCap,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      badge: 'Adaptive',
    },
    {
      id: 'important-topics',
      title: 'Important Topics',
      description: 'Focus on high-priority concepts from your material.',
      buttonText: 'View Important Topics',
      route: '/important-topics',
      icon: Bookmark,
      color: 'bg-amber-50 text-amber-600 border-amber-100',
      badge: 'Priority',
    },
  ];

  // Calculated Progress Percentage for processing steps
  const progressPercent = Math.min(
    100,
    Math.round(((currentStepIndex + 1) / processingSteps.length) * 100)
  );

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* ========================================================================= */}
      {/* 1. PAGE HEADER                                                            */}
      {/* ========================================================================= */}
      <PageHeader
        title="Upload Your Study Material"
        description="Turn your notes into smart revision resources."
      >
        {/* Quick Demo Controls */}
        <div className="flex items-center gap-2">
          {status === 'idle' && !file && (
            <div className="hidden sm:flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200/80">
              <span className="text-[11px] font-semibold text-slate-500 px-2">Sample Files:</span>
              <button
                type="button"
                onClick={() => handleLoadDemoFile('pdf')}
                className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white text-slate-700 hover:text-primary-600 shadow-2xs transition-colors cursor-pointer"
              >
                OS Notes.pdf
              </button>
              <button
                type="button"
                onClick={() => handleLoadDemoFile('pptx')}
                className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white text-slate-700 hover:text-primary-600 shadow-2xs transition-colors cursor-pointer"
              >
                DBMS.pptx
              </button>
            </div>
          )}

          {status === 'completed' && (
            <Button
              variant="primary"
              size="sm"
              iconLeft={Plus}
              onClick={handleUploadAnother}
              className="text-xs font-semibold"
            >
              Upload Another File
            </Button>
          )}
        </div>
      </PageHeader>

      {/* ========================================================================= */}
      {/* 2. MAIN UPLOAD / PROCESSING / COMPLETION AREA                             */}
      {/* ========================================================================= */}
      <div className="w-full">
        {/* ===================================================================== */}
        {/* STATE A: IDLE (UPLOAD ZONE OR SELECTED FILE CARD)                      */}
        {/* ===================================================================== */}
        {status === 'idle' && (
          <div className="flex flex-col gap-6">
            {/* Error Alert Banner if validation failed */}
            {fileError && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 shadow-xs flex items-start gap-3 animate-in fade-in duration-200">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="flex-1 text-xs sm:text-sm">
                  <p className="font-semibold text-red-900">Upload Issue</p>
                  <p className="text-red-700 mt-0.5">{fileError}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setFileError('')}
                  className="text-red-400 hover:text-red-600 p-1 text-base leading-none"
                  aria-label="Dismiss error"
                >
                  ×
                </button>
              </div>
            )}

            {!file ? (
              /* Drag and Drop Zone */
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`
                  relative border-2 border-dashed rounded-3xl p-8 sm:p-14 text-center cursor-pointer transition-all duration-300
                  flex flex-col items-center justify-center bg-white shadow-xs
                  ${isDragOver
                    ? 'border-primary-500 bg-primary-50/40 ring-4 ring-primary-100 scale-[1.008]'
                    : 'border-slate-300 hover:border-primary-400 hover:bg-slate-50/70'
                  }
                `}
                tabIndex={0}
                role="button"
                aria-label="Upload your study material by dragging and dropping or browsing"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
              >
                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  id="study-material-upload"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.ppt,.pptx,.doc,.docx,.txt"
                />

                {/* Upload Icon with Gradient Ring */}
                <div className={`
                  w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center mb-6 transition-transform duration-300
                  ${isDragOver ? 'bg-primary-600 text-white scale-110 shadow-lg shadow-primary-500/30' : 'bg-primary-50 text-primary-600 border border-primary-100'}
                `}>
                  <UploadCloud className="w-8 h-8 sm:w-10 sm:h-10 animate-pulse" />
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
                  Upload your study material
                </h2>

                <p className="text-sm sm:text-base text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
                  Drag & drop your file here or browse from your device
                </p>

                {/* Browse Files Button */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <Button
                    variant="primary"
                    size="lg"
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    iconLeft={UploadCloud}
                    className="font-semibold shadow-md shadow-primary-500/20 px-6 py-2.5 cursor-pointer"
                  >
                    Browse Files
                  </Button>
                </div>

                {/* Supported Formats Pill */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
                  <span className="font-semibold text-slate-600">Supported formats:</span>
                  {['PDF', 'PPT', 'PPTX', 'DOC', 'DOCX', 'TXT'].map((fmt) => (
                    <span
                      key={fmt}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-mono text-[11px] font-bold border border-slate-200/60"
                    >
                      {fmt}
                    </span>
                  ))}
                  <span className="text-slate-300">•</span>
                  <span>Max file size: 25 MB</span>
                </div>
              </div>
            ) : (
              /* Selected File Preview Card */
              <Card className="border-primary-200/80 shadow-md shadow-primary-500/5 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                    <div className="flex items-start gap-4">
                      {/* Document Type Badge Icon */}
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary-600 to-secondary-600 text-white flex items-center justify-center shadow-md shadow-primary-500/20 shrink-0">
                        <FileText className="w-7 h-7" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 rounded font-mono text-xs font-bold border ${getExtensionBadgeColor(getFileExtension(file.name))}`}>
                            {getFileExtension(file.name).replace('.', '').toUpperCase() || 'FILE'}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">
                            {formatFileSize(file.size)}
                          </span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 truncate">
                          {file.name}
                        </h3>

                        <div className="flex items-center gap-2 mt-2">
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                            <Check className="w-3.5 h-3.5" />
                            <span>Status: Ready to analyze</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action: Remove */}
                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        variant="outline"
                        size="md"
                        onClick={handleRemoveFile}
                        iconLeft={Trash2}
                        className="text-xs font-semibold text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 cursor-pointer"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>

                  {/* Primary CTA Area */}
                  <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/70 -mx-6 -mb-6 p-6 sm:-mx-8 sm:-mb-8 sm:p-8">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Sparkles className="w-4 h-4 text-primary-600 shrink-0" />
                      <span>Mind Mapr will extract concepts, summaries, flashcards, and quizzes.</span>
                    </div>

                    <Button
                      variant="primary"
                      size="lg"
                      onClick={startProcessing}
                      iconLeft={Sparkles}
                      className="w-full sm:w-auto font-bold shadow-lg shadow-primary-500/25 px-8 py-3.5 text-sm sm:text-base cursor-pointer"
                    >
                      Analyze with AI
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* ===================================================================== */}
        {/* STATE B: MOCK PROCESSING SCREEN                                        */}
        {/* ===================================================================== */}
        {status === 'processing' && (
          <Card className="border-primary-200/90 shadow-xl shadow-primary-500/10 overflow-hidden animate-in fade-in duration-300">
            <CardContent className="p-6 sm:p-10">
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-bold border border-primary-100 mb-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>AI Synthesis In Progress</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Analyzing your study material
                  </h2>
                  <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary-600 shrink-0" />
                    <span className="font-semibold text-slate-700 truncate max-w-md">{file?.name}</span>
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-3xl font-extrabold text-primary-600 font-mono">
                    {progressPercent}%
                  </span>
                  <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">
                    Step {Math.min(currentStepIndex + 1, processingSteps.length)} of {processingSteps.length}
                  </span>
                </div>
              </div>

              {/* Dynamic Progress Bar */}
              <div className="mb-8">
                <ProgressBar
                  value={progressPercent}
                  max={100}
                  variant="primary"
                  size="lg"
                />
              </div>

              {/* 8 Sequential Steps Checklist */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 bg-slate-50/80 p-4 sm:p-6 rounded-2xl border border-slate-100">
                {processingSteps.map((step, idx) => {
                  const isCompleted = currentStepIndex > idx;
                  const isCurrent = currentStepIndex === idx;
                  const isPending = currentStepIndex < idx;

                  return (
                    <div
                      key={step.id}
                      className={`
                        p-3.5 rounded-xl transition-all duration-300 flex items-start gap-3 border
                        ${isCompleted
                          ? 'bg-emerald-50/60 border-emerald-200/80 text-emerald-950'
                          : isCurrent
                            ? 'bg-white border-primary-400 shadow-sm ring-2 ring-primary-100 text-slate-900 scale-[1.01]'
                            : 'bg-white/60 border-slate-200/60 text-slate-400 opacity-60'
                        }
                      `}
                    >
                      {/* Step Indicator Icon */}
                      <div className="mt-0.5 shrink-0">
                        {isCompleted && (
                          <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-2xs">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                        {isCurrent && (
                          <div className="w-6 h-6 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-2xs">
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          </div>
                        )}
                        {isPending && (
                          <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 border border-slate-200 flex items-center justify-center text-xs font-mono font-bold">
                            {idx + 1}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-xs font-bold ${isCurrent ? 'text-primary-700' : isCompleted ? 'text-emerald-900' : 'text-slate-600'}`}>
                            {step.title}
                          </h4>
                          <span className="text-[10px] font-mono font-semibold">
                            {isCompleted ? 'Done' : isCurrent ? 'Active...' : 'Pending'}
                          </span>
                        </div>
                        <p className={`text-[11px] mt-0.5 leading-snug ${isCurrent ? 'text-slate-700' : 'text-slate-400'}`}>
                          {step.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* ===================================================================== */}
        {/* STATE C: ERROR / PROCESSING FAILURE STATE                              */}
        {/* ===================================================================== */}
        {status === 'error' && (
          <Card className="border-red-200 bg-red-50/20 shadow-md animate-in fade-in duration-300">
            <CardContent className="p-8 sm:p-12 text-center max-w-xl mx-auto flex flex-col items-center">
              <div className="w-16 h-16 rounded-3xl bg-red-100 text-red-600 flex items-center justify-center mb-4 border border-red-200 shadow-sm">
                <AlertTriangle className="w-8 h-8" />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Something went wrong while analyzing your material.
              </h3>

              <p className="text-sm text-slate-600 mt-2 leading-relaxed max-w-md">
                Our mock synthesis pipeline encountered a simulated interruption while processing <span className="font-semibold text-slate-800">{file?.name}</span>.
              </p>

              <div className="flex items-center gap-3 mt-6">
                <Button
                  variant="outline"
                  size="md"
                  onClick={handleRemoveFile}
                  className="font-semibold"
                >
                  Cancel & Change File
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  onClick={startProcessing}
                  iconLeft={RefreshCw}
                  className="font-semibold shadow-md shadow-primary-500/20"
                >
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ===================================================================== */}
        {/* STATE D: COMPLETION STATE WITH 5 RESOURCE CARDS                        */}
        {/* ===================================================================== */}
        {status === 'completed' && (
          <div className="flex flex-col gap-8 animate-in fade-in zoom-in-95 duration-300">
            {/* Completion Banner */}
            <div className="bg-gradient-to-r from-primary-900 via-slate-900 to-secondary-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
              {/* Ambient Glow */}
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary-500/30 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-secondary-500/30 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 shrink-0">
                    <FileCheck2 className="w-7 h-7 stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold mb-1 border border-emerald-400/30">
                      <Sparkles className="w-3 h-3" />
                      <span>Ready for Active Revision</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                      Your revision resources are ready!
                    </h2>
                    <p className="text-sm text-slate-300 mt-1 max-w-xl">
                      Your study material <span className="text-white font-semibold underline decoration-primary-400">{file?.name}</span> has been prepared for smart revision.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Button
                    variant="glass"
                    size="md"
                    onClick={handleUploadAnother}
                    iconLeft={Plus}
                    className="font-semibold text-xs text-white"
                  >
                    Upload Another
                  </Button>
                </div>
              </div>
            </div>

            {/* 5 Revision Resource Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {resourceCards.map((card) => {
                const Icon = card.icon;
                return (
                  <Card key={card.id} hoverEffect className="flex flex-col justify-between border-slate-200/90 hover:border-primary-300 transition-all">
                    <CardContent className="p-6 flex flex-col h-full justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className={`p-3 rounded-2xl border ${card.color} shadow-2xs`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <Badge variant="primary" size="sm">
                            {card.badge}
                          </Badge>
                        </div>

                        <h3 className="text-lg font-bold text-slate-900">
                          {card.title}
                        </h3>

                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          {card.description}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-100">
                        <Link to={card.route} className="block w-full">
                          <Button
                            variant="primary"
                            size="md"
                            iconRight={ArrowRight}
                            className="w-full font-semibold justify-between shadow-sm shadow-primary-500/15 text-xs sm:text-sm cursor-pointer"
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
        )}
      </div>

      {/* ========================================================================= */}
      {/* 3. RECENT UPLOADS SECTION & EMPTY STATE                                   */}
      {/* ========================================================================= */}
      <section className="mt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Recent Uploads
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Access previously analyzed slide decks and lecture notes.
            </p>
          </div>
        </div>

        {/* Recent Uploads Table or Empty State */}
        {recentUploads.length > 0 ? (
          <Card className="overflow-hidden border-slate-200/80">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <th className="py-3.5 px-4 sm:px-6">Document Title</th>
                    <th className="py-3.5 px-4">File Type</th>
                    <th className="py-3.5 px-4">Size</th>
                    <th className="py-3.5 px-4">Upload Date</th>
                    <th className="py-3.5 px-4">Analysis Status</th>
                    <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-600">
                  {recentUploads.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Name */}
                      <td className="py-3.5 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-slate-100 text-slate-600 shrink-0">
                            <FileText className="w-4 h-4 text-primary-600" />
                          </div>
                          <span className="font-bold text-slate-900 truncate max-w-xs hover:text-primary-600 transition-colors">
                            {item.name}
                          </span>
                        </div>
                      </td>

                      {/* Type */}
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold border ${getExtensionBadgeColor(item.type)}`}>
                          {item.type}
                        </span>
                      </td>

                      {/* Size */}
                      <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                        {item.size}
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                        {item.date}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        {item.status === 'Ready' ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Ready</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">
                            <Clock className="w-3.5 h-3.5 text-amber-600" />
                            <span>{item.status}</span>
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 sm:px-6 text-right">
                        {item.mindMapUrl ? (
                          <div className="inline-flex items-center gap-2">
                            <Link to={item.mindMapUrl}>
                              <Button
                                variant="ghost"
                                size="sm"
                                iconLeft={Network}
                                className="text-xs py-1 px-2.5 hover:text-primary-600 cursor-pointer"
                              >
                                Mind Map
                              </Button>
                            </Link>
                            <Link to={item.summaryUrl}>
                              <Button
                                variant="outline"
                                size="sm"
                                iconLeft={FileText}
                                className="text-xs py-1 px-2.5 cursor-pointer"
                              >
                                Summary
                              </Button>
                            </Link>
                          </div>
                        ) : (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => {
                              handleLoadDemoFile('docx');
                              toast.info('Loaded document for analysis');
                            }}
                            className="text-xs py-1 px-3 cursor-pointer"
                          >
                            Analyze Now
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        ) : (
          /* Empty State */
          <EmptyState
            icon={UploadCloud}
            title="No study materials yet"
            description="Upload your first study material to begin."
            actionLabel="Upload Material"
            actionIcon={UploadCloud}
            onActionClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              fileInputRef.current?.click();
            }}
          />
        )}
      </section>
    </div>
  );
}
