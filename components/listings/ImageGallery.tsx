"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
    images: string[];
    title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
    const [mainImage, setMainImage] = useState(images[0]);

    return (
        <div className="flex flex-col gap-4">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border bg-muted">
                <Image
                    src={mainImage}
                    alt={title}
                    fill
                    className="object-contain" // Use contain to see full image, or cover for style
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                />
            </div>
            {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            className={cn(
                                "relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all hover:opacity-100",
                                mainImage === img ? "border-primary" : "border-transparent opacity-70"
                            )}
                            onClick={() => setMainImage(img)}
                        >
                            <Image
                                src={img}
                                alt={`${title} - Thumbnail ${idx + 1}`}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
