<template>
  <svg :width="size" :height="size" class="rotate-[-90deg]">
    <circle
      :cx="size/2"
      :cy="size/2"
      :r="radius"
      :stroke="bgColor"
      :stroke-width="stroke"
      fill="transparent"/>
    <circle
      :cx="size/2"
      :cy="size/2"
      :r="radius"
      :stroke="color"
      :stroke-width="stroke"
      stroke-linecap="round"
      fill="transparent"
      :stroke-dasharray="circumference"
      :stroke-dashoffset="dashoffset"/>
    <text :x="size/2" :y="size/2" dy="4" text-anchor="middle" :class="textClass" class="font-semibold">
      {{ percent }}%
    </text>
  </svg>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  percent: { type: Number, default: 0 },
  size: { type: Number, default: 80 },
  stroke: { type: Number, default: 6 },
  color: { type: String, default: '#2563eb' },
  bgColor: { type: String, default: '#e5e7eb' },
  textClass: { type: String, default: 'text-gray-800 dark:text-gray-100' }
});

const radius = computed(() => (props.size - props.stroke) / 2);
const circumference = computed(() => 2 * Math.PI * radius.value);
const dashoffset = computed(() => circumference.value - (props.percent / 100) * circumference.value);
</script>