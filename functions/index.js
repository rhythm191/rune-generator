const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

const db = admin.firestore()

exports.f = functions.https.onRequest(async (req, res) => {
  const id = req.url.substring(3)
  const message = await db
    .collection('messages')
    .doc(id)
    .get()

  if (!message.exists) {
    res.status(404).send('404 Not Found')
  } else {
    const data = message.data()

    res.status(200).send(`<!doctype html>
      <head>
        <title>Time</title>
        <meta property="og:title" content="${data.message}">
        <meta property="og:image" content="${data.url}">
        <meta property="og:description" content="${data.message}">
        <meta property="og:url" content="https://rune-generator.firebaseapp.com/">
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="${data.message}">
        <meta name="twitter:site" content="〇〇〇〇〇〇">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="${data.message}">
        <meta name="twitter:image" content="${data.url}">
        <meta name="twitter:description" content="${data.message}">
      </head>
      <body>
      <script>
        // クローラーにはメタタグを解釈させて、人間は任意のページに飛ばす
        // location.href = '/${id}';
      </script>
      </body>
    </html>`)
  }
})
