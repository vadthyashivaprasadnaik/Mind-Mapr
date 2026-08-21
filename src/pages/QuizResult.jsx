import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Award, RefreshCw, BookOpen } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Card, { CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

export default function QuizResult() {
  const location = useLocation();
  const scoreData = location.state || { score: 2, total: 2 };
  
  const pct = Math.round((scoreData.score / scoreData.total) * 100);

  return (
    <div>
      <PageHeader
        title="Practice Quiz Results"
        description="Here is your comprehension scorecard."
      />

      <div className="max-w-md mx-auto flex flex-col gap-6 py-6 items-center text-center">
        <div className="w-20 h-20 rounded-full bg-green-50 border border-green-150 flex items-center justify-center text-green-600 mb-2">
          <Award className="w-10 h-10 animate-bounce" />
        </div>

        <div>
          <Badge variant={pct >= 80 ? 'success' : 'warning'} className="mb-2">
            {pct >= 80 ? 'Excellent work!' : 'Needs review'}
          </Badge>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            You scored {scoreData.score} / {scoreData.total}
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Comprehension accuracy of {pct}%
          </p>
        </div>

        <Card className="w-full">
          <CardContent className="flex flex-col gap-3.5 text-xs text-slate-500">
            <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
              <span>Time Spent</span>
              <span className="font-semibold text-slate-800">1m 45s</span>
            </div>
            <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
              <span>Difficulty Level</span>
              <span className="font-semibold text-slate-800">Standard</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Topic Focus</span>
              <span className="font-semibold text-slate-800">CS 301: Graph Traversals</span>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Link to="/quiz">
            <Button variant="outline" size="sm" iconLeft={RefreshCw}>
              Retry Quiz
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="primary" size="sm" iconLeft={BookOpen}>
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
