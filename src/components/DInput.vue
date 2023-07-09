<script setup lang="ts">
import { ref } from "vue";

const NUMBER_PATTERN = /^-?(\d+\.?\d*|\d*\.?\d+)$/;
const emit = defineEmits<{ (e: "update:modelValue", value: string): void }>();
const props = withDefaults(
  defineProps<{ label?: string, modelValue: string | number, type?: "text" | "number" }>(),
  { label: "", type: "text" },
);

const inputText = ref(props.modelValue);
const inputError = ref<Option<string>>(null);
const buzz = ref(false);

function validateInput(event: Event) {
  inputError.value = null;
  const prevValue = inputText.value;
  const { target } = event;
  if (!(target instanceof HTMLInputElement)) {
    return;
  }

  inputText.value = target.value;
  if (props.type === "text" || NUMBER_PATTERN.test(`${target.value}0`)) {
    emit("update:modelValue", target.value);
  } else {
    inputText.value = prevValue;
    inputError.value = "Only numbers!";
    buzz.value = true;
  }
}
</script>

<template>
  <div
    :class="{ buzz }"
    :data-error="inputError"
    @animationend="buzz = false"
  >
    <input
      type="text"
      :value="inputText"
      placeholder=" "
      v-bind="$attrs"
      @input="validateInput"
    >
    <label>{{ label }}</label>
    <p v-if="inputError">
      <i class="warn" />
      {{ inputError }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
div {
  position: relative;
  display: inline-flex;
  align-items: center;
  font-size: var(--p-nm-100);

  &:hover {
    input {
      border-bottom-color: var(--color-text-3);
    }

    label {
      color: var(--color-text-3);
    }
  }

  label {
    pointer-events: none;
    position: absolute;
    font-size: var(--p-nm-100);
    font-weight: bold;
    bottom: 50%;
    translate: 0 50%;
    color: var(--color-text-1);
    padding: 0 var(--spacing-nm-100);
    transition: bottom .3s, font-size .3s, translate .3s, padding .3s, color .3s;
    text-transform: var(--label-text-transform, initial);
  }

  p {
    pointer-events: none;
    position: absolute;
    top: 0;
    right: 0;
    color: var(--color-error);
    font-size: calc(var(--p-nm-100) * 0.75);
    white-space: nowrap;
  }

  input {
    display: inline-block;
    width: 100%;
    padding: calc(var(--spacing-nm-100) * 1.5) var(--spacing-nm-100);
    color: var(--color-text-1);
    background: transparent;
    font-size: var(--p-nm-100);
    border: none;
    border-bottom: 2px solid;
    border-bottom-color: var(--color-text-1);
    transition: border .3s, text-indent .3s;

    &:focus, &:active, &:not(:placeholder-shown) {
      border-bottom-color: var(--color-accent);

      & + label {
        bottom: var(--radius-nm-100);
        translate: 0;
        padding: 0;
        font-size: calc(var(--p-nm-100) * 0.75);
        color: var(--color-accent);
      }
    }
  }

  &[data-error] {
    &.buzz {
      animation: buzz 0.82s cubic-bezier(.36,.07,.19,.97) both;
    }

    input {
      border-bottom-color: var(--color-error);

      & + label {
        color: var(--color-error);
      }
    }
  }
}

@keyframes buzz {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
