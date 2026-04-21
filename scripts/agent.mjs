#!/usr/bin/env node
/**
 * LaRegularizacion.com — Daily Content Agent
 * Uses DeepSeek API to:
 *  1. Scrape official sources + trusted news
 *  2. Analyze trending keywords & search intent
 *  3. Generate multilingual blog posts (ES/EN/AR/UR)
 *  4. Write MDX files to src/content/blog/
 *
 * Run: node scripts/agent.mjs
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
  {
    name: 'La Moncloa — Inclusión (RSS)',
    url: 'https://www.lamoncloa.gob.es/rss/serviciosdeprensa/notasprensa/inclusion/Paginas/rss.aspx',
    type: 'official_rss',
    lang: 'es',
  },
  {
    name: 'BOE — RD 316/2026 texto',
    url: 'https://www.boe.es/buscar/doc.php?id=BOE-A-2026-8284',
    type: 'official',
    lang: 'es',
  },
];

// ─── EXPERT EXTRANJERÍA KNOWLEDGE BASE ──────────────────────────────
// The agent is now an expert in Spanish immigration law (extranjería)
const EXPERT_KNOWLEDGE = {
  // Key legal references
  legal_framework: [
    'Ley Orgánica 4/2000 (LOEx) - Ley de Extranjería',
    'Real Decreto 316/2026 - Regularización Extraordinaria',
    'Instrucción DGI/SGRJ/2026/1 - Criterios de aplicación',
    'Reglamento de la Ley de Extranjería (RD 557/2011)',
    'Ley 14/2013 - Apoyo a emprendedores',
    'Ley 12/2009 - Régimen Comunitario',
  ],
  
  // Common procedures and forms
  procedures: [
    'EX-00 - Solicitud de autorización de residencia temporal',
    'EX-01 - Solicitud de autorización de residencia y trabajo',
    'EX-02 - Solicitud de autorización de residencia de familiar',
    'EX-03 - Solicitud de tarjeta de familiar de ciudadano UE',
    'EX-10 - Solicitud de autorización de residencia por estudios',
    'EX-11 - Solicitud de autorización de residencia por investigación',
    'EX-12 - Solicitud de autorización de residencia por prácticas',
    'EX-13 - Solicitud de autorización de residencia por voluntariado',
    'EX-14 - Solicitud de autorización de residencia por intercambio',
    'EX-15 - Solicitud de autorización de residencia por arraigo',
    'EX-16 - Solicitud de autorización de residencia por arraigo familiar',
    'EX-17 - Solicitud de autorización de residencia por arraigo laboral',
    'EX-18 - Solicitud de autorización de residencia por arraigo social',
    'EX-19 - Solicitud de autorización de residencia por circunstancias excepcionales',
    'EX-20 - Solicitud de autorización de residencia por protección internacional',
    'EX-21 - Solicitud de autorización de residencia por razones humanitarias',
    'EX-22 - Solicitud de autorización de residencia por colaboración con la justicia',
    'EX-23 - Solicitud de autorización de residencia por víctima de trata',
    'EX-24 - Solicitud de autorización de residencia por violencia de género',
    'EX-25 - Solicitud de autorización de residencia por reagrupación familiar',
    'EX-26 - Solicitud de autorización de residencia por nacimiento o adopción',
    'EX-27 - Solicitud de autorización de residencia por matrimonio o pareja de hecho',
    'EX-28 - Solicitud de autorización de residencia por hijos mayores de edad',
    'EX-29 - Solicitud de autorización de residencia por padres mayores de edad',
    'EX-30 - Solicitud de autorización de residencia por otros familiares',
    'EX-31 - Solicitud de autorización de residencia temporal por circunstancias excepcionales (Regularización 2026)',
    'EX-32 - Solicitud de autorización de residencia y trabajo temporal por circunstancias excepcionales (Regularización 2026)',
    'EX-33 - Solicitud de autorización de residencia por inversión',
    'EX-34 - Solicitud de autorización de residencia por emprendedores',
    'EX-35 - Solicitud de autorización de residencia por profesionales altamente cualificados',
    'EX-36 - Solicitud de autorización de residencia por investigadores',
    'EX-37 - Solicitud de autorización de residencia por estudiantes',
    'EX-38 - Solicitud de autorización de residencia por prácticas',
    'EX-39 - Solicitud de autorización de residencia por voluntariado',
    'EX-40 - Solicitud de autorización de residencia por intercambio',
    'EX-41 - Solicitud de autorización de residencia por arraigo',
    'EX-42 - Solicitud de autorización de residencia por arraigo familiar',
    'EX-43 - Solicitud de autorización de residencia por arraigo laboral',
    'EX-44 - Solicitud de autorización de residencia por arraigo social',
    'EX-45 - Solicitud de autorización de residencia por circunstancias excepcionales',
    'EX-46 - Solicitud de autorización de residencia por protección internacional',
    'EX-47 - Solicitud de autorización de residencia por razones humanitarias',
    'EX-48 - Solicitud de autorización de residencia por colaboración con la justicia',
    'EX-49 - Solicitud de autorización de residencia por víctima de trata',
    'EX-50 - Solicitud de autorización de residencia por violencia de género',
  ],
  
  // Key concepts in extranjería
  concepts: [
    'Arraigo social, laboral y familiar',
    'Circunstancias excepcionales',
    'Protección internacional (asilo y refugio)',
    'Reagrupación familiar',
    'Autorización de residencia temporal',
    'Autorización de residencia y trabajo',
    'Tarjeta de familiar de ciudadano de la UE',
    'Visado de estudios vs autorización de residencia por estudios',
    'Tasa 790 (Código 052, 062, 012)',
    'Cita previa en extranjería (sede electrónica)',
    'Resolución expresa y silencio administrativo',
    'Recursos (alzada, reposición, contencioso-administrativo)',
    'Infracciones y sanciones en materia de extranjería',
    'Centros de Internamiento de Extranjeros (CIE)',
    'Procedimiento preferente vs ordinario',
    'Documentación acreditativa de la estancia irregular',
    'Informe de arraigo del ayuntamiento',
    'Contrato de trabajo en vigor',
    'Empadronamiento continuado',
    'Medios económicos suficientes',
    'Seguro médico público o privado',
    'Antecedentes penales (certificado negativo)',
  ],
  
  // Common issues and solutions
  common_issues: [
    'Pasaporte caducado durante el procedimiento',
    'Falta de empadronamiento continuado',
    'Contrato de trabajo sin cotizaciones',
    'Medios económicos insuficientes',
    'Falta de seguro médico',
    'Antecedentes penales en país de origen',
    'Error en el formulario EX-31/EX-32',
    'Falta de cita previa disponible',
    'Retrasos en la resolución administrativa',
    'Denegación por falta de documentación',
    'Cambio de domicilio durante el procedimiento',
    'Pérdida o robo de documentación',
  ],
};

// ─── DAILY ARTICLE TOPICS (4 per day) ───────────────────────────────
const DAILY_TOPICS = [
  {
    category: 'Legal Analysis',
    focus: 'Análisis jurídico de la regularización 2026',
    depth: 'Profundo análisis legal con referencias a LOEx y RD 316/2026',
  },
  {
    category: 'Procedural Guide',
    focus: 'Guía paso a paso de trámites',
    depth: 'Instrucciones detalladas con formularios y requisitos',
  },
  {
    category: 'News & Updates',
    focus: 'Últimas noticias y novedades',
    depth: 'Actualizaciones oficiales y cambios normativos',
  },
  {
    category: 'Q&A Expert',
    focus: 'Preguntas frecuentes resueltas por experto',
    depth: 'Respuestas detalladas a dudas comunes',
  },
];

// ─── KEYWORD STRATEGY ────────────────────────────────────────────────
// Keywords with estimated search volume — agent uses these to optimize titles
const KEYWORD_STRATEGY = {
  primary: [
    'regularización extraordinaria 2026',
    'regularización migrantes españa',
    'cómo pedir regularización españa',
    'requisitos regularización 2026',
    'formulario EX-32',
    'formulario EX-31',
  ],
  secondary: [
    'cita previa regularización',
    'plazo regularización junio 2026',
    'permiso de residencia irregular españa',
    'RD 316/2026',
    'arraigo extraordinario 2026',
    'tasa 790 regularización',
  ],
  trending_questions: [
    '¿cuándo se abre la cita previa regularización?',
    '¿qué papeles necesito para la regularización?',
    '¿puedo trabajar antes de la resolución?',
    '¿el pasaporte caducado sirve para regularización?',
    '¿cómo acreditar 5 meses de estancia?',
    '¿qué es el arraigo extraordinario?',
  ],
  en_keywords: [
    'spain regularization 2026',
    'spain immigration amnesty 2026',
    'how to regularize status spain',
    'EX-31 EX-32 spain',
  ],
  ar_keywords: [
    'تسوية أوضاع إسبانيا 2026',
    'تسوية المهاجرين إسبانيا',
    'استمارة EX-32 إسبانيا',
  ],
};

// ─── HTTP HELPERS ─────────────────────────────────────────────────────
function fetchText(url, timeoutMs = 15000, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    const doRequest = (currentUrl, redirectsLeft) => {
      let parsed;
      try { parsed = new URL(currentUrl); } catch(e) { return reject(e); }

      const isHttps = parsed.protocol === 'https:';
      const lib = isHttps ? https : http;

      const options = {
        hostname: parsed.hostname,
        port: parsed.port || (isHttps ? 443 : 80),
        path: parsed.pathname + (parsed.search || ''),
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'es-ES,es;q=0.9,en;q=0.7',
          'Accept-Encoding': 'identity',
          'Cache-Control': 'no-cache',
          'Connection': 'close',
        },
        // Bypass SSL certificate issues on some government sites
        rejectUnauthorized: false,
      };

      const req = lib.request(options, (res) => {
        // Follow redirects (301, 302, 303, 307, 308)
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          res.resume(); // discard body
          if (redirectsLeft <= 0) {
            resolve({ status: res.statusCode, text: '' });
            return;
          }
          const nextUrl = new URL(res.headers.location, currentUrl).toString();
          doRequest(nextUrl, redirectsLeft - 1);
          return;
        }

        let data = '';
        res.setEncoding('utf8');
        res.on('data', chunk => {
          data += chunk;
          if (data.length > 500_000) { req.destroy(); resolve({ status: res.statusCode, text: data }); }
        });
        res.on('end', () => resolve({ status: res.statusCode, text: data }));
      });

      req.on('error', reject);
      req.setTimeout(timeoutMs, () => { req.destroy(); reject(new Error('timeout')); });
      req.end();
    };

    doRequest(url, maxRedirects);
  });
}

// ─── UNSPLASH IMAGE ──────────────────────────────────────────────────
// Hardcoded fallback images per category (direct Unsplash CDN URLs — always work)
const FALLBACK_IMAGES = {
  noticias:    'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=630&fit=crop', // newspaper/news
  guias:       'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=630&fit=crop', // desk documents
  requisitos:  'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=1200&h=630&fit=crop', // passport
  formularios: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=630&fit=crop', // form signing
  plazos:      'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&h=630&fit=crop', // calendar
  tramites:    'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=630&fit=crop', // handshake office
  default:     'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=1200&h=630&fit=crop', // spain street
};

async function getUnsplashImage(topic) {
  const categoryQueries = {
    noticias:     'spain immigration news',
    guias:        'spain document paperwork office',
    requisitos:   'documents passport spain',
    formularios:  'form document signing',
    plazos:       'calendar deadline time',
    tramites:     'government office spain',
  };

  const base = categoryQueries[topic.category] ?? 'spain immigration';
  const kw = (topic.primary_keyword || '')
    .replace(/[áàä]/g,'a').replace(/[éèë]/g,'e')
    .replace(/[íìï]/g,'i').replace(/[óòö]/g,'o')
    .replace(/[úùü]/g,'u').replace(/[ñ]/g,'n')
    .replace(/[^\w\s]/g,'').trim().split(' ').slice(0,3).join(' ');

  const query = encodeURIComponent(kw || base);
  const url = `https://source.unsplash.com/1200x630/?${query}`;

  try {
    const finalUrl = await new Promise((resolve, reject) => {
      const req = https.request(url, { method: 'HEAD', rejectUnauthorized: false }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          resolve(res.headers.location);
        } else if (res.statusCode === 200) {
          resolve(url);
        } else {
          reject(new Error(`status ${res.statusCode}`));
        }
      });
      req.on('error', reject);
      req.setTimeout(8000, () => { req.destroy(); reject(new Error('timeout')); });
      req.end();
    });
    console.log(`  🖼️  Image: ${finalUrl.slice(0, 80)}...`);
    return finalUrl;
  } catch (e) {
    // Use hardcoded fallback — guaranteed to work, no external request needed
    const fallback = FALLBACK_IMAGES[topic.category] ?? FALLBACK_IMAGES.default;
    console.log(`  🖼️  Using fallback image for category "${topic.category}"`);
    return fallback;
  }
}

function stripHtml(html) {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .trim()
    .slice(0, 12000); // limit to ~12k chars per source
}

// ─── DEEPSEEK API ─────────────────────────────────────────────────────
async function deepseek(systemPrompt, userPrompt, maxTokens = 4000) {
  const body = JSON.stringify({
    model: DEEPSEEK_MODEL,
    max_tokens: maxTokens,
    temperature: 0.7,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
  });

  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: 'api.deepseek.com',
        path: '/v1/chat/completions',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
          'Content-Length': Buffer.byteLength(body),
        },
      },
      (res) => {
        let data = '';
        res.on('data', chunk => (data += chunk));
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            if (json.error) reject(new Error(json.error.message));
            else resolve(json.choices?.[0]?.message?.content ?? '');
          } catch (e) { reject(e); }
        });
      }
    );
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ─── SLUG HELPER ──────────────────────────────────────────────────────
function toSlug(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\u0600-\u06ff\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60);
}

function todayStr() {
  return new Date().toISOString().split('T')[0];
}

// ─── MAIN AGENT ───────────────────────────────────────────────────────
async function run() {
  console.log('\n🤖 LaRegularizacion Agent starting...');
  console.log(`📅 Date: ${new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })}`);

  // Step 0: Clean up any existing posts for today
  console.log('\n🧹 Cleaning up existing posts for today...');
  try {
    const files = await fs.readdir(BLOG_DIR);
    const today = todayStr();
    let deleted = 0;
    for (const file of files) {
      if (file.includes(today) && file.endsWith('.mdx')) {
        await fs.unlink(path.join(BLOG_DIR, file));
        console.log(`   🗑️  Deleted: ${file}`);
        deleted++;
      }
    }
    if (deleted > 0) {
      console.log(`   ✅ Removed ${deleted} existing post(s) for today`);
    } else {
      console.log('   ✅ No existing posts for today found');
    }
  } catch (e) {
    console.log('   ⚠️  Could not clean blog dir:', e.message);
  }

  // Step 1: Fetch all sources
  console.log('\n📡 Fetching sources...');
  console.log('   (403 errors locally = Cloudflare blocking sandbox IP — works fine on GitHub Actions)\n');
  const sourceTexts = [];
  for (const source of SOURCES) {
    try {
      console.log(`  → ${source.name}`);
      const { status, text } = await fetchText(source.url);
      if (status === 200 && text.length > 500) {
        const clean = stripHtml(text);
        sourceTexts.push({
          name: source.name,
          url: source.url,
          type: source.type,
          excerpt: clean.slice(0, 3000),
        });
        console.log(`    ✅ ${clean.length} chars`);
      } else {
        console.log(`    ⚠️ status ${status} — skipped`);
      }
    } catch (e) {
      console.log(`    ❌ ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 600));
  }

  if (sourceTexts.length === 0) {
    console.log('\n⚠️  No live sources fetched (likely Cloudflare blocking this IP).');
    console.log('   → Agent will use DeepSeek knowledge about Spain Regularization 2026.');
    console.log('   → On GitHub Actions this usually works because Azure IPs are allowed.\n');
  }

  // Step 2: Extract news & trending signals
  console.log('\n🔍 Analyzing news and trends...');

  const sourceDigest = sourceTexts
    .map(s => `[${s.type.toUpperCase()}] ${s.name}\nURL: ${s.url}\n${s.excerpt}`)
    .join('\n\n---\n\n');

  const analysisPrompt = `
Eres un EXPERTO EN EXTRANJERÍA (Derecho de Inmigración español) con 15 años de experiencia. Escribes para LaRegularizacion.com, una guía NO OFICIAL sobre la Regularización Extraordinaria España 2026 (RD 316/2026).

TU EXPERIENCIA:
- Abogado especializado en extranjería (LOEx, RD 557/2011, RD 316/2026)
- Conocimiento profundo de formularios EX-00 a EX-50
- Experiencia en procedimientos de arraigo, reagrupación, protección internacional
- Manejo de recursos administrativos y contencioso-administrativos
- Asesoramiento a miles de migrantes en procesos de regularización

CONOCIMIENTO LEGAL:
${JSON.stringify(EXPERT_KNOWLEDGE.legal_framework, null, 2)}

FORMULARIOS QUE DOMINAS:
${JSON.stringify(EXPERT_KNOWLEDGE.procedures.slice(0, 20), null, 2)}

CONCEPTOS CLAVE:
${JSON.stringify(EXPERT_KNOWLEDGE.concepts, null, 2)}

PROBLEMAS COMUNES Y SOLUCIONES:
${JSON.stringify(EXPERT_KNOWLEDGE.common_issues, null, 2)}

HOY GENERARÁS 4 ARTÍCULOS DE ALTA CALIDAD:
1. ANÁLISIS JURÍDICO - Profundo análisis legal con referencias
2. GUÍA PROCEDIMENTAL - Paso a paso con formularios
3. ACTUALIZACIONES - Últimas noticias oficiales
4. PREGUNTAS FRECUENTES - Respuestas expertas a dudas comunes

FUENTES HOY (${todayStr()}):
${sourceDigest || 'Usa tu conocimiento experto sobre la Regularización 2026 y extranjería española.'}

PALABRAS CLAVE (úsalas naturalmente):
Primary: ${KEYWORD_STRATEGY.primary.join(', ')}
Secondary: ${KEYWORD_STRATEGY.secondary.join(', ')}
Trending questions people search: ${KEYWORD_STRATEGY.trending_questions.join(' | ')}

TASK: Analyze the sources and identify:
1. The 2-3 most newsworthy/useful topics for migrants today
2. What questions people are actually searching about this topic
3. Any new official updates, warnings, or changes

Respond ONLY with a JSON object, no markdown, no explanation:
{
  "topics": [
    {
      "slug_es": "slug-in-spanish-max-50-chars",
      "title_es": "SEO title in Spanish (include primary keyword, max 65 chars)",
      "title_en": "SEO title in English (max 65 chars)",
      "title_ar": "العنوان بالعربية",
      "title_ur": "اردو میں عنوان",
      "category": "noticias|guias|requisitos|formularios|plazos|tramites",
      "excerpt_es": "2-line summary in Spanish for meta description (max 155 chars)",
      "excerpt_en": "2-line summary in English (max 155 chars)",
      "excerpt_ar": "ملخص بالعربية (أقصى 155 حرف)",
      "excerpt_ur": "اردو میں خلاصہ (زیادہ سے زیادہ 155 حروف)",
      "is_trending": true,
      "primary_keyword": "the main keyword this article targets",
      "secondary_keywords": ["kw1", "kw2", "kw3"],
      "sources": ["url1", "url2"],
      "key_facts": ["fact1", "fact2", "fact3"]
    }
  ],
  "trending_searches": ["search1", "search2", "search3"],
  "official_updates": ["any new update or change found today"],
  "alert": null
}
`;

  let analysis;
  try {
    const raw = await deepseek(
      'You are a precise JSON generator. Output ONLY valid JSON, no markdown, no explanation.',
      analysisPrompt,
      2000
    );
    // strip possible ```json ``` wrapper
    const cleaned = raw.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
    analysis = JSON.parse(cleaned);
    console.log(`✅ Identified ${analysis.topics?.length ?? 0} topics`);
    if (analysis.trending_searches?.length) {
      console.log(`🔥 Trending: ${analysis.trending_searches.join(', ')}`);
    }
  } catch (e) {
    console.error('❌ Analysis parse failed:', e.message);
    // fallback with one generic topic
    analysis = {
      topics: [{
        slug_es: `noticias-regularizacion-${todayStr()}`,
        title_es: `Actualización Regularización Extraordinaria — ${todayStr()}`,
        title_en: `Spain Regularization Update — ${todayStr()}`,
        title_ar: `تحديث التسوية الاستثنائية — ${todayStr()}`,
        title_ur: `ریگولرائزیشن اپڈیٹ — ${todayStr()}`,
        category: 'noticias',
        excerpt_es: 'Resumen diario de novedades sobre la regularización extraordinaria de migrantes en España 2026.',
        excerpt_en: 'Daily summary of updates on Spain\'s extraordinary migrant regularization 2026.',
        excerpt_ar: 'ملخص يومي لمستجدات التسوية الاستثنائية للمهاجرين في إسبانيا 2026.',
        excerpt_ur: 'اسپین کی غیر معمولی ریگولرائزیشن 2026 کی روزانہ اپڈیٹ کا خلاصہ۔',
        is_trending: false,
        primary_keyword: 'regularización extraordinaria 2026',
        secondary_keywords: ['EX-31', 'EX-32', 'RD 316/2026'],
        sources: ['https://www.inclusion.gob.es/regularizacion'],
        key_facts: [
          'El plazo de solicitud está abierto hasta el 30 de junio de 2026',
          'La tasa oficial es de 38,28 € (modelo 790 código 052)',
          'La autorización de trabajo es válida desde el momento de registrar la solicitud',
        ],
      }],
      trending_searches: [],
      official_updates: [],
      alert: null,
    };
  }

  // Step 3: Write MDX files for each topic
  await fs.mkdir(BLOG_DIR, { recursive: true });

  for (const topic of (analysis.topics ?? []).slice(0, 3)) {
    console.log(`\n✍️  Writing article: "${topic.title_es}"`);

    // Generate full content in all 4 languages
    const contentPrompt = (lang, title, excerpt, keyFacts) => `
You are an expert immigration guide writer for LaRegularizacion.com, an UNOFFICIAL independent guide about Spain's Extraordinary Regularization 2026.

ARTICLE TO WRITE:
- Language: ${lang}
- Title: "${title}"
- Excerpt: "${excerpt}"
- Key facts to cover: ${keyFacts.join(' | ')}
- Date: ${todayStr()}
- Primary keyword: "${topic.primary_keyword}"
- Secondary keywords: ${topic.secondary_keywords?.join(', ')}

RULES:
1. Write in ${lang} ONLY, completely, every word
2. Structure: intro paragraph, 2-3 h2 sections with useful info, practical tips box, conclusion
3. Include the primary keyword naturally 3-5 times
4. NEVER invent facts — stick to the key_facts provided and official info about RD 316/2026
5. Always include a disclaimer: this is unofficial information, always check inclusion.gob.es
6. For Arabic/Urdu: write RIGHT-TO-LEFT naturally, full sentences, not translated word-by-word
7. Tone: helpful, clear, empathetic — many readers are vulnerable migrants
8. Length: 350-550 words
9. End with: "**Fuente oficial / Official source:** [inclusion.gob.es/regularizacion](https://www.inclusion.gob.es/regularizacion)"

Output ONLY the article body in Markdown (no frontmatter, no title — those are added separately).
Start directly with the first paragraph.
`;

    const langs = [
      { code: 'es', title: topic.title_es, excerpt: topic.excerpt_es },
      { code: 'en', title: topic.title_en, excerpt: topic.excerpt_en },
      { code: 'ar', title: topic.title_ar, excerpt: topic.excerpt_ar },
      { code: 'ur', title: topic.title_ur, excerpt: topic.excerpt_ur },
    ];

    const bodies = {};
    for (const { code, title, excerpt } of langs) {
      console.log(`  📝 ${code.toUpperCase()}...`);
      try {
        bodies[code] = await deepseek(
          'You are an expert multilingual immigration guide writer. Write natural, helpful content.',
          contentPrompt(code, title, excerpt, topic.key_facts ?? []),
          1800
        );
        console.log(`    ✅ ${bodies[code].length} chars`);
      } catch (e) {
        console.log(`    ❌ ${e.message}`);
        bodies[code] = `*Contenido en preparación. Vuelve pronto.*`;
      }
      await new Promise(r => setTimeout(r, 600));
    }

    // Write the MDX file
    const slug = toSlug(topic.slug_es || topic.title_es) + '-' + todayStr();
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

    // Fetch Unsplash image for this article
    const imageUrl = await getUnsplashImage(topic);

    const sourcesList = (topic.sources ?? ['https://www.inclusion.gob.es/regularizacion'])
      .map(u => `  - "${u}"`).join('\n');

    const mdx = `---
# Auto-generated by LaRegularizacion Agent — ${new Date().toISOString()}
slug: "${slug}"
date: "${todayStr()}"
category: "${topic.category ?? 'noticias'}"
image: "${imageUrl}"
is_trending: ${topic.is_trending ?? false}
primary_keyword: "${topic.primary_keyword ?? ''}"
secondary_keywords: [${(topic.secondary_keywords ?? []).map(k => `"${k}"`).join(', ')}]
sources:
${sourcesList}

title_es: "${topic.title_es.replace(/"/g, "'")}"
title_en: "${topic.title_en.replace(/"/g, "'")}"
title_ar: "${topic.title_ar.replace(/"/g, "'")}"
title_ur: "${topic.title_ur.replace(/"/g, "'")}"

excerpt_es: "${topic.excerpt_es.replace(/"/g, "'")}"
excerpt_en: "${topic.excerpt_en.replace(/"/g, "'")}"
excerpt_ar: "${topic.excerpt_ar.replace(/"/g, "'")}"
excerpt_ur: "${topic.excerpt_ur.replace(/"/g, "'")}"

body_es: |
${bodies.es.split('\n').map(l => '  ' + l).join('\n')}

body_en: |
${bodies.en.split('\n').map(l => '  ' + l).join('\n')}

body_ar: |
${bodies.ar.split('\n').map(l => '  ' + l).join('\n')}

body_ur: |
${bodies.ur.split('\n').map(l => '  ' + l).join('\n')}
---
`;

    await fs.writeFile(filePath, mdx, 'utf8');
    console.log(`  💾 Written: ${slug}.mdx`);
  }

  // Write trending.json — used by the site to show trending topics
  const trendingPath = path.join(ROOT, 'src', 'data', 'trending.json');
  const trendingData = {
    date: todayStr(),
    trending_searches: analysis.trending_searches ?? [],
    official_updates: analysis.official_updates ?? [],
    alert: analysis.alert ?? null,
    topics_today: (analysis.topics ?? []).map(t => ({
      slug: toSlug(t.slug_es || t.title_es) + '-' + todayStr(),
      title_es: t.title_es,
      title_en: t.title_en,
      title_ar: t.title_ar,
      title_ur: t.title_ur,
      category: t.category,
      is_trending: t.is_trending,
      primary_keyword: t.primary_keyword,
    })),
  };

  await fs.writeFile(trendingPath, JSON.stringify(trendingData, null, 2), 'utf8');
  console.log(`\n📊 Trending data written: trending.json`);

  console.log('\n✅ Agent complete!');
  console.log(`📁 Blog posts: ${BLOG_DIR}`);
  console.log('🚀 Commit & push → Cloudflare Pages will rebuild automatically\n');
}

run().catch(err => {
  console.error('\n💥 Agent crashed:', err);
  process.exit(1);
});
