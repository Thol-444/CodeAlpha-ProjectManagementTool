import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav style={{
      background: '#1a73e8',
      padding: '0 32px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 1000
    }}>
      {/* Logo */}
      <div
        onClick={() => navigate('/dashboard')}
        style={{
          color: '#fff',
          fontSize: '20px',
          fontWeight: '700',
          cursor: 'pointer'
        }}>
        🗂️ TaskFlow
      </div>

      {/* User Info */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        <span style={{
          color: '#fff',
          fontSize: '14px'
        }}>
          👋 {user?.name}
        </span>
        <button
          onClick={handleLogout}
          style={{
            background: '#fff',
            color: '#1a73e8',
            border: 'none',
            padding: '6px 16px',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar