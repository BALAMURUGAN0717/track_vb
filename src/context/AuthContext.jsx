import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USER } from '../data/sampleApplications';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Stored active user
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('jobtrack_user');
      if (savedUser) {
        return JSON.parse(savedUser);
      }
      // Provide default demo user so user can test dashboard instantly
      return INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  // Stored registered accounts for demo login validation
  const [users, setUsers] = useState(() => {
    try {
      const savedUsers = localStorage.getItem('jobtrack_users');
      if (savedUsers) {
        return JSON.parse(savedUsers);
      }
      return [
        {
          id: INITIAL_USER.id,
          fullName: INITIAL_USER.fullName,
          email: INITIAL_USER.email,
          password: "password123",
          phoneNumber: INITIAL_USER.phoneNumber,
          isFaceLockEnabled: true
        }
      ];
    } catch {
      return [];
    }
  });

  // Face lock enabled preference
  const [isFaceLockEnabled, setIsFaceLockEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem('jobtrack_facelock_enabled');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('jobtrack_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('jobtrack_user');
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('jobtrack_users', JSON.stringify(users));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [users]);

  useEffect(() => {
    try {
      localStorage.setItem('jobtrack_facelock_enabled', JSON.stringify(isFaceLockEnabled));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [isFaceLockEnabled]);

  /**
   * Demo Login
   */
  const login = (email, password, rememberMe = true) => {
    const existing = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (!existing) {
      // If demo user email, create session
      if (email.trim().toLowerCase() === "demo@jobtrack.io") {
        setUser(INITIAL_USER);
        return { success: true };
      }
      return { success: false, message: "No account found with this email address." };
    }

    if (existing.password !== password) {
      return { success: false, message: "Incorrect password. Please try again." };
    }

    const sessionUser = {
      id: existing.id,
      fullName: existing.fullName,
      email: existing.email,
      phoneNumber: existing.phoneNumber || "+1 (555) 000-0000",
      avatar: existing.avatar || INITIAL_USER.avatar,
      isFaceLockEnabled: isFaceLockEnabled,
      rememberMe: rememberMe,
      lastLogin: new Date().toISOString()
    };

    setUser(sessionUser);
    return { success: true, user: sessionUser };
  };

  /**
   * Demo Register
   */
  const register = ({ fullName, email, phoneNumber, password }) => {
    const existing = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (existing) {
      return { success: false, message: "An account with this email already exists." };
    }

    const newUser = {
      id: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phoneNumber: phoneNumber.trim(),
      password: password,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80`,
      isFaceLockEnabled: true,
      createdAt: new Date().toISOString()
    };

    setUsers((prev) => [...prev, newUser]);
    setUser(newUser);
    return { success: true, user: newUser };
  };

  /**
   * Face Lock Demo Verification Success Hook
   */
  const verifyFaceSuccess = () => {
    if (!user) {
      setUser(INITIAL_USER);
    }
    return { success: true };
  };

  /**
   * Toggle Face Lock
   */
  const toggleFaceLock = (enabled) => {
    setIsFaceLockEnabled(enabled);
    if (user) {
      setUser((prev) => ({ ...prev, isFaceLockEnabled: enabled }));
    }
  };

  /**
   * Update Profile
   */
  const updateUser = (updatedFields) => {
    setUser((prev) => {
      const updated = { ...prev, ...updatedFields };
      return updated;
    });
    setUsers((prev) =>
      prev.map((u) => (u.id === user?.id ? { ...u, ...updatedFields } : u))
    );
  };

  /**
   * Change Password Demo
   */
  const changePasswordDemo = (currentPassword, newPassword) => {
    const existing = users.find((u) => u.id === user?.id);
    if (existing && existing.password !== currentPassword && currentPassword !== "password123") {
      return { success: false, message: "Current password does not match." };
    }

    setUsers((prev) =>
      prev.map((u) => (u.id === user?.id ? { ...u, password: newPassword } : u))
    );
    return { success: true, message: "Password updated successfully (Demo)." };
  };

  /**
   * Logout
   */
  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('jobtrack_user');
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isFaceLockEnabled,
        login,
        register,
        logout,
        verifyFaceSuccess,
        toggleFaceLock,
        updateUser,
        changePasswordDemo
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
