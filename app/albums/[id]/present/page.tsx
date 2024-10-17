"use client";

import { getAlbum } from "@/lib/albums";
import { AlbumSchema, AlbumType } from "@/types/AlbumType";
import dynamic from "next/dynamic";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";

const QRCode = dynamic<React.ComponentProps<typeof QRCodeSVG>>(
  () => import("qrcode.react").then((mod) => mod.QRCodeSVG),
  { ssr: false }
);

export default function PresentPage({ params }: { params: { id: string } }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const albumInfoRaw = getAlbum(params.id);
  if (!albumInfoRaw) {
    return <div>Album non trouvé</div>;
  }

  const albumInfo: AlbumType = AlbumSchema.parse(albumInfoRaw);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === albumInfo.images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [albumInfo.images.length]);

  const qrCodeUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/albums/${albumInfo.id}`;

  const handleQRCodeClick = () => {
    navigator.clipboard.writeText(qrCodeUrl);
  };

  return (
    <div className="flex h-screen gap-4">
      {/* Informations de l'album (1/3 de l'écran) */}
      <div className="w-1/5 flex flex-col gap-2">
        <h1 className="text-2xl font-bold mb-4">{albumInfo.title}</h1>
        <p className="mb-2">{albumInfo.description}</p>
        <p className="mb-2">Date: {albumInfo.date}</p>
        <p className="mb-4">Photographe: {albumInfo.photographer}</p>
        <p>Share your photos with the community or just check them out !</p>
        {/* QR Code */}
        <div className="p-4 bg-gray-100 rounded-sm">
          <QRCode value={qrCodeUrl} size={128} onClick={handleQRCodeClick} />
        </div>
      </div>

      {/* Affichage des photos (2/3 de l'écran) */}
      <div className="w-4/5 flex justify-center items-center relative">
        {albumInfo.images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className={`w-full ${image.ratio} relative`}>
              <Image
                src={image.src}
                alt={image.alt}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
