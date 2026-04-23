// src/data/translations.ts
export type Lang = 'es' | 'en' | 'ar' | 'ur';

export interface Translation {
  lang: Lang;
  dir: 'ltr' | 'rtl';
  htmlLang: string;
  metaTitle: string;
  metaDesc: string;
  ogImage: string;
  keywords: string;

  // Brand
  siteName: string;
  tagline: string;
  unofficial: string;

  // Nav
  nav: {
    home: string; process: string; requirements: string;
    forms: string; checker: string; blog: string; official: string;
    guide: string;
  };

  // Hero
  hero: {
    eyebrow: string; h1: string; h1hl: string;
    sub: string; desc: string;
    ctaForms: string; ctaChecker: string; ctaBlog: string;
  };

  // Countdown
  cd: { title: string; deadline: string; days: string; hours: string; mins: string; secs: string; ended: string; };

  // Stats
  stats: {
    decree: { label: string; sub: string; badge: string };
    deadline: { label: string; sub: string; badge: string };
    permit: { label: string; val: string; sub: string; badge: string };
    fee: { label: string; sub: string; badge: string };
  };

  // Process
  process: {
    tag: string; title: string;
    steps: Array<{ date: string; title: string; body: string; status?: string; type?: string }>;
    citiesTag: string;
    cities: Array<{ name: string; note: string; status: 'open'|'busy'|'wait' }>;
    statusOpen: string; statusBusy: string; statusWait: string;
    contactTag: string;
    phone: { label: string; hours: string };
    web: { label: string; avail: string };
  };

  // Requirements
  reqs: {
    tag: string; title: string; intro: string;
    baseTitle: string; plusTitle: string;
    base: Array<{ num: string; title: string; sub: string; tip?: string }>;
    plus: Array<{ code: string; title: string; sub: string; tip?: string }>;
    asylumTitle: string; asylumBody: string;
    exclTitle: string; excl: string[];
  };

  // Forms
  forms: {
    tag: string; title: string; desc: string;
    cards: Array<{ id: string; title: string; ref: string; desc: string; tags: string[]; btn: string; note: string; color: string; icon: string }>;
    scamTitle: string; scamBody: string;
  };

  // Quiz
  quiz: {
    tag: string; title: string; desc: string;
    label: string; stepOf: string; reset: string;
    resultTitles: { ok: string; fail: string; warn: string };
    resultOk: string;
    questions: Array<{ q: string; hint: string; opts: Array<{ label: string; ok?: true; fail?: string; warn?: string }> }>;
  };

  // FAQ
  faq: { tag: string; title: string; items: Array<{ q: string; a: string }> };

  // Blog
  blog: {
    tag: string; title: string; desc: string;
    readMore: string; publishedOn: string; updatedOn: string;
    sourceLabel: string; noArticles: string;
    backToBlog: string; relatedTitle: string;
    autoUpdated: string; categoryLabel: string;
    trendingTag: string;
  };

  // Footer
  footer: { disclaimer: string; linksTitle: string; langsTitle: string; note: string };
}

// ─── ESPAÑOL ───────────────────────────────────────────────────────────
const es: Translation = {
  lang: 'es', dir: 'ltr', htmlLang: 'es',
  metaTitle: 'LaRegularizacion.com — Guía Independiente Regularización España 2026',
  metaDesc: 'Guía independiente sobre la Regularización Extraordinaria España 2026. RD 316/2026. Formularios EX-31 y EX-32. Noticias actualizadas cada día. Plazo hasta el 30 de junio.',
  ogImage: 'https://laregularizacion.com/og-es.jpg',
  keywords: 'regularización extraordinaria 2026, regularización migrantes españa, EX-31, EX-32, RD 316/2026, cita previa regularizacion, requisitos regularizacion',

  siteName: 'LaRegularizacion',
  tagline: 'Guía independiente · No oficial',
  unofficial: '⚠️ Sitio no oficial · Solo informativo',

  nav: { home: 'Inicio', process: 'Proceso', requirements: 'Requisitos', forms: 'Formularios', checker: 'Verificador', blog: 'Noticias', official: 'Sede oficial →', guide: 'Guía Completa' },

  hero: {
    eyebrow: 'RD 316/2026 · BOE 15 abril · Plazo hasta el 30 junio 2026',
    h1: 'Regularización', h1hl: 'Extraordinaria',
    sub: 'España 2026 — Guía Completa e Independiente',
    desc: 'Todo lo que necesitas saber sobre el proceso de regularización para migrantes en situación irregular. Noticias, formularios y verificador de elegibilidad actualizados cada día.',
    ctaForms: '📄 Descargar formularios', ctaChecker: '¿Soy elegible?', ctaBlog: 'Últimas noticias',
  },

  cd: { title: 'Tiempo restante', deadline: '⏳ Fin: 30 junio 2026', days: 'días', hours: 'horas', mins: 'mins', secs: 'segs', ended: 'Plazo finalizado' },

  stats: {
    decree: { label: 'Decreto', sub: 'En vigor desde 16/04/2026', badge: '✓ ACTIVO' },
    deadline: { label: 'Fecha límite', sub: 'Último día para solicitar', badge: '⚠ URGENTE' },
    permit: { label: 'Autorización', val: 'Residencia + Trabajo', sub: 'Desde el momento de solicitar', badge: '1 año renovable' },
    fee: { label: 'Tasa única', sub: 'Modelo 790 código 052', badge: 'Obligatorio' },
  },

  process: {
    tag: 'Calendario oficial', title: 'Proceso Paso a Paso',
    steps: [
      { date: '14 Abr 2026', title: 'Aprobación en Consejo de Ministros', body: 'El Gobierno aprueba el RD 316/2026, modificando el Reglamento de Extranjería.', type: 'default' },
      { date: '15 Abr 2026', title: 'Publicación en el BOE', body: 'BOE-A-2026-8284. Se publican los formularios EX-31 y EX-32. Apertura de cita previa.', type: 'default' },
      { date: '16 Abr 2026', title: 'Solicitud online abierta 24/7', body: 'Disponible en inclusion.gob.es. Requiere certificado electrónico.', status: '● ABIERTO', type: 'active' },
      { date: '20 Abr 2026', title: 'Solicitud presencial abierta', body: '5 Oficinas Extranjería, 60 Seguridad Social, 371 Correos. Cita previa obligatoria.', status: '● ABIERTO', type: 'active' },
      { date: '30 Jun 2026', title: 'Cierre del plazo', body: 'Fin definitivo del período de solicitudes. Telemática y presencial.', status: '⚠ LÍMITE', type: 'deadline' },
      { date: 'Hasta 3 meses', title: 'Resolución administrativa', body: 'La autorización es válida desde el registro de la solicitud. Silencio = denegación.', type: 'default' },
    ],
    citiesTag: 'Estado por Ciudad',
    cities: [
      { name: 'Madrid', note: 'Alta demanda — espera', status: 'busy' },
      { name: 'Barcelona', note: 'Disponible', status: 'open' },
      { name: 'Valencia', note: 'Menos espera', status: 'open' },
      { name: 'Sevilla', note: 'Disponible', status: 'open' },
      { name: 'Alicante', note: 'Of. Extranjería', status: 'open' },
      { name: 'Almería', note: 'Of. Extranjería', status: 'open' },
      { name: 'Murcia', note: 'Of. Extranjería', status: 'open' },
      { name: 'Bilbao', note: 'Disponible', status: 'open' },
    ],
    statusOpen: '● Abierto', statusBusy: '● Saturado', statusWait: '◌ Espera',
    contactTag: 'Contacto',
    phone: { label: 'Cita e información', hours: 'Lun–Vie 9:30–14h y 16:30–19:30h' },
    web: { label: 'Portal oficial', avail: '24 horas / 7 días' },
  },

  reqs: {
    tag: 'Documentación', title: 'Requisitos y Documentos',
    intro: 'Pasa el cursor sobre cada punto para ver consejos prácticos.',
    baseTitle: 'Requisitos base — todos obligatorios',
    plusTitle: 'Más: al menos 1 de estos 3 criterios',
    base: [
      { num: '1', title: 'En España antes del 01/01/2026', sub: 'Cualquier documento nominativo con fecha anterior: facturas, historial médico, extractos bancarios, registros ONGs...', tip: '💡 El empadronamiento NO es obligatorio. Vale cualquier prueba con tu nombre y fecha anterior.' },
      { num: '2', title: '5 meses ininterrumpidos en España', sub: 'Sin ninguna salida del territorio durante los 5 meses previos a la solicitud.', tip: '⚠️ Cero salidas, ni siquiera breves. Un viaje corto puede invalidar este requisito.' },
      { num: '3', title: 'Mayor de 18 años', sub: 'Solo personas adultas. Los menores tienen procedimientos específicos.' },
      { num: '4', title: 'Sin antecedentes penales graves', sub: 'En España y países de residencia en los últimos 5 años.', tip: '💡 Si el país de origen no responde en 1 mes, presenta el justificante de haber pedido el certificado.' },
      { num: '5', title: 'Pasaporte o documento de viaje', sub: 'Válido o caducado. También vale cédula de inscripción o título de viaje reconocido.', tip: '💡 Un pasaporte caducado es completamente válido. No necesitas renovarlo.' },
      { num: '6', title: 'Sin otras solicitudes en trámite', sub: 'Excepto arraigos presentados antes de la entrada en vigor del decreto.' },
      { num: '7', title: 'Tasa 790 código 052 — 38,28 €', sub: 'Pago en entidad bancaria. Conserva el resguardo original.' },
    ],
    plus: [
      { code: 'A', title: '💼 Arraigo laboral', sub: '90 días trabajados en un año, oferta de trabajo o declaración de autoempleo.' },
      { code: 'B', title: '👨‍👩‍👧 Unidad familiar', sub: 'Hijos menores o con discapacidad, o ascendientes de primer grado conviviendo en España.' },
      { code: 'C', title: '🏘️ Vulnerabilidad social', sub: 'Certificado de servicios sociales u ONG acreditando situación de vulnerabilidad.', tip: '💡 Solicitantes de asilo anteriores al 01/01/2026 están exentos de este criterio.' },
    ],
    asylumTitle: 'Solicitantes de asilo / Protección Internacional',
    asylumBody: 'Si presentaste tu solicitud de asilo <strong>antes del 01/01/2026</strong>, puedes solicitar la regularización <strong>sin renunciar</strong> previamente. Usa el formulario <strong>EX-31</strong>.',
    exclTitle: 'Quiénes NO pueden solicitar',
    excl: ['Personas con residencia o estancia legal vigente', 'Quienes tengan otra solicitud en trámite', 'Personas con orden de expulsión en firme'],
  },

  forms: {
    tag: 'Documentos oficiales', title: 'Formularios para Descargar',
    desc: 'Todos los formularios son completamente gratuitos y están en el portal oficial del Ministerio.',
    cards: [
      { id:'ex31', title:'EX-31', ref:'DA 20ª · Solicitantes Asilo/PI', desc:'Para solicitantes de protección internacional que presentaron su solicitud antes del 01/01/2026.', tags:['Asilo','DA 20ª','PDF rellenable'], btn:'Descargar EX-31', note:'inclusion.gob.es/regularizacion', color:'blue', icon:'📋' },
      { id:'ex32', title:'EX-32', ref:'DA 21ª · Situación Irregular', desc:'Para personas en situación irregular que llegaron a España antes del 01/01/2026.', tags:['Situación irregular','DA 21ª','PDF rellenable'], btn:'Descargar EX-32', note:'inclusion.gob.es/regularizacion', color:'red', icon:'📋' },
      { id:'vuln', title:'Informe Vulnerabilidad', ref:'Certificado para situación especial', desc:'Emitido por servicios sociales u ONGs registradas. Necesario si no tienes arraigo laboral ni familiar.', tags:['Servicios sociales','ONGs'], btn:'Descargar formulario', note:'También en oficinas de servicios sociales', color:'green', icon:'📄' },
      { id:'boe', title:'RD 316/2026 (BOE)', ref:'BOE-A-2026-8284 · Texto completo', desc:'Texto íntegro publicado en el BOE el 15 de abril de 2026. Incluye DA 20ª y DA 21ª.', tags:['Texto legal','BOE','PDF'], btn:'Ver en BOE.es', note:'boe.es', color:'gray', icon:'⚖️' },
      { id:'tasa', title:'Tasa 790 · Código 052', ref:'Pago administrativo — 38,28 €', desc:'Impreso para el pago obligatorio de la tasa. Paga en banco y guarda el resguardo sellado.', tags:['38,28 €','Banco','Obligatorio'], btn:'Obtener impreso', note:'agenciatributaria.gob.es', color:'purple', icon:'💳' },
      { id:'faq', title:'Guía FAQ oficial', ref:'PDF Ministerio de Inclusión', desc:'Documento oficial del Ministerio con las preguntas y respuestas más frecuentes.', tags:['FAQ oficial','PDF'], btn:'Descargar guía', note:'inclusion.gob.es/regularizacion', color:'teal', icon:'❓' },
    ],
    scamTitle: '⚠️ Alerta Anti-Estafas',
    scamBody: '<strong>Todos los formularios son GRATUITOS.</strong> El único pago oficial es la tasa de 38,28 € del modelo 790-052. Nadie puede cobrarte por descargar formularios ni por reservar cita. Usa siempre <strong>inclusion.gob.es/regularizacion</strong> o llama al <strong>060</strong>.',
  },

  quiz: {
    tag: 'Herramienta orientativa', title: '¿Cumples los Requisitos?',
    desc: 'Responde 6 preguntas para saber si probablemente eres elegible. No es asesoramiento jurídico.',
    label: 'Verificador', stepOf: 'de', reset: '↺ Reiniciar',
    resultTitles: { ok: '¡Probablemente eres elegible!', fail: 'Requisito no cumplido', warn: 'Situación a revisar' },
    resultOk: 'Según tus respuestas cumplirías los requisitos. Descarga el formulario EX-31 o EX-32 y solicita en inclusion.gob.es o llama al 060. Confirma siempre con un profesional.',
    questions: [
      { q:'¿Estabas en España antes del 1 de enero de 2026?', hint:'Cualquier documento nominativo con fecha anterior sirve.', opts:[{ label:'✅ Sí, antes del 01/01/2026', ok:true },{ label:'❌ No, llegué después', fail:'El decreto exige presencia antes del 01/01/2026.' }] },
      { q:'¿Llevas 5+ meses en España sin salir del territorio?', hint:'"Ininterrumpida" significa cero salidas, ni viajes cortos.', opts:[{ label:'✅ Sí, 5+ meses sin salir', ok:true },{ label:'⚠️ He salido brevemente', warn:'Cualquier salida puede invalidar el requisito. Consulta un abogado.' },{ label:'❌ Menos de 5 meses', fail:'Necesitas 5 meses continuados en España al solicitar.' }] },
      { q:'¿Eres mayor de 18 años?', hint:'Este proceso es solo para adultos.', opts:[{ label:'✅ Sí, soy mayor de edad', ok:true },{ label:'❌ Soy menor de edad', fail:'Los menores tienen vías específicas. Consulta con una ONG.' }] },
      { q:'¿No tienes antecedentes penales graves?', hint:'En España y países de residencia de los últimos 5 años.', opts:[{ label:'✅ Sin antecedentes', ok:true },{ label:'⏳ Pendiente certificado extranjero', warn:'Puedes pedir con el justificante de haberlo solicitado.' },{ label:'❓ Tengo antecedentes', warn:'Algunos registros cancelables no impiden la solicitud. Consulta un abogado.' }] },
      { q:'¿No tienes otra solicitud de residencia en trámite?', hint:'Excepto arraigos presentados antes de la entrada en vigor del decreto.', opts:[{ label:'✅ Nada en trámite', ok:true },{ label:'📋 Tengo un arraigo pendiente', warn:'Depende de la fecha. Consulta un gestor.' },{ label:'❌ Otra solicitud activa', fail:'No puedes solicitar esta regularización con otra autorización en trámite.' }] },
      { q:'¿Cumples al menos UNO de estos criterios adicionales?', hint:'Solicitantes de asilo (antes de 2026) están exentos de este requisito.', opts:[{ label:'💼 Trabajo / oferta / autoempleo', ok:true },{ label:'👨‍👩‍👧 Familia: menores o dependientes', ok:true },{ label:'🏘️ Vulnerabilidad documentada', ok:true },{ label:'🛡️ Asilo antes de 2026', ok:true },{ label:'❌ Ninguno', fail:'Sin arraigo laboral, familiar, vulnerabilidad ni asilo previo no cumples todos los requisitos. Contacta una ONG.' }] },
    ],
  },

  faq: {
    tag: 'Preguntas frecuentes', title: 'FAQ',
    items: [
      { q:'¿Cuándo puedo presentar la solicitud?', a:'Online: desde el 16 de abril de 2026, disponible 24h/7 días. Presencial con cita previa: desde el 20 de abril. Plazo cierra el 30 de junio de 2026.' },
      { q:'¿Qué formulario necesito: EX-31 o EX-32?', a:'EX-31 si presentaste solicitud de asilo antes del 01/01/2026. EX-32 si estás en situación irregular y llegaste antes del 01/01/2026 sin pedir asilo. En duda, llama al 060.' },
      { q:'¿Sirve mi pasaporte caducado?', a:'Sí, expresamente. El RD 316/2026 admite pasaporte en vigor o caducado.' },
      { q:'¿Puedo trabajar mientras espero la resolución?', a:'Sí. La autorización de trabajo es válida desde el momento en que registras tu solicitud.' },
      { q:'¿Qué documentos prueban los 5 meses de estancia?', a:'Cualquier documento nominativo con fecha: facturas, historial médico, extractos bancarios, abonos transporte, contratos alquiler, nóminas, registros ONGs...' },
      { q:'¿El empadronamiento es obligatorio?', a:'No. Puede usarse como prueba pero no es el único documento válido ni es obligatorio.' },
      { q:'¿Incluye a los familiares?', a:'Sí, puedes solicitar conjuntamente con pareja y ascendientes de primer grado.' },
      { q:'¿Cuánto dura el permiso?', a:'1 año renovable. Válido para trabajar en cualquier sector y parte de España.' },
    ],
  },

  blog: {
    tag: 'Actualización automática diaria',
    title: 'Noticias y Actualizaciones',
    desc: 'Información extraída cada día de fuentes oficiales y medios de confianza mediante IA.',
    readMore: 'Leer más →',
    publishedOn: 'Publicado el',
    updatedOn: 'Actualizado el',
    sourceLabel: 'Fuente',
    noArticles: 'Aún no hay artículos. El agente publicará su primer resumen pronto.',
    backToBlog: '← Volver a Noticias',
    relatedTitle: 'Artículos relacionados',
    autoUpdated: 'Información verificada de fuentes oficiales',
    categoryLabel: 'Categoría',
    trendingTag: '🔥 Tendencia',
  },

  footer: {
    disclaimer: 'LaRegularizacion.com es un sitio independiente de información. NO está afiliado ni avalado por el Gobierno de España ni por el Ministerio de Inclusión. Toda la información proviene de fuentes públicas y oficiales (BOE, inclusion.gob.es). Consulte siempre la fuente oficial.',
    linksTitle: 'Fuentes oficiales',
    langsTitle: 'Idiomas',
    note: '⚠️ Sitio no oficial · LaRegularizacion.com · RD 316/2026 · BOE 15/04/2026 · Actualizado diariamente · © 2026',
  },
};

// ─── ENGLISH ──────────────────────────────────────────────────────────
const en: Translation = {
  lang: 'en', dir: 'ltr', htmlLang: 'en',
  metaTitle: 'LaRegularizacion.com — Spain Extraordinary Regularization 2026 Guide',
  metaDesc: 'Independent guide to Spain\'s Extraordinary Regularization 2026. RD 316/2026. EX-31 and EX-32 forms. Daily news updates. Deadline: June 30.',
  ogImage: 'https://laregularizacion.com/og-en.jpg',
  keywords: 'spain regularization 2026, extraordinary regularization spain, EX-31, EX-32, RD 316/2026, immigration spain 2026',

  siteName: 'LaRegularizacion',
  tagline: 'Independent guide · Unofficial',
  unofficial: '⚠️ Unofficial site · For information only',

  nav: { home: 'Home', process: 'Process', requirements: 'Requirements', forms: 'Forms', checker: 'Checker', blog: 'News', official: 'Official site →', guide: 'Full Guide' },

  hero: {
    eyebrow: 'RD 316/2026 · BOE April 15 · Deadline: June 30, 2026',
    h1: 'Spain', h1hl: 'Regularization',
    sub: '2026 — Complete Independent Guide',
    desc: 'Everything you need to know about the extraordinary regularization process for undocumented migrants in Spain. Daily news, forms and eligibility checker.',
    ctaForms: '📄 Download forms', ctaChecker: 'Am I eligible?', ctaBlog: 'Latest news',
  },

  cd: { title: 'Time remaining', deadline: '⏳ Deadline: June 30, 2026', days: 'days', hours: 'hours', mins: 'mins', secs: 'secs', ended: 'Period ended' },

  stats: {
    decree: { label: 'Decree', sub: 'In force since 16/04/2026', badge: '✓ ACTIVE' },
    deadline: { label: 'Deadline', sub: 'Last day to apply', badge: '⚠ URGENT' },
    permit: { label: 'Authorization', val: 'Residence + Work', sub: 'Valid from moment of application', badge: '1 year renewable' },
    fee: { label: 'Official fee', sub: 'Form 790, code 052', badge: 'Required' },
  },

  process: {
    tag: 'Official timeline', title: 'Step-by-Step Process',
    steps: [
      { date: 'Apr 14, 2026', title: 'Approved by Cabinet', body: 'Government approves RD 316/2026, amending the Foreigners\' Regulations.', type: 'default' },
      { date: 'Apr 15, 2026', title: 'Published in BOE', body: 'BOE-A-2026-8284. EX-31 and EX-32 forms published. Appointment booking opens.', type: 'default' },
      { date: 'Apr 16, 2026', title: 'Online applications open 24/7', body: 'Available at inclusion.gob.es. Digital certificate required.', status: '● OPEN', type: 'active' },
      { date: 'Apr 20, 2026', title: 'In-person applications open', body: '5 Foreigners\' Offices, 60 Social Security, 371 Correos. Prior appointment mandatory.', status: '● OPEN', type: 'active' },
      { date: 'Jun 30, 2026', title: 'Applications close', body: 'End of the application period for both online and in-person.', status: '⚠ DEADLINE', type: 'deadline' },
      { date: 'Up to 3 months', title: 'Administrative decision', body: 'Authorization valid from registration. Silence = denial.', type: 'default' },
    ],
    citiesTag: 'Status by City',
    cities: [
      { name: 'Madrid', note: 'High demand — wait', status: 'busy' },
      { name: 'Barcelona', note: 'Available', status: 'open' },
      { name: 'Valencia', note: 'Shorter wait', status: 'open' },
      { name: 'Seville', note: 'Available', status: 'open' },
      { name: 'Alicante', note: 'Foreigners\' Office', status: 'open' },
      { name: 'Almería', note: 'Foreigners\' Office', status: 'open' },
      { name: 'Murcia', note: 'Foreigners\' Office', status: 'open' },
      { name: 'Bilbao', note: 'Available', status: 'open' },
    ],
    statusOpen: '● Open', statusBusy: '● Full', statusWait: '◌ Wait',
    contactTag: 'Contact',
    phone: { label: 'Appointments & info', hours: 'Mon–Fri 9:30–14h & 16:30–19:30h' },
    web: { label: 'Official portal', avail: '24 hours / 7 days' },
  },

  reqs: {
    tag: 'Documentation', title: 'Requirements & Documents',
    intro: 'Hover over each item for practical tips.',
    baseTitle: 'Base requirements — all mandatory',
    plusTitle: 'Plus: at least 1 of these 3 criteria',
    base: [
      { num: '1', title: 'In Spain before 01/01/2026', sub: 'Any nominative document with a prior date: bills, medical records, bank statements, NGO records...', tip: '💡 Municipal registration is NOT required. Any document with your name and a date works.' },
      { num: '2', title: '5 months uninterrupted stay', sub: 'No departures from Spain during the 5 months before application.', tip: '⚠️ Zero departures, even brief ones. Any trip may invalidate this requirement.' },
      { num: '3', title: 'Over 18 years old', sub: 'Adults only. Minors have separate procedures.' },
      { num: '4', title: 'No serious criminal record', sub: 'In Spain and countries of residence in the last 5 years.', tip: '💡 If your country doesn\'t respond within 1 month, submit proof of having requested the certificate.' },
      { num: '5', title: 'Passport or travel document', sub: 'Valid or expired. Registration certificate or recognized travel document also accepted.', tip: '💡 An expired passport is completely valid. No need to renew it before applying.' },
      { num: '6', title: 'No other application in process', sub: 'Except arraigos submitted before the decree came into force.' },
      { num: '7', title: 'Tax form 790, code 052 — €38.28', sub: 'Payment at an authorized bank. Keep the stamped receipt.' },
    ],
    plus: [
      { code: 'A', title: '💼 Work ties', sub: '90 days worked in a year, job offer, or self-employment declaration.' },
      { code: 'B', title: '👨‍👩‍👧 Family unit', sub: 'Minor or disabled children, or first-degree relatives cohabiting in Spain.' },
      { code: 'C', title: '🏘️ Social vulnerability', sub: 'Certificate from social services or registered NGO.', tip: '💡 Asylum applicants (before 01/01/2026) are exempt from this additional criterion.' },
    ],
    asylumTitle: 'Asylum / International Protection applicants',
    asylumBody: 'If you applied for asylum <strong>before 01/01/2026</strong>, you can apply for regularization <strong>without withdrawing</strong> your asylum claim. Use form <strong>EX-31</strong>.',
    exclTitle: 'Who CANNOT apply',
    excl: ['People with valid legal residence or stay', 'Those with another application in process', 'People with a firm expulsion order'],
  },

  forms: {
    tag: 'Official documents', title: 'Forms to Download',
    desc: 'All forms are completely free and available at the official Ministry portal.',
    cards: [
      { id:'ex31', title:'Form EX-31', ref:'DA 20ª · Asylum/IP Applicants', desc:'For international protection applicants who applied before 01/01/2026.', tags:['Asylum','DA 20ª','Fillable PDF'], btn:'Download EX-31', note:'inclusion.gob.es/regularizacion', color:'blue', icon:'📋' },
      { id:'ex32', title:'Form EX-32', ref:'DA 21ª · Irregular Situation', desc:'For people in irregular situation who arrived in Spain before 01/01/2026.', tags:['Irregular','DA 21ª','Fillable PDF'], btn:'Download EX-32', note:'inclusion.gob.es/regularizacion', color:'red', icon:'📋' },
      { id:'vuln', title:'Vulnerability Report', ref:'Certificate for special circumstances', desc:'Issued by social services or registered NGOs. Needed without work or family ties.', tags:['Social services','NGOs'], btn:'Download form', note:'Also at local social services offices', color:'green', icon:'📄' },
      { id:'boe', title:'RD 316/2026 (BOE)', ref:'BOE-A-2026-8284 · Full legal text', desc:'Complete text published in the BOE on April 15, 2026.', tags:['Legal text','BOE','PDF'], btn:'View on BOE.es', note:'boe.es', color:'gray', icon:'⚖️' },
      { id:'tasa', title:'Tax Form 790 · Code 052', ref:'Official payment — €38.28', desc:'Mandatory administrative fee form. Pay at a bank and keep the stamped receipt.', tags:['€38.28','Bank','Required'], btn:'Get form 790', note:'agenciatributaria.gob.es', color:'purple', icon:'💳' },
      { id:'faq', title:'Official FAQ Guide', ref:'Ministry of Inclusion · PDF', desc:'Official Ministry document with the most common questions and answers.', tags:['Official FAQ','PDF'], btn:'Download guide', note:'inclusion.gob.es/regularizacion', color:'teal', icon:'❓' },
    ],
    scamTitle: '⚠️ Scam Warning',
    scamBody: '<strong>All forms are FREE.</strong> The only official payment is the €38.28 fee on form 790-052. No one can charge you for forms or appointments. Always use <strong>inclusion.gob.es/regularizacion</strong> or call <strong>060</strong>.',
  },

  quiz: {
    tag: 'Eligibility tool', title: 'Do You Meet the Requirements?',
    desc: 'Answer 6 questions to check if you are likely eligible. Not legal advice.',
    label: 'Eligibility checker', stepOf: 'of', reset: '↺ Restart',
    resultTitles: { ok: 'You are likely eligible!', fail: 'Requirement not met', warn: 'Situation to review' },
    resultOk: 'Based on your answers you appear to meet the requirements. Download EX-31 or EX-32 and apply at inclusion.gob.es or call 060. Always confirm with a professional.',
    questions: [
      { q:'Were you in Spain before January 1, 2026?', hint:'Any nominative document with a prior date works.', opts:[{ label:'✅ Yes, before 01/01/2026', ok:true },{ label:'❌ No, I arrived later', fail:'The decree requires presence before 01/01/2026.' }] },
      { q:'Have you been in Spain for 5+ months without leaving?', hint:'"Uninterrupted" means zero departures, not even brief trips.', opts:[{ label:'✅ Yes, 5+ months without leaving', ok:true },{ label:'⚠️ I left briefly', warn:'Any departure may invalidate the requirement. Consult a lawyer.' },{ label:'❌ Less than 5 months', fail:'You need 5 continuous months in Spain at the time of application.' }] },
      { q:'Are you 18 years or older?', hint:'This process is for adults only.', opts:[{ label:'✅ Yes, I am an adult', ok:true },{ label:'❌ I am a minor', fail:'Minors have specific pathways. Contact an NGO.' }] },
      { q:'Do you have no serious criminal record?', hint:'In Spain and countries of residence in the last 5 years.', opts:[{ label:'✅ No criminal record', ok:true },{ label:'⏳ Awaiting foreign certificate', warn:'You can apply with proof of having requested it.' },{ label:'❓ I have a record', warn:'Some cancellable records don\'t disqualify you. Consult a specialist lawyer.' }] },
      { q:'Do you have no other residence application in process?', hint:'Except arraigos submitted before the decree came into force.', opts:[{ label:'✅ Nothing in process', ok:true },{ label:'📋 I have an arraigo pending', warn:'Depends on when it was submitted. Consult an advisor.' },{ label:'❌ Another active application', fail:'You cannot apply while another authorization is in process.' }] },
      { q:'Do you meet at least ONE of these additional criteria?', hint:'Asylum applicants (before 2026) are exempt from this.', opts:[{ label:'💼 Work / job offer / self-employment', ok:true },{ label:'👨‍👩‍👧 Family: minors or dependants', ok:true },{ label:'🏘️ Documented vulnerability', ok:true },{ label:'🛡️ Asylum before 2026', ok:true },{ label:'❌ None of the above', fail:'Without work, family, vulnerability or prior asylum you don\'t fully qualify. Contact an NGO.' }] },
    ],
  },

  faq: {
    tag: 'Frequently asked questions', title: 'FAQ',
    items: [
      { q:'When can I apply?', a:'Online: from April 16, 2026, available 24/7. In-person with prior appointment: from April 20. Deadline: June 30, 2026.' },
      { q:'Which form: EX-31 or EX-32?', a:'EX-31 if you applied for asylum before 01/01/2026. EX-32 if irregular situation and arrived before 01/01/2026 without applying for asylum. When in doubt call 060.' },
      { q:'Can I use an expired passport?', a:'Yes, explicitly. RD 316/2026 accepts valid or expired passports.' },
      { q:'Can I work while waiting for the decision?', a:'Yes. The work authorization is valid from the moment you register your application.' },
      { q:'What documents prove my 5-month stay?', a:'Any nominative document with a date: utility bills, medical records, bank statements, transport passes, rental contracts, payslips, NGO records...' },
      { q:'Is municipal registration required?', a:'No. It can be used as one of several proof documents, but is not mandatory.' },
      { q:'Does this cover family members?', a:'Yes, you can apply jointly with a partner and first-degree relatives.' },
      { q:'How long does the permit last?', a:'1 year, renewable. Valid for work in any sector across Spain.' },
    ],
  },

  blog: {
    tag: 'Daily AI updates',
    title: 'News & Updates',
    desc: 'Information extracted daily from official sources and trusted media using AI.',
    readMore: 'Read more →',
    publishedOn: 'Published on',
    updatedOn: 'Updated on',
    sourceLabel: 'Source',
    noArticles: 'No articles yet. The agent will publish its first digest soon.',
    backToBlog: '← Back to News',
    relatedTitle: 'Related articles',
    autoUpdated: 'Verified information from official sources',
    categoryLabel: 'Category',
    trendingTag: '🔥 Trending',
  },

  footer: {
    disclaimer: 'LaRegularizacion.com is an independent information site. NOT affiliated with or endorsed by the Spanish Government or the Ministry of Inclusion. All information comes from public official sources (BOE, inclusion.gob.es). Always consult the official source.',
    linksTitle: 'Official sources',
    langsTitle: 'Languages',
    note: '⚠️ Unofficial site · LaRegularizacion.com · RD 316/2026 · BOE 15/04/2026 · Updated daily · © 2026',
  },
};

// ─── ARABIC ───────────────────────────────────────────────────────────
const ar: Translation = {
  lang: 'ar', dir: 'rtl', htmlLang: 'ar',
  metaTitle: 'التسوية.com — دليل التسوية الاستثنائية لأوضاع المهاجرين في إسبانيا 2026',
  metaDesc: 'دليل مستقل شامل حول التسوية الاستثنائية 2026 في إسبانيا. المرسوم 316/2026. استمارتا EX-31 وEX-32. أخبار يومية محدّثة. الموعد النهائي: 30 يونيو.',
  ogImage: 'https://laregularizacion.com/og-ar.jpg',
  keywords: 'تسوية استثنائية إسبانيا 2026, تسوية المهاجرين إسبانيا, EX-31, EX-32, مرسوم 316/2026, تأشيرة إقامة إسبانيا',

  siteName: 'التسوية',
  tagline: 'دليل مستقل · غير رسمي',
  unofficial: '⚠️ موقع غير رسمي · للأغراض المعلوماتية فقط',

  nav: { home: 'الرئيسية', process: 'الإجراءات', requirements: 'الشروط', forms: 'الاستمارات', checker: 'التحقق', blog: 'الأخبار', official: 'البوابة الرسمية ←', guide: 'الدليل الكامل' },

  hero: {
    eyebrow: 'المرسوم 316/2026 · الجريدة الرسمية 15 أبريل · الموعد النهائي: 30 يونيو 2026',
    h1: 'تسوية', h1hl: 'استثنائية',
    sub: 'إسبانيا 2026 — دليل مستقل ومتكامل',
    desc: 'كل ما تحتاج معرفته حول عملية تسوية أوضاع المهاجرين غير النظاميين في إسبانيا. أخبار يومية، استمارات ومحقق الأهلية، جميعها تُحدَّث يومياً.',
    ctaForms: '📄 تحميل الاستمارات', ctaChecker: 'هل أنا مؤهل؟', ctaBlog: 'آخر الأخبار',
  },

  cd: { title: 'الوقت المتبقي', deadline: '⏳ الموعد النهائي: 30 يونيو 2026', days: 'أيام', hours: 'ساعات', mins: 'دقائق', secs: 'ثواني', ended: 'انتهى الموعد' },

  stats: {
    decree: { label: 'المرسوم', sub: 'ساري منذ 16/04/2026', badge: '✓ فعّال' },
    deadline: { label: 'الموعد النهائي', sub: 'آخر يوم لتقديم الطلب', badge: '⚠ عاجل' },
    permit: { label: 'الإذن الممنوح', val: 'إقامة + عمل', sub: 'يسري من لحظة تسجيل الطلب', badge: 'سنة قابلة للتجديد' },
    fee: { label: 'الرسوم الرسمية', sub: 'نموذج 790، الرمز 052', badge: 'إلزامي' },
  },

  process: {
    tag: 'الجدول الزمني الرسمي', title: 'الإجراءات خطوة بخطوة',
    steps: [
      { date: '14 أبريل 2026', title: 'الموافقة في مجلس الوزراء', body: 'وافقت الحكومة على المرسوم الملكي 316/2026، معدِّلةً لوائح الأجانب.', type: 'default' },
      { date: '15 أبريل 2026', title: 'النشر في الجريدة الرسمية', body: 'BOE-A-2026-8284. نشر استمارتَي EX-31 و EX-32. فتح نظام حجز المواعيد.', type: 'default' },
      { date: '16 أبريل 2026', title: 'فتح التقديم الإلكتروني 24 ساعة', body: 'يمكن التقديم على مدار الساعة عبر inclusion.gob.es. يشترط توقيع إلكتروني.', status: '● مفتوح', type: 'active' },
      { date: '20 أبريل 2026', title: 'فتح التقديم الحضوري', body: '5 مكاتب أجانب، 60 ضمان اجتماعي، 371 مكتب بريد. موعد مسبق إلزامي.', status: '● مفتوح', type: 'active' },
      { date: '30 يونيو 2026', title: 'إغلاق باب التقديم', body: 'نهاية فترة تقديم الطلبات إلكترونياً وحضورياً.', status: '⚠ الموعد النهائي', type: 'deadline' },
      { date: 'حتى 3 أشهر', title: 'البت الإداري في الطلبات', body: 'الإذن يسري من لحظة التسجيل. الصمت الإداري يعني الرفض.', type: 'default' },
    ],
    citiesTag: 'الحالة حسب المدينة',
    cities: [
      { name: 'مدريد', note: 'طلب مرتفع — انتظار', status: 'busy' },
      { name: 'برشلونة', note: 'متاح', status: 'open' },
      { name: 'بلنسية', note: 'انتظار أقل', status: 'open' },
      { name: 'إشبيلية', note: 'متاح', status: 'open' },
      { name: 'أليكانتي', note: 'مكتب أجانب', status: 'open' },
      { name: 'ألميريا', note: 'مكتب أجانب', status: 'open' },
      { name: 'مورسية', note: 'مكتب أجانب', status: 'open' },
      { name: 'بيلباو', note: 'متاح', status: 'open' },
    ],
    statusOpen: '● مفتوح', statusBusy: '● مكتظ', statusWait: '◌ انتظار',
    contactTag: 'التواصل',
    phone: { label: 'الحجز والمعلومات', hours: 'الاثنين–الجمعة 9:30–14:00 و16:30–19:30' },
    web: { label: 'البوابة الرسمية', avail: '24 ساعة / 7 أيام' },
  },

  reqs: {
    tag: 'الوثائق المطلوبة', title: 'الشروط والوثائق المطلوبة',
    intro: 'مرِّر المؤشر فوق كل نقطة للاطلاع على نصائح عملية.',
    baseTitle: 'الشروط الأساسية — جميعها إلزامية',
    plusTitle: 'بالإضافة إلى: أحد هذه المعايير الثلاثة',
    base: [
      { num: '١', title: 'الوجود في إسبانيا قبل 01/01/2026', sub: 'أي وثيقة اسمية بتاريخ سابق: فواتير، تقارير طبية، كشوف حساب، سجلات منظمات...', tip: '💡 التسجيل البلدي غير إلزامي. أي وثيقة تحمل اسمك وتاريخاً سابقاً كافية.' },
      { num: '٢', title: 'إقامة متواصلة 5 أشهر في إسبانيا', sub: 'دون أي مغادرة لإسبانيا خلال الأشهر الخمسة السابقة للتقديم.', tip: '⚠️ صفر مغادرات، حتى الرحلات القصيرة. أي سفر قد يُبطل هذا الشرط.' },
      { num: '٣', title: 'بلوغ 18 عاماً فأكثر', sub: 'للبالغين فقط. للقاصرين إجراءات مخصصة.' },
      { num: '٤', title: 'عدم وجود سوابق جنائية خطيرة', sub: 'في إسبانيا والدول التي أقمت فيها خلال السنوات الخمس الماضية.', tip: '💡 إذا لم يرد بلد الأصل خلال شهر، قدّم إثبات طلب الشهادة مع تصريح بالمسؤولية.' },
      { num: '٥', title: 'جواز سفر أو وثيقة سفر', sub: 'سارياً أو منتهي الصلاحية. كذلك تصلح وثيقة التسجيل القنصلي.', tip: '💡 جواز السفر المنتهي الصلاحية مقبول تماماً. لا داعي لتجديده.' },
      { num: '٦', title: 'عدم وجود طلب إقامة آخر قيد المعالجة', sub: 'باستثناء طلبات الاندماج المقدمة قبل دخول المرسوم حيز التنفيذ.' },
      { num: '٧', title: 'رسوم نموذج 790 الرمز 052 — 38.28 يورو', sub: 'الدفع في بنك معتمد. احتفظ بالإيصال الأصلي المختوم.' },
    ],
    plus: [
      { code: 'أ', title: '💼 الاندماج المهني', sub: '90 يوم عمل في السنة، عرض عمل، أو تصريح بنية العمل لحسابك الخاص.' },
      { code: 'ب', title: '👨‍👩‍👧 الوحدة العائلية', sub: 'أطفال قاصرون أو بالغون ذوو إعاقة، أو أقارب من الدرجة الأولى تتشارك معهم السكن في إسبانيا.' },
      { code: 'ج', title: '🏘️ الهشاشة الاجتماعية', sub: 'شهادة من الخدمات الاجتماعية أو منظمة غير حكومية مسجلة.', tip: '💡 طالبو اللجوء (قبل 01/01/2026) معفيون من هذا المعيار الإضافي.' },
    ],
    asylumTitle: 'طالبو الحماية الدولية (اللجوء)',
    asylumBody: 'إذا تقدّمت بطلب لجوء <strong>قبل 01/01/2026</strong>، يمكنك التقديم على التسوية <strong>دون التنازل</strong> عن طلبك. استخدم الاستمارة <strong>EX-31</strong>.',
    exclTitle: 'من لا يحق لهم التقديم',
    excl: ['من يملكون إقامة أو تأشيرة سارية', 'من لديهم طلب إقامة آخر قيد المعالجة', 'من صدر بحقهم قرار ترحيل نهائي'],
  },

  forms: {
    tag: 'الوثائق الرسمية', title: 'الاستمارات للتحميل',
    desc: 'جميع الاستمارات مجانية تماماً وموجودة على البوابة الرسمية للوزارة.',
    cards: [
      { id:'ex31', title:'استمارة EX-31', ref:'التشريع الإضافي 20 · طالبو الحماية الدولية', desc:'لطالبي اللجوء الذين قدّموا طلبهم قبل 01/01/2026.', tags:['اللجوء','DA 20ª','PDF قابل للتعبئة'], btn:'تحميل EX-31', note:'inclusion.gob.es/regularizacion', color:'blue', icon:'📋' },
      { id:'ex32', title:'استمارة EX-32', ref:'التشريع الإضافي 21 · الوضع غير النظامي', desc:'للأشخاص في وضع غير نظامي وصلوا إلى إسبانيا قبل 01/01/2026.', tags:['وضع غير نظامي','DA 21ª','PDF قابل للتعبئة'], btn:'تحميل EX-32', note:'inclusion.gob.es/regularizacion', color:'red', icon:'📋' },
      { id:'vuln', title:'تقرير الهشاشة الاجتماعية', ref:'شهادة للأوضاع الاستثنائية', desc:'يصدره الضمان الاجتماعي أو المنظمات غير الحكومية المسجلة.', tags:['الخدمات الاجتماعية','المنظمات'], btn:'تحميل الاستمارة', note:'أيضاً في مكاتب الخدمات الاجتماعية البلدية', color:'green', icon:'📄' },
      { id:'boe', title:'المرسوم 316/2026 (BOE)', ref:'BOE-A-2026-8284 · النص القانوني الكامل', desc:'النص الكامل المنشور في الجريدة الرسمية بتاريخ 15 أبريل 2026.', tags:['النص القانوني','الجريدة الرسمية','PDF'], btn:'مشاهدة في BOE.es', note:'boe.es', color:'gray', icon:'⚖️' },
      { id:'tasa', title:'نموذج الرسوم 790 · الرمز 052', ref:'الدفع الإداري الرسمي — 38.28 يورو', desc:'نموذج الدفع الإلزامي للرسوم. يُدفع في البنك ويحتفظ بالإيصال.', tags:['38.28 يورو','دفع بنكي','إلزامي'], btn:'الحصول على نموذج 790', note:'agenciatributaria.gob.es', color:'purple', icon:'💳' },
      { id:'faq', title:'دليل الأسئلة الشائعة (PDF)', ref:'وزارة الإدماج الاجتماعي · وثيقة رسمية', desc:'وثيقة رسمية من الوزارة تجمع أبرز الأسئلة والأجوبة.', tags:['أسئلة رسمية','PDF الوزارة'], btn:'تحميل دليل الأسئلة', note:'inclusion.gob.es/regularizacion', color:'teal', icon:'❓' },
    ],
    scamTitle: '⚠️ تحذير من الاحتيال',
    scamBody: '<strong>جميع الاستمارات مجانية تماماً.</strong> الدفع الرسمي الوحيد هو 38.28 يورو بموجب نموذج 790-052. لا تدفع لأحد مقابل تحميل استمارات أو حجز مواعيد. استخدم دائماً <strong>inclusion.gob.es/regularizacion</strong> أو اتصل بـ <strong>060</strong>.',
  },

  quiz: {
    tag: 'أداة توجيهية', title: 'هل تستوفي الشروط؟',
    desc: 'أجب على 6 أسئلة لمعرفة ما إذا كنت مؤهلاً على الأرجح. ليست استشارة قانونية.',
    label: 'أداة التحقق من الأهلية', stepOf: 'من', reset: '↺ إعادة البدء',
    resultTitles: { ok: 'يبدو أنك مؤهل!', fail: 'شرط غير مستوفى', warn: 'وضع يستوجب المراجعة' },
    resultOk: 'بناءً على إجاباتك تستوفي على الأرجح شروط المرسوم. حمِّل الاستمارة المناسبة (EX-31 أو EX-32) وقدِّم طلبك عبر inclusion.gob.es أو الاتصال بـ 060. استشر دائماً متخصصاً.',
    questions: [
      { q:'هل كنت موجوداً في إسبانيا قبل الأول من يناير 2026؟', hint:'تحتاج إلى أي وثيقة اسمية بتاريخ سابق لهذا التاريخ.', opts:[{ label:'✅ نعم، قبل 01/01/2026', ok:true },{ label:'❌ لا، وصلت بعد ذلك', fail:'يشترط المرسوم الوجود في إسبانيا قبل 01/01/2026.' }] },
      { q:'هل أمضيت 5 أشهر أو أكثر في إسبانيا دون مغادرة البلاد؟', hint:'"متواصلة" تعني صفر مغادرات، حتى الرحلات القصيرة.', opts:[{ label:'✅ نعم، 5 أشهر أو أكثر', ok:true },{ label:'⚠️ غادرت مؤقتاً', warn:'أي مغادرة قد تُبطل الشرط. استشر محامياً.' },{ label:'❌ أقل من 5 أشهر', fail:'يجب الإقامة 5 أشهر متواصلة حتى تاريخ التقديم.' }] },
      { q:'هل بلغت 18 عاماً من عمرك؟', hint:'هذا الإجراء مخصص للبالغين فقط.', opts:[{ label:'✅ نعم، أنا بالغ', ok:true },{ label:'❌ أنا قاصر', fail:'للقاصرين مسارات خاصة. تواصل مع منظمة غير حكومية.' }] },
      { q:'هل أنت خالٍ من السوابق الجنائية الخطيرة؟', hint:'في إسبانيا والدول التي أقمت فيها خلال السنوات الخمس الماضية.', opts:[{ label:'✅ لا توجد سوابق', ok:true },{ label:'⏳ في انتظار الشهادة من الخارج', warn:'يمكنك التقديم مع إثبات طلب الشهادة.' },{ label:'❓ لديّ سوابق', warn:'بعض السوابق القابلة للإلغاء لا تحول دون التقديم. استشر متخصصاً.' }] },
      { q:'هل لديك طلب إقامة آخر قيد المعالجة؟', hint:'باستثناء طلبات الاندماج المقدمة قبل دخول المرسوم حيز التنفيذ.', opts:[{ label:'✅ لا يوجد شيء قيد المعالجة', ok:true },{ label:'📋 لديّ طلب اندماج معلّق', warn:'يتوقف الأمر على تاريخ التقديم. استشر مختصاً.' },{ label:'❌ لديّ طلب آخر نشط', fail:'لا يمكن التقديم مع وجود طلب إقامة آخر قيد المعالجة.' }] },
      { q:'هل تستوفي واحداً على الأقل من هذه المعايير الإضافية؟', hint:'طالبو اللجوء قبل 2026 معفيون من هذا الشرط.', opts:[{ label:'💼 عمل / عرض عمل / نشاط مستقل', ok:true },{ label:'👨‍👩‍👧 وحدة عائلية', ok:true },{ label:'🏘️ هشاشة اجتماعية موثقة', ok:true },{ label:'🛡️ طلب لجوء قبل 2026', ok:true },{ label:'❌ لا شيء مما سبق', fail:'دون اندماج مهني أو عائلي أو هشاشة موثقة أو لجوء سابق لا تستوفي كامل الشروط. تواصل مع منظمة دعم.' }] },
    ],
  },

  faq: {
    tag: 'الأسئلة الشائعة', title: 'الأسئلة والأجوبة',
    items: [
      { q:'متى يمكنني تقديم الطلب؟', a:'إلكترونياً: اعتباراً من 16 أبريل 2026، 24 ساعة يومياً. حضورياً بموعد مسبق إلزامي: اعتباراً من 20 أبريل. يُغلق الباب في 30 يونيو 2026.' },
      { q:'أي استمارة تناسبني: EX-31 أم EX-32؟', a:'EX-31 إذا كنت طالب لجوء قدّمت طلبك قبل 01/01/2026. EX-32 إذا كنت في وضع غير نظامي ووصلت قبل 01/01/2026 دون طلب لجوء. في الشك اتصل بـ 060.' },
      { q:'هل جواز السفر المنتهي الصلاحية مقبول؟', a:'نعم وصراحةً. ينص المرسوم على قبول جواز السفر سارياً كان أم منتهي الصلاحية.' },
      { q:'هل يمكنني العمل أثناء انتظار القرار؟', a:'نعم. إذن العمل يسري من لحظة تسجيل طلبك، قبل صدور القرار النهائي.' },
      { q:'ما الوثائق اللازمة لإثبات إقامة 5 أشهر؟', a:'أي وثيقة اسمية بتاريخ: فواتير الخدمات، تقارير طبية، كشوف حساب، بطاقات نقل اسمية، عقود إيجار، بيانات رواتب، سجلات منظمات...' },
      { q:'هل التسجيل البلدي شرط إلزامي؟', a:'لا. يمكن استخدامه كأحد وثائق الإثبات لكنه ليس إلزامياً.' },
      { q:'هل تشمل التسوية أفراد الأسرة؟', a:'نعم، يمكن التقديم بصورة مشتركة مع الشريك والأقارب من الدرجة الأولى.' },
      { q:'كم تمتد مدة التصريح الممنوح؟', a:'سنة واحدة قابلة للتجديد. صالح للعمل في أي قطاع وفي جميع أنحاء إسبانيا.' },
    ],
  },

  blog: {
    tag: 'تحديث يومي بالذكاء الاصطناعي',
    title: 'الأخبار والمستجدات',
    desc: 'معلومات تُستخرج يومياً من المصادر الرسمية والإعلام الموثوق باستخدام الذكاء الاصطناعي.',
    readMore: 'اقرأ المزيد ←',
    publishedOn: 'نُشر في',
    updatedOn: 'تحديث في',
    sourceLabel: 'المصدر',
    noArticles: 'لا توجد مقالات بعد. سيُنشر الوكيل أول ملخص قريباً.',
    backToBlog: '← العودة إلى الأخبار',
    relatedTitle: 'مقالات ذات صلة',
    autoUpdated: 'معلومات موثقة من مصادر رسمية',
    categoryLabel: 'الفئة',
    trendingTag: '🔥 رائج',
  },

  footer: {
    disclaimer: 'التسوية.com موقع مستقل للمعلومات. غير مرتبط بالحكومة الإسبانية ولا بوزارة الإدماج الاجتماعي ولا يحمل توصيتها. تستند جميع المعلومات إلى المصادر الرسمية العامة (الجريدة الرسمية، inclusion.gob.es). راجع دائماً المصدر الرسمي.',
    linksTitle: 'المصادر الرسمية',
    langsTitle: 'اللغات',
    note: '⚠️ موقع غير رسمي · التسوية.com · المرسوم 316/2026 · يتحدث يومياً · © 2026',
  },
};

// ─── URDU ─────────────────────────────────────────────────────────────
const ur: Translation = {
  lang: 'ur', dir: 'rtl', htmlLang: 'ur',
  metaTitle: 'ریگولرائزیشن — اسپین ریگولرائزیشن 2026 گائیڈ',
  metaDesc: 'اسپین کی غیر معمولی ریگولرائزیشن 2026 کے بارے میں آزاد گائیڈ۔ فارم EX-31 اور EX-32۔ روزانہ اپڈیٹ۔ آخری تاریخ: 30 جون۔',
  ogImage: 'https://laregularizacion.com/og-ur.jpg',
  keywords: 'اسپین ریگولرائزیشن 2026, EX-31, EX-32, مرسوم 316/2026, اسپین ویزہ 2026',

  siteName: 'ریگولرائزیشن',
  tagline: 'آزاد گائیڈ · غیر سرکاری',
  unofficial: '⚠️ غیر سرکاری ویب سائٹ · صرف معلومات کے لیے',

  nav: { home: 'ہوم', process: 'عمل', requirements: 'شرائط', forms: 'فارم', checker: 'جانچ', blog: 'خبریں', official: 'سرکاری ویب سائٹ ←', guide: 'مکمل گائیڈ' },

  hero: {
    eyebrow: 'فرمان 316/2026 · BOE 15 اپریل · آخری تاریخ: 30 جون 2026',
    h1: 'غیر معمولی', h1hl: 'ریگولرائزیشن',
    sub: 'اسپین 2026 — مکمل آزاد گائیڈ',
    desc: 'اسپین میں غیر قانونی مقیم افراد کی ریگولرائزیشن کے بارے میں ہر وہ چیز جو آپ کو جاننی چاہیے۔ روزانہ خبریں، فارم اور اہلیت جانچنے والا آلہ۔',
    ctaForms: '📄 فارم ڈاؤن لوڈ', ctaChecker: 'کیا میں اہل ہوں؟', ctaBlog: 'تازہ ترین خبریں',
  },

  cd: { title: 'باقی وقت', deadline: '⏳ آخری تاریخ: 30 جون 2026', days: 'دن', hours: 'گھنٹے', mins: 'منٹ', secs: 'سیکنڈ', ended: 'مدت ختم' },

  stats: {
    decree: { label: 'فرمان', sub: '16/04/2026 سے نافذ', badge: '✓ فعال' },
    deadline: { label: 'آخری تاریخ', sub: 'درخواست کا آخری دن', badge: '⚠ فوری' },
    permit: { label: 'اجازت نامہ', val: 'رہائش + ملازمت', sub: 'درخواست کے لمحے سے مؤثر', badge: '1 سال قابلِ تجدید' },
    fee: { label: 'سرکاری فیس', sub: 'فارم 790، کوڈ 052', badge: 'لازمی' },
  },

  process: {
    tag: 'سرکاری ٹائم لائن', title: 'مرحلہ وار عمل',
    steps: [
      { date: '14 اپریل 2026', title: 'کابینہ کی منظوری', body: 'حکومت نے RD 316/2026 منظور کیا۔', type: 'default' },
      { date: '15 اپریل 2026', title: 'BOE میں اشاعت', body: 'BOE-A-2026-8284۔ فارم EX-31 اور EX-32 جاری۔ اپوائنٹمنٹ بکنگ کھلی۔', type: 'default' },
      { date: '16 اپریل 2026', title: 'آن لائن درخواست 24/7 کھلی', body: 'inclusion.gob.es پر 24 گھنٹے دستیاب۔ ڈیجیٹل سرٹیفکیٹ ضروری۔', status: '● کھلا', type: 'active' },
      { date: '20 اپریل 2026', title: 'حضوری درخواست کھلی', body: '5 Extranjería، 60 Seguridad Social، 371 Correos دفاتر۔ پہلے اپوائنٹمنٹ لازمی۔', status: '● کھلا', type: 'active' },
      { date: '30 جون 2026', title: 'درخواستوں کی بندش', body: 'آن لائن اور حضوری دونوں کا اختتام۔', status: '⚠ آخری تاریخ', type: 'deadline' },
      { date: '3 مہینے تک', title: 'انتظامی فیصلہ', body: 'اجازت نامہ رجسٹریشن کے لمحے سے مؤثر۔ خاموشی = رد۔', type: 'default' },
    ],
    citiesTag: 'شہر کے حساب سے صورتحال',
    cities: [
      { name: 'میڈرڈ', note: 'زیادہ طلب — انتظار', status: 'busy' },
      { name: 'بارسلونا', note: 'دستیاب', status: 'open' },
      { name: 'والنسیا', note: 'کم انتظار', status: 'open' },
      { name: 'سیویلا', note: 'دستیاب', status: 'open' },
      { name: 'الیکانتے', note: 'Extranjería دفتر', status: 'open' },
      { name: 'المیریا', note: 'Extranjería دفتر', status: 'open' },
      { name: 'مورسیا', note: 'Extranjería دفتر', status: 'open' },
      { name: 'بلباؤ', note: 'دستیاب', status: 'open' },
    ],
    statusOpen: '● کھلا', statusBusy: '● بھرا', statusWait: '◌ انتظار',
    contactTag: 'رابطہ',
    phone: { label: 'اپوائنٹمنٹ اور معلومات', hours: 'پیر–جمعہ 9:30–14:00 اور 16:30–19:30' },
    web: { label: 'سرکاری ویب سائٹ', avail: '24 گھنٹے / 7 دن' },
  },

  reqs: {
    tag: 'دستاویزات', title: 'شرائط اور ضروری دستاویزات',
    intro: 'عملی نکات دیکھنے کے لیے ہر نقطے پر کرسر لے جائیں۔',
    baseTitle: 'بنیادی شرائط — تمام لازمی',
    plusTitle: 'علاوہ ازیں: ان 3 میں سے کم از کم 1',
    base: [
      { num: '۱', title: '1 جنوری 2026 سے پہلے اسپین میں موجودگی', sub: 'کوئی بھی نامی دستاویز جس پر پہلے کی تاریخ ہو: بل، میڈیکل رپورٹ، بینک اسٹیٹمنٹ، NGO ریکارڈ...', tip: '💡 میونسپل رجسٹریشن لازمی نہیں۔ آپ کے نام اور پہلے کی تاریخ والی کوئی بھی دستاویز کافی ہے۔' },
      { num: '۲', title: 'اسپین میں 5 ماہ کا بلا وقفہ قیام', sub: 'درخواست سے پہلے 5 مہینوں میں اسپین سے کوئی روانگی نہیں۔', tip: '⚠️ صفر روانگی، مختصر سفر بھی نہیں۔ کوئی بھی سفر اس شرط کو کالعدم کر سکتا ہے۔' },
      { num: '۳', title: 'بالغ ہونا (18 سال یا زیادہ)', sub: 'صرف بالغ درخواست دے سکتے ہیں۔ نابالغوں کے لیے الگ طریقہ کار ہے۔' },
      { num: '۴', title: 'سنگین فوجداری ریکارڈ نہ ہو', sub: 'اسپین اور گزشتہ 5 سالوں کے قیام کے ملکوں میں۔', tip: '💡 اگر آبائی ملک 1 ماہ میں جواب نہ دے تو درخواست کا ثبوت اور ذمہ داری کا اعلامیہ جمع کریں۔' },
      { num: '۵', title: 'پاسپورٹ یا سفری دستاویز', sub: 'درست یا میعاد ختم — دونوں قابلِ قبول۔', tip: '💡 میعاد ختم پاسپورٹ مکمل طور پر قابلِ قبول ہے۔' },
      { num: '۶', title: 'کوئی دوسری درخواست زیرِ التوا نہ ہو', sub: 'سوائے ان arraigos کے جو فرمان کے نافذ ہونے سے پہلے جمع کی گئی تھیں۔' },
      { num: '۷', title: 'فارم 790، کوڈ 052 — 38.28 یورو', sub: 'مجاز بینک میں ادائیگی۔ مہر لگا اصل رسید محفوظ رکھیں۔' },
    ],
    plus: [
      { code: 'الف', title: '💼 پیشہ ورانہ انضمام', sub: 'سال میں 90 دن کام، نوکری کی پیشکش، یا خود روزگار کا اعلامیہ۔' },
      { code: 'ب', title: '👨‍👩‍👧 خاندانی اکائی', sub: 'نابالغ بچوں یا معذور بالغ بچوں کے ساتھ، یا قریبی رشتہ داروں کے ساتھ جن کے ساتھ اسپین میں رہتے ہیں۔' },
      { code: 'ج', title: '🏘️ سماجی کمزوری', sub: 'سوشل سروسز یا رجسٹرڈ NGO کا سرٹیفکیٹ۔', tip: '💡 جن لوگوں نے 01/01/2026 سے پہلے پناہ کی درخواست دی وہ اس معیار سے مستثنیٰ ہیں۔' },
    ],
    asylumTitle: 'بین الاقوامی تحفظ کے متقاضی (پناہ)',
    asylumBody: 'اگر آپ نے <strong>01/01/2026 سے پہلے</strong> پناہ کی درخواست دی تھی تو <strong>بغیر واپس لیے</strong> ریگولرائزیشن کے لیے اپلائی کر سکتے ہیں۔ فارم <strong>EX-31</strong> استعمال کریں۔',
    exclTitle: 'جو درخواست نہیں دے سکتے',
    excl: ['جن کے پاس قانونی رہائشی اجازت نامہ ہے', 'جن کی کوئی دوسری درخواست زیرِ التوا ہے', 'جن کے خلاف ملک بدری کا حتمی حکم ہے'],
  },

  forms: {
    tag: 'سرکاری دستاویزات', title: 'ڈاؤن لوڈ کے لیے فارم',
    desc: 'تمام فارم مکمل طور پر مفت ہیں اور وزارت کی سرکاری ویب سائٹ پر موجود ہیں۔',
    cards: [
      { id:'ex31', title:'فارم EX-31', ref:'DA 20ª · بین الاقوامی تحفظ کے متقاضی', desc:'ان لوگوں کے لیے جنہوں نے 01/01/2026 سے پہلے پناہ کی درخواست دی تھی۔', tags:['پناہ','DA 20ª','قابلِ پُر PDF'], btn:'EX-31 ڈاؤن لوڈ', note:'inclusion.gob.es/regularizacion', color:'blue', icon:'📋' },
      { id:'ex32', title:'فارم EX-32', ref:'DA 21ª · غیر قانونی صورتحال', desc:'ان لوگوں کے لیے جو غیر قانونی صورتحال میں ہیں اور 01/01/2026 سے پہلے اسپین آئے۔', tags:['غیر قانونی','DA 21ª','قابلِ پُر PDF'], btn:'EX-32 ڈاؤن لوڈ', note:'inclusion.gob.es/regularizacion', color:'red', icon:'📋' },
      { id:'vuln', title:'سماجی کمزوری کی رپورٹ', ref:'خصوصی حالات کا سرٹیفکیٹ', desc:'سوشل سروسز یا رجسٹرڈ NGOs کی طرف سے جاری کیا جاتا ہے۔', tags:['سوشل سروسز','NGOs'], btn:'فارم ڈاؤن لوڈ', note:'مقامی سوشل سروسز دفاتر میں بھی', color:'green', icon:'📄' },
      { id:'boe', title:'RD 316/2026 (BOE)', ref:'BOE-A-2026-8284 · مکمل قانونی متن', desc:'15 اپریل 2026 کو BOE میں شائع مکمل متن۔', tags:['قانونی متن','BOE','PDF'], btn:'BOE.es پر دیکھیں', note:'boe.es', color:'gray', icon:'⚖️' },
      { id:'tasa', title:'ٹیکس فارم 790 · کوڈ 052', ref:'سرکاری ادائیگی — 38.28 یورو', desc:'لازمی فیس کا فارم۔ بینک میں ادا کریں اور رسید محفوظ رکھیں۔', tags:['38.28 یورو','بینک','لازمی'], btn:'فارم 790 حاصل کریں', note:'agenciatributaria.gob.es', color:'purple', icon:'💳' },
      { id:'faq', title:'سرکاری FAQ گائیڈ (PDF)', ref:'وزارت انضمام · رسمی دستاویز', desc:'وزارت کی سرکاری دستاویز جس میں عام سوالات اور جوابات ہیں۔', tags:['سرکاری FAQ','PDF'], btn:'FAQ گائیڈ ڈاؤن لوڈ', note:'inclusion.gob.es/regularizacion', color:'teal', icon:'❓' },
    ],
    scamTitle: '⚠️ دھوکہ دہی سے خبردار',
    scamBody: '<strong>تمام فارم مکمل طور پر مفت ہیں۔</strong> واحد سرکاری ادائیگی فارم 790-052 کی 38.28 یورو فیس ہے۔ فارم یا اپوائنٹمنٹ کے پیسے کسی کو نہ دیں۔ ہمیشہ <strong>inclusion.gob.es/regularizacion</strong> یا <strong>060</strong> استعمال کریں۔',
  },

  quiz: {
    tag: 'رہنمائی آلہ', title: 'کیا آپ شرائط پوری کرتے ہیں؟',
    desc: '6 سوالوں کے جوابات سے جانیں کہ آپ شاید اہل ہیں۔ قانونی مشورہ نہیں ہے۔',
    label: 'اہلیت جانچنے والا آلہ', stepOf: 'میں سے', reset: '↺ دوبارہ شروع',
    resultTitles: { ok: 'آپ شاید اہل ہیں!', fail: 'شرط پوری نہیں', warn: 'صورتحال قابلِ غور' },
    resultOk: 'آپ کے جوابوں کے مطابق آپ RD 316/2026 کی شرائط پوری کرتے ہیں۔ EX-31 یا EX-32 ڈاؤن لوڈ کریں اور inclusion.gob.es یا 060 پر درخواست دیں۔',
    questions: [
      { q:'کیا آپ یکم جنوری 2026 سے پہلے اسپین میں تھے؟', hint:'پہلے کی تاریخ والی کوئی بھی نامی دستاویز کافی ہے۔', opts:[{ label:'✅ ہاں، 01/01/2026 سے پہلے', ok:true },{ label:'❌ نہیں، بعد میں آیا', fail:'فرمان کے مطابق 01/01/2026 سے پہلے اسپین میں موجودگی لازمی ہے۔' }] },
      { q:'کیا آپ اسپین سے باہر گئے بغیر 5+ مہینے گزارے ہیں؟', hint:'صفر روانگی، مختصر سفر بھی نہیں۔', opts:[{ label:'✅ ہاں، 5+ مہینے', ok:true },{ label:'⚠️ مختصر وقت باہر گیا', warn:'کوئی بھی روانگی شرط کو کالعدم کر سکتی ہے۔' },{ label:'❌ 5 مہینے سے کم', fail:'درخواست کے وقت 5 مسلسل مہینے لازمی ہیں۔' }] },
      { q:'کیا آپ 18 سال یا اس سے زیادہ کے ہیں؟', hint:'صرف بالغوں کے لیے ہے۔', opts:[{ label:'✅ ہاں، بالغ ہوں', ok:true },{ label:'❌ نابالغ ہوں', fail:'نابالغوں کے الگ راستے ہیں۔' }] },
      { q:'کیا آپ کا کوئی سنگین فوجداری ریکارڈ نہیں ہے؟', hint:'اسپین اور گزشتہ 5 سالوں میں قیام کے ملکوں میں۔', opts:[{ label:'✅ کوئی ریکارڈ نہیں', ok:true },{ label:'⏳ سرٹیفکیٹ منتظر', warn:'درخواست کا ثبوت منسلک کر کے جمع کر سکتے ہیں۔' },{ label:'❓ ریکارڈ ہے', warn:'بعض قابلِ منسوخی ریکارڈ نااہل نہیں کرتے۔' }] },
      { q:'کیا کوئی دوسری رہائشی درخواست زیرِ غور نہیں ہے؟', hint:'سوائے فرمان سے پہلے جمع arraigos کے۔', opts:[{ label:'✅ کچھ زیرِ التوا نہیں', ok:true },{ label:'📋 arraigo زیرِ التوا', warn:'تاریخ کے مطابق مشورہ لیں۔' },{ label:'❌ دوسری درخواست نشط', fail:'دوسری درخواست ہوتے ہوئے یہ نہیں مانگ سکتے۔' }] },
      { q:'کیا آپ ان میں سے کم از کم ایک معیار پورا کرتے ہیں؟', hint:'2026 سے پہلے پناہ کی درخواست والے مستثنیٰ ہیں۔', opts:[{ label:'💼 ملازمت / پیشکش / خود روزگار', ok:true },{ label:'👨‍👩‍👧 خاندانی اکائی', ok:true },{ label:'🏘️ سماجی کمزوری موثق', ok:true },{ label:'🛡️ 2026 سے پہلے پناہ کی درخواست', ok:true },{ label:'❌ کوئی بھی نہیں', fail:'تمام شرائط پوری نہیں ہوتیں۔ کسی NGO سے رابطہ کریں۔' }] },
    ],
  },

  faq: {
    tag: 'اکثر پوچھے گئے سوالات', title: 'سوال و جواب',
    items: [
      { q:'درخواست کب جمع کرا سکتا ہوں؟', a:'آن لائن: 16 اپریل 2026 سے، 24 گھنٹے دستیاب۔ حضوری پہلے اپوائنٹمنٹ کے ساتھ: 20 اپریل سے۔ آخری تاریخ: 30 جون 2026۔' },
      { q:'کون سا فارم چاہیے: EX-31 یا EX-32؟', a:'EX-31 اگر آپ نے 01/01/2026 سے پہلے پناہ کی درخواست دی تھی۔ EX-32 اگر غیر قانونی صورتحال میں ہیں اور 01/01/2026 سے پہلے آئے تھے۔' },
      { q:'میعاد ختم پاسپورٹ چلے گا؟', a:'ہاں، صراحتاً۔ RD 316/2026 درست اور میعاد ختم دونوں پاسپورٹ قبول کرتا ہے۔' },
      { q:'فیصلے کا انتظار کرتے ہوئے کام کر سکتا ہوں؟', a:'ہاں۔ اجازت نامہ درخواست رجسٹر ہونے کے لمحے سے مؤثر ہے، فیصلے سے پہلے۔' },
      { q:'5 ماہ کے قیام کے ثبوت کے لیے کیا کاغذات؟', a:'کوئی بھی نامی دستاویز جس پر تاریخ ہو: یوٹیلیٹی بل، ہیلتھ رپورٹ، بینک اسٹیٹمنٹ، ٹرانسپورٹ کارڈ، کرایہ معاہدہ، تنخواہ پرچی...' },
      { q:'میونسپل رجسٹریشن لازمی ہے؟', a:'نہیں۔ ایک ثبوت کے طور پر استعمال ہو سکتی ہے لیکن لازمی نہیں۔' },
      { q:'خاندان کے افراد بھی شامل ہو سکتے ہیں؟', a:'ہاں، ساتھی اور قریبی رشتہ داروں کے ساتھ مشترکہ درخواست دے سکتے ہیں۔' },
      { q:'اجازت نامے کی مدت کتنی ہے؟', a:'1 سال، قابلِ تجدید۔ اسپین میں کسی بھی شعبے میں کام کے لیے درست۔' },
    ],
  },

  blog: {
    tag: 'روزانہ AI اپڈیٹ',
    title: 'خبریں اور اپڈیٹس',
    desc: 'روزانہ سرکاری ذرائع اور قابلِ اعتماد میڈیا سے AI کے ذریعے نکالی گئی معلومات۔',
    readMore: 'مزید پڑھیں ←',
    publishedOn: 'تاریخ اشاعت',
    updatedOn: 'تازہ کاری',
    sourceLabel: 'ماخذ',
    noArticles: 'ابھی کوئی مضمون نہیں۔ ایجنٹ جلد پہلا خلاصہ شائع کرے گا۔',
    backToBlog: '← خبروں پر واپس',
    relatedTitle: 'متعلقہ مضامین',
    autoUpdated: 'سرکاری ذرائع سے تصدیق شدہ معلومات',
    categoryLabel: 'زمرہ',
    trendingTag: '🔥 رجحان',
  },

  footer: {
    disclaimer: 'LaRegularizacion.com ایک آزاد معلوماتی ویب سائٹ ہے۔ ہسپانوی حکومت یا وزارت انضمام سے غیر وابستہ۔ تمام معلومات سرکاری عوامی ذرائع (BOE، inclusion.gob.es) سے لی گئی ہیں۔ ہمیشہ سرکاری ذریعے سے تصدیق کریں۔',
    linksTitle: 'سرکاری ذرائع',
    langsTitle: 'زبانیں',
    note: '⚠️ غیر سرکاری · LaRegularizacion.com · RD 316/2026 · روزانہ اپڈیٹ · © 2026',
  },
};

export const translations: Record<Lang, Translation> = { es, en, ar, ur };
export function t(lang: Lang): Translation { return translations[lang]; }
