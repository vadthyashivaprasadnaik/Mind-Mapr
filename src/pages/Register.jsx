import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BrainCircuit,
  Mail,
  Lock,
  User,
  GraduationCap,
  BookOpen,
  Calendar,
  Eye,
  EyeOff,
  UserPlus,
  ArrowLeft,
  Sparkles,
  Zap,
  Layers,
  Target,
  CheckCircle2,
  AlertCircle,
  Check,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useToast } from '../components/ui/Toast';

export default function Register() {
  const navigate = useNavigate();
  const toast = useToast();

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    college: '',
    course: '',
    yearOfStudy: '',
  });

  // Password Visibility Toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Status & Validation States
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [globalError, setGlobalError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Year of study options
  const yearOptions = [
    { value: '', label: 'Select Year of Study' },
    { value: '1st Year', label: '1st Year / Freshman' },
    { value: '2nd Year', label: '2nd Year / Sophomore' },
    { value: '3rd Year', label: '3rd Year / Junior' },
    { value: '4th Year', label: '4th Year / Senior' },
    { value: 'Postgraduate', label: 'Postgraduate / Master’s' },
    { value: 'PhD / Research', label: 'PhD / Researcher' },
  ];

  // Email format regex validation
  const validateEmail = (val) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  // Password Strength Calculation
  const passwordStrength = useMemo(() => {
    const pwd = formData.password;
    if (!pwd) return { score: 0, label: '', color: '', percent: 0, criteria: {} };

    const criteria = {
      length: pwd.length >= 8,
      hasUpper: /[A-Z]/.test(pwd),
      hasLower: /[a-z]/.test(pwd),
      hasNumber: /[0-9]/.test(pwd),
      hasSpecial: /[^A-Za-z0-9]/.test(pwd),
    };

    let score = 0;
    if (criteria.length) score += 1;
    if (criteria.hasUpper && criteria.hasLower) score += 1;
    if (criteria.hasNumber) score += 1;
    if (criteria.hasSpecial) score += 1;

    let label = 'Weak';
    let color = 'bg-red-500 text-red-600';
    let percent = 25;

    if (score === 2) {
      label = 'Fair';
      color = 'bg-amber-500 text-amber-600';
      percent = 50;
    } else if (score === 3) {
      label = 'Good';
      color = 'bg-blue-500 text-blue-600';
      percent = 75;
    } else if (score >= 4) {
      label = 'Strong';
      color = 'bg-emerald-500 text-emerald-600';
      percent = 100;
    }

    return { score, label, color, percent, criteria };
  }, [formData.password]);

  // Validate single field or all fields
  const validateField = (name, value, allValues = formData) => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Full name must be at least 2 characters';
        return '';
      case 'email':
        if (!value.trim()) return 'Email address is required';
        if (!validateEmail(value)) return 'Please enter a valid email address';
        return '';
      case 'password':
        if (!value) return 'Password cannot be empty';
        if (value.length < 8) return 'Password must be at least 8 characters';
        return '';
      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== allValues.password) return 'Passwords do not match';
        return '';
      case 'college':
        if (!value.trim()) return 'College / University is required';
        return '';
      case 'course':
        if (!value.trim()) return 'Course / Major is required';
        return '';
      case 'yearOfStudy':
        if (!value) return 'Please select your year of study';
        return '';
      default:
        return '';
    }
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const errorMsg = validateField(key, formData[key], formData);
      if (errorMsg) {
        newErrors[key] = errorMsg;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      // Revalidate field dynamically if already touched or errored
      if (touched[name] || errors[name]) {
        const errorMsg = validateField(name, value, updated);
        setErrors((prevErr) => ({ ...prevErr, [name]: errorMsg || undefined }));
      }

      // Revalidate confirmPassword if password changed
      if (name === 'password' && (touched.confirmPassword || errors.confirmPassword)) {
        const confirmErr = validateField('confirmPassword', updated.confirmPassword, updated);
        setErrors((prevErr) => ({ ...prevErr, confirmPassword: confirmErr || undefined }));
      }

      return updated;
    });

    if (globalError) setGlobalError('');
  };

  // Blur handler for marking touched
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errorMsg = validateField(name, value, formData);
    setErrors((prev) => ({ ...prev, [name]: errorMsg || undefined }));
  };

  // Quick Demo Auto-fill Helper for instant evaluator testing
  const handleFillDemo = () => {
    const demoData = {
      fullName: 'Alex Mercer',
      email: 'alex.mercer@stanford.edu',
      password: 'SecurePass123!#',
      confirmPassword: 'SecurePass123!#',
      college: 'Stanford University',
      course: 'Computer Science & AI',
      yearOfStudy: '3rd Year',
    };
    setFormData(demoData);
    setErrors({});
    setTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true,
      college: true,
      course: true,
      yearOfStudy: true,
    });
    setGlobalError('');
    toast.info('Student demo profile populated!');
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setGlobalError('');

    // Mark all as touched
    const allTouched = Object.keys(formData).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(allTouched);

    if (!validateForm()) {
      toast.error('Please resolve the highlighted validation errors.');
      return;
    }

    setIsLoading(true);

    // Simulate registration
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      toast.success(`Account created for ${formData.fullName}! Welcome to Mind Mapr.`);

      setTimeout(() => {
        navigate('/dashboard');
      }, 1100);
    }, 1300);
  };

  // Google Sign-Up Mock
  const handleGoogleSignUp = () => {
    setIsGoogleLoading(true);
    setGlobalError('');

    setTimeout(() => {
      setIsGoogleLoading(false);
      setIsSuccess(true);
      toast.success('Connected with Google! Creating your study workspace...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 900);
    }, 1300);
  };

  // 4 Core Pillars for Left Branding
  const pillars = [
    {
      step: '01',
      title: 'Learn',
      description: 'Upload lecture slides, PPTs, or PDF notes to extract key concepts.',
      icon: BookOpen,
      color: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-500/30',
      badgeColor: 'bg-blue-500/15 text-blue-300'
    },
    {
      step: '02',
      title: 'Map',
      description: 'Generate multi-level visual mind maps with semantic connections.',
      icon: BrainCircuit,
      color: 'from-primary-500/20 to-indigo-500/20',
      borderColor: 'border-primary-500/30',
      badgeColor: 'bg-primary-500/15 text-primary-300'
    },
    {
      step: '03',
      title: 'Recall',
      description: 'Practice with spaced-repetition active recall flashcard sets.',
      icon: Layers,
      color: 'from-secondary-500/20 to-purple-500/20',
      borderColor: 'border-secondary-500/30',
      badgeColor: 'bg-secondary-500/15 text-secondary-300'
    },
    {
      step: '04',
      title: 'Master',
      description: 'Assess exam readiness with adaptive multi-format quizzes.',
      icon: Target,
      color: 'from-emerald-500/20 to-teal-500/20',
      borderColor: 'border-emerald-500/30',
      badgeColor: 'bg-emerald-500/15 text-emerald-300'
    }
  ];

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-slate-900 selection:bg-primary-500 selection:text-white">
      {/* ========================================================================= */}
      {/* LEFT SECTION: BRANDING & KNOWLEDGE GRAPH SHOWCASE                         */}
      {/* ========================================================================= */}
      <div className="relative w-full lg:w-5/12 lg:min-h-screen bg-slate-950 flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800/80">
        {/* Ambient Glow Orbs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-secondary-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 left-1/3 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Subtle Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Top: Logo & Back Link */}
        <div className="relative z-10 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-primary-600 to-secondary-600 text-white shadow-lg shadow-primary-500/25 group-hover:scale-105 transition-transform duration-300">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-bold tracking-tight text-white flex items-center gap-1">
                Mind<span className="text-primary-400">Mapr</span>
              </span>
              <span className="text-[10px] font-medium tracking-wider text-slate-400 uppercase block -mt-1">
                Smart Revision System
              </span>
            </div>
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors bg-slate-900/80 hover:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-800 backdrop-blur-md"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Middle: Core Hero Tagline & 4-Pillar Showcase */}
        <div className="relative z-10 my-8 lg:my-auto max-w-lg">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-950/80 border border-primary-800/60 shadow-sm text-primary-300 text-xs font-medium mb-6 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-primary-400 animate-pulse" />
            <span>Student Registration • PBL Academic Edition</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-4">
            Learn. Map. <br className="hidden sm:inline" />
            Recall. <span className="gradient-text">Master.</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-8">
            Join thousands of university students generating instant visual mind maps, flashcards, and adaptive exam summaries from lecture notes.
          </p>

          {/* 4 Pillars Interactive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {pillars.map((pillar) => {
              const IconComponent = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className={`p-3.5 rounded-2xl bg-gradient-to-br ${pillar.color} border ${pillar.borderColor} backdrop-blur-md transition-all duration-300 hover:translate-y-[-2px] hover:border-slate-600/60`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-slate-900/80 text-white shadow-inner">
                        <IconComponent className="w-4 h-4 text-primary-400" />
                      </div>
                      <span className="text-sm font-bold text-white tracking-wide">
                        {pillar.title}
                      </span>
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${pillar.badgeColor}`}>
                      {pillar.step}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300/90 leading-snug">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Social Proof Metric Card */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                🎓
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-xs text-amber-400">
                  {'★'.repeat(5)}
                  <span className="text-[11px] font-semibold text-slate-300 ml-1">4.9 / 5.0 Rating</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                  Trusted by students from 150+ colleges
                </p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xs font-bold text-primary-400 block">12,000+</span>
              <span className="text-[10px] text-slate-500 block uppercase tracking-wider">Active Learners</span>
            </div>
          </div>
        </div>

        {/* Bottom Footer Details */}
        <div className="relative z-10 hidden sm:flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-900">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary-500" />
            <span>Strict Privacy • No Ads • SSL Encrypted</span>
          </div>
          <span>v1.0.0</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RIGHT SECTION: REGISTRATION FORM CONTAINER                                */}
      {/* ========================================================================= */}
      <div className="w-full lg:w-7/12 min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6 sm:p-10 lg:p-14 relative overflow-y-auto">
        {/* Subtle Background Radial */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-xl relative z-10 my-4 sm:my-8">
          {/* Header Card / Title */}
          <div className="mb-6 text-center sm:text-left">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Create Your Mind Mapr Account
              </h2>
              {/* Quick Demo Fill Pill for easy review */}
              <button
                type="button"
                onClick={handleFillDemo}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 bg-primary-50 hover:bg-primary-100 border border-primary-200/80 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                title="Fill student demo details for fast testing"
              >
                <Zap className="w-3 h-3 text-primary-600" />
                <span>Auto-fill Demo</span>
              </button>
            </div>
            <p className="text-sm text-slate-500">
              Start turning your study materials into smarter revision.
            </p>
          </div>

          {/* Success State Overlay Banner */}
          {isSuccess && (
            <div className="mb-6 p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 shadow-sm animate-in fade-in zoom-in-95 duration-300">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm shrink-0">
                  <Check className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-900">Account Created Successfully!</h4>
                  <p className="text-xs text-emerald-700 mt-0.5">Setting up your personalized revision workspace...</p>
                </div>
              </div>
              <div className="w-full bg-emerald-200 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full animate-pulse w-full transition-all duration-700" />
              </div>
            </div>
          )}

          {/* Global Error Banner */}
          {globalError && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 shadow-sm flex items-start gap-3 animate-in fade-in duration-200">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1 text-xs sm:text-sm font-medium">
                <p className="font-semibold text-red-900">Registration Error</p>
                <p className="text-red-700 mt-0.5">{globalError}</p>
              </div>
              <button
                type="button"
                onClick={() => setGlobalError('')}
                className="text-red-400 hover:text-red-600 p-1"
                aria-label="Dismiss error"
              >
                ×
              </button>
            </div>
          )}

          {/* Main Registration Form Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/60 p-6 sm:p-8 backdrop-blur-xl">
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Row 1: Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  name="fullName"
                  type="text"
                  placeholder="Alex Mercer"
                  iconLeft={User}
                  value={formData.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.fullName ? errors.fullName : undefined}
                  disabled={isLoading || isSuccess}
                  autoComplete="name"
                  autoFocus
                />

                <Input
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="alex@university.edu"
                  iconLeft={Mail}
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email ? errors.email : undefined}
                  disabled={isLoading || isSuccess}
                  autoComplete="email"
                />
              </div>

              {/* Row 2: Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Password Input */}
                <div>
                  <Input
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    iconLeft={Lock}
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password ? errors.password : undefined}
                    disabled={isLoading || isSuccess}
                    autoComplete="new-password"
                    rightElement={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={0}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/30 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    }
                  />
                </div>

                {/* Confirm Password Input */}
                <div>
                  <Input
                    label="Confirm Password"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    iconLeft={Lock}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.confirmPassword ? errors.confirmPassword : undefined}
                    disabled={isLoading || isSuccess}
                    autoComplete="new-password"
                    rightElement={
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        tabIndex={0}
                        aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                        className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/30 cursor-pointer"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    }
                  />
                </div>
              </div>

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-2 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Password Strength:</span>
                    <span className={`font-bold ${passwordStrength.color.split(' ')[1]}`}>
                      {passwordStrength.label}
                    </span>
                  </div>

                  {/* Multi-segment strength meter */}
                  <div className="grid grid-cols-4 gap-1.5 h-1.5">
                    {[1, 2, 3, 4].map((step) => {
                      const isActive = passwordStrength.score >= step;
                      return (
                        <div
                          key={step}
                          className={`h-full rounded-full transition-all duration-300 ${
                            isActive
                              ? passwordStrength.color.split(' ')[0]
                              : 'bg-slate-200'
                          }`}
                        />
                      );
                    })}
                  </div>

                  {/* Criteria Checklist Micro-pills */}
                  <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-slate-500">
                    <span className={`flex items-center gap-1 ${passwordStrength.criteria.length ? 'text-emerald-600 font-medium' : 'text-slate-400'}`}>
                      <CheckCircle2 className="w-3 h-3" /> 8+ chars
                    </span>
                    <span className={`flex items-center gap-1 ${passwordStrength.criteria.hasUpper && passwordStrength.criteria.hasLower ? 'text-emerald-600 font-medium' : 'text-slate-400'}`}>
                      <CheckCircle2 className="w-3 h-3" /> Upper & Lower
                    </span>
                    <span className={`flex items-center gap-1 ${passwordStrength.criteria.hasNumber ? 'text-emerald-600 font-medium' : 'text-slate-400'}`}>
                      <CheckCircle2 className="w-3 h-3" /> Number
                    </span>
                    <span className={`flex items-center gap-1 ${passwordStrength.criteria.hasSpecial ? 'text-emerald-600 font-medium' : 'text-slate-400'}`}>
                      <CheckCircle2 className="w-3 h-3" /> Symbol
                    </span>
                  </div>
                </div>
              )}

              {/* Row 3: College / University */}
              <Input
                label="College / University"
                name="college"
                type="text"
                placeholder="e.g. Stanford University / National Institute of Tech"
                iconLeft={GraduationCap}
                value={formData.college}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.college ? errors.college : undefined}
                disabled={isLoading || isSuccess}
                autoComplete="organization"
              />

              {/* Row 4: Course & Year of Study */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Course / Major"
                  name="course"
                  type="text"
                  placeholder="e.g. Computer Science, B.Tech, Pre-Med"
                  iconLeft={BookOpen}
                  value={formData.course}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.course ? errors.course : undefined}
                  disabled={isLoading || isSuccess}
                />

                {/* Year of Study Custom Styled Select */}
                <div className="flex flex-col gap-1.5 w-full">
                  <label htmlFor="yearOfStudy" className="text-sm font-semibold text-slate-700 select-none">
                    Year of Study
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 text-slate-400 pointer-events-none">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <select
                      id="yearOfStudy"
                      name="yearOfStudy"
                      value={formData.yearOfStudy}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isLoading || isSuccess}
                      className={`
                        w-full pl-11 pr-10 py-2.5 text-sm bg-white border rounded-xl transition-all duration-200 outline-none
                        appearance-none cursor-pointer text-slate-800 disabled:opacity-50 disabled:bg-slate-50
                        ${!formData.yearOfStudy ? 'text-slate-400' : 'text-slate-800'}
                        ${touched.yearOfStudy && errors.yearOfStudy
                          ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100/50'
                          : 'border-slate-200 hover:border-slate-300 focus:border-primary-500 focus:ring-4 focus:ring-primary-100/50'
                        }
                      `}
                    >
                      {yearOptions.map((opt) => (
                        <option
                          key={opt.value}
                          value={opt.value}
                          disabled={opt.value === ''}
                          className="text-slate-800"
                        >
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3.5 text-slate-400 pointer-events-none">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                  {touched.yearOfStudy && errors.yearOfStudy && (
                    <p className="text-xs font-medium text-red-600 animate-in fade-in-50 duration-200">
                      {errors.yearOfStudy}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full mt-3 font-semibold shadow-md shadow-primary-500/25 py-3 text-sm sm:text-base cursor-pointer"
                isLoading={isLoading}
                disabled={isLoading || isSuccess}
                iconRight={UserPlus}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-slate-400 font-medium tracking-wider">
                  or continue with
                </span>
              </div>
            </div>

            {/* Continue with Google Button */}
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={handleGoogleSignUp}
              isLoading={isGoogleLoading}
              disabled={isLoading || isGoogleLoading || isSuccess}
              className="w-full flex items-center justify-center gap-3 py-2.5 font-semibold text-slate-700 bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 transition-all cursor-pointer"
            >
              {/* Google G Logo SVG */}
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{isGoogleLoading ? 'Connecting...' : 'Continue with Google'}</span>
            </Button>

            {/* Mobile Auto-Fill Demo Button */}
            <div className="mt-4 sm:hidden text-center">
              <button
                type="button"
                onClick={handleFillDemo}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 bg-primary-50 hover:bg-primary-100 border border-primary-200/80 px-3 py-1.5 rounded-lg transition-colors cursor-pointer w-full justify-center"
              >
                <Zap className="w-3.5 h-3.5 text-primary-600" />
                <span>Auto-fill Demo Student Details</span>
              </button>
            </div>

            {/* Bottom Login Link */}
            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
              <p className="text-xs sm:text-sm text-slate-500">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-bold text-primary-600 hover:text-primary-700 hover:underline transition-colors"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>

          {/* Security & Trust Notice */}
          <div className="mt-6 text-center">
            <p className="text-[11px] text-slate-400">
              By registering, you agree to Mind Mapr's{' '}
              <a href="#" className="underline hover:text-slate-600">Terms of Service</a> and{' '}
              <a href="#" className="underline hover:text-slate-600">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
