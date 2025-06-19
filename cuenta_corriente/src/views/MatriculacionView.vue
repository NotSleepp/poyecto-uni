<template>
  <div class="min-h-screen bg-gradient-to-br from-[#f4f6f9] to-[#e8ecf3] dark:from-[#1a2234] dark:to-[#2c3b53] py-8">
    <div class="container mx-auto px-4">
      <!-- Stepper -->
      <div class="mb-8">
        <div class="flex items-center justify-between relative">
          <!-- Línea de progreso -->
          <div class="absolute left-0 right-0 top-1/2 -translate-y-1/2">
            <div class="h-[2px] bg-[#3d4e6c]/10 dark:bg-[#3d4e6c]/20">
              <div 
                class="h-full bg-primary-600 transition-all duration-500"
                :class="{
                  'w-0': estado === 'pedido',
                  'w-1/2': estado === 'en_curso',
                  'w-full': ['generada', 'rechazada'].includes(estado)
                }"
              ></div>
            </div>
          </div>
          
          <!-- Steps -->
          <div class="relative flex items-center gap-2 bg-[#f4f6f9]/90 dark:bg-[#1a2234]/90 backdrop-blur-xl rounded-full p-2 z-10">
            <div class="w-8 h-8 rounded-full flex items-center justify-center"
              :class="[
                estado === 'pedido' ? 'bg-primary-600 text-white' : 'bg-[#8195b8] dark:bg-[#475b7f] text-white',
              ]">
              <DocumentTextIcon class="w-5 h-5" />
            </div>
            <div>
              <p class="text-sm font-medium text-[#2c3b53] dark:text-white">Solicitud</p>
              <p class="text-xs text-[#57697f] dark:text-[#a4b4d1]">Selección de tipo</p>
            </div>
          </div>

          <div class="relative flex items-center gap-2 bg-[#f4f6f9]/90 dark:bg-[#1a2234]/90 backdrop-blur-xl rounded-full p-2 z-10">
            <div class="w-8 h-8 rounded-full flex items-center justify-center"
              :class="[
                estado === 'pedido' ? 'bg-[#3d4e6c]/20 text-[#3d4e6c] dark:bg-[#3d4e6c]/30 dark:text-[#a4b4d1]' :
                estado === 'en_curso' ? 'bg-primary-600 text-white' :
                'bg-[#8195b8] dark:bg-[#475b7f] text-white'
              ]">
              <ArrowPathIcon class="w-5 h-5" />
            </div>
            <div>
              <p class="text-sm font-medium" :class="estado === 'pedido' ? 'text-[#57697f] dark:text-[#a4b4d1]' : 'text-[#2c3b53] dark:text-white'">Procesamiento</p>
              <p class="text-xs text-[#57697f] dark:text-[#a4b4d1]">Verificación de datos</p>
            </div>
          </div>

          <div class="relative flex items-center gap-2 bg-[#f4f6f9]/90 dark:bg-[#1a2234]/90 backdrop-blur-xl rounded-full p-2 z-10">
            <div class="w-8 h-8 rounded-full flex items-center justify-center"
              :class="[
                ['pedido', 'en_curso'].includes(estado) ? 'bg-[#3d4e6c]/20 text-[#3d4e6c] dark:bg-[#3d4e6c]/30 dark:text-[#a4b4d1]' :
                estado === 'generada' ? 'bg-[#8195b8] dark:bg-[#475b7f] text-white' :
                'bg-red-600 text-white'
              ]">
              <component :is="estado === 'rechazada' ? XCircleIcon : CheckCircleIcon" class="w-5 h-5" />
            </div>
            <div>
              <p class="text-sm font-medium" :class="['pedido', 'en_curso'].includes(estado) ? 'text-[#57697f] dark:text-[#a4b4d1]' : 'text-[#2c3b53] dark:text-white'">
                {{ estado === 'rechazada' ? 'Resultado' : 'Finalización' }}
              </p>
              <p class="text-xs text-[#57697f] dark:text-[#a4b4d1]">
                {{ estado === 'rechazada' ? 'Solicitud rechazada' : 'Matriculación completada' }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Contenido principal -->
      <div class="max-w-4xl mx-auto">
        <!-- Estado: Pedido -->
        <div v-if="estado === 'pedido'" class="bg-[#f4f6f9]/90 dark:bg-[#1a2234]/90 backdrop-blur-xl rounded-xl shadow-lg border border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20">
          <div class="p-6">
            <div class="flex items-center gap-2 mb-6">
              <AcademicCapIcon class="w-5 h-5 text-primary-600" />
              <h2 class="text-lg font-medium text-[#2c3b53] dark:text-white">Pedido de Matriculación</h2>
            </div>

            <!-- Info Box -->
            <div class="bg-[#f4f6f9]/90 dark:bg-[#1a2234]/90 backdrop-blur-xl rounded-xl border border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20 p-4 mb-6">
              <div class="flex items-start gap-2">
                <InformationCircleIcon class="w-5 h-5 text-[#3b82f6] dark:text-[#60a5fa]" />
                <p class="text-sm text-[#57697f] dark:text-[#a4b4d1]">
                  Seleccione el tipo de cursante para iniciar el proceso de matriculación. Una vez generada, podrá descargar su comprobante.
                </p>
              </div>
            </div>

            <!-- Tipo de Cursante -->
            <div class="mb-6">
              <h3 class="text-base font-medium text-[#2c3b53] dark:text-white mb-4">Tipo de Cursante</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TypeCard
                  v-for="type in cursantTypes"
                  :key="type.value"
                  v-model="tipoCursante"
                  :value="type.value"
                  :icon="type.icon"
                  :label="type.label"
                  :desc="type.desc"
                />
              </div>
            </div>

            <!-- Detalles del tipo seleccionado -->
            <div v-if="tipoCursante" class="bg-[#f4f6f9]/90 dark:bg-[#1a2234]/90 backdrop-blur-xl rounded-xl border border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20 p-4 mb-6">
              <div class="flex items-start gap-2">
                <InformationCircleIcon class="w-5 h-5 text-[#3b82f6] dark:text-[#60a5fa]" />
                <div>
                  <h4 class="text-sm font-medium text-[#2c3b53] dark:text-white mb-1">Detalles del tipo seleccionado</h4>
                  <p class="text-sm text-[#57697f] dark:text-[#a4b4d1]">
                    {{ getTypeDescription(tipoCursante) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Botón de acción -->
            <div class="flex justify-center">
              <button
                @click="solicitarMatriculacion"
                :disabled="!tipoCursante"
                class="inline-flex items-center gap-2 px-6 py-2 bg-[#3b82f6] hover:bg-[#60a5fa] text-white rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_2px_8px_-2px_rgba(59,130,246,0.5)] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/70 focus:ring-offset-2 focus:ring-offset-[#f4f6f9] dark:focus:ring-offset-[#1a2234]"
              >
                <PaperAirplaneIcon class="w-5 h-5" />
                Solicitar Matriculación
              </button>
            </div>
          </div>
        </div>

        <!-- Estado: En curso -->
        <div v-if="estado === 'en_curso'" class="bg-[#f4f6f9]/90 dark:bg-[#1a2234]/90 backdrop-blur-xl rounded-xl shadow-lg border border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20">
          <div class="p-6">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-2">
                <ArrowPathIcon class="w-5 h-5 text-[#2c3b53] dark:text-white" />
                <h2 class="text-lg font-medium text-[#2c3b53] dark:text-white">Matriculación en Curso</h2>
              </div>
              <div class="px-3 py-1 bg-[#fef3c7] dark:bg-[#78350f]/30 text-[#92400e] dark:text-[#fde68a] rounded-xl text-sm font-medium">
                EN PROCESO
              </div>
            </div>

            <div class="bg-[#f4f6f9]/90 dark:bg-[#1a2234]/90 backdrop-blur-xl rounded-xl border border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20 p-6">
              <div class="flex justify-center mb-8">
                <div class="w-16 h-16 rounded-full bg-[#fef3c7] dark:bg-[#78350f]/30 flex items-center justify-center">
                  <ArrowPathIcon class="w-8 h-8 text-[#92400e] dark:text-[#fde68a] animate-spin" />
                </div>
              </div>

              <div class="space-y-4 mb-6">
                <div class="flex justify-between items-center">
                  <span class="text-[#57697f] dark:text-[#a4b4d1]">Tipo de Cursante:</span>
                  <span class="px-3 py-1 bg-[#3b82f6] text-white rounded-xl text-sm font-medium">{{ tipoCursante.toUpperCase() }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-[#57697f] dark:text-[#a4b4d1]">Fecha de Solicitud:</span>
                  <span class="text-[#2c3b53] dark:text-white">{{ format(fechaSolicitud, "DD/MM/YYYY HH:mm") }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-[#57697f] dark:text-[#a4b4d1]">Tiempo estimado:</span>
                  <span class="text-[#2c3b53] dark:text-white">1-2 minutos</span>
                </div>
              </div>

              <div class="h-2 bg-[#3d4e6c]/10 dark:bg-[#3d4e6c]/20 rounded-full overflow-hidden">
                <div class="h-full bg-[#92400e] dark:bg-[#fde68a] animate-progress"></div>
              </div>
            </div>

            <div class="mt-6 bg-[#dbeafe] dark:bg-[#1e3a8a]/20 rounded-xl p-4">
              <div class="flex items-start gap-2">
                <InformationCircleIcon class="w-5 h-5 text-[#3b82f6] dark:text-[#60a5fa]" />
                <div>
                  <h4 class="text-sm font-medium text-[#1e40af] dark:text-[#93c5fd] mb-1">Procesando su solicitud</h4>
                  <p class="text-sm text-[#57697f] dark:text-[#a4b4d1]">
                    Su solicitud está siendo procesada. Le notificaremos cuando esté lista. No cierre esta ventana.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Estado: Generada -->
        <div v-if="estado === 'generada'" class="bg-[#f4f6f9]/90 dark:bg-[#1a2234]/90 backdrop-blur-xl rounded-xl shadow-lg border border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20">
          <div class="p-6">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-2">
                <CheckCircleIcon class="w-5 h-5 text-[#22c55e] dark:text-[#4ade80]" />
                <h2 class="text-lg font-medium text-[#2c3b53] dark:text-white">Matriculación Generada</h2>
              </div>
              <div class="px-3 py-1 bg-[#dcfce7] dark:bg-[#166534]/30 text-[#15803d] dark:text-[#86efac] rounded-xl text-sm font-medium">
                COMPLETADA
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-[#f4f6f9]/90 dark:bg-[#1a2234]/90 backdrop-blur-xl rounded-xl border border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20 p-6">
                <div class="flex justify-center mb-6">
                  <div class="w-16 h-16 rounded-full bg-[#dcfce7] dark:bg-[#166534]/30 flex items-center justify-center">
                    <CheckCircleIcon class="w-8 h-8 text-[#22c55e] dark:text-[#4ade80]" />
                  </div>
                </div>

                <div class="space-y-4">
                  <div class="flex justify-between items-center">
                    <span class="text-[#57697f] dark:text-[#a4b4d1]">Tipo de Cursante:</span>
                    <span class="px-3 py-1 bg-[#3b82f6] text-white rounded-xl text-sm font-medium">{{ tipoCursante.toUpperCase() }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-[#57697f] dark:text-[#a4b4d1]">Fecha de Solicitud:</span>
                    <span class="text-[#2c3b53] dark:text-white">{{ format(fechaSolicitud, "DD/MM/YYYY HH:mm") }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-[#57697f] dark:text-[#a4b4d1]">Fecha de Generación:</span>
                    <span class="text-[#2c3b53] dark:text-white">{{ format(fechaGenerada, "DD/MM/YYYY HH:mm") }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-[#57697f] dark:text-[#a4b4d1]">Código de Referencia:</span>
                    <span class="font-mono text-[#22c55e] dark:text-[#4ade80]">REF-{{ generateCode() }}</span>
                  </div>
                </div>
              </div>

              <div class="flex flex-col justify-between space-y-6">
                <div class="bg-[#f4f6f9]/90 dark:bg-[#1a2234]/90 backdrop-blur-xl rounded-xl border border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20 p-6 flex-1">
                  <div class="flex items-start gap-2">
                    <InformationCircleIcon class="w-5 h-5 text-[#3b82f6] dark:text-[#60a5fa]" />
                    <div>
                      <h4 class="text-base font-medium text-[#2c3b53] dark:text-white mb-2">Matriculación exitosa</h4>
                      <p class="text-sm text-[#57697f] dark:text-[#a4b4d1] mb-4">
                        Su matriculación ha sido procesada correctamente. Puede descargar el comprobante utilizando el botón de abajo.
                      </p>
                    </div>
                  </div>
                </div>

                <div class="flex justify-center">
                  <button class="inline-flex items-center gap-2 px-6 py-2 bg-[#22c55e] hover:bg-[#16a34a] text-white rounded-xl transition-all duration-200 shadow-[0_2px_8px_-2px_rgba(34,197,94,0.5)] focus:outline-none focus:ring-2 focus:ring-[#22c55e]/70 focus:ring-offset-2 focus:ring-offset-[#f4f6f9] dark:focus:ring-offset-[#1a2234]">
                    <DocumentTextIcon class="w-5 h-5" />
                    Descargar Comprobante
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Estado: Rechazada -->
        <div v-if="estado === 'rechazada'" class="bg-[#f4f6f9]/90 dark:bg-[#1a2234]/90 backdrop-blur-xl rounded-xl shadow-lg border border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20">
          <div class="p-6">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-2">
                <AcademicCapIcon class="w-5 h-5 text-[#2c3b53] dark:text-white" />
                <h2 class="text-lg font-medium text-[#2c3b53] dark:text-white">Matriculación Rechazada</h2>
              </div>
              <div class="px-3 py-1 bg-[#fee2e2] dark:bg-[#991b1b]/30 text-[#dc2626] dark:text-[#fca5a5] rounded-xl text-sm font-medium">
                RECHAZADA
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-[#f4f6f9]/90 dark:bg-[#1a2234]/90 backdrop-blur-xl rounded-xl border border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20 p-6">
                <div class="flex justify-center mb-6">
                  <div class="w-16 h-16 rounded-full bg-[#fee2e2] dark:bg-[#991b1b]/30 flex items-center justify-center">
                    <XCircleIcon class="w-8 h-8 text-[#dc2626] dark:text-[#fca5a5]" />
                  </div>
                </div>

                <div class="space-y-4">
                  <div class="flex justify-between items-center">
                    <span class="text-[#57697f] dark:text-[#a4b4d1]">Tipo de Cursante:</span>
                    <span class="px-3 py-1 bg-[#3b82f6] text-white rounded-xl text-sm font-medium">{{ tipoCursante.toUpperCase() }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-[#57697f] dark:text-[#a4b4d1]">Fecha de Solicitud:</span>
                    <span class="text-[#2c3b53] dark:text-white">{{ format(fechaSolicitud, "DD/MM/YYYY HH:mm") }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-[#57697f] dark:text-[#a4b4d1]">Fecha de Rechazo:</span>
                    <span class="text-[#2c3b53] dark:text-white">{{ format(fechaRechazo, "DD/MM/YYYY HH:mm") }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-[#57697f] dark:text-[#a4b4d1]">Código de Referencia:</span>
                    <span class="font-mono text-[#dc2626] dark:text-[#fca5a5]">REF-{{ generateCode() }}</span>
                  </div>
                </div>
              </div>

              <div class="space-y-6">
                <div class="bg-[#f4f6f9]/90 dark:bg-[#1a2234]/90 backdrop-blur-xl rounded-xl border border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20 p-6">
                  <div class="flex items-start gap-2">
                    <XCircleIcon class="w-5 h-5 text-[#dc2626] dark:text-[#fca5a5]" />
                    <div>
                      <h4 class="text-base font-medium text-[#2c3b53] dark:text-white mb-2">Solicitud rechazada</h4>
                      <p class="text-sm text-[#57697f] dark:text-[#a4b4d1] mb-4">
                        Su solicitud de matriculación ha sido rechazada. Esto puede deberse a varios motivos:
                      </p>
                      <ul class="space-y-2 text-sm text-[#57697f] dark:text-[#a4b4d1]">
                        <li class="flex items-center gap-2">
                          <span class="w-1 h-1 rounded-full bg-[#3d4e6c]/40 dark:bg-[#3d4e6c]/60"></span>
                          Documentación pendiente
                        </li>
                        <li class="flex items-center gap-2">
                          <span class="w-1 h-1 rounded-full bg-[#3d4e6c]/40 dark:bg-[#3d4e6c]/60"></span>
                          Saldo pendiente de períodos anteriores
                        </li>
                        <li class="flex items-center gap-2">
                          <span class="w-1 h-1 rounded-full bg-[#3d4e6c]/40 dark:bg-[#3d4e6c]/60"></span>
                          Requisitos académicos no cumplidos
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="bg-[#f4f6f9]/90 dark:bg-[#1a2234]/90 backdrop-blur-xl rounded-xl border border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20 p-6">
                  <h4 class="text-base font-medium text-[#2c3b53] dark:text-white mb-4 flex items-center gap-2">
                    <QuestionMarkCircleIcon class="w-5 h-5 text-[#3b82f6] dark:text-[#60a5fa]" />
                    ¿Qué puedo hacer?
                  </h4>
                  <ul class="space-y-3 text-sm text-[#57697f] dark:text-[#a4b4d1]">
                    <li class="flex items-center gap-2">
                      <ChevronRightIcon class="w-4 h-4 text-[#3d4e6c]/60 dark:text-[#3d4e6c]/80" />
                      Contacte a la oficina de alumnos para obtener más información
                    </li>
                    <li class="flex items-center gap-2">
                      <ChevronRightIcon class="w-4 h-4 text-[#3d4e6c]/60 dark:text-[#3d4e6c]/80" />
                      Verifique su situación académica y financiera
                    </li>
                    <li class="flex items-center gap-2">
                      <ChevronRightIcon class="w-4 h-4 text-[#3d4e6c]/60 dark:text-[#3d4e6c]/80" />
                      Realice una nueva solicitud una vez resueltos los inconvenientes
                    </li>
                  </ul>
                </div>

                <div class="flex justify-center">
                  <button
                    @click="reiniciarSolicitud"
                    class="inline-flex items-center gap-2 px-6 py-2 bg-[#3b82f6] hover:bg-[#60a5fa] text-white rounded-xl transition-all duration-200 shadow-[0_2px_8px_-2px_rgba(59,130,246,0.5)] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/70 focus:ring-offset-2 focus:ring-offset-[#f4f6f9] dark:focus:ring-offset-[#1a2234]"
                  >
                    <ArrowPathIcon class="w-5 h-5" />
                    Realizar Nueva Solicitud
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

<script setup>
import { ref } from 'vue';
import { format } from '@formkit/tempo';
import BaseCard from '../components/BaseCard.vue';
import StepIndicator from '../components/StepIndicator.vue';
import TypeCard from '../components/TypeCard.vue';
import eventBus, { EventTypes } from 'host/eventBus';
import ConfirmMatriculacionModal from '../components/ConfirmMatriculacionModal.vue';
import { PaperAirplaneIcon, DocumentTextIcon, ArrowPathIcon, CheckCircleIcon, XCircleIcon, InformationCircleIcon, QuestionMarkCircleIcon, ChevronRightIcon, AcademicCapIcon } from '@heroicons/vue/24/outline';

const estado = ref('pedido');
const tipoCursante = ref('');
const fechaSolicitud = ref(new Date());
const fechaRechazo = ref(null);
const fechaGenerada = ref(null);

// Tipos de cursante predefinidos (Heroicons)
const cursantTypes = [
  {
    value: 'regular',
    icon: 'UserIcon',
    label: 'Regular',
    desc: 'Cursado completo'
  },
  {
    value: 'libre',
    icon: 'BookOpenIcon',
    label: 'Libre',
    desc: 'Solo exámenes'
  },
  {
    value: 'especial',
    icon: 'StarIcon',
    label: 'Especial',
    desc: 'Cursado parcial'
  }
];

// Descripciones detalladas por tipo
const getTypeDescription = (type) => {
  const descriptions = {
    regular: 'Acceso completo a clases presenciales y virtuales, material de estudio, y evaluaciones parciales y finales.',
    libre: 'Acceso únicamente a exámenes finales sin necesidad de asistir a clases. Incluye acceso al material de estudio digital.',
    especial: 'Modalidad flexible con acceso a clases específicas y evaluaciones adaptadas según necesidades particulares.'
  };
  return descriptions[type] || '';
};

// Generar código aleatorio
const generateCode = () => Math.floor(Math.random() * 10000).toString().padStart(4, '0');

// Función para solicitar matriculación utilizando el sistema de modales del host
const solicitarMatriculacion = () => {
  eventBus.emit(EventTypes.SHOW_MODAL, {
    title: 'Confirmación de Matriculación',
    component: ConfirmMatriculacionModal,
    props: { tipo: tipoCursante.value },
    confirmText: 'Sí, solicitar',
    cancelText: 'No, cancelar',
    onConfirm: () => {
      estado.value = 'en_curso';
      fechaSolicitud.value = new Date();

      setTimeout(() => {
        if (Math.random() > 0.2) {
          estado.value = 'generada';
          fechaGenerada.value = new Date();
        } else {
          estado.value = 'rechazada';
          fechaRechazo.value = new Date();
        }
      }, 3000);
    }
  });
};

// Función para reiniciar solicitud
const reiniciarSolicitud = () => {
  estado.value = 'pedido';
  tipoCursante.value = '';
  fechaSolicitud.value = new Date();
  fechaRechazo.value = null;
  fechaGenerada.value = null;
};
</script>

<style scoped>
/* Animaciones */
@keyframes progress {
  0% { width: 0%; }
  50% { width: 70%; }
  100% { width: 90%; }
}

.animate-progress {
  animation: progress 2s ease-in-out infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Transiciones suaves para cambios de tema */
* {
  transition-property: color, background-color, border-color, transform, opacity;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Optimizar rendimiento de las transiciones */
.card {
  will-change: background-color, border-color, color;
  backface-visibility: hidden;
  transform: translateZ(0);
  -webkit-font-smoothing: subpixel-antialiased;
}

/* Scrollbar personalizada */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  @apply bg-[#5a6d8f]/50 hover:bg-[#5a6d8f]/70 dark:bg-[#3d4e6c]/50 dark:hover:bg-[#3d4e6c]/70;
  border-radius: 4px;
}

/* Mejoras de legibilidad */
body {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Prevenir el parpadeo del contenido durante la carga del tema */
.dark body {
  @apply bg-[#1a2234];
}

/* Asegurar que las transiciones no se solapen */
.v-enter-active,
.v-leave-active {
  position: absolute;
  width: 100%;
}

.router-view-wrapper {
  position: relative;
  min-height: 100vh;
}
</style>
