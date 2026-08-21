import React, { useState } from 'react';
import { Settings as SettingsIcon, Shield, BellRing, Sparkles } from 'lucide-react';
import BackButton from '../components/ui/BackButton';
import PageHeader from '../components/ui/PageHeader';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useToast } from '../components/ui/Toast';

export default function Settings() {
  const toast = useToast();
  const [aiCreativity, setAiCreativity] = useState('Standard');

  const handleSave = () => {
    toast.success('Configuration preferences saved!');
  };

  return (
    <div>
      <BackButton label="Back" fallback="/dashboard" />
      <PageHeader
        title="Settings & System Configurations"
        description="Configure your study profile and smart AI revision engine."
      />

      <div className="flex flex-col gap-6 max-w-2xl">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary-600" />
              <h3 className="text-base font-bold text-slate-800">AI Model Settings</h3>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <div>
                <h5 className="font-semibold text-slate-800">AI Model Depth</h5>
                <p className="text-xs text-slate-400">Controls how comprehensive the generated maps and summaries are.</p>
              </div>
              <div className="flex gap-2">
                {['Concise', 'Standard', 'Comprehensive'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setAiCreativity(lvl)}
                    className={`
                      px-3 py-1.5 text-xs font-semibold rounded-lg border cursor-pointer transition-colors
                      ${aiCreativity === lvl 
                        ? 'border-primary-500 bg-primary-50 text-primary-700' 
                        : 'border-slate-100 bg-white text-slate-600 hover:border-slate-200'
                      }
                    `}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button variant="primary" onClick={handleSave}>
            Save Preferences
          </Button>
        </div>
      </div>
    </div>
  );
}
