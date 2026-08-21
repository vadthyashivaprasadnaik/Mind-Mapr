import React from 'react';
import { FileText, Copy, Share2, Sparkles } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useToast } from '../components/ui/Toast';

export default function Summary() {
  const toast = useToast();

  const handleCopy = () => {
    toast.success('Summary copied to clipboard!');
  };

  return (
    <div>
      <PageHeader
        title="AI Exam-Focused Summary"
        description="Review concise outlines of complex documents."
      >
        <Button variant="outline" size="sm" iconLeft={Copy} onClick={handleCopy}>
          Copy Outline
        </Button>
        <Button variant="outline" size="sm" iconLeft={Share2} onClick={() => toast.info('Sharing options ready.')}>
          Share
        </Button>
      </PageHeader>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary-600 animate-pulse" />
            <h3 className="text-base font-bold text-slate-800">CS 301: Graph Traversals (Summary)</h3>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 text-sm text-slate-600 leading-relaxed">
          <div>
            <h4 className="font-bold text-slate-800 mb-2">1. Breadth-First Search (BFS)</h4>
            <p className="pl-4">
              BFS explores nodes layer by layer, starting from the source. It uses a **Queue** (FIFO structure) to track nodes that need processing. Shortest paths on unweighted graphs are always guaranteed using BFS.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 mb-2">2. Depth-First Search (DFS)</h4>
            <p className="pl-4">
              DFS explores as far as possible along each branch before backtracking. It uses a **Stack** (LIFO structure, often via recursion) to track nodes. DFS is highly optimal for pathfinding, topological sorting, and cycle detection.
            </p>
          </div>

          <div className="bg-primary-50/50 border border-primary-100 rounded-xl p-4">
            <h5 className="font-semibold text-primary-900 mb-1">Key Takeaway</h5>
            <p className="text-xs text-primary-800">
              Always use BFS for finding the shortest path on unweighted grids. Use DFS when you need to traverse the entire network or analyze dependencies (topological sort).
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
