import { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout'; // Icon for logout
import PersonIcon from '@mui/icons-material/Person'; // Icon for role
import BadgeIcon from '@mui/icons-material/Badge'; // Icon for employee ID

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch role and employeeId from sessionStorage
  const employeeId = sessionStorage.getItem('employeeId');
  const role = sessionStorage.getItem('role'); // Get the role

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/";
    if (window.history && window.history.pushState) {
      window.history.replaceState(null, null, "/");
      window.history.pushState(null, null, "/");
      window.onpopstate = () => window.history.go(1);
    }
  };
  
  return (
    <header style={headerStyle}>
      <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Asset Management</h1>

      <div style={{ position: 'relative' }}>
        {/* User Icon and Role */}
        <div
          style={userContainer}
          onClick={toggleDropdown}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2d3748')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <AccountCircleIcon style={iconStyle} />
          <span style={{ fontWeight: '500', textTransform: 'uppercase' }}>{role || 'USER'}</span> {/* Role in uppercase */}
        </div>

        {/* Dropdown */}
        {showDropdown && (
          <div style={dropdownStyle}>
            {/* Header Section */}
            <div style={dropdownHeader}>
              <p style={{ fontSize: '1.15rem', fontWeight: '600' }}>Profile Info</p>
            </div>

            {/* Employee ID */}
            <div
              style={dropdownItem}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f7fafc')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <BadgeIcon style={iconText} />
              <p style={textStyle}>
                <strong>Employee ID:</strong> {employeeId || 'N/A'}
              </p>
            </div>

            {/* Role */}
            <div
              style={dropdownItem}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f7fafc')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <PersonIcon style={iconText} />
              <p style={textStyle}>
                <strong>Role:</strong> {role || 'N/A'}
              </p>
            </div>

            {/* Logout Section */}
            <div
              style={logoutStyle}
              onClick={handleLogout}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ffe5e5')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f0f4f8')}
            >
              <span style={{ color: 'red', fontWeight: '600' }}>Logout</span>
              <LogoutIcon style={{ color: 'red' }} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

const headerStyle = {
  backgroundColor: '#1a202c',
  color: 'white',
  padding: '0.5rem 1rem', 
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'fixed',
  width: '100%',
  zIndex: '50',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
};

const userContainer = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  padding: '0.25rem', 
  borderRadius: '0.5rem',
  transition: 'background-color 0.2s ease-in-out',
};

const iconStyle = {
  fontSize: '2rem', 
  marginRight: '0.5rem',
  color: '#e2e8f0',
  transition: 'color 0.2s ease-in-out',
};

const dropdownStyle = {
  position: 'absolute',
  right: 0,
  marginTop: '0.5rem',
  width: '14rem', 
  backgroundColor: 'white',
  borderRadius: '0.75rem',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  zIndex: '50',
};


const dropdownHeader = {
  backgroundColor: 'rgb(29, 78, 216)',
  color: 'white',
  padding: '1rem',
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',
};

const dropdownItem = {
  padding: '0.5rem 1rem', // Reduced padding for more compact layout
  display: 'flex',
  alignItems: 'center',
  borderBottom: '1px solid #edf2f7',
  transition: 'background-color 0.2s ease-in-out',
};

const logoutStyle = {
  padding: '0.75rem 1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#f0f4f8',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease-in-out',
  borderTop: '1px solid #edf2f7',
};

const iconText = {
  color: '#2563eb',
  marginRight: '0.5rem',
};

const textStyle = {
  color: '#4a5568',
  fontSize: '1rem',
  fontWeight: '500',
};

export default Header;
