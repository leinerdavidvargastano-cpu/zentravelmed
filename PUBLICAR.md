# Cómo publicar la página en Hostinger (plan Single)

La página es **estática**: `npm run build` crea la carpeta `out/` con archivos
fijos (HTML, CSS, JS, imágenes). Esos archivos se suben a `public_html`.

## Antes de la primera vez

- Hacer **copia de seguridad** del sitio viejo (hPanel → Archivos → Copias de seguridad,
  o descargar `public_html` desde el Administrador de archivos).
- Tener `.env.local` con `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
  (ver `.env.example`). **Se copian dentro de la página al compilar.**

## Cada vez que quieras publicar cambios

1. Si cambiaste fotos de destinos: `npm run miniaturas`
2. Compilar: `npm run build`
   (al terminar corre solo `scripts/arreglar-export.mjs`)
3. Crear el zip (PowerShell, en la carpeta del proyecto):
   ```
   tar.exe -a -c -f zentravelmed-hostinger.zip -C out .
   ```
4. hPanel → **Administrador de archivos** → `public_html`:
   - Borrar el contenido viejo (solo la primera vez, después de la copia de seguridad).
   - **Subir** `zentravelmed-hostinger.zip` → clic derecho → **Extraer** aquí, en `public_html`.
   - Comprobar que `index.html` y `.htaccess` quedaron directamente en `public_html`
     (no dentro de otra carpeta).
   - Borrar el `.zip` de `public_html`.
5. Abrir https://zentravelmed.com y probar (si ves la versión vieja: Ctrl + F5).

## Volver a la versión con servidor (Node.js)

Si algún día se usa un plan con Node.js (Business, Cloud) o Netlify:
`git checkout version-con-servidor` tiene la versión anterior.
