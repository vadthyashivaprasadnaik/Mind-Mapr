import React from 'react';
import { Network, ZoomIn, ZoomOut, RefreshCw } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import BackButton from '../components/ui/BackButton';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useToast } from '../components/ui/Toast';

export default function MindMap() {
  const toast = useToast();

  const handleNodeClick = (nodeName) => {
    toast.info(`Selected Node: "${nodeName}" - click key topics to review sub-notes.`, 3000);
  };

  return (
    <div>
      <BackButton label="Back" fallback="/materials" />
      <PageHeader
        title="AI-Generated Mind Map"
        description="Interact with visual node connections of your courses to improve conceptual models."
      >
        <div className="flex gap-1.5">
          <Button variant="outline" size="sm" className="p-2"><ZoomIn className="w-4 h-4" /></Button>
          <Button variant="outline" size="sm" className="p-2"><ZoomOut className="w-4 h-4" /></Button>
          <Button variant="outline" size="sm" iconLeft={RefreshCw} onClick={() => toast.info('Rearranging mind map layout...')}>
            Recenter
          </Button>
        </div>
      </PageHeader>

      <Card className="bg-slate-900 border-slate-800 text-white min-h-[450px] relative overflow-hidden flex flex-col justify-between p-6">
        <div className="flex justify-between items-center z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700/50">
            <Network className="w-4 h-4 text-primary-400" />
            <span>Interactive Node Canvas</span>
          </div>
          <span className="text-2xs text-slate-400 bg-slate-800/50 px-2.5 py-1 rounded-md">Topic: Graph Traversals</span>
        </div>

        {/* Mock Mind Map SVG and Node Circles */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg className="absolute w-full h-full stroke-slate-700 stroke-[2] stroke-dasharray-[4]">
            <line x1="50%" y1="50%" x2="25%" y2="35%" />
            <line x1="50%" y1="50%" x2="75%" y2="35%" />
            <line x1="50%" y1="50%" x2="50%" y2="75%" />
          </svg>
        </div>

        {/* Floating Interactive Nodes */}
        <div className="flex-1 relative flex items-center justify-center">
          {/* Center Root Node */}
          <button
            onClick={() => handleNodeClick('Graph Traversals')}
            className="absolute p-4 rounded-2xl bg-primary-600 hover:bg-primary-500 text-white text-sm font-bold shadow-lg shadow-primary-500/20 pointer-events-auto cursor-pointer border border-primary-400 active:scale-95 transition-all duration-150"
          >
            Graph Traversals
          </button>

          {/* Sub-node 1 (Top Left) */}
          <button
            onClick={() => handleNodeClick('BFS (Queue)')}
            className="absolute top-[18%] left-[12%] sm:left-[22%] p-3.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 shadow-md cursor-pointer pointer-events-auto active:scale-95 transition-all duration-150"
          >
            BFS (Queue)
          </button>

          {/* Sub-node 2 (Top Right) */}
          <button
            onClick={() => handleNodeClick('DFS (Recursion)')}
            className="absolute top-[18%] right-[12%] sm:right-[22%] p-3.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 shadow-md cursor-pointer pointer-events-auto active:scale-95 transition-all duration-150"
          >
            DFS (Recursion)
          </button>

          {/* Sub-node 3 (Bottom Center) */}
          <button
            onClick={() => handleNodeClick('Applications (Shortest Path)')}
            className="absolute bottom-[18%] p-3.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 shadow-md cursor-pointer pointer-events-auto active:scale-95 transition-all duration-150"
          >
            Applications (Shortest Path)
          </button>
        </div>

        <div className="text-center text-xs text-slate-500 z-10 select-none">
          Tip: Click on nodes to review associated core revision facts.
        </div>
      </Card>
    </div>
  );
}
