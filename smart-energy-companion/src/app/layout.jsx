
import './globals.css';
import { poppins } from '@/lib/fonts';
import ReactQueryProvider from "@/components/ReactQuery/ReactQueryProvider";
import { Toaster } from "sonner";

export const metadata = {
  title: {
    template: '%s | Smart Energy Companion',
    default: 'Smart Energy Companion - All in one tool for efficient energy literacy, management and analysis',
  },
  description: 'Smart Energy Companion is your comprehensive solution for energy literacy, management, and analysis. Get real-time insights, optimize consumption, and make informed energy decisions.',
  keywords: ['energy monitoring', 'smart energy', 'energy optimization', 'energy savings', 'power consumption'],
  authors: [{ name: 'Smart Energy Companion Team' }],
  creator: 'Smart Energy Companion',
  publisher: 'Smart Energy Companion',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <ReactQueryProvider>
            {children}
            <Toaster
              richColors
              duration={2000}
              position="top-right"
              reverseOrder={false}
              closeOnClick
              expand={true}
            />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
