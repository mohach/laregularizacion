#!/bin/bash

# Create About page
cat > src/pages/about.astro << 'EOF'
---
import Base from '../layouts/Base.astro';
import { translations } from '../data/translations';

const tr = translations.es;
---

<Base tr={tr} title="Sobre Nosotros" desc="Sobre LaRegularizacion.com - Guía independiente sobre la Regularización Extraordinaria España 2026">
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <h1 class="text-3xl font-bold mb-8">Sobre LaRegularizacion.com</h1>
    
    <div class="prose prose-lg max-w-none">
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Nuestra Misión</h2>
        <p>Somos una <strong>guía independiente y no oficial</strong> sobre la Regularización Extraordinaria de España 2026. Nuestro objetivo es proporcionar información clara, actualizada y accesible para ayudar a las personas a entender este proceso histórico.</p>
      </div>
      
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">¿Qué Hacemos?</h2>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Recopilamos información oficial</strong> del gobierno español y fuentes confiables</li>
          <li><strong>Traducimos y explicamos</strong> los requisitos en lenguaje sencillo</li>
          <li><strong>Actualizamos diariamente</strong> con las últimas noticias y cambios</li>
          <li><strong>Proporcionamos recursos gratuitos</strong> para ayudar en el proceso</li>
        </ul>
      </div>
      
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Importante: No Somos Abogados</h2>
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <p class="text-yellow-700"><strong>Aviso Legal:</strong> No somos un bufete de abogados ni proporcionamos asesoramiento legal. La información en este sitio es solo para fines informativos. Para asesoramiento legal específico, consulta con un abogado especializado en inmigración.</p>
        </div>
      </div>
      
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Multilingüe</h2>
        <p>Ofrecemos contenido en <strong>4 idiomas</strong> para llegar a más personas:</p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div class="text-center p-4 bg-blue-50 rounded-lg">
            <span class="text-2xl">🇪🇸</span>
            <p class="font-medium mt-2">Español</p>
          </div>
          <div class="text-center p-4 bg-green-50 rounded-lg">
            <span class="text-2xl">🇬🇧</span>
            <p class="font-medium mt-2">Inglés</p>
          </div>
          <div class="text-center p-4 bg-red-50 rounded-lg" dir="rtl">
            <span class="text-2xl">🇸🇦</span>
            <p class="font-medium mt-2">العربية</p>
          </div>
          <div class="text-center p-4 bg-purple-50 rounded-lg" dir="rtl">
            <span class="text-2xl">🇵🇰</span>
            <p class="font-medium mt-2">اردو</p>
          </div>
        </div>
      </div>
      
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Contenido Generado por IA</h2>
        <p>Usamos inteligencia artificial para:</p>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li>Traducir contenido a múltiples idiomas</li>
          <li>Resumir noticias oficiales</li>
          <li>Generar explicaciones claras de conceptos complejos</li>
          <li>Actualizar información diariamente</li>
        </ul>
        <p>Todos los contenidos son revisados para asegurar precisión y claridad.</p>
      </div>
      
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Transparencia</h2>
        <p>Somos transparentes sobre nuestro modelo de negocio:</p>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Anuncios:</strong> Mostramos anuncios relevantes (Google AdSense) para mantener el sitio gratuito</li>
          <li><strong>Enlaces de afiliado:</strong> Algunos enlaces pueden generar comisiones si los usas</li>
          <li><strong>Contenido patrocinado:</strong> Marcado claramente cuando aplicable</li>
        </ul>
      </div>
      
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Contacto</h2>
        <p>Para preguntas, colaboraciones o correcciones:</p>
        <p class="mt-2"><strong>Email:</strong> contacto@laregularizacion.com</p>
      </div>
    </div>
  </div>
</Base>
EOF

# Create Disclaimer page
cat > src/pages/disclaimer.astro << 'EOF'
---
import Base from '../layouts/Base.astro';
import { translations } from '../data/translations';

const tr = translations.es;
---

<Base tr={tr} title="Aviso Legal y Descargo de Responsabilidad" desc="Aviso legal y descargo de responsabilidad de LaRegularizacion.com">
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <h1 class="text-3xl font-bold mb-8">Aviso Legal y Descargo de Responsabilidad</h1>
    
    <div class="prose prose-lg max-w-none">
      <div class="bg-red-50 border-l-4 border-red-400 p-6 mb-8">
        <h2 class="text-xl font-bold text-red-700 mb-2">ADVERTENCIA IMPORTANTE</h2>
        <p class="text-red-700"><strong>NO SOMOS ABOGADOS NI PROPORCIONAMOS ASESORAMIENTO LEGAL.</strong> La información en este sitio es solo para fines informativos y educativos.</p>
      </div>
      
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">1. No Asesoramiento Legal</h2>
        <p>LaRegularizacion.com es un sitio web informativo. <strong>No somos un bufete de abogados</strong> y no proporcionamos asesoramiento legal. La información aquí presentada no constituye relación abogado-cliente.</p>
        <p class="mt-2"><strong>Para asesoramiento legal específico sobre tu situación de inmigración, consulta con un abogado especializado en inmigración autorizado en España.</strong></p>
      </section>
      
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">2. Exactitud de la Información</h2>
        <p>Nos esforzamos por proporcionar información precisa y actualizada, pero <strong>no garantizamos la exactitud, integridad o actualidad</strong> del contenido. Las leyes y procedimientos de inmigración cambian frecuentemente.</p>
        <p class="mt-2">Siempre verifica la información con fuentes oficiales del gobierno español.</p>
      </section>
      
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">3. Enlaces a Terceros</h2>
        <p>Este sitio puede contener enlaces a otros sitios web. No somos responsables del contenido, políticas de privacidad o prácticas de esos sitios.</p>
      </section>
      
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">4. Enlaces de Afiliado</h2>
        <p>Algunos enlaces en este sitio pueden ser enlaces de afiliado. Esto significa que podemos recibir una comisión si haces una compra o usas un servicio a través de ese enlace, <strong>sin costo adicional para ti</strong>.</p>
        <p class="mt-2">Solo recomendamos productos o servicios que creemos que pueden ser útiles para nuestros lectores.</p>
      </section>
      
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">5. Publicidad</h2>
        <p>Este sitio muestra anuncios a través de Google AdSense y otras redes publicitarias. Los anuncios se seleccionan automáticamente y pueden basarse en tus intereses.</p>
      </section>
      
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">6. Limitación de Responsabilidad</h2>
        <p>En ningún caso seremos responsables por daños directos, indirectos, incidentales o consecuentes que resulten del uso o incapacidad de usar este sitio o la información contenida en él.</p>
      </section>
      
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">7. Uso del Sitio</h2>
        <p>Al usar este sitio, aceptas este descargo de responsabilidad en su totalidad. Si no estás de acuerdo, no uses este sitio.</p>
      </section>
      
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">8. Contacto para Correcciones</h2>
        <p>Si encuentras información incorrecta o desactualizada, por favor contáctanos en <strong>contacto@laregularizacion.com</strong> para corregirla.</p>
      </section>
    </div>
  </div>
</Base>
EOF

echo "Created About and Disclaimer pages in Spanish"
echo "Now creating footer navigation..."