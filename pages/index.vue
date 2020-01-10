<template>
  <div class="container">
    <div>
      <h1 class="title">ルーン文字ジェネレータ</h1>

      <h2 class="subtitle">
        入力をルーン文字に変換します。
      </h2>

      <div class="preview">
        <svg
          ref="svgPreview"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 600 300"
          width="600"
          height="300"
        >
          <rect
            x="0"
            y="0"
            width="600"
            height="300"
            stroke="#333"
            style="fill: none;"
          />
          <rect
            x="30"
            y="30"
            width="540"
            height="240"
            stroke="#333"
            style="fill: none;"
          />
          <text
            transform="translate(80 100)"
            fill="#333"
            font-size="64"
            font-family="Rune sans"
            letter-spacing="-0.002em"
          >
            <tspan>{{ text }}</tspan>
          </text>
        </svg>
      </div>

      <div class="form">
        <textarea v-model="text" />
      </div>

      <button @click="create">ツイートする</button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

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
      text: ''
    }
  },
  methods: {
    create() {
      svg2imageData(this.$refs.svgPreview, async (data) => {
        const sRef = firebase.storage().ref()
        const fileRef = sRef.child(`${this.uuid}.png`)

        // Firebase Cloud Storageにアップロード
        await fileRef.putString(data, 'data_url')
        const url = await fileRef.getDownloadURL()
        window.console.log(url)

        // Firestoreに保存しておく
        const card = db.collection('cards').doc(this.uuid)
        await card.set({
          url,
          message: this.text
        })
      })
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
}
.preview svg {
  width: 100%;
  max-height: 200px;
}

.links {
  padding-top: 15px;
}
</style>
