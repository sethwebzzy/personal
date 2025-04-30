import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StudentDashboard from '@/components/StudentDashboard'

export default function DashboardPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-1 bg-gray-50 px-4 py-12">
        <StudentDashboard />
      </section>
      <Footer />
    </main>
  )
}
