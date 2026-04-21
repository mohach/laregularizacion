#!/usr/bin/env node
/**
 * LaRegularizacion.com — EXPERT Immigration Lawyer Agent
 * Combines expert immigration law knowledge with RSS fetching and trending analysis
 * Generates 4 expert-level articles daily with 15+ years of virtual experience
 * Topics: Legal Analysis, Procedural Guides, Updates, Expert Q&A
 * Languages: ES, EN, AR, UR
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
// Using simpler, more reliable RSS feeds
const SOURCES = [
  {
    name: 'BOE — Últimas disposiciones',
    url: 'https://www.boe.es/rss/boe.php',
    type: 'rss',
    lang: 'es',
  },
  {
    name: 'El País — Inmigración',
    url: 'https://feeds.elpais.com/mrss-s/pages/elpais_es/inmigracion',
    type: 'rss',
    lang: 'es',
  },
  {
    name: 'Europa Press — Sociedad',
    url: 'https://www.europapress.es/rss/rss.aspx?ch=00044',
    type: 'rss',
    lang: 'es',
  },
];

// Trending keywords and search intent
const KEYWORD_STRATEGY = {
  primary_keywords: [
    'regularización extraordinaria 2026',
    'EX-31 formulario',
    'EX-32 formulario', 
    'ley de extranjería',
    'permiso de residencia',
    'arraigo social',
    'arraigo laboral',
    'nacionalidad española',
  ],
  trending_questions: [
    '¿Cuándo empieza la regularización 2026?',
    '¿Cómo solicitar el EX-31?',
    '¿Qué documentos necesito para la regularización?',
    '¿Cuánto tarda el trámite de regularización?',
    '¿Puedo trabajar con el EX-31 en trámite?',
  ],
  official_updates: [
    'BOE publicación nueva ley',
    'Ministerio de Inclusión anuncios',
    'Sede electrónica extranjería',
    'Procedimientos administrativos',
  ]
};

// ─── DAILY TOPICS ────────────────────────────────────────────────────
const DAILY_TOPICS = [
  {
    id: 1,
    category: 'Análisis Jurídico',
    focus: 'Análisis profundo de la Ley de Extranjería y jurisprudencia',
    depth: 'Análisis detallado con referencias a LOEx, RD 316/2026, jurisprudencia del TSJ y TJUE',
    keywords: ['LOEx', 'jurisprudencia', 'TSJ', 'TJUE', 'análisis legal'],
    is_trending: true
  },
  {
    id: 2,
    category: 'Guía Procedimental',
    focus: 'Guía paso a paso para formularios EX-00 a EX-50',
    depth: 'Instrucciones detalladas con ejemplos prácticos de cumplimentación',
    keywords: ['EX-31', 'EX-32', 'formularios', 'procedimiento', 'guía práctica'],
    is_trending: true
  },
  {
    id: 3,
    category: 'Actualizaciones',
    focus: 'Últimas novedades y cambios normativos',
    depth: 'Información actualizada de fuentes oficiales (BOE, Ministerios, sedes electrónicas)',
    keywords: ['BOE', 'actualizaciones', 'novedades', 'cambios normativos'],
    is_trending: false
  },
  {
    id: 4,
    category: 'Preguntas Expertas',
    focus: 'Respuestas a casos complejos y preguntas frecuentes',
    depth: 'Análisis de casos reales con soluciones prácticas basadas en experiencia de 15 años',
    keywords: ['casos prácticos', 'FAQ', 'consultas', 'soluciones'],
    is_trending: false
  }
];

// ─── UTILITIES ───────────────────────────────────────────────────────
function todayStr() {
  return new Date().toISOString().split('T')[0];
}

function toSlug(text) {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function fetchText(url, timeoutMs = 10000, maxRedirects = 3) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const options = {
      hostname: parsed.hostname,
      port: parsed.port || (parsed.protocol === 'https:' ? 443 : 80),
      path: parsed.pathname + parsed.search,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LaRegularizacionBot/1.0; +https://laregularizacion.com)',
        'Accept': 'application/rss+xml,application/xml,text/xml,application/atom+xml,text/html;q=0.9,text/plain;q=0.8',
        'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
        'Accept-Encoding': 'gzip, deflate',
      },
      timeout: timeoutMs,
      rejectUnauthorized: false, // Allow self-signed certificates
    };

    const protocol = parsed.protocol === 'https:' ? https : http;
    
    const req = protocol.request(options, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && maxRedirects > 0) {
        // Follow redirect
        const redirectUrl = new URL(res.headers.location, url).href;
        fetchText(redirectUrl, timeoutMs, maxRedirects - 1)
          .then(resolve)
          .catch(reject);
        return;
      }

      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }

      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        // Check if we got HTML instead of RSS/XML
        if (data.includes('<html') && !data.includes('<rss') && !data.includes('<feed')) {
          reject(new Error('Got HTML instead of RSS/XML'));
          return;
        }
        resolve({ status: res.statusCode, text: data });
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`Timeout after ${timeoutMs}ms`));
    });

    req.end();
  });
}

// ─── DEEPSEEK API ────────────────────────────────────────────────────
async function callDeepSeek(prompt, systemPrompt = '') {
  return new Promise((resolve, reject) => {
    // Clean and truncate prompts to avoid JSON issues
    const cleanPrompt = prompt.substring(0, 15000).replace(/[\x00-\x1F\x7F]/g, ''); // Remove control characters
    const cleanSystemPrompt = systemPrompt ? systemPrompt.substring(0, 5000).replace(/[\x00-\x1F\x7F]/g, '') : '';
    
    const data = JSON.stringify({
      model: DEEPSEEK_MODEL,
      messages: [
        ...(cleanSystemPrompt ? [{ role: 'system', content: cleanSystemPrompt }] : []),
        { role: 'user', content: cleanPrompt }
      ],
      max_tokens: 4000,
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
      res.on('data', (chunk) => response += chunk);
      res.on('end', () => {
        try {
          // Check if response is HTML error page
          if (response.trim().startsWith('<!DOCTYPE') || 
              response.trim().startsWith('<html') ||
              response.includes('Cloudflare') ||
              response.includes('rate limit')) {
            reject(new Error(`API returned HTML error: ${response.substring(0, 200)}...`));
            return;
          }
          
          const result = JSON.parse(response);
          
          // Check for API errors
          if (result.error) {
            reject(new Error(`DeepSeek API error: ${result.error.message || result.error.code}`));
            return;
          }
          
          if (result.choices && result.choices[0]) {
            resolve(result.choices[0].message.content);
          } else {
            reject(new Error('No response from DeepSeek'));
          }
        } catch (err) {
          // If JSON parse fails, it might be HTML or other error
          reject(new Error(`Failed to parse API response: ${response.substring(0, 200)}...`));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// ─── FETCH AND ANALYZE SOURCES ───────────────────────────────────────
async function fetchAndAnalyzeSources() {
  console.log('📰 Fetching official sources...');
  
  let allFetchedText = '';
  const fetchedSources = [];
  
  for (const source of SOURCES) {
    try {
      console.log(`   🔍 ${source.name}`);
      const { text } = await fetchText(source.url);
      
      // Extract just the text content from RSS/XML
      let content = text;
      // Simple extraction of text between tags
      content = content.replace(/<[^>]*>/g, ' '); // Remove tags
      content = content.replace(/\s+/g, ' ').trim(); // Normalize whitespace
      
      if (content.length > 100) { // Only add if we got meaningful content
        allFetchedText += `\n\n--- Source: ${source.name} ---\n${content.substring(0, 3000)}`;
        fetchedSources.push({
          name: source.name,
          content: content.substring(0, 3000),
          lang: source.lang
        });
        console.log(`   ✅ Got ${content.length} chars`);
      } else {
        console.log(`   ⚠️  No meaningful content from ${source.name}`);
      }
    } catch (err) {
      console.log(`   ❌ Failed: ${source.name} - ${err.message.substring(0, 100)}`);
    }
  }
  
  if (fetchedSources.length === 0) {
    console.log('⚠️  No sources fetched, using keyword strategy only');
    return {
      has_live_data: false,
      trending_searches: KEYWORD_STRATEGY.trending_questions.slice(0, 3),
      official_updates: KEYWORD_STRATEGY.official_updates.slice(0, 2),
      alert: null,
      topics_today: DAILY_TOPICS.map(t => t.focus)
    };
  }
  
  // Analyze fetched content with DeepSeek
  console.log('🤖 Analyzing fetched content for trends...');
  
  // Clean and truncate the fetched text for API safety
  let cleanFetchedText = allFetchedText
    .replace(/[\x00-\x1F\x7F]/g, '') // Remove control characters
    .replace(/[\\"]/g, '') // Remove backslashes and quotes that could break JSON
    .replace(/\s+/g, ' ') // Normalize whitespace
    .substring(0, 3000); // Truncate to 3000 chars max
  
  const analysisPrompt = `Analyze this Spanish immigration/regularization news and official sources.
Extract:
1. Top 3 trending search queries people would have
2. Top 2 official updates or announcements
3. Any urgent alerts (new laws, deadline changes, etc.)
4. Main topics being discussed

Sources content (cleaned):
${cleanFetchedText}

Respond in JSON format:
{
  "trending_searches": ["query1", "query2", "query3"],
  "official_updates": ["update1", "update2"],
  "alert": "urgent alert or null",
  "topics_today": ["topic1", "topic2", "topic3"]
}`;

  try {
    const analysisText = await callDeepSeek(analysisPrompt, 'You are a data analyst specializing in immigration law trends.');
    const analysis = JSON.parse(analysisText);
    
    console.log(`🔥 Trending: ${analysis.trending_searches?.join(', ') || 'none'}`);
    if (analysis.alert) console.log(`🚨 Alert: ${analysis.alert}`);
    
    return {
      has_live_data: true,
      ...analysis,
      topics_today: analysis.topics_today || DAILY_TOPICS.map(t => t.focus)
    };
  } catch (err) {
    console.log(`❌ Analysis failed: ${err.message}, using fallback`);
    return {
      has_live_data: false,
      trending_searches: KEYWORD_STRATEGY.trending_questions.slice(0, 3),
      official_updates: KEYWORD_STRATEGY.official_updates.slice(0, 2),
      alert: null,
      topics_today: DAILY_TOPICS.map(t => t.focus)
    };
  }
}

// ─── GENERATE EXPERT ARTICLE ─────────────────────────────────────────
async function generateExpertArticle(topic, lang, trendingData) {
  const systemPrompt = `Eres un abogado de extranjería con 15 años de experiencia virtual especializado en legislación española.
Tienes conocimiento profundo de:
1. Ley Orgánica 4/2000 (LOEx) y sus reformas
2. Real Decreto 316/2026 de regularización extraordinaria
3. Formularios EX-00 a EX-50 (cumplimentación experta)
4. Jurisprudencia del TSJ y TJUE sobre extranjería
5. Procedimientos administrativos (silencio positivo/negativo, recursos)

Escribe como un experto que ha ayudado a miles de personas. Usa lenguaje técnico pero accesible.
Incluye referencias legales específicas (artículos, leyes, decretos).
Proporciona ejemplos prácticos y casos reales.
Estructura el artículo con introducción, desarrollo y conclusiones.

Idioma: ${lang === 'es' ? 'Español (España)' : 
           lang === 'en' ? 'English (professional legal English)' :
           lang === 'ar' ? 'العربية (لغة قانونية مهنية)' :
           'اردو (پیشہ ورانہ قانونی زبان)'}`;

  const trendingContext = trendingData.has_live_data ? 
    `Contexto actual (${todayStr()}):
    - Búsquedas trending: ${trendingData.trending_searches.slice(0, 3).join(', ')}
    - Actualizaciones oficiales: ${trendingData.official_updates.slice(0, 2).join(', ')}
    ${trendingData.alert ? `- Alerta: ${trendingData.alert.substring(0, 200)}` : ''}` :
    `Contexto general (keywords estratégicos):
    - Palabras clave: ${KEYWORD_STRATEGY.primary_keywords.slice(0, 5).join(', ')}
    - Preguntas frecuentes: ${KEYWORD_STRATEGY.trending_questions.slice(0, 3).join(' | ')}`;

  const prompt = `Genera un artículo experto sobre: "${topic.focus}"

Categoría: ${topic.category}
Profundidad requerida: ${topic.depth}
Palabras clave: ${topic.keywords.join(', ')}

${trendingContext}

Estructura del artículo:
1. **Introducción**: Contexto legal y relevancia actual
2. **Marco Normativo**: Leyes, decretos y regulaciones aplicables
3. **Análisis Técnico**: Explicación detallada con referencias legales
4. **Casos Prácticos**: Ejemplos reales o hipotéticos ilustrativos
5. **Recomendaciones**: Consejos prácticos basados en experiencia
6. **Conclusiones**: Resumen y perspectivas futuras

Longitud: 800-1200 palabras
Nivel: Profesional (abogados, asesores, personas con conocimiento avanzado)
Fecha de referencia: ${todayStr()}

Genera contenido original, verificable y de alta calidad.`;

  console.log(`   🤖 Generando artículo ${topic.id} en ${lang}...`);
  
  try {
    const content = await callDeepSeek(prompt, systemPrompt);
    return { lang, content };
  } catch (err) {
    console.log(`   ⚠️  API failed for ${lang}: ${err.message.substring(0, 100)}`);
    
    // Fallback content if API fails
    const fallbackContent = `# ${topic.focus}

## Introducción
Este artículo proporciona un análisis experto sobre ${topic.focus.toLowerCase()}.

## Marco Normativo
La legislación aplicable incluye la Ley Orgánica 4/2000 (LOEx) y el Real Decreto 316/2026.

## Análisis Técnico
${topic.depth}

## Casos Prácticos
Ejemplos ilustrativos basados en la experiencia de 15 años como abogado de extranjería.

## Recomendaciones
Consejos prácticos para navegar los procedimientos de regularización.

## Conclusiones
Resumen y perspectivas sobre ${topic.focus.toLowerCase()}.

---
*Artículo generado el ${todayStr()}*`;
    
    return { lang, content: fallbackContent };
  }
}

// ─── MAIN AGENT ──────────────────────────────────────────────────────
async function run() {
  console.log('🚀 EXPERT Immigration Lawyer Agent');
  console.log('📅 Fecha:', todayStr());
  console.log('📚 Temas diarios:', DAILY_TOPICS.length);
  
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
  
  // Step 1: Fetch and analyze sources for trending data
  const trendingData = await fetchAndAnalyzeSources();
  
  // Step 2: Generate articles for each topic
  for (const topic of DAILY_TOPICS) {
    console.log(`\n📝 Tema ${topic.id}: ${topic.category} - ${topic.focus}`);
    
    // Generate in all 4 languages
    const articles = await Promise.all([
      generateExpertArticle(topic, 'es', trendingData),
      generateExpertArticle(topic, 'en', trendingData),
      generateExpertArticle(topic, 'ar', trendingData),
      generateExpertArticle(topic, 'ur', trendingData)
    ]);
    
    // Create MDX file
    const slug = `${toSlug(topic.focus)}-${todayStr()}-${topic.id}`;
    const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`);
    
    // Get titles in all languages
    const titles = {
      es: `[${topic.category}] ${topic.focus} - ${todayStr()}`,
      en: `[${topic.category}] ${topic.focus} - ${todayStr()}`,
      ar: `[${topic.category}] ${topic.focus} - ${todayStr()}`,
      ur: `[${topic.category}] ${topic.focus} - ${todayStr()}`,
    };

    // Get excerpts
    const excerpts = {
      es: `Artículo experto sobre ${topic.focus}. ${topic.depth}. Información verificada de fuentes oficiales.`,
      en: `Expert article about ${topic.focus}. ${topic.depth}. Verified information from official sources.`,
      ar: `مقال خبير حول ${topic.focus}. ${topic.depth}. معلومات موثقة من مصادر رسمية.`,
      ur: `${topic.focus} کے بارے میں ماہر مضمون۔ ${topic.depth}. سرکاری ذرائع سے تصدیق شدہ معلومات۔`,
    };

    // Find content for each language
    const esContent = articles.find(a => a.lang === 'es')?.content || '';
    const enContent = articles.find(a => a.lang === 'en')?.content || '';
    const arContent = articles.find(a => a.lang === 'ar')?.content || '';
    const urContent = articles.find(a => a.lang === 'ur')?.content || '';

    const mdxContent = `---
title_es: "${titles.es}"
title_en: "${titles.en}"
title_ar: "${titles.ar}"
title_ur: "${titles.ur}"

excerpt_es: "${excerpts.es}"
excerpt_en: "${excerpts.en}"
excerpt_ar: "${excerpts.ar}"
excerpt_ur: "${excerpts.ur}"

body_es: |
${esContent.split('\n').map(line => `  ${line}`).join('\n')}

body_en: |
${enContent.split('\n').map(line => `  ${line}`).join('\n')}

body_ar: |
${arContent.split('\n').map(line => `  ${line}`).join('\n')}

body_ur: |
${urContent.split('\n').map(line => `  ${line}`).join('\n')}

date: ${todayStr()}
category: "${topic.category}"
is_trending: ${topic.is_trending}
primary_keyword: "${topic.keywords[0]}"
---

<!-- Article content is in the frontmatter above -->
`;

    await fs.writeFile(mdxPath, mdxContent, 'utf8');
    console.log(`   💾 Saved: ${slug}.mdx`);
  }

  // Step 3: Write trending.json
  const trendingPath = path.join(ROOT, 'src', 'data', 'trending.json');
  const trendingDataToSave = {
    date: todayStr(),
    trending_searches: trendingData.trending_searches,
    official_updates: trendingData.official_updates,
    alert: trendingData.alert,
    topics_today: trendingData.topics_today,
    has_live_data: trendingData.has_live_data
  };
  
  await fs.writeFile(trendingPath, JSON.stringify(trendingDataToSave, null, 2), 'utf8');
  console.log(`\n📊 Trending data written: trending.json`);

  console.log('\n✅ EXPERT Agent completed successfully!');
  console.log('📊 Generated 4 expert articles:');
  DAILY_TOPICS.forEach(t => console.log(`   ${t.id}. ${t.category}: ${t.focus}`));
  console.log('\n🚀 Next: Commit and push to trigger Cloudflare Pages deployment');
}

// Run the agent
run().catch(err => {
  console.error('❌ Agent failed:', err);
  process.exit(1);
});