const express = require('express')
const expressLayouts = require('express-ejs-layouts')

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

// aktifkan layout
app.use(expressLayouts)
app.set('layout', 'main')

// ROUTEs UI
app.get('/', (req, res) => {
  res.render('landing')
})

app.get('/register', (req, res) => {
  res.render('register')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.post('/login', (req, res) => {
  res.redirect('/home')
})

app.get('/onboarding', (req, res) => {
  res.render('onboarding')
})

app.get('/home', (req, res) => {
  const stores = [
    {
      name: 'Toko Bangunan Jaya',
      location: 'Jakarta Selatan',
      image: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76'
    },
    {
      name: 'Material Sejahtera',
      location: 'Bandung',
      image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8'
    },
    {
      name: 'Sumber Bangunan',
      location: 'Surabaya',
      image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea'
    }
  ]

  res.render('home', { stores })
})

app.get('/profile', (req, res) => {
  const user = {
    name: 'Daniel Alonso',
    email: 'daniel@mail.com',
    role: 'Buyer',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg'
  }

  res.render('profile', { user })
})

app.listen(port, () => {
  console.log(`Material-on-Go running on http://localhost:${port}`)
})
