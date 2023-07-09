import { ref, onMounted, onUnmounted } from "vue";

export default function useHover<T extends HTMLElement>() {
  const elementRef = ref<Option<T>>(null);
  const isHovering = ref(false);

  function hoverStart() {
    isHovering.value = true;
  }

  function hoverEnd(this: HTMLElement, event: Event) {
    if (window.TouchEvent && event instanceof TouchEvent) {
      const touch = event.changedTouches[0];
      if (this === document.elementFromPoint(touch.clientX, touch.clientY)) {
        return;
      }
    }

    isHovering.value = false;
  }

  onMounted(() => {
    elementRef.value?.addEventListener("mouseenter", hoverStart);
    elementRef.value?.addEventListener("touchstart", hoverStart);
    elementRef.value?.addEventListener("mouseleave", hoverEnd);
    document.addEventListener("touchend", hoverEnd);
  });

  onUnmounted(() => {
    elementRef.value?.removeEventListener("mouseenter", hoverStart);
    elementRef.value?.removeEventListener("touchstart", hoverStart);
    elementRef.value?.removeEventListener("mouseleave", hoverEnd);
    document.removeEventListener("touchend", hoverEnd);
  });

  return [isHovering, elementRef] as const;
}
