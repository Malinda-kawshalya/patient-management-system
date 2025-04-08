import React, { useState, useEffect } from 'react';
import {
  Search,
  PlusCircle,
  Bell,
  Users,
  Calendar,
  TrendingUp,
  Clipboard,
  Clock,
  UserPlus,
  FileText,
  Activity,
  MessageSquare,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import '../css/dashboard.css';

const Dashboard = ({ sidebarCollapsed }) => {
  const [currentDate] = useState(new Date());
  const [calendarDates, setCalendarDates] = useState([]);
  
  useEffect(() => {
    // Generate calendar dates for current month
    generateCalendarDates(currentDate);
  }, [currentDate]);
  
  const generateCalendarDates = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Day of the week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayIndex = firstDay.getDay();
    
    const daysArray = [];
    
    // Add empty slots for days before the first day of the month
    for (let i = 0; i < firstDayIndex; i++) {
      daysArray.push({ day: '', empty: true });
    }
    
    // Add all days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const isToday = new Date(year, month, i).toDateString() === new Date().toDateString();
      // Randomly mark some days as having events (for demo purposes)
      const hasEvents = [4, 10, 15, 22].includes(i);
      
      daysArray.push({
        day: i,
        isToday,
        hasEvents,
        empty: false
      });
    }
    
    setCalendarDates(daysArray);
  };
  
  const formatMonthYear = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className={`dashboard-container ${sidebarCollapsed ? 'collapsed' : ''}`}>
      <div className="dashboard-header">
        
        
        <div className="dashboard-actions">
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
            />
          </div>
          
          <button className="action-button">
            <PlusCircle size={18} />
            <span>New Appointment</span>
          </button>
          
          <div className="notification-bell">
            <Bell size={18} />
            <span className="notification-indicator"></span>
          </div>
        </div>
      </div>
      
      <div className="dashboard-overview">
        <div className="overview-card">
          <div className="card-icon">
            <Users size={24} />
          </div>
          <div className="card-title">Total Patients</div>
          <div className="card-value">1,248</div>
          <div className="card-change">
            <ArrowUp size={14} /> 12% from last month
          </div>
        </div>
        
        <div className="overview-card">
          <div className="card-icon">
            <Calendar size={24} />
          </div>
          <div className="card-title">Appointments</div>
          <div className="card-value">42</div>
          <div className="card-change">
            <ArrowUp size={14} /> 8% from last week
          </div>
        </div>
        
        <div className="overview-card">
          <div className="card-icon">
            <TrendingUp size={24} />
          </div>
          <div className="card-title">Revenue</div>
          <div className="card-value">$24,500</div>
          <div className="card-change negative">
            <ArrowDown size={14} /> 3% from last month
          </div>
        </div>
        
        <div className="overview-card">
          <div className="card-icon">
            <Clipboard size={24} />
          </div>
          <div className="card-title">Pending Reports</div>
          <div className="card-value">18</div>
          <div className="card-change">
            <ArrowDown size={14} /> 6% from last week
          </div>
        </div>
      </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">Upcoming Appointments</h2>
            <div className="section-actions">
              <button className="section-button active">Today</button>
              <button className="section-button">Week</button>
              <button className="section-button">Month</button>
            </div>
          </div>
          
          <table className="appointments-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="patient-info">
                    <div className="patient-avatar">JD</div>
                    <div>
                      <div className="patient-name">John Doe</div>
                      <div className="patient-info-secondary">General Check-up</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="appointment-time">
                    <Clock size={16} />
                    <span>09:00 AM</span>
                  </div>
                </td>
                <td>
                  <span className="appointment-status status-confirmed">Confirmed</span>
                </td>
                <td>
                  <button className="action-dots">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="patient-info">
                    <div className="patient-avatar">SM</div>
                    <div>
                      <div className="patient-name">Sarah Miller</div>
                      <div className="patient-info-secondary">Dental Cleaning</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="appointment-time">
                    <Clock size={16} />
                    <span>10:30 AM</span>
                  </div>
                </td>
                <td>
                  <span className="appointment-status status-pending">Pending</span>
                </td>
                <td>
                  <button className="action-dots">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="patient-info">
                    <div className="patient-avatar">RJ</div>
                    <div>
                      <div className="patient-name">Robert Johnson</div>
                      <div className="patient-info-secondary">Follow-up</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="appointment-time">
                    <Clock size={16} />
                    <span>01:15 PM</span>
                  </div>
                </td>
                <td>
                  <span className="appointment-status status-cancelled">Cancelled</span>
                </td>
                <td>
                  <button className="action-dots">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="patient-info">
                    <div className="patient-avatar">EW</div>
                    <div>
                      <div className="patient-name">Emily Wilson</div>
                      <div className="patient-info-secondary">Consultation</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="appointment-time">
                    <Clock size={16} />
                    <span>03:45 PM</span>
                  </div>
                </td>
                <td>
                  <span className="appointment-status status-confirmed">Confirmed</span>
                </td>
                <td>
                  <button className="action-dots">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          
          <div className="section-header" style={{ marginTop: '2rem' }}>
            <h2 className="section-title">Monthly Statistics</h2>
          </div>
          
          <div className="stats-chart">
            <div className="chart-placeholder">
              <div className="chart-line"></div>
              <div className="chart-points">
                <div className="chart-point"></div>
                <div className="chart-point"></div>
                <div className="chart-point"></div>
                <div className="chart-point"></div>
                <div className="chart-point"></div>
              </div>
            </div>
            <div className="chart-labels">
              <div>Jan</div>
              <div>Feb</div>
              <div>Mar</div>
              <div>Apr</div>
              <div>May</div>
            </div>
          </div>
        </div>
        
        <div className="side-widgets">
          <div className="dashboard-section">
            <div className="section-header">
              <h2 className="section-title">Quick Actions</h2>
            </div>
            
            <div className="quick-actions">
              <div className="action-card">
                <div className="action-icon">
                  <UserPlus size={20} />
                </div>
                <div className="action-label">New Patient</div>
              </div>
              
              <div className="action-card">
                <div className="action-icon">
                  <Calendar size={20} />
                </div>
                <div className="action-label">Schedule</div>
              </div>
              
              <div className="action-card">
                <div className="action-icon">
                  <FileText size={20} />
                </div>
                <div className="action-label">New Report</div>
              </div>
              
              <div className="action-card">
                <div className="action-icon">
                  <MessageSquare size={20} />
                </div>
                <div className="action-label">Messages</div>
              </div>
            </div>
            
            <div className="calendar-widget">
              <div className="calendar-header">
                <div className="calendar-month">
                  {formatMonthYear(currentDate)}
                </div>
                <div className="calendar-navigation">
                  <button className="calendar-nav-button">
                    <ChevronLeft size={16} />
                  </button>
                  <button className="calendar-nav-button">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
              
              <div className="calendar-days">
                <div>Su</div>
                <div>Mo</div>
                <div>Tu</div>
                <div>We</div>
                <div>Th</div>
                <div>Fr</div>
                <div>Sa</div>
              </div>
              
              <div className="calendar-dates">
                {calendarDates.map((date, index) => (
                  <div 
                    key={index} 
                    className={`calendar-date ${date.empty ? 'empty' : ''} ${date.isToday ? 'today' : ''} ${date.hasEvents ? 'has-events' : ''}`}
                  >
                    {date.day}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="dashboard-section">
            <div className="section-header">
              <h2 className="section-title">Recent Activity</h2>
            </div>
            
            <div className="activity-feed">
              <div className="activity-item">
                <div className="activity-icon">
                  <UserPlus size={16} />
                </div>
                <div className="activity-content">
                  <div className="activity-title">New patient registered</div>
                  <div className="activity-time">30 minutes ago</div>
                </div>
              </div>
              
              <div className="activity-item">
                <div className="activity-icon">
                  <Calendar size={16} />
                </div>
                <div className="activity-content">
                  <div className="activity-title">Appointment rescheduled</div>
                  <div className="activity-time">1 hour ago</div>
                </div>
              </div>
              
              <div className="activity-item">
                <div className="activity-icon">
                  <FileText size={16} />
                </div>
                <div className="activity-content">
                  <div className="activity-title">Medical report updated</div>
                  <div className="activity-time">2 hours ago</div>
                </div>
              </div>
              
              <div className="activity-item">
                <div className="activity-icon">
                  <Activity size={16} />
                </div>
                <div className="activity-content">
                  <div className="activity-title">Patient vitals recorded</div>
                  <div className="activity-time">3 hours ago</div>
                </div>
              </div>
              
              <div className="activity-item">
                <div className="activity-icon">
                  <MessageSquare size={16} />
                </div>
                <div className="activity-content">
                  <div className="activity-title">New message from Dr. Harris</div>
                  <div className="activity-time">5 hours ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;