# LaRegularizacion.es

Portal informativo sobre la Regularización Extraordinaria de Extranjeros en España 2026 (Real Decreto 316/2026).

🌐 **Idiomas:** Español + العربية (toggle en la barra superior)  
🤖 **Agente IA:** DeepSeek API — experto en inmigración  
⏱️ **Cuenta atrás:** Plazo hasta el 30 de junio de 2026  
📰 **Diseño:** Estilo revista/periódico

---

## 🚀 Despliegue en GitHub + Cloudflare Pages

### 1. Subir a GitHub

```bash
git init
git add .
git commit -m "Initial commit — LaRegularizacion.es"
git remote add origin https://github.com/TU-USUARIO/laregularizacion
git push -u origin main
```

### 2. Conectar Cloudflare Pages

1. Ve a [dash.cloudflare.com](https://dash.cloudflare.com) → Pages
2. "Create a project" → "Connect to Git"
3. Selecciona tu repositorio `laregularizacion`
4. Configuración de build:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Haz clic en "Save and Deploy"

### 3. Configurar GitHub Actions (opcional, para CI/CD automático)

En tu repositorio GitHub → Settings → Secrets → Actions:
- `CLOUDFLARE_API_TOKEN` — Tu token de API de Cloudflare
- `CLOUDFLARE_ACCOUNT_ID` — Tu Account ID de Cloudflare

### 4. Dominio personalizado (laregularizacion.es)

En Cloudflare Pages → tu proyecto → Custom domains:
- Añade `laregularizacion.es`
- Cloudflare configurará automáticamente los DNS si el dominio está en Cloudflare

---

## 🤖 Configuración del Agente DeepSeek

1. Obtén tu API key en [platform.deepseek.com](https://platform.deepseek.com)
2. Ve a `/agente` en el sitio
3. Introduce tu API key en el campo de configuración
4. La clave se guarda en localStorage del navegador — no se transmite a nuestros servidores

El agente puede:
- ✅ Responder preguntas sobre el proceso de regularización
- ✅ Generar artículos bilingües (ES/AR) sobre inmigración
- ✅ Crear resúmenes de noticias actualizados
- ✅ Explicar requisitos específicos según cada caso

---

## 📁 Estructura del proyecto

```
src/
├── layouts/
│   └── Base.astro          # Layout principal con nav, header, footer
├── pages/
│   ├── index.astro          # Página principal + cuenta atrás
│   ├── noticias.astro       # Sección de noticias
│   ├── guia.astro           # Guía paso a paso
│   ├── requisitos.astro     # Requisitos DT5 y DT6
│   ├── formularios.astro    # Formularios EX-31, EX-32 y tasa
│   ├── agente.astro         # Agente IA con DeepSeek
│   └── 404.astro
└── styles/
    └── global.css           # Estilos globales — diseño magazine
```

---

## 🛠️ Desarrollo local

```bash
npm install
npm run dev
# → http://localhost:4321
```

---

## ⚠️ Aviso legal

Este sitio es independiente y **no está afiliado al Gobierno de España**. Toda la información se basa en fuentes oficiales (BOE, Ministerio de Inclusión). Siempre consulta un abogado o las fuentes oficiales para tu caso concreto.

**Fuentes oficiales:**
- [inclusion.gob.es/regularizacion](https://www.inclusion.gob.es/regularizacion)
- [BOE — RD 316/2026](https://www.boe.es/boe/dias/2026/03/05/)
- [extranjeros.inclusion.gob.es](https://extranjeros.inclusion.gob.es)
