import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowRight, HelpCircle } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import ProgressBar from '../components/ui/ProgressBar';
import Badge from '../components/ui/Badge';
import { useToast } from '../components/ui/Toast';

export default function Quiz() {
  const navigate = useNavigate();
  const toast = useToast();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  const questions = [
    {
      q: 'Which graph algorithm computes shortest path on unweighted graphs?',
      options: ['Dijkstra Algorithm', 'Breadth-First Search (BFS)', 'Depth-First Search (DFS)', 'Prim\'s Algorithm'],
      correct: 1,
    },
    {
      q: 'What is the space complexity of BFS if V is vertices and E is edges?',
      options: ['O(V)', 'O(E)', 'O(V + E)', 'O(1)'],
      correct: 0,
    },
  ];

  const handleSelect = (idx) => {
    setSelectedAnswer(idx);
  };

  const handleNext = () => {
    if (selectedAnswer === null) {
      toast.error('Please pick an answer first.');
      return;
    }

    if (selectedAnswer === questions[currentIdx].correct) {
      setScore((prev) => prev + 1);
    }

    setSelectedAnswer(null);

    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      toast.success('Quiz completed!');
      navigate('/quiz-result', { state: { score: score + (selectedAnswer === questions[currentIdx].correct ? 1 : 0), total: questions.length } });
    }
  };

  return (
    <div>
      <PageHeader
        title="Adaptive Practice Quiz"
        description="Verify your subject retention. Questions adapt based on your past quiz trends."
      />

      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <ProgressBar value={currentIdx + 1} max={questions.length} showLabel label={`Question ${currentIdx + 1} of ${questions.length}`} />
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-slate-400" />
              <h3 className="text-sm font-bold text-slate-800 leading-snug">
                {questions[currentIdx].q}
              </h3>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {questions[currentIdx].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`
                  w-full px-4 py-3 rounded-xl border text-sm font-medium text-left transition-all duration-200 cursor-pointer select-none active:scale-[0.99]
                  ${selectedAnswer === idx 
                    ? 'border-primary-500 bg-primary-50/50 text-primary-700 ring-2 ring-primary-100' 
                    : 'border-slate-100 bg-white text-slate-600 hover:border-slate-200 hover:bg-slate-50'
                  }
                `}
              >
                {opt}
              </button>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-end mt-2">
          <Button variant="primary" size="md" iconRight={ArrowRight} onClick={handleNext}>
            {currentIdx + 1 === questions.length ? 'Submit Quiz' : 'Next Question'}
          </Button>
        </div>
      </div>
    </div>
  );
}
