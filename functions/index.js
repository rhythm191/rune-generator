const functions = require('firebase-functions')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const express = require('express')
const app = express()
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

const db = admin.firestore()

const url = 'https://rune-generator.firebaseapp.com/'
const siteName = 'Rune generator'
const metaDescription = 'Generate rule language sentence'

const genHtml = (id, message, imageUrl) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>${message}</title>
    <meta name="description" content="${metaDescription}">
    <meta property="og:locale" content="ja">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${imageUrl}">
    <meta property="og:title" content="${message}">
    <meta property="ogN" content="${siteName}">
    <meta property="og:description" content="${message} | generate by rune generator">
    <meta property="og:image" content="${imageUrl}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${message} | generate by rune generator">
    <meta name="twitter:image" content="${imageUrl}">
    <meta name="twitter:site" content="${url}">
  </head>
  <body>
    <script>
      // クローラーにはメタタグを解釈させて、人間は任意のページに飛ばす
      // location.href = '/${id}';
    </script>
  </body>
</html>
`

app.get('/f/:id', (req, res) => {
  db.collection('messages')
    .doc(req.params.id)
    .get()
    .then((result) => {
      if (!result.exists) {
        res.status(404).send('404 Not Exist')
      } else {
        const data = result.data()
        const html = genHtml(req.params.id, data.message, data.url)
        res.set('cache-control', 'public, max-age=3600')
        res.send(html)
      }
    })
})
exports.f = functions.https.onRequest(app)
