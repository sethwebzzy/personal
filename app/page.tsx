import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-br from-blue-100 to-white">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
          Empowering Students Through Attachment
        </h1>
        <p className="text-gray-700 max-w-xl mb-6">
          Apply for meaningful industrial attachment opportunities under KVDA and take the next step in your career journey.
        </p>
        <Link
          href="/apply"
          className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
      </section>

      {/* Benefits Section */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-blue-700 mb-10">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-xl shadow-md bg-white">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Verified Placements</h3>
            <p className="text-gray-600">Access to legitimate, government-recognized attachment opportunities.</p>
          </div>
          <div className="p-6 rounded-xl shadow-md bg-white">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Track Your Application</h3>
            <p className="text-gray-600">Easily monitor your status and updates online.</p>
          </div>
          <div className="p-6 rounded-xl shadow-md bg-white">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Fast & Transparent Process</h3>
            <p className="text-gray-600">Simple application steps, responsive support, and no hidden delays.</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}