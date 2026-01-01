'use client';

import React, { useState } from 'react';

// CONTACT PAGE - Spandan
// Minimal, clear, no aggressive forms
// Simple and professional

const SpandanContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    // DATA REPLACEMENT: Connect to your backend/email service
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <header className="border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <a href="/" className="block">
                <h1 className="text-xl font-semibold text-[#3d3e65]">Spandan</h1>
                <p className="text-xs text-slate-500 mt-0.5">Socio-Technical Club</p>
              </a>
            </div>
            <nav className="flex gap-8 text-sm">
              <a href="/about" className="text-slate-700 hover:text-[#3d3e65] transition-colors">About</a>
              <a href="/events" className="text-slate-700 hover:text-[#3d3e65] transition-colors">Events</a>
              <a href="/donation-drives" className="text-slate-700 hover:text-[#3d3e65] transition-colors">Donation Drives</a>
              <a href="/tech-projects" className="text-slate-700 hover:text-[#3d3e65] transition-colors">Tech Projects</a>
              <a href="/impact" className="text-slate-700 hover:text-[#3d3e65] transition-colors">Impact</a>
              <a href="/team" className="text-slate-700 hover:text-[#3d3e65] transition-colors">Team</a>
              <a href="/contact" className="text-[#3d3e65] font-medium">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        <h1 className="text-3xl font-semibold text-slate-900 mb-3">Contact</h1>
        <p className="text-base text-slate-600 max-w-2xl">
          Questions about our work, upcoming events, or how to contribute? Reach out using the information below.
        </p>
      </section>

      {/* Contact Methods and Form Side by Side */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl">
          
          {/* Left: Contact Information */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Get in Touch</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-2">Email</h3>
                <a href="mailto:spandan@college.edu" className="text-sm text-[#3d3e65] hover:underline">
                  spandan@college.edu
                </a>
                <p className="text-xs text-slate-500 mt-1">
                  We respond within 2-3 business days
                </p>
                {/* DATA REPLACEMENT: Update email address above */}
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-2">Phone</h3>
                <p className="text-sm text-slate-700">+91 98765 43210</p>
                <p className="text-xs text-slate-500 mt-1">
                  Available during college hours (9 AM - 5 PM)
                </p>
                {/* DATA REPLACEMENT: Update phone number above */}
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-2">Campus Location</h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Student Activities Office<br />
                  Room 204, Main Building<br />
                  College Campus, Karnal, Haryana
                </p>
                {/* DATA REPLACEMENT: Update campus location above */}
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-2">Office Hours</h3>
                <p className="text-sm text-slate-700">
                  Monday - Friday: 2:00 PM - 5:00 PM<br />
                  (During academic sessions only)
                </p>
                {/* DATA REPLACEMENT: Update office hours above */}
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-200">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Social Media</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <a href="#" className="text-[#3d3e65] hover:underline">Instagram</a>
                  <span className="text-slate-500 ml-2">@spandan_club</span>
                </p>
                <p>
                  <a href="#" className="text-[#3d3e65] hover:underline">LinkedIn</a>
                  <span className="text-slate-500 ml-2">Spandan - Socio-Technical Club</span>
                </p>
                {/* DATA REPLACEMENT: Update social media links above */}
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Send a Message</h2>
            
            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded">
                <p className="text-sm text-green-800">
                  Message sent. We'll get back to you soon.
                </p>
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3d3e65] focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3d3e65] focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3d3e65] focus:border-transparent"
                >
                  <option value="">Select a topic</option>
                  <option value="general">General Inquiry</option>
                  <option value="donation">Donation Information</option>
                  <option value="volunteer">Volunteer Opportunity</option>
                  <option value="partnership">Partnership/Collaboration</option>
                  <option value="media">Media/Press Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3d3e65] focus:border-transparent resize-none"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full px-6 py-3 bg-[#3d3e65] text-white text-sm font-medium rounded hover:bg-slate-700 transition-colors"
              >
                Send Message
              </button>

              <p className="text-xs text-slate-500">
                We'll respond to your message within 2-3 business days.
              </p>
            </div>

            {/* DATA REPLACEMENT: Connect button onClick to your backend */}
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="border-t border-slate-200 bg-slate-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-4xl">
            <h3 className="text-base font-semibold text-slate-900 mb-4">Before You Contact Us</h3>
            
            <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
              <p>
                <strong>About monetary donations:</strong> We do not accept money in any form. If someone has asked you for monetary donations on behalf of Spandan, please report this to us immediately.
              </p>
              <p>
                <strong>For material donations:</strong> Check our <a href="/donation-drives" className="text-[#3d3e65] underline">donation drives page</a> for current collection schedules and accepted items.
              </p>
              <p>
                <strong>Media inquiries:</strong> Please include your organization name, publication details, and specific questions in your message.
              </p>
              <p>
                <strong>Partnership proposals:</strong> We only partner with verified institutions and government bodies. Include organization registration details in your inquiry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Link */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="max-w-4xl">
          <p className="text-sm text-slate-600">
            Common questions are answered on our <a href="/about" className="text-[#3d3e65] underline">about page</a> and <a href="/donation-drives" className="text-[#3d3e65] underline">donation policy page</a>.
          </p>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-semibold text-slate-900">Spandan</p>
              <p className="text-xs text-slate-500 mt-1">Socio-Technical Club</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-600">
                <a href="/contact" className="hover:text-[#3d3e65] transition-colors">Contact</a>
                {" · "}
                <a href="/team" className="hover:text-[#3d3e65] transition-colors">Team</a>
              </p>
              <p className="text-xs text-slate-500 mt-2">
                Student initiative • Est. 2023
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SpandanContact;