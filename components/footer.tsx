import Link from 'next/link'
import { 
  siInstagram, 
  siX, 
  siLinkedin, 
  siGithub 
} from 'simple-icons'

type SocialIconProps = {
  icon: { 
    path: string; 
    title: string; 
    hex: string; 
  };
  href: string;
  label: string;
}

const SocialIcon = ({ icon, href, label }: SocialIconProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className={`text-[#${icon.hex}] dark:text-[#${icon.hex}] transition-colors duration-200`}
  >
    <svg role="img" viewBox="0 0 24 24" className="w-5 h-5 fill-current">
      <path d={icon.path}/>
    </svg>
  </a>
)

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:justify-between space-y-6 md:space-y-0">
          {/* Quick Search Links - Top on mobile, middle on desktop */}
          <div className="flex flex-col space-y-2 order-1 md:order-2">
            <h3 className="font-semibold text-lg mb-2">Quick Search</h3>
            <Link href="/events/music" className="hover:underline">Music Events</Link>
            <Link href="/events/sports" className="hover:underline">Sports Events</Link>
            <Link href="/events/arts" className="hover:underline">Arts & Theater</Link>
            <Link href="/events/family" className="hover:underline">Family Events</Link>
          </div>

          {/* Social Links and Copyright - Bottom on mobile, left on desktop */}
          <div className="flex flex-col space-y-4 order-3 md:order-1">
            <div className="flex space-x-4">
            <SocialIcon icon={siInstagram} href="https://instagram.com" label="Instagram" />
              <SocialIcon icon={siX} href="https://twitter.com" label="Twitter" />
              <SocialIcon icon={siLinkedin} href="https://linkedin.com" label="LinkedIn" />
              <SocialIcon icon={siGithub} href="https://github.com/yourusername/event-finder-app" label="GitHub" />
            </div>
            <p className="text-sm text-gray-600">
              © {currentYear} Event Finder App. All rights reserved.
            </p>
          </div>

          {/* Legal Links - Middle on mobile, right on desktop */}
          <div className="flex flex-col space-y-2 order-2 md:order-3">
            <Link href="/terms" className="hover:underline">Terms of Use</Link>
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

