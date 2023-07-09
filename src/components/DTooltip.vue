<script setup lang="ts">
import { onMounted, ref } from "vue";
import useHover from "~/composables/hover";
import useMousePosition from "~/composables/mouse-position";

const props = defineProps<{ for?: string }>();

onMounted(() => {
  parentRef.value = props.for ? document.querySelector(props.for) : anchorRef.value?.parentElement || null;
});

const { x, y } = useMousePosition();
const [isHovering, parentRef] = useHover();
const anchorRef = ref<Option<HTMLElement>>(null);
</script>

<template>
  <Teleport
    v-if="isHovering"
    to="#tooltip-layer"
  >
    <div role="tooltip">
      <slot />
    </div>
  </Teleport>
  <span
    v-if="!parentRef"
    ref="anchorRef"
  />
</template>

<style scoped lang="scss">
@use "~/style/base";
@use "~/style/color";

div {
  position: absolute;
  left: calc(v-bind(x) * 1px + 1rem);
  top: calc(v-bind(y) * 1px + 1rem);
  pointer-events: none;
  background: color.alpha(--color-background-3, 0.9);
  color: var(--color-text-1);
  box-shadow: 0 0 base.rem(10) 0 var(--color-background-1);
  border-radius: var(--radius-nm-100);
  padding: var(--spacing-nm-100);
  width: max-content;
  min-width: clamp(base.rem(48), 4vw, base.rem(96));
  max-width: clamp(base.rem(220), 80vw, base.rem(900));
}

span {
  display: none;
}
</style>
