import { AlbumType } from "@/types/AlbumType";

export const albums: AlbumType[] = [
  {
    id: "1",
    title: "Vacances d'été",
    description: "Souvenirs de nos vacances à la plage",
    date: "2023",
    photographer: "John Doe",
    images: [
      {
        id: "1",
        src: "/Daniel Sessler Unsplash.jpg",
        ratio: "aspect-square",
        alt: "Plage ensoleillée",
      },
      {
        id: "2",
        src: "/Annie Spratt Unsplash.jpg",
        ratio: "aspect-video",
        alt: "Coucher de soleil sur l'océan",
      },
      // Ajoutez plus d'images...
    ],
  },
  {
    id: "2",
    title: "Voyage en montagne",
    description: "Notre randonnée dans les Alpes",
    date: "2024",
    photographer: "Jane Smith",
    images: [
      {
        id: "1",
        src: "/Daniel Sessler Unsplash.jpg",
        ratio: "aspect-[4/3]",
        alt: "Vue panoramique des montagnes",
      },
      {
        id: "2",
        src: "/Annie Spratt Unsplash.jpg",
        ratio: "aspect-video",
        alt: "Lac de montagne",
      },
      // Ajoutez plus d'images...
    ],
  },
  // Ajoutez plus d'albums...
];

export function getAlbum(id: string): AlbumType | undefined {
  return albums.find((album) => album.id === id);
}
