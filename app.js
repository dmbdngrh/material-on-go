const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

// ROUTES UI
app.get('/', (req, res) => {
  res.render('landing')
})

app.get('/register', (req, res) => {
  res.render('register')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/onboarding', (req, res) => {
  res.render('onboarding')
})

app.get('/home', (req, res) => {
  res.render('home')
})

app.get('/profile', (req, res) => {
  res.render('profile')
})

app.listen(port, () => {
  console.log(`Material-on-Go running on http://localhost:${port}`)
})
