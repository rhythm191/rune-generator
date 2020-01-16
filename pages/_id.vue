<template>
  <div class="container">
    <div>
      <header>
        <h1 class="title">ルーン文字ジェネレータ</h1>

        <h2 class="subtitle">
          入力をルーン文字に変換します。
        </h2>
      </header>

      <RuneEditor :initText="text" />
    </div>
  </div>
</template>

<script>
import RuneEditor from '~/components/RuneEditor'
import { db } from '~/plugins/firebase'

export default {
  components: {
    RuneEditor
  },
  head() {
    return {
      title: `${this.text} | rune-generator`,
      description: `"${this.text}" by rune-generator`,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${this.text}`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `${this.text} by rune-generator`
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${window.origin}/${this.id}`
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.imageUrl
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: `${this.text}`
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.imageUrl
        },
        {
          hid: 'twitter:site',
          name: 'twitter:site',
          content: '@rhythm191'
        }
      ]
    }
  },

  async asyncData({ params }) {
    const message = await db
      .collection('messages')
      .doc(params.id)
      .get()

    const data = message.data()
    return { id: params.id, text: data.message, imageUrl: data.url }
  },
  async validate({ params }) {
    const message = await db
      .collection('messages')
      .doc(params.id)
      .get()

    return message.exists
  }
}
</script>

<style>
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

.preview svg {
  width: 100%;
}

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
