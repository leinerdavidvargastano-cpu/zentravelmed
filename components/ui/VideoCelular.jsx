"use client";
// Video vertical dentro de un marco con forma de celular.
// Se reproduce solo, sin sonido y en bucle (los navegadores solo permiten
// reproducir solo un video si está silenciado). Un botón activa el sonido.

import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function VideoCelular({ src, poster, titulo }) {
  const videoRef = useRef(null);
  const [silenciado, setSilenciado] = useState(true);

  function cambiarSonido() {
    const video = videoRef.current;
    video.muted = !video.muted;
    setSilenciado(video.muted);
    if (!video.muted) video.play();
  }

  return (
    // Marco del celular: borde negro grueso y esquinas muy redondeadas
    <div className="relative mx-auto w-64 rounded-[2.5rem] border-[10px] border-negro bg-negro shadow-2xl shadow-black/50 md:w-72">
      {/* "Isla" negra de la cámara arriba */}
      <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-negro" />

      <video
        ref={videoRef}
        src={src}
        poster={poster}
        title={titulo}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="aspect-[9/16] w-full rounded-[1.8rem] object-cover"
      />

      {/* Botón de sonido */}
      <button
        type="button"
        onClick={cambiarSonido}
        aria-label={silenciado ? "Activar sonido" : "Silenciar"}
        className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-negro/70 text-rosa backdrop-blur hover:bg-negro"
      >
        {silenciado ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
    </div>
  );
}
