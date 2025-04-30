import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ApplicationForm from '@/components/ApplicationForm'

export default function ApplyPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-1 flex items-center justify-center bg-gray-50 px-4 py-12">
        <ApplicationForm />
      </section>
      <Footer />
    </main>
  )
}
