var express = require('express');
var router = express.Router();
// schema external module link 
var userModule = require("../modules/blog");

// checking user already defined 
function checkuser(req,res,next){
  var username=req.body.Username;
  var checkexituser=userModule.findOne({Username: username});
  checkexituser.exec((err,data)=>{
    if (err) throw err;
    if (data){
      return res.render('signup',{
        msg: "User Already Exists",
      })
    }
    next();
  })
}
// checking useremail already defined 
function checkemail(req,res,next){
  var useremail=req.body.Useremail;
  var checkexitemail=userModule.findOne({email: useremail});
  checkexitemail.exec((err,data)=>{
    if (err) throw err;
    if (data){
      return res.render('signup',{
        msg: "Email Already Exists",
      })
    }
    next();
  })
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Express' });
});

// post method for storing data from signup page 
router.post('/signup',checkuser, checkemail, function(req, res, next) {
  var username=req.body.Username;
  var useremail=req.body.Useremail;
  var password=req.body.Password;
  var confirmpassword=req.body.ConPassword;
  // console.log(useremail+username+password);

  // checking confirm pass matches with passowrd 
  if (password != confirmpassword) {
    res.render("signup", {
      title: "SIGNUP FORM",
      msg: "Password and confirm pasword does not matched",
    });
  }else {
    
    var userdetails = new userModule({
      username: username,
      email: useremail,
      password: password,
    });
    userdetails.save((err, doc) => {
      if (err) throw err;
      res.render("signup", {
        title: "SIGNUP FORM",
        msg: "User registered succesfully",
      });
    });
  }

  // res.render('signup', { title: 'Express' });
});

module.exports = router;
