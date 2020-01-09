<template>
  <div class="container">
    <div>
      <h1 class="title">ルーン文字ジェネレータ</h1>

      <h2 class="subtitle">
        入力をルーン文字に変換します。
      </h2>

      <div class="preview">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 600 600"
          width="300"
          height="300"
        >
          <text
            transform="translate(103.29 347.281)"
            fill="#333"
            font-size="64"
            font-family="Rune sans"
            letter-spacing="-0.002em"
          >
            <tspan x="0" y="26">{{ text }}</tspan>
          </text>
        </svg>
      </div>

      <div class="form">
        <input v-model="text" type="text" />
      </div>

      <button @click="create">ツイートする</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: ''
    }
  },
  methods: {
    create() {
      window.console.log('mock create')
    }
  }
}
</script>

<style>
@font-face {
  font-family: 'Rune sans';
  src: url('/RuneAssignMN_SansHumanicLike.otf');
  font-weight: normal;
}

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.preview {
  font-family: 'Rune sans';

  svg {
    width: 100%;
    max-height: 200px;
  }
}

.links {
  padding-top: 15px;
}
</style>
