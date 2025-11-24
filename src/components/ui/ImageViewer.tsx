import { X } from "lucide-react";

export default function ImageViewer({ images, navigateTo }: any) {
    const list = images || [];

    return (
        <div
            className="fixed inset-0 bg-black z-[9999] flex items-center justify-center"
    onClick={() => navigateTo("item-detail")}
>
    <img
        src={list[0]}
    className="max-w-full max-h-full object-contain"
    />

    <button
        className="absolute top-6 right-6 p-2 rounded-full bg-black/60"
    onClick={(e) => {
        e.stopPropagation();
        navigateTo("item-detail");
    }}
>
    <X className="text-white w-6 h-6" />
        </button>
        </div>
);
}