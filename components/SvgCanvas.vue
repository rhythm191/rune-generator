<template>
  <svg
    ref="svg"
    :viewBox="`0 0 900 470`"
    class="svg-canvas"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="900"
  >
    <defs>
      <style type="text/css">
        @font-face {
          font-family: 'Rune sans';
          src: url('data:application/x-font-otf;charset=utf-8;base64,{{ runeFontBase64 }}')
            format('opentype');
          font-weight: normal;
        }
      </style>
    </defs>
    <rect
      :height="470"
      x="0"
      y="0"
      width="900"
      stroke="#333"
      style="fill: #fff;"
    />
    <rect
      :height="470 - 52"
      x="30"
      y="30"
      width="840"
      stroke="#333"
      style="fill: #fff;"
    />

    <text
      transform="translate(80 100)"
      fill="#333"
      font-size="64"
      font-family="Rune sans"
      letter-spacing="-0.002em"
    >
      <tspan
        v-for="(value, index) in texts"
        :key="index"
        :dy="index === 0 ? '0.2em' : '1.2em'"
        x="0"
      >
        {{ value }}
      </tspan>
    </text>
  </svg>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'hello world'
    },
    runeFontBase64: {
      type: String,
      required: true
    }
  },
  computed: {
    texts() {
      return this.text.split(/\r\n|\n/)
    },
    boxHeight() {
      return 155 + (this.texts.length - 1) * 75
    }
  }
}
</script>

<style scoped>
.svg-canvas {
  width: 100%;
}
</style>
