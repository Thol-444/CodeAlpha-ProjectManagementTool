import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'

const STATUSES = ['Todo', 'In Progress', 'Done']

const STATUS_COLORS = {
  'Todo': { bg: '#fce8e6', color: '#d93025' },
  'In Progress': { bg: '#fef7e0', color: '#f29900' },
  'Done': { bg: '#e6f4ea', color: '#1e8e3e' }
}

function ProjectBoard() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const { token } = useAuth()

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [projectRes, tasksRes] = await Promise.all([
        axios.get(
          `http://localhost:5001/api/projects/${id}`,
          config),
        axios.get(
          `http://localhost:5001/api/tasks/${id}`,
          config)
      ])
      setProject(projectRes.data)
      setTasks(tasksRes.data)
    } catch(err) {
      console.log(err)
    }
    setLoading(false)
  }

  const createTask = async () => {
    if(!title) return
    try {
      const res = await axios.post(
        'http://localhost:5001/api/tasks',
        { title, description, projectId: id },
        config
      )
      setTasks([...tasks, res.data])
      setTitle('')
      setDescription('')
      setShowForm(false)
    } catch(err) {
      console.log(err)
    }
  }

  const updateStatus = async (taskId, status) => {
    try {
      const res = await axios.put(
        `http://localhost:5001/api/tasks/${taskId}`,
        { status },
        config
      )
      setTasks(tasks.map(t => 
        t._id === taskId ? res.data : t))
    } catch(err) {
      console.log(err)
    }
  }

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(
        `http://localhost:5001/api/tasks/${taskId}`,
        config
      )
      setTasks(tasks.filter(t => t._id !== taskId))
    } catch(err) {
      console.log(err)
    }
  }

  if(loading) return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      Loading...
    </div>
  )

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f0f2f5'
    }}>
      <Navbar />
      <div style={{
        padding: '80px 32px 32px',
        maxWidth: '1200px',
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
            }}>
              {project?.title}
            </h1>
            {project?.description && (
              <p style={{
                color: '#5f6368',
                fontSize: '14px',
                marginTop: '4px'
              }}>
                {project.description}
              </p>
            )}
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
            + Add Task
          </button>
        </div>

        {/* Create Task Form */}
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
            }}>Add New Task</h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <input
                type="text"
                placeholder="Task title"
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
                placeholder="Task description (optional)"
                value={description}
                onChange={e => 
                  setDescription(e.target.value)}
                rows={2}
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
                display: 'flex', gap: '8px'
              }}>
                <button
                  onClick={createTask}
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
                  Add Task
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

        {/* Kanban Board */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px'
        }}>
          {STATUSES.map(status => (
            <div key={status} style={{
              background: '#fff',
              borderRadius: '12px',
              padding: '16px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              {/* Column Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
                paddingBottom: '12px',
                borderBottom: '1px solid #e8eaed'
              }}>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#1a1a2e'
                }}>
                  {status}
                </h3>
                <span style={{
                  background: STATUS_COLORS[status].bg,
                  color: STATUS_COLORS[status].color,
                  padding: '2px 8px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {tasks.filter(t => 
                    t.status === status).length}
                </span>
              </div>

              {/* Tasks */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                {tasks
                  .filter(t => t.status === status)
                  .map(task => (
                  <div key={task._id} style={{
                    background: '#f8f9fa',
                    borderRadius: '8px',
                    padding: '12px',
                    border: '1px solid #e8eaed'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '8px'
                    }}>
                      <h4 style={{
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#1a1a2e',
                        flex: 1
                      }}>
                        {task.title}
                      </h4>
                      <button
                        onClick={() => 
                          deleteTask(task._id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#d93025',
                          cursor: 'pointer',
                          fontSize: '14px'
                        }}>
                        ×
                      </button>
                    </div>

                    {task.description && (
                      <p style={{
                        fontSize: '12px',
                        color: '#5f6368',
                        marginBottom: '10px',
                        lineHeight: '1.4'
                      }}>
                        {task.description}
                      </p>
                    )}

                    {/* Status buttons */}
                    <div style={{
                      display: 'flex',
                      gap: '4px',
                      flexWrap: 'wrap'
                    }}>
                      {STATUSES
                        .filter(s => s !== status)
                        .map(s => (
                        <button
                          key={s}
                          onClick={() => 
                            updateStatus(task._id, s)}
                          style={{
                            background: 
                              STATUS_COLORS[s].bg,
                            color: 
                              STATUS_COLORS[s].color,
                            border: 'none',
                            padding: '3px 8px',
                            borderRadius: '8px',
                            fontSize: '11px',
                            fontWeight: '500',
                            cursor: 'pointer'
                          }}>
                          → {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {tasks.filter(t => 
                  t.status === status).length === 0 && (
                  <div style={{
                    textAlign: 'center',
                    padding: '24px',
                    color: '#5f6368',
                    fontSize: '13px'
                  }}>
                    No tasks here
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectBoard