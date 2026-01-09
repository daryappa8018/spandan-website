// app/contact/page.tsx
// Contact page - fetches settings from database

import { prisma } from '@/lib/prisma';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/contact/ContactForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Spandan',
  description: 'Get in touch with Spandan for questions about our work, events, or how to contribute.',
};

export default async function ContactPage() {
  // Fetch settings
  const settings = await prisma.siteSetting.findMany();
  const settingsMap = settings.reduce((acc, s) => {
    acc[s.key] = s.value;
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className="min-h-screen bg-white">
      <Header currentPath="/contact" />

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
              {settingsMap.site_email && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-2">Email</h3>
                  <a href={`mailto:${settingsMap.site_email}`} className="text-sm text-[#3d3e65] hover:underline">
                    {settingsMap.site_email}
                  </a>
                  <p className="text-xs text-slate-500 mt-1">
                    We respond within 2-3 business days
                  </p>
                </div>
              )}

              {settingsMap.site_phone && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-2">Phone</h3>
                  <p className="text-sm text-slate-700">{settingsMap.site_phone}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {settingsMap.office_hours || 'Available during college hours (9 AM - 5 PM)'}
                  </p>
                </div>
              )}

              {settingsMap.site_location && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-2">Campus Location</h3>
                  <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                    {settingsMap.site_location}
                  </p>
                </div>
              )}

              {settingsMap.office_hours && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-2">Office Hours</h3>
                  <p className="text-sm text-slate-700 whitespace-pre-line">
                    {settingsMap.office_hours}
                  </p>
                </div>
              )}
            </div>

            {(settingsMap.instagram_handle || settingsMap.linkedin_url) && (
              <div className="mt-8 pt-8 border-t border-slate-200">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Social Media</h3>
                <div className="space-y-2 text-sm">
                  {settingsMap.instagram_handle && (
                    <p>
                      <a href={`https://instagram.com/${settingsMap.instagram_handle.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-[#3d3e65] hover:underline">Instagram</a>
                      <span className="text-slate-500 ml-2">{settingsMap.instagram_handle}</span>
                    </p>
                  )}
                  {settingsMap.linkedin_url && (
                    <p>
                      <a href={settingsMap.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-[#3d3e65] hover:underline">LinkedIn</a>
                      <span className="text-slate-500 ml-2">Spandan - Socio-Technical Club</span>
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right: Contact Form */}
          <div>
            <ContactForm />
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

      <Footer />
    </div>
  );
}