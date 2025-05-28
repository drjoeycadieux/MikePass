
'use client';

import Image from 'next/image';

type BackgroundWallpaperProps = {
  imageUrl?: string;
  aiHint?: string;
  altText?: string;
};

export function BackgroundWallpaper({
  imageUrl = 'https://placehold.co/1920x1080.png',
  aiHint = 'abstract security',
  altText = 'Site background wallpaper',
}: BackgroundWallpaperProps) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
      <Image
        src={imageUrl}
        alt={altText}
        layout="fill"
        objectFit="cover"
        quality={75}
        priority
        data-ai-hint={aiHint}
      />
    </div>
  );
}
