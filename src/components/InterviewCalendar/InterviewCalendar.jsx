import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Plus } from 'lucide-react';
import { useApplications } from '../../context/ApplicationContext';
import { useTheme } from '../../context/ThemeContext';

export default function InterviewCalendar({ onSelectDate, onAddInterview }) {
  const { interviews } = useApplications();
  const { isDark } = useTheme();

  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Days in month
  const firstDayIndex = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Find interviews on a specific date (YYYY-MM-DD)
  const getInterviewsForDate = (dayNum) => {
    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
    return interviews.filter((i) => i.interviewDate === formattedDate);
  };

  const isToday = (dayNum) => {
    const today = new Date();
    return (
      today.getDate() === dayNum &&
      today.getMonth() === month &&
      today.getFullYear() === year
    );
  };

  const calendarDays = [];
  // Empty slots for days before 1st of month
  for (let i = 0; i < firstDayIndex; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= totalDays; i++) {
    calendarDays.push(i);
  }

  return (
    <div
      style={{
        background: isDark ? '#151D32' : '#FFFFFF',
        borderRadius: '20px',
        border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
        padding: '24px',
        boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.4)' : '0 10px 30px rgba(15, 23, 42, 0.05)'
      }}
    >
      {/* Calendar Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CalendarIcon size={20} color="#4F8CFF" />
          <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: isDark ? '#FFF' : '#172033' }}>
            {monthNames[month]} {year}
          </h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={prevMonth}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: isDark ? '#1F293D' : '#F1F5F9',
              color: isDark ? '#A0AEC0' : '#64748B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              background: isDark ? '#1F293D' : '#F1F5F9',
              color: isDark ? '#FFF' : '#172033',
              fontSize: '0.775rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Today
          </button>
          <button
            onClick={nextMonth}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: isDark ? '#1F293D' : '#F1F5F9',
              color: isDark ? '#A0AEC0' : '#64748B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Weekday labels */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          textAlign: 'center',
          marginBottom: '10px',
          fontWeight: '600',
          fontSize: '0.78rem',
          color: isDark ? '#64748B' : '#94A3B8'
        }}
      >
        {daysOfWeek.map((day) => (
          <div key={day} style={{ padding: '6px 0' }}>
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '6px'
        }}
      >
        {calendarDays.map((dayNum, idx) => {
          if (!dayNum) {
            return (
              <div
                key={`empty-${idx}`}
                style={{
                  height: '75px',
                  borderRadius: '10px',
                  background: isDark ? 'rgba(15, 22, 42, 0.4)' : '#F8FAFC'
                }}
              />
            );
          }

          const dayInterviews = getInterviewsForDate(dayNum);
          const hasInterview = dayInterviews.length > 0;
          const today = isToday(dayNum);

          return (
            <div
              key={dayNum}
              onClick={() => {
                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
                if (onSelectDate) onSelectDate(dateStr);
              }}
              style={{
                height: '75px',
                borderRadius: '10px',
                padding: '6px',
                background: hasInterview
                  ? isDark
                    ? 'rgba(79, 140, 255, 0.14)'
                    : '#EEF2FF'
                  : isDark
                  ? '#0E1528'
                  : '#FFFFFF',
                border: `1px solid ${
                  today
                    ? '#4F8CFF'
                    : hasInterview
                    ? 'rgba(79, 140, 255, 0.4)'
                    : isDark
                    ? '#1F293D'
                    : '#E2E8F0'
                }`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#4F8CFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = today
                  ? '#4F8CFF'
                  : hasInterview
                  ? 'rgba(79, 140, 255, 0.4)'
                  : isDark
                  ? '#1F293D'
                  : '#E2E8F0';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: today || hasInterview ? '700' : '500',
                    color: today
                      ? '#4F8CFF'
                      : hasInterview
                      ? isDark
                        ? '#FFF'
                        : '#172033'
                      : isDark
                      ? '#A0AEC0'
                      : '#64748B'
                  }}
                >
                  {dayNum}
                </span>
                {today && (
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#4F8CFF'
                    }}
                  />
                )}
              </div>

              {hasInterview && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {dayInterviews.slice(0, 2).map((item) => (
                    <div
                      key={item.id}
                      style={{
                        fontSize: '0.65rem',
                        fontWeight: '700',
                        padding: '1px 4px',
                        borderRadius: '4px',
                        background: '#06B6D4',
                        color: '#FFFFFF',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                      title={`${item.companyName} (${item.interviewTime})`}
                    >
                      {item.companyName}
                    </div>
                  ))}
                  {dayInterviews.length > 2 && (
                    <span style={{ fontSize: '0.6rem', color: '#4F8CFF', fontWeight: '700' }}>
                      +{dayInterviews.length - 2} more
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
