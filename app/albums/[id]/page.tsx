import { getAlbum } from "@/lib/albums";
import { AlbumSchema } from "@/types/AlbumType";
import { ImageType } from "@/types/ImageType";
import Image from "next/image";
import Link from "next/link";

export default function AlbumPage({ params }: { params: { id: string } }) {
  const albumRaw = getAlbum(params.id);
  if (!albumRaw) {
    return <div>Album non trouvé</div>;
  }

  const album = AlbumSchema.parse(albumRaw);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">{album.title}</h1>
      <p className="mb-4">{album.description}</p>
      <p className="mb-4">Date: {album.date}</p>
      <p className="mb-6">Photographe: {album.photographer}</p>
      <Link
        href={`/albums/${album.id}/present`}
        className="mb-6 inline-block bg-blue-500 text-white px-4 py-2 rounded"
      >
        Voir la présentation
      </Link>
      <div className="w-full columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
        {album.images.map((image: ImageType) => (
          <div key={image.id} className="mb-4 break-inside-avoid">
            <div
              className={`w-full h-full ${image.ratio} bg-gray-300 relative overflow-hidden`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                layout="fill"
                objectFit="cover"
                className="hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
