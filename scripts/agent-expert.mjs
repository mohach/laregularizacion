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