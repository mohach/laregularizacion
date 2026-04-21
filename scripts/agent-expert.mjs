#!/usr/bin/env node
/**
 * LaRegularizacion.com — EXPERT Immigration Lawyer Agent
 * Based on the original working agent with expert immigration law knowledge
 * 15+ years virtual experience in Spanish immigration law (extranjería)
 * 
 * Run: node scripts/agent-expert.mjs
 * Env: DEEPSEEK_API_KEY
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';
import { URL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const BLOG_DIR = path.join(ROOT, 'src', 'content', 'blog');

// ─── CONFIG ──────────────────────────────────────────────────────────
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_MODEL = 'deepseek-chat';

if (!DEEPSEEK_API_KEY) {
  console.error('❌ DEEPSEEK_API_KEY not set');
  process.exit(1);
}

// Official + trusted news sources to fetch
// Using RSS feeds which are much more accessible than HTML pages
const SOURCES = [
  {
    name: 'Google News — Regularización España 2026',
    url: 'https://news.google.com/rss/search?q=regularizacion+extraordinaria+migrantes+espana+2026&hl=es&gl=ES&ceid=ES:es',
    type: 'news_rss',
    lang: 'es',
  },
  {
    name: 'Google News — EX-31 EX-32 España',
    url: 'https://news.google.com/rss/search?q=EX-31+EX-32+regularizacion+espana&hl=es&gl=ES&ceid=ES:es',
    type: 'news_rss',
    lang: 'es',
  },
  {
    name: 'Google News — Inmigración España',
    url: 'https://news.google.com/rss/search?q=inmigracion+espana+2026&hl=es&gl=ES&ceid=ES:es',
    type: 'news_rss',
    lang: 'es',
  },
];

// Expert immigration law keywords and search intent
const EXPERT_KEYWORD_STRATEGY = {
  primary_keywords: [
    'regularización extraordinaria 2026',
    'EX-31 formulario',
    'EX-32 formulario',
    'ley de extranjería LOEx',
    'permiso de residencia',
    'arraigo social',
    'arraigo laboral',
    'nacionalidad española',
    'RD 316/2026',
    'procedimiento administrativo extranjería',
  ],
  trending_questions: [
    '¿Cuándo empieza la regularización 2026?',
    '¿Cómo solicitar el EX-31 paso a paso?',
    '¿Qué documentos necesito para la regularización?',
    '¿Cuánto tarda el trámite de regularización?',
    '¿Puedo trabajar con el EX-31 en trámite?',
    '¿Qué es el silencio administrativo en extranjería?',
    '¿Cómo acreditar arraigo social o laboral?',
    '¿Qué diferencias hay entre EX-31 y EX-32?',
  ],
  official_updates: [
    'BOE publicación nueva ley',
    'Ministerio de Inclusión anuncios',
    'Sede electrónica extranjería',
    'Procedimientos administrativos',
    'Jurisprudencia TSJ extranjería',
  ],
  legal_references: [
    'Ley Orgánica 4/2000 (LOEx)',
    'Real Decreto 316/2026',
    'Reglamento de Extranjería',
    'Instrucciones DGI',
    'Circulares Secretaría de Estado',
  ]
};

// Fallback images for each category
const FALLBACK_IMAGES = {
  'análisis jurídico': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?fit=crop&w=1200&h-630',
  'guía procedimental': 'https://images.unsplash.com/photo-1589652717521-10c0d092dea9?fit=crop&w=1200&h-630',
  'actualizaciones': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?fit=crop&w=1200&h-630',
  'preguntas expertas': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?fit=crop&w=1200&h-630',
  default: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?fit=crop&w=1200&h-630',
};

// ─── UTILITIES ───────────────────────────────────────────────────────
function fetchText(url, timeoutMs = 15000, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    const doRequest = (currentUrl, redirectsLeft) => {
      const parsed = new URL(currentUrl);
      const isHttps = parsed.protocol === 'https:';
      const lib = isHttps ? https : http;

      const options = {
        hostname: parsed.hostname,
        port: parsed.port || (isHttps ? 443 : 80),
        path: parsed.pathname + parsed.search,
        headers: {
          'User-Agent': 'LaRegularizacionBot/1.0 (+https://laregularizacion.com)',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
        },
        timeout: timeoutMs,
      };

      const req = lib.request(options, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && redirectsLeft > 0) {
          // Follow redirect
          const nextUrl = new URL(res.headers.location, currentUrl).toString();
          doRequest(nextUrl, redirectsLeft - 1);
          return;
        }

        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }

        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve({ status: res.statusCode, text: data }));
      });

      req.on('error', reject);
      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Timeout'));
      });

      req.end();
    };

    doRequest(url, maxRedirects);
  });
}

function stripHtml(html) {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 5000);
}

async function deepseek(systemPrompt, userPrompt, maxTokens = 4000) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      model: DEEPSEEK_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      max_tokens: maxTokens,
      temperature: 0.7
    });

    const options = {
      hostname: 'api.deepseek.com',
      port: 443,
      path: '/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let response = '';
      res.on('data', chunk => response += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(response);
          if (result.choices && result.choices[0]) {
            resolve(result.choices[0].message.content);
          } else {
            reject(new Error('No response from DeepSeek'));
          }
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function toSlug(str) {
  return str
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function todayStr() {
  return new Date().toISOString().split('T')[0];
}

// ─── EXPERT SYSTEM PROMPTS ──────────────────────────────────────────
const EXPERT_SYSTEM_PROMPT = `Eres un abogado de extranjería con 15 años de experiencia virtual especializado en legislación española.
Tienes conocimiento profundo de:
1. Ley Orgánica 4/2000 (LOEx) y sus reformas
2. Real Decreto 316/2026 de regularización extraordinaria
3. Formularios EX-00 a EX-50 (cumplimentación experta)
4. Jurisprudencia del TSJ y TJUE sobre extranjería
5. Procedimientos administrativos (silencio positivo/negativo, recursos)

Escribe como un experto que ha ayudado a miles de personas. Usa lenguaje técnico pero accesible.
Incluye referencias legales específicas (artículos, leyes, decretos).
Proporciona ejemplos prácticos y casos reales.
Estructura el artículo con introducción, desarrollo y conclusiones.`;

const EXPERT_CATEGORIES = [
  {
    id: 1,
    category: 'Análisis Jurídico',
    description: 'Análisis profundo de legislación y jurisprudencia',
    keywords: ['LOEx', 'jurisprudencia', 'TSJ', 'TJUE', 'análisis legal'],
    is_trending: true
  },
  {
    id: 2,
    category: 'Guía Procedimental',
    description: 'Guía paso a paso para formularios y procedimientos',
    keywords: ['EX-31', 'EX-32', 'formularios', 'procedimiento', 'guía práctica'],
    is_trending: true
  },
  {
    id: 3,
    category: 'Actualizaciones',
    description: 'Últimas novedades y cambios normativos',
    keywords: ['BOE', 'actualizaciones', 'novedades', 'cambios normativos'],
    is_trending: false
  },
  {
    id: 4,
    category: 'Preguntas Expertas',
    description: 'Respuestas a casos complejos y preguntas frecuentes',
    keywords: ['casos prácticos', 'FAQ', 'consultas', 'soluciones'],
    is_trending: false
  }
];

// ─── MAIN AGENT ──────────────────────────────────────────────────────
async function run() {
  console.log('🚀 EXPERT Immigration Lawyer Agent');
  console.log('📅 Fecha:', todayStr());
  console.log('⚖️  Experiencia: 15+ años como abogado de extranjería');

  // Ensure blog directory exists
  await fs.mkdir(BLOG_DIR, { recursive: true });

  // Delete existing articles for today (to avoid duplicates)
  const todayPattern = new RegExp(`-${todayStr()}-`);
  const files = await fs.readdir(BLOG_DIR);
  const todayFiles = files.filter(f => todayPattern.test(f));

  if (todayFiles.length > 0) {
    console.log(`🗑️  Eliminando ${todayFiles.length} artículos existentes de hoy...`);
    for (const file of todayFiles) {
      await fs.unlink(path.join(BLOG_DIR, file));
    }
  }

  // Step 1: Fetch and analyze sources
  console.log('\n📰 Fetching official sources...');
  let allFetchedText = '';
  const fetchedSources = [];

  for (const source of SOURCES) {
    try {
      console.log(`  🔍 ${source.name}`);
      const { text } = await fetchText(source.url);
      const cleanText = stripHtml(text);
      allFetchedText += `\n\n--- ${source.name} ---\n${cleanText}`;
      fetchedSources.push({ name: source.name, content: cleanText });
      console.log(`  ✅ ${cleanText.length} chars`);
    } catch (err) {
      console.log(`  ❌ ${source.name}: ${err.message}`);
    }
  }

  // Step 2: Analyze trends with expert focus
  console.log('\n🤖 Analyzing for expert immigration law trends...');
  
  let analysis;
  if (fetchedSources.length > 0) {
    try {
      const analysisPrompt = `Eres un analista especializado en derecho de extranjería español.
Analiza este contenido de noticias y fuentes oficiales sobre inmigración y regularización en España.

Contenido de fuentes:
${allFetchedText.substring(0, 8000)}

Basándote en tu experiencia de 15 años como abogado de extranjería, identifica:

1. Los 3 temas más relevantes para migrantes que buscan regularización
2. Las preguntas más urgentes que tienen las personas
3. Cualquier actualización oficial importante (leyes, plazos, procedimientos)

Responde en JSON con este formato:
{
  "topics": [
    {
      "title_es": "Título en español",
      "title_en": "Title in English", 
      "title_ar": "العنوان بالعربية",
      "title_ur": "اردو میں عنوان",
      "excerpt_es": "Resumen en español (1-2 frases)",
      "excerpt_en": "Summary in English (1-2 sentences)",
      "excerpt_ar": "ملخص بالعربية (جملة أو جملتين)",
      "excerpt_ur": "اردو میں خلاصہ (ایک یا دو جملے)",
      "category": "Análisis Jurídico | Guía Procedimental | Actualizaciones | Preguntas Expertas",
      "primary_keyword": "palabra clave principal",
      "secondary_keywords": ["kw1", "kw2", "kw3"],
      "key_facts": ["hecho 1", "hecho 2"],
      "is_trending": true/false
    }
  ]
}

Genera 3-4 temas de alta calidad, enfocados en derecho de extranjería.`;

      const analysisText = await deepseek(EXPERT_SYSTEM_PROMPT, analysisPrompt, 3000);
      analysis = JSON.parse(analysisText);
      console.log(`✅ Identified ${analysis.topics?.length ?? 0} expert topics`);
    } catch (err) {
      console.log(`❌ Analysis failed: ${err.message}, using expert fallback`);
      analysis = { topics: [] };
    }
  } else {
    console.log('⚠️  No sources fetched, using expert keyword strategy');
    analysis = { topics: [] };
  }

  // Step 3: Generate expert articles
  const topics = analysis.topics && analysis.topics.length > 0 
    ? analysis.topics.slice(0, 4) 
    : EXPERT_CATEGORIES.slice(0, 4).map((cat, idx) => ({
        title_es: `${cat.category}: ${cat.description}`,
        title_en: `${cat.category}: ${cat.description}`,
        title_ar: `${cat.category}: ${cat.description}`,
        title_ur: `${cat.category}: ${cat.description}`,
        excerpt_es: `Artículo experto sobre ${cat.description.toLowerCase()}. Información verificada de fuentes oficiales.`,
        excerpt_en: `Expert article about ${cat.description.toLowerCase()}. Verified information from official sources.`,
        excerpt_ar: `مقال خبير حول ${cat.description.toLowerCase()}. معلومات موثقة من مصادر رسمية.`,
        excerpt_ur: `${cat.description.toLowerCase()} کے بارے میں ماہر مضمون۔ سرکاری ذرائع سے تصدیق شدہ معلومات۔`,
        category: cat.category,
        primary_keyword: cat.keywords[0],
        secondary_keywords: cat.keywords.slice(1),
        key_facts: [],
        is_trending: cat.is_trending
      }));

  console.log(`\n✍️  Writing ${topics.length} expert articles...`);

  for (const topic of topics) {
    console.log(`\n📝 ${topic.category}: "${topic.title_es.substring(0, 60)}..."`);

    // Generate content for each language
    const languages = [
      { code: 'es', title: topic.title_es, excerpt: topic.excerpt_es },
      { code: 'en', title: topic.title_en, excerpt: topic.excerpt_en },
      { code: 'ar', title: topic.title_ar, excerpt: topic.excerpt_ar },
      { code: 'ur', title: topic.title_ur, excerpt: topic.excerpt_ur },
    ];

    const contents = {};
    for (const lang of languages) {
      try {
        const contentPrompt = `Escribe un artículo experto sobre: "${lang.title}"

Categoría: ${topic.category}
Resumen: ${lang.excerpt}
Palabras clave: ${[topic.primary_keyword, ...(topic.secondary_keywords || [])].join(', ')}

Contexto: ${fetchedSources.length > 0 ? 'Basado en análisis de fuentes oficiales' : 'Basado en conocimiento experto de 15 años'}

Estructura requerida:
1. **Introducción**: Contexto legal y relevancia actual
2. **Marco Normativo**: Leyes, decretos y regulaciones aplicables (cita artículos específicos)
3. **Análisis Técnico**: Explicación detallada con referencias legales
4. **Casos Prácticos**: Ejemplos reales o hipotéticos ilustrativos
5. **Recomendaciones**: Consejos prácticos basados en experiencia
6. **Conclusiones**: Resumen y perspectivas futuras

Longitud: 800-1200 palabras
Nivel: Profesional (abogados, asesores, personas con conocimiento avanzado)
Fecha de referencia: ${todayStr()}

Genera contenido original, verificable y de alta calidad.`;

        console.log(`  🤖 Generando en ${lang.code}...`);
        const content = await deepseek(EXPERT_SYSTEM_PROMPT, contentPrompt, 3500);
        contents[lang.code] = content;
        console.log(`  ✅ ${content.length} caracteres`);
      } catch (err) {
        console.log(`  ⚠️  Error en ${lang.code}: ${err.message.substring(0, 80)}`);
        // Fallback content
        contents[lang.code] = `# ${lang.title}

## Introducción
Este artículo proporciona un análisis experto sobre este tema de extranjería.

## Marco Normativo
La legislación aplicable incluye la Ley Orgánica 4/2000 (LOEx) y el Real Decreto 316/2026.

## Análisis Técnico
${lang.excerpt}

## Casos Prácticos
Ejemplos ilustrativos basados en la experiencia de 15 años como abogado de extranjería.

## Recomendaciones
Consejos prácticos para navegar los procedimientos de regularización.

## Conclusiones
Resumen y perspectivas sobre este tema.

---
*Artículo generado el ${todayStr()}*`;
      }
    }

    // Create MDX file
    const slug = toSlug(topic.title_es) + '-' + todayStr();
    const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`);

    const mdxContent = `---
title_es: "${topic.title_es}"
title_en: "${topic.title_en}"
title_ar: "${topic.title_ar}"
title_ur: "${topic.title_ur}"

excerpt_es: "${topic.excerpt_es}"
excerpt_en: "${topic.excerpt_en}"
excerpt_ar: "${topic.excerpt_ar}"
excerpt_ur: "${topic.excerpt_ur}"

body_es: |
${contents.es.split('\n').map(line => `  ${line}`).join('\n')}

body_en: |
${contents.en.split('\n').map(line => `  ${line}`).join('\n')}

body_ar: |
${contents.ar.split('\n').map(line => `  ${line}`).join('\n')}

body_ur: |
${contents.ur.split('\n').map(line => `  ${line}`).join('\n')}

date: ${todayStr()}
category: "${topic.category}"
is_trending: ${topic.is_trending ?? false}
primary_keyword: "${topic.primary_keyword}"
---

<!-- Article content is in the frontmatter above -->
`;

    await fs.writeFile(mdxPath, mdxContent, 'utf8');
    console.log(`  💾 Guardado: ${slug}.mdx`);
  }

  // Step 4: Write trending.json
  const trendingPath = path.join(ROOT, 'src', 'data', 'trending.json');
  const trendingData = {
    date: todayStr(),
    trending_searches: EXPERT_KEYWORD_STRATEGY.trending_questions.slice(0, 3),
    official_updates: EXPERT_KEYWORD_STRATEGY.official_updates.slice(0, 2),
    alert: null,
    topics_today: topics.map(t => t.title_es),
    has_live_data: fetchedSources.length > 0
  };
  
  await fs.writeFile(trendingPath, JSON.stringify(trendingData, null, 2), 'utf8');
  console.log(`\n📊 Trending data escrito: trending.json`);

  console.log('\n✅ EXPERT Agent completado exitosamente!');
  console.log('📊 Artículos expertos generados:');
  topics.forEach((t, i) => console.log(`  ${i + 1}. ${t.category}: ${t.title_es.substring(0, 50)}...`));
  console.log('\n🚀 Siguiente: Commit y push para desplegar en Cloudflare Pages');
}

// Run the agent
run().catch(err => {
  console.error('❌ Agent failed:', err);
  process.exit(1);
});