export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-20">
        <div className="container">
          <h1 className="font-syne font-bold text-5xl mb-6 max-w-2xl">
            About <span style={{ color: 'var(--teal)' }}>NetCloud Academy</span>
          </h1>
          <p style={{ color: 'var(--text-light)' }} className="text-lg max-w-2xl">
            We're dedicated to democratizing cloud and networking education for students worldwide.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-syne font-bold text-4xl mb-6">Our Mission</h2>
              <p style={{ color: 'var(--text-light)' }} className="mb-4 leading-relaxed">
                NetCloud Academy was founded with a simple mission: to provide accessible, high-quality education in networking and cloud computing. We believe that everyone should have the opportunity to learn these critical technologies, regardless of their background or location.
              </p>
              <p style={{ color: 'var(--text-light)' }} className="leading-relaxed">
                Our platform combines cutting-edge content with hands-on projects to ensure students don't just understand concepts, but can apply them in real-world scenarios.
              </p>
            </div>
            <div className="card p-8">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="font-syne font-bold text-2xl mb-4">Learn by Doing</h3>
              <p style={{ color: 'var(--text-light)' }} className="text-sm">
                Every course includes practical labs and projects that connect theory to practice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="container">
          <h2 className="section-label text-center mb-2">Why Choose Us</h2>
          <h2 className="text-center font-syne font-bold text-4xl mb-16">What Makes Us Different</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🏆',
                title: 'Expert Instructors',
                desc: 'Learn from professionals with real-world experience in cloud and networking'
              },
              {
                icon: '📚',
                title: 'Comprehensive Content',
                desc: 'From fundamentals to advanced topics, we cover it all'
              },
              {
                icon: '💼',
                title: 'Career Ready',
                desc: 'Gain skills that employers are actively looking for'
              },
              {
                icon: '🌍',
                title: 'Global Community',
                desc: 'Learn alongside students from around the world'
              },
              {
                icon: '🔄',
                title: 'Constantly Updated',
                desc: 'Content updated regularly to match industry changes'
              },
              {
                icon: '⭐',
                title: 'High Quality',
                desc: 'Best-in-class production and teaching standards'
              },
            ].map((item, i) => (
              <div key={i} className="card p-6 text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-syne font-bold text-xl mb-2">{item.title}</h3>
                <p style={{ color: 'var(--text-light)' }} className="text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section 
        className="py-24"
        style={{
          background: 'linear-gradient(135deg, rgba(0,229,195,0.1), rgba(255,107,43,0.05))',
          border: '1px solid rgba(0,229,195,0.2)',
          borderRadius: '6px'
        }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '10K+', label: 'Active Students' },
              { number: '200+', label: 'Courses' },
              { number: '50+', label: 'Topics' },
              { number: '98%', label: 'Satisfaction' },
            ].map((stat, i) => (
              <div key={i}>
                <div 
                  className="font-syne font-bold text-4xl mb-2"
                  style={{ color: 'var(--teal)' }}>
                  {stat.number}
                </div>
                <p className="font-space-mono text-xs uppercase" style={{ color: 'var(--text-light)' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
