import type { Metadata } from 'next';
import { Inter, Noto_Sans_Ethiopic } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });
const notoEthiopic = Noto_Sans_Ethiopic({ 
  subsets: ['ethiopic'], 
  variable: '--font-amharic' 
});

export const metadata: Metadata = {
  title: 'EthioAI Bot - Ethiopian AI Chatbot',
  description: 'AI-powered chatbot for Ethiopian businesses | Amharic, Afaan Oromoo & English',
  icons: { icon: '/icons/ethioai-logo.png' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="am" className={`${inter.className} ${notoEthiopic.variable}`}>
      <body>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
