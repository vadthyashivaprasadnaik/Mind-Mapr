import React from 'react';
import { FolderOpen, FileText, Trash2, ArrowRight } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Card, { CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { useToast } from '../components/ui/Toast';

export default function Materials() {
  const toast = useToast();

  const libraryItems = [
    { name: 'Lecture 4 - Graphs.pdf', size: '2.4 MB', date: '2 hours ago', tag: 'CS 301' },
    { name: 'Chapter 2 - Cell Cycle.pdf', size: '4.8 MB', date: 'Yesterday', tag: 'BIO 204' },
    { name: 'Alkanes & Alkynes Notes.txt', size: '156 KB', date: '3 days ago', tag: 'CHEM 102' },
  ];

  return (
    <div>
      <PageHeader
        title="Study Library"
        description="Manage your uploaded textbooks, lecture files, and review resources."
      >
        <Button variant="outline" size="sm" onClick={() => toast.info('Library updated')}>
          Refresh List
        </Button>
      </PageHeader>

      <div className="flex flex-col gap-4 mt-4">
        {libraryItems.map((item, idx) => (
          <Card key={idx} hoverEffect>
            <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{item.name}</h4>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
                    <span>{item.size}</span>
                    <span>•</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="primary">{item.tag}</Badge>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => toast.success(`Viewing details for ${item.name}`)}>
                    Open
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 border-red-100 hover:bg-red-50" onClick={() => toast.success(`Deleted ${item.name}`)}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
