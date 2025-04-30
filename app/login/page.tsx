import LoginForm from '@/components/LoginForm'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-1 flex items-center justify-center bg-blue-50 px-4">
        <LoginForm />
      </section>
      <Footer />
    </main>
  )
}
