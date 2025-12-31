// components/layout/Footer.tsx
// Shared footer component used across all pages
// Simple, minimal design

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          {/* Left: Brand */}
          <div>
            <p className="text-sm font-semibold text-slate-900">Spandan</p>
            <p className="text-xs text-slate-500 mt-1">Socio-Technical Club</p>
          </div>

          {/* Right: Links and Info */}
          <div className="flex flex-col md:items-end gap-2">
            <div className="flex flex-wrap gap-3 text-xs text-slate-600">
              <a href="/contact" className="hover:text-[#3d3e65] transition-colors">
                Contact
              </a>
              <span className="text-slate-400">·</span>
              <a href="/team" className="hover:text-[#3d3e65] transition-colors">
                Team
              </a>
              <span className="text-slate-400">·</span>
              <a href="/about" className="hover:text-[#3d3e65] transition-colors">
                About
              </a>
            </div>
            
            <p className="text-xs text-slate-500">
              Student initiative • Est. 2023
            </p>

            {/* Optional: Copyright notice */}
            <p className="text-xs text-slate-400 mt-1">
              © {currentYear} Spandan. All rights reserved.
            </p>
          </div>
        </div>

        {/* Optional: Additional footer note */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <p className="text-xs text-slate-500 max-w-2xl">
            Spandan operates on strict ethical principles. We do not accept monetary donations 
            of any kind. For questions or collaboration inquiries, please{' '}
            <a href="/contact" className="text-[#3d3e65] underline hover:text-slate-900">
              contact us
            </a>.
          </p>
        </div>
      </div>
    </footer>
  );
}