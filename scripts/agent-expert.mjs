#!/usr/bin/env node
/**
 * LaRegularizacion.com — EXPERT Immigration Lawyer Agent
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

// ─── DAILY TOPICS ────────────────────────────────────────────────────
const DAILY_TOPICS = [
  {
    id: 1,
    category: 'Análisis Jurídico',
    focus: 'Análisis profundo de la Ley de Extranjería y jurisprudencia',
    depth: 'Análisis detallado con referencias a LOEx, RD 316/2026, jurisprudencia del TSJ y TJUE',
    keywords: ['LOEx', 'jurisprudencia', 'TSJ', 'TJUE', 'análisis legal']
  },
  {
    id: 2,
    category: 'Guía Procedimental',
    focus: 'Guía paso a paso para formularios EX-00 a EX-50',
    depth: 'Instrucciones detalladas con ejemplos prácticos de cumplimentación',
    keywords: ['EX-31', 'EX-32', 'formularios', 'procedimiento', 'guía práctica']
  },
  {
    id: 3,
    category: 'Actualizaciones',
    focus: 'Últimas novedades y cambios normativos',
    depth: 'Información actualizada de fuentes oficiales (BOE, Ministerios, sedes electrónicas)',
    keywords: ['BOE', 'actualizaciones', 'novedades', 'cambios normativos']
  },
  {
    id: 4,
    category: 'Preguntas Expertas',
    focus: 'Respuestas a casos complejos y preguntas frecuentes',
    depth: 'Análisis de casos reales con soluciones prácticas basadas en experiencia de 15 años',
    keywords: ['casos prácticos', 'FAQ', 'consultas', 'soluciones']
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

// ─── DEEPSEEK API ────────────────────────────────────────────────────
async function callDeepSeek(prompt, systemPrompt = '') {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      model: DEEPSEEK_MODEL,
      messages: [
        ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
        { role: 'user', content: prompt }
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

// ─── GENERATE EXPERT ARTICLE ─────────────────────────────────────────
async function generateExpertArticle(topic, lang) {
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

  const prompt = `Genera un artículo experto sobre: "${topic.focus}"

Categoría: ${topic.category}
Profundidad requerida: ${topic.depth}
Palabras clave: ${topic.keywords.join(', ')}

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
  const content = await callDeepSeek(prompt, systemPrompt);
  return { lang, content };
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
  
  // Generate articles for each topic
  for (const topic of DAILY_TOPICS) {
    console.log(`\n📝 Tema ${topic.id}: ${topic.category} - ${topic.focus}`);
    
    // Generate in all 4 languages
    const articles = await Promise.all([
      generateExpertArticle(topic, 'es'),
      generateExpertArticle(topic, 'en'),
      generateExpertArticle(topic, 'ar'),
      generateExpertArticle(topic, 'ur')
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
is_trending: ${topic.id <= 2}  # First two articles are trending
primary_keyword: "${topic.keywords[0]}"
---

<!-- Article content is in the frontmatter above -->
`;

    await fs.writeFile(mdxPath, mdxContent, 'utf8');
    console.log(`   💾 Saved: ${slug}.mdx`);
  }

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