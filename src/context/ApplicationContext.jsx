import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  INITIAL_APPLICATIONS,
  INITIAL_INTERVIEWS,
  INITIAL_NOTIFICATIONS,
  INITIAL_PROFILE
} from '../data/sampleApplications';

const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {
  // Applications State
  const [applications, setApplications] = useState(() => {
    try {
      const saved = localStorage.getItem('jobtrack_applications');
      return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
    } catch {
      return INITIAL_APPLICATIONS;
    }
  });

  // Interviews State
  const [interviews, setInterviews] = useState(() => {
    try {
      const saved = localStorage.getItem('jobtrack_interviews');
      return saved ? JSON.parse(saved) : INITIAL_INTERVIEWS;
    } catch {
      return INITIAL_INTERVIEWS;
    }
  });

  // Notifications & Reminders State
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('jobtrack_notifications');
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  // User Profile Info
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('jobtrack_profile');
      return saved ? JSON.parse(saved) : INITIAL_PROFILE;
    } catch {
      return INITIAL_PROFILE;
    }
  });

  // Recent Activity Log
  const [recentActivity, setRecentActivity] = useState(() => {
    try {
      const saved = localStorage.getItem('jobtrack_activities');
      return saved ? JSON.parse(saved) : [
        { id: 1, action: "Applied to Figma (Frontend Performance Specialist)", time: "2 hours ago", type: "add" },
        { id: 2, action: "Google moved to Interview Scheduled", time: "1 day ago", type: "status" },
        { id: 3, action: "Offer received from Stripe ($190k base)", time: "3 days ago", type: "offer" },
        { id: 4, action: "Accepted offer from Microsoft", time: "1 week ago", type: "selected" }
      ];
    } catch {
      return [];
    }
  });

  // LocalStorage Sync
  useEffect(() => {
    try {
      localStorage.setItem('jobtrack_applications', JSON.stringify(applications));
    } catch (e) {
      console.warn(e);
    }
  }, [applications]);

  useEffect(() => {
    try {
      localStorage.setItem('jobtrack_interviews', JSON.stringify(interviews));
    } catch (e) {
      console.warn(e);
    }
  }, [interviews]);

  useEffect(() => {
    try {
      localStorage.setItem('jobtrack_notifications', JSON.stringify(notifications));
    } catch (e) {
      console.warn(e);
    }
  }, [notifications]);

  useEffect(() => {
    try {
      localStorage.setItem('jobtrack_profile', JSON.stringify(profile));
    } catch (e) {
      console.warn(e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem('jobtrack_activities', JSON.stringify(recentActivity));
    } catch (e) {
      console.warn(e);
    }
  }, [recentActivity]);

  // Log Activity Helper
  const logActivity = (action, type = 'status') => {
    const newAct = {
      id: Date.now(),
      action,
      time: "Just now",
      type
    };
    setRecentActivity((prev) => [newAct, ...prev.slice(0, 19)]);
  };

  /**
   * Add Job Application
   */
  const addApplication = (applicationData) => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newId = `APP-2026-${randomSuffix}`;

    const newApp = {
      id: newId,
      companyName: applicationData.companyName.trim(),
      companyLogo: applicationData.companyLogo || "",
      color: applicationData.color || "#4F8CFF",
      jobPosition: applicationData.jobPosition.trim(),
      jobDescription: applicationData.jobDescription || "",
      jobLocation: applicationData.jobLocation.trim(),
      jobType: applicationData.jobType || "Full Time",
      workMode: applicationData.workMode || "Remote",
      salaryRange: applicationData.salaryRange || "$120,000 - $150,000",
      appliedDate: applicationData.appliedDate || new Date().toISOString().split('T')[0],
      applicationDeadline: applicationData.applicationDeadline || "",
      jobSource: applicationData.jobSource || "LinkedIn",
      jobUrl: applicationData.jobUrl || "",
      resumeUsed: applicationData.resumeUsed || "Resume_Default.pdf",
      priority: applicationData.priority || "Medium",
      status: applicationData.status || "Applied",
      notes: applicationData.notes || ""
    };

    setApplications((prev) => [newApp, ...prev]);
    logActivity(`Added new application for ${newApp.companyName} (${newApp.jobPosition})`, 'add');

    // If deadline specified, create notification reminder
    if (newApp.applicationDeadline) {
      addNotification({
        title: `Deadline for ${newApp.companyName}`,
        message: `Application deadline set for ${newApp.applicationDeadline}`,
        type: 'deadline',
        link: '/applications'
      });
    }

    return newApp;
  };

  /**
   * Update Application
   */
  const updateApplication = (id, updatedData) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, ...updatedData } : app))
    );
    logActivity(`Updated details for application #${id}`, 'update');
  };

  /**
   * Delete Application
   */
  const deleteApplication = (id) => {
    const app = applications.find((a) => a.id === id);
    setApplications((prev) => prev.filter((a) => a.id !== id));
    // Also remove associated interviews
    setInterviews((prev) => prev.filter((i) => i.applicationId !== id));
    if (app) {
      logActivity(`Deleted application for ${app.companyName}`, 'delete');
    }
  };

  /**
   * Update Status
   */
  const updateStatus = (id, newStatus) => {
    const app = applications.find((a) => a.id === id);
    if (!app) return;

    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );

    logActivity(`Status changed to "${newStatus}" for ${app.companyName}`, 'status');

    // Trigger celebratory confetti on Offer or Selected!
    if (newStatus === "Offer Received" || newStatus === "Selected") {
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#4F8CFF', '#8B5CF6', '#10B981', '#F59E0B']
        });
      } catch (err) {
        // ignore confetti errors
      }

      addNotification({
        title: `Congratulations! ${app.companyName} - ${newStatus}`,
        message: `Exciting career milestone reached with ${app.companyName}!`,
        type: 'offer',
        link: '/applications'
      });
    }
  };

  /**
   * Add Note to Application
   */
  const addNote = (id, newNote) => {
    setApplications((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const updatedNotes = a.notes
            ? `${a.notes}\n[${new Date().toLocaleDateString()}]: ${newNote}`
            : `[${new Date().toLocaleDateString()}]: ${newNote}`;
          return { ...a, notes: updatedNotes };
        }
        return a;
      })
    );
  };

  /**
   * Interview Management Actions
   */
  const addInterview = (interviewData) => {
    const newInterview = {
      id: `INT-${Date.now().toString().slice(-4)}`,
      applicationId: interviewData.applicationId || "",
      companyName: interviewData.companyName.trim(),
      jobRole: interviewData.jobRole.trim(),
      interviewDate: interviewData.interviewDate,
      interviewTime: interviewData.interviewTime,
      round: interviewData.round || "Technical Round",
      mode: interviewData.mode || "Google Meet",
      meetingLink: interviewData.meetingLink || "https://meet.google.com",
      notes: interviewData.notes || "",
      status: "Upcoming"
    };

    setInterviews((prev) => [newInterview, ...prev]);

    // Automatically change application status to Interview Scheduled
    if (interviewData.applicationId) {
      updateStatus(interviewData.applicationId, "Interview Scheduled");
    }

    // Add reminder notification
    addNotification({
      title: `Interview Scheduled: ${newInterview.companyName}`,
      message: `${newInterview.round} on ${newInterview.interviewDate} at ${newInterview.interviewTime} via ${newInterview.mode}`,
      type: 'interview',
      link: '/interviews'
    });

    logActivity(`Scheduled interview with ${newInterview.companyName}`, 'interview');
    return newInterview;
  };

  const updateInterview = (id, updatedData) => {
    setInterviews((prev) =>
      prev.map((i) => (i.id === id ? { ...i, ...updatedData } : i))
    );
    logActivity(`Updated interview schedule #${id}`, 'update');
  };

  const deleteInterview = (id) => {
    setInterviews((prev) => prev.filter((i) => i.id !== id));
    logActivity(`Cancelled interview #${id}`, 'delete');
  };

  /**
   * Notification Management Actions
   */
  const addNotification = ({ title, message, type = 'reminder', link = '/applications' }) => {
    const newNotif = {
      id: `NOTIF-${Date.now()}`,
      title,
      message,
      type,
      date: new Date().toISOString().split('T')[0],
      read: false,
      link
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  /**
   * Profile Update
   */
  const updateProfile = (updatedFields) => {
    setProfile((prev) => ({ ...prev, ...updatedFields }));
    logActivity("Updated career profile and preferences", "update");
  };

  /**
   * Reset To Pristine Sample Data
   */
  const resetToSampleData = () => {
    setApplications(INITIAL_APPLICATIONS);
    setInterviews(INITIAL_INTERVIEWS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setProfile(INITIAL_PROFILE);
    localStorage.removeItem('jobtrack_applications');
    localStorage.removeItem('jobtrack_interviews');
    localStorage.removeItem('jobtrack_notifications');
    localStorage.removeItem('jobtrack_profile');
    localStorage.removeItem('jobtrack_activities');
    logActivity("Reset application demo data to defaults", "reset");
  };

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        interviews,
        notifications,
        profile,
        recentActivity,
        addApplication,
        updateApplication,
        deleteApplication,
        updateStatus,
        addNote,
        addInterview,
        updateInterview,
        deleteInterview,
        addNotification,
        markNotificationRead,
        markAllNotificationsRead,
        deleteNotification,
        updateProfile,
        resetToSampleData
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplications = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplications must be used within an ApplicationProvider');
  }
  return context;
};
