<template>
  <div class="min-h-screen py-8 bg-gradient-to-br from-[#f4f6f9] to-[#e8ecf3] dark:from-[#1a2234] dark:to-[#2c3b53]">
    <div class="container mx-auto px-4 space-y-10">
      <!-- Selector de Carrera -->
      <div v-if="!dataLoaded || showCareerSelector" class="mb-6">
        <BaseCard wrapper-class="p-4 mb-4 bg-blue-50 border-l-4 border-blue-500">
          <div class="flex items-start">
            <div class="mr-3 text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 class="text-md font-medium text-blue-800">{{ selectedCareer ? 'Cambiar Carrera' : 'Selección de Carrera' }}</h3>
              <p class="text-sm text-blue-700 mt-1">
                {{ selectedCareer ? 'Selecciona una carrera diferente para ver su cuenta corriente.' : 'Para ver tu cuenta corriente, primero debes seleccionar una carrera.' }}
              </p>
            </div>
          </div>
        </BaseCard>
        <CareerSelector />
      </div>
      
      <!-- Mensaje cuando hay carrera guardada pero no se pueden cargar datos -->
      <div v-if="!dataLoaded && !showCareerSelector && selectedCareer" class="mb-6">
        <BaseCard wrapper-class="p-4 mb-4 bg-yellow-50 border-l-4 border-yellow-500">
          <div class="flex items-start justify-between">
            <div class="flex items-start">
              <div class="mr-3 text-yellow-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h3 class="text-md font-medium text-yellow-800">Carrera: {{ selectedCareer.carrera }}</h3>
                <p class="text-sm text-yellow-700 mt-1">No se pudieron cargar los datos. Intenta recargar la página o selecciona otra carrera.</p>
              </div>
            </div>
            <button 
              @click="requestChangeCareer"
              class="ml-4 px-3 py-1 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors text-sm"
            >
              Cambiar
            </button>
          </div>
        </BaseCard>
      </div>
      
      <!-- Información de Carrera Seleccionada con botón de cambio -->
      <div v-if="dataLoaded && !showCareerSelector && selectedCareer" class="relative">
        <SelectedCareerInfo :career-info="selectedCareer" />
        
        <!-- Botón flotante para cambiar carrera -->
        <div class="fixed top-20 right-4 z-50 animate-scaleIn">
          <button 
            @click="requestChangeCareer"
            class="group inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl text-sm font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 transform hover:scale-105 hover:-translate-y-1 active:scale-95 backdrop-blur-sm border border-white/20"
            title="Cambiar carrera"
          >
            <div class="relative">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <div class="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
            </div>
            <span class="hidden sm:inline">Cambiar Carrera</span>
            <span class="sm:hidden">Cambiar</span>
          </button>
        </div>
      </div>
      <!-- Skeleton Loaders para métricas -->
      <div v-if="!dataLoaded && !showCareerSelector && selectedCareer" class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div v-for="i in 3" :key="i" class="animate-pulse">
          <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 h-32">
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-2xl"></div>
              <div class="flex-1">
                <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-24 mb-2"></div>
                <div class="h-8 bg-slate-200 dark:bg-slate-700 rounded w-32 mb-2"></div>
                <div class="h-3 bg-slate-200 dark:bg-slate-700 rounded w-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Métricas principales -->
      <div v-if="dataLoaded && !showCareerSelector" class="grid grid-cols-1 md:grid-cols-3 gap-8 animate-slideInUp mb-8">
        <!-- Saldo Total -->
        <BaseCard wrapper-class="relative overflow-hidden bg-gradient-to-br from-white via-red-50/30 to-rose-50/50 dark:from-slate-900 dark:via-red-900/10 dark:to-slate-900 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/30 hover:shadow-3xl hover:scale-105 transition-all duration-300 group">
          <!-- Decorative background -->
          <div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-red-400/10 to-rose-500/10 rounded-full blur-2xl transform translate-x-8 -translate-y-8"></div>
          
          <div class="relative p-6">
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <BanknotesIcon class="w-8 h-8 text-white" />
              </div>
              <div class="flex-1">
                <p class="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Saldo Total</p>
                <p class="text-3xl font-bold bg-gradient-to-r from-red-600 to-rose-600 dark:from-red-400 dark:to-rose-400 bg-clip-text text-transparent">
                  ${{ formatNumber(saldoTotal) }}
                </p>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Actualizado al {{ today }}
                </p>
              </div>
            </div>
          </div>
        </BaseCard>
        
        <!-- Saldo a Favor -->
        <BaseCard wrapper-class="relative overflow-hidden bg-gradient-to-br from-white via-emerald-50/30 to-green-50/50 dark:from-slate-900 dark:via-emerald-900/10 dark:to-slate-900 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/30 hover:shadow-3xl hover:scale-105 transition-all duration-300 group">
          <!-- Decorative background -->
          <div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-400/10 to-green-500/10 rounded-full blur-2xl transform translate-x-8 -translate-y-8"></div>
          
          <div class="relative p-6">
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <CurrencyDollarIcon class="w-8 h-8 text-white" />
              </div>
              <div class="flex-1">
                <p class="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Saldo a Favor</p>
                <p class="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400 bg-clip-text text-transparent">
                  ${{ formatNumber(saldoAFavor) }}
                </p>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Disponible para utilizar
                </p>
              </div>
            </div>
          </div>
        </BaseCard>
        
        <!-- Planes Activos -->
        <BaseCard wrapper-class="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 dark:from-slate-900 dark:via-blue-900/10 dark:to-slate-900 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/30 hover:shadow-3xl hover:scale-105 transition-all duration-300 group">
          <!-- Decorative background -->
          <div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-indigo-500/10 rounded-full blur-2xl transform translate-x-8 -translate-y-8"></div>
          
          <div class="relative p-6">
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <ClipboardDocumentListIcon class="w-8 h-8 text-white" />
              </div>
              <div class="flex-1">
                <p class="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Planes Activos</p>
                <p class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  {{ planesActivos }}
                </p>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  {{ planesActivos === 1 ? 'Plan de financiación' : 'Planes de financiación' }}
                </p>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- Skeleton Loader para tabs -->
      <div v-if="!dataLoaded && !showCareerSelector && selectedCareer" class="animate-pulse mb-8">
        <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
          <div class="flex space-x-4 mb-6">
            <div v-for="i in 3" :key="i" class="h-10 bg-slate-200 dark:bg-slate-700 rounded-lg w-24"></div>
          </div>
          <div class="space-y-4">
            <div v-for="i in 5" :key="i" class="h-16 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
          </div>
        </div>
      </div>
      
      <!-- Tabs -->
      <div v-if="dataLoaded && !showCareerSelector" class="flex justify-center mb-8">
        <div class="relative inline-flex bg-gradient-to-r from-white via-slate-50/50 to-white dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900 backdrop-blur-xl rounded-2xl p-1.5 shadow-xl border border-white/20 dark:border-slate-700/30">
          <!-- Background indicator -->
          <div class="absolute inset-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg transition-all duration-300 ease-out" 
               :style="{ transform: `translateX(${activeTabIndex * 100}%)`, width: `${100 / tabs.length}%` }"></div>
          
          <button
            v-for="(tab, index) in tabs"
            :key="tab.value"
            @click="activeTab = tab.value"
            :class="[
              'relative z-10 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 min-w-[140px] justify-center',
              activeTab === tab.value 
                ? 'text-white' 
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            ]"
          >
            <component :is="tab.icon" class="w-4 h-4" />
            <span>{{ tab.label }}</span>
            
            <!-- Badge for impagos -->
            <span v-if="tab.value==='impagos' && conceptosImpagos.length" 
                  :class="[
                    'inline-flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full transition-colors duration-300',
                    activeTab === tab.value 
                      ? 'bg-red-500 text-white' 
                      : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                  ]">
              {{ conceptosImpagos.length }}
            </span>
            
            <!-- Badge for planes -->
            <span v-if="tab.value==='planes' && planesActivos" 
                  :class="[
                    'inline-flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full transition-colors duration-300',
                    activeTab === tab.value 
                      ? 'bg-blue-400 text-white' 
                      : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                  ]">
              {{ planesActivos }}
            </span>
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

          <div v-else class="overflow-x-auto animate-slideInUp">
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-[#f4f6f9]/90 dark:bg-[#1a2234]/90 text-[#2c3b53] dark:text-white">
                  <th class="px-4 py-3 text-left font-medium">Concepto</th>
                  <th class="px-4 py-3 text-left font-medium">Vencimiento</th>
                  <th class="px-4 py-3 text-right font-medium">Monto</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#3d4e6c]/10 dark:divide-[#3d4e6c]/20">
                <tr 
                  v-for="(concepto, index) in conceptosImpagosFiltrados.slice(0, 30)" 
                  :key="concepto.id" 
                  class="hover:bg-[#3d4e6c]/5 dark:hover:bg-[#3d4e6c]/20 cursor-pointer transition-all duration-200 hover:scale-[1.01] hover:shadow-sm animate-fadeIn" 
                  :style="{ animationDelay: `${index * 30}ms` }"
                  @click="toggleConceptoImpago(concepto)"
                >
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
            <!-- Mostrar más botón si hay más de 30 elementos -->
            <div v-if="conceptosImpagosFiltrados.length > 30" class="p-4 text-center border-t border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20">
              <button class="px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200">
                Mostrar {{ conceptosImpagosFiltrados.length - 30 }} elementos más...
              </button>
            </div>
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
              <button @click="toggleAnioExpandido(anio)" class="w-full flex items-center justify-between px-4 py-3 bg-[#f4f6f9]/90 dark:bg-[#1a2234]/90 rounded-t-xl">
                <span class="font-medium text-[#2c3b53] dark:text-white">{{ anio }}</span>
                <ChevronDownIcon :class="[ 'w-4 h-4 transition-transform text-[#57697f] dark:text-[#a4b4d1]', isAnioExpandido(anio) ? 'transform rotate-180' : '' ]" />
              </button>
              <!-- Tabla pagos con lazy loading -->
              <div v-show="isAnioExpandido(anio)" class="overflow-x-auto animate-slideInUp">
                <table class="w-full text-sm">
                  <thead>
                    <tr class="bg-[#f4f6f9]/90 dark:bg-[#1a2234]/90 text-[#2c3b53] dark:text-white">
                      <th class="px-4 py-3 text-left font-medium">Concepto</th>
                      <th class="px-4 py-3 text-left font-medium">Fecha de Pago</th>
                      <th class="px-4 py-3 text-right font-medium">Monto</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[#3d4e6c]/10 dark:divide-[#3d4e6c]/20">
                    <tr 
                      v-for="(c, index) in conceptos.slice(0, 50)" 
                      :key="c.id" 
                      class="hover:bg-[#3d4e6c]/5 dark:hover:bg-[#3d4e6c]/20 transition-all duration-200 hover:scale-[1.01] hover:shadow-sm"
                      :style="{ animationDelay: `${index * 20}ms` }"
                    >
                      <td class="px-4 py-3 text-[#2c3b53] dark:text-white">{{ c.nombre }}</td>
                      <td class="px-4 py-3 text-[#2c3b53] dark:text-white">{{ formatDate(c.fechaPago) }}</td>
                      <td class="px-4 py-3 text-right font-medium text-[#2c3b53] dark:text-white">${{ formatNumber(c.monto) }}</td>
                    </tr>
                  </tbody>
                </table>
                <!-- Mostrar más botón si hay más de 50 elementos -->
                <div v-if="conceptos.length > 50" class="p-4 text-center border-t border-[#3d4e6c]/10 dark:border-[#3d4e6c]/20">
                  <button class="px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200">
                    Mostrar {{ conceptos.length - 50 }} elementos más...
                  </button>
                </div>
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
import { ref, computed, watch, onMounted, onBeforeMount, onUnmounted } from 'vue';
import BaseCard from '../components/BaseCard.vue';
import CareerSelector from '../components/CareerSelector.vue';
import SelectedCareerInfo from '../components/SelectedCareerInfo.vue';
import {
  BanknotesIcon,
  CurrencyDollarIcon,
  ClipboardDocumentListIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  Squares2X2Icon,
  FaceFrownIcon,
  ChevronDownIcon,
  CheckCircleIcon,
  CheckBadgeIcon,
  ClockIcon
} from '@heroicons/vue/24/outline';
import { apiFetch } from '../utils/api.js';
import eventBus, { EventTypes } from 'host/eventBus';

/* ---- State ---- */
const formatDate = (d)=> new Date(d).toLocaleDateString('es-AR');
const today = formatDate(new Date());
const activeTab = ref('impagos');
const dataLoaded = ref(false);
const showCareerSelector = ref(false);
const selectedCareer = ref(null);
let unsubscribe;
let unsubscribeChangeCareer;
let errorUnsubscribe;

const searchImpagos = ref('');
const searchPagos = ref('');
const filtroAnio = ref('');

// Datos obtenidos desde la API
const conceptosImpagos = ref([]);
const conceptosPagados = ref([]); // Lista de pagos
const planesPago = ref([]);
const saldoTotal = ref(0);
const saldoAFavor = ref(0);
const planesActivos = ref(0);

onMounted(async () => {
  // Verificar si hay una carrera guardada en localStorage
  const savedCareer = localStorage.getItem('selectedCareer');
  if (savedCareer) {
    try {
      selectedCareer.value = JSON.parse(savedCareer);
    } catch (e) {
      console.warn('Error parsing saved career:', e);
      localStorage.removeItem('selectedCareer');
    }
  }
  
  // Intentar cargar datos, si falla por falta de carrera seleccionada, mostrar selector
  try {
    await loadData();
  } catch (error) {
    // Si hay error y no hay carrera guardada, mostrar el selector de carrera
    if (!selectedCareer.value) {
      showCareerSelector.value = true;
    }
    dataLoaded.value = false;
  }
});

// Escuchar eventos de actualización de datos
onBeforeMount(() => {
  unsubscribe = eventBus.on(EventTypes.DATA_UPDATED, (payload) => {
    if (payload.type === 'career-selected') {
      showCareerSelector.value = false;
      loadData();
      
      // Mostrar mensaje de éxito
      eventBus.emit(EventTypes.SUCCESS, {
        message: 'Datos de cuenta corriente actualizados',
        timestamp: new Date().toISOString()
      });
    }
  });
  
  unsubscribeChangeCareer = eventBus.on(EventTypes.DATA_UPDATED, (payload) => {
    if (payload.type === 'change-career-requested') {
      showCareerSelector.value = true;
      dataLoaded.value = false;
      
      // Limpiar datos de la carrera seleccionada
      selectedCareer.value = null;
      localStorage.removeItem('selectedCareer');
    }
  });
  
  // Suscribirse a errores de API
  errorUnsubscribe = eventBus.on(EventTypes.ERROR, (error) => {
    // Si hay un error de autenticación, mostrar el selector de carrera
    if (error.status === 401) {
      showCareerSelector.value = true;
      dataLoaded.value = false;
    }
  });
});

onUnmounted(() => {
  if (unsubscribe) unsubscribe();
  if (unsubscribeChangeCareer) unsubscribeChangeCareer();
  if (errorUnsubscribe) errorUnsubscribe();
});

async function loadData() {
  try {
    dataLoaded.value = false;
    
    // Hacer la llamada a la API
    const response = await apiFetch('/cuentacorriente', {
      method: 'POST',
      body: JSON.stringify({})
    });
    const datos = response.datos;
    
    // Guardar información de la carrera seleccionada
    if (datos.carrera) {
      selectedCareer.value = {
        carrera: datos.carrera.carrera,
        condicion_academica: datos.carrera.condicion_academica || 'ACTIVO',
        legajo: datos.carrera.legajo || ''
      };
      
      // Persistir la carrera seleccionada en localStorage
      localStorage.setItem('selectedCareer', JSON.stringify(selectedCareer.value));
    }
    
    // Actualizar los datos de la cuenta corriente con la estructura correcta del backend
    conceptosImpagos.value = (datos.conceptos_impagos || []).map(concepto => ({
      id: concepto.pkflujo,
      nombre: concepto.concepto || concepto.observaciones || 'Concepto sin nombre',
      monto: parseFloat(concepto.importe) || 0,
      vencimiento: concepto.fecha_vencimiento,
      seleccionado: false
    }));
    
    conceptosPagados.value = (datos.conceptos_pagados || []).map(concepto => ({
      id: concepto.pkflujo,
      nombre: concepto.concepto || concepto.observaciones || 'Concepto sin nombre',
      monto: parseFloat(concepto.importe) || 0,
      fechaPago: concepto.fecha_pago,
      anio: concepto.fecha_pago ? new Date(concepto.fecha_pago).getFullYear() : null
    }));
    
    planesPago.value = datos.planes_pago || [];
    
    // Actualizar el resumen con los campos correctos
    if (datos.resumen) {
      saldoTotal.value = parseFloat(datos.resumen.total_impago) || 0;
      saldoAFavor.value = parseFloat(datos.resumen.total_pagado) || 0;
      planesActivos.value = parseInt(datos.resumen.cantidad_planes_pago) || 0;
    }
    
    dataLoaded.value = true;
    
    // Emitir evento de éxito
    eventBus.emit(EventTypes.SUCCESS, { type: 'data-loaded' });
  } catch (e) {
    // El manejo global de apiFetch mostrará notificación de error
  }
}

/* ---- Computed ---- */
// Estas propiedades ahora se actualizan directamente desde la API
// const saldoTotal = computed(()=> conceptosImpagos.value.reduce((sum,c)=>sum+c.monto,0));
// const planesActivos = computed(()=> planesPago.value.length);

const conceptosImpagosFiltrados = computed(()=>{
  if(!searchImpagos.value) return conceptosImpagos.value;
  return conceptosImpagos.value.filter(c=> 
    c.nombre?.toLowerCase().includes(searchImpagos.value.toLowerCase())
  );
});

const todosImpagosSeleccionados = computed({
  get: ()=> conceptosImpagos.value.length>0 && conceptosImpagos.value.every(c=>c.seleccionado),
  set: (value)=> conceptosImpagos.value.forEach(c=> c.seleccionado=value)
});

/* ---- Pagos helpers ---- */
const aniosDisponibles = computed(()=> {
  // Extraer años únicos de los pagos
  const years = new Set();
  conceptosPagados.value.forEach(pago => {
    if (pago.anio) {
      years.add(pago.anio.toString());
    } else if (pago.fecha_pago) {
      years.add(new Date(pago.fecha_pago).getFullYear().toString());
    }
  });
  return Array.from(years).sort((a,b)=> b-a);
});

const conceptosPagadosPorAnio = computed(() => {
  // Agrupar pagos por año
  const pagosByYear = {};
  conceptosPagados.value.forEach(pago => {
    const year = pago.anio || new Date(pago.fecha_pago).getFullYear().toString();
    if (!pagosByYear[year]) pagosByYear[year] = [];
    pagosByYear[year].push(pago);
  });
  return pagosByYear;
});

const conceptosPagosFiltrados = computed(()=>{
  const result = {};
  const years = filtroAnio.value ? [filtroAnio.value] : Object.keys(conceptosPagadosPorAnio.value);
  years.forEach(year=>{
    const list = conceptosPagadosPorAnio.value[year]?.filter(c=> {
      if (!searchPagos.value) return true;
      return c.nombre?.toLowerCase().includes(searchPagos.value.toLowerCase());
    });
    if(list?.length) result[year]=list;
  });
  return result;
});

const aniosExpandidos = ref([]);

// Inicializar años expandidos cuando se carguen los datos
watch(aniosDisponibles, (newValue) => {
  if (newValue.length > 0 && aniosExpandidos.value.length === 0) {
    aniosExpandidos.value = newValue.slice(0, 1);
  }
}, { immediate: true });

/* ---- Methods ---- */
const toggleConceptoImpago = (concepto) => { 
  // Asegurarse de que el concepto tenga la propiedad seleccionado
  if (!('seleccionado' in concepto)) {
    concepto.seleccionado = false;
  }
  concepto.seleccionado = !concepto.seleccionado; 
};

const toggleTodosImpagos = () => { 
  todosImpagosSeleccionados.value = !todosImpagosSeleccionados.value; 
};

const isVencido = (fecha) => {
  if (!fecha) return false;
  return new Date(fecha) < new Date();
};

const toggleAnioExpandido = (anio) => {
  const index = aniosExpandidos.value.indexOf(anio);
  if (index === -1) {
    aniosExpandidos.value.push(anio);
  } else {
    aniosExpandidos.value.splice(index, 1);
  }
};

const isAnioExpandido = (anio) => {
  return aniosExpandidos.value.includes(anio);
};

const requestChangeCareer = () => {
  eventBus.emit(EventTypes.DATA_UPDATED, {
    type: 'change-career-requested',
    timestamp: new Date().toISOString()
  });
};

const formatNumber = (n)=> n.toLocaleString('es-AR',{minimumFractionDigits:2, maximumFractionDigits:2});

const activeTabIndex = computed(() => {
  return tabs.findIndex(tab => tab.value === activeTab.value);
});

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
/* Animaciones mejoradas */
.animate-fadeIn {
  animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.animate-slideInUp {
  animation: slideInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.animate-slideInLeft {
  animation: slideInLeft 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.animate-scaleIn {
  animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-16px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Transiciones suaves para elementos interactivos */
.transition-smooth {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Efectos de hover mejorados */
.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Skeleton pulse mejorado */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
