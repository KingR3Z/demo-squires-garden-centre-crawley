"use client";

import { useRef, useState, useCallback, useEffect } from "react";

interface BeforeAfterSplitProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  height?: string;
}

export default function BeforeAfterSplit({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  height = "80vh",
}: BeforeAfterSplitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [splitPosition, setSplitPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
      setSplitPosition(percent);
    },
    []
  );

  const handleMouseDown = useCallback(() => setIsDragging(true), []);
  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
    const onUp = () => setIsDragging(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [isDragging, handleMove]);

  return (
    <section className="section-dark" style={{ padding: "80px 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p
            style={{
              color: "var(--color-accent)",
              fontSize: "0.875rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            The Transformation
          </p>
          <h2
            style={{
              color: "white",
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              fontWeight: 300,
              lineHeight: 1.2,
            }}
          >
            See What We Can Do
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "0.85rem",
              marginTop: "8px",
            }}
          >
            Drag the slider to reveal the transformation
          </p>
        </div>

        <div
          ref={containerRef}
          aria-label="Before and after comparison slider"
          style={{
            position: "relative",
            width: "100%",
            height,
            borderRadius: "16px",
            overflow: "hidden",
            cursor: isDragging ? "grabbing" : "grab",
            userSelect: "none",
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          {/* After image (full width background) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${afterImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* Before image (clipped by split position) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${beforeImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              clipPath: `inset(0 ${100 - splitPosition}% 0 0)`,
            }}
          />

          {/* Divider line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `${splitPosition}%`,
              width: "3px",
              background: "white",
              transform: "translateX(-50%)",
              zIndex: 2,
              boxShadow: "0 0 12px rgba(0,0,0,0.5)",
            }}
          />

          {/* Drag handle */}
          <div
            role="slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(splitPosition)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") {
                e.preventDefault();
                setSplitPosition((prev) => Math.max(5, prev - 5));
              } else if (e.key === "ArrowRight") {
                e.preventDefault();
                setSplitPosition((prev) => Math.min(95, prev + 5));
              }
            }}
            style={{
              position: "absolute",
              top: "50%",
              left: `${splitPosition}%`,
              transform: "translate(-50%, -50%)",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
              cursor: isDragging ? "grabbing" : "grab",
            }}
          >
            <span style={{ fontSize: "1.2rem", color: "#333", fontWeight: 700 }}>⟺</span>
          </div>

          {/* Labels */}
          <div
            style={{
              position: "absolute",
              top: "20px",
              left: "20px",
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(8px)",
              padding: "8px 16px",
              borderRadius: "8px",
              color: "white",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              zIndex: 4,
            }}
          >
            {beforeLabel}
          </div>
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(8px)",
              padding: "8px 16px",
              borderRadius: "8px",
              color: "white",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              zIndex: 4,
            }}
          >
            {afterLabel}
          </div>
        </div>
      </div>
    </section>
  );
}
