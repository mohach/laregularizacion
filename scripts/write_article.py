#!/usr/bin/env python3
"""
LaRegularizacion.es — AI Article Writer
Runs as a GitHub Action. Fetches immigration news, writes unique bilingual
articles (ES + AR) using DeepSeek, saves them as Markdown files.
"""

import os
import sys
import json
import time
import random
import requests
from datetime import datetime, timezone
from pathlib import Path

# ─── Config ───────────────────────────────────────────────
DEEPSEEK_API  = "https://api.deepseek.com/v1/chat/completions"
DEEPSEEK_MODEL = "deepseek-chat"
API_KEY       = os.environ.get("DEEPSEEK_API_KEY", "")
CUSTOM_TOPIC  = os.environ.get("CUSTOM_TOPIC", "").strip()
LANG          = os.environ.get("ARTICLE_LANG", "both")
OUTPUT_DIR    = Path("src/content/articles")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# ─── Topic pool (rotates daily if no custom topic) ────────
TOPICS = [
    {
        "slug": "via-dt5-asilo",
        "title_es": "Cómo solicitar la regularización por la vía DT5: guía para solicitantes de asilo",
        "title_ar": "كيف تتقدم بطلب التسوية عبر المسار DT5: دليل لطالبي اللجوء",
        "category": "guia",
    },
    {
        "slug": "via-dt6-arraigo-laboral",
        "title_es": "Arraigo laboral en DT6: cómo demostrar los 90 días trabajados en España",
        "title_ar": "الاندماج المهني في DT6: كيف تثبت 90 يوم عمل في إسبانيا",
        "category": "guia",
    },
    {
        "slug": "documentos-necesarios",
        "title_es": "Lista completa de documentos para la Regularización Extraordinaria 2026",
        "title_ar": "القائمة الكاملة للوثائق المطلوبة للتسوية الاستثنائية 2026",
        "category": "guia",
    },
    {
        "slug": "derechos-durante-tramitacion",
        "title_es": "Tus derechos durante la tramitación: sanidad, trabajo y suspensión de expulsión",
        "title_ar": "حقوقك أثناء المعالجة: الصحة والعمل وتعليق الترحيل",
        "category": "derechos",
    },
    {
        "slug": "menores-unidad-familiar",
        "title_es": "Regularización de menores de edad y unidad familiar en el RD 316/2026",
        "title_ar": "تسوية القاصرين ووحدة الأسرة في المرسوم الملكي 316/2026",
        "category": "familia",
    },
    {
        "slug": "evitar-estafas",
        "title_es": "Cómo evitar estafas en la regularización: señales de alarma y cómo denunciar",
        "title_ar": "كيف تتجنب الاحتيال في التسوية: علامات التحذير وكيفية الإبلاغ",
        "category": "alerta",
    },
    {
        "slug": "modelo-790-codigo-052",
        "title_es": "Cómo pagar la tasa de extranjería: Modelo 790 Código 052 paso a paso",
        "title_ar": "كيف تدفع رسوم الأجانب: نموذج 790 رمز 052 خطوة بخطوة",
        "category": "tramites",
    },
    {
        "slug": "formulario-ex32-como-rellenar",
        "title_es": "Formulario EX-32: cómo rellenarlo correctamente para no tener errores",
        "title_ar": "استمارة EX-32: كيف تملأها بشكل صحيح لتجنب الأخطاء",
        "category": "tramites",
    },
    {
        "slug": "arraigo-familiar-requisitos",
        "title_es": "Arraigo familiar en la regularización DT6: quién puede ser tu referente",
        "title_ar": "الاندماج العائلي في DT6: من يمكن أن يكون مرجعك العائلي",
        "category": "familia",
    },
    {
        "slug": "renovacion-permiso-tras-regularizacion",
        "title_es": "Cómo renovar el permiso de residencia tras la regularización extraordinaria",
        "title_ar": "كيف تجدد تصريح إقامتك بعد التسوية الاستثنائية",
        "category": "tramites",
    },
    {
        "slug": "vulnerabilidad-social-acreditacion",
        "title_es": "Vulnerabilidad social en DT6: qué es y cómo acreditarla ante Extranjería",
        "title_ar": "الهشاشة الاجتماعية في DT6: ما هي وكيف تُثبتها أمام مكتب الأجانب",
        "category": "guia",
    },
    {
        "slug": "antecedentes-penales-certificado",
        "title_es": "Cómo obtener el certificado de antecedentes penales del país de origen",
        "title_ar": "كيف تحصل على شهادة عدم السوابق الجنائية من بلدك الأصلي",
        "category": "tramites",
    },
    {
        "slug": "noticias-regularizacion-mayo-2026",
        "title_es": "Novedades de la regularización extraordinaria: mayo 2026",
        "title_ar": "مستجدات التسوية الاستثنائية: مايو 2026",
        "category": "noticias",
    },
    {
        "slug": "preguntas-frecuentes-regularizacion",
        "title_es": "30 preguntas frecuentes sobre la Regularización Extraordinaria 2026 respondidas",
        "title_ar": "30 سؤالاً شائعاً حول التسوية الاستثنائية 2026 مع إجاباتها",
        "category": "guia",
    },
]

# ─── Trusted news sources context ─────────────────────────
NEWS_CONTEXT = """
Fuentes de referencia para la Regularización Extraordinaria 2026:
- BOE (Boletín Oficial del Estado) — Real Decreto 316/2026, 5 marzo 2026
- Ministerio de Inclusión, Seguridad Social y Migraciones (inclusion.gob.es)
- Extranjeros.inclusion.gob.es — portal oficial de trámites
- La Moncloa — comunicados oficiales del gobierno
- ACNUR España — información sobre protección internacional
- CEAR (Comisión Española de Ayuda al Refugiado)
- El País — sección de inmigración
- El Mundo — política y sociedad
- Agencia EFE — noticias de última hora

Datos clave verificados del RD 316/2026:
- Plazo de solicitud: hasta el 30 de junio de 2026
- Vía DT5: solicitantes de asilo/protección internacional antes del 1 ene. 2026
- Vía DT6: arraigo laboral (90 días cotizados o contrato de trabajo), familiar o vulnerabilidad social
- Requisito DT6: residencia en España antes del 31 dic. 2025 (mínimo 5 meses acreditables)
- Formulario DT5: EX-31 | Formulario DT6: EX-32
- Tasa: 10,50 € — Modelo 790 Código 052
- Sin cita previa en Oficinas de Extranjería
- Suspende expedientes de expulsión durante tramitación
- Permiso inicial: 1 año con autorización de trabajo inmediata
- Menores: se regularizan simultáneamente con permiso de 5 años
- Organizaciones colaboradoras autorizadas pueden tramitar en nombre del solicitante
"""

# ─── Helpers ──────────────────────────────────────────────
def call_deepseek(system_prompt: str, user_message: str, max_tokens: int = 2500) -> str:
    if not API_KEY:
        print("❌ ERROR: DEEPSEEK_API_KEY secret not set in GitHub repository.")
        sys.exit(1)

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}",
    }
    payload = {
        "model": DEEPSEEK_MODEL,
        "max_tokens": max_tokens,
        "temperature": 0.75,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user",   "content": user_message},
        ],
    }

    for attempt in range(3):
        try:
            r = requests.post(DEEPSEEK_API, headers=headers, json=payload, timeout=90)
            r.raise_for_status()
            return r.json()["choices"][0]["message"]["content"].strip()
        except requests.exceptions.RequestException as e:
            print(f"⚠️  Attempt {attempt+1} failed: {e}")
            if attempt < 2:
                time.sleep(5 * (attempt + 1))
            else:
                raise

def pick_topic() -> dict:
    """Choose today's topic — rotates daily, avoids recently written ones."""
    if CUSTOM_TOPIC:
        day = datetime.now(timezone.utc).day
        return {
            "slug": f"custom-{datetime.now(timezone.utc).strftime('%Y-%m-%d')}",
            "title_es": CUSTOM_TOPIC,
            "title_ar": CUSTOM_TOPIC,
            "category": "especial",
        }
    # Rotate by day-of-year so every day gets a different topic
    doy = datetime.now(timezone.utc).timetuple().tm_yday
    return TOPICS[doy % len(TOPICS)]

def already_written(slug: str) -> bool:
    """Skip if this slug was written in the last 14 days."""
    for f in OUTPUT_DIR.glob(f"*{slug}*.md"):
        return True
    return False

def make_slug(topic: dict) -> str:
    date_str = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    return f"{date_str}-{topic['slug']}"

def generate_article_es(topic: dict) -> str:
    system = f"""Eres un periodista experto en inmigración española con 15 años de experiencia.
Escribes artículos únicos, originales, informativos y accesibles para inmigrantes en España.
Tu audiencia son personas que necesitan entender la Regularización Extraordinaria 2026.

{NEWS_CONTEXT}

INSTRUCCIONES DE ESCRITURA:
- Escribe en español claro y accesible, sin tecnicismos innecesarios
- El artículo debe ser ÚNICO y diferente a otros artículos del blog
- Estructura obligatoria:
  1. Titular (ya dado, úsalo como H1)
  2. Entradilla — 2-3 frases que resumen el valor del artículo
  3. Cuerpo — 5-7 párrafos bien desarrollados con información práctica
  4. Sección "¿Qué debes hacer?" con pasos concretos numerados
  5. Sección "Fuentes oficiales" con los enlaces relevantes
- Longitud: 700-900 palabras
- Usa subtítulos H2 para estructurar el contenido
- Incluye datos concretos: fechas, formularios, importes, plazos
- Escribe en formato Markdown"""

    user = f"Escribe un artículo completo y único sobre: {topic['title_es']}"
    return call_deepseek(system, user, max_tokens=2800)

def generate_article_ar(topic: dict) -> str:
    system = f"""أنت صحفي متخصص في شؤون الهجرة في إسبانيا ومقيم هناك منذ 15 عاماً.
تكتب مقالات فريدة وأصيلة ومعلوماتية وسهلة الفهم للمهاجرين في إسبانيا.
جمهورك أشخاص يحتاجون لفهم التسوية الاستثنائية لعام 2026.

{NEWS_CONTEXT}

تعليمات الكتابة:
- اكتب بالعربية الفصحى السهلة والواضحة
- يجب أن يكون المقال فريداً ومختلفاً عن غيره
- الهيكل الإلزامي:
  1. العنوان (مُعطى، استخدمه كـ H1)
  2. مقدمة — 2-3 جمل تلخص قيمة المقال
  3. الجسم — 5-7 فقرات مطورة بمعلومات عملية
  4. قسم "ماذا يجب أن تفعل؟" بخطوات ملموسة ومرقمة
  5. قسم "المصادر الرسمية" مع الروابط ذات الصلة
- الطول: 700-900 كلمة
- استخدم عناوين H2 لهيكلة المحتوى
- أدرج بيانات محددة: تواريخ، استمارات، مبالغ، مواعيد نهائية
- اكتب بتنسيق Markdown"""

    user = f"اكتب مقالاً كاملاً وفريداً عن: {topic['title_ar']}"
    return call_deepseek(system, user, max_tokens=2800)

def generate_news_summary() -> tuple[str, str]:
    """Generate a short news digest in both languages."""
    system_es = f"""Eres un periodista de guardia que genera boletines de noticias sobre la regularización.
{NEWS_CONTEXT}
Genera un boletín de 3 noticias breves (titular + 2 párrafos cada una) sobre novedades de la regularización.
Fecha de referencia: {datetime.now(timezone.utc).strftime('%B %Y')}. Formato Markdown."""

    system_ar = f"""أنت صحفي يُصدر نشرات إخبارية حول التسوية الاستثنائية في إسبانيا.
{NEWS_CONTEXT}
أنشئ نشرة من 3 أخبار موجزة (عنوان + فقرتان لكل خبر) حول مستجدات التسوية.
تاريخ المرجع: {datetime.now(timezone.utc).strftime('%B %Y')}. تنسيق Markdown."""

    msg = "Genera el boletín de noticias más reciente sobre la regularización extraordinaria 2026."
    msg_ar = "أنشئ أحدث نشرة أخبار حول التسوية الاستثنائية 2026 في إسبانيا."

    es = call_deepseek(system_es, msg, max_tokens=1200)
    time.sleep(2)
    ar = call_deepseek(system_ar, msg_ar, max_tokens=1200)
    return es, ar

def build_frontmatter(topic: dict, lang: str, content_es: str = "", content_ar: str = "") -> str:
    now = datetime.now(timezone.utc)
    return f"""---
title_es: "{topic['title_es']}"
title_ar: "{topic['title_ar']}"
date: "{now.strftime('%Y-%m-%d')}"
category: "{topic['category']}"
lang: "{lang}"
slug: "{topic['slug']}"
generated_by: "DeepSeek AI — LaRegularizacion.es Article Writer"
sources:
  - "https://www.boe.es/boe/dias/2026/03/05/"
  - "https://www.inclusion.gob.es/regularizacion"
  - "https://extranjeros.inclusion.gob.es"
---

"""

def save_article(topic: dict, content_es: str, content_ar: str, file_slug: str):
    """Save bilingual article as a single Markdown file."""
    frontmatter = build_frontmatter(topic, LANG, content_es, content_ar)

    if LANG == "es":
        body = f"# {topic['title_es']}\n\n{content_es}"
    elif LANG == "ar":
        body = f"# {topic['title_ar']}\n\n{content_ar}"
    else:  # both
        body = f"""# {topic['title_es']}

{content_es}

---

<div dir="rtl">

# {topic['title_ar']}

{content_ar}

</div>
"""

    filepath = OUTPUT_DIR / f"{file_slug}.md"
    filepath.write_text(frontmatter + body, encoding="utf-8")
    print(f"✅ Article saved: {filepath}")
    return filepath

# ─── Main ─────────────────────────────────────────────────
def main():
    print(f"\n{'='*50}")
    print(f"✍️  LaRegularizacion.es — AI Article Writer")
    print(f"📅 Date: {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}")
    print(f"🌐 Language: {LANG}")
    print(f"{'='*50}\n")

    topic = pick_topic()
    file_slug = make_slug(topic)

    print(f"📝 Topic (ES): {topic['title_es']}")
    print(f"📝 Topic (AR): {topic['title_ar']}")
    print(f"📂 Category: {topic['category']}")

    if already_written(topic["slug"]):
        print(f"\n⏭️  Already written recently. Generating news digest instead...\n")
        topic = {
            "slug": f"noticias-{datetime.now(timezone.utc).strftime('%Y-%m-%d')}",
            "title_es": f"Boletín de noticias: {datetime.now(timezone.utc).strftime('%d %B %Y')}",
            "title_ar": f"نشرة الأخبار: {datetime.now(timezone.utc).strftime('%d %B %Y')}",
            "category": "noticias",
        }
        file_slug = make_slug(topic)
        es, ar = generate_news_summary()
    else:
        print("\n🇪🇸 Generating Spanish article...")
        es = generate_article_es(topic) if LANG in ("es", "both") else ""

        if LANG == "both":
            print("⏳ Waiting 3s before Arabic generation...")
            time.sleep(3)

        print("🇸🇦 Generating Arabic article...")
        ar = generate_article_ar(topic) if LANG in ("ar", "both") else ""

    print("\n💾 Saving article...")
    saved = save_article(topic, es, ar, file_slug)

    print(f"\n🎉 Done! Article written: {saved}")
    print(f"📊 ES length: {len(es)} chars | AR length: {len(ar)} chars")

if __name__ == "__main__":
    main()
