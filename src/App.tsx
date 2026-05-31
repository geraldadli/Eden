import { useState, useRef } from "react";
import "./App.css";

const notes = [
  {
    id: 1,
    position: "top-left",
    pinColor: "#E05C5C",
    rotation: "-3deg",
    bg: "#FFFDE7",
    lineColor: "#f5e642",
    title: "בראשית",
    message:
      "From the very beginning…, you have been the most wonderful surprise in my life. We shared our music and our dreams, our voices and our faces. You made the ordinary feel magical, and every day with you is a new adventure I never want to end.",
  },
  {
    id: 2,
    position: "top-right",
    pinColor: "#5C9CE0",
    rotation: "2.5deg",
    bg: "#FFF0F5",
    lineColor: "#f7c5d8",
    title: "שמח 😊",
    message:
      "Talking to you has been fun and exciting for this past couple months, I enjoy your presence😊",
  },
  {
    id: 3,
    position: "bottom-left",
    pinColor: "#60B060",
    rotation: "2deg",
    bg: "#F0FFF4",
    lineColor: "#aee8c0",
    title: "אהבה ❤️",
    message:
      "Waiting for your text feels like Eternity, but it's a beautiful kind of eternity that I want to get lost in. I hope this year brings you as much happiness and love as you have given me just by being you.",
  },
  {
    id: 4,
    position: "bottom-right",
    pinColor: "#D4A030",
    rotation: "-2deg",
    bg: "#FFF8F0",
    lineColor: "#f5d799",
    title: "Happy Birthday, Eden 🎂",
    message:
      "Today the world gets to celebrate the most wonderful person in it. I hope this year brings you everything your heart has quietly wished for.",
  },
];

const initialImages = [
  { id: 1, src: "/eating.jpg", caption: "Loungefly 🪽" },
  { id: 2, src: "/thames.jpg", caption: "Thames River 🌊" },
  { id: 3, src: "/scarf.jpg", caption: "Nice Scarf 🧣" },
  { id: 4, src: "/scarf0.jpg", caption: "❤️" },
  { id: 5, src: "/telephone.jpg", caption: "Telephone Box ☎️" },
  { id: 6, src: "/goblet.jpg", caption: "Gemino Curse 👺" },
  { id: 7, src: "/scarf2.jpg", caption: "Somewhere beautiful 🌸" },
  { id: 8, src: "/eden.jpeg", caption: "🤍💛" },
];

// Extend CSSProperties to allow CSS custom properties
interface CSSPropertiesWithVars extends React.CSSProperties {
  [key: `--${string}`]: string | number;
}

interface ImageItem {
  id: number;
  src: string;
  caption: string;
}

function Pin({ color }: { color: string }) {
  return (
    <div className="pin-wrap">
      <div
        className="pin-head"
        style={{
          background: `radial-gradient(circle at 35% 35%, #fff6, transparent 60%), ${color}`,
        }}
      />
      <div className="pin-shaft" />
    </div>
  );
}

function Note({ note, delay }: { note: typeof notes[0]; delay: string }) {
  const style: CSSPropertiesWithVars = {
    "--rot": note.rotation,
    "--bg": note.bg,
    "--line": note.lineColor,
    animationDelay: delay,
  };

  return (
    <div className="note" style={style}>
      <Pin color={note.pinColor} />
      <div className="note-inner">
        <div className="note-lines" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <div className="note-line" key={i} />
          ))}
        </div>
        <h3 className="note-title">{note.title}</h3>
        <p className="note-message">{note.message}</p>
      </div>
    </div>
  );
}

const ROT = [-3, 2, -1.5, 2.5, -2, 3, -2.5, 1.5];

function Polaroid({
  image,
  index,
  onAdd,
}: {
  image: ImageItem;
  index: number;
  onAdd: () => void;
}) {
  const style: CSSPropertiesWithVars = {
    "--pr": `${ROT[index % ROT.length]}deg`,
    animationDelay: `${index * 0.08}s`,
  };

  return (
    <div className="polaroid" style={style}>
      <div className="pol-photo" onClick={!image.src ? onAdd : undefined}>
        {image.src ? (
          <img src={image.src} alt={image.caption} />
        ) : (
          <div className="pol-empty" onClick={onAdd}>
            <div className="pol-plus">+</div>
            <span>Add Photo</span>
          </div>
        )}
        {image.src && (
          <button className="pol-change" onClick={onAdd} title="Change photo">
            ✎
          </button>
        )}
      </div>
      <div className="pol-caption">{image.caption}</div>
    </div>
  );
}

export default function App() {
  const [images, setImages] = useState<ImageItem[]>(initialImages);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        if (!audioRef.current.src) {
          audioRef.current.src = "/background-music.mp3";
        }
        audioRef.current.play().catch(() => console.log("Playback failed"));
        setIsPlaying(true);
      }
    }
  };

  const handleAdd = (index: number) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      setImages((prev) =>
        prev.map((img, i) => (i === index ? { ...img, src: url } : img))
      );
    };
    input.click();
  };

  return (
    <div className="app">
      <audio ref={audioRef} loop style={{ display: "none" }} />

      <div className="petals" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="petal"
            style={{
              left: `${(i * 5.6 + Math.random() * 8) % 100}%`,
              animationDelay: `${(i * 0.4) % 8}s`,
              animationDuration: `${7 + (i % 5)}s`,
              fontSize: `${0.6 + (i % 3) * 0.5}rem`,
            }}
          >
            {["🌸", "🌺", "✿", "❀", "♥"][i % 5]}
          </span>
        ))}
      </div>

      <section className="hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-text">
          <p className="hero-eyebrow">A little something made just for you</p>
          <h1 className="hero-title">
            Happy Birthday,
            <br />
            <em className="hero-name">Eden</em>
          </h1>
        </div>
        <div
          className="music-control"
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            zIndex: 10,
          }}
        >
          <button
            onClick={toggleMusic}
            style={{
              fontSize: "24px",
              background: "rgba(255,255,255,0.8)",
              border: "none",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              cursor: "pointer",
              boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            }}
          >
            {isPlaying ? "🔊" : "🔇"}
          </button>
        </div>
        <div className="hero-scroll-hint">↓</div>
      </section>

      <section className="board-section">
        <div className="section-header">
          <span className="section-tag">pinned just for you</span>
          <h2 className="section-title">Notes from my heart</h2>
        </div>
        <div className="cork-board">
          <div className="cork-texture" aria-hidden="true" />
          <div className="cork-frame" aria-hidden="true" />
          <div className="notes-grid">
            {notes.map((note, i) => (
              <Note key={note.id} note={note} delay={`${i * 0.15}s`} />
            ))}
          </div>
        </div>
      </section>

      <section className="gallery-section">
        <div className="section-header">
          <span className="section-tag">places & moments</span>
          <h2 className="section-title">Gallery</h2>
          <p className="section-sub">✈️ 📍 💛</p>
        </div>
        <div className="gallery-grid">
          {images.map((img, i) => (
            <Polaroid key={img.id} image={img} index={i} onAdd={() => handleAdd(i)} />
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <p className="footer-msg">Made with every bit of love I have.</p>
          <p className="footer-hearts">♥ ♥ ♥</p>
        </div>
      </footer>
    </div>
  );
}