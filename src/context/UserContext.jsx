import React, { createContext, useContext, useState, useEffect } from 'react';

const USER_STORAGE_KEY = 'mindmapr_user_profile_v1';
const AUTH_STORAGE_KEY = 'mindmapr_auth_state_v1';

// Dynamic initials generator from full name
export function getInitials(name) {
  if (!name || typeof name !== 'string') return 'AS';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'AS';
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Default initial student user profile
const defaultUserProfile = {
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
  role: 'Student',
  memberSince: 'August 2026',
  accountStatus: 'Active',
  accountType: 'Student Account',
};

const UserContext = createContext(null);

export function UserProvider({ children }) {
  // User Profile State with localStorage persistence
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultUserProfile,
          ...parsed,
          avatarInitials: getInitials(parsed.name || defaultUserProfile.name),
        };
      }
    } catch {
      // Fallback on parse failure
    }
    return {
      ...defaultUserProfile,
      avatarInitials: getInitials(defaultUserProfile.name),
    };
  });

  // Auth state (defaults to true for frontend workspace navigation)
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
      if (savedAuth !== null) {
        return JSON.parse(savedAuth);
      }
    } catch {
      // Fallback
    }
    return true;
  });

  // Sync profile to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } catch {
      // Ignore
    }
  }, [user]);

  // Sync auth state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(isLoggedIn));
    } catch {
      // Ignore
    }
  }, [isLoggedIn]);

  // Update user profile function
  const updateUser = (updatedFields) => {
    setUser((prev) => {
      const updated = {
        ...prev,
        ...updatedFields,
      };
      // Always keep avatarInitials dynamically synced with the name
      updated.avatarInitials = getInitials(updated.name);
      return updated;
    });
  };

  // Login action
  const login = (userData = {}) => {
    if (userData && Object.keys(userData).length > 0) {
      updateUser(userData);
    }
    setIsLoggedIn(true);
  };

  // Logout action
  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        isLoggedIn,
        login,
        logout,
        getInitials,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export default UserContext;
