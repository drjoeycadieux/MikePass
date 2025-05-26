import { PasswordGenerator } from '@/components/password-generator';
import { Footer } from '@/components/footer';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-4 bg-gradient-to-br from-background to-slate-900">
      <PasswordGenerator />
      <Footer />
    </div>
  );
}
