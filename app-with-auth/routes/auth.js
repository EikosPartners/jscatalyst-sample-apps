const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken')
const fs = require('fs')

// read the data sotred in the JSON database and save it to a variable
var userdb = JSON.parse(fs.readFileSync('./mock_backend/users.json', 'UTF-8'))

// function for checking if a username and password combination exists in the databse
function isAuthenticated({username, password}){
  return userdb.users.filter(user => user.username === username && user.password === password)
}

// login route to check if the supplied username and password match a user in the database
router.post('/login', (req, res) => {
  //get username and password from request and get the
  const {username, password} = req.body
  var user = isAuthenticated({username, password})
  // if there is no matching user then send a fail message
  if (user === []) {
    res.send({ success: false, message:'Wrong username or password combination'})
    return
  }
  // if a user is found create the claims that will be used for the JWT token
  var claims = {
    username: user[0].username,
    id: user[0].id
  }
  // Create the JWT token then store it in an httpOnly cookie and send it back with a success message
  var token = jwt.sign(claims, 'secret', {expiresIn: '1h'})
  res.cookie('jwt', token, {httpOnly: true})
  res.json({success: true, message: 'Successfully logged in!', expiresSoon: false});
})

// signup route for creating a new user
router.post('/signup', (req, res) => {
  // get the username and password and check to make sure there isn't already a user with that username
  const {username, password} = req.body
  if (userdb.users.filter(user => user.username === username).length) {
    res.send({ success: false, message: 'Username is already taken.' })
    return
  }
  // create a new user for our JSON database
  var lastId = userdb.users[userdb.users.length-1].id
  userdb.users.push({id: lastId+1, username, password})
  // add the new user by writing to the JSON file
  fs.writeFileSync('./mock_backend/users.json', JSON.stringify(userdb))
  userdb = JSON.parse(fs.readFileSync('./mock_backend/users.json', 'UTF-8'))
  //create claims that will be used to make the JWT token
  var claims = {
    username: username,
    id: lastId+1
  }
  // create the token then store it in an httpOnly cookie and send it back with success message
  var token = jwt.sign(claims, 'secret', {expiresIn: '1h'})
  res.cookie('jwt', token, {httpOnly: true})
  res.json({success: true, message: 'Succesfully signed up!', expiresSoon: false});

});

// logout route that clears the users cookie from their browser
router.post('/logout', (req, res) => {
  res.clearCookie("jwt");
  res.send({authenticated: false})
})


module.exports = router;
