<template>
  <div class="MovingWaves">
    <svg
      class="waves"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 24 150 150"
      preserveAspectRatio="none"
      shape-rendering="auto"
    >
      <defs>
        <g style="mix-blend-mode:overlay">
          <path
            id="wave"
            d="M-160 40c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v150h-352z"
          />
        </g>
      </defs>
      <g class="parallax">
        <use
          v-for="_, i of new Array(4)"
          :key="i"
          xlink:href="#wave"
          x="48"
          :y="i * 3 - Math.max(i - 1, 0)"
          :style="{ '--wave-index': i }"
        />
      </g>
    </svg>
  </div>
</template>

<style lang="scss">
  .MovingWaves {
    &, svg {
      width: 100%;
      height: 100%;
    }

    .parallax > use {
      animation: move-forever 20s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
      fill: var(--color-accent);
      opacity: calc(var(--wave-index) * 0.2);
      animation-delay: calc(-7s - var(--wave-index) * 1s);
      animation-duration: calc(1s + var(--wave-index) * 3s);
    }
  }

  @keyframes move-forever {
    0% {
      translate: -50% 0;
    }
    100% {
      translate: 67% 0;
    }
  }
</style>
