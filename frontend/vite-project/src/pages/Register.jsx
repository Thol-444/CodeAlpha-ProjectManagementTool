import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

function Register() {
  const [name, setName] = useState('')
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
        'http://localhost:5001/api/auth/register',
        { name, email, password }
      )
      login(res.data.user, res.data.token)
      navigate('/dashboard')
    } catch(err) {
      setError(err.response?.data?.message || 
               'Registration failed!')
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
        <div style={{
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          <div style={{fontSize: '40px', marginBottom: '8px'}}>🗂️</div>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1a1a2e'
          }}>Create Account</h1>
          <p style={{
            color: '#5f6368',
            fontSize: '14px',
            marginTop: '4px'
          }}>Join TaskFlow today</p>
        </div>

        {error && (
          <div style={{
            background: '#fce8e6',
            color: '#d93025',
            padding: '10px 16px',
            borderRadius: '8px',
            fontSize: '13px',
            marginBottom: '16px'
          }}>{error}</div>
        )}

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {[
            { label: 'Name', value: name, 
              setter: setName, 
              type: 'text', 
              placeholder: 'Enter your name' },
            { label: 'Email', value: email, 
              setter: setEmail, 
              type: 'email', 
              placeholder: 'Enter your email' },
            { label: 'Password', value: password, 
              setter: setPassword, 
              type: 'password', 
              placeholder: 'Create password' }
          ].map(field => (
            <div key={field.label}>
              <label style={{
                fontSize: '13px',
                fontWeight: '500',
                color: '#202124',
                display: 'block',
                marginBottom: '6px'
              }}>{field.label}</label>
              <input
                type={field.type}
                value={field.value}
                onChange={e => 
                  field.setter(e.target.value)}
                placeholder={field.placeholder}
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
          ))}

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
            {loading ? 'Creating account...' : 
                       'Register'}
          </button>
        </div>

        <p style={{
          textAlign: 'center',
          fontSize: '13px',
          color: '#5f6368',
          marginTop: '24px'
        }}>
          Already have an account?{' '}
          <Link to="/login" style={{
            color: '#1a73e8',
            fontWeight: '600',
            textDecoration: 'none'
          }}>Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register