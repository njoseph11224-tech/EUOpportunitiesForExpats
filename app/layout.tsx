import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EU Expat Visa Sponsorship Talentpool | Futuristic AI Job Portal',
  description:
    'Find high-paying EU jobs with Visa Sponsorship in Germany, Netherlands, Sweden, France, Ireland & Spain. Real-time EURES, LinkedIn & Google Jobs with Gemini AI contact extraction.',
  keywords: [
    'EU Visa Sponsorship Jobs',
    'German EU Blue Card',
    'Dutch Highly Skilled Migrant Visa',
    'French Tech Visa',
    'Expat Talentpool',
    'Relocation Packages Europe',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-blue-500 selection:text-white">{children}</body>
    </html>
  );
}
