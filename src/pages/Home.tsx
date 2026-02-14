import Navbar from '../sections/Navbar';
import Hero from '../sections/Hero';
import Tests from '../sections/Tests';
import About from '../sections/About';
import Footer from '../sections/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-warm">
      <Navbar />
      <main>
        <Hero />
        <Tests />
        <About />
      </main>
      <Footer />
    </div>
  );
}
