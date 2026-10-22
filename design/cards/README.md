# Cartas adicionales

Fuentes de las cartas `010.webp` a `016.webp`, ilustradas para completar los 16 pares del nivel difícil.

| Archivo | Animal |
|---|---|
| `010` | Buey almizclero |
| `011` | Lobo gris |
| `012` | Búho nival |
| `013` | Morsa |
| `014` | Frailecillo |
| `015` | Salmón rojo |
| `016` | Glotón |

Todos viven en el Refugio Nacional de Vida Silvestre del Ártico, igual que los animales de las cartas originales, para que el marco "Arctic National Wildlife Refuge" siga siendo coherente.

- `masters/` guarda las ilustraciones originales en alta resolución (1792 × 2400, JPEG recomprimido con mozjpeg al 90%). La carpeta está en `.gitignore` para no inflar el repositorio, así que solo existe en la máquina de quien hizo las ilustraciones.
- `build.mjs` las convierte en las cartas del juego: WebP de 250 × 324 al 90% de calidad, con las mismas esquinas redondeadas transparentes que las cartas originales.
- `preview.jpg` muestra las 16 cartas juntas para comparar el estilo.

Para regenerar las cartas después de reemplazar un master:

```bash
cd design/cards
npm install
npm run build           # todas
npm run build -- 013    # solo la morsa
```

`sharp` se instala solo en esta carpeta y no forma parte de las dependencias del juego.
