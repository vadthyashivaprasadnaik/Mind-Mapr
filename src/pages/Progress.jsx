import React from 'react';
import { BarChart3, TrendingUp, Award } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import ProgressBar from '../components/ui/ProgressBar';

export default function Progress() {
  return (
    <div>
      <PageHeader
        title="My Learning Analytics"
        description="Monitor study completion, correct rates, and active study time."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-base font-bold text-slate-800">Weekly Quiz Scores</h3>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
              <span>Week 1 (Graphs)</span>
              <span className="font-semibold text-slate-800">80% Correct</span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
              <span>Week 2 (Cell Structures)</span>
              <span className="font-semibold text-slate-800">90% Correct</span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Week 3 (Alkanes)</span>
              <span className="font-semibold text-slate-800">75% Correct</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-base font-bold text-slate-800">Daily Study Target</h3>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <ProgressBar value={45} max={60} showLabel label="Daily Study Minutes (Goal: 60m)" />
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              You have studied 45 minutes today. Keep it up to hit your daily cognitive memory target!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
