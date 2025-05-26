import { Github, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-6 md:px-8 md:py-0 bg-background text-center text-sm text-muted-foreground mt-auto">
      <div className="flex flex-col items-center justify-center gap-1 px-4 md:h-24 md:flex-row">
        <p className="leading-loose text-muted-foreground md:text-left">
          Built with <Heart className="inline-block h-4 w-4 fill-red-500 text-red-500" /> by{' '}
          <a
            href="https://github.com/pinkythegawd"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 hover:text-primary transition-colors"
          >
            MikePinku
          </a>
          .
        </p>
        <a
          href="https://github.com/pinkythegawd/passforge" // Assuming a repo name, can be updated
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4 hover:text-primary transition-colors flex items-center gap-1"
        >
          <Github className="h-4 w-4" />
          View on GitHub
        </a>
      </div>
    </footer>
  );
}
