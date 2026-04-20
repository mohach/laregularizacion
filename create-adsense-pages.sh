#!/bin/bash

# Create Terms of Service pages
cat > src/pages/terms.astro << 'EOF'
---
import Base from '../layouts/Base.astro';
import { translations } from '../data/translations';

const tr = translations.es;
---

<Base tr={tr} title="Términos de Servicio" desc="Términos de servicio de LaRegularizacion.com - Condiciones de uso del sitio">
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <h1 class="text-3xl font-bold mb-8">Términos de Servicio</h1>
    
    <div class="prose prose-lg max-w-none">
      <p class="text-gray-600 mb-6">Última actualización: 20 de abril de 2026</p>
      
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">1. Aceptación de los Términos</h2>
        <p>Al acceder y usar LaRegularizacion.com, aceptas cumplir con estos Términos de Servicio. Si no estás de acuerdo, no uses nuestro sitio.</p>
      </section>
      
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">2. Uso del Contenido</h2>
        <p>El contenido de este sitio es solo para información general. No constituye asesoramiento legal. Consulta con un abogado especializado en inmigración para tu situación específica.</p>
      </section>
      
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">3. Propiedad Intelectual</h2>
        <p>Todo el contenido (texto, imágenes, diseño) es propiedad de LaRegularizacion.com o se usa con permiso. No puedes reproducirlo sin autorización.</p>
      </section>
      
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">4. Enlaces a Terceros</h2>
        <p>Podemos incluir enlaces a otros sitios. No somos responsables del contenido o prácticas de privacidad de esos sitios.</p>
      </section>
      
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">5. Limitación de Responsabilidad</h2>
        <p>No garantizamos la exactitud, integridad o actualidad de la información. No somos responsables de decisiones tomadas basadas en el contenido de este sitio.</p>
      </section>
      
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">6. Cambios en los Términos</h2>
        <p>Podemos modificar estos términos en cualquier momento. El uso continuado del sitio después de cambios implica aceptación.</p>
      </section>
      
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">7. Ley Aplicable</h2>
        <p>Estos términos se rigen por las leyes de España. Cualquier disputa se resolverá en los tribunales de Madrid.</p>
      </section>
      
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">8. Contacto</h2>
        <p>Para preguntas sobre estos términos: <strong>contacto@laregularizacion.com</strong></p>
      </section>
    </div>
  </div>
</Base>
EOF

# Create English Terms
cat > src/pages/en/terms.astro << 'EOF'
---
import Base from '../../layouts/Base.astro';
import { translations } from '../../data/translations';

const tr = translations.en;
---

<Base tr={tr} title="Terms of Service" desc="Terms of service of LaRegularizacion.com - Site usage conditions">
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <h1 class="text-3xl font-bold mb-8">Terms of Service</h1>
    
    <div class="prose prose-lg max-w-none">
      <p class="text-gray-600 mb-6">Last updated: April 20, 2026</p>
      
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
        <p>By accessing and using LaRegularizacion.com, you agree to comply with these Terms of Service. If you disagree, do not use our site.</p>
      </section>
      
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">2. Content Use</h2>
        <p>The content on this site is for general information only. It does not constitute legal advice. Consult with an immigration lawyer for your specific situation.</p>
      </section>
      
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">3. Intellectual Property</h2>
        <p>All content (text, images, design) is property of LaRegularizacion.com or used with permission. You may not reproduce it without authorization.</p>
      </section>
      
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">4. Third-Party Links</h2>
        <p>We may include links to other sites. We are not responsible for the content or privacy practices of those sites.</p>
      </section>
      
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
        <p>We do not guarantee the accuracy, completeness, or timeliness of information. We are not responsible for decisions made based on this site's content.</p>
      </section>
      
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">6. Changes to Terms</h2>
        <p>We may modify these terms at any time. Continued use of the site after changes implies acceptance.</p>
      </section>
      
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">7. Governing Law</h2>
        <p>These terms are governed by the laws of Spain. Any disputes will be resolved in Madrid courts.</p>
      </section>
      
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">8. Contact</h2>
        <p>For questions about these terms: <strong>contact@laregularizacion.com</strong></p>
      </section>
    </div>
  </div>
</Base>
EOF

# Create Contact pages
cat > src/pages/contact.astro << 'EOF'
---
import Base from '../layouts/Base.astro';
import { translations } from '../data/translations';

const tr = translations.es;
---

<Base tr={tr} title="Contacto" desc="Contacta con LaRegularizacion.com - Preguntas sobre la regularización 2026">
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <h1 class="text-3xl font-bold mb-8">Contacto</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="prose prose-lg">
        <h2 class="text-2xl font-semibold mb-4">Información de Contacto</h2>
        
        <div class="space-y-4">
          <div>
            <h3 class="font-semibold text-lg">Email</h3>
            <p class="text-gray-700">contacto@laregularizacion.com</p>
            <p class="text-sm text-gray-500">Respuesta en 24-48 horas</p>
          </div>
          
          <div>
            <h3 class="font-semibold text-lg">Horario de Atención</h3>
            <p class="text-gray-700">Lunes a Viernes: 9:00 - 18:00 (CET)</p>
            <p class="text-sm text-gray-500">Excluyendo festivos españoles</p>
          </div>
          
          <div>
            <h3 class="font-semibold text-lg">Ubicación</h3>
            <p class="text-gray-700">Madrid, España</p>
            <p class="text-sm text-gray-500">Sitio web - sin oficina física</p>
          </div>
        </div>
        
        <div class="mt-8">
          <h3 class="font-semibold text-lg mb-4">¿Qué podemos ayudarte?</h3>
          <ul class="list-disc pl-6 space-y-2">
            <li>Preguntas sobre la regularización 2026</li>
            <li>Errores en el contenido del sitio</li>
            <li>Colaboraciones y patrocinios</li>
            <li>Publicidad y afiliación</li>
            <li>Problemas técnicos del sitio</li>
          </ul>
        </div>
      </div>
      
      <div class="bg-gray-50 p-6 rounded-lg">
        <h2 class="text-2xl font-semibold mb-4">Formulario de Contacto</h2>
        <p class="text-gray-600 mb-6">Usa este formulario para enviarnos un mensaje directo.</p>
        
        <form class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input type="text" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Tu nombre">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="tu@email.com" required>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Asunto</label>
            <select class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Pregunta sobre regularización</option>
              <option>Error en el contenido</option>
              <option>Colaboración</option>
              <option>Publicidad</option>
              <option>Otro</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
            <textarea rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Escribe tu mensaje aquí..."></textarea>
          </div>
          
          <button type="submit" class="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium">
            Enviar Mensaje
          </button>
          
          <p class="text-sm text-gray-500 text-center mt-4">
            Nota: Este es un formulario de ejemplo. Los mensajes se envían a contacto@laregularizacion.com
          </p>
        </form>
      </div>
    </div>
  </div>
</Base>
EOF

echo "Created Privacy, Terms, and Contact pages in Spanish"
echo "Need to create Arabic/Urdu versions and About/Disclaimer pages"