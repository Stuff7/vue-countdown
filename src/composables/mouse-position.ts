import { ref, onMounted, onUnmounted } from "vue";

export default function useMousePosition() {
  const x = ref(0);
  const y = ref(0);

  function update(event: MouseTouchEvent) {
    const { clientX, clientY } = getPagePos(event);
    x.value = clientX;
    y.value = clientY;
  }

  onMounted(() => window.addEventListener("mousemove", update));
  onUnmounted(() => window.removeEventListener("mousemove", update));

  return { x, y };
}

function getPagePos(e: MouseTouchEvent) {
  if (window.TouchEvent && e instanceof TouchEvent) {
    return e.touches[0];
  }
  return e as MouseEvent;
}
