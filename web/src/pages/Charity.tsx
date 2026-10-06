import { HandHeart, ExternalLink, Droplets, Landmark, Lightbulb, HeartHandshake } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import { t } from '../i18n'

// Donations happen on Hadiyah's own site; this app never handles payments.
const SITE = 'https://hadiyah.org.sa'
const PROGRAMS = [
  { label: 'Programs and projects', icon: Droplets,       href: `${SITE}/program-category/019b4aed-6e55-73eb-a862-c27c444513c2` },
  { label: 'Innovative initiatives', icon: Lightbulb,     href: `${SITE}/program-category/019b4aec-a59a-73e5-bcb9-f7b280ee3400` },
  { label: 'Social investment',     icon: Landmark,       href: `${SITE}/program-category/019b4aeb-c9ef-732d-b460-08032f4b00b3` },
  { label: 'Government support',    icon: HeartHandshake, href: `${SITE}/program-category/019b4aea-ad6a-7226-a955-718863bc4859` },
]

export default function Charity() {
  return (
    <div className="space-y-5 animate-fade-in">
      <PageHeader title={t('Charity')} subtitle={t('Hadiyah Hajj and Umrah Gift Association')} />

      <div className="card p-5 bg-gradient-brand text-white border-0">
        <HandHeart className="w-8 h-8 mb-3" />
        <h2 className="font-bold text-lg mb-1">{t('Give with Hadiyah')}</h2>
        <p className="text-sm text-white/85 leading-relaxed mb-4">
          {t('Hadiyah serves the guests of Allah in Makkah: water at the Haram, iftar for fasting worshippers, and hospitality at the holy sites.')}
        </p>
        <a href={`${SITE}/#programs`} target="_blank" rel="noopener noreferrer"
           className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-brand-700 font-bold text-sm">
          {t('Donate on the Hadiyah website')}
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <section className="space-y-2">
        <h3 className="font-medium text-tx-secondary text-sm">{t('Choose a program')}</h3>
        {PROGRAMS.map(({ label, icon: Icon, href }) => (
          <a key={href} href={href} target="_blank" rel="noopener noreferrer"
             className="card-interactive flex items-center gap-3 p-4">
            <span className="w-10 h-10 rounded-full bg-brand-500/10 text-brand-700 dark:text-brand-300 flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5" />
            </span>
            <span className="flex-1 font-medium text-tx-primary">{t(label)}</span>
            <ExternalLink className="w-4 h-4 text-tx-muted" />
          </a>
        ))}
      </section>

      <p className="text-xs text-tx-muted leading-relaxed">
        {t('Links open the official Hadiyah website. No payment is taken inside this app.')}
      </p>
    </div>
  )
}
