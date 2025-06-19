<template>
  <div class="min-h-screen py-8 bg-gradient-to-br from-[#f4f6f9] to-[#e8ecf3] dark:from-[#1a2234] dark:to-[#2c3b53]">
    <div class="container mx-auto px-4 space-y-10">
      <!-- Métricas principales -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
        <!-- Saldo Total -->
        <BaseCard wrapper-class="p-6 bg-[#f4f6f9]/90 dark:bg-[#1a2234]/90 backdrop-blur-xl rounded-xl shadow-lg border border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-full bg-[#fee2e2] dark:bg-[#991b1b]/30 flex items-center justify-center">
              <BanknotesIcon class="w-8 h-8 text-[#dc2626] dark:text-[#fca5a5]" />
            </div>
            <div>
              <p class="text-sm text-[#57697f] dark:text-[#a4b4d1] mb-1">Saldo Total</p>
              <p class="text-2xl font-bold text-[#dc2626] dark:text-[#fca5a5]">${{ formatNumber(saldoTotal) }}</p>
              <p class="text-xs text-[#57697f] dark:text-[#a4b4d1] mt-1">Actualizado al {{ today }}</p>
            </div>
          </div>
        </BaseCard>
        <!-- Saldo a Favor -->
        <BaseCard wrapper-class="p-6 bg-[#f4f6f9]/90 dark:bg-[#1a2234]/90 backdrop-blur-xl rounded-xl shadow-lg border border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-full bg-[#dcfce7] dark:bg-[#166534]/30 flex items-center justify-center">
              <CurrencyDollarIcon class="w-8 h-8 text-[#22c55e] dark:text-[#4ade80]" />
            </div>
            <div>
              <p class="text-sm text-[#57697f] dark:text-[#a4b4d1] mb-1">Saldo a Favor</p>
              <p class="text-2xl font-bold text-[#22c55e] dark:text-[#4ade80]">${{ formatNumber(saldoFavor) }}</p>
              <p class="text-xs text-[#57697f] dark:text-[#a4b4d1] mt-1">Disponible para utilizar</p>
            </div>
          </div>
        </BaseCard>
        <!-- Planes Activos -->
        <BaseCard wrapper-class="p-6 bg-[#f4f6f9]/90 dark:bg-[#1a2234]/90 backdrop-blur-xl rounded-xl shadow-lg border border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-full bg-[#dbeafe] dark:bg-[#1e3a8a]/30 flex items-center justify-center">
              <ClipboardDocumentListIcon class="w-8 h-8 text-[#3b82f6] dark:text-[#60a5fa]" />
            </div>
            <div>
              <p class="text-sm text-[#57697f] dark:text-[#a4b4d1] mb-1">Planes Activos</p>
              <p class="text-2xl font-bold text-[#3b82f6] dark:text-[#60a5fa]">{{ planesActivos }}</p>
              <p class="text-xs text-[#57697f] dark:text-[#a4b4d1] mt-1">{{ planesActivos === 1 ? 'Plan de financiación' : 'Planes de financiación' }}</p>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- Tabs -->
      <div class="flex justify-center">
        <div class="inline-flex bg-[#f4f6f9]/90 dark:bg-[#1a2234]/90 rounded-xl p-1">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            @click="activeTab = tab.value"
            :class="[
              activeTab === tab.value 
                ? 'bg-[#3b82f6] text-white shadow-[0_2px_8px_-2px_rgba(59,130,246,0.5)]' 
                : 'text-[#2c3b53] dark:text-white hover:bg-[#3d4e6c]/10 dark:hover:bg-[#3d4e6c]/20',
              'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200'
            ]"
          >
            <component :is="tab.icon" class="w-4 h-4 mr-1" />
            {{ tab.label }}
            <span v-if="tab.value==='impagos' && conceptosImpagos.length" class="ml-1 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold bg-[#dc2626] text-white rounded-full">{{ conceptosImpagos.length }}</span>
            <span v-if="tab.value==='planes' && planesActivos" class="ml-1 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold bg-[#3b82f6] text-white rounded-full">{{ planesActivos }}</span>
          </button>
        </div>
      </div>

      <!-- Contenido según tab -->
      <div v-if="activeTab==='impagos'" class="space-y-6 animate-fadeIn">
        <BaseCard wrapper-class="p-6 bg-[#f4f6f9]/90 dark:bg-[#1a2234]/90 backdrop-blur-xl rounded-xl shadow-lg border border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 class="text-xl font-semibold flex items-center gap-2 text-[#2c3b53] dark:text-white">
              <ExclamationTriangleIcon class="w-5 h-5 text-[#dc2626] dark:text-[#fca5a5]" />
              Conceptos Impagos
            </h2>
            <div class="flex flex-wrap gap-2">
              <!-- Buscador -->
              <div class="relative">
                <MagnifyingGlassIcon class="w-4 h-4 text-[#57697f] dark:text-[#a4b4d1] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  v-model="searchImpagos"
                  type="text"
                  placeholder="Buscar concepto..."
                  class="pl-8 pr-3 py-2 rounded-xl border border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20 bg-white dark:bg-[#1a2234] text-[#2c3b53] dark:text-white text-sm focus:ring-[#3b82f6]/70 focus:border-[#3b82f6]"
                />
              </div>
              <!-- Seleccionar todos -->
              <button
                v-if="conceptosImpagos.length"
                @click="toggleTodosImpagos"
                class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-[#3b82f6] hover:bg-[#60a5fa] text-white transition-all duration-200 shadow-[0_2px_8px_-2px_rgba(59,130,246,0.5)] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/70 focus:ring-offset-2 focus:ring-offset-[#f4f6f9] dark:focus:ring-offset-[#1a2234]"
              >
                <component :is="todosImpagosSeleccionados ? Squares2X2Icon : CheckCircleIcon" class="w-4 h-4" />
                {{ todosImpagosSeleccionados ? 'Deseleccionar' : 'Seleccionar Todos' }}
              </button>
            </div>
          </div>

          <!-- Lista / tabla -->
          <div v-if="conceptosImpagosFiltrados.length===0" class="text-center py-16">
            <FaceFrownIcon class="w-16 h-16 text-[#3d4e6c]/20 dark:text-[#3d4e6c]/40 mx-auto mb-4" />
            <p class="text-[#57697f] dark:text-[#a4b4d1]">No hay conceptos impagos</p>
          </div>

          <div v-else class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-[#f4f6f9]/90 dark:bg-[#1a2234]/90 text-[#2c3b53] dark:text-white">
                  <th class="px-4 py-3 text-left font-medium">Concepto</th>
                  <th class="px-4 py-3 text-left font-medium">Vencimiento</th>
                  <th class="px-4 py-3 text-right font-medium">Monto</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#3d4e6c]/10 dark:divide-[#3d4e6c]/20">
                <tr v-for="concepto in conceptosImpagosFiltrados" :key="concepto.id" class="hover:bg-[#3d4e6c]/5 dark:hover:bg-[#3d4e6c]/20 cursor-pointer transition-colors duration-200" @click="toggleConceptoImpago(concepto)">
                  <td class="px-4 py-3">
                    <div class="flex items-center gap-3">
                      <input type="checkbox" v-model="concepto.seleccionado" @click.stop class="rounded text-[#3b82f6] focus:ring-[#3b82f6]/70" />
                      <span class="text-[#2c3b53] dark:text-white">{{ concepto.nombre }}</span>
                    </div>
                  </td>
                  <td class="px-4 py-3" :class="{'text-[#dc2626] dark:text-[#fca5a5]': isVencido(concepto.vencimiento)}">
                    {{ formatDate(concepto.vencimiento) }}
                  </td>
                  <td class="px-4 py-3 text-right font-medium text-[#2c3b53] dark:text-white">${{ formatNumber(concepto.monto) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </BaseCard>
      </div>

      <!-- TAB PAGOS -->
      <div v-if="activeTab==='pagos'" class="space-y-6 animate-fadeIn">
        <BaseCard wrapper-class="p-6 bg-[#f4f6f9]/90 dark:bg-[#1a2234]/90 backdrop-blur-xl rounded-xl shadow-lg border border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 class="text-xl font-semibold flex items-center gap-2 text-[#2c3b53] dark:text-white">
              <CheckBadgeIcon class="w-5 h-5 text-[#22c55e] dark:text-[#4ade80]" />
              Conceptos Pagados
            </h2>
            <div class="flex flex-wrap gap-2 items-center">
              <!-- Filtro año -->
              <div class="relative">
                <select v-model="filtroAnio" class="pr-8 pl-3 py-2 rounded-xl border border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20 bg-white dark:bg-[#1a2234] text-[#2c3b53] dark:text-white text-sm focus:ring-[#3b82f6]/70 focus:border-[#3b82f6]">
                  <option value="">Todos los años</option>
                  <option v-for="a in aniosDisponibles" :key="a" :value="a">{{ a }}</option>
                </select>
              </div>
              <!-- Buscar -->
              <div class="relative">
                <MagnifyingGlassIcon class="w-4 h-4 text-[#57697f] dark:text-[#a4b4d1] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  v-model="searchPagos"
                  type="text"
                  placeholder="Buscar concepto..."
                  class="pl-8 pr-3 py-2 rounded-xl border border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20 bg-white dark:bg-[#1a2234] text-[#2c3b53] dark:text-white text-sm focus:ring-[#3b82f6]/70 focus:border-[#3b82f6]"
                />
              </div>
            </div>
          </div>

          <div v-if="Object.keys(conceptosPagosFiltrados).length===0" class="text-center py-12">
            <FaceFrownIcon class="w-16 h-16 text-[#3d4e6c]/20 dark:text-[#3d4e6c]/40 mx-auto mb-4" />
            <p class="text-[#57697f] dark:text-[#a4b4d1]">No se encontraron pagos</p>
          </div>

          <div v-else class="space-y-4">
            <div v-for="(conceptos, anio) in conceptosPagosFiltrados" :key="anio" class="border rounded-xl border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20">
              <!-- Header año -->
              <button @click="toggleAnio(anio)" class="w-full flex items-center justify-between px-4 py-3 bg-[#f4f6f9]/90 dark:bg-[#1a2234]/90 rounded-t-xl">
                <span class="font-medium text-[#2c3b53] dark:text-white">{{ anio }}</span>
                <ChevronDownIcon :class="[ 'w-4 h-4 transition-transform text-[#57697f] dark:text-[#a4b4d1]', aniosExpandidos.includes(anio) ? 'transform rotate-180' : '' ]" />
              </button>
              <!-- Tabla pagos -->
              <div v-show="aniosExpandidos.includes(anio)" class="overflow-x-auto">
                <table class="w-full text-sm">
                  <thead>
                    <tr class="bg-[#f4f6f9]/90 dark:bg-[#1a2234]/90 text-[#2c3b53] dark:text-white">
                      <th class="px-4 py-3 text-left font-medium">Concepto</th>
                      <th class="px-4 py-3 text-left font-medium">Fecha de Pago</th>
                      <th class="px-4 py-3 text-right font-medium">Monto</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[#3d4e6c]/10 dark:divide-[#3d4e6c]/20">
                    <tr v-for="c in conceptos" :key="c.id" class="hover:bg-[#3d4e6c]/5 dark:hover:bg-[#3d4e6c]/20 transition-colors duration-200">
                      <td class="px-4 py-3 text-[#2c3b53] dark:text-white">{{ c.nombre }}</td>
                      <td class="px-4 py-3 text-[#2c3b53] dark:text-white">{{ formatDate(c.fechaPago) }}</td>
                      <td class="px-4 py-3 text-right font-medium text-[#2c3b53] dark:text-white">${{ formatNumber(c.monto) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- TAB PLANES -->
      <div v-if="activeTab==='planes'" class="space-y-6 animate-fadeIn">
        <BaseCard wrapper-class="p-6 bg-[#f4f6f9]/90 dark:bg-[#1a2234]/90 backdrop-blur-xl rounded-xl shadow-lg border border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20">
          <h2 class="text-xl font-semibold flex items-center gap-2 mb-6 text-[#2c3b53] dark:text-white">
            <ClipboardDocumentListIcon class="w-5 h-5 text-[#3b82f6] dark:text-[#60a5fa]" />
            Planes de Pago
          </h2>

          <div v-if="planesPago.length===0" class="text-center py-12">
            <FaceFrownIcon class="w-16 h-16 text-[#3d4e6c]/20 dark:text-[#3d4e6c]/40 mx-auto mb-4" />
            <p class="text-[#57697f] dark:text-[#a4b4d1]">No tienes planes de pago activos</p>
          </div>

          <div v-else class="grid gap-4">
            <BaseCard v-for="plan in planesPago" :key="plan.id" wrapper-class="p-4 bg-[#f4f6f9]/90 dark:bg-[#1a2234]/90 backdrop-blur-xl rounded-xl shadow-lg border border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20">
              <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 class="font-semibold text-[#2c3b53] dark:text-white">{{ plan.nombre }}</h3>
                  <p class="text-sm text-[#57697f] dark:text-[#a4b4d1]">Inicio: {{ formatDate(plan.fechaInicio) }}</p>
                </div>
                <div class="flex-1">
                  <div class="w-full bg-[#3d4e6c]/10 dark:bg-[#3d4e6c]/20 rounded-full h-2.5">
                    <div class="bg-[#3b82f6] dark:bg-[#60a5fa] h-2.5 rounded-full" :style="`width:${Math.round((plan.cuotasPagadas/plan.cuotasTotal)*100)}%`"></div>
                  </div>
                  <p class="text-xs text-right mt-1 text-[#57697f] dark:text-[#a4b4d1]">{{ plan.cuotasPagadas }} / {{ plan.cuotasTotal }} cuotas</p>
                </div>
                <div class="text-sm font-medium text-[#3b82f6] dark:text-[#60a5fa] flex items-center gap-1">
                  <ClockIcon class="w-4 h-4" />
                  {{ Math.round((plan.cuotasPagadas/plan.cuotasTotal)*100) }}%
                </div>
              </div>
              <!-- Detalle cuotas -->
              <div class="mt-4 overflow-x-auto">
                <table class="w-full text-xs">
                  <thead>
                    <tr class="text-[#2c3b53] dark:text-white">
                      <th class="py-2 text-left font-medium">Cuota</th>
                      <th class="py-2 text-left font-medium">Vencimiento</th>
                      <th class="py-2 text-left font-medium">Estado</th>
                      <th class="py-2 text-right font-medium">Monto</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[#3d4e6c]/10 dark:divide-[#3d4e6c]/20">
                    <tr v-for="cuota in plan.cuotas" :key="cuota.numero">
                      <td class="py-2 text-[#2c3b53] dark:text-white">{{ cuota.numero }}</td>
                      <td class="py-2 text-[#2c3b53] dark:text-white">{{ formatDate(cuota.vencimiento) }}</td>
                      <td class="py-2">
                        <span :class="[
                          'px-2 py-0.5 rounded-full text-xs font-medium',
                          {
                            'bg-[#dcfce7] text-[#22c55e] dark:bg-[#166534]/30 dark:text-[#4ade80]': cuota.estado==='Pagado',
                            'bg-[#fef3c7] text-[#92400e] dark:bg-[#78350f]/30 dark:text-[#fde68a]': cuota.estado==='Pendiente',
                            'bg-[#fee2e2] text-[#dc2626] dark:bg-[#991b1b]/30 dark:text-[#fca5a5]': cuota.estado==='Vencido'
                          }
                        ]">{{ cuota.estado }}</span>
                      </td>
                      <td class="py-2 text-right font-medium text-[#2c3b53] dark:text-white">${{ formatNumber(cuota.monto) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </BaseCard>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import eventBus, { EventTypes } from 'host/eventBus';
import { useAuthStore } from '../stores/authStore';
import BaseCard from '../components/BaseCard.vue';
import {
  BanknotesIcon,
  CurrencyDollarIcon,
  ClipboardDocumentListIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  Squares2X2Icon,
  ChevronDownIcon,
  FaceFrownIcon,
  CheckBadgeIcon,
  ClockIcon
} from '@heroicons/vue/24/outline';
import { apiFetch } from '../utils/api.js';

/* ---- State ---- */
const formatDate = (d)=> new Date(d).toLocaleDateString('es-AR');
const today = formatDate(new Date());
const activeTab = ref('impagos');

const searchImpagos = ref('');
const searchPagos = ref('');
const filtroAnio = ref('');

// Datos obtenidos desde la API
const conceptosImpagos = ref([]);
const conceptosPagos = ref({}); // agrupado por año
const planesPago = ref([]);
const saldoFavor = ref(0);

// -- Helper: selección de carrera y obtención de nuevo token --
async function ensureCareerToken() {
  try {
    // 1. Obtener todas las carreras disponibles (cache primero)
    let carreras = [];
    try {
      const cached = localStorage.getItem('mis_carreras');
      if (cached) carreras = JSON.parse(cached);
    } catch (_) {}

    if (!carreras?.length) {
      const res = await apiFetch('/user/carreras', { method: 'GET' });
      carreras = res?.datos || res;
      localStorage.setItem('mis_carreras', JSON.stringify(carreras));
    }

    if (!Array.isArray(carreras) || carreras.length === 0) {
      console.warn('[CuentaCorriente] El usuario no posee carreras disponibles');
      return;
    }

    // ¿Tenemos carrera elegida previamente?
    const lastCareer = localStorage.getItem('career_selected');
    if (lastCareer && carreras.some(c=> String(c.pkinscripcion_carrera) === lastCareer)) {
      await apiFetch('/user/carrera', {
        method: 'POST',
        body: JSON.stringify({ pkinscripcion_carrera: Number(lastCareer) })
      });
      return;
    }

    // Si sólo hay una carrera, usamos esa automáticamente
    if (carreras.length === 1) {
       await apiFetch('/user/carrera', {
         method: 'POST',
         body: JSON.stringify({ pkinscripcion_carrera: carreras[0].pkinscripcion_carrera }),
       });
       localStorage.setItem('career_selected', carreras[0].pkinscripcion_carrera);
       return;
     }

    // 2. Mostrar modal de selección
    const SelectCarreraModal = (await import('../components/SelectCarreraModal.vue')).default;

    await new Promise((resolve, reject) => {
      const handleDataUpdated = async (payload) => {
        if (payload?.type === 'career-selected') {
          eventBus.off(EventTypes.DATA_UPDATED, handleDataUpdated);
          try {
            // Simplemente llama usando apiFetch que ya se encarga de capturar X-New-Token mediante el interceptor
            await apiFetch('/user/carrera', {
              method: 'POST',
              body: JSON.stringify({ pkinscripcion_carrera: payload.pkinscripcion_carrera })
            });
            localStorage.setItem('career_selected', payload.pkinscripcion_carrera);
            resolve();
          } catch (e) {
            reject(e);
          }
        }
      };

      eventBus.on(EventTypes.DATA_UPDATED, handleDataUpdated);

      eventBus.emit(EventTypes.SHOW_MODAL, {
        title: 'Seleccionar Carrera',
        component: SelectCarreraModal,
        props: { carreras },
        hideActions: true,
      });
    });
  } catch (e) {
    console.error('[CuentaCorriente] Error seleccionando carrera:', e);
  }
}

onMounted(async () => {
  // Asegurar token con carrera seleccionada antes de continuar
  await ensureCareerToken();

  try {
    const { datos } = await apiFetch('/cuentacorriente', {
      method: 'POST',
      body: JSON.stringify({})
    });

    // Impagos
    conceptosImpagos.value = (datos.conceptos_impagos || []).map(c => ({
      id: c.pkflujo,
      nombre: c.concepto,
      vencimiento: c.fecha_vencimiento,
      monto: c.importe,
      seleccionado: false
    }));

    // Pagados -> agrupar por año
    const pagosByYear = {};
    (datos.conceptos_pagados || []).forEach(p => {
      const year = new Date(p.fecha_pago).getFullYear();
      if (!pagosByYear[year]) pagosByYear[year] = [];
      pagosByYear[year].push({
        id: p.pkflujo,
        nombre: p.concepto,
        fechaPago: p.fecha_pago,
        monto: p.importe
      });
    });
    conceptosPagos.value = pagosByYear;

    // Planes
    planesPago.value = (datos.planes_pago || []).map(pl => ({
      id: pl.pkplan,
      nombre: pl.concepto,
      fechaInicio: pl.fecha_creacion,
      montoTotal: pl.monto_total,
      cuotasPagadas: pl.cuotas_pagadas,
      cuotasTotal: pl.cant_cuotas,
      // Si el backend no devuelve detalle de cuotas, dejamos array vacío
      cuotas: pl.cuotas || []
    }));

    // Saldos
    saldoFavor.value = (datos.resumen?.total_pagado || 0) - (datos.resumen?.total_impago || 0);
  } catch (e) {
    // El manejo global de apiFetch mostrará notificación de error
  }
});

/* ---- Computed ---- */
const saldoTotal = computed(()=> conceptosImpagos.value.reduce((sum,c)=>sum+c.monto,0));
const planesActivos = computed(()=> planesPago.value.length);

const conceptosImpagosFiltrados = computed(()=>{
  if(!searchImpagos.value) return conceptosImpagos.value;
  return conceptosImpagos.value.filter(c=> c.nombre.toLowerCase().includes(searchImpagos.value.toLowerCase()));
});

const todosImpagosSeleccionados = computed({
  get: ()=> conceptosImpagos.value.length>0 && conceptosImpagos.value.every(c=>c.seleccionado),
  set: (value)=> conceptosImpagos.value.forEach(c=> c.seleccionado=value)
});

/* ---- Pagos helpers ---- */
const aniosDisponibles = computed(()=> Object.keys(conceptosPagos.value).sort((a,b)=> b-a));

const conceptosPagosFiltrados = computed(()=>{
  const result = {};
  const years = filtroAnio.value ? [filtroAnio.value] : Object.keys(conceptosPagos.value);
  years.forEach(year=>{
    const list = conceptosPagos.value[year].filter(c=> c.nombre.toLowerCase().includes(searchPagos.value.toLowerCase()));
    if(list.length) result[year]=list;
  });
  return result;
});

const aniosExpandidos = ref(aniosDisponibles.value.slice(0,1));

/* ---- Methods ---- */
const toggleConceptoImpago = (concepto)=>{ concepto.seleccionado=!concepto.seleccionado; };
const toggleTodosImpagos = ()=>{ todosImpagosSeleccionados.value = !todosImpagosSeleccionados.value; };
const isVencido = (fecha)=> new Date(fecha)<new Date();
const formatNumber = (n)=> n.toLocaleString('es-AR',{minimumFractionDigits:2, maximumFractionDigits:2});

const toggleAnio = (anio)=>{
  if(aniosExpandidos.value.includes(anio)){
    aniosExpandidos.value = aniosExpandidos.value.filter(a=> a!==anio);
  } else {
    aniosExpandidos.value.push(anio);
  }
};

/* ---- Tabs meta ---- */
const tabs = [
  { value:'impagos', label:'Impagos', icon: ExclamationTriangleIcon },
  { value:'pagos', label:'Pagos', icon: ClipboardDocumentListIcon },
  { value:'planes', label:'Planes', icon: Squares2X2Icon }
];
</script>

<style scoped>
/* simple fade */
.animate-fadeIn{animation:fadeIn 0.3s ease-out;}
@keyframes fadeIn{from{opacity:0;transform:translateY(4px);} to{opacity:1;transform:translateY(0);} }
</style>
