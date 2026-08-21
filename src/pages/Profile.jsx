import React from 'react';
import { User, Mail, GraduationCap } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';

export default function Profile() {
  return (
    <div>
      <PageHeader
        title="Student Profile"
        description="Review and update your university account details."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h3 className="text-base font-bold text-slate-800">Account Details</h3>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Input
                label="Full Name"
                type="text"
                value="Alex Mercer"
                iconLeft={User}
                disabled
              />
              <Input
                label="University Email Address"
                type="email"
                value="student@college.edu"
                iconLeft={Mail}
                disabled
              />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="flex flex-col items-center text-center p-6">
              <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold border border-slate-200 text-xl">
                AM
              </div>
              <h4 className="text-base font-bold text-slate-800 mt-4">Alex Mercer</h4>
              <p className="text-xs text-slate-400 mt-1">student@college.edu</p>
              
              <div className="flex flex-col gap-2 w-full mt-6">
                <div className="flex justify-between items-center text-xs pb-2.5 border-b border-slate-100">
                  <span className="text-slate-400">Class</span>
                  <Badge variant="primary">Junior (Year 3)</Badge>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Institution</span>
                  <span className="font-semibold text-slate-800 truncate max-w-[120px]">State University</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
