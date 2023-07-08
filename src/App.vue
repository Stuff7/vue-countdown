<script setup lang="ts">
import { reactive, ref } from "vue";
import LiquidCountdown from "~/components/LiquidCountdown.vue";
import LabeledInput from "~/components/LabeledInput.vue";
import { setLocalItem } from "~/storage";
import { MILLIS_AS, getCountdowns } from "~/countdown";

const inputCountdown = reactive({ name: "Countdown", days: 0, hours: 0, minutes: 0, seconds: 0 });
const countdowns = ref(getCountdowns());

function addCountdown() {
  const duration = (
    inputCountdown.days * MILLIS_AS.days +
    inputCountdown.hours * MILLIS_AS.hours +
    inputCountdown.minutes * MILLIS_AS.minutes +
    inputCountdown.seconds * MILLIS_AS.seconds
  );
  countdowns.value.push({
    id: crypto.randomUUID(),
    name: inputCountdown.name,
    end: Date.now() + duration,
    duration,
  });
  setLocalItem("countdowns", countdowns.value);
}

function delCountdown(index: number) {
  countdowns.value.splice(Number(index), 1);
  setLocalItem("countdowns", countdowns.value);
}
</script>

<template>
  <main>
    <article>
      <form @submit.prevent="addCountdown">
        <labeled-input
          v-model="inputCountdown.name"
          type="text"
          label="Name"
        />
        <labeled-input
          v-for="unit of (['days', 'hours', 'minutes', 'seconds'] as const)"
          :key="unit"
          v-model.number="inputCountdown[unit]"
          size="7"
          type="number"
          :label="unit"
          :style="{ '--label-text-transform': 'capitalize' }"
        />
        <button>
          <i class="plus" />
        </button>
      </form>
      <ul>
        <li
          v-for="countdown, i of countdowns"
          :key="countdown.id"
        >
          <button @click="delCountdown(i)">
            <i class="trash" />
          </button>
          <liquid-countdown v-bind="countdown" />
        </li>
      </ul>
    </article>
  </main>
</template>

<style scoped lang="scss">
main {
  width: 100vw;
  height: 100vh;

  article {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: var(--spacing-nm-100);
    gap: var(--spacing-nm-100);
  }

  form {
    display: grid;
    align-items: center;
    gap: var(--spacing-nm-100);
    grid-template-columns: 1fr repeat(5, max-content);

    button {
      background: var(--color-accent);
      color: var(--color-background-1);
      padding: 0 var(--spacing-nm-200);
      font-size: var(--p-nm-100);
      border-radius: var(--radius-nm-100);
      font-weight: bold;
      aspect-ratio: 1 / 1;

      &:hover {
        background: var(--color-text-1);
      }
    }
  }

  ul {
    display: grid;
    width: 100%;
    gap: var(--spacing-nm-100);
    grid-template-columns: repeat(4, 1fr);
    list-style: none;
    padding: 0;
  }

  li {
    position: relative;

    button {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1;
      color: var(--color-background-1);
      background: transparent;
      padding: 0 var(--spacing-nm-100);
      font-size: var(--p-nm-200);

      &:hover {
        color: var(--color-accent);
      }
    }
  }
}
</style>