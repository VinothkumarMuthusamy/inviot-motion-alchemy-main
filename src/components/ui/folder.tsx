"use client";

import { useState, useRef, useEffect, ReactNode } from "react";

interface FolderProps {
  color?: string;
  items?: React.ReactNode[];
  className?: string;
}

const darkenColor = (hex: string, percent: number): string => {
  let color = hex.startsWith("#") ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return (
    "#" +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  );
};

const Folder: React.FC<FolderProps> = ({
  color = "#5227FF",
  items = [],
  className = "",
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const folderBackColor = darkenColor(color, 0.08);
  const paperColor = darkenColor("#2d2d42", 0.05);

  const handleClick = (): void => {
    setOpen((prev) => !prev);
  };

  // Auto-scroll animation for cards
  useEffect(() => {
    if (!open || !cardsContainerRef.current || items.length <= 3) return;

    const container = cardsContainerRef.current;
    const containerWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;
    
    // Only enable scrolling if content overflows
    if (containerWidth <= clientWidth) return;

    let scrollPosition = 0;
    let direction = 1;
    const scrollSpeed = 1;

    const scroll = (): void => {
      scrollPosition += direction * scrollSpeed;
      
      if (scrollPosition >= containerWidth - clientWidth) {
        direction = -1;
        scrollPosition = containerWidth - clientWidth;
      } else if (scrollPosition <= 0) {
        direction = 1;
        scrollPosition = 0;
      }
      
      container.scrollLeft = scrollPosition;
    };

    scrollIntervalRef.current = setInterval(scroll, 20);

    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, [open, items.length]);

  return (
    <div className={`relative ${className}`} style={{ width: "fit-content" }}>
      {/* Large Folder */}
      <div
        className={`group relative transition-all duration-300 ease-in-out cursor-pointer ${
          !open ? "hover:-translate-y-2" : ""
        }`}
        style={{
          width: "200px",
          height: "160px",
        }}
        onClick={handleClick}
      >
        {/* Folder back */}
        <div
          className="absolute inset-0 rounded-tl-0 rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px]"
          style={{ backgroundColor: folderBackColor }}
        >
          <span
            className="absolute z-0 bottom-[98%] left-0 w-[60px] h-[20px] rounded-tl-[10px] rounded-tr-[10px]"
            style={{ backgroundColor: folderBackColor }}
          ></span>
        </div>

        {/* Folder front flaps */}
        <div
          className={`absolute z-30 inset-0 origin-bottom transition-all duration-300 ease-in-out ${
            !open ? "group-hover:[transform:skew(15deg)_scaleY(0.6)]" : ""
          }`}
          style={{
            backgroundColor: color,
            borderRadius: "10px 20px 20px 20px",
            transform: open ? "skew(15deg) scaleY(0.6)" : undefined,
          }}
        ></div>
        <div
          className={`absolute z-30 inset-0 origin-bottom transition-all duration-300 ease-in-out ${
            !open ? "group-hover:[transform:skew(-15deg)_scaleY(0.6)]" : ""
          }`}
          style={{
            backgroundColor: color,
            borderRadius: "10px 20px 20px 20px",
            transform: open ? "skew(-15deg) scaleY(0.6)" : undefined,
          }}
        ></div>
      </div>

      {/* Cards container that appears when folder is open */}
      {open && (
        <div 
          className="absolute left-1/2 -translate-x-1/2 mt-6 w-[60vw] max-w-4xl overflow-x-auto scrollbar-hide"
          ref={cardsContainerRef}
        >
          <div 
            className="flex space-x-6 py-4 px-2" 
            style={{ 
              minWidth: `${items.length * 180}px`,
            }}
          >
            {items.map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-44 h-60 rounded-xl shadow-lg flex items-center justify-center p-4"
                style={{ 
                  backgroundColor: paperColor,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                }}
              >
                <div className="text-center w-full">{item}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Folder;