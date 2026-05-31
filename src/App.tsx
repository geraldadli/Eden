import { useState, useEffect, useRef } from "react";
import "./App.css";

const BIRTHDAY_DATE = new Date("2026-06-23T00:00:00");

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
      "Waiting for your text feels like Eternity, but it’s a beautiful kind of eternity that I want to get lost in. I hope this year brings you as much happiness and love as you have given me just by being you.",
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
  {
    id: 1,
    src: "/eating.jpg", // Add your image to public/photo1.jpg
    caption: "Loungefly 🪽",
  },
  {
    id: 2,
    src: "/thames.jpg", // Add your image to public/photo2.jpg
    caption: "Thames River 🌊",
  },
  {
    id: 3,
    src: "/scarf.jpg", // Add your image to public/photo3.jpg
    caption: "Nice Scarf 🧣",
  },
  {
    id: 4,
    src: "/scarf0.jpg", // Add your image to public/photo4.jpg
    caption: "❤️",
  },
  {
    id: 5,
    src: "/telephone.jpg", // Add your image to public/photo5.jpg
    caption: "Telephone Box ☎️",
  },
  {
    id: 6,
    src: "/goblet.jpg", // Add your image to public/photo6.jpg
    caption: "Gemino Curse 👺",
  },
  {
    id: 7,
    src: "/scarf2.jpg", // Add your image to public/photo7.jpg
    caption: "Somewhere beautiful 🌸",
  },
  {
    id: 8,
    src: "/eden.jpeg", // Add your image to public/photo8.jpg
    caption: "🤍💛",
  },
];

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const diff = BIRTHDAY_DATE.getTime() - now.getTime();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="countdown-wrapper">
      <p className="countdown-label">Counting down to your special day 🎀</p>
      <div className="countdown-grid">
        {Object.entries(timeLeft).map(([unit, val]) => (
          <div className="countdown-block" key={unit}>
            <div className="countdown-card">
              <span className="countdown-num">{String(val).padStart(2, "0")}</span>
            </div>
            <span className="countdown-unit">{unit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Pin({ color }: { color: string }) {
  return (
    <div className="pin-wrap">
      <div className="pin-head" style={{ background: `radial-gradient(circle at 35% 35%, #fff6, transparent 60%), ${color}` }} />
      <div className="pin-shaft" />
    </div>
  );
}

function Note({ note, delay }: { note: typeof notes[0], delay: string }) {
  return (
    <div
      className="note"
      style={{
        "--rot": note.rotation,
        "--bg": note.bg,
        "--line": note.lineColor,
        animationDelay: delay,
      }}
    >
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

function Polaroid({ image, index, onAdd }) {
  return (
    <div
      className="polaroid"
      style={{ "--pr": `${ROT[index % ROT.length]}deg`, animationDelay: `${index * 0.08}s` }}
    >
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
          <button className="pol-change" onClick={onAdd} title="Change photo">✎</button>
        )}
      </div>
      <div className="pol-caption">{image.caption}</div>
    </div>
  );
}

export default function App() {
  const [images, setImages] = useState(initialImages);
  const audioRef = useRef(null);
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
        audioRef.current.play().catch(() => console.log('Playback failed'));
        setIsPlaying(true);
      }
    }
  };

  const handleAdd = (index) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      setImages((prev) => prev.map((img, i) => (i === index ? { ...img, src: url } : img)));
    };
    input.click();
  };

  return (
    <div className="app">
      {/* Background Music */}
      <audio ref={audioRef} loop style={{ display: 'none' }} />

      {/* Floating petals */}
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

      {/* ─── HERO ─── */}
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
        <div className="music-control" style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 10 }}>
          <button onClick={toggleMusic} style={{ fontSize: '24px', background: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '50%', width: '50px', height: '50px', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
            {isPlaying ? '🔊' : '🔇'}
          </button>
        </div>
        <div className="hero-scroll-hint">↓</div>
      </section>

      {/* ─── BULLETIN BOARD ─── */}
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

      {/* ─── GALLERY ─── */}
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

      {/* ─── FOOTER ─── */}
      <footer className="footer">
        <div className="footer-inner">
          <p className="footer-msg">
            Made with every bit of love I have.
          </p>
          <p className="footer-hearts">♥ ♥ ♥</p>
        </div>
      </footer>
    </div>
  );
}
