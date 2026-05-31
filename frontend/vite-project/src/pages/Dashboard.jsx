import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'

function Dashboard() {
  const [projects, setProjects] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const { token } = useAuth()
  const navigate = useNavigate()

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        'http://localhost:5001/api/projects',
        config
      )
      setProjects(res.data)
    } catch(err) {
      console.log(err)
    }
    setLoading(false)
  }

  const createProject = async () => {
    if(!title) return
    try {
      const res = await axios.post(
        'http://localhost:5001/api/projects',
        { title, description },
        config
      )
      setProjects([...projects, res.data])
      setTitle('')
      setDescription('')
      setShowForm(false)
    } catch(err) {
      console.log(err)
    }
  }

  const deleteProject = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5001/api/projects/${id}`,
        config
      )
      setProjects(projects.filter(p => p._id !== id))
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div style={{minHeight: '100vh', 
                 background: '#f0f2f5'}}>
      <Navbar />
      <div style={{
        padding: '80px 32px 32px',
        maxWidth: '1100px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px'
        }}>
          <div>
            <h1 style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#1a1a2e'
            }}>My Projects</h1>
            <p style={{
              color: '#5f6368',
              fontSize: '14px',
              marginTop: '4px'
            }}>
              {projects.length} projects total
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              background: '#1a73e8',
              color: '#fff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
            + New Project
          </button>
        </div>

        {/* Create Form */}
        {showForm && (
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '16px'
            }}>Create New Project</h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <input
                type="text"
                placeholder="Project title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #e8eaed',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              <textarea
                placeholder="Project description (optional)"
                value={description}
                onChange={e => 
                  setDescription(e.target.value)}
                rows={3}
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #e8eaed',
                  fontSize: '14px',
                  outline: 'none',
                  resize: 'none'
                }}
              />
              <div style={{
                display: 'flex',
                gap: '8px'
              }}>
                <button
                  onClick={createProject}
                  style={{
                    background: '#1a73e8',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}>
                  Create
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  style={{
                    background: '#f0f2f5',
                    color: '#5f6368',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        {loading ? (
          <div style={{
            textAlign: 'center',
            color: '#5f6368',
            padding: '48px'
          }}>
            Loading projects...
          </div>
        ) : projects.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '48px',
            background: '#fff',
            borderRadius: '12px'
          }}>
            <div style={{fontSize: '48px'}}>📋</div>
            <h3 style={{
              fontSize: '18px',
              color: '#1a1a2e',
              marginTop: '16px'
            }}>No projects yet</h3>
            <p style={{color: '#5f6368', 
                       fontSize: '14px'}}>
              Create your first project!
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 
              'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {projects.map(project => (
              <div key={project._id} style={{
                background: '#fff',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: '1px solid #e8eaed',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={e =>
                e.currentTarget.style.transform = 
                'translateY(-2px)'}
              onMouseLeave={e =>
                e.currentTarget.style.transform = 
                'translateY(0)'}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '12px'
                }}>
                  <h3
                    onClick={() => navigate(
                      `/project/${project._id}`)}
                    style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#1a1a2e',
                      flex: 1
                    }}>
                    {project.title}
                  </h3>
                  <button
                    onClick={() => 
                      deleteProject(project._id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#d93025',
                      cursor: 'pointer',
                      fontSize: '16px'
                    }}>
                    🗑️
                  </button>
                </div>
                {project.description && (
                  <p style={{
                    fontSize: '13px',
                    color: '#5f6368',
                    lineHeight: '1.5',
                    marginBottom: '16px'
                  }}>
                    {project.description}
                  </p>
                )}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{
                    fontSize: '12px',
                    color: '#5f6368'
                  }}>
                    By {project.owner?.name}
                  </span>
                  <button
                    onClick={() => navigate(
                      `/project/${project._id}`)}
                    style={{
                      background: '#e8f0fe',
                      color: '#1a73e8',
                      border: 'none',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}>
                    Open →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard