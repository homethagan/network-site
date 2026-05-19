'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, send to an API endpoint
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div>
      {/* Hero */}
      <section className="py-20">
        <div className="container text-center">
          <h1 className="font-syne font-bold text-5xl mb-4">Get in Touch</h1>
          <p style={{ color: 'var(--text-light)' }} className="max-w-xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: '📧',
                  title: 'Email',
                  value: 'hello@netcloud.academy'
                },
                {
                  icon: '💬',
                  title: 'Live Chat',
                  value: 'Available 24/7'
                },
                {
                  icon: '🌐',
                  title: 'Social Media',
                  value: '@netcloudacad'
                },
              ].map((item, i) => (
                <div key={i} className="card p-6 text-center">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-syne font-bold mb-2">{item.title}</h3>
                  <p style={{ color: 'var(--text-light)' }} className="text-sm">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="card p-8">
              {submitted && (
                <div 
                  className="mb-6 p-4 rounded-lg"
                  style={{
                    background: 'rgba(0, 229, 195, 0.1)',
                    border: '1px solid rgba(0, 229, 195, 0.3)',
                    color: 'var(--teal)'
                  }}>
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-space-mono text-xs uppercase mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block font-space-mono text-xs uppercase mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block font-space-mono text-xs uppercase mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What is this about?"
                  />
                </div>

                <div>
                  <label className="block font-space-mono text-xs uppercase mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Your message..."
                    rows={6}
                  />
                </div>

                <button type="submit" className="btn btn-primary w-full">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 border-t border-teal-500/10">
        <div className="container">
          <h2 className="section-label text-center mb-2">Support</h2>
          <h2 className="text-center font-syne font-bold text-4xl mb-16">Frequently Asked Questions</h2>

          <div className="max-w-2xl mx-auto space-y-4">
            {[
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, PayPal, and various crypto payments.'
              },
              {
                q: 'Is there a refund policy?',
                a: 'Yes, we offer a 30-day money-back guarantee if you\'re not satisfied.'
              },
              {
                q: 'Can I download course materials?',
                a: 'Yes, all course materials are downloadable for offline access.'
              },
              {
                q: 'Do you offer certificates?',
                a: 'Yes, upon completion of any course, you receive a verifiable certificate.'
              },
            ].map((faq, i) => (
              <div key={i} className="card p-6">
                <h3 className="font-syne font-bold mb-3" style={{ color: 'var(--teal)' }}>
                  Q: {faq.q}
                </h3>
                <p style={{ color: 'var(--text-light)' }}>
                  A: {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
