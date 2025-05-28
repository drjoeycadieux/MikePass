
import { PasswordGenerator } from '@/components/password-generator';
import { Footer } from '@/components/footer';
import { BackgroundWallpaper } from '@/components/background-wallpaper';

export default function HomePage() {
  return (
    <>
      <BackgroundWallpaper />
      <div className="relative flex flex-col min-h-screen items-center justify-center p-4">
        <PasswordGenerator />
        <Footer />
      </div>
    </>
  );
}
