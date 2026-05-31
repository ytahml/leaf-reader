<script setup lang="ts">
interface Props {
  size?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 28,
})
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 2C14 2 8 8 8 14C8 17.5 10 21 14 24C18 21 20 17.5 20 14C20 8 14 2 14 2Z"
      stroke="currentColor"
      stroke-width="1.2"
      fill="none"
    />
    <path d="M14 8V20" stroke="currentColor" stroke-width="0.8" opacity="0.5" />
    <path d="M14 12C16 10 18 10.5 18 10.5" stroke="currentColor" stroke-width="0.6" opacity="0.3" />
    <path d="M14 15C12 13 10 13.5 10 13.5" stroke="currentColor" stroke-width="0.6" opacity="0.3" />
  </svg>
</template>
