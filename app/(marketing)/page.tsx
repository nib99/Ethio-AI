import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-ethiopian-green">EthioAI</span>
          </div>
          <div className="flex items-center gap-8">
            <Link href="/#features" className="hover:text-ethiopian-green">Features</Link>
            <Link href="/pricing" className="hover:text-ethiopian-green">Pricing</Link>
            <Link href="/contact" className="hover:text-ethiopian-green">Contact</Link>
            <Link href="/auth/login" className="bg-ethiopian-green text-white px-6 py-2.5 rounded-xl">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-16 text-center px-6">
        <h1 className="text-6xl md:text-7xl font-bold leading-tight max-w-4xl mx-auto">
          Your Ethiopian AI Assistant <br />
          <span className="text-ethiopian-green">በአማርኛ፣ ኦሮምኛ፣ እንግሊዝኛ</span>
        </h1>
        <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
          Powerful multilingual AI chatbot for Ethiopian businesses. WhatsApp, Telegram &amp; Web.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Link href="/auth/signup" className="bg-ethiopian-green text-white px-10 py-4 rounded-2xl text-lg font-medium">
            Start Free Trial
          </Link>
          <Link href="#demo" className="border border-gray-300 px-10 py-4 rounded-2xl text-lg font-medium hover:bg-gray-50">
            Watch Demo
          </Link>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Built for Ethiopian Businesses</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-3xl">
              <h3 className="text-2xl font-semibold mb-3">Multilingual AI</h3>
              <p className="text-gray-600">Seamless support in Amharic, Afaan Oromoo, and English.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl">
              <h3 className="text-2xl font-semibold mb-3">Smart Knowledge Base</h3>
              <p className="text-gray-600">Upload PDFs &amp; documents. AI answers from your own data.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl">
              <h3 className="text-2xl font-semibold mb-3">Local Payments</h3>
              <p className="text-gray-600">Pay easily with Chapa. Telebirr coming soon.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
