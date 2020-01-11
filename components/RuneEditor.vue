<template>
  <div class="editor">
    <div class="preview">
      <SvgCanvas
        ref="svgCanvas"
        :text="text"
        :runeFontBase64="runeFontBase64"
      ></SvgCanvas>
    </div>

    <textarea v-model="text" class="input-text" rows="4" />

    <button @click="create" class="tweet">ツイートする</button>
  </div>
</template>

<script>
import SvgCanvas from '~/components/SvgCanvas'
import { db, storage } from '~/plugins/firebase'

// svgをpngに変換
const svg2imageData = (svgElement, successCallback, errorCallback) => {
  const svgHeight = svgElement.height.baseVal.value

  const canvas = document.createElement('canvas')
  canvas.width = 1200
  canvas.height = svgHeight < 630 ? 630 : svgHeight
  const ctx = canvas.getContext('2d')

  const image = new Image()
  image.onload = () => {
    ctx.drawImage(image, 0, 0, 1200, canvas.height)
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
  components: {
    SvgCanvas
  },
  data() {
    return {
      text: 'Hello world',
      runeFontBase64: ''
    }
  },
  async created() {
    const otfRef = db.collection('fonts').doc('rune-otf')
    const fontValue = await otfRef.get()
    this.runeFontBase64 = fontValue.data().value
  },
  methods: {
    create() {
      svg2imageData(this.$refs.svgCanvas.$refs.svg, async (data) => {
        const newMessageRef = db.collection('messages').doc()

        const fileRef = storage.ref().child(`images/${newMessageRef.id}.png`)

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

<style scoped>
.input-text {
  display: block;
  padding: 5px;
  width: 93%;
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
