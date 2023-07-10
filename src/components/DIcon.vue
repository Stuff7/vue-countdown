<script setup lang="ts">
defineProps<{ name: "exclamation-triangle" | "trash" | "plus" }>();
</script>

<template>
  <i :class="name" />
</template>

<style scoped lang="scss">
i {
  font-family: "Font Awesome";
  font-style: normal;

  &.exclamation-triangle::after {
    content: "\f071";
  }

  &.trash::after {
    content: "\f2ed";
  }

  &.plus::after {
    content: "\2b";
  }
}
</style>
