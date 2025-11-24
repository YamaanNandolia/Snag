import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ImageCarouselProps {
    images: string[];
    alt: string;
    aspectRatio?: string;
    showDots?: boolean;
    showArrows?: boolean;
}

export default function ImageCarousel({
                                          images,
                                          alt,
                                          aspectRatio = 'aspect-[4/3]',
                                          showDots = true,
                                          showArrows = true,
                                      }: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Zoom / pan state
    const [scale, setScale] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);
    const [lastTap, setLastTap] = useState(0);
    const [pinchData, setPinchData] = useState<{
        initialDistance: number;
        initialScale: number;
        centerX: number;
        centerY: number;
    } | null>(null);

    const containerRef = useRef<HTMLDivElement | null>(null);

    const clampScale = (value: number) => Math.min(3, Math.max(1, value));

    const resetZoom = () => {
        setScale(1);
        setOffset({ x: 0, y: 0 });
        setIsDragging(false);
        setDragPos(null);
        setPinchData(null);
    };

    const setIndexAndResetZoom = (index: number) => {
        resetZoom();
        setCurrentIndex(index);
    };

    const goToPrevious = () => {
        setIndexAndResetZoom(
            currentIndex === 0 ? images.length - 1 : currentIndex - 1
        );
    };

    const goToNext = () => {
        setIndexAndResetZoom(
            currentIndex === images.length - 1 ? 0 : currentIndex + 1
        );
    };

    // ==== Wheel zoom (desktop) ====
    const handleWheel = (e: React.WheelEvent) => {
        if (!containerRef.current || images.length === 0) return;

        e.preventDefault(); // stop page scroll when zooming

        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const cursorX = e.clientX - centerX;
        const cursorY = e.clientY - centerY;

        // invert so wheel up = zoom in
        const delta = -e.deltaY;
        const zoomFactor = delta > 0 ? 1.1 : 0.9;

        setScale((prevScale) => {
            const newScale = clampScale(prevScale * zoomFactor);
            const scaleChange = newScale - prevScale;

            // adjust offset so the point under the cursor stays under it
            setOffset((prevOffset) => ({
                x: prevOffset.x - scaleChange * cursorX,
                y: prevOffset.y - scaleChange * cursorY,
            }));

            return newScale;
        });
    };

    // ==== Mouse drag (desktop) ====
    const handleMouseDown = (e: React.MouseEvent) => {
        if (scale <= 1) return;
        e.preventDefault();
        setIsDragging(true);
        setDragPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !dragPos || scale <= 1) return;
        e.preventDefault();

        const dx = e.clientX - dragPos.x;
        const dy = e.clientY - dragPos.y;

        setOffset((prev) => ({
            x: prev.x + dx,
            y: prev.y + dy,
        }));

        setDragPos({ x: e.clientX, y: e.clientY });
    };

    const endMouseDrag = () => {
        setIsDragging(false);
        setDragPos(null);
    };

    // ==== Touch gestures (mobile) ====
    const handleTouchStart = (e: React.TouchEvent) => {
        if (!containerRef.current) return;

        if (e.touches.length === 2) {
            const [t1, t2] = [e.touches[0], e.touches[1]];
            const dist = Math.hypot(
                t1.pageX - t2.pageX,
                t1.pageY - t2.pageY
            );

            const rect = containerRef.current.getBoundingClientRect();
            const centerX =
                (t1.pageX + t2.pageX) / 2 - (rect.left + rect.width / 2);
            const centerY =
                (t1.pageY + t2.pageY) / 2 - (rect.top + rect.height / 2);

            setPinchData({
                initialDistance: dist,
                initialScale: scale,
                centerX,
                centerY,
            });
        } else if (e.touches.length === 1 && scale > 1) {
            const t = e.touches[0];
            setDragPos({ x: t.pageX, y: t.pageY });
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!containerRef.current) return;

        if (e.touches.length === 2 && pinchData) {
            e.preventDefault();
            const [t1, t2] = [e.touches[0], e.touches[1]];
            const dist = Math.hypot(
                t1.pageX - t2.pageX,
                t1.pageY - t2.pageY
            );

            const rawScale =
                pinchData.initialScale * (dist / pinchData.initialDistance);
            const newScale = clampScale(rawScale);
            const scaleChange = newScale - scale;

            setScale(newScale);
            setOffset((prev) => ({
                x: prev.x - scaleChange * pinchData.centerX,
                y: prev.y - scaleChange * pinchData.centerY,
            }));
        } else if (e.touches.length === 1 && scale > 1 && dragPos) {
            e.preventDefault();
            const t = e.touches[0];
            const dx = t.pageX - dragPos.x;
            const dy = t.pageY - dragPos.y;

            setOffset((prev) => ({
                x: prev.x + dx,
                y: prev.y + dy,
            }));

            setDragPos({ x: t.pageX, y: t.pageY });
        }
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        // Double-tap to zoom
        if (e.touches.length === 0 && e.changedTouches.length === 1) {
            const now = Date.now();
            if (now - lastTap < 300) {
                // double tap
                if (scale > 1) {
                    resetZoom();
                } else {
                    setScale(2);
                }
            }
            setLastTap(now);
        }

        if (e.touches.length < 2) {
            setPinchData(null);
        }
        if (e.touches.length === 0) {
            setDragPos(null);
            setIsDragging(false);
        }
    };

    // ==== Double-click zoom (desktop) ====
    const handleDoubleClick = (e: React.MouseEvent) => {
        if (!containerRef.current) {
            if (scale > 1) resetZoom();
            else setScale(2);
            return;
        }

        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const cursorX = e.clientX - centerX;
        const cursorY = e.clientY - centerY;

        if (scale > 1) {
            resetZoom();
        } else {
            const newScale = 2;
            const scaleChange = newScale - scale;

            setScale(newScale);
            setOffset((prev) => ({
                x: prev.x - scaleChange * cursorX,
                y: prev.y - scaleChange * cursorY,
            }));
        }
    };

    if (images.length === 0) {
        return (
            <div className={`${aspectRatio} bg-purple-100/50 flex items-center justify-center`}>
                <span className="text-purple-400 text-sm font-medium">No images</span>
            </div>
        );
    }



    return (
        <div
            className={`${aspectRatio} relative bg-purple-100/50 group`}
            ref={containerRef}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={endMouseDrag}
            onMouseLeave={endMouseDrag}
            onDoubleClick={handleDoubleClick}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Current image with zoom + pan */}
            <div
                className={`
          w-full h-full overflow-hidden
          ${scale > 1 ? 'cursor-grab active:cursor-grabbing' : ''}
          select-none
        `}
                style={{ touchAction: scale > 1 ? 'none' : 'pan-y' }}
            >
                <ImageWithFallback
                    src={images[currentIndex]}
                    alt={`${alt} - Image ${currentIndex + 1}`}
                    className="w-full h-full object-cover"
                    style={{
                        transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})`,
                        transition: isDragging || pinchData ? 'none' : 'transform 0.15s ease-out',
                    }}
                    draggable={false}
                />
            </div>

            {/* Navigation arrows */}
            {showArrows && images.length > 1 && scale === 1 && (
                <>
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            goToPrevious();
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full backdrop-blur-xl bg-white/80 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                        <ChevronLeft className="w-5 h-5 text-[#222]" />
                    </div>
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            goToNext();
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full backdrop-blur-xl bg-white/80 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                        <ChevronRight className="w-5 h-5 text-[#222]" />
                    </div>
                </>
            )}

            {/* Pagination dots */}
            {showDots && images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 backdrop-blur-xl bg-black/20 rounded-full px-2 py-1">
                    {images.map((_, index) => (
                        <div
                            key={index}
                            onClick={(e) => {
                                e.stopPropagation();
                                setIndexAndResetZoom(index);
                            }}
                            className={`transition-all cursor-pointer ${
                                index === currentIndex
                                    ? 'w-6 h-1.5 bg-white rounded-full'
                                    : 'w-1.5 h-1.5 bg-white/50 rounded-full hover:bg-white/80'
                            }`}
                        />
                    ))}
                </div>
            )}

            {/* Image counter */}
            <div className="absolute top-3 right-3 backdrop-blur-xl bg-black/30 rounded-full px-2.5 py-1">
        <span className="text-white text-xs font-medium">
          {currentIndex + 1}/{images.length}
        </span>
            </div>
        </div>
    );
}