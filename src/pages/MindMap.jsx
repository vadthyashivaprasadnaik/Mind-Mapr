import React, { useState, useMemo, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Network,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  Search,
  Maximize2,
  Minimize2,
  ChevronRight,
  ChevronDown,
  Info,
  BookOpen,
  Cpu,
  Zap,
  Database,
  Folder,
  AlertTriangle,
  FileText,
  XCircle,
  ArrowLeft,
  Share2
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

export default function MindMap() {
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

  // Canvas Viewport Transforms
  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const canvasRef = useRef(null);

  // Search & Node Selection State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNodeId, setSelectedNodeId] = useState('root');

  // Collapsed Nodes State: Set of parent IDs whose children are hidden
  const [collapsedNodes, setCollapsedNodes] = useState({});

  // Structured Mind Map Hierarchical Data Model (future AI output ready)
  const rawMindMapData = useMemo(() => ({
    id: 'root',
    label: 'Operating Systems',
    type: 'root',
    priority: 'HIGH',
    category: 'Core Architecture',
    icon: Network,
    color: 'bg-primary-600 text-white border-primary-500 shadow-primary-500/25',
    description:
      'The foundational system software that manages computer hardware resources, memory hierarchies, CPU allocation, storage devices, and provides a protected execution environment for user programs.',
    keyTakeaways:
      'Provides hardware abstraction, concurrency management, process isolation, and resource protection mechanisms.',
    related: ['Process Management', 'CPU Scheduling', 'Memory Management', 'File Systems', 'Deadlocks'],
    children: [
      {
        id: 'process-mgmt',
        label: 'Process Management',
        type: 'major',
        priority: 'HIGH',
        category: 'Process Subsystem',
        icon: Cpu,
        color: 'bg-blue-50 text-blue-900 border-blue-200 hover:border-blue-400',
        badgeColor: 'bg-blue-100 text-blue-800',
        description:
          'Governs the lifecycle, state transitions, context switching, and Inter-Process Communication (IPC) of active executing programs.',
        keyTakeaways:
          'Processes track execution context via Process Control Blocks (PCBs). Context switching carries measurable CPU cache overhead.',
        related: ['Processes', 'Threads', 'CPU Scheduling'],
        children: [
          {
            id: 'processes',
            label: 'Processes',
            type: 'subtopic',
            priority: 'HIGH',
            category: 'Execution Unit',
            icon: Cpu,
            color: 'bg-white text-slate-900 border-slate-200 hover:border-blue-300',
            description:
              'A program in active execution with private address space, registers, program counter, and stack/heap memory.',
            keyTakeaways:
              'Lifecycle states: New → Ready → Running → Terminated (or Blocked/Waiting on I/O events).',
            related: ['Process Management', 'Threads', 'PCB & Context Switch'],
            children: [
              {
                id: 'pcb',
                label: 'PCB & Context Switch',
                type: 'concept',
                priority: 'HIGH',
                category: 'Kernel Structures',
                color: 'bg-slate-50 text-slate-800 border-slate-200',
                description:
                  'Process Control Block holding process state, PID, CPU registers, memory management limits, and open file lists.',
                keyTakeaways:
                  'Context switching saves the running state to PCB and loads the next process from the ready queue.',
                related: ['Processes'],
              },
            ],
          },
          {
            id: 'threads',
            label: 'Threads',
            type: 'subtopic',
            priority: 'MEDIUM',
            category: 'Concurrency',
            icon: Zap,
            color: 'bg-white text-slate-900 border-slate-200 hover:border-blue-300',
            description:
              'A lightweight execution unit within a process sharing the same address space and data segment with sibling threads.',
            keyTakeaways:
              'Significantly reduces context-switch overhead and memory footprint compared to full multi-process architectures.',
            related: ['Process Management', 'Processes', 'User vs Kernel Threads'],
            children: [
              {
                id: 'thread-types',
                label: 'User vs Kernel Threads',
                type: 'concept',
                priority: 'MEDIUM',
                category: 'Threading Models',
                color: 'bg-slate-50 text-slate-800 border-slate-200',
                description:
                  'User-level threads managed by runtime libraries without kernel awareness vs kernel threads scheduled directly by the OS.',
                keyTakeaways:
                  'Three primary mappings: Many-to-One, One-to-One, and Many-to-Many threading models.',
                related: ['Threads'],
              },
            ],
          },
        ],
      },
      {
        id: 'cpu-scheduling',
        label: 'CPU Scheduling',
        type: 'major',
        priority: 'HIGH',
        category: 'Processor Allocation',
        icon: Zap,
        color: 'bg-amber-50 text-amber-900 border-amber-200 hover:border-amber-400',
        badgeColor: 'bg-amber-100 text-amber-800',
        description:
          'Policies and algorithms that determine which ready-state process receives CPU execution time when the processor becomes idle.',
        keyTakeaways:
          'Evaluated on CPU utilization, throughput, turnaround time, waiting time, and interactive response latency.',
        related: ['FCFS', 'Round Robin', 'Priority Scheduling'],
        children: [
          {
            id: 'fcfs',
            label: 'FCFS',
            type: 'subtopic',
            priority: 'MEDIUM',
            category: 'Non-preemptive',
            icon: Zap,
            color: 'bg-white text-slate-900 border-slate-200 hover:border-amber-300',
            description:
              'First-Come First-Served scheduling executes processes strictly in order of arrival in the ready queue.',
            keyTakeaways:
              'Simple to implement but suffers from the Convoy Effect where short processes wait behind long CPU bursts.',
            related: ['CPU Scheduling', 'Round Robin'],
          },
          {
            id: 'round-robin',
            label: 'Round Robin',
            type: 'subtopic',
            priority: 'HIGH',
            category: 'Preemptive',
            icon: Zap,
            color: 'bg-white text-slate-900 border-slate-200 hover:border-amber-300',
            description:
              'Preemptive time-sliced algorithm assigning each process a fixed slice (time quantum) of CPU duration.',
            keyTakeaways:
              'Ideal for interactive multi-user systems. Quantum size must balance responsiveness against context-switch overhead.',
            related: ['CPU Scheduling', 'FCFS'],
          },
          {
            id: 'priority-scheduling',
            label: 'Priority Scheduling',
            type: 'subtopic',
            priority: 'HIGH',
            category: 'Priority Based',
            icon: Zap,
            color: 'bg-white text-slate-900 border-slate-200 hover:border-amber-300',
            description:
              'Allocates CPU to processes based on numeric priority rank. Can be preemptive or non-preemptive.',
            keyTakeaways:
              'Risk of Starvation (indefinite blocking) for low-priority processes; resolved through Aging techniques.',
            related: ['CPU Scheduling'],
          },
        ],
      },
      {
        id: 'memory-mgmt',
        label: 'Memory Management',
        type: 'major',
        priority: 'HIGH',
        category: 'Memory Subsystem',
        icon: Database,
        color: 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:border-emerald-400',
        badgeColor: 'bg-emerald-100 text-emerald-800',
        description:
          'Dynamically coordinates, protects, and allocates physical RAM addresses between the operating system kernel and active processes.',
        keyTakeaways:
          'Eliminates fragmentation, provides address protection, and enables multi-programming in limited RAM.',
        related: ['Paging', 'Virtual Memory', 'Page Replacement'],
        children: [
          {
            id: 'paging',
            label: 'Paging',
            type: 'subtopic',
            priority: 'HIGH',
            category: 'Address Translation',
            icon: Database,
            color: 'bg-white text-slate-900 border-slate-200 hover:border-emerald-300',
            description:
              'Memory scheme dividing physical memory into fixed-size frames and logical memory into pages of identical size.',
            keyTakeaways:
              'Completely eliminates external fragmentation. Uses hardware Page Tables and TLBs for rapid translation.',
            related: ['Memory Management', 'Virtual Memory'],
          },
          {
            id: 'virtual-memory',
            label: 'Virtual Memory',
            type: 'subtopic',
            priority: 'HIGH',
            category: 'Virtualization',
            icon: Database,
            color: 'bg-white text-slate-900 border-slate-200 hover:border-emerald-300',
            description:
              'Technique abstracting primary storage allowing programs larger than physical memory to execute via demand paging.',
            keyTakeaways:
              'Loads pages into memory only when accessed. Handles Page Fault interrupts through kernel swap routines.',
            related: ['Memory Management', 'Paging', 'Page Replacement'],
          },
          {
            id: 'page-replacement',
            label: 'Page Replacement',
            type: 'subtopic',
            priority: 'HIGH',
            category: 'Memory Optimization',
            icon: Database,
            color: 'bg-white text-slate-900 border-slate-200 hover:border-emerald-300',
            description:
              'Algorithms (LRU, FIFO, Optimal) that select victim pages to swap out when no free memory frames remain.',
            keyTakeaways:
              'Aims to minimize page fault rates and avoid Thrashing where system spends more time swapping than computing.',
            related: ['Virtual Memory'],
          },
        ],
      },
      {
        id: 'file-systems',
        label: 'File Systems',
        type: 'major',
        priority: 'MEDIUM',
        category: 'Storage Subsystem',
        icon: Folder,
        color: 'bg-indigo-50 text-indigo-900 border-indigo-200 hover:border-indigo-400',
        badgeColor: 'bg-indigo-100 text-indigo-800',
        description:
          'Structured mechanism organizing, securing, and persisting logical data records on secondary storage media (HDDs/SSDs).',
        keyTakeaways:
          'Maps human-readable paths to disk block allocations and inodes with access permissions and metadata integrity.',
        related: ['Files', 'Directories', 'File Allocation'],
        children: [
          {
            id: 'files',
            label: 'Files',
            type: 'subtopic',
            priority: 'MEDIUM',
            category: 'Data Structures',
            icon: Folder,
            color: 'bg-white text-slate-900 border-slate-200 hover:border-indigo-300',
            description:
              'Contiguous logical address space containing user data, metadata, timestamps, and access permissions.',
            keyTakeaways:
              'File operations include Create, Write, Read, Reposition (Seek), Delete, and Truncate.',
            related: ['File Systems', 'Directories'],
          },
          {
            id: 'directories',
            label: 'Directories',
            type: 'subtopic',
            priority: 'LOW',
            category: 'Hierarchy',
            icon: Folder,
            color: 'bg-white text-slate-900 border-slate-200 hover:border-indigo-300',
            description:
              'Hierarchical symbol table mapping human-readable file names into specific file system metadata pointers.',
            keyTakeaways:
              'Common organizations: Single-level, Two-level, Tree-structured, and Acyclic-Graph directories.',
            related: ['File Systems', 'Files'],
          },
          {
            id: 'file-allocation',
            label: 'File Allocation',
            type: 'subtopic',
            priority: 'HIGH',
            category: 'Disk Management',
            icon: Folder,
            color: 'bg-white text-slate-900 border-slate-200 hover:border-indigo-300',
            description:
              'Methods for allocating physical disk sectors: Contiguous Allocation, Linked Allocation, and Indexed Allocation.',
            keyTakeaways:
              'Indexed Allocation (UNIX Inodes) enables direct file access with zero external disk fragmentation.',
            related: ['File Systems'],
          },
        ],
      },
      {
        id: 'deadlocks',
        label: 'Deadlocks',
        type: 'major',
        priority: 'HIGH',
        category: 'Concurrency Control',
        icon: AlertTriangle,
        color: 'bg-rose-50 text-rose-900 border-rose-200 hover:border-rose-400',
        badgeColor: 'bg-rose-100 text-rose-800',
        description:
          'A permanent blockage occurring when a set of concurrent processes wait indefinitely for resources held by each other.',
        keyTakeaways:
          'Requires all 4 Coffman conditions to hold simultaneously. Handled by Prevention, Avoidance, or Detection.',
        related: ['Deadlock Conditions', 'Prevention', 'Avoidance'],
        children: [
          {
            id: 'deadlock-conditions',
            label: 'Deadlock Conditions',
            type: 'subtopic',
            priority: 'HIGH',
            category: 'Characterization',
            icon: AlertTriangle,
            color: 'bg-white text-slate-900 border-slate-200 hover:border-rose-300',
            description:
              'The 4 essential Coffman conditions: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait.',
            keyTakeaways:
              'A deadlock can occur if and only if all four conditions hold concurrently in the system.',
            related: ['Deadlocks', 'Prevention'],
          },
          {
            id: 'prevention',
            label: 'Prevention',
            type: 'subtopic',
            priority: 'MEDIUM',
            category: 'Strategy',
            icon: AlertTriangle,
            color: 'bg-white text-slate-900 border-slate-200 hover:border-rose-300',
            description:
              'Constraining resource allocation requests such that at least one of the 4 conditions cannot physically hold.',
            keyTakeaways:
              'Commonly enforces total resource ordering to eliminate the possibility of Circular Wait.',
            related: ['Deadlocks', 'Avoidance'],
          },
          {
            id: 'avoidance',
            label: 'Avoidance',
            type: 'subtopic',
            priority: 'HIGH',
            category: 'Algorithms',
            icon: AlertTriangle,
            color: 'bg-white text-slate-900 border-slate-200 hover:border-rose-300',
            description:
              'Dynamically testing prospective allocations using Banker\'s Algorithm to guarantee system remains in a safe state.',
            keyTakeaways:
              'Requires advance declaration of maximum resource requirements for every participating process.',
            related: ['Deadlocks', 'Prevention'],
          },
        ],
      },
    ],
  }), []);

  // Flattened Lookup Map of all nodes
  const nodeLookup = useMemo(() => {
    const map = {};
    const traverse = (node) => {
      map[node.id] = node;
      if (node.children) {
        node.children.forEach(traverse);
      }
    };
    traverse(rawMindMapData);
    return map;
  }, [rawMindMapData]);

  // Active Selected Node Data
  const selectedNode = nodeLookup[selectedNodeId] || rawMindMapData;

  // Search Results
  const searchMatches = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return new Set();
    const matchedIds = new Set();
    Object.values(nodeLookup).forEach((node) => {
      if (
        node.label.toLowerCase().includes(q) ||
        node.description.toLowerCase().includes(q) ||
        node.category.toLowerCase().includes(q)
      ) {
        matchedIds.add(node.id);
      }
    });
    return matchedIds;
  }, [searchQuery, nodeLookup]);

  // Pan handlers
  const handleMouseDown = (e) => {
    // Only drag on canvas background, not clicking nodes
    if (e.target === canvasRef.current || e.target.tagName === 'svg') {
      setIsDragging(true);
      setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPanOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Zoom Controls
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(1.8, Number((prev + 0.15).toFixed(2))));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(0.55, Number((prev - 0.15).toFixed(2))));
  };

  const handleResetView = () => {
    setZoom(1);
    setPanOffset({ x: 0, y: 0 });
    toast.info('View reset to center.');
  };

  // Toggle Collapse on a Node
  const toggleCollapse = (nodeId, e) => {
    e.stopPropagation();
    setCollapsedNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
  };

  // Select Node and update view
  const handleSelectNode = (nodeId) => {
    setSelectedNodeId(nodeId);
  };

  return (
    <div className="flex flex-col gap-6 pb-16">
      {/* ========================================================================= */}
      {/* 1. BREADCRUMB, BACK BUTTON & HEADER                                       */}
      {/* ========================================================================= */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <BackButton label="Back" fallback="/materials" />

          {/* Dev State Switcher (for quick testing of states) */}
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
          title="Interactive Mind Map"
          description="Explore the concepts and relationships in your study material."
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
              onClick={() => toast.info('Mind map link copied!')}
              className="font-semibold text-xs cursor-pointer shadow-2xs"
            >
              Share Map
            </Button>
          </div>
        </PageHeader>
      </div>

      {/* ========================================================================= */}
      {/* 2. SOURCE MATERIAL & TOPIC STATISTICS CARD                                */}
      {/* ========================================================================= */}
      <Card className="border-slate-200/80 bg-white shadow-xs">
        <CardContent className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-primary-50 border border-primary-100 text-primary-600 flex items-center justify-center font-bold text-sm shadow-2xs shrink-0">
              <Network className="w-5 h-5" />
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

          {/* Compact Topic Statistics */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 flex-wrap">
            <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/70 text-center">
              <span className="text-xs font-mono font-extrabold text-slate-900 block">1</span>
              <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Root Topic</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/70 text-center">
              <span className="text-xs font-mono font-extrabold text-primary-700 block">5</span>
              <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Major Topics</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/70 text-center">
              <span className="text-xs font-mono font-extrabold text-emerald-700 block">15+</span>
              <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Concepts</span>
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
          message="Building your mind map..."
          description="Connecting concepts and structuring hierarchical relationships."
          size="lg"
          className="my-8"
        />
      )}

      {viewState === 'empty' && (
        <EmptyState
          icon={Network}
          title="Mind Map Not Available"
          description="Analyze a study material to generate an interactive mind map."
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
              Unable to load mind map
            </h3>
            <p className="text-xs text-slate-600 mt-1 mb-5">
              Something went wrong while preparing this visual resource.
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
      {/* 4. READY STATE: MAIN WORKSPACE & DETAILS PANEL                            */}
      {/* ========================================================================= */}
      {viewState === 'ready' && (
        <div className="flex flex-col gap-4">
          {/* Toolbar: Search + Controls + Legend */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
            {/* Search Input */}
            <div className="w-full sm:w-72">
              <Input
                type="text"
                placeholder="Search concepts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                iconLeft={Search}
                rightElement={
                  searchQuery ? (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="text-xs text-slate-400 hover:text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded cursor-pointer"
                    >
                      Clear
                    </button>
                  ) : null
                }
              />
            </div>

            {/* Map Controls */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
                <button
                  type="button"
                  onClick={handleZoomIn}
                  className="p-1.5 hover:bg-white rounded-lg text-slate-600 transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <span className="px-2 text-[11px] font-mono font-bold text-slate-600">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  type="button"
                  onClick={handleZoomOut}
                  className="p-1.5 hover:bg-white rounded-lg text-slate-600 transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleResetView}
                iconLeft={RotateCcw}
                className="font-semibold text-xs"
              >
                Reset
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
                iconLeft={isFullscreen ? Minimize2 : Maximize2}
                className="font-semibold text-xs hidden md:inline-flex"
              >
                {isFullscreen ? 'Exit Fullscreen' : 'Expand Map'}
              </Button>
            </div>
          </div>

          {/* Search match notification */}
          {searchQuery && (
            <div className="text-xs px-3 py-1.5 rounded-xl bg-primary-50 border border-primary-100 text-primary-900 flex items-center justify-between">
              <span>
                Found <strong>{searchMatches.size}</strong> matching concept{searchMatches.size === 1 ? '' : 's'} for "{searchQuery}".
              </span>
              {searchMatches.size === 0 && (
                <span className="text-amber-700 font-semibold">No matching concepts found.</span>
              )}
            </div>
          )}

          {/* Workspace + Details Panel Container */}
          <div
            className={`
              grid grid-cols-1 lg:grid-cols-12 gap-5
              ${isFullscreen ? 'fixed inset-4 z-50 bg-slate-950/40 p-4 rounded-3xl backdrop-blur-md' : ''}
            `}
          >
            {/* ------------------------------------------------------------------- */}
            {/* MAIN CANVAS WORKSPACE (8 Columns on desktop)                        */}
            {/* ------------------------------------------------------------------- */}
            <div
              className={`
                lg:col-span-8 flex flex-col rounded-2xl border border-slate-800 bg-slate-950 text-white relative overflow-hidden shadow-lg select-none
                ${isFullscreen ? 'h-full min-h-[600px]' : 'min-h-[560px] h-[640px]'}
              `}
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              {/* Canvas Background Grid Pattern */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle, #6366f1 1px, transparent 1px)`,
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Workspace Header Strip */}
              <div className="p-3.5 px-4 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold text-slate-300">
                    Interactive Concept Network
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center gap-2">
                  <span>Pan: Drag background</span>
                  <span>•</span>
                  <span>Select: Click node</span>
                </div>
              </div>

              {/* Transformable Canvas Surface */}
              <div
                className="flex-1 w-full h-full relative cursor-grab active:cursor-grabbing p-8 overflow-hidden"
                style={{
                  transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
                  transformOrigin: 'center center',
                  transition: isDragging ? 'none' : 'transform 0.15s ease-out',
                }}
              >
                {/* Visual SVG Connecting Curves */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
                  <defs>
                    <linearGradient id="grad-active" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Hierarchical Node Tree Layout */}
                <div className="flex flex-col items-center gap-8 min-w-[700px] mx-auto py-6">
                  {/* LEVEL 1: ROOT NODE */}
                  <div className="relative flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => handleSelectNode(rawMindMapData.id)}
                      className={`
                        px-6 py-3.5 rounded-2xl font-extrabold text-sm sm:text-base transition-all duration-200 cursor-pointer shadow-lg
                        flex items-center gap-2.5 z-10 border-2
                        ${selectedNodeId === 'root'
                          ? 'bg-primary-600 text-white border-white ring-4 ring-primary-400/50 scale-105 shadow-primary-500/40'
                          : searchMatches.has('root')
                            ? 'bg-primary-700 text-white border-amber-400 ring-2 ring-amber-300'
                            : 'bg-primary-700 text-white border-primary-500 hover:bg-primary-600'
                        }
                      `}
                    >
                      <Network className="w-5 h-5" />
                      <span>{rawMindMapData.label}</span>
                    </button>

                    {/* Connecting Stem */}
                    <div className="w-0.5 h-6 bg-slate-700" />
                  </div>

                  {/* LEVEL 2: MAJOR TOPIC NODES (5 Columns) */}
                  <div className="grid grid-cols-5 gap-3 w-full px-2">
                    {rawMindMapData.children.map((majorTopic) => {
                      const isSelected = selectedNodeId === majorTopic.id;
                      const isCollapsed = Boolean(collapsedNodes[majorTopic.id]);
                      const isMatch = searchMatches.has(majorTopic.id);
                      const Icon = majorTopic.icon;
                      const hasChildren = majorTopic.children && majorTopic.children.length > 0;

                      return (
                        <div key={majorTopic.id} className="flex flex-col items-center">
                          {/* Major Topic Card Node */}
                          <div
                            onClick={() => handleSelectNode(majorTopic.id)}
                            className={`
                              w-full p-3 rounded-2xl transition-all duration-150 cursor-pointer flex flex-col justify-between text-left border relative
                              ${isSelected
                                ? 'bg-slate-800 text-white border-primary-400 ring-2 ring-primary-400/60 scale-[1.03] shadow-md'
                                : isMatch
                                  ? 'bg-slate-800 text-slate-100 border-amber-400 ring-2 ring-amber-300/60'
                                  : 'bg-slate-900/90 text-slate-200 border-slate-700 hover:border-slate-500 hover:bg-slate-850'
                              }
                            `}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <div className="p-1.5 rounded-lg bg-slate-800 border border-slate-700">
                                <Icon className="w-3.5 h-3.5 text-primary-400" />
                              </div>

                              {/* Collapse/Expand button */}
                              {hasChildren && (
                                <button
                                  type="button"
                                  onClick={(e) => toggleCollapse(majorTopic.id, e)}
                                  className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                                  title={isCollapsed ? 'Expand subtopics' : 'Collapse subtopics'}
                                >
                                  {isCollapsed ? (
                                    <ChevronRight className="w-3.5 h-3.5" />
                                  ) : (
                                    <ChevronDown className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              )}
                            </div>

                            <h4 className="text-xs font-bold line-clamp-2">
                              {majorTopic.label}
                            </h4>

                            <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                              <span>{majorTopic.children ? `${majorTopic.children.length} subtopics` : ''}</span>
                              {isCollapsed && (
                                <span className="text-[9px] bg-primary-950 text-primary-300 px-1.5 py-0.5 rounded font-mono font-bold">
                                  +hidden
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Connecting Line Downward */}
                          {!isCollapsed && hasChildren && (
                            <div className="w-0.5 h-4 bg-slate-700" />
                          )}

                          {/* LEVEL 3: SUBTOPICS */}
                          {!isCollapsed && hasChildren && (
                            <div className="flex flex-col gap-2 w-full mt-1">
                              {majorTopic.children.map((subtopic) => {
                                const isSubSelected = selectedNodeId === subtopic.id;
                                const isSubMatch = searchMatches.has(subtopic.id);
                                const isSubCollapsed = Boolean(collapsedNodes[subtopic.id]);
                                const hasSubChildren = subtopic.children && subtopic.children.length > 0;

                                return (
                                  <div key={subtopic.id} className="flex flex-col items-center">
                                    <div
                                      onClick={() => handleSelectNode(subtopic.id)}
                                      className={`
                                        w-full p-2 px-2.5 rounded-xl text-left text-xs font-semibold transition-all duration-150 cursor-pointer border
                                        ${isSubSelected
                                          ? 'bg-primary-900 text-white border-primary-400 ring-2 ring-primary-300'
                                          : isSubMatch
                                            ? 'bg-slate-800 text-amber-300 border-amber-400'
                                            : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-600 hover:text-white'
                                        }
                                      `}
                                    >
                                      <div className="flex items-center justify-between gap-1">
                                        <span className="truncate text-[11px]">
                                          {subtopic.label}
                                        </span>
                                        {hasSubChildren && (
                                          <button
                                            type="button"
                                            onClick={(e) => toggleCollapse(subtopic.id, e)}
                                            className="text-slate-400 hover:text-white"
                                          >
                                            {isSubCollapsed ? (
                                              <ChevronRight className="w-3 h-3" />
                                            ) : (
                                              <ChevronDown className="w-3 h-3" />
                                            )}
                                          </button>
                                        )}
                                      </div>
                                    </div>

                                    {/* LEVEL 4: CONCEPTS */}
                                    {!isSubCollapsed && hasSubChildren && (
                                      <div className="flex flex-col gap-1 w-full pl-2 mt-1 border-l border-slate-700">
                                        {subtopic.children.map((concept) => {
                                          const isConceptSelected = selectedNodeId === concept.id;
                                          const isConceptMatch = searchMatches.has(concept.id);

                                          return (
                                            <div
                                              key={concept.id}
                                              onClick={() => handleSelectNode(concept.id)}
                                              className={`
                                                p-1.5 px-2 rounded-lg text-[10px] font-medium transition-all cursor-pointer truncate
                                                ${isConceptSelected
                                                  ? 'bg-emerald-900 text-emerald-100 border border-emerald-400 font-bold'
                                                  : isConceptMatch
                                                    ? 'bg-slate-800 text-amber-300 border border-amber-400'
                                                    : 'bg-slate-950 text-slate-400 border border-slate-850 hover:text-slate-200'
                                                }
                                              `}
                                              title={concept.label}
                                            >
                                              • {concept.label}
                                            </div>
                                          );
                                        })}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Workspace Bottom Footer Info */}
              <div className="p-3 px-4 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 z-10 flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px]">Selected: <strong className="text-white">{selectedNode.label}</strong></span>
                </div>
                <div className="flex items-center gap-3 text-[11px]">
                  <span>Zoom: {Math.round(zoom * 100)}%</span>
                  <span>•</span>
                  <span>Nodes: 21 Active</span>
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------------------- */}
            {/* NODE DETAILS PANEL (4 Columns on desktop)                           */}
            {/* ------------------------------------------------------------------- */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <Card className="border-slate-200 shadow-sm h-full flex flex-col justify-between">
                <div>
                  <CardHeader className="pb-3 border-b border-slate-100">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge
                            variant={
                              selectedNode.type === 'root'
                                ? 'primary'
                                : selectedNode.type === 'major'
                                  ? 'secondary'
                                  : 'neutral'
                            }
                            className="text-[10px] uppercase font-bold"
                          >
                            {selectedNode.type} Node
                          </Badge>
                          <Badge
                            variant={selectedNode.priority === 'HIGH' ? 'danger' : 'warning'}
                            outline
                            className="text-[10px]"
                          >
                            {selectedNode.priority} Priority
                          </Badge>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">
                          {selectedNode.label}
                        </h3>
                        <span className="text-xs text-slate-400 font-mono">
                          Category: {selectedNode.category}
                        </span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-4 flex flex-col gap-4 text-xs text-slate-600 leading-relaxed">
                    {/* Description */}
                    <div>
                      <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider mb-1">
                        Description
                      </h4>
                      <p className="text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        {selectedNode.description}
                      </p>
                    </div>

                    {/* Key Takeaways */}
                    {selectedNode.keyTakeaways && (
                      <div>
                        <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider mb-1 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-primary-600" />
                          <span>Key Exam Focus</span>
                        </h4>
                        <p className="text-primary-950 bg-primary-50/60 p-3 rounded-xl border border-primary-100">
                          {selectedNode.keyTakeaways}
                        </p>
                      </div>
                    )}

                    {/* Related Concepts Chips */}
                    {selectedNode.related && selectedNode.related.length > 0 && (
                      <div>
                        <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider mb-1.5">
                          Related Concepts
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedNode.related.map((relName, idx) => {
                            // Find matching node ID if possible
                            const matchedEntry = Object.values(nodeLookup).find(
                              (n) => n.label.toLowerCase() === relName.toLowerCase()
                            );

                            return (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => {
                                  if (matchedEntry) {
                                    handleSelectNode(matchedEntry.id);
                                  } else {
                                    toast.info(`Reviewing "${relName}" in summary.`);
                                  }
                                }}
                                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-primary-50 hover:text-primary-700 text-slate-700 font-medium text-[11px] border border-slate-200 transition-colors cursor-pointer"
                              >
                                {relName} →
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </div>

                {/* Bottom Quick Action Link */}
                <div className="p-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <Link to="/summary" className="w-full">
                    <Button
                      variant="primary"
                      size="sm"
                      iconLeft={BookOpen}
                      className="w-full font-semibold text-xs justify-center"
                    >
                      Read In Summary
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* 5. VISUAL HIERARCHY LEGEND & AI DISCLAIMER                            */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {/* Visual Hierarchy Legend Card */}
            <Card className="border-slate-200/80 bg-white shadow-2xs">
              <CardContent className="p-4 flex flex-col gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Visual Node Hierarchy Legend
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-primary-50 border border-primary-100">
                    <span className="w-3 h-3 rounded-full bg-primary-600 shrink-0" />
                    <span className="font-bold text-primary-900 text-[11px]">Root Topic</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-100 border border-slate-200">
                    <span className="w-3 h-3 rounded-full bg-blue-600 shrink-0" />
                    <span className="font-bold text-slate-800 text-[11px]">Major Topic</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
                    <span className="font-bold text-slate-700 text-[11px]">Subtopic</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="w-3 h-3 rounded-full bg-slate-400 shrink-0" />
                    <span className="font-bold text-slate-600 text-[11px]">Concept</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Disclaimer Card */}
            <div className="p-4 rounded-2xl bg-slate-100/70 border border-slate-200/80 flex items-center gap-3 text-slate-500 text-xs">
              <Info className="w-4 h-4 text-slate-400 shrink-0" />
              <p>
                <strong>Generated from study material:</strong> Mind map nodes and connections visualize syllabus relationships. Review original course notes before examination.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
