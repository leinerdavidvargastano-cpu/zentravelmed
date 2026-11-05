import { destinationImages as img } from "./destination-images";

const at = (slug, i = 0) => img[slug]?.galeria?.[i] || img[slug]?.imagen;

/** Galería de experiencias de la página principal. */
export const experienceGallery = [
  { src: at("valle-del-cocora", 0), alt: "Palmas de cera en el Valle del Cocora", label: "Montañas" },
  { src: at("parque-tayrona", 0), alt: "Playa Arrecifes, Parque Tayrona", label: "Playas" },
  { src: at("guatape", 0), alt: "Fachadas de colores en Guatapé", label: "Experiencias" },
  { src: at("cano-cristales", 0), alt: "Caño Cristales, Meta", label: "Naturaleza" },
  { src: at("medellin", 0), alt: "Vista aérea del centro de Medellín", label: "Ciudades" },
  { src: at("peru", 0), alt: "Machu Picchu, Perú", label: "Internacional" },
  { src: at("san-andres", 1), alt: "Atardecer en San Andrés", label: "Playas" },
  { src: at("turquia", 0), alt: "Globos sobre Capadocia, Turquía", label: "Experiencias" },
  { src: at("suiza", 0), alt: "Matterhorn, Suiza", label: "Montañas" },
  { src: at("italia", 1), alt: "Gran Canal de Venecia, Italia", label: "Internacional" },
].filter((x) => x.src);
