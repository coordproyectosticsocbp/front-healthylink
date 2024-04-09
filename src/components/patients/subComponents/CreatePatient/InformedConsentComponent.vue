<script setup>
  import {useStore} from "vuex";
  import {computed, onMounted, ref} from "vue";
  import {Modal} from "bootstrap";

  const store = useStore()
  const authUser = computed(() => store.getters["auth/authUser"])
  const loggedUser = authUser.value.firstName + ' ' + authUser.value.lastName

  const getPatientData = ref([])
  const signature1 = ref(null)

  function save(t){
    console.log(signature1.value.save(t))
  }
  function cancel() {
    Modal.getInstance('#exampleModal')?.hide()
  }
  function clear() {
    signature1.value.clear()
  }
  function undo(){
    signature1.value.undo();
  }

  onMounted(() => {
    const storageVal = window.localStorage.getItem('patientForm')
    if (storageVal) getPatientData.value = JSON.parse(storageVal)
  })

</script>

<template>
  <div class="container mb-5">
    <div class="row">
      <div class="col">

        <div class="card">

          <div class="card-body">
            <div class="row">
              <div class="col text-center">
                <h4>
                  Formulario de consentimiento para: Plataforma Clínico-Genómica Integrada para la Investigación Biomédica en
                  Colombia
                </h4>
              </div>
            </div>

            <hr/>

            <div class="row">
              <div class="col">
                <ul class="list-unstyled">
                  <li>
                    <p class="fw-bold fs-6">PATROCINADOR: <span> Galatea Bio Inc. </span></p>
                  </li>
                  <li>
                    <p class="fw-bold fs-6">CO PATROCINADOR: <span> Healthylink Research S.A.S </span></p>
                  </li>
                  <li>
                    <p class="fw-bold fs-6">INVESTIGADOR: <span> {{ loggedUser }} </span></p>
                  </li>
                  <li>
                    <p class="fw-bold fs-6">NÚMERO(S) DE TELÉFONO RELACIONADO CON EL ESTUDIO: <span> Galatea Bio Inc. </span>
                    </p>
                  </li>
                  <li>
                    <p class="fw-bold fs-6">FICHA INSTRUCTIVA</p>
                  </li>
                </ul>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <p class="fw-bold fs-6">Introducción <span> Nos ponemos en contacto con usted para informarle sobre un estudio de investigación en el que se le invita a participar pruebas genómicas y análisis avanzados en Colombia. Este estudio ha sido aprobado por el comité de ética VITA. </span>
                </p>
                <p class="fs-6">Nuestra intención es que recibas la información necesaria para que puedas decidir si participas
                  o no en este estudio. Por favor, lea esta hoja informativa y responderemos a cualquier pregunta que pueda
                  tener. </p>
                <p class="fw-bold fs-6">Justificación de la investigación <span> El propósito de investigar en material genómico adjunto a información de riesgo clínico en la población estudiada es establecer las herramientas necesarias para realizar estudios genéticos que promuevan el mejoramiento de la prevención, diagnóstico y tratamiento de las enfermedades humanas. </span>
                </p>
                <p class="fw-bold fs-6">Te invitamos a participar <span> Su participación en este estudio es voluntaria y puedes decidir NO participar en cualquier momento, lo que significa que puedes retirar tu consentimiento si posteriormente decides hacerlo, sin perjuicio de tu atención médica. </span>
                </p>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <p class="fw-bold fs-6">Nuestros objetivos generales son: </p>
                <ol>
                  <li>Crear una plataforma de muestras y datos para la población Colombiana que sirva para crear una plataforma
                    clínico genómica integrada y así poder investigar enfermedades humanas.
                  </li>
                  <li>Como proyecto demostrativo de la utilidad de este recurso, nos proponemos estudiar las características
                    genéticas de la población estudiada.
                  </li>
                  <li>Identificar el riesgo genético asociado a las enfermedades crónicas.</li>
                  <li>Identificar el riesgo genético asociado a enfermedades infecciosas como el COVID-19.</li>
                </ol>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <p class="fs-6">
                  Con esto, pretendemos ayudar a construir una plataforma de muestras y datos que nos ayuden a estudiar las
                  causas de las enfermedades humanas en Colombia. En este contexto, nuestro objetivo es predecir el riesgo de
                  diversas enfermedades, mejorar el manejo y los resultados de las enfermedades, y obtener información que ayude
                  a descubrir nuevos medicamentos que protejan a las poblaciones vulnerables de los peores aspectos de muchas
                  enfermedades.
                </p>
                <p class="fw-bold fs-6">¿A qué estoy de acuerdo? </p>
                <p class="fs-6">Al dar su consentimiento para participar, acepta permitirnos tomar hisopos orales. Estas
                  muestras se utilizarán para pruebas genómicas. Su consentimiento también nos permite utilizar sus datos
                  genéticos, respuestas a encuestas de salud, datos clínicos y cualquier otro dato no identificable para la
                  investigación de marcadores genéticos asociados con la susceptibilidad, la gravedad, las enfermedades previas,
                  así como para futuras investigaciones relacionadas con cualquier enfermedad humana. Eliminaremos toda la
                  información (por ejemplo, nombres, correos electrónicos, direcciones, etc.) que pueda identificarlo antes de
                  utilizar los datos para la investigación con el fin de proteger su privacidad tanto como sea posible, de
                  acuerdo con la Ley 1581 de 2012, sobre la seguridad de los datos personales. </p>
                <p class="fs-6">Nunca habrá ningún costo para usted asociado con este estudio, y puede retirarse en cualquier
                  momento. </p>
                <p class="fs-6">La investigación implica el uso de sus datos genéticos, sus datos médicos de su registro médico
                  y / o sus respuestas a encuestas de salud y otra información no identificable para descubrir marcadores
                  genéticos que modifican la susceptibilidad, la gravedad u otras asociaciones con otra enfermedad subyacente; y
                  otras enfermedades humanas que puedan ser estudiadas en el futuro. Este documento proporciona la siguiente
                  información necesaria para el consentimiento informado: </p>
                <ul>
                  <li>El propósito y la naturaleza de la investigación.</li>
                  <li>El proceso de investigación.</li>
                  <li>Cómo se proporcionan los datos.</li>
                  <li>Qué haremos con tus datos.</li>
                  <li>Lo que se le pide que haga.</li>
                  <li>Todos los riesgos y beneficios de la participación; Cómo protegemos sus datos, cómo retirarse de la
                    investigación.
                  </li>
                  <li>A quién contactar si tiene preguntas.</li>
                </ul>
                <p class="fw-bold fs-6">¿Cómo proporciono mi muestra y datos genéticos? </p>
                <p class="fs-6">Tras su consentimiento, obtendremos una muestra biológica por medio de hisopos orales. En
                  algunos casos raros, es posible que las muestras biológicas no produzcan suficiente información genética para
                  ser utilizadas en estudios significativos. Si eso sucede, su muestra no se incluirá en el estudio.</p>
                <p class="fs-6">La recopilación de datos clínicos de las historias clínicas y/o los datos derivados de la
                  encuesta de salud incluirán información como edad, sexo, grupo étnico, enfermedades previas, antecedentes
                  familiares de enfermedades y/u otro tipo de información relacionada con su salud.</p>
                <p class="fw-bold fs-6">¿Cómo se utilizarán mis datos en la investigación? </p>
                <p class="fs-6">Sus datos se combinarán con la información de miles de otros participantes para ayudarnos a
                  buscar vínculos entre marcadores genéticos u otras enfermedades humanas que puedan estudiarse en el futuro. Si
                  participa, el equipo de investigación utilizará los resultados de sus pruebas de detección, sus datos
                  genéticos, registros médicos y datos de encuestas, como su edad, sexo y ascendencia (denominados
                  colectivamente "datos genéticos y fenotípicos"). Esta información no incluye información identificable
                  (nombre, dirección o correo electrónico). Sus muestras se codificarán para evitar la identificación posterior
                  directa y para comunicarse con usted si es necesario, pero no se analizarán en combinación con su información
                  genética y fenotípica. </p>
                <p class="fw-bold fs-6">¿Qué se hará con mis datos? </p>
                <p class="fs-6">Los miembros del equipo de investigación compararán la información de todos los participantes
                  para identificar asociaciones entre marcadores genéticos y otras enfermedades humanas que puedan estudiarse en
                  el futuro. Los investigadores que realizan análisis estadísticos nunca tendrán acceso a la información del
                  registro que identifique personalmente a los participantes. </p>
                <p class="fs-6">En virtud de este consentimiento informado, las entidades de investigación asociadas solo
                  tendrán acceso a datos agregados sin información identificable. Existe la posibilidad de que se eliminen los
                  identificadores de la información privada identificable y, después de hacerlo, la información se puede
                  utilizar para futuros estudios de investigación sin necesidad de ningún otro consentimiento informado. Por
                  ejemplo, podemos utilizar la información de los participantes para mejorar nuestros estudios para futuras
                  investigaciones. </p>
                <p class="fw-bold fs-6">¿Hay algún beneficio o riesgo en participar? </p>
                <p class="fw-bold fs-6">Beneficios</p>
                <p class="fw-bold fs-6">La participación en este estudio y por tanto la donación de su muestra son voluntarias,
                  como un gesto altruista, por lo que no recibirá ningún beneficio material y/o económico. Si está dispuesto,
                  podría beneficiarse de recibir los resultados de sus pruebas de ascendencia o los datos de su genoma sin
                  procesar con instrucciones para cargarlos en sitios de interpretación sin costo alguno. Sus proveedores de
                  atención médica pueden informarle, si lo desean, de los hallazgos derivados del análisis genómico de sus
                  datos, siempre y cuando se identifiquen resultados clínicamente relevantes para el manejo de su salud. </p>
                <p class="fs-6">Gracias a tu donación, se pueden realizar importantes aportaciones científicas que permitan
                  avanzar en el conocimiento de las enfermedades humanas, ayudando así a futuros pacientes. Se le notificará de
                  los hallazgos significativos a través de nuestras publicaciones de investigación. </p>
                <p class="fs-6">Habrá costos asociados con la obtención, conservación y envío de las muestras que no serán un
                  gasto para usted. </p>
                <p class="fs-6">No recibirá ninguna compensación económica u otros beneficios directos por parte de Galatea Bio
                  y Healthylink Research o sus colaboradores por participar en la investigación. Sin embargo, Galatea Bio,
                  Healthylink Research o sus socios académicos o comerciales pueden descubrir aspectos de su información
                  genética combinados con miles de otros participantes que tienen relevancia médica y/o utilidad en otros
                  estudios de investigación. Compartiremos esta información con su proveedor de atención médica, quien podría
                  comunicarse con usted para evaluar su interés en participar en dichos estudios adicionales. </p>
                <p class="fw-bold fs-6">Riesgos</p>
                <p class="fs-6">Si decides participar, debes saber que la recogida de muestras mediante hisopado oral o
                  extracción de sangre no supone ningún riesgo ni complicación, aunque es posible que sientas molestias en el
                  momento de la recogida de muestras. </p>
                <p class="fs-6">Galatea Bio y Healthylink Research, cuentan con procedimientos de seguridad sólidos para
                  minimizar la posibilidad de una violación de seguridad. Si bien Galatea Bio y Healthylink Research no pueden
                  garantizar completamente que sus datos estén seguros, las políticas y procedimientos de Galatea Bio y
                  Healthylink Research minimizan la posibilidad de que ocurra una violación. </p>
                <p class="fs-6">En el caso de que tu muestra arroje datos genéticos y optes por una copia, es posible que
                  descubras información que te parezca preocupante o incómoda. Por ejemplo, es posible que descubras que no
                  perteneces a un grupo étnico en particular, lo que pone en duda quiénes son realmente tus padres biológicos.
                  Tales revelaciones sorprendentes son poco comunes en la investigación genética, pero se sabe que
                  ocurrieron. </p>
                <p class="fs-6">Si el equipo de investigación pública los resultados de este estudio, su información genética y
                  la información que proporcionó pueden hacerse públicas, pero solo después de combinarse con un gran número de
                  otros participantes, por lo que la identificación de sus datos individuales es extremadamente difícil. Sin
                  embargo, un tercero que haya obtenido datos genéticos parciales puede comparar los datos parciales con los
                  resultados publicados y determinar sus respuestas a la encuesta. </p>
                <p class="fw-bold fs-6">Ninguna de las encuestas u otros procedimientos utilizados por los investigadores en
                  este estudio es invasivos o experimentales. <span> Los procedimientos involucran solo las molestias mínimas descritas anteriormente y no hay compensación o tratamiento justificable por lesiones como resultado de su participación.</span>
                </p>
                <p class="fw-bold fs-6">Alternativas</p>
                <p class="fs-6">Este no es un estudio de tratamiento. La alternativa es no participar.</p>
                <p class="fw-bold fs-6">Confidencialidad</p>
                <p class="fs-6">Su información privada y su historial médico pueden compartirse con personas y organizaciones
                  que desarrollan o supervisan esta investigación, entre ellas: </p>
                <p class="fs-6">El patrocinador de la investigación, Galatea Bio y el copatrocinador Healthylink Research,
                  personas que trabajan o se asociaron con el patrocinador de la investigación, incluidas las entidades
                  académicas y comerciales colaboradoras. Instituto Nacional de Vigilancia de Medicamentos y Alimentos (INVIMA),
                  el Instituto Nacional de Salud (INS), el Comité de Ética en Investigación de VITA Comité de ética en
                  investigación, evaluador independiente de este estudio.</p>
                <p class="fs-6">Es posible que publiquemos los resultados de esta investigación en artículos científicos. Sin
                  embargo, en ninguna circunstancia se utilizará su nombre y otra información identificable. </p>
                <p class="fw-bold fs-6">¿Cómo me retiro de este estudio? </p>
                <p class="fs-6">Su participación en este estudio es voluntaria. Usted puede decidir no participar o puede
                  abandonar el estudio en cualquier momento. Su decisión no resultará en ninguna multa o pérdida de beneficios a
                  los que de otro modo tendría derecho. </p>
                <p class="fs-6">Después de dar su consentimiento, proporcionar su muestra, dar permiso para acceder a su
                  información clínica y sus respuestas a la encuesta, su participación se considerará completa. Tiene derecho a
                  solicitar la retirada de sus datos y muestras de este proyecto. La investigación derivada del uso de sus
                  datos, realizada antes de su solicitud de retiro, no se puede revertir, deshacer o retirar. </p>
                <p class="fs-6">El patrocinador puede cancelar su participación en este estudio en cualquier momento, con o sin
                  su consentimiento, por cualquier motivo. </p>
                <p class="fw-bold fs-6">¿A quién puedo contactar si tengo preguntas? </p>
                <p class="fs-6">Si tiene alguna pregunta, inquietud o queja sobre la investigación o si cree que ha resultado
                  lesionado al participar en este estudio, envíe un correo electrónico al servicio de participantes de la
                  investigación: hor@hlinkresearch.com</p>
              </div>
            </div>

            <hr/>

            <div class="row">
              <div class="col">
                <h5 class="fw-bold text-center">FORMULARIO DE CONSENTIMIENTO INFORMADO</h5>

                <p class="fw-bold fs-6"><span>YO,</span>
                  {{ getPatientData.primer_nombre + ' ' + getPatientData.segundo_nombre
                        + ' ' + getPatientData.primer_apellido
                        + ' ' + getPatientData.segundo_apellido
                  }}
                  <span>Identificado con</span> {{ getPatientData.tipo_doc }}
                  <span>#</span> {{ getPatientData.numero_documento }}
                  <span>, residente en la ciudad de </span> {{ getPatientData.ciudad_residencia }}
                  <span>y con el número de teléfono celular </span> {{ getPatientData.telefono_celular }},
                  reconozco que he leído, entendido y aceptado participar en el estudio: Plataforma Clínico-Genómica Integrada
                  para la Investigación Biomédica en Colombia, según se define en este documento. He leído la siguiente
                  información:
                </p>
                <ul>
                  <li>¿A qué estoy de acuerdo?</li>
                  <li>¿Cómo proporciono mi muestra y datos genéticos?</li>
                  <li>¿Cómo se utilizarán mis datos en la investigación?</li>
                  <li>¿Qué pasará con mis datos?</li>
                  <li>Beneficios y riesgos de la participación</li>
                  <li>¿Cómo me retiro de este estudio?</li>
                  <li>¿A quién puedo contactar si tengo preguntas?</li>
                </ul>
                <p class="fs-6">Además, declaro que: </p>
                <ul>
                  <li>He podido hacer preguntas sobre el proceso y me las han aclarado. De acuerdo.</li>
                  <li>Entiendo que la participación en este proyecto es voluntaria y altruista. De acuerdo.</li>
                  <li>Entiendo cómo puedo retirar mi participación en este estudio. De acuerdo.</li>
                  <li>Entiendo que mis datos genéticos, respuestas a encuestas de salud, datos clínicos y cualquier otro dato no
                    identificable, pueden ser utilizados para futuras investigaciones relacionadas con cualquier enfermedad
                    humana. De acuerdo.
                  </li>
                  <li>Entiendo que Healthylink research y/o Galatea Bio pueden volver a ponerse en contacto conmigo en el futuro
                    (por ejemplo, para responder a preguntas de salud adicionales o para ser invitado a participar en
                    evaluaciones posteriores) (opcional). De acuerdo.
                  </li>
                  <li>He leído el consentimiento informado y doy mi permiso al equipo de investigación y a sus colaboradores
                    para realizar las pruebas de laboratorio descritas, incluida la secuenciación y otras pruebas de muestra.
                  </li>
                  <li>Entiendo y acepto que mis muestras, datos de pruebas e información clínica pueden ser utilizados, sin la
                    información que me identifica directamente, para futuras investigaciones, educación y fines asociados de
                    Galatea Bio, Healthylink Research y sus colaboradores académicos y comerciales, incluida la investigación y
                    el desarrollo de productos médicos.
                  </li>
                  <li>Entiendo que esto puede implicar que Galatea Bio y Healthylink Research comparta mis muestras, datos de
                    pruebas e información clínica con terceros, incluidos colaboradores académicos y comerciales, que pueden
                    estar fuera del país, con el fin de desarrollar este estudio u otros afines.
                  </li>
                  <li>Entiendo que no compartiré ninguna ganancia comercial si la investigación conduce a productos médicos o de
                    otro tipo.
                  </li>
                  <li>Entiendo que puede haber un riesgo para la privacidad de mis datos, pero en este estudio se asignará un
                    código único a mis muestras, pruebas e información clínica antes de cualquier uso en la investigación. Mi
                    nombre u otra información identificable no se usará ni se vinculará con mi muestra e información clínica
                    cuando se comparta con terceros, a menos que autorice explícitamente dicha divulgación.
                  </li>
                  <li>Entiendo que los miembros del equipo de investigación pueden ponerse en contacto conmigo más adelante con
                    respecto a mi interés en participar en otras actividades de investigación, incluida la contribución de
                    información clínica adicional o muestras para su uso en dichas actividades o la autorización del uso de mi
                    información de identificación para usos de investigación.
                  </li>
                </ul>
                <p class="fs-6">Por todo lo anterior, consiento en: </p>
                <ul>
                  <li>El personal investigador podrá utilizar las muestras donadas y mis datos para las condiciones establecidas
                    en este consentimiento.
                  </li>
                  <li>Mi información no identificable podrá ser utilizada por otras entidades nacionales e internacionales para
                    las condiciones establecidas en este consentimiento.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="card-footer">

              <div class="row mb-3">
                <div class="col">

                  <div class="signature-box">
                    <Vue3Signature id="signaturePad" ref="signature1"
                                   :w="'1052.8px'" :h="'400px'"
                                   class="signature-pad mb-4" />
                  </div>

                </div>
              </div>

            <div class="row">
              <div class="col">
                <div class="text-center">
                  <button class="btn btn-sm btn-danger me-1" @click="cancel">
                    <font-awesome-icon :icon="['fas', 'x']" />
                    Cancelar
                  </button>
                  <button class="btn btn-sm btn-warning me-1" @click="clear">
                    <font-awesome-icon :icon="['fas', 'brush']" />
                    Limpiar
                  </button>
                  <button class="btn btn-sm btn-primary me-1" @click="undo">
                    <font-awesome-icon :icon="['fas', 'rotate-left']" />
                    Regresar
                  </button>
                  <button class="btn btn-sm btn-success" @click="save('image/jpeg')">
                    <font-awesome-icon :icon="['fas', 'floppy-disk']" />
                    Guardar
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.signature-box {
  height: 400px !important;
  width: 100% !important;
}
.signature-pad {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  font-size: 10px;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 460px;
  border: 1px solid #e8e8e8;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.08) inset;
  border-radius: 4px;
  padding: 16px;
}

#signaturePad canvas {
  width: 100% !important;
}

</style>