import Link from 'next/link';
import { siInstagram, siX, siLinkedin, siGithub } from 'simple-icons';
import { Separator } from './ui/separator';

type SocialIconProps = {
  icon: {
    path: string;
    title: string;
    hex: string;
  };
  href: string;
  label: string;
};

const SocialIcon = ({ icon, href, label }: SocialIconProps) => (
  <a
    href={href}
    target='_blank'
    rel='noopener noreferrer'
    aria-label={label}
    className={`text-[#${icon.hex}] dark:text-[#${icon.hex}] transition-colors duration-200`}
  >
    <svg role='img' viewBox='0 0 24 24' className='w-5 h-5 fill-current'>
      <path d={icon.path} />
    </svg>
  </a>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='container mx-auto px-4 py-8'>
      <Separator className='mb-5' />

      <div className='flex flex-col md:flex-row md:justify-between space-y-8 md:space-y-0 md:items-end'>
        {/* Social Links and Copyright - Bottom on mobile, left on desktop */}
        <div className='flex flex-col space-y-4'>
          <div className='flex space-x-4'>
            <SocialIcon
              icon={siLinkedin}
              href='https://linkedin.com/in/cankiziloglu'
              label='LinkedIn'
            />
            <SocialIcon
              icon={siX}
              href='http://x.com/cankiziloglu'
              label='X'
            />
            <SocialIcon
              icon={siInstagram}
              href='https://instagram.com/cankiziloglu'
              label='Instagram'
            />
            <SocialIcon
              icon={siGithub}
              href='https://github.com/cankiziloglu/event-finder'
              label='GitHub'
            />
          </div>
          <p className='text-xs text-gray-600'>
            © {currentYear} Can Kiziloglu.
          </p>
          <Separator className='md:hidden' />
        </div>

        {/* Quick Search Links - Two columns */}
        <div className='flex flex-col space-y-2 mt-6 md:mt-0'>
          <h4 className='font-semibold mb-2'>Quick Search</h4>
          <div className='grid grid-cols-2 gap-4'>
            {/* Event Types Column */}
            <div className='flex flex-col space-y-2'>
              <Link
                href='/events?category=KZFzniwnSyZfZ7v7nJ'
                className='text-sm hover:underline'
              >
                Music Events
              </Link>
              <Link
                href='/events?category=KZFzniwnSyZfZ7v7nE'
                className='text-sm hover:underline'
              >
                Sports Events
              </Link>
              <Link
                href='/events?category=KZFzniwnSyZfZ7v7na'
                className='text-sm hover:underline'
              >
                Arts & Theater
              </Link>
              <Link
                href='/events?category=KZFzniwnSyZfZ7v7nn'
                className='text-sm hover:underline'
              >
                Film Events
              </Link>
            </div>

            {/* Cities Column */}
            <div className='flex flex-col space-y-2'>
              <Link
                href='/events?city=%C4%B0stanbul'
                className='text-sm hover:underline'
              >
                Events in Istanbul
              </Link>
              <Link
                href='/events?city=Ankara'
                className='text-sm hover:underline'
              >
                Events in Ankara
              </Link>
              <Link
                href='/events?city=%C4%B0zmir'
                className='text-sm hover:underline'
              >
                Events in Izmir
              </Link>
              <Link
                href='/events?city=Antalya'
                className='text-sm hover:underline'
              >
                Events in Antalya
              </Link>
            </div>
          </div>
        </div>

        {/* Legal Links - Middle on mobile, right on desktop */}
        <div className='flex flex-col space-y-2 mt-6 md:mt-0'>
          <Link href='/terms' className='text-sm hover:underline'>
            Terms of Use
          </Link>
          <Link href='/privacy' className='text-sm hover:underline'>
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
