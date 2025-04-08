import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  Home, 
  Settings, 
  UserPlus, 
  Menu, 
  X, 
  ChevronRight,
  Bell,
  FileText,
  HelpCircle
} from 'lucide-react';
import '../../css/sidebar.css';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
      if (window.innerWidth < 992 && !collapsed) {
        setCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [collapsed]);

  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    }
  }, [isMobile]);

  useEffect(() => {
    // Check if current location is in appointments section
    if (location.pathname.includes('/appointments')) {
      setShowSubmenu(true);
    }
  }, [location]);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    if (!collapsed) {
      setShowSubmenu(false);
    }
  };

  const toggleSubmenu = (e) => {
    e.preventDefault();
    setShowSubmenu(!showSubmenu);
  };

  const NavItem = ({ to, icon, label, hasSubmenu, onClick }) => {
    const isActive = location.pathname === to || 
                    (hasSubmenu && location.pathname.includes(to));
    
    return (
      <NavLink 
        to={to || "#"} 
        className={`nav-item ${isActive ? 'active' : ''}`}
        onClick={onClick || undefined}
      >
        {icon}
        <span className={`nav-text ${collapsed ? 'hidden' : ''}`}>{label}</span>
        {hasSubmenu && !collapsed && (
          <ChevronRight size={16} className={`submenu-arrow ${showSubmenu ? 'rotated' : ''}`} />
        )}
      </NavLink>
    );
  };

  return (
    <div className={`sidebar ${collapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}>
      <div className="sidebar-header">
        <h4 className={`logo ${collapsed ? 'logo-small' : ''}`}>
          {collapsed ? 'PMS' : 'Doctor PMS'}
        </h4>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>
      
      <div className="sidebar-divider"></div>
      
      <nav className="sidebar-nav">
        <NavItem to="/" icon={<Home size={20} />} label="Dashboard" />
        
        <NavItem to="/patients" icon={<Users size={20} />} label="Patients" />
        
        <NavItem 
          to="/appointments" 
          icon={<Calendar size={20} />} 
          label="Appointments" 
          hasSubmenu={true}
          onClick={toggleSubmenu}
        />
        
        {showSubmenu && !collapsed && (
          <div className="submenu">
            <NavLink to="/appointments/upcoming" className="submenu-item">Upcoming</NavLink>
            <NavLink to="/appointments/past" className="submenu-item">Past</NavLink>
            <NavLink to="/appointments/create" className="submenu-item">Create New</NavLink>
          </div>
        )}
        
        <NavItem to="/doctors" icon={<UserPlus size={20} />} label="Doctors" />
        
        <NavItem to="/reports" icon={<FileText size={20} />} label="Reports" />
        
        <NavItem to="/notifications" icon={<Bell size={20} />} label="Notifications" />
        
        <div className="sidebar-divider"></div>
        
        <NavItem to="/help" icon={<HelpCircle size={20} />} label="Help" />
        
        <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" />
      </nav>
      
      <div className="sidebar-footer">
        <div className={`user-info ${collapsed ? 'hidden' : ''}`}>
          <div className="user-avatar">DR</div>
          <div className="user-details">
            <p className="user-name">Dr. Roberts</p>
            <p className="user-role">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;