<script setup lang="ts">
import { computed, ref } from "vue";
import MovingWaves from "~/components/MovingWaves.vue";
import { parseDuration } from "miscfe/time";
import countdown, { type Countdown } from "~/countdown";

const props = defineProps<Countdown>();

const currentTime = ref(Math.max(props.end - Date.now() + 1, 0));
countdown(currentTime.value, (time) => currentTime.value = time);
const progress = computed(() => 100 - currentTime.value / props.duration * 100);
const remaining = computed(() => {
  const time = parseDuration(currentTime.value);
  return {
    days: time.days,
    hours: [time.hours, time.minutes, time.seconds].map(n => n.toString().padStart(2, "0")).join(":"),
  };
});
</script>

<template>
  <section class="LiquidCountdown">
    <h1>{{ name }}</h1>
    <div class="LiquidCountdown__circle">
      <moving-waves :style="{ '--progress': `${progress}%` }" />
      <p v-if="currentTime">
        <strong v-if="remaining.days">{{ remaining.days }} days</strong>
        {{ remaining.hours }}
      </p>
      <p v-else>
        Completed!
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.LiquidCountdown {
  display: flex;
  flex-direction: column;
  position: relative;

  &__circle {
    border-radius: 0 0 50% 50%;
    aspect-ratio: 1 / 1;
    border: 0.2rem solid var(--color-text-1);
    overflow: hidden;
    display: flex;
    align-items: end;
    position: relative;
  }

  .MovingWaves {
    transition: height 0.5s;
    height: var(--progress);
  }

  p {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: var(--p-nm-200);
    animation: pop 0.5s cubic-bezier(0.64, 0.57, 0.67, 1.53);
  }

  strong {
    font-weight: bold;
  }

  h1 {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    top: 0;
    background: var(--color-text-1);
    color: var(--color-background-1);
    font-size: var(--p-nm-200);
    font-weight: bold;
  }
}

@keyframes pop {
  0% {
    scale: 1.5;
  }
  100% {
    scale: 1;
  }
}
</style>