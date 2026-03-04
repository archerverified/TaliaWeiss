import { useState, useEffect, useRef } from "react";

import imgHero      from "figma:asset/c6047248ed86301cb882632ec2b1438f8a87a65a.png";
import imgBadge     from "figma:asset/2e91626b8e4144ecc33d809f5ef91a031ef9e39b.png";
import imgInstagram from "figma:asset/ec612023ec5c57e70f0f50f998ea358abff039b8.png";
import imgTikTok    from "figma:asset/f91bcc2f8beefef9161a732a6b2a62be7880e7f7.png";
import imgTelegram  from "figma:asset/809531cd53b3df1ce0c4380a2819b744fa49d0eb.png";
import imgPinterest from "figma:asset/a19270919e96a6f30e42f55c1266d1581ed415a8.png";
import imgEmoji     from "figma:asset/70f53994f62e744659c80b00bb0e1713f9e3ef60.png";
import imgLetter    from "figma:asset/7650b7d6b0114a43a2f4ad630b8335f6100b544d.png";
import imgX         from "figma:asset/3a320cf2c9c8430f0117673c40a1e741f74250d0.png";
import imgC1        from "figma:asset/c6047248ed86301cb882632ec2b1438f8a87a65a.png";
import imgC2        from "figma:asset/a08fa6d3078134e7b39e0e14bab7febeb8a9a510.png";
import imgC3        from "figma:asset/e56c6ffb437848648f6b77a4f3672075fb23498c.png";
import imgC4        from "figma:asset/e7799f183817ebdda232d236a33b94f44de26956.png";
import imgC5        from "figma:asset/41f5121d04da4e0c8e3fc435f61a7d4cc985fd87.png";
import svgPaths     from "../../imports/svg-x1cz3ks1id";

/* ─── data ────────────────────────────────────────── */
const SLIDES = [
  { src: imgC1, alt: "Talia at the barn" },
  { src: imgC2, alt: "Talia with horse outdoors" },
  { src: imgC3, alt: "Talia indoor portrait" },
  { src: imgC4, alt: "Talia in the cornfield" },
  { src: imgC5, alt: "Talia by the logs" },
];

const SOCIALS = [
  { src: imgInstagram, alt: "Instagram", href: "https://www.instagram.com/realtaliaweiss1/", border: false },
  { src: imgTikTok,    alt: "TikTok",    href: "http://tiktok.com/@realtaliaweiss_",         border: false },
  { src: imgX,         alt: "X",         href: "https://x.com/realtaliaweiss",               border: true  },
];

/* ─── shared token ─────────────────────────────────── */
const R = "18px"; // card border-radius
const ACCENT = "#dc2626";

/* ─── Social icon ──────────────────────────────────── */
function SocialIcon({
  src, alt, href, size = 46, border = false,
}: { src: string; alt: string; href: string; size?: number; border?: boolean }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label={alt}
      style={{ display: "block", width: size, height: size, borderRadius: "50%", overflow: "hidden",
               flexShrink: 0, border: border ? "2px solid white" : "none",
               boxShadow: "0 2px 10px rgba(0,0,0,0.28)", textDecoration: "none" }}>
      <img src={src} alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
    </a>
  );
}

/* ─── Carousel (crossfade — silky smooth opacity transition) ── */
function Carousel() {
  const [idx, setIdx]       = useState(0);
  const [locked, setLocked] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = (next: number) => {
    if (locked) return;
    setLocked(true);
    setIdx(next);
    setTimeout(() => setLocked(false), 900);
  };

  const prev = () => { go((idx - 1 + SLIDES.length) % SLIDES.length); resetTimer(); };
  const next = () => { go((idx + 1) % SLIDES.length); resetTimer(); };

  const resetTimer = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => setIdx(i => (i + 1) % SLIDES.length), 4000);
  };

  useEffect(() => {
    resetTimer();
    return () => { if (timer.current) clearInterval(timer.current); };
  }, []);

  const handleGo = (target: number) => { go(target); resetTimer(); };

  return (
    <div style={{ width: "100%", borderRadius: R, overflow: "hidden",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.13)", position: "relative", background: "#111" }}>

      {/* ── crossfade stack ── */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "4/5" }}>
        {SLIDES.map((s, i) => (
          <div key={i} style={{
            position: i === 0 ? "relative" : "absolute",
            inset: 0,
            opacity: i === idx ? 1 : 0,
            transition: "opacity 0.85s cubic-bezier(0.4,0,0.2,1)",
            zIndex: i === idx ? 1 : 0,
            width: "100%",
            height: "100%",
          }}>
            <img src={s.src} alt={s.alt}
              style={{ width: "100%", height: "100%", objectFit: "cover",
                       objectPosition: "center center", display: "block" }} />
          </div>
        ))}

        {/* vignette */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2,
          background: "linear-gradient(to bottom, transparent 70%, rgba(0,0,0,0.32) 100%)" }} />

        {/* arrows */}
        {["left","right"].map(side => (
          <button key={side} onClick={side === "left" ? prev : next}
            aria-label={side === "left" ? "Previous" : "Next"}
            style={{
              position: "absolute", top: "50%", [side]: "14px", zIndex: 10,
              transform: "translateY(-50%)",
              width: "36px", height: "36px", borderRadius: "50%",
              background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "white", fontSize: "22px", lineHeight: 1,
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.28)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
          >
            {side === "left" ? "‹" : "›"}
          </button>
        ))}

        {/* dots */}
        <div style={{ position: "absolute", bottom: "14px", left: 0, right: 0,
                      display: "flex", justifyContent: "center", gap: "7px", zIndex: 10 }}>
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => handleGo(i)} aria-label={`Slide ${i + 1}`}
              style={{
                width: i === idx ? "24px" : "7px", height: "7px",
                borderRadius: "100px", border: "none", padding: 0, cursor: "pointer",
                background: i === idx ? "white" : "rgba(255,255,255,0.45)",
                transition: "width 0.35s ease, background 0.35s ease",
              }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Page ─────────────────────────────────────────── */
export default function ProfilePage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#f5f5f5",
      fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      overflowX: "hidden",
    }}>
      {/* blurred hero BG — upper band */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "600px", zIndex: 0, overflow: "hidden" }}>
        <img src={imgHero} alt="" style={{
          width: "100%", height: "100%", objectFit: "cover",
          filter: "blur(80px)", transform: "scale(1.18)", opacity: 0.65,
        }} />
        <div style={{ position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, transparent 40%, #f5f5f5 100%)" }} />
      </div>

      {/* ── narrow column ── */}
      <div style={{
        position: "relative", zIndex: 1,
        maxWidth: "480px", margin: "0 auto",
        padding: "36px 16px 56px",
        display: "flex", flexDirection: "column", gap: "16px",
      }}>

        {/* ════ HERO CARD ════ */}
        <div style={{ borderRadius: R, overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.18)" }}>

          {/* photo */}
          <div style={{ position: "relative", height: "420px" }}>
            <img src={imgHero} alt="Talia Weiss" style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center top",
            }} />
            <div style={{ position: "absolute", inset: 0,
              background: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.55) 65%, #000 100%)" }} />

            {/* overlay text */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0,
                          textAlign: "center", padding: "0 20px 24px" }}>

              {/* name */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center",
                            gap: "8px", marginBottom: "4px" }}>
                <h1 style={{ color: "white", fontSize: "30px", fontWeight: 700, letterSpacing: "-0.5px", margin: 0 }}>
                  Talia Weiss
                </h1>
                <img src={imgBadge} alt="Verified"
                  style={{ width: "22px", height: "22px", borderRadius: "50%" }} />
              </div>

              {/* handle */}
              <p style={{ color: "#9a9ba0", fontSize: "14px", marginBottom: "16px" }}>
                @realtaliaweiss
              </p>

              {/* socials + annotation */}
              <div style={{ position: "relative", display: "flex",
                            justifyContent: "center", alignItems: "center", marginBottom: "14px" }}>

                {/* "follow back" note — nudged right & up to aim arrow at IG */}
                <div style={{ position: "absolute", left: "52px", top: "-14px", display: "flex",
                              flexDirection: "column", alignItems: "flex-start" }}>
                  <span style={{ color: "white", fontSize: "10px", lineHeight: 1.3, whiteSpace: "nowrap" }}>
                    I'll follow you back!
                  </span>
                  <svg width="30" height="30" viewBox="0 0 168.547 176.321" fill="none"
                    style={{ transform: "rotate(46deg)", marginLeft: "10px", marginTop: "-3px" }}>
                    <path d={svgPaths.p14039280} stroke="white" strokeLinecap="round"
                          strokeWidth="6" fill="none" />
                  </svg>
                </div>

                {/* icons */}
                <div style={{ display: "flex", gap: "12px" }}>
                  {SOCIALS.map(s => (
                    <SocialIcon key={s.alt} {...s} size={46} />
                  ))}
                </div>
              </div>

              {/* followers */}
              <p style={{ color: "white", fontSize: "20px", fontWeight: 700, marginBottom: 0 }}>
                127.5k{" "}
                <span style={{ color: "#8b8b92", fontWeight: 400 }}>Total Followers</span>
              </p>
            </div>
          </div>

          {/* dark panel */}
          <div style={{ background: "#000", padding: "18px 20px 18px" }}>

            {/* email pill */}
            <div style={{
              display: "flex", alignItems: "center",
              background: "white", borderRadius: "100px",
              padding: "5px 5px 5px 18px", marginBottom: "14px",
            }}>
              <input type="email" placeholder="Type your email..."
                style={{
                  flex: 1, background: "transparent", border: "none", outline: "none",
                  fontSize: "13px", color: "#4e4f53", minWidth: 0,
                }} />
              <button style={{
                background: "#8b8b92", color: "white", border: "none",
                borderRadius: "100px", padding: "9px 16px",
                fontSize: "12px", fontWeight: 700,
                cursor: "pointer", display: "flex", alignItems: "center", gap: "7px",
                flexShrink: 0, whiteSpace: "nowrap",
              }}>
                Connect with me!
                <img src={imgEmoji} alt="" style={{ width: "22px", height: "22px",
                                                    borderRadius: "50%", objectFit: "cover" }} />
              </button>
            </div>

            {/* policy */}
            <div style={{ display: "flex", justifyContent: "center", gap: "10px",
                          color: "#666", fontSize: "11px" }}>
              {["Privacy Policy","Terms","Report"].map((t, i, arr) => (
                <span key={t} style={{ display: "flex", gap: "10px" }}>
                  <a href="#" style={{ color: "inherit", textDecoration: "none" }}>{t}</a>
                  {i < arr.length - 1 && <span style={{ color: "#444" }}>|</span>}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ════ CAROUSEL ════ */}
        <Carousel />

        {/* ════ BIO CARD ════ */}
        <div style={{
          background: "#000", borderRadius: R,
          padding: "32px 28px 28px",
        }}>
          <p style={{
            color: "white", fontSize: "17px", lineHeight: 1.75,
            textAlign: "center", marginBottom: "24px",
          }}>
            <strong>Talia Weiss</strong> is an online creator with a deep fascination with horses.
            She's been riding and training them since childhood. Now, Talia focuses on creating
            high-engaging content around her life. She was born on May 2&nbsp;2001 and is a rising
            Internet personality.
          </p>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button style={{
              background: ACCENT, color: "white", border: "none",
              borderRadius: "100px", padding: "13px 32px",
              fontSize: "15px", fontWeight: 600,
              cursor: "pointer", display: "flex", alignItems: "center", gap: "10px",
            }}>
              Send me a message!
              <img src={imgLetter} alt="" style={{ width: "26px", height: "26px", objectFit: "contain" }} />
            </button>
          </div>
        </div>

        {/* ════ FOOTER ════ */}
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.15)", paddingTop: "18px" }}>
          <div style={{ display: "flex", justifyContent: "space-between",
                        alignItems: "flex-start", gap: "12px" }}>

            {/* left */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "3px" }}>
                <span style={{ fontWeight: 700, fontSize: "15px" }}>Talia Weiss</span>
                <img src={imgBadge} alt="" style={{ width: "14px", height: "14px", borderRadius: "50%" }} />
              </div>
              <p style={{ fontSize: "10px", color: "#888" }}>
                2026 — TALIAWEISS.COM — ALL RIGHTS RESERVED
              </p>
            </div>

            {/* right */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
              <p style={{ fontSize: "13px", marginBottom: "8px" }}>All my links!</p>
              <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                <SocialIcon src={imgInstagram} alt="Instagram" href="https://www.instagram.com/realtaliaweiss1/" size={26} />
                <SocialIcon src={imgTikTok}    alt="TikTok"    href="http://tiktok.com/@realtaliaweiss_"         size={26} />
                <SocialIcon src={imgX}         alt="X"         href="https://x.com/realtaliaweiss"               size={26} border />
                <svg width="14" height="28" viewBox="0 0 49.615 94.7592" fill="none"
                  style={{ transform: "rotate(154deg)" }}>
                  <path d={svgPaths.p13878600} stroke={ACCENT} strokeLinecap="round"
                        strokeWidth="4" fill="none" />
                </svg>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}