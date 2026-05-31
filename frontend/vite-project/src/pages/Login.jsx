import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await axios.post(
        'http://localhost:5001/api/auth/login',
        { email, password }
      )
      login(res.data.user, res.data.token)
      navigate('/dashboard')
    } catch(err) {
      setError(err.response?.data?.message || 
               'Login failed!')
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1a73e8, #764ba2)'
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          <div style={{
            fontSize: '40px',
            marginBottom: '8px'
          }}>🗂️</div>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1a1a2e'
          }}>
            TaskFlow
          </h1>
          <p style={{
            color: '#5f6368',
            fontSize: '14px',
            marginTop: '4px'
          }}>
            Login to your account
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: '#fce8e6',
            color: '#d93025',
            padding: '10px 16px',
            borderRadius: '8px',
            fontSize: '13px',
            marginBottom: '16px'
          }}>
            {error}
          </div>
        )}

        {/* Form */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div>
            <label style={{
              fontSize: '13px',
              fontWeight: '500',
              color: '#202124',
              display: 'block',
              marginBottom: '6px'
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #e8eaed',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{
              fontSize: '13px',
              fontWeight: '500',
              color: '#202124',
              display: 'block',
              marginBottom: '6px'
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #e8eaed',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              background: '#1a73e8',
              color: '#fff',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              marginTop: '8px'
            }}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>

        {/* Register Link */}
        <p style={{
          textAlign: 'center',
          fontSize: '13px',
          color: '#5f6368',
          marginTop: '24px'
        }}>
          Don't have an account?{' '}
          <Link to="/register" style={{
            color: '#1a73e8',
            fontWeight: '600',
            textDecoration: 'none'
          }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login