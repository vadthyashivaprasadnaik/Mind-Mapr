import React, { useState } from 'react';
import { Layers, RotateCcw, ThumbsUp, ThumbsDown, Sparkles } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Card, { CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useToast } from '../components/ui/Toast';

export default function Flashcards() {
  const toast = useToast();
  const [flipped, setFlipped] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);

  const cards = [
    { front: 'What data structure does BFS use?', back: 'BFS utilizes a Queue (First-In, First-Out) data structure to keep track of adjacent nodes.' },
    { front: 'What is the time complexity of DFS on a graph G = (V, E)?', back: 'The time complexity of DFS is O(|V| + |E|) when using an adjacency list representation.' },
    { front: 'Can BFS detect cycles in a graph?', back: 'Yes, both BFS and DFS can detect cycles. If an already visited node is seen during search (excluding its parent), a cycle exists.' },
  ];

  const handleNext = (known) => {
    setFlipped(false);
    if (known) {
      toast.success('Added to mastered pile!', 1500);
    } else {
      toast.info('Needs more study. Will repeat.', 1500);
    }
    setTimeout(() => {
      setCardIndex((prev) => (prev + 1) % cards.length);
    }, 200);
  };

  return (
    <div>
      <PageHeader
        title="AI-Generated Flashcards"
        description="Strengthen active recall using cards generated from your notes."
      />

      <div className="max-w-md mx-auto flex flex-col gap-6 py-6">
        <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
          <span>Card {cardIndex + 1} of {cards.length}</span>
          <Badge variant="secondary">Active Recall</Badge>
        </div>

        {/* Flip Card Container */}
        <div 
          onClick={() => setFlipped((prev) => !prev)}
          className="h-64 cursor-pointer relative perspective-1000 w-full active:scale-[0.99] transition-transform duration-200"
        >
          {/* Card Front */}
          <div 
            className={`
              absolute inset-0 bg-white border border-slate-100 rounded-2xl shadow-md p-6 flex flex-col justify-between transition-all duration-300 backface-hidden
              ${flipped ? 'rotate-y-180 opacity-0 pointer-events-none' : 'rotate-y-0 opacity-100'}
            `}
          >
            <div className="flex items-center justify-between text-slate-400">
              <Layers className="w-5 h-5" />
              <span className="text-3xs font-bold uppercase tracking-wider">Question</span>
            </div>
            <p className="text-base font-bold text-center text-slate-800 leading-relaxed px-4">
              {cards[cardIndex].front}
            </p>
            <div className="text-center text-3xs text-slate-400 font-medium">
              Click to flip and reveal answer
            </div>
          </div>

          {/* Card Back */}
          <div 
            className={`
              absolute inset-0 bg-slate-900 border border-slate-800 text-white rounded-2xl shadow-md p-6 flex flex-col justify-between transition-all duration-300 backface-hidden
              ${flipped ? 'rotate-y-0 opacity-100' : 'rotate-y-180 opacity-0 pointer-events-none'}
            `}
          >
            <div className="flex items-center justify-between text-slate-400">
              <Sparkles className="w-5 h-5 text-primary-400" />
              <span className="text-3xs font-bold uppercase tracking-wider text-primary-300">Answer</span>
            </div>
            <p className="text-sm font-semibold text-center text-slate-100 leading-relaxed px-4">
              {cards[cardIndex].back}
            </p>
            <div className="text-center text-3xs text-slate-400 font-medium">
              Click to flip back
            </div>
          </div>
        </div>

        {/* Actions */}
        {flipped && (
          <div className="flex gap-4 mt-2 animate-in fade-in zoom-in-95 duration-200 justify-center">
            <Button variant="danger" size="sm" iconLeft={ThumbsDown} onClick={() => handleNext(false)}>
              Still learning
            </Button>
            <Button variant="primary" size="sm" iconLeft={ThumbsUp} onClick={() => handleNext(true)}>
              I knew this!
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
