'use client'

import { useState } from 'react'

export default function ApplicationForm() {
  const [form, setForm] = useState({
    student_number: '',
    full_name: '',
    email: '',
    password: '',
    institution: '',
    course: '',
    start_date: '',
    end_date: ''
  })

  const [document, setDocument] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocument(e.target.files?.[0] || null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    const formData = new FormData()
    Object.entries(form).forEach(([key, value]) => formData.append(key, value))
    if (document) formData.append('document', document)

    try {
      const res = await fetch('http://localhost/personal/backend/api/register.php', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()
      if (data.success) {
        setSuccess('Registration successful!')
        setForm({
          student_number: '',
          full_name: '',
          email: '',
          password: '',
          institution: '',
          course: '',
          start_date: '',
          end_date: ''
        })
        setDocument(null)
      } else {
        setError(data.message || 'Something went wrong.')
      }
    } catch (err) {
      setError('Server error.')
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl w-full bg-white p-8 shadow rounded" encType="multipart/form-data">
      <h2 className="text-2xl font-bold text-blue-600 text-center">Student Application</h2>

      {success && <p className="text-green-600 text-sm text-center">{success}</p>}
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <div className="grid md:grid-cols-2 gap-4">
        <input name="full_name" value={form.full_name} onChange={handleChange} required placeholder="Full Name" className="input" />
        <input name="student_number" value={form.student_number} onChange={handleChange} required placeholder="Student Number" className="input" />
        <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="Email" className="input" />
        <input type="password" name="password" value={form.password} onChange={handleChange} required placeholder="Password" className="input" />
        <input name="institution" value={form.institution} onChange={handleChange} required placeholder="Institution" className="input" />
        <input name="course" value={form.course} onChange={handleChange} required placeholder="Course" className="input" />
        <input type="date" name="start_date" value={form.start_date} onChange={handleChange} required className="input" />
        <input type="date" name="end_date" value={form.end_date} onChange={handleChange} required className="input" />
      </div>

      <div>
        <label className="block mb-1 font-medium text-sm">Upload Document (PDF, DOCX, JPG)</label>
        <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={handleFileChange} className="input" />
      </div>

      <button type="submit" disabled={loading} className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition">
        {loading ? 'Submitting...' : 'Submit Application'}
      </button>
    </form>
  )
}
