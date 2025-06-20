<template>
  <div class="min-h-screen py-8 bg-gradient-to-br from-[#f4f6f9] to-[#e8ecf3] dark:from-[#1a2234] dark:to-[#2c3b53]">
    <div class="container mx-auto px-4 space-y-10 max-w-6xl">
      <!-- Tabla conceptos -->
      <BaseCard wrapper-class="p-0 overflow-hidden bg-[#f4f6f9]/90 dark:bg-[#1a2234]/90 backdrop-blur-xl rounded-xl shadow-lg border border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20">
        <!-- header -->
        <div class="flex items-center justify-between px-4 py-3 border-b border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20 bg-[#f4f6f9]/90 dark:bg-[#1a2234]/90">
          <div class="flex items-center gap-3">
            <ReceiptPercentIcon class="w-5 h-5 text-[#3b82f6] dark:text-[#60a5fa]" />
            <h2 class="font-semibold text-[#2c3b53] dark:text-white">Conceptos a Pagar</h2>
            <span class="inline-flex items-center justify-center text-xs font-medium bg-[#3d4e6c]/10 dark:bg-[#3d4e6c]/20 text-[#2c3b53] dark:text-white rounded-full px-2 py-0.5">{{ conceptos.length }}</span>
          </div>
          <button @click="toggleTodos" class="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium bg-[#3b82f6] hover:bg-[#60a5fa] text-white transition-all duration-200 shadow-[0_2px_8px_-2px_rgba(59,130,246,0.5)] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/70 focus:ring-offset-2 focus:ring-offset-[#f4f6f9] dark:focus:ring-offset-[#1a2234]">
            <component :is="todosSeleccionados ? Squares2X2Icon : CheckCircleIcon" class="w-4 h-4" />
            {{ todosSeleccionados ? 'Deseleccionar' : 'Seleccionar Todos' }}
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-[#f4f6f9]/90 dark:bg-[#1a2234]/90 text-[#2c3b53] dark:text-white">
              <tr>
                <th class="px-4 py-3 w-10">
                  <input type="checkbox" v-model="todosSeleccionadosComputed" class="rounded text-[#3b82f6] focus:ring-[#3b82f6]/70" />
                </th>
                <th class="px-4 py-3 text-left">Concepto</th>
                <th class="px-4 py-3 text-right">Monto Origen</th>
                <th class="px-4 py-3 text-right">Descuento 1° V.</th>
                <th class="px-4 py-3 text-right">Importe 1° V.</th>
                <th class="px-4 py-3 text-right">Importe 2° V.</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#3d4e6c]/10 dark:divide-[#3d4e6c]/20">
              <tr
                v-for="c in conceptos"
                :key="c.id"
                @click="toggleConcepto(c)"
                class="hover:bg-[#3d4e6c]/5 dark:hover:bg-[#3d4e6c]/20 cursor-pointer transition-colors duration-200"
                :class="c.seleccionado ? 'bg-[#3b82f6]/5 dark:bg-[#3b82f6]/10' : ''"
              >
                <td class="px-4 py-3">
                  <input type="checkbox" v-model="c.seleccionado" @click.stop class="rounded text-[#3b82f6] focus:ring-[#3b82f6]/70" />
                </td>
                <td class="px-4 py-3 text-[#2c3b53] dark:text-white">{{ c.nombre }}</td>
                <td class="px-4 py-3 text-right font-mono text-[#2c3b53] dark:text-white">${{ formatNumber(c.original) }}</td>
                <td class="px-4 py-3 text-right font-mono text-[#22c55e] dark:text-[#4ade80]">- ${{ formatNumber(c.descuento) }}</td>
                <td class="px-4 py-3 text-right font-mono font-medium text-[#15803d] dark:text-[#86efac]">${{ formatNumber(c.importe1) }}</td>
                <td class="px-4 py-3 text-right font-mono text-[#57697f] dark:text-[#a4b4d1]">${{ formatNumber(c.importe2) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- footer -->
        <div class="flex items-center justify-between px-4 py-3 bg-[#f4f6f9]/90 dark:bg-[#1a2234]/90 border-t border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20 text-sm">
          <p class="text-[#57697f] dark:text-[#a4b4d1]">Seleccionados: <span class="font-medium text-[#3b82f6] dark:text-[#60a5fa]">{{ conceptosSeleccionados }}</span></p>
          <p class="text-[#2c3b53] dark:text-white">Total: <span class="font-semibold text-lg text-[#3b82f6] dark:text-[#60a5fa]">${{ formatNumber(total1) }}</span></p>
        </div>
      </BaseCard>

      <!-- Resumen y medios de pago -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Fecha -->
        <BaseCard wrapper-class="p-6 flex flex-col gap-4 bg-[#f4f6f9]/90 dark:bg-[#1a2234]/90 backdrop-blur-xl rounded-xl shadow-lg border border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20">
          <div class="flex items-center gap-2">
            <CalendarDaysIcon class="w-5 h-5 text-[#3b82f6] dark:text-[#60a5fa]" />
            <h3 class="font-semibold text-[#2c3b53] dark:text-white">Fecha 1er Vencimiento</h3>
          </div>
          <input type="date" v-model="fechaVencimiento" class="px-3 py-2 rounded-xl border border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20 bg-white dark:bg-[#1a2234] text-sm focus:ring-[#3b82f6]/70 focus:border-[#3b82f6] text-[#2c3b53] dark:text-white" />
          <p class="text-xs text-[#3b82f6] dark:text-[#60a5fa]">Esta fecha afecta los beneficios aplicables</p>
        </BaseCard>

        <!-- Medios -->
        <BaseCard wrapper-class="p-6 flex flex-col gap-4 bg-[#f4f6f9]/90 dark:bg-[#1a2234]/90 backdrop-blur-xl rounded-xl shadow-lg border border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20">
          <div class="flex items-center gap-2 mb-2">
            <CreditCardIcon class="w-5 h-5 text-[#3b82f6] dark:text-[#60a5fa]" />
            <h3 class="font-semibold text-[#2c3b53] dark:text-white">Medios de Pago</h3>
          </div>
          <div class="space-y-3">
            <div v-for="m in mediosPago" :key="m.nombre" class="flex items-center gap-3 p-2 rounded-xl border border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20 bg-white/50 dark:bg-[#1a2234]/50">
              <component :is="m.icon" class="w-6 h-6 text-[#57697f] dark:text-[#a4b4d1]" />
              <div class="flex-1">
                <p class="font-medium text-sm text-[#2c3b53] dark:text-white">{{ m.nombre }}</p>
                <p class="text-xs text-[#57697f] dark:text-[#a4b4d1]">{{ m.desc }}</p>
              </div>
            </div>
          </div>
        </BaseCard>

        <!-- Resumen -->
        <BaseCard wrapper-class="p-6 flex flex-col gap-4 bg-[#f4f6f9]/90 dark:bg-[#1a2234]/90 backdrop-blur-xl rounded-xl shadow-lg border border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20">
          <div class="flex items-center gap-2">
            <ChartPieIcon class="w-5 h-5 text-[#3b82f6] dark:text-[#60a5fa]" />
            <h3 class="font-semibold text-[#2c3b53] dark:text-white">Resumen de Pago</h3>
          </div>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-[#57697f] dark:text-[#a4b4d1]">Subtotal</span>
              <span class="font-mono text-[#2c3b53] dark:text-white">${{ formatNumber(subtotal) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-[#57697f] dark:text-[#a4b4d1]">Descuentos</span>
              <span class="font-mono text-[#22c55e] dark:text-[#4ade80]">- ${{ formatNumber(descuentos) }}</span>
            </div>
            <div class="border-t border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20 my-2"></div>
            <div class="flex justify-between text-lg font-medium">
              <span class="text-[#2c3b53] dark:text-white">Total</span>
              <span class="font-mono text-[#3b82f6] dark:text-[#60a5fa]">${{ formatNumber(total1) }}</span>
            </div>
            <p class="text-xs text-[#57697f] dark:text-[#a4b4d1] text-right">al {{ formatDate(fechaVencimiento) }}</p>
          </div>
          <div class="text-xs text-[#92400e] dark:text-[#fde68a] bg-[#fef3c7] dark:bg-[#78350f]/30 rounded-xl p-2">Después del vencimiento: <strong>${{ formatNumber(total2) }}</strong></div>
          <button :disabled="!haySeleccion" @click="generarCupon" class="mt-2 inline-flex items-center gap-2 justify-center w-full px-4 py-2 rounded-xl bg-[#3b82f6] hover:bg-[#60a5fa] text-white font-medium disabled:opacity-50 transition-all duration-200 shadow-[0_2px_8px_-2px_rgba(59,130,246,0.5)] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/70 focus:ring-offset-2 focus:ring-offset-[#f4f6f9] dark:focus:ring-offset-[#1a2234]">
            <DocumentArrowDownIcon class="w-5 h-5" />
            Generar Cupón
          </button>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseCard from '../components/BaseCard.vue';
import {
  ReceiptPercentIcon,
  CheckCircleIcon,
  Squares2X2Icon,
  CalendarDaysIcon,
  CreditCardIcon,
  ChartPieIcon,
  DocumentArrowDownIcon,
  BanknotesIcon,
  BuildingLibraryIcon,
  DevicePhoneMobileIcon
} from '@heroicons/vue/24/outline';
import { ref, computed, onMounted } from 'vue';
import { apiFetch } from '../utils/api.js';
import eventBus, { EventTypes } from 'host/eventBus';

function formatNumber(n){ return n.toLocaleString('es-AR',{minimumFractionDigits:2, maximumFractionDigits:2}); }
const formatDate = (d)=> new Date(d).toLocaleDateString('es-AR');

// Datos de conceptos a pagar
const conceptos = ref([]);
const fechaVencimiento = ref(new Date().toISOString().split('T')[0]);
const isLoading = ref(false);
const error = ref(null);

// Cargar datos al montar el componente
onMounted(async () => {
  await loadData();
});

async function loadData() {
  try {
    isLoading.value = true;
    error.value = null;
    
    // Hacer la llamada a la API
    const response = await apiFetch('/cuentacorriente/conceptos-pago', {
      method: 'POST',
      body: JSON.stringify({})
    });
    
    if (response.datos && response.datos.conceptos) {
      conceptos.value = response.datos.conceptos.map(c => ({
        ...c,
        seleccionado: false
      }));
      
      if (response.datos.fecha_vencimiento) {
        fechaVencimiento.value = response.datos.fecha_vencimiento;
      }
    } else {
      conceptos.value = [];
    }
    
    // Emitir evento de éxito
    eventBus.emit(EventTypes.SUCCESS, {
      message: 'Datos de conceptos a pagar cargados',
      timestamp: new Date().toISOString()
    });
  } catch (e) {
    error.value = e.message || 'Error al cargar los conceptos a pagar';
    eventBus.emit(EventTypes.ERROR, e);
  } finally {
    isLoading.value = false;
  }
}

// Medios de pago (solo ilustrativos)
const mediosPago = [
  { nombre:'Provincia Net', desc:'Pago en efectivo', icon: BuildingLibraryIcon },
  { nombre:'Pago Fácil', desc:'Pago en efectivo', icon: BanknotesIcon },
  { nombre:'Mercado Pago', desc:'Tarjeta / Transferencia', icon: DevicePhoneMobileIcon }
];

const todosSeleccionadosComputed = computed({
  get(){ return conceptos.value.every(c=>c.seleccionado); },
  set(val){ conceptos.value.forEach(c=> c.seleccionado = val); }
});

const todosSeleccionados = computed(()=> todosSeleccionadosComputed.value);
const conceptosSeleccionados = computed(()=> conceptos.value.filter(c=>c.seleccionado).length);
const haySeleccion = computed(()=> conceptosSeleccionados.value>0);

const subtotal = computed(()=> conceptos.value.filter(c=>c.seleccionado).reduce((s,c)=> s+c.original,0));
const descuentos = computed(()=> conceptos.value.filter(c=>c.seleccionado).reduce((s,c)=> s+c.descuento,0));
const total1 = computed(()=> conceptos.value.filter(c=>c.seleccionado).reduce((s,c)=> s+c.importe1,0));
const total2 = computed(()=> conceptos.value.filter(c=>c.seleccionado).reduce((s,c)=> s+c.importe2,0));

function toggleTodos(){ todosSeleccionadosComputed.value = !todosSeleccionadosComputed.value; }
function toggleConcepto(c){ c.seleccionado=!c.seleccionado; }

function generarCupon(){
  if(!haySeleccion.value) return;
  const resumen = `Conceptos: ${conceptosSeleccionados.value}\nTotal: $${formatNumber(total1.value)}\nVencimiento: ${formatDate(fechaVencimiento.value)}`;
  window.alert('Cupón generado!\n\n'+resumen);
}
</script>
