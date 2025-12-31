// components/ui/PageHeader.tsx
// Reusable page header component for consistent page titles

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumb?: {
    label: string;
    href: string;
  }[];
}

export function PageHeader({ title, description, breadcrumb }: PageHeaderProps) {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-16 pb-8">
      {/* Breadcrumb */}
      {breadcrumb && breadcrumb.length > 0 && (
        <nav className="mb-4">
          <p className="text-sm text-slate-500">
            {breadcrumb.map((item, index) => (
              <span key={index}>
                {index > 0 && <span className="mx-2">/</span>}
                <a href={item.href} className="hover:text-[#3d3e65] transition-colors">
                  {item.label}
                </a>
              </span>
            ))}
          </p>
        </nav>
      )}

      {/* Title */}
      <h1 className="text-3xl font-semibold text-slate-900 mb-3">{title}</h1>

      {/* Description */}
      {description && (
        <p className="text-base text-slate-600 max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </section>
  );
}

// ================================================================

// components/ui/Section.tsx
// Reusable section wrapper for consistent spacing and styling

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'gray' | 'white';
  noPadding?: boolean;
  maxWidth?: 'full' | 'wide' | 'medium' | 'narrow';
}

export function Section({
  children,
  className = '',
  variant = 'default',
  noPadding = false,
  maxWidth = 'wide'
}: SectionProps) {
  // Background variants
  const bgClasses = {
    default: 'bg-white',
    gray: 'bg-slate-50',
    white: 'bg-white'
  };

  // Max width variants
  const maxWidthClasses = {
    full: 'max-w-full',
    wide: 'max-w-6xl',
    medium: 'max-w-4xl',
    narrow: 'max-w-3xl'
  };

  // Padding
  const paddingClasses = noPadding ? '' : 'py-12 md:py-16';

  return (
    <section className={`${bgClasses[variant]} ${paddingClasses} ${className}`}>
      <div className={`${maxWidthClasses[maxWidth]} mx-auto px-6`}>
        {children}
      </div>
    </section>
  );
}

// ================================================================

