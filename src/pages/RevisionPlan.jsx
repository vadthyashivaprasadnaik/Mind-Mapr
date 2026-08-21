import React from 'react';
import { Calendar, Bell, Clock } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import BackButton from '../components/ui/BackButton';
import Card, { CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { useToast } from '../components/ui/Toast';

export default function RevisionPlan() {
  const toast = useToast();

  const milestones = [
    { title: 'Graph Traversals (BFS/DFS)', time: 'Today, 4:00 PM', status: 'Due' },
    { title: 'Cell Cycle & Mitosis Review', time: 'Tomorrow, 10:00 AM', status: 'Scheduled' },
    { title: 'Organic Alkane Synthesis Practice', time: 'Aug 23, 2:00 PM', status: 'Scheduled' },
  ];

  return (
    <div>
      <BackButton label="Back" fallback="/dashboard" />
      <PageHeader
        title="Personalized Revision Plan"
        description="Spaced repetition schedules calculated to optimize cognitive retention."
      />

      <div className="flex flex-col gap-4">
        {milestones.map((ms, idx) => (
          <Card key={idx} hoverEffect>
            <CardContent className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{ms.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{ms.time}</p>
                </div>
              </div>
              <Badge variant={ms.status === 'Due' ? 'danger' : 'primary'}>
                {ms.status}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
