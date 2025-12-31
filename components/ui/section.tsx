// components/ui/SectionHeader.tsx
// Section title component for use within sections

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export function SectionHeader({
  title,
  subtitle,
  align = 'left'
}: SectionHeaderProps) {
  const alignClasses = align === 'center' ? 'text-center' : 'text-left';

  return (
    <div className={`mb-8 ${alignClasses}`}>
      <h2 className="text-xl font-semibold text-slate-900 mb-2">{title}</h2>
      {subtitle && (
        <p className="text-sm text-slate-600 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}