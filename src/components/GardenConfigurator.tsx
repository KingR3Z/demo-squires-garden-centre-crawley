"use client";

import { useState, useMemo } from "react";

interface ConfigOption {
  id: string;
  label: string;
  color: string;
  description: string;
}

interface ConfigCategory {
  name: string;
  icon: string;
  options: ConfigOption[];
}

const CATEGORIES: ConfigCategory[] = [
  {
    name: "Paving",
    icon: "🪨",
    options: [
      { id: "sandstone", label: "Natural Sandstone", color: "#d4b896", description: "Warm, traditional Indian sandstone" },
      { id: "porcelain", label: "Porcelain", color: "#c8c8c8", description: "Modern, low-maintenance porcelain tiles" },
      { id: "slate", label: "Black Slate", color: "#3a3a3a", description: "Dramatic dark slate for contemporary gardens" },
      { id: "limestone", label: "Limestone", color: "#e8dcc8", description: "Classic cream limestone paving" },
    ],
  },
  {
    name: "Planting",
    icon: "🌿",
    options: [
      { id: "cottage", label: "Cottage Garden", color: "#e84393", description: "Lavender, roses, foxgloves" },
      { id: "modern", label: "Modern Minimal", color: "#2d5016", description: "Grasses, ferns, structural plants" },
      { id: "tropical", label: "Tropical", color: "#00b894", description: "Palms, bamboo, exotic specimens" },
      { id: "mediterranean", label: "Mediterranean", color: "#6c5ce7", description: "Olive trees, lavender, rosemary" },
    ],
  },
  {
    name: "Features",
    icon: "💧",
    options: [
      { id: "pond", label: "Natural Pond", color: "#1a4a6b", description: "Wildlife pond with marginal planting" },
      { id: "fountain", label: "Water Fountain", color: "#74b9ff", description: "Contemporary water feature" },
      { id: "firepit", label: "Fire Pit", color: "#e17055", description: "Social fire pit with seating" },
      { id: "pergola", label: "Pergola", color: "#6b4226", description: "Timber pergola with climbers" },
    ],
  },
  {
    name: "Lighting",
    icon: "💡",
    options: [
      { id: "warm", label: "Warm White", color: "#ffd4a3", description: "Cozy 2700K warm glow" },
      { id: "cool", label: "Cool White", color: "#dfe6e9", description: "Modern 4000K crisp light" },
      { id: "accent", label: "Accent Colour", color: "#a29bfe", description: "RGB colour-changing uplights" },
      { id: "solar", label: "Solar Powered", color: "#fdcb6e", description: "Eco-friendly solar path lights" },
    ],
  },
];

export default function GardenConfigurator() {
  const [selections, setSelections] = useState<Record<string, string>>({
    Paving: "sandstone",
    Planting: "cottage",
    Features: "pond",
    Lighting: "warm",
  });

  const selectedDetails = useMemo(() => {
    return CATEGORIES.map((cat) => {
      const selected = cat.options.find((o) => o.id === selections[cat.name]);
      return { category: cat.name, icon: cat.icon, ...selected };
    });
  }, [selections]);

  // Generate a visual preview gradient based on selections
  const previewGradient = useMemo(() => {
    const colors = CATEGORIES.map(
      (cat) => cat.options.find((o) => o.id === selections[cat.name])?.color || "#333"
    );
    return `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 33%, ${colors[2]} 66%, ${colors[3]} 100%)`;
  }, [selections]);

  return (
    <section className="section-dark" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
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
            Design Your Garden
          </p>
          <h2
            style={{
              color: "white",
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              fontWeight: 300,
              lineHeight: 1.2,
            }}
          >
            Customise Your Perfect Outdoor Space
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "32px",
          }}
        >
          {/* Left: Options */}
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {CATEGORIES.map((cat) => (
              <div key={cat.name}>
                <p
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginBottom: "12px",
                  }}
                >
                  {cat.icon} {cat.name}
                </p>
                <div role="radiogroup" aria-label={`${cat.name} options`} style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {cat.options.map((opt) => {
                    const isSelected = selections[cat.name] === opt.id;
                    return (
                      <button
                        key={opt.id}
                        aria-pressed={isSelected}
                        onClick={() =>
                          setSelections((prev) => ({ ...prev, [cat.name]: opt.id }))
                        }
                        style={{
                          padding: "10px 18px",
                          borderRadius: "8px",
                          border: isSelected
                            ? "2px solid var(--color-accent)"
                            : "1px solid rgba(255,255,255,0.15)",
                          background: isSelected
                            ? "rgba(200,169,110,0.15)"
                            : "rgba(255,255,255,0.05)",
                          color: isSelected ? "var(--color-accent)" : "rgba(255,255,255,0.7)",
                          fontSize: "0.85rem",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          fontWeight: isSelected ? 600 : 400,
                        }}
                      >
                        <span
                          style={{
                            display: "inline-block",
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            background: opt.color,
                            marginRight: "8px",
                            verticalAlign: "middle",
                          }}
                        />
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Right: Preview */}
          <div>
            <div
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                background: previewGradient,
                aspectRatio: "4/3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                transition: "background 0.6s ease",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0.3)",
                  backdropFilter: "blur(1px)",
                }}
              />
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  textAlign: "center",
                  padding: "32px",
                }}
              >
                <p
                  style={{
                    color: "var(--color-accent)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    marginBottom: "16px",
                  }}
                >
                  Your Selection
                </p>
                {selectedDetails.map((detail) => (
                  <p
                    key={detail.category}
                    style={{
                      color: "white",
                      fontSize: "1rem",
                      marginBottom: "8px",
                      fontWeight: 300,
                    }}
                  >
                    {detail.icon} {detail.label}
                  </p>
                ))}
              </div>
            </div>

            {/* Summary card */}
            <div
              className="glass-card"
              style={{ padding: "24px", marginTop: "16px" }}
            >
              <p style={{ color: "white", fontWeight: 600, marginBottom: "12px" }}>
                Your Garden Includes:
              </p>
              {selectedDetails.map((detail) => (
                <p
                  key={detail.category}
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "0.85rem",
                    marginBottom: "6px",
                  }}
                >
                  {detail.icon} <strong style={{ color: "white" }}>{detail.label}</strong>{" "}
                  — {detail.description}
                </p>
              ))}
              <a
                href="#contact"
                className="cta-button"
                style={{ marginTop: "20px", width: "100%", justifyContent: "center" }}
              >
                Get a Quote for This Design
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
