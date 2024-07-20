// "use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changeThumbnail } from "@/lib/actions/room-actions";
import { Room } from "@/lib/definitions";
import { DialogClose } from "@radix-ui/react-dialog";
import Image from "next/image";
import { useState } from "react";

export default function ThumbnailSelector({
  src,
  room,
}: {
  src: string;
  room: Room;
}) {
  const [selected, setSelected] = useState(room.thumbnail);

  const baseUrl = `/images/room/${room.id}/`;
  const alt = room.thumbnail ?? room.name;
  return (
    <Dialog>
      <DialogTrigger>
        {/* <Button variant="outline">Edit Profile</Button> */}
        <Image
          src={src}
          alt={alt}
          width={50}
          height={50}
          className="object-cover rounded-sm"
        />
      </DialogTrigger>
      <DialogContent className="md:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Seleciona portada</DialogTitle>
          <DialogDescription>
            Selecciona la foto en portada de habitación
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="relative aspect-video">
            <Image
              src={baseUrl + selected}
              alt={selected ?? "thumbnail"}
              fill
              className="object-cover rounded-sm"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 ">
            {room.images?.map((image, index) => (
              <div key={index}>
                <Image
                  src={baseUrl + image}
                  alt={image}
                  width={60}
                  height={60}
                  className="object-cover cursor-pointer rounded-sm"
                  onClick={() => setSelected(image)}
                />
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={() => changeThumbnail(room.id, selected)}>
              Guardar cambios
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
