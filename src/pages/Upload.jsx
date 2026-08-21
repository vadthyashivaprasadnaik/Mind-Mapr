import React, { useState } from 'react';
import { UploadCloud, CheckCircle, FileUp } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Card, { CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useToast } from '../components/ui/Toast';

export default function Upload() {
  const toast = useToast();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select a file to upload first.');
      return;
    }
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      toast.success(`Successfully uploaded "${file.name}"! AI analysis has started.`);
      setFile(null);
    }, 2000);
  };

  return (
    <div>
      <PageHeader
        title="Upload Study Material"
        description="Add your slides, PDFs, notes, or copy-paste text below to generate revision-ready material."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent>
              <form onSubmit={handleUploadSubmit} className="flex flex-col gap-6">
                <div className="border-2 border-dashed border-slate-200 hover:border-primary-400 rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.txt"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4 border border-primary-100/50">
                      <UploadCloud className="w-6 h-6 animate-bounce" />
                    </div>
                    <span className="text-sm font-bold text-slate-800">
                      {file ? file.name : 'Click to upload files'}
                    </span>
                    <span className="text-xs text-slate-400 mt-1">
                      Supports PDF, DOCX, TXT up to 25MB
                    </span>
                  </label>
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" type="button" disabled={uploading} onClick={() => setFile(null)}>
                    Clear Selection
                  </Button>
                  <Button variant="primary" type="submit" isLoading={uploading} iconLeft={FileUp}>
                    Upload & Process
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent>
              <h4 className="text-sm font-bold text-slate-800 mb-3">AI Capabilities</h4>
              <ul className="flex flex-col gap-3 text-xs text-slate-500">
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>Converts documents to revision summary notes automatically.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>Builds dynamic mind maps pointing to key sub-concepts.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>Generates customizable flashcard decks.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
