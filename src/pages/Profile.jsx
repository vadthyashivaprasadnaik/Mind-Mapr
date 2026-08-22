import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Building2,
  BookOpen,
  Calendar,
  Sparkles,
  Camera,
  Edit3,
  Check,
  Lock,
  Trash2,
  ArrowRight,
  TrendingUp,
  Bookmark,
  Layers,
  Flame,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  Clock,
  Zap,
  Sliders,
  Settings,
  Target,
} from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import BackButton from '../components/ui/BackButton';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import EmptyState from '../components/ui/EmptyState';
import LoadingState from '../components/ui/LoadingState';
import { useToast } from '../components/ui/Toast';

export default function Profile() {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  // View state: 'ready' | 'loading' | 'empty' | 'error'
  const [viewState, setViewState] = useState('ready');

  // Default Structured Profile Data
  const initialProfile = {
    name: 'Alex Student',
    email: 'alex.student@example.com',
    phone: '+91 98765 43210',
    college: 'Narasimha Reddy Engineering College',
    course: 'B.Tech — Computer Science and Engineering',
    year: '3rd Year',
    learningGoal: 'Exam Preparation',
    studyStyle: 'Active Recall',
    preferredStudyTime: 'Evening',
    dailyStudyTarget: '2 Hours',
    avatarInitials: 'AS',
    role: 'Student',
    memberSince: 'August 2026',
    accountStatus: 'Active',
    accountType: 'Student (Pro Demo)',
  };

  const [profile, setProfile] = useState(initialProfile);

  // Edit Personal Details State
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [personalForm, setPersonalForm] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    college: profile.college,
    course: profile.course,
    year: profile.year,
  });
  const [personalErrors, setPersonalErrors] = useState({});

  // Edit Learning Preferences State
  const [isEditingLearning, setIsEditingLearning] = useState(false);
  const [learningForm, setLearningForm] = useState({
    learningGoal: profile.learningGoal,
    studyStyle: profile.studyStyle,
    preferredStudyTime: profile.preferredStudyTime,
    dailyStudyTarget: profile.dailyStudyTarget,
  });

  // Change Password Modal State
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [showPasswords, setShowPasswords] = useState(false);

  // Delete Account Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Handle Photo Change Mock Interaction
  const handlePhotoChange = () => {
    toast.info('Photo upload will be enabled when persistent cloud storage is connected.');
  };

  // Personal Info Validation
  const validatePersonal = () => {
    const errors = {};
    if (!personalForm.name.trim()) {
      errors.name = 'Full name is required.';
    }
    if (!personalForm.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalForm.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (personalForm.phone.trim() && !/^[\d\s+\-()]{8,18}$/.test(personalForm.phone.trim())) {
      errors.phone = 'Please enter a valid phone number format.';
    }
    if (!personalForm.year.trim()) {
      errors.year = 'Academic year is required.';
    }
    setPersonalErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Save Personal Details Handler
  const handleSavePersonal = (e) => {
    e?.preventDefault();
    if (!validatePersonal()) return;

    // Calculate avatar initials from name
    const initials = personalForm.name
      .trim()
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || 'AS';

    setProfile((prev) => ({
      ...prev,
      name: personalForm.name.trim(),
      email: personalForm.email.trim(),
      phone: personalForm.phone.trim(),
      college: personalForm.college.trim(),
      course: personalForm.course.trim(),
      year: personalForm.year.trim(),
      avatarInitials: initials,
    }));

    setIsEditingPersonal(false);
    toast.success('Profile updated successfully.');
  };

  // Cancel Personal Details Handler
  const handleCancelPersonal = () => {
    setPersonalForm({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      college: profile.college,
      course: profile.course,
      year: profile.year,
    });
    setPersonalErrors({});
    setIsEditingPersonal(false);
  };

  // Save Learning Preferences Handler
  const handleSaveLearning = (e) => {
    e?.preventDefault();
    setProfile((prev) => ({
      ...prev,
      ...learningForm,
    }));
    setIsEditingLearning(false);
    toast.success('Learning preferences updated.');
  };

  // Cancel Learning Preferences Handler
  const handleCancelLearning = () => {
    setLearningForm({
      learningGoal: profile.learningGoal,
      studyStyle: profile.studyStyle,
      preferredStudyTime: profile.preferredStudyTime,
      dailyStudyTarget: profile.dailyStudyTarget,
    });
    setIsEditingLearning(false);
  };

  // Password Modal Submit Handler
  const handlePasswordSubmit = (e) => {
    e?.preventDefault();
    const errors = {};
    if (!passwordForm.currentPassword) {
      errors.currentPassword = 'Current password is required.';
    }
    if (!passwordForm.newPassword) {
      errors.newPassword = 'New password is required.';
    } else if (passwordForm.newPassword.length < 6) {
      errors.newPassword = 'Password must be at least 6 characters.';
    }
    if (!passwordForm.confirmPassword) {
      errors.confirmPassword = 'Confirm your new password.';
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errors.confirmPassword = 'New passwords do not match.';
    }

    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }

    setPasswordErrors({});
    setIsPasswordModalOpen(false);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    toast.info('Password update will be available after account authentication is connected.');
  };

  // Delete Account Confirm Handler
  const handleDeleteAccountConfirm = () => {
    setIsDeleteModalOpen(false);
    toast.info('Account deletion will be available after backend authentication is connected.');
  };

  // Learning Statistics consistent with Progress Dashboard
  const learningStats = [
    {
      id: 'materials',
      label: 'Materials Uploaded',
      value: '12',
      detail: 'Lecture notes & slides',
      icon: BookOpen,
      color: 'text-blue-600 bg-blue-50 border-blue-100',
    },
    {
      id: 'quizzes',
      label: 'Quizzes Completed',
      value: '4',
      detail: '82% average accuracy',
      icon: GraduationCap,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    },
    {
      id: 'flashcards',
      label: 'Flashcards Reviewed',
      value: '42',
      detail: 'Spaced recall active queue',
      icon: Layers,
      color: 'text-primary-600 bg-primary-50 border-primary-100',
    },
    {
      id: 'streak',
      label: 'Study Streak',
      value: '4 Days 🔥',
      detail: 'Best streak: 7 Days',
      icon: Flame,
      color: 'text-amber-600 bg-amber-50 border-amber-100',
    },
  ];

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* ========================================================================= */}
      {/* 1. BREADCRUMB & PAGE HEADER                                               */}
      {/* ========================================================================= */}
      <div>
        <BackButton
          label="Back"
          fallback="/dashboard"
          to={location.state?.from || '/dashboard'}
        />

        <PageHeader
          title="My Profile"
          description="Manage your personal information and learning profile."
        >
          {/* Dev / Tester Controls */}
          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => {
                  setViewState('ready');
                  toast.info('Viewing active profile');
                }}
                className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                  viewState === 'ready'
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Ready
              </button>
              <button
                type="button"
                onClick={() => {
                  setViewState('loading');
                  toast.info('Simulating loading state...');
                  setTimeout(() => setViewState('ready'), 1200);
                }}
                className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                  viewState === 'loading'
                    ? 'bg-white text-primary-700 shadow-2xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Loading
              </button>
              <button
                type="button"
                onClick={() => {
                  setViewState('empty');
                  toast.info('Simulating empty profile state');
                }}
                className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                  viewState === 'empty'
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Empty
              </button>
              <button
                type="button"
                onClick={() => {
                  setViewState('error');
                  toast.error('Simulating error state');
                }}
                className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                  viewState === 'error'
                    ? 'bg-white text-red-700 shadow-2xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Error
              </button>
              <button
                type="button"
                onClick={() => {
                  setProfile(initialProfile);
                  setPersonalForm({
                    name: initialProfile.name,
                    email: initialProfile.email,
                    phone: initialProfile.phone,
                    college: initialProfile.college,
                    course: initialProfile.course,
                    year: initialProfile.year,
                  });
                  setLearningForm({
                    learningGoal: initialProfile.learningGoal,
                    studyStyle: initialProfile.studyStyle,
                    preferredStudyTime: initialProfile.preferredStudyTime,
                    dailyStudyTarget: initialProfile.dailyStudyTarget,
                  });
                  setViewState('ready');
                  toast.success('Reset profile to default demo state.');
                }}
                className="px-2.5 py-1 rounded-lg font-medium text-slate-500 hover:text-slate-900 transition cursor-pointer"
                title="Reset profile data"
              >
                Reset
              </button>
            </div>

            <Link to="/settings">
              <Button
                variant="outline"
                size="sm"
                iconLeft={Settings}
                className="font-semibold text-xs cursor-pointer"
              >
                Settings
              </Button>
            </Link>
          </div>
        </PageHeader>
      </div>

      {/* ========================================================================= */}
      {/* 2. CONDITIONAL STATE ROUTING (LOADING | ERROR | EMPTY | READY)             */}
      {/* ========================================================================= */}

      {/* STAGE: LOADING */}
      {viewState === 'loading' && (
        <LoadingState
          message="Loading profile..."
          description="Retrieving your student information and learning preferences."
          size="lg"
          className="my-8"
        />
      )}

      {/* STAGE: ERROR */}
      {viewState === 'error' && (
        <Card className="border-red-200 bg-red-50/30 shadow-sm max-w-xl mx-auto my-8">
          <CardContent className="p-8 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-4 border border-red-200">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Unable to load profile
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-sm">
              Something went wrong while loading your profile.
            </p>
            <Button
              variant="primary"
              size="md"
              iconLeft={RefreshCw}
              onClick={() => {
                setViewState('ready');
                toast.success('Profile restored.');
              }}
              className="mt-6 font-semibold text-xs sm:text-sm cursor-pointer shadow-sm"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      {/* STAGE: EMPTY */}
      {viewState === 'empty' && (
        <EmptyState
          icon={User}
          title="Profile information unavailable"
          description="Your profile information will appear here after you sign in."
          actionLabel="Go to Login"
          actionIcon={ArrowRight}
          onActionClick={() => navigate('/login')}
          className="my-8"
        />
      )}

      {/* STAGE: READY */}
      {viewState === 'ready' && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-200">
          {/* ===================================================================== */}
          {/* 3. PROFILE HERO CARD                                                  */}
          {/* ===================================================================== */}
          <Card className="border-slate-200/90 bg-gradient-to-r from-slate-900 via-primary-950 to-slate-900 text-white shadow-md overflow-hidden relative">
            <div className="absolute -top-12 -right-12 w-56 h-56 bg-primary-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-secondary-500/20 rounded-full blur-3xl pointer-events-none" />

            <CardContent className="p-6 sm:p-8 relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                {/* Professional Avatar with Change Photo Trigger */}
                <div className="relative group shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-primary-500 to-secondary-600 text-white font-extrabold font-mono text-2xl sm:text-3xl flex items-center justify-center shadow-lg shadow-primary-500/30 ring-4 ring-white/10">
                    {profile.avatarInitials}
                  </div>
                  <button
                    type="button"
                    onClick={handlePhotoChange}
                    className="absolute -bottom-1 -right-1 p-2 rounded-xl bg-slate-900/90 hover:bg-slate-900 text-white border border-white/20 shadow-md transition-all duration-150 cursor-pointer"
                    title="Change Photo"
                  >
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary-400/20 text-primary-300 text-xs font-bold border border-primary-400/30">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>{profile.role}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                      <Check className="w-3 h-3 stroke-[3]" />
                      <span>{profile.accountStatus}</span>
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                    {profile.name}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-300 mt-1 flex items-center justify-center sm:justify-start gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{profile.email}</span>
                  </p>

                  <p className="text-xs text-slate-400 mt-1.5">
                    Member since <strong className="text-slate-200 font-semibold">{profile.memberSince}</strong> • {profile.college}
                  </p>
                </div>
              </div>

              {/* Quick Actions in Hero */}
              <div className="flex sm:flex-col items-center justify-center gap-2.5 shrink-0 border-t sm:border-t-0 pt-4 sm:pt-0 border-white/10">
                <Button
                  variant="glass"
                  size="sm"
                  iconLeft={Edit3}
                  onClick={() => setIsEditingPersonal(true)}
                  className="w-full sm:w-auto text-xs font-semibold cursor-pointer text-white justify-center"
                >
                  Edit Profile
                </Button>
                <Link to="/progress" className="w-full sm:w-auto">
                  <Button
                    variant="white"
                    size="sm"
                    iconLeft={TrendingUp}
                    className="w-full text-xs font-bold text-slate-900 justify-center shadow-xs"
                  >
                    My Analytics
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* ===================================================================== */}
          {/* 4. MAIN TWO-COLUMN SECTION (Left: Personal + Learning; Right: Stats) */}
          {/* ===================================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ------------------------------------------------------------------- */}
            {/* LEFT COLUMN (2/3): PERSONAL INFORMATION & LEARNING PREFERENCES       */}
            {/* ------------------------------------------------------------------- */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* CARD 1: PERSONAL INFORMATION */}
              <Card className="border-slate-200/90 bg-white shadow-xs">
                <CardHeader className="p-5 pb-3 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">
                        Personal Information
                      </h4>
                      <p className="text-xs text-slate-500">
                        Your university credentials and contact information.
                      </p>
                    </div>
                  </div>

                  {!isEditingPersonal && (
                    <Button
                      variant="outline"
                      size="sm"
                      iconLeft={Edit3}
                      onClick={() => setIsEditingPersonal(true)}
                      className="text-xs font-semibold cursor-pointer"
                    >
                      Edit Details
                    </Button>
                  )}
                </CardHeader>

                <CardContent className="p-5 sm:p-6">
                  {/* READ VIEW */}
                  {!isEditingPersonal && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Full Name
                        </span>
                        <span className="text-sm font-bold text-slate-800">
                          {profile.name}
                        </span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Email Address
                        </span>
                        <span className="text-sm font-bold text-slate-800 break-all">
                          {profile.email}
                        </span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Phone Number
                        </span>
                        <span className="text-sm font-bold text-slate-800 font-mono">
                          {profile.phone || 'Not provided'}
                        </span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Academic Year
                        </span>
                        <Badge variant="primary" className="text-xs font-bold px-2.5 py-0.5">
                          {profile.year}
                        </Badge>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 sm:col-span-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          College / University
                        </span>
                        <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                          <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                          {profile.college}
                        </span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 sm:col-span-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Course & Major
                        </span>
                        <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4 text-slate-400 shrink-0" />
                          {profile.course}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* EDIT FORM VIEW */}
                  {isEditingPersonal && (
                    <form onSubmit={handleSavePersonal} className="flex flex-col gap-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          label="Full Name *"
                          value={personalForm.name}
                          onChange={(e) =>
                            setPersonalForm({ ...personalForm, name: e.target.value })
                          }
                          error={personalErrors.name}
                          placeholder="Alex Student"
                          iconLeft={User}
                        />

                        <Input
                          label="Email Address *"
                          type="email"
                          value={personalForm.email}
                          onChange={(e) =>
                            setPersonalForm({ ...personalForm, email: e.target.value })
                          }
                          error={personalErrors.email}
                          placeholder="alex.student@example.com"
                          iconLeft={Mail}
                        />

                        <Input
                          label="Phone Number"
                          type="tel"
                          value={personalForm.phone}
                          onChange={(e) =>
                            setPersonalForm({ ...personalForm, phone: e.target.value })
                          }
                          error={personalErrors.phone}
                          placeholder="+91 98765 43210"
                          iconLeft={Phone}
                        />

                        {/* Year Selector */}
                        <div className="flex flex-col gap-1.5 w-full">
                          <label className="text-sm font-semibold text-slate-700 select-none">
                            Academic Year *
                          </label>
                          <select
                            value={personalForm.year}
                            onChange={(e) =>
                              setPersonalForm({ ...personalForm, year: e.target.value })
                            }
                            className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl transition-all duration-200 outline-none focus:border-primary-500 cursor-pointer"
                          >
                            <option value="1st Year">1st Year</option>
                            <option value="2nd Year">2nd Year</option>
                            <option value="3rd Year">3rd Year</option>
                            <option value="4th Year">4th Year</option>
                            <option value="Post Graduate">Post Graduate</option>
                          </select>
                          {personalErrors.year && (
                            <p className="text-xs font-medium text-red-600">
                              {personalErrors.year}
                            </p>
                          )}
                        </div>

                        <div className="sm:col-span-2">
                          <Input
                            label="College / Institution"
                            value={personalForm.college}
                            onChange={(e) =>
                              setPersonalForm({ ...personalForm, college: e.target.value })
                            }
                            placeholder="Narasimha Reddy Engineering College"
                            iconLeft={Building2}
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <Input
                            label="Course & Specialization"
                            value={personalForm.course}
                            onChange={(e) =>
                              setPersonalForm({ ...personalForm, course: e.target.value })
                            }
                            placeholder="B.Tech — Computer Science and Engineering"
                            iconLeft={BookOpen}
                          />
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleCancelPersonal}
                          className="text-xs font-semibold cursor-pointer"
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          type="submit"
                          iconLeft={Check}
                          className="text-xs font-bold cursor-pointer shadow-xs"
                        >
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>

              {/* CARD 2: LEARNING PROFILE & PREFERENCES */}
              <Card className="border-slate-200/90 bg-white shadow-xs">
                <CardHeader className="p-5 pb-3 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">
                        Learning Profile
                      </h4>
                      <p className="text-xs text-slate-500">
                        Preferences used to tailor revision pacing and smart recommendations.
                      </p>
                    </div>
                  </div>

                  {!isEditingLearning && (
                    <Button
                      variant="outline"
                      size="sm"
                      iconLeft={Sliders}
                      onClick={() => setIsEditingLearning(true)}
                      className="text-xs font-semibold cursor-pointer"
                    >
                      Edit Preferences
                    </Button>
                  )}
                </CardHeader>

                <CardContent className="p-5 sm:p-6">
                  {/* READ VIEW */}
                  {!isEditingLearning && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Primary Learning Goal
                        </span>
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-primary-600" />
                          <span className="text-sm font-bold text-slate-800">
                            {profile.learningGoal}
                          </span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Preferred Study Style
                        </span>
                        <div className="flex items-center gap-2">
                          <Layers className="w-4 h-4 text-secondary-600" />
                          <span className="text-sm font-bold text-slate-800">
                            {profile.studyStyle}
                          </span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Preferred Study Time
                        </span>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-amber-600" />
                          <span className="text-sm font-bold text-slate-800">
                            {profile.preferredStudyTime}
                          </span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Daily Study Target
                        </span>
                        <div className="flex items-center gap-2">
                          <Flame className="w-4 h-4 text-red-600" />
                          <span className="text-sm font-bold text-slate-800">
                            {profile.dailyStudyTarget}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* EDIT FORM VIEW */}
                  {isEditingLearning && (
                    <form onSubmit={handleSaveLearning} className="flex flex-col gap-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Learning Goal */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Primary Learning Goal
                          </label>
                          <select
                            value={learningForm.learningGoal}
                            onChange={(e) =>
                              setLearningForm({ ...learningForm, learningGoal: e.target.value })
                            }
                            className="w-full px-3 py-2.5 text-xs font-semibold bg-white border border-slate-200 rounded-xl outline-none focus:border-primary-500 cursor-pointer"
                          >
                            <option value="Exam Preparation">Exam Preparation</option>
                            <option value="Concept Building">Concept Building</option>
                            <option value="Interview Preparation">Interview Preparation</option>
                            <option value="General Learning">General Learning</option>
                          </select>
                        </div>

                        {/* Study Style */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Preferred Study Style
                          </label>
                          <select
                            value={learningForm.studyStyle}
                            onChange={(e) =>
                              setLearningForm({ ...learningForm, studyStyle: e.target.value })
                            }
                            className="w-full px-3 py-2.5 text-xs font-semibold bg-white border border-slate-200 rounded-xl outline-none focus:border-primary-500 cursor-pointer"
                          >
                            <option value="Active Recall">Active Recall (Flashcards & Quizzes)</option>
                            <option value="Visual Learning">Visual Learning (Mind Maps)</option>
                            <option value="Reading">Reading (Smart Summaries)</option>
                            <option value="Mixed">Mixed Learning</option>
                          </select>
                        </div>

                        {/* Preferred Time */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Preferred Study Time
                          </label>
                          <select
                            value={learningForm.preferredStudyTime}
                            onChange={(e) =>
                              setLearningForm({
                                ...learningForm,
                                preferredStudyTime: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2.5 text-xs font-semibold bg-white border border-slate-200 rounded-xl outline-none focus:border-primary-500 cursor-pointer"
                          >
                            <option value="Morning">Morning (8:00 AM - 12:00 PM)</option>
                            <option value="Afternoon">Afternoon (12:00 PM - 5:00 PM)</option>
                            <option value="Evening">Evening (5:00 PM - 9:00 PM)</option>
                            <option value="Flexible">Flexible / Anytime</option>
                          </select>
                        </div>

                        {/* Daily Target */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Daily Study Target
                          </label>
                          <select
                            value={learningForm.dailyStudyTarget}
                            onChange={(e) =>
                              setLearningForm({
                                ...learningForm,
                                dailyStudyTarget: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2.5 text-xs font-semibold bg-white border border-slate-200 rounded-xl outline-none focus:border-primary-500 cursor-pointer"
                          >
                            <option value="30 minutes">30 minutes / day</option>
                            <option value="1 hour">1 hour / day</option>
                            <option value="2 Hours">2 Hours / day</option>
                            <option value="3+ hours">3+ hours / day</option>
                          </select>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleCancelLearning}
                          className="text-xs font-semibold cursor-pointer"
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          type="submit"
                          iconLeft={Check}
                          className="text-xs font-bold cursor-pointer shadow-xs"
                        >
                          Save Preferences
                        </Button>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* ------------------------------------------------------------------- */}
            {/* RIGHT COLUMN (1/3): STATS, ACCOUNT INFO, SECURITY & QUICK ACTIONS   */}
            {/* ------------------------------------------------------------------- */}
            <div className="flex flex-col gap-5">
              {/* LEARNING STATISTICS CARD (Consistent with Progress Dashboard) */}
              <Card className="border-slate-200/90 bg-white shadow-xs">
                <CardHeader className="p-4 pb-3 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary-600" />
                      <h4 className="text-sm font-bold text-slate-900">Learning Statistics</h4>
                    </div>
                    <Link
                      to="/progress"
                      className="text-xs font-semibold text-primary-600 hover:underline"
                    >
                      View All
                    </Link>
                  </div>
                </CardHeader>

                <CardContent className="p-4 pt-3 flex flex-col gap-2.5">
                  {learningStats.map((st) => {
                    const Icon = st.icon;
                    return (
                      <div
                        key={st.id}
                        className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className={`p-2 rounded-lg border shrink-0 ${st.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <span className="text-xs font-bold text-slate-800 block truncate">
                              {st.label}
                            </span>
                            <span className="text-[11px] text-slate-400 truncate block">
                              {st.detail}
                            </span>
                          </div>
                        </div>

                        <span className="text-sm font-extrabold font-mono text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 shrink-0">
                          {st.value}
                        </span>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* ACCOUNT INFORMATION CARD */}
              <Card className="border-slate-200/90 bg-white shadow-xs">
                <CardHeader className="p-4 pb-3 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <h4 className="text-sm font-bold text-slate-900">Account Information</h4>
                  </div>
                </CardHeader>

                <CardContent className="p-4 pt-3 flex flex-col gap-2 text-xs">
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Account Type</span>
                    <Badge variant="primary">{profile.accountType}</Badge>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Account Status</span>
                    <Badge variant="success">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between py-1.5">
                    <span className="text-slate-500">Member Since</span>
                    <span className="font-semibold text-slate-800">{profile.memberSince}</span>
                  </div>
                </CardContent>
              </Card>

              {/* ACCOUNT SECURITY & DANGER ZONE CARD */}
              <Card className="border-slate-200/90 bg-white shadow-xs">
                <CardHeader className="p-4 pb-3 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-slate-600" />
                    <h4 className="text-sm font-bold text-slate-900">Account Security</h4>
                  </div>
                </CardHeader>

                <CardContent className="p-4 pt-3 flex flex-col gap-3">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">Password</span>
                      <span className="text-xs text-slate-400 font-mono tracking-widest">••••••••</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsPasswordModalOpen(true)}
                      className="text-xs font-semibold cursor-pointer"
                    >
                      Change Password
                    </Button>
                  </div>

                  {/* Danger Zone: Account Deletion */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-red-700 block">Delete Account</span>
                      <span className="text-[10px] text-slate-400">Permanently remove study data</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsDeleteModalOpen(true)}
                      className="text-xs font-semibold text-red-600 hover:text-red-800 hover:underline cursor-pointer"
                    >
                      Delete Account
                    </button>
                  </div>
                </CardContent>
              </Card>

              {/* QUICK ACTIONS CARD */}
              <Card className="border-slate-200/90 bg-white shadow-xs">
                <CardHeader className="p-4 pb-3 border-b border-slate-100">
                  <h4 className="text-sm font-bold text-slate-900">Quick Actions</h4>
                </CardHeader>
                <CardContent className="p-4 pt-3 flex flex-col gap-2">
                  <Link to="/progress" className="block w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      iconLeft={TrendingUp}
                      iconRight={ArrowRight}
                      className="w-full text-xs font-semibold justify-between cursor-pointer"
                    >
                      View Progress
                    </Button>
                  </Link>

                  <Link to="/important-topics" className="block w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      iconLeft={Bookmark}
                      iconRight={ArrowRight}
                      className="w-full text-xs font-semibold justify-between cursor-pointer"
                    >
                      Important Topics
                    </Button>
                  </Link>

                  <Link to="/revision-plan" className="block w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      iconLeft={Calendar}
                      iconRight={ArrowRight}
                      className="w-full text-xs font-semibold justify-between cursor-pointer"
                    >
                      Revision Planner
                    </Button>
                  </Link>

                  <Link to="/settings" className="block w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      iconLeft={Settings}
                      iconRight={ArrowRight}
                      className="w-full text-xs font-semibold justify-between cursor-pointer"
                    >
                      Settings
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* 5. DISCLAIMER FOOTER                                                  */}
          {/* ===================================================================== */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center flex items-center justify-center text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-primary-500" />
              Profile information is currently in local demo mode. Persistent profile synchronization will be enabled with backend authentication.
            </span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. CHANGE PASSWORD MODAL                                                  */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isPasswordModalOpen}
        onClose={() => {
          setIsPasswordModalOpen(false);
          setPasswordErrors({});
        }}
        title="Change Account Password"
        size="md"
        footer={
          <div className="flex items-center justify-between w-full">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsPasswordModalOpen(false);
                setPasswordErrors({});
              }}
              className="text-xs font-semibold"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handlePasswordSubmit}
              className="text-xs font-bold cursor-pointer shadow-xs"
            >
              Update Password
            </Button>
          </div>
        }
      >
        <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
          <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-blue-900 leading-relaxed">
            Ensure your new password contains at least 6 characters. Passwords will be authenticated securely via JWT when the backend is connected.
          </div>

          <Input
            label="Current Password *"
            type={showPasswords ? 'text' : 'password'}
            value={passwordForm.currentPassword}
            onChange={(e) =>
              setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
            }
            error={passwordErrors.currentPassword}
            placeholder="Enter current password"
            iconLeft={Lock}
          />

          <Input
            label="New Password *"
            type={showPasswords ? 'text' : 'password'}
            value={passwordForm.newPassword}
            onChange={(e) =>
              setPasswordForm({ ...passwordForm, newPassword: e.target.value })
            }
            error={passwordErrors.newPassword}
            placeholder="Enter new password (min. 6 chars)"
            iconLeft={Lock}
          />

          <Input
            label="Confirm New Password *"
            type={showPasswords ? 'text' : 'password'}
            value={passwordForm.confirmPassword}
            onChange={(e) =>
              setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
            }
            error={passwordErrors.confirmPassword}
            placeholder="Re-enter new password"
            iconLeft={Lock}
          />

          <div className="flex items-center gap-2 pt-1">
            <input
              id="show-passwords-check"
              type="checkbox"
              checked={showPasswords}
              onChange={(e) => setShowPasswords(e.target.checked)}
              className="rounded text-primary-600 focus:ring-primary-500 cursor-pointer"
            />
            <label
              htmlFor="show-passwords-check"
              className="text-xs font-medium text-slate-600 select-none cursor-pointer"
            >
              Show passwords
            </label>
          </div>
        </form>
      </Modal>

      {/* ========================================================================= */}
      {/* 7. DELETE ACCOUNT CONFIRMATION MODAL                                      */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete your account?"
        size="md"
        footer={
          <div className="flex items-center justify-between w-full">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDeleteModalOpen(false)}
              className="text-xs font-semibold"
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              iconLeft={Trash2}
              onClick={handleDeleteAccountConfirm}
              className="text-xs font-bold cursor-pointer shadow-xs"
            >
              Delete Account
            </Button>
          </div>
        }
      >
        <div className="flex flex-col gap-4 text-slate-600 text-sm">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="text-xs text-red-900 leading-relaxed">
              <strong className="font-bold block mb-0.5">This action cannot be undone.</strong>
              All your revision materials, summaries, mind maps, and quiz progress will be permanently deleted once authentication is active.
            </div>
          </div>

          <p className="text-xs text-slate-500">
            Are you sure you want to proceed with account deletion?
          </p>
        </div>
      </Modal>
    </div>
  );
}
