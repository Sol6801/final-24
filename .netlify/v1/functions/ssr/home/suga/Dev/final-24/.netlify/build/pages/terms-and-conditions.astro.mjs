/* empty css                                 */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_BAo5IgvU.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../chunks/Layout_C8GAmOa0.mjs';
export { renderers } from '../renderers.mjs';

const $$TermsAndConditions = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Alertar - T&C." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <header class="bg-blue-500 text-white p-4"> <div class="container mx-auto"> <h1 class="text-2xl font-bold">Términos y Condiciones</h1> </div> </header> <main class="container mx-auto p-6"> <section class="bg-white p-6 rounded-lg shadow-md"> <h2 class="text-xl font-semibold mb-4">1. Aceptación de Términos</h2> <p class="mb-4">
Al acceder y utilizar nuestra aplicación, aceptas cumplir y estar
          sujeto a estos Términos y Condiciones. Si no estás de acuerdo con
          alguna parte de estos términos, no debes usar nuestra aplicación.
</p> <h2 class="text-xl font-semibold mb-4">2. Modificaciones</h2> <p class="mb-4">
Nos reservamos el derecho de modificar estos Términos y Condiciones en
          cualquier momento. Cualquier cambio será publicado en esta página, y
          tu uso continuo de la aplicación después de la publicación de cambios
          constituye tu aceptación de dichos cambios.
</p> <h2 class="text-xl font-semibold mb-4">3. Uso de la Aplicación</h2> <ul class="list-disc list-inside mb-4"> <li> <strong>Registro y Cuenta:</strong> Eres responsable de mantener la confidencialidad
            de tu cuenta y contraseña, así como de todas las actividades que ocurran
            bajo tu cuenta. Debes notificar inmediatamente cualquier uso no autorizado
            de tu cuenta.
</li> <li> <strong>Uso Permitido:</strong> La aplicación debe ser utilizada solo
            para fines legales y de acuerdo con todas las leyes aplicables. No debes
            utilizar la aplicación para transmitir, distribuir o almacenar material
            que sea ilegal, ofensivo o que infrinja los derechos de terceros.
</li> </ul> <h2 class="text-xl font-semibold mb-4">4. Privacidad</h2> <p class="mb-4">
Tu privacidad es importante para nosotros. Nuestra Política de
          Privacidad explica cómo recopilamos, usamos y protegemos tu
          información personal. Al usar nuestra aplicación, aceptas nuestra
          Política de Privacidad.
</p> <h2 class="text-xl font-semibold mb-4">5. Propiedad Intelectual</h2> <p class="mb-4">
Todos los derechos de propiedad intelectual relacionados con la
          aplicación, incluidos los derechos de autor, marcas comerciales y
          patentes, pertenecen a nosotros o a nuestros licenciantes. No se te
          concede ningún derecho sobre la propiedad intelectual de la aplicación
          salvo los derechos expresamente establecidos en estos Términos y
          Condiciones.
</p> <h2 class="text-xl font-semibold mb-4">
6. Limitación de Responsabilidad
</h2> <p class="mb-4">
No seremos responsables de ningún daño directo, indirecto, incidental,
          especial o consecuente que surja de o esté relacionado con el uso de
          la aplicación. Esto incluye, pero no se limita a, pérdida de datos,
          beneficios, o interrupción del negocio.
</p> <h2 class="text-xl font-semibold mb-4">7. Enlaces a Terceros</h2> <p class="mb-4">
Nuestra aplicación puede contener enlaces a sitios web de terceros. No
          somos responsables del contenido, políticas de privacidad o prácticas
          de esos sitios. Te recomendamos leer los términos y condiciones y
          políticas de privacidad de cualquier sitio web de terceros al que
          accedas a través de nuestra aplicación.
</p> <h2 class="text-xl font-semibold mb-4">8. Terminación</h2> <p class="mb-4">
Podemos suspender o terminar tu acceso a la aplicación en cualquier
          momento, sin previo aviso, si consideramos que has violado estos
          Términos y Condiciones o por cualquier otra razón.
</p> <h2 class="text-xl font-semibold mb-4">9. Ley Aplicable</h2> <p>
Estos Términos y Condiciones se regirán e interpretarán de acuerdo con
          las leyes aplicables en la jurisdicción correspondiente.
</p> </section> </main> </main> ` })}`;
}, "/home/suga/Dev/final-24/src/pages/terms-and-conditions.astro", void 0);

const $$file = "/home/suga/Dev/final-24/src/pages/terms-and-conditions.astro";
const $$url = "/terms-and-conditions";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$TermsAndConditions,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };