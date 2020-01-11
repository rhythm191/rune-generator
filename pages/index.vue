<template>
  <div class="container">
    <div>
      <header>
        <h1 class="title">ルーン文字ジェネレータ</h1>

        <h2 class="subtitle">
          入力をルーン文字に変換します。
        </h2>
      </header>

      <div class="preview">
        <svg
          ref="svgPreview"
          :viewBox="`0 0 600 ${boxHeight}`"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="600"
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
            :height="boxHeight"
            x="0"
            y="0"
            width="600"
            stroke="#333"
            style="fill: #fff;"
          />
          <rect
            :height="boxHeight - 52"
            x="30"
            y="30"
            width="540"
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
      </div>

      <textarea v-model="text" class="input-text" rows="4" />

      <button @click="create" class="tweet">ツイートする</button>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'

import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/firebase-storage'

// firebaseのconfig情報をペースト
const firebaseConfig = {
  apiKey: 'AIzaSyBowQPLl_2txOUmJfTd9ek9usvhG2Z59R0',
  authDomain: 'rune-generator.firebaseapp.com',
  databaseURL: 'https://rune-generator.firebaseio.com',
  projectId: 'rune-generator',
  storageBucket: 'rune-generator.appspot.com',
  messagingSenderId: '563458965490',
  appId: '1:563458965490:web:8bbe001ba88d315966b56b',
  measurementId: 'G-B4KFEMW3NR'
}
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

// svgをpngに変換
const svg2imageData = (svgElement, successCallback, errorCallback) => {
  const canvas = document.createElement('canvas')
  canvas.width = 1200
  canvas.height = 630
  const ctx = canvas.getContext('2d')

  const image = new Image()
  image.onload = () => {
    ctx.drawImage(image, 0, 0, 1200, 630)
    successCallback(canvas.toDataURL())
  }
  image.onerror = (e) => {
    errorCallback(e)
  }
  const svgData = new XMLSerializer().serializeToString(svgElement)
  image.src =
    'data:image/svg+xml;charset=utf-8;base64,' +
    btoa(unescape(encodeURIComponent(svgData)))
}

export default {
  data() {
    return {
      text: 'Hello world'
    }
  },
  computed: {
    texts() {
      return this.text.split(/\r\n|\n/)
    },
    boxHeight() {
      return 155 + (this.texts.length - 1) * 75
    }
  },
  async asyncData({ params }) {
    const otfRef = db.collection('fonts').doc('rune-otf')
    const fontValue = await otfRef.get()
    return { runeFontBase64: fontValue.data().value }
  },
  methods: {
    create() {
      svg2imageData(this.$refs.svgPreview, async (data) => {
        const sRef = firebase.storage().ref()
        const newMessageRef = db.collection('messages').doc()

        const fileRef = sRef.child(`images/${newMessageRef.id}.png`)

        // Firebase Cloud Storageにアップロード
        await fileRef.putString(data, 'data_url')
        const url = await fileRef.getDownloadURL()
        window.console.log(url)

        // Firestoreに保存しておく
        await newMessageRef.set({
          url,
          message: this.text
        })
      })
    }
  }
}
</script>

<style>
/* @font-face {
  font-family: 'Rune sans';
  src: url('/RuneAssignMN_SansHumanicLike.otf')
    format('opentype');
  font-weight: normal;
} */

.container {
  margin: 0 auto;
  max-width: 960px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

header {
  margin-bottom: 30px;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 600;
  font-size: 35px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 24px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

/* .preview {
  font-family: 'Rune sans';
} */
.preview svg {
  width: 100%;
}

.input-text {
  display: block;
  width: 95%;
  margin: 20px auto;
  border: 1px solid #ccc;
  font-size: 22px;
}

.tweet {
  font-size: 28px;
  padding: 0.5em 2em;
  background-color: #1da1f2;
  background-image: none;
  border: 1px solid #1da1f2;
  color: #fff;
}

.tweet:hover {
  background-color: #1b95e0;
  background-image: none;
  border: 1px solid #1b95e0;
}
</style>
