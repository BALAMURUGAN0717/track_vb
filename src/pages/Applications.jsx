import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Plus,
  RotateCcw,
  LayoutGrid,
  List,
  MapPin,
  Calendar,
  DollarSign,
  Briefcase,
  ChevronDown,
  ArrowUpDown
} from 'lucide-react';
import JobCard from '../components/JobCard/JobCard';
import ApplicationDetailModal from '../components/JobCard/ApplicationDetailModal';
import EditApplicationModal from '../components/JobCard/EditApplicationModal';
import AddApplication from './AddApplication';
import { useApplications } from '../context/ApplicationContext';
import { useTheme } from '../context/ThemeContext';

export default function Applications() {
  const { applications, updateStatus, deleteApplication } = useApplications();
  const { isDark } = useTheme();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [workModeFilter, setWorkModeFilter] = useState('All');
  const [jobTypeFilter, setJobTypeFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'oldest' | 'company-az' | 'company-za'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Modals
  const [selectedApp, setSelectedApp] = useState(null);
  const [editingApp, setEditingApp] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Extract unique locations for filter dropdown
  const uniqueLocations = useMemo(() => {
    const locs = new Set();
    applications.forEach((a) => {
      if (a.jobLocation) {
        // take city if comma exists
        const city = a.jobLocation.split(',')[0].trim();
        locs.add(city);
      }
    });
    return Array.from(locs);
  }, [applications]);

  // Filtered & Sorted Applications
  const filteredApplications = useMemo(() => {
    return applications
      .filter((app) => {
        // Search by company or role
        const matchesSearch =
          app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.jobPosition.toLowerCase().includes(searchTerm.toLowerCase());

        // Status filter
        const matchesStatus = statusFilter === 'All' || app.status === statusFilter;

        // Work mode filter
        const matchesMode = workModeFilter === 'All' || app.workMode === workModeFilter;

        // Job type filter
        const matchesType = jobTypeFilter === 'All' || app.jobType === jobTypeFilter;

        // Location filter
        const matchesLocation =
          locationFilter === 'All' || app.jobLocation.toLowerCase().includes(locationFilter.toLowerCase());

        return matchesSearch && matchesStatus && matchesMode && matchesType && matchesLocation;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.appliedDate || 0) - new Date(a.appliedDate || 0);
        }
        if (sortBy === 'oldest') {
          return new Date(a.appliedDate || 0) - new Date(b.appliedDate || 0);
        }
        if (sortBy === 'company-az') {
          return a.companyName.localeCompare(b.companyName);
        }
        if (sortBy === 'company-za') {
          return b.companyName.localeCompare(a.companyName);
        }
        return 0;
      });
  }, [applications, searchTerm, statusFilter, workModeFilter, jobTypeFilter, locationFilter, sortBy]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setWorkModeFilter('All');
    setJobTypeFilter('All');
    setLocationFilter('All');
    setSortBy('newest');
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Applied': return 'badge-applied';
      case 'Under Review': return 'badge-under-review';
      case 'Shortlisted': return 'badge-shortlisted';
      case 'Interview Scheduled': return 'badge-interview';
      case 'Offer Received': return 'badge-offer';
      case 'Selected': return 'badge-selected';
      case 'Rejected': return 'badge-rejected';
      default: return 'badge-applied';
    }
  };

  return (
    <div style={{ padding: '28px 24px 60px 24px', maxWidth: '1440px', margin: '0 auto' }}>
      {/* Page Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '900', color: isDark ? '#FFF' : '#172033', letterSpacing: '-0.03em' }}>
            Application Tracking Center
          </h1>
          <p style={{ fontSize: '0.85rem', color: isDark ? '#A0AEC0' : '#64748B', marginTop: '4px' }}>
            Showing <strong>{filteredApplications.length}</strong> of <strong>{applications.length}</strong> tracked positions
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* View Toggle */}
          <div
            style={{
              display: 'flex',
              background: isDark ? '#151D32' : '#F1F5F9',
              borderRadius: '10px',
              padding: '3px',
              border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`
            }}
          >
            <button
              onClick={() => setViewMode('grid')}
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                background: viewMode === 'grid' ? (isDark ? '#1F293D' : '#FFFFFF') : 'transparent',
                color: viewMode === 'grid' ? '#4F8CFF' : isDark ? '#A0AEC0' : '#64748B',
                boxShadow: viewMode === 'grid' ? '0 2px 6px rgba(0,0,0,0.1)' : 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
              title="Grid View"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                background: viewMode === 'table' ? (isDark ? '#1F293D' : '#FFFFFF') : 'transparent',
                color: viewMode === 'table' ? '#4F8CFF' : isDark ? '#A0AEC0' : '#64748B',
                boxShadow: viewMode === 'table' ? '0 2px 6px rgba(0,0,0,0.1)' : 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
              title="Table View"
            >
              <List size={16} />
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="btn btn-primary"
            style={{ padding: '10px 18px', fontSize: '0.875rem' }}
          >
            <Plus size={16} /> Add Application
          </button>
        </div>
      </div>

      {/* Advanced Filter & Search Bar Panel */}
      <div
        style={{
          background: isDark ? '#151D32' : '#FFFFFF',
          borderRadius: '18px',
          border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
          padding: '20px',
          boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.4)' : '0 4px 20px rgba(15,23,42,0.04)',
          marginBottom: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}
      >
        {/* Search Input Row */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <Search
              size={18}
              color={isDark ? '#64748B' : '#94A3B8'}
              style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              placeholder="Search by company name or position..."
              className="form-input"
              style={{ paddingLeft: '42px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Sort Dropdown */}
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ width: 'auto', minWidth: '170px' }}
            >
              <option value="newest">Applied: Newest First</option>
              <option value="oldest">Applied: Oldest First</option>
              <option value="company-az">Company: A to Z</option>
              <option value="company-za">Company: Z to A</option>
            </select>

            {/* Reset Filters Button */}
            <button
              onClick={handleResetFilters}
              className="btn btn-secondary"
              title="Reset all filters"
              style={{ padding: '10px 14px', fontSize: '0.85rem' }}
            >
              <RotateCcw size={15} /> Reset
            </button>
          </div>
        </div>

        {/* Multi-Filter Selectors Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '12px',
            borderTop: `1px solid ${isDark ? '#1F293D' : '#F1F5F9'}`,
            paddingTop: '14px'
          }}
        >
          {/* Status Filter */}
          <div>
            <label style={{ fontSize: '0.72rem', fontWeight: '700', color: isDark ? '#64748B' : '#94A3B8', marginBottom: '4px', display: 'block' }}>
              STATUS
            </label>
            <select
              className="form-select"
              style={{ padding: '8px 10px', fontSize: '0.825rem' }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Applied">Applied</option>
              <option value="Under Review">Under Review</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Offer Received">Offer Received</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Work Mode */}
          <div>
            <label style={{ fontSize: '0.72rem', fontWeight: '700', color: isDark ? '#64748B' : '#94A3B8', marginBottom: '4px', display: 'block' }}>
              WORK MODE
            </label>
            <select
              className="form-select"
              style={{ padding: '8px 10px', fontSize: '0.825rem' }}
              value={workModeFilter}
              onChange={(e) => setWorkModeFilter(e.target.value)}
            >
              <option value="All">All Modes</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>
          </div>

          {/* Job Type */}
          <div>
            <label style={{ fontSize: '0.72rem', fontWeight: '700', color: isDark ? '#64748B' : '#94A3B8', marginBottom: '4px', display: 'block' }}>
              JOB TYPE
            </label>
            <select
              className="form-select"
              style={{ padding: '8px 10px', fontSize: '0.825rem' }}
              value={jobTypeFilter}
              onChange={(e) => setJobTypeFilter(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label style={{ fontSize: '0.72rem', fontWeight: '700', color: isDark ? '#64748B' : '#94A3B8', marginBottom: '4px', display: 'block' }}>
              LOCATION
            </label>
            <select
              className="form-select"
              style={{ padding: '8px 10px', fontSize: '0.825rem' }}
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="All">All Locations</option>
              {uniqueLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid or Table Display */}
      {filteredApplications.length === 0 ? (
        <div
          style={{
            padding: '60px 20px',
            textAlign: 'center',
            background: isDark ? '#151D32' : '#FFFFFF',
            borderRadius: '20px',
            border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`
          }}
        >
          <Briefcase size={48} style={{ opacity: 0.3, margin: '0 auto 14px auto' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: isDark ? '#FFF' : '#172033' }}>
            No Matching Applications Found
          </h3>
          <p style={{ fontSize: '0.875rem', color: isDark ? '#A0AEC0' : '#64748B', maxWidth: '400px', margin: '8px auto 20px auto' }}>
            Try tweaking your search keywords or reset filter conditions to see all opportunities.
          </p>
          <button onClick={handleResetFilters} className="btn btn-secondary">
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* 3D Cards Grid */
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '20px'
          }}
        >
          {filteredApplications.map((app) => (
            <JobCard
              key={app.id}
              application={app}
              onViewDetails={(a) => setSelectedApp(a)}
              onEdit={(a) => setEditingApp(a)}
            />
          ))}
        </div>
      ) : (
        /* SaaS Table View */
        <div
          style={{
            background: isDark ? '#151D32' : '#FFFFFF',
            borderRadius: '20px',
            border: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
            overflowX: 'auto',
            boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.4)' : '0 4px 20px rgba(15,23,42,0.05)'
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr
                style={{
                  borderBottom: `1px solid ${isDark ? '#29344D' : '#E2E8F0'}`,
                  background: isDark ? '#0E1528' : '#F8FAFC',
                  color: isDark ? '#A0AEC0' : '#64748B',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  textTransform: 'uppercase'
                }}
              >
                <th style={{ padding: '14px 20px' }}>Company & Role</th>
                <th style={{ padding: '14px 16px' }}>Status</th>
                <th style={{ padding: '14px 16px' }}>Mode / Type</th>
                <th style={{ padding: '14px 16px' }}>Salary</th>
                <th style={{ padding: '14px 16px' }}>Applied</th>
                <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((app) => (
                <tr
                  key={app.id}
                  style={{
                    borderBottom: `1px solid ${isDark ? '#1F293D' : '#F1F5F9'}`,
                    transition: 'background 0.15s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = isDark ? '#1A243D' : '#F8FAFC')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          background: app.color || '#4F8CFF',
                          color: '#FFFFFF',
                          fontWeight: '800',
                          fontSize: '0.85rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        {app.companyName.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontWeight: '700', color: isDark ? '#FFF' : '#172033' }}>
                          {app.companyName}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: isDark ? '#A0AEC0' : '#64748B' }}>
                          {app.jobPosition}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span className={`badge ${getStatusBadgeClass(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', color: isDark ? '#A0AEC0' : '#64748B' }}>
                    {app.workMode} • {app.jobType}
                  </td>
                  <td style={{ padding: '14px 16px', color: '#10B981', fontWeight: '600' }}>
                    {app.salaryRange || '—'}
                  </td>
                  <td style={{ padding: '14px 16px', color: isDark ? '#A0AEC0' : '#64748B' }}>
                    {app.appliedDate}
                  </td>
                  <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="btn btn-sm btn-secondary"
                        style={{ padding: '5px 10px', fontSize: '0.75rem' }}
                      >
                        View
                      </button>
                      <button
                        onClick={() => setEditingApp(app)}
                        className="btn btn-sm btn-secondary"
                        style={{ padding: '5px 10px', fontSize: '0.75rem' }}
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail Modal */}
      <ApplicationDetailModal
        application={selectedApp}
        isOpen={!!selectedApp}
        onClose={() => setSelectedApp(null)}
        onEdit={(a) => {
          setSelectedApp(null);
          setEditingApp(a);
        }}
      />

      {/* Edit Modal */}
      <EditApplicationModal
        application={editingApp}
        isOpen={!!editingApp}
        onClose={() => setEditingApp(null)}
      />

      {/* Add Modal */}
      {showAddModal && (
        <AddApplication isModal={true} onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
}
