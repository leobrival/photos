import Link from "next/link";
import { albums } from "../../lib/albums";

export default function AlbumsPage() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Tous les albums</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {albums.map((album) => (
          <Link
            href={`/albums/${album.id}`}
            key={album.id}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{album.title}</h2>
            <p className="text-gray-600 mb-2">{album.description}</p>
            <p className="text-sm text-gray-500">Date: {album.date}</p>
            <p className="text-sm text-gray-500">
              Photographe: {album.photographer}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
