'use client'

import { useEffect, useState } from 'react'

type DashboardData = {
  student: {
    full_name: string
    email: string
    student_number: string
  }
  application: {
    status: string
    institution: string
    course: string
    start_date: string
    end_date: string
  }
  document?: {
    document_name: string
    document_path: string
  }
}

export default function StudentDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const studentId = 1 // 🔁 Replace with session/auth data in real app

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost/personal/backend/api/student_dashboard.php?student_id=${studentId}`)
        const result = await res.json()
        if (result.success) {
          setData(result.data)
        } else {
          setError(result.message || 'Error loading dashboard.')
        }
      } catch (err) {
        setError('Network error.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <p className="text-center py-8">Loading dashboard...</p>
  if (error) return <p className="text-red-500 text-center py-8">{error}</p>
  if (!data) return null

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 shadow rounded space-y-6">
      <h2 className="text-2xl font-bold text-blue-700 text-center">Welcome, {data.student.full_name}</h2>

      <div>
        <h3 className="text-lg font-semibold text-gray-800">Your Application</h3>
        <ul className="mt-2 text-gray-700">
          <li><strong>Status:</strong> {data.application.status}</li>
          <li><strong>Institution:</strong> {data.application.institution}</li>
          <li><strong>Course:</strong> {data.application.course}</li>
          <li><strong>Start Date:</strong> {data.application.start_date}</li>
          <li><strong>End Date:</strong> {data.application.end_date}</li>
        </ul>
      </div>

      {data.document && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Uploaded Document</h3>
          <a href={`http://localhost/personal/backend/uploads/${data.document.document_name}`} target="_blank" className="text-blue-600 hover:underline">
            {data.document.document_name}
          </a>
        </div>
      )}
    </div>
  )
}
