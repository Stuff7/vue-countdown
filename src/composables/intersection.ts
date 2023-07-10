import { ref, watchEffect } from "vue";

export default function useIntersectionObserver<E extends HTMLElement>(
  callback: (intersection: IntersectionObserverEntry) => unknown,
  options: IntersectionObserverInit = {},
) {
  const node = ref<Option<E>>(null);

  watchEffect((onCleanup) => {
    if (!node.value) {
      return;
    }
    const { root = document.body, threshold = 1 } = options;

    const observer = new IntersectionObserver(([intersection]) => {
      callback(intersection);
    }, { root, threshold, ...options });

    observer.observe(node.value);

    onCleanup(() => {
      if (observer && node.value) {
        observer.unobserve(node.value);
        observer.disconnect();
      }
    });
  });

  return node;
}
