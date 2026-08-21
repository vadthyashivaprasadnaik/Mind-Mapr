import React from 'react';
import { Bookmark, AlertTriangle, CheckCircle } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import BackButton from '../components/ui/BackButton';
import Card, { CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { useToast } from '../components/ui/Toast';

export default function ImportantTopics() {
  const toast = useToast();

  const topics = [
    { name: 'Cycle Detection in Directed Graphs', priority: 'High', details: 'Frequently tested in midterm exam proofs. Understand visited and stack arrays.', solved: false },
    { name: 'BFS vs DFS Space Complexities', priority: 'Medium', details: 'Know worst-case stack depths vs queue space layouts.', solved: true },
    { name: 'Topological Sort Applications', priority: 'Low', details: 'Study dependency resolution scenarios.', solved: true },
  ];

  return (
    <div>
      <BackButton label="Back" fallback="/materials" />
      <PageHeader
        title="Key Exam Topics"
        description="Review high-priority concepts extracted from uploaded materials."
      />

      <div className="flex flex-col gap-4">
        {topics.map((t, idx) => (
          <Card key={idx} hoverEffect>
            <CardContent className="flex items-start gap-4">
              <div className={`p-2.5 rounded-xl bg-slate-50 border border-slate-100 mt-1 shrink-0`}>
                <Bookmark className="w-5 h-5 text-slate-700" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-800">{t.name}</h4>
                  <Badge variant={t.priority === 'High' ? 'danger' : t.priority === 'Medium' ? 'warning' : 'neutral'}>
                    {t.priority} Priority
                  </Badge>
                  <Badge variant={t.solved ? 'success' : 'neutral'}>
                    {t.solved ? 'Reviewed' : 'Pending'}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {t.details}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
