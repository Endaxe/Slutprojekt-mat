const express = require('express')
const router = express.Router()
const { body, matchedData, validationResult } = require('express-validator')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const pool = require('../db.js');
const { error } = require('console');


router.get('/', async function (req, res) {
  const [products] = await pool.promise().query('SELECT * FROM endo_produkt')
  res.render('index.njk', {
    title: 'shop',
    message: 'Välkommen',
    username: req.session.username,
    products: products,
  })
})

router.get('/hashTest', async function (req, res) {
  bcrypt.hash('gligon123', 10, function (err, hash) {
    console.log(hash)
    return res.json(hash);
  })
})


router.post('/signup', async function (req, res) {
  const username = req.body.username
  const password = req.body.password

  bcrypt.hash(password, 10, async function (err, hash) {
    try {
      const [user] = await pool.promise().query('INSERT INTO `endo_login` ( `username`, `password`) VALUES( ?, ?)', [username, hash])
      res.redirect('/login')
    } catch (error) {
      console.log(error)
      res.status(402)
    }
  })


})

router.post('/login',
  body('username').notEmpty().trim().escape(),
  body('password').notEmpty().trim().escape(),


  async function (req, res) {
    //const username = req.body.username
    const result = validationResult(req);
    console.log(result)
    if (result.isEmpty()) {
      const data = matchedData(req);
      console.log({data})
      const [user] = await pool.promise().query(
        'SELECT id, password FROM endo_login WHERE username = ?', [data.username]
      )
      console.log({user})
      console.log(user.length)

      if (user.length > 0) {
        console.log(user[0].password)
        bcrypt.compare(data.password, user[0].password, function (err, result) {
          console.log(data.password, result)
          // req.session.login = false
          if (result) {
            req.session.username = data.username
            req.session.userid = user[0].id
            req.session.login = true
            return res.redirect('/minasidor')
          } else {
            // res.json({ message: 'Fel lösenord' })
            return res.redirect('/login')

          }
        });
      } else {
        // det finns inte en user
        res.json({ message: 'User does not exist' })
        return res.redirect('/login')
        // res.send({ error: result.array() });
      }

    } else {
      res.json({message: "fel i formulär"})
    }
    // const  password = req.body.password

  })


router.get('/login', function (req, res) {
  res.render('login.njk', {
    title: 'login page',
    message: 'Välkommen',
    username: req.session.username
  })
})

router.get('/signup', function (req, res) {
  res.render('signup.njk', {
    title: 'signup page',
    message: 'Välkommen',
    username: req.session.username
  })
})

router.get('/minasidor', function (req, res) {
  console.log(req.session)
  if (req.session.login) {
    res.render('minasidor.njk', {
      username: req.session.username,
      message: 'Välkommen'
    })
  } else {
    res.redirect('/login')
  }

})

router.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});


router.get('/test', async function (req, res) {

  const [result] = await pool.promise().query(
    `SELECT * FROM endo_login `,
  )

  res.json(result)
})


router.get('/meows', async function (req, res) {
  const [result] = await pool.promise().query(
    `SELECT * FROM endo_tweets JOIN endo_login ON endo_login.id = endo_tweets.user_id`,
  )
  const [products] = await pool.promise().query('SELECT * FROM endo_produkt')

  res.render('meows.njk', {
    meows: result,
    title: 'varukorg',
    username: req.session.username,
    products: products
  })
})

router.get('/saymeow', async function (req, res) {
  if (req.session.login) {
    res.render('saymeow.njk', {
      username: req.session.username,
    })
  } else {
    res.redirect('/login')
  }

})

router.post('/saymeow', async function (req, res) {
  const text = req.body.textarea
  const id = req.session.userid
  const [result] = await pool.promise().query(
    `INSERT INTO endo_tweets (content, user_id) VALUES (?, ?)`, [text, id]
  )
  res.redirect('/meows')
})

router.get('/profile', async function (req, res) {
  const [result] = await pool.promise().query(
    `SELECT * FROM endo_login WHERE id = 1`,)

  res.json(result)


})




module.exports = router