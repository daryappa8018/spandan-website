// app/donation-drives/page.tsx
// Donation drives policy page - CRITICAL PAGE about no monetary donations

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Donation Drives | Spandan',
  description: 'Learn about our donation policy. We accept material donations only - no monetary contributions.',
};

export default function DonationDrivesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header currentPath="/donation-drives" />

      {/* Page Header */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        <h1 className="text-3xl font-semibold text-slate-900 mb-3">Donation Drives</h1>
        <p className="text-base text-slate-600 max-w-2xl">
          We organize drives to collect and distribute essential material goods to communities in need. Please read our policies carefully before contributing.
        </p>
      </section>

      {/* Critical Notice - Prominent but calm */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <div className="max-w-3xl border-l-4 border-[#3d3e65] bg-slate-50 p-6">
          <h2 className="text-base font-semibold text-slate-900 mb-2">Important Policy</h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            Spandan does not accept monetary donations of any kind. This is a core organizational principle, not a temporary policy. We accept only material donations as specified below.
          </p>
        </div>
      </section>

      {/* What We Accept - Clear, detailed list */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <div className="max-w-3xl">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">What We Accept</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-semibold text-slate-900 mb-3">Clothing</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-2">
                Clean, wearable clothing in good condition. We accept both new and gently used items.
              </p>
              <ul className="space-y-1 text-sm text-slate-600 ml-4">
                <li className="pl-2 relative before:content-['•'] before:absolute before:left-[-12px]">
                  Winter wear: Sweaters, jackets, shawls, blankets
                </li>
                <li className="pl-2 relative before:content-['•'] before:absolute before:left-[-12px]">
                  General clothing: Shirts, pants, sarees, kurtas
                </li>
                <li className="pl-2 relative before:content-['•'] before:absolute before:left-[-12px]">
                  Children's clothing: All sizes, including school uniforms
                </li>
                <li className="pl-2 relative before:content-['•'] before:absolute before:left-[-12px]">
                  Footwear: Shoes, sandals, chappals in wearable condition
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-semibold text-slate-900 mb-3">Educational Materials</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-2">
                Items that support learning and education.
              </p>
              <ul className="space-y-1 text-sm text-slate-600 ml-4">
                <li className="pl-2 relative before:content-['•'] before:absolute before:left-[-12px]">
                  Textbooks: School and college level, preferably current editions
                </li>
                <li className="pl-2 relative before:content-['•'] before:absolute before:left-[-12px]">
                  Notebooks: Unused or lightly used
                </li>
                <li className="pl-2 relative before:content-['•'] before:absolute before:left-[-12px]">
                  Stationery: Pens, pencils, erasers, geometry boxes
                </li>
                <li className="pl-2 relative before:content-['•'] before:absolute before:left-[-12px]">
                  Reference books: Dictionaries, atlases, guides
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-semibold text-slate-900 mb-3">Essential Supplies</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-2">
                Basic necessities for daily living.
              </p>
              <ul className="space-y-1 text-sm text-slate-600 ml-4">
                <li className="pl-2 relative before:content-['•'] before:absolute before:left-[-12px]">
                  Hygiene products: Soap, toothpaste, sanitary napkins (unopened)
                </li>
                <li className="pl-2 relative before:content-['•'] before:absolute before:left-[-12px]">
                  Kitchen items: Utensils, containers (clean, functional)
                </li>
                <li className="pl-2 relative before:content-['•'] before:absolute before:left-[-12px]">
                  Bedding: Sheets, pillows, mattresses (in good condition)
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-semibold text-slate-900 mb-3">Sports Equipment</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-2">
                Items that promote physical activity and recreation.
              </p>
              <ul className="space-y-1 text-sm text-slate-600 ml-4">
                <li className="pl-2 relative before:content-['•'] before:absolute before:left-[-12px]">
                  Balls: Cricket, football, volleyball, basketball
                </li>
                <li className="pl-2 relative before:content-['•'] before:absolute before:left-[-12px]">
                  Equipment: Bats, rackets, nets (in working condition)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do NOT Accept - Very clear, repeated emphasis */}
      <section className="border-t border-slate-200 bg-slate-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">What We Do Not Accept</h2>
            
            <div className="space-y-6">
              <div className="bg-white border-2 border-slate-300 p-6 rounded">
                <h3 className="text-base font-semibold text-slate-900 mb-3">No Monetary Donations</h3>
                <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
                  <p>
                    We do not accept money in any form:
                  </p>
                  <ul className="space-y-1 ml-4">
                    <li className="pl-2 relative before:content-['×'] before:absolute before:left-[-12px] before:text-slate-400">Cash</li>
                    <li className="pl-2 relative before:content-['×'] before:absolute before:left-[-12px] before:text-slate-400">Bank transfers</li>
                    <li className="pl-2 relative before:content-['×'] before:absolute before:left-[-12px] before:text-slate-400">UPI payments</li>
                    <li className="pl-2 relative before:content-['×'] before:absolute before:left-[-12px] before:text-slate-400">Online payment platforms</li>
                    <li className="pl-2 relative before:content-['×'] before:absolute before:left-[-12px] before:text-slate-400">Cheques or demand drafts</li>
                    <li className="pl-2 relative before:content-['×'] before:absolute before:left-[-12px] before:text-slate-400">Gift cards or vouchers</li>
                    <li className="pl-2 relative before:content-['×'] before:absolute before:left-[-12px] before:text-slate-400">Cryptocurrency</li>
                  </ul>
                  <p className="pt-2">
                    This policy is permanent and applies to all circumstances. If someone requests monetary donations on behalf of Spandan, they are not authorized representatives of our organization.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-slate-900 mb-3">Items We Cannot Accept</h3>
                <ul className="space-y-1 text-sm text-slate-600 ml-4">
                  <li className="pl-2 relative before:content-['×'] before:absolute before:left-[-12px] before:text-slate-400">
                    Damaged or torn clothing
                  </li>
                  <li className="pl-2 relative before:content-['×'] before:absolute before:left-[-12px] before:text-slate-400">
                    Expired food items or perishables
                  </li>
                  <li className="pl-2 relative before:content-['×'] before:absolute before:left-[-12px] before:text-slate-400">
                    Prescription medications or expired medicines
                  </li>
                  <li className="pl-2 relative before:content-['×'] before:absolute before:left-[-12px] before:text-slate-400">
                    Broken electronics or non-functional equipment
                  </li>
                  <li className="pl-2 relative before:content-['×'] before:absolute before:left-[-12px] before:text-slate-400">
                    Items requiring significant repair
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Donate - Logistics */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="max-w-3xl">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">How to Contribute</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-semibold text-slate-900 mb-3">Collection Points</h3>
              <p className="text-sm text-slate-700 leading-relaxed mb-3">
                During active donation drives, we set up collection points on campus. Dates and locations are announced through:
              </p>
              <ul className="space-y-1 text-sm text-slate-600 ml-4">
                <li className="pl-2 relative before:content-['•'] before:absolute before:left-[-12px]">
                  Campus notice boards
                </li>
                <li className="pl-2 relative before:content-['•'] before:absolute before:left-[-12px]">
                  College email announcements
                </li>
                <li className="pl-2 relative before:content-['•'] before:absolute before:left-[-12px]">
                  Student WhatsApp groups
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-semibold text-slate-900 mb-3">Drop-off Process</h3>
              <ol className="space-y-2 text-sm text-slate-700 ml-4 list-decimal">
                <li className="pl-2">
                  Bring items to the designated collection point during announced hours
                </li>
                <li className="pl-2">
                  Team member will verify items meet acceptance criteria
                </li>
                <li className="pl-2">
                  Items are logged into inventory system
                </li>
                <li className="pl-2">
                  You receive a simple acknowledgment slip (not a tax receipt)
                </li>
              </ol>
            </div>

            <div>
              <h3 className="text-base font-semibold text-slate-900 mb-3">Sorting and Distribution</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                After collection, items are sorted by type, size, and condition. Distribution is coordinated with:
              </p>
              <ul className="space-y-1 text-sm text-slate-600 ml-4 mt-2">
                <li className="pl-2 relative before:content-['•'] before:absolute before:left-[-12px]">
                  Government schools for educational materials
                </li>
                <li className="pl-2 relative before:content-['•'] before:absolute before:left-[-12px]">
                  Village administrative bodies for general supplies
                </li>
                <li className="pl-2 relative before:content-['•'] before:absolute before:left-[-12px]">
                  Verified families identified through our village camp programs
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-semibold text-slate-900 mb-3">Timeline</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Most drives run for 5-7 days. Distribution typically occurs within 2 weeks of collection completion. We do not store donations long-term.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Policy - Explanation */}
      <section className="border-t border-slate-200 bg-slate-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Why We Don't Accept Money</h2>
            
            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <p>
                Our no-money policy is not about distrust or inconvenience. It's a deliberate choice rooted in transparency and operational clarity.
              </p>
              <p>
                Accepting monetary donations would require financial management systems, accounting oversight, regular audits, and potential legal registrations. This infrastructure would consume volunteer time and create administrative burden that diverts energy from direct service work.
              </p>
              <p>
                More importantly, material donations are immediately verifiable. When someone contributes clothing or books, we can show exactly what was collected and exactly where it was distributed. This level of transparency is harder to achieve with financial contributions, even with good accounting practices.
              </p>
              <p>
                We're a student organization operating on volunteer time. Our strength is coordination and execution, not financial administration. By focusing exclusively on material donations, we maintain simplicity, accountability, and trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact for Questions */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="max-w-3xl">
          <div className="border-l-2 border-slate-200 pl-6">
            <h3 className="text-base font-semibold text-slate-900 mb-2">Questions About Donations?</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-3">
              If you're unsure whether we can accept a particular item, or if you have questions about upcoming drives, please reach out.
            </p>
            <a href="/contact" className="text-sm text-[#3d3e65] underline hover:text-slate-900">
              Contact us →
            </a>
          </div>
        </div>
      </section>

      {/* Final Reminder - Calm but firm */}
      <section className="border-t border-slate-300 bg-white py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-sm text-slate-600 text-center">
              Spandan accepts only material donations. We do not accept monetary contributions under any circumstances.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}