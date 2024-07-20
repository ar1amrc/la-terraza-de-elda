import Image from "next/image";
import { Experience } from "@/lib/definitions";
import { objectType } from "@/lib/utils";

type Props = {
  images: File[];
  objectToSearch?: Experience;
};

const ImagePreview = ({ images, objectToSearch }: Props) => {

  return (
    <div>
      <div className="grid grid-cols-12 gap-2 my-2">
        {images.map((image) => {
          const src = URL.createObjectURL(image);
          return (
            <div className="relative aspect-video col-span-4 lg:col-span-2" key={image.name}>
              <Image src={src} alt={image.name} className="object-cover rounded-sm" fill />
            </div>
          );
        })}
        {objectToSearch && objectToSearch.images ? objectToSearch.images.map((image) => {
          const src = `/images/${objectType(objectToSearch)}/${objectToSearch.id}/${image}`;
          return (
            <div className="relative aspect-video col-span-4 lg:col-span-2" key={image}>
              <Image src={src} alt={image} className="object-cover rounded-sm" fill />
            </div>
          );
        }): null}
      </div>
    </div>
  );
};

export default ImagePreview;
