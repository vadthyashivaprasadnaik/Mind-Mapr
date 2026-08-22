import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  Globe,
  Sun,
  Moon,
  Monitor,
  Target,
  GraduationCap,
  RotateCcw,
  Bell,
  ShieldCheck,
  Sliders,
  ArrowRight,
  Sparkles,
  User,
  AlertTriangle,
  Trash2,
  LogOut,
} from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import BackButton from '../components/ui/BackButton';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import { useToast } from '../components/ui/Toast';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const STORAGE_KEY = 'mindmapr_settings_v1';

// Default Structured Settings Configuration
const defaultSettings = {
  // General
  language: 'English',
  theme: 'Light', // 'Light' | 'Dark' | 'System'
  
  // Study Preferences
  dailyStudyTarget: '2 hours',
  preferredStudyTime: 'Evening',
  revisionFocus: 'High Priority Topics',
  
  // Quiz & Learning
  quizDifficulty: 'Adaptive',
  questionsPerQuiz: 10,
  showExplanations: true,
  allowRetakes: true,
  flashcardOrder: 'Recommended',
  autoAdvance: false,
  showAnswerAutomatically: false,
  
  // Notifications
  studyReminders: true,
  reminderTime: '19:00', // 7:00 PM
  revisionReminders: true,
  quizReminders: false,
  weeklySummary: true,
  achievementNotifications: true,
  
  // Privacy
  saveStudyActivity: true,
  personalizedRecommendations: true,
  aiAnalysisHistory: true,
};

// Accessible Custom Toggle Component declared outside render
function ToggleSwitch({ checked, onChange, label, description, disabled = false }) {
  return (
    <div className={`flex items-start justify-between gap-4 py-3.5 border-b border-slate-100 last:border-b-0 ${disabled ? 'opacity-50' : ''}`}>
      <div className="flex flex-col gap-0.5 max-w-xl">
        <span className="text-sm font-bold text-slate-800 flex items-center gap-2">
          {label}
          {checked ? (
            <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-primary-100 text-primary-800 tracking-wider">
              ON
            </span>
          ) : (
            <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-slate-100 text-slate-500 tracking-wider">
              OFF
            </span>
          )}
        </span>
        {description && (
          <p className="text-xs text-slate-500 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
          checked ? 'bg-primary-600' : 'bg-slate-200'
        } ${disabled ? 'cursor-not-allowed' : ''}`}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}

export default function Settings() {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useUser();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t, availableLanguages } = useLanguage();

  // Active Tab: 'general' | 'study' | 'learning' | 'notifications' | 'privacy' | 'account'
  const [activeTab, setActiveTab] = useState('general');

  // Settings State initialized from localStorage
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultSettings, ...JSON.parse(saved) };
      }
    } catch {
      // Fallback on parse error
    }
    return defaultSettings;
  });

  // Modals
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Ignore localStorage write error
    }
  }, [settings]);

  // Update a single setting
  const updateSetting = (key, value, toastMsg = null) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
    if (toastMsg) {
      toast.success(toastMsg);
    }
  };

  // Handle Theme Change
  const handleThemeChange = (selectedTheme) => {
    const themeLower = selectedTheme.toLowerCase();
    setTheme(themeLower);
    updateSetting('theme', selectedTheme);
    toast.success(t('toasts.themeUpdated', { theme: selectedTheme }, `Theme updated to ${selectedTheme}.`));
  };

  // Handle Language Change
  const handleLanguageChange = (selectedLang) => {
    setLanguage(selectedLang);
    updateSetting('language', selectedLang);
    toast.success(t('toasts.languageUpdated', { language: selectedLang }, `Language changed to ${selectedLang}.`));
  };

  // Reset all settings to defaults
  const handleResetSettingsConfirm = () => {
    setSettings(defaultSettings);
    setTheme('light');
    setLanguage('English');
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSettings));
    } catch {
      // Ignore
    }
    setIsResetModalOpen(false);
    toast.success(t('toasts.settingsSaved', {}, 'Settings restored to defaults.'));
  };

  // Sign out confirmation handler
  const handleSignOutConfirm = () => {
    setIsSignOutModalOpen(false);
    toast.success(t('toasts.signedOut', {}, 'Signed out successfully.'));
    navigate('/login');
  };

  // Delete account notice handler
  const handleDeleteAccountConfirm = () => {
    setIsDeleteModalOpen(false);
    toast.info('Account deletion will be available after backend account management is connected.');
  };

  // Navigation Tabs Configuration
  const tabs = [
    {
      id: 'general',
      label: t('settings.general', {}, 'General'),
      description: t('settings.appearanceSubtitle', {}, 'Language & appearance'),
      icon: Globe,
    },
    {
      id: 'study',
      label: t('settings.studyPreferences', {}, 'Study Preferences'),
      description: 'Targets, times & focus',
      icon: Target,
    },
    {
      id: 'learning',
      label: t('settings.quizLearning', {}, 'Quiz & Learning'),
      description: 'Quizzes & flashcards',
      icon: GraduationCap,
    },
    {
      id: 'notifications',
      label: t('settings.notifications', {}, 'Notifications'),
      description: 'Study alerts & reminders',
      icon: Bell,
    },
    {
      id: 'privacy',
      label: t('settings.privacy', {}, 'Privacy & AI'),
      description: 'Activity & data controls',
      icon: ShieldCheck,
    },
    {
      id: 'account',
      label: t('settings.account', {}, 'Account & System'),
      description: 'Profile, sign out & reset',
      icon: Sliders,
    },
  ];

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* ========================================================================= */}
      {/* 1. PAGE HEADER                                                            */}
      {/* ========================================================================= */}
      <div>
        <BackButton
          label={t('common.back', {}, 'Back')}
          fallback="/dashboard"
          to={location.state?.from || '/dashboard'}
        />

        <PageHeader
          title={t('settings.title', {}, 'Settings')}
          description={t('settings.description', {}, 'Customize your Mind Mapr experience and study preferences.')}
        >
          <div className="flex items-center gap-2">
            <Link to="/profile">
              <Button
                variant="outline"
                size="sm"
                iconLeft={User}
                className="font-semibold text-xs cursor-pointer"
              >
                {t('nav.profile', {}, 'My Profile')}
              </Button>
            </Link>
          </div>
        </PageHeader>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-in fade-in duration-200">
          {/* ===================================================================== */}
          {/* 3. SETTINGS NAVIGATION (Sidebar on Desktop, Horizontal Tabs on Mobile) */}
          {/* ===================================================================== */}
          <div className="lg:col-span-1 flex flex-col gap-3">
            {/* Mobile / Tablet Horizontal Scrollable Pills */}
            <div className="flex lg:hidden overflow-x-auto gap-2 pb-2 scrollbar-none">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                      isActive
                        ? 'bg-primary-600 text-white shadow-sm'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Desktop Vertical Sidebar */}
            <div className="hidden lg:flex flex-col gap-1.5 p-2 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 w-full p-3 rounded-xl text-left transition-all duration-150 cursor-pointer ${
                      isActive
                        ? 'bg-primary-50/80 text-primary-900 font-bold border border-primary-100 shadow-2xs'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg shrink-0 ${
                        isActive
                          ? 'bg-primary-600 text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-sm block truncate">{tab.label}</span>
                      <span className="text-[11px] text-slate-400 font-normal block truncate">
                        {tab.description}
                      </span>
                    </div>
                  </button>
                );
              })}

              {/* Quick Profile Link at Bottom of Sidebar */}
              <div className="pt-3 mt-2 border-t border-slate-100 px-2 pb-1">
                <Link
                  to="/profile"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary-600 text-white font-bold text-[10px] flex items-center justify-center">
                      {user.avatarInitials}
                    </div>
                    <span>{user.name}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              </div>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* 4. SETTINGS CONTENT PANELS                                             */}
          {/* ===================================================================== */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {/* ------------------------------------------------------------------- */}
            {/* SECTION: GENERAL                                                    */}
            {/* ------------------------------------------------------------------- */}
            {activeTab === 'general' && (
              <Card className="border-slate-200/90 bg-white shadow-xs">
                <CardHeader className="p-5 pb-3 border-b border-slate-100 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{t('settings.general', {}, 'General Settings')}</h3>
                    <p className="text-xs text-slate-500">{t('settings.description', {}, 'Configure application language and theme appearance.')}</p>
                  </div>
                </CardHeader>

                <CardContent className="p-5 sm:p-6 flex flex-col gap-6">
                  {/* Setting 1: Language */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-bold text-slate-800">
                        {t('settings.language', {}, 'Language')}
                      </label>
                      <Badge variant="primary" className="text-xs">
                        {language}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500">
                      {t('settings.languageSubtitle', {}, 'Choose your preferred interface language.')}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-1">
                      {availableLanguages.map((langItem) => {
                        const isSelected = language === langItem.id || language === langItem.name;
                        return (
                          <button
                            key={langItem.id}
                            type="button"
                            onClick={() => handleLanguageChange(langItem.id)}
                            className={`p-3 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
                              isSelected
                                ? 'border-primary-500 bg-primary-50/80 text-primary-800 shadow-2xs ring-1 ring-primary-500/20'
                                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                            }`}
                          >
                            <span className="block">{langItem.name}</span>
                            <span className="block text-[10px] text-slate-400 font-normal mt-0.5">{langItem.nativeName}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <hr className="border-slate-100" />

                  {/* Setting 2: Appearance / Theme */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-bold text-slate-800">
                        {t('settings.appearance', {}, 'Appearance Theme')}
                      </label>
                      <Badge variant="neutral" className="text-xs capitalize">
                        {theme}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500">
                      {t('settings.appearanceSubtitle', {}, 'Select your preferred workspace theme.')}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1">
                      {[
                        { id: 'Light', label: t('settings.light', {}, 'Light'), icon: Sun, desc: t('settings.lightDesc', {}, 'Default bright and crisp') },
                        { id: 'Dark', label: t('settings.dark', {}, 'Dark'), icon: Moon, desc: t('settings.darkDesc', {}, 'Reduced glare for low light') },
                        { id: 'System', label: t('settings.system', {}, 'System'), icon: Monitor, desc: t('settings.systemDesc', {}, 'Sync with device preferences') },
                      ].map((th) => {
                        const Icon = th.icon;
                        const isSelected = theme.toLowerCase() === th.id.toLowerCase();
                        return (
                          <button
                            key={th.id}
                            type="button"
                            onClick={() => handleThemeChange(th.id)}
                            className={`p-4 rounded-xl border flex flex-col items-center text-center gap-2 transition-all cursor-pointer ${
                              isSelected
                                ? 'border-primary-500 bg-primary-50/80 text-primary-900 ring-1 ring-primary-500/20 shadow-2xs'
                                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-bold">{th.label}</span>
                            <span className="text-[11px] text-slate-400 font-normal">{th.desc}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* ------------------------------------------------------------------- */}
            {/* SECTION: STUDY PREFERENCES                                          */}
            {/* ------------------------------------------------------------------- */}
            {activeTab === 'study' && (
              <Card className="border-slate-200/90 bg-white shadow-xs">
                <CardHeader className="p-5 pb-3 border-b border-slate-100 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Study Preferences</h3>
                    <p className="text-xs text-slate-500">Configure daily revision pacing and priority focus strategies.</p>
                  </div>
                </CardHeader>

                <CardContent className="p-5 sm:p-6 flex flex-col gap-6">
                  {/* Daily Study Target */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-800">
                      Daily Study Target
                    </label>
                    <p className="text-xs text-slate-500">
                      Sets the planned revision target for your personalized revision planner.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-1">
                      {['30 minutes', '1 hour', '2 hours', '3 hours', '4+ hours'].map((target) => (
                        <button
                          key={target}
                          type="button"
                          onClick={() => updateSetting('dailyStudyTarget', target, 'Study target updated.')}
                          className={`p-3 rounded-xl border text-xs font-bold transition text-center cursor-pointer ${
                            settings.dailyStudyTarget === target
                              ? 'border-primary-500 bg-primary-50/80 text-primary-800 shadow-2xs ring-1 ring-primary-500/20'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {target}
                        </button>
                      ))}
                    </div>
                  </div>

                  <hr className="border-slate-100" />

                  {/* Preferred Study Time */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-800">
                      Preferred Study Time
                    </label>
                    <p className="text-xs text-slate-500">
                      Helps the AI schedule recommended review sessions.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-1">
                      {[
                        { id: 'Morning', label: 'Morning', desc: '8 AM – 12 PM' },
                        { id: 'Afternoon', label: 'Afternoon', desc: '12 PM – 5 PM' },
                        { id: 'Evening', label: 'Evening', desc: '5 PM – 9 PM' },
                        { id: 'Flexible', label: 'Flexible', desc: 'Anytime' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => updateSetting('preferredStudyTime', item.id, 'Preferred study time updated.')}
                          className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                            settings.preferredStudyTime === item.id
                              ? 'border-primary-500 bg-primary-50/80 text-primary-900 shadow-2xs ring-1 ring-primary-500/20'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span className="text-xs font-bold block">{item.label}</span>
                          <span className="text-[11px] text-slate-400 block mt-0.5">{item.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <hr className="border-slate-100" />

                  {/* Default Revision Focus */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-800">
                      Default Revision Focus
                    </label>
                    <p className="text-xs text-slate-500">
                      Controls which topics receive priority ranking in the revision plan.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1">
                      {[
                        { id: 'High Priority Topics', desc: 'Prioritizes high exam-weightage modules' },
                        { id: 'Weak Topics', desc: 'Prioritizes topics with accuracy below 70%' },
                        { id: 'All Topics', desc: 'Even balanced distribution across all chapters' },
                      ].map((focus) => (
                        <button
                          key={focus.id}
                          type="button"
                          onClick={() => updateSetting('revisionFocus', focus.id, 'Revision focus updated.')}
                          className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
                            settings.revisionFocus === focus.id
                              ? 'border-primary-500 bg-primary-50/80 text-primary-900 shadow-2xs ring-1 ring-primary-500/20'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span className="text-xs font-bold block">{focus.id}</span>
                          <span className="text-[11px] text-slate-400 block mt-1 leading-relaxed">{focus.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* ------------------------------------------------------------------- */}
            {/* SECTION: QUIZ & LEARNING                                            */}
            {/* ------------------------------------------------------------------- */}
            {activeTab === 'learning' && (
              <Card className="border-slate-200/90 bg-white shadow-xs">
                <CardHeader className="p-5 pb-3 border-b border-slate-100 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Quiz & Flashcard Settings</h3>
                    <p className="text-xs text-slate-500">Fine-tune interactive assessments and active recall configurations.</p>
                  </div>
                </CardHeader>

                <CardContent className="p-5 sm:p-6 flex flex-col gap-6">
                  {/* Quiz Difficulty */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-800">
                      Default Quiz Difficulty
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1">
                      {['Adaptive', 'Easy', 'Medium', 'Hard'].map((diff) => (
                        <button
                          key={diff}
                          type="button"
                          onClick={() => updateSetting('quizDifficulty', diff, `Quiz difficulty set to ${diff}`)}
                          className={`p-3 rounded-xl border text-xs font-bold transition text-center cursor-pointer ${
                            settings.quizDifficulty === diff
                              ? 'border-primary-500 bg-primary-50/80 text-primary-800 shadow-2xs ring-1 ring-primary-500/20'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {diff}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Questions Per Quiz */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-800">
                      Questions Per Quiz
                    </label>
                    <div className="grid grid-cols-4 gap-2 mt-1">
                      {[5, 10, 15, 20].map((qCount) => (
                        <button
                          key={qCount}
                          type="button"
                          onClick={() => updateSetting('questionsPerQuiz', qCount, `Quiz length set to ${qCount} questions`)}
                          className={`p-3 rounded-xl border text-xs font-bold transition text-center cursor-pointer ${
                            settings.questionsPerQuiz === qCount
                              ? 'border-primary-500 bg-primary-50/80 text-primary-800 shadow-2xs ring-1 ring-primary-500/20'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {qCount} Questions
                        </button>
                      ))}
                    </div>
                  </div>

                  <hr className="border-slate-100" />

                  {/* Toggles: Explanations & Retakes */}
                  <div className="flex flex-col">
                    <ToggleSwitch
                      label="Show Explanations"
                      description="Display detailed concept explanations immediately after submitting an answer."
                      checked={settings.showExplanations}
                      onChange={(val) => updateSetting('showExplanations', val)}
                    />

                    <ToggleSwitch
                      label="Allow Quiz Retakes"
                      description="Enable re-attempting completed quizzes to improve topic mastery score."
                      checked={settings.allowRetakes}
                      onChange={(val) => updateSetting('allowRetakes', val)}
                    />
                  </div>

                  <hr className="border-slate-100" />

                  {/* Flashcard Preferences */}
                  <div className="flex flex-col gap-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Flashcard Options
                    </h4>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-slate-800">
                        Card Order
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {['Recommended', 'Random', 'Difficult First', 'Newest First'].map((order) => (
                          <button
                            key={order}
                            type="button"
                            onClick={() => updateSetting('flashcardOrder', order, `Card order set to ${order}`)}
                            className={`p-2.5 rounded-xl border text-xs font-bold transition text-center cursor-pointer ${
                              settings.flashcardOrder === order
                                ? 'border-primary-500 bg-primary-50/80 text-primary-800 shadow-2xs ring-1 ring-primary-500/20'
                                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            {order}
                          </button>
                        ))}
                      </div>
                    </div>

                    <ToggleSwitch
                      label="Auto-Advance Cards"
                      description="Automatically flip to the next card after rating difficulty."
                      checked={settings.autoAdvance}
                      onChange={(val) => updateSetting('autoAdvance', val)}
                    />

                    <ToggleSwitch
                      label="Show Answer Automatically"
                      description="Automatically reveal card answers after 5 seconds."
                      checked={settings.showAnswerAutomatically}
                      onChange={(val) => updateSetting('showAnswerAutomatically', val)}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* ------------------------------------------------------------------- */}
            {/* SECTION: NOTIFICATIONS                                              */}
            {/* ------------------------------------------------------------------- */}
            {activeTab === 'notifications' && (
              <Card className="border-slate-200/90 bg-white shadow-xs">
                <CardHeader className="p-5 pb-3 border-b border-slate-100 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Notification Preferences</h3>
                    <p className="text-xs text-slate-500">Manage daily study reminders and weekly progress digests.</p>
                  </div>
                </CardHeader>

                <CardContent className="p-5 sm:p-6 flex flex-col gap-4">
                  <ToggleSwitch
                    label="Daily Study Reminders"
                    description="Receive timely reminders for your scheduled revision target."
                    checked={settings.studyReminders}
                    onChange={(val) => updateSetting('studyReminders', val)}
                  />

                  {/* Reminder Time (Visually de-emphasized if study reminders are disabled) */}
                  <div
                    className={`p-4 rounded-xl border transition-all ${
                      settings.studyReminders
                        ? 'bg-slate-50/70 border-slate-200 text-slate-800'
                        : 'bg-slate-50/30 border-slate-100 text-slate-400 opacity-60'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-xs font-bold block">
                          Reminder Time
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Scheduled time for your daily study reminder notification.
                        </span>
                      </div>

                      <input
                        type="time"
                        value={settings.reminderTime}
                        disabled={!settings.studyReminders}
                        onChange={(e) => updateSetting('reminderTime', e.target.value)}
                        className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-mono font-bold text-slate-800 outline-none focus:border-primary-500 cursor-pointer disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <ToggleSwitch
                    label="Revision Plan Reminders"
                    description="Alerts for upcoming scheduled topic revision sessions."
                    checked={settings.revisionReminders}
                    onChange={(val) => updateSetting('revisionReminders', val)}
                  />

                  <ToggleSwitch
                    label="Quiz & Assessment Reminders"
                    description="Prompts to test recall after completing topic summaries."
                    checked={settings.quizReminders}
                    onChange={(val) => updateSetting('quizReminders', val)}
                  />

                  <ToggleSwitch
                    label="Weekly Progress Summary"
                    description="Weekly breakdown of quiz accuracy, streak, and topics mastered."
                    checked={settings.weeklySummary}
                    onChange={(val) => updateSetting('weeklySummary', val)}
                  />

                  <ToggleSwitch
                    label="Achievement & Streak Alerts"
                    description="Celebrate study streak milestones and topic mastery achievements."
                    checked={settings.achievementNotifications}
                    onChange={(val) => updateSetting('achievementNotifications', val)}
                  />
                </CardContent>
              </Card>
            )}

            {/* ------------------------------------------------------------------- */}
            {/* SECTION: PRIVACY & DATA                                             */}
            {/* ------------------------------------------------------------------- */}
            {activeTab === 'privacy' && (
              <div className="flex flex-col gap-6">
                <Card className="border-slate-200/90 bg-white shadow-xs">
                  <CardHeader className="p-5 pb-3 border-b border-slate-100 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-sm">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Privacy & Study Data</h3>
                      <p className="text-xs text-slate-500">Control how learning activity is processed and utilized.</p>
                    </div>
                  </CardHeader>

                  <CardContent className="p-5 sm:p-6 flex flex-col gap-4">
                    <ToggleSwitch
                      label="Save Study Activity"
                      description="Allow Mind Mapr to save your learning activity for progress tracking."
                      checked={settings.saveStudyActivity}
                      onChange={(val) => updateSetting('saveStudyActivity', val)}
                    />

                    <ToggleSwitch
                      label="Personalized Recommendations"
                      description="Use your learning activity to improve study recommendations."
                      checked={settings.personalizedRecommendations}
                      onChange={(val) => updateSetting('personalizedRecommendations', val)}
                    />

                    <ToggleSwitch
                      label="AI Analysis History"
                      description="Keep previous AI-generated study analysis available in your account."
                      checked={settings.aiAnalysisHistory}
                      onChange={(val) => updateSetting('aiAnalysisHistory', val)}
                    />
                  </CardContent>
                </Card>

                {/* AI & Your Data Informational Card */}
                <Card className="border-primary-200/80 bg-gradient-to-br from-primary-50/40 via-white to-blue-50/40 shadow-xs">
                  <CardContent className="p-5 sm:p-6 flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-primary-100 text-primary-700 shrink-0">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-sm font-bold text-slate-900">
                        AI & Your Data
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Mind Mapr can use AI to analyze your study materials and generate learning resources. AI features will be connected to your account after backend integration.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* ------------------------------------------------------------------- */}
            {/* SECTION: ACCOUNT & SYSTEM                                           */}
            {/* ------------------------------------------------------------------- */}
            {activeTab === 'account' && (
              <div className="flex flex-col gap-6">
                {/* Account Details Card */}
                <Card className="border-slate-200/90 bg-white shadow-xs">
                  <CardHeader className="p-5 pb-3 border-b border-slate-100 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-sm">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Account Overview</h3>
                      <p className="text-xs text-slate-500">Your current account status and security shortcuts.</p>
                    </div>
                  </CardHeader>

                  <CardContent className="p-5 sm:p-6 flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary-600 to-secondary-600 text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
                          {user.avatarInitials}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-slate-900">{user.name}</h4>
                            <Badge variant="primary">{user.role || 'Student'}</Badge>
                          </div>
                          <span className="text-xs text-slate-500 font-mono">{user.email}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link to="/profile">
                          <Button
                            variant="outline"
                            size="sm"
                            iconLeft={User}
                            className="text-xs font-semibold"
                          >
                            View Profile
                          </Button>
                        </Link>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 text-xs">
                      <div>
                        <span className="font-bold text-slate-800 block">Password & Security</span>
                        <span className="text-slate-400">Password is managed under your personal profile</span>
                      </div>
                      <Link to="/profile">
                        <Button variant="outline" size="sm" className="text-xs">
                          Change Password
                        </Button>
                      </Link>
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 text-xs">
                      <div>
                        <span className="font-bold text-slate-800 block">Session Management</span>
                        <span className="text-slate-400">End your active learning session</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        iconLeft={LogOut}
                        onClick={() => setIsSignOutModalOpen(true)}
                        className="text-xs font-semibold cursor-pointer"
                      >
                        Sign Out
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Reset Settings Card */}
                <Card className="border-slate-200/90 bg-white shadow-xs">
                  <CardHeader className="p-5 pb-3 border-b border-slate-100">
                    <h3 className="text-base font-bold text-slate-900">Reset Settings</h3>
                    <p className="text-xs text-slate-500">
                      Restore Mind Mapr settings to their default values.
                    </p>
                  </CardHeader>

                  <CardContent className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">
                        Restore Application Defaults
                      </span>
                      <p className="text-xs text-slate-500 mt-0.5 max-w-md">
                        This resets all theme, quiz, notification, and study configurations back to original factory defaults.
                      </p>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      iconLeft={RotateCcw}
                      onClick={() => setIsResetModalOpen(true)}
                      className="text-xs font-semibold cursor-pointer shrink-0"
                    >
                      Reset to Defaults
                    </Button>
                  </CardContent>
                </Card>

                {/* Danger Zone Card */}
                <Card className="border-red-200 bg-red-50/20 shadow-xs">
                  <CardHeader className="p-5 pb-3 border-b border-red-100">
                    <div className="flex items-center gap-2 text-red-700">
                      <AlertTriangle className="w-4 h-4" />
                      <h3 className="text-base font-bold">Danger Zone</h3>
                    </div>
                  </CardHeader>

                  <CardContent className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-red-900 block">
                        Delete Account
                      </span>
                      <p className="text-xs text-red-700/80 mt-0.5 max-w-md">
                        Permanently removes your study profile, revision records, and uploaded documents.
                      </p>
                    </div>

                    <Button
                      variant="danger"
                      size="sm"
                      iconLeft={Trash2}
                      onClick={() => setIsDeleteModalOpen(true)}
                      className="font-semibold text-xs cursor-pointer shadow-xs"
                    >
                      {t('settings.deleteAccount', {}, 'Delete Account')}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>

      {/* ========================================================================= */}
      {/* 5. SIGN OUT CONFIRMATION MODAL                                            */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isSignOutModalOpen}
        onClose={() => setIsSignOutModalOpen(false)}
        title="Sign out of Mind Mapr?"
        size="sm"
        footer={
          <div className="flex items-center justify-between w-full">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSignOutModalOpen(false)}
              className="text-xs font-semibold"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              iconLeft={LogOut}
              onClick={handleSignOutConfirm}
              className="text-xs font-bold cursor-pointer shadow-xs"
            >
              Sign Out
            </Button>
          </div>
        }
      >
        <p className="text-xs text-slate-600 leading-relaxed">
          You will need to sign in again to access your learning dashboard and study materials.
        </p>
      </Modal>

      {/* ========================================================================= */}
      {/* 6. RESET SETTINGS CONFIRMATION MODAL                                      */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        title="Reset all settings?"
        size="md"
        footer={
          <div className="flex items-center justify-between w-full">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsResetModalOpen(false)}
              className="text-xs font-semibold"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              iconLeft={RotateCcw}
              onClick={handleResetSettingsConfirm}
              className="text-xs font-bold cursor-pointer shadow-xs"
            >
              Reset Settings
            </Button>
          </div>
        }
      >
        <div className="flex flex-col gap-3 text-slate-600 text-xs leading-relaxed">
          <p>
            Your current application preferences (languages, study pacing, quiz toggles, and notification settings) will be restored to their default values.
          </p>
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-medium">
            Your study materials, progress scores, and profile details will not be affected.
          </div>
        </div>
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
        <div className="flex flex-col gap-3 text-slate-600 text-xs leading-relaxed">
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-900">
            <strong className="font-bold block mb-1">This action cannot be undone.</strong>
            Your account and learning data will eventually be removed once backend authentication is connected.
          </div>
          <p className="text-slate-500">
            Are you sure you want to proceed with account deletion?
          </p>
        </div>
      </Modal>
    </div>
  );
}
