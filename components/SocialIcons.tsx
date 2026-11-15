import React from 'react';
import { Instagram } from 'lucide-react';
import { INSTAGRAM_PROFILE, TIKTOK_PROFILE, WHATSAPP_CHAT } from '../constants';

type IconProps = { size?: number; className?: string };

export const TikTokIcon: React.FC<IconProps> = ({ size = 18, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-2.59-2.59c.27 0 .53.04.78.12V9.78a5.7 5.7 0 0 0-.78-.05A5.69 5.69 0 1 0 15.55 15.4V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.28 4.28 0 0 1-3.25-1.48Z" />
  </svg>
);

export const WhatsAppIcon: React.FC<IconProps> = ({ size = 18, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5.1 5.24-1.37A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.1.81.83-3.03-.2-.31a8.22 8.22 0 1 1 6.95 3.86Zm4.5-6.15c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.17.25-.64.8-.78.97-.14.16-.29.18-.53.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.66.31c-.22.25-.86.85-.86 2.07s.88 2.4 1.01 2.57c.12.16 1.74 2.66 4.2 3.73.59.25 1.05.4 1.4.52.6.19 1.13.16 1.56.1.47-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.47-.28Z" />
  </svg>
);

export const socials = [
  { name: 'Instagram', href: INSTAGRAM_PROFILE, Icon: ({ size = 18 }: IconProps) => <Instagram size={size} aria-hidden="true" /> },
  { name: 'TikTok', href: TIKTOK_PROFILE, Icon: TikTokIcon },
  { name: 'WhatsApp', href: WHATSAPP_CHAT, Icon: WhatsAppIcon },
];

/** Round icon links to every Hautezelle channel. Each one opens in a new tab. */
export const SocialLinks: React.FC<{ className?: string; itemClassName?: string; size?: number }> = ({
  className = 'flex gap-3',
  itemClassName = 'flex h-11 w-11 items-center justify-center rounded-full border',
  size = 18,
}) => (
  <div className={className}>
    {socials.map(({ name, href, Icon }) => (
      <a
        key={name}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Hautezelle on ${name} (opens in a new tab)`}
        title={name}
        className={itemClassName}
      >
        <Icon size={size} />
      </a>
    ))}
  </div>
);
