import BarbellSVG from './BarbellSVG'
import { t } from '../i18n'

const sizeMap = {
  sm: { scale: 0.6, fontSize: 14 },
  md: { scale: 1, fontSize: 18 },
  lg: { scale: 1.4, fontSize: 22 },
};

export default function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const s = sizeMap[size];

  return (
    <div className="flex items-center gap-3.5 rtl:gap-6">
      {/* Barbell */}
      <div style={{ transform: `scale(${s.scale})`, transformOrigin: document.documentElement.dir === 'rtl' ? 'right center' : 'left center' }} className="flex-shrink-0 text-slate-800 dark:text-slate-100">
        <BarbellSVG />
      </div>

      {/* Text */}
      <span className="font-display font-bold text-tx-primary" style={{ fontSize: `${s.fontSize}px` }}>
        {t('Hadiyah Fit')}
      </span>
    </div>
  );
}
