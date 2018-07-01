var express = require('express');
var expressValidator = require('express-validator');
var conn = require('../database/db');
var bcrypt = require('bcrypt');
var passport = require('passport');
var rt = require('random-token').create('gergbjy45646jss_hfah12312e4_2j6678bjhoisprlg7433sdkl_vjt');
var router = express.Router();

const saltRounds = 10;

router.get('/reset_password', function(req, res) {
    if(!req.isAuthenticated())
    {
        res.sendFile('verifyEmail.html', {root: appRoot + '/public/views'});
    }
    else
    {
        res.redirect('/home');
    }
});

router.get('/new_password', function(req, res) {
    if(!req.isAuthenticated())
    {
        const token = req.query.token;
        conn.query('SELECT id FROM user_authentication WHERE reset_password_token = ?', 
            [token], function (error, results) {
                if(results.length !== 0)
                {
                    res.sendFile('resetPassword.html', {root: appRoot + '/public/views'});
                }
                else
                {
                    res.redirect('/home');
                }
        });
    }
    else
    {
        res.redirect('/home');
    }
});

router.post('/new_password', function(req, res){
    req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
    req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
    req.checkBody('confirmPassword', 'Password must be between 8-100 characters long.').len(8, 100);
    req.checkBody('confirmPassword', 'Passwords do not match.').equals(req.body.password); 
    
    const error = req.validationErrors();

    if(error)
    {
        console.log(error);
        res.status(404).send(error);
    }
    else
    {
        const password = req.body.password;
        const confirmpassword = req.body.confirmpassword;
        const token = req.body.token;
        
        conn.query('SELECT id FROM user_authentication WHERE reset_password_token = ?', 
            [token], function (error, results) {
            if (error) throw error;
            if(results.length !== 0)
            {
                bcrypt.hash(password, saltRounds, function(err, hash){
                    conn.query('UPDATE user_authentication SET password = ?, reset_password_token = ? WHERE reset_password_token = ?', 
                        [hash, '', token], function (error, results) {
                        if (error)
                        {
                            res.status(400).send('Server had an unexpected error! Please try again.');
                        }
                        else
                        {
                            res.status(200).end();
                        }
                    });
                });
            }
            else
            {
                res.status(404).send('Invalid request!');
            }
        }); 
    }
});

router.post('/verify_email', function(req, res){
   const email = req.body.email;
   console.log(email);
   conn.query('SELECT id, first_name, last_name FROM user_authentication WHERE user_email = ?', 
            [email], function (error, results) {
            if (error) throw error;
            if(results.length !== 0)
            {
                const token = rt(100);
                conn.query('UPDATE user_authentication SET reset_password_token = ? WHERE user_email = ?', 
                    [token, email], function (error, results) {
                    if (error)
                    {
                        res.status(400).send('Server had an unexpected error! Please try again.');
                    }
                    else
                    {
                        res.status(200).send(token);
                    }
                });
            }
            else
            {
                res.status(404).send('Email not found. Please try again!');
            }
        }); 
});

router.get('/login', function(req, res) {
    if(!req.isAuthenticated())
    {
        res.sendFile('login.html', {root: appRoot + '/public/views'});
    }
    else
    {
        res.redirect('/home');
    }
});

router.get('/logout', function(req, res) {
    req.logout();
    req.session.destroy();
    res.redirect('/auth/login');
});

router.post('/login', function(req, res){
   const email = req.body.email;
   const password = req.body.password;
   console.log(email);
   conn.query('SELECT id, first_name, last_name, password FROM user_authentication WHERE user_email = ?', 
            [email], function (error, results) {
            if (error) throw error;
            if(results.length !== 0)
            {
                const user_id = results[0].id;
                const fname = results[0].first_name;
                const lname = results[0].last_name;
                const hashpassword = results[0].password.toString();

                bcrypt.compare(password, hashpassword, function(err, response){
                    if(response == true)
                    {
                        req.login(user_id, function(err){
                            res.cookie('username', fname, { httpOnly: false , maxAge: 7200000});
                            res.status(200).end();
                        });
                    }
                    else
                    {
                        res.status(404).send('Email and/or Password invalid!');
                    }
                });
            }
            else
            {
                res.status(404).send('Email not found. Please try again!');
            }
        }); 
});

router.get('/register', function(req, res) {
    if(!req.isAuthenticated())
    {
        res.sendFile('register.html', {root: appRoot + '/public/views'});
    }
    else
    {
        res.redirect('/home');
    }  
});

router.post('/register', function(req, res) {

req.checkBody('email', 'The email you entered is invalid.').isEmail();
req.checkBody('email', 'Email address must be between 4-100 characters long.').len(4, 100);
req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
req.checkBody('confirmPassword', 'Password must be between 8-100 characters long.').len(8, 100);
req.checkBody('confirmPassword', 'Passwords do not match.').equals(req.body.password);
req.checkBody('fname', 'First Name can only contain letters.').matches(/^[A-Za-z]+$/, 'i');
req.checkBody('lname', 'Last Name can only contain letters.').matches(/^[A-Za-z]+$/, 'i');

const error = req.validationErrors();

if(error)
{
    console.log(error);
    res.status(404).send(error);
}
else
{
    const email = req.body.email;
    const password = req.body.password;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const dob = req.body.dob;
    
    //check if email already exists
    conn.query('SELECT id FROM user_authentication WHERE user_email = ?', 
        [email], function (error, results) {
            if (error)
            {
                res.status(400).send('Server had an unexpected error! Please try again.');
            }
            else
            {
                if(results[0] != null)
                {
                   res.status(400).send('Email already taken! Please try another email.');
                }
                else
                {
                    bcrypt.hash(password, saltRounds, function(err, hash){
                        const date = new Date(dob).toISOString().substring(0,10);
                        console.log(date);
                        conn.query('INSERT INTO user_authentication(user_email, password, first_name, last_name, dob) VALUES(?, ?, ?, ?, ?)', 
                            [email, hash, fname, lname, date], function (error, results) {
                            if (error)
                            {
                                res.status(400).send('Server had an unexpected error! Please try again.');
                            }
                            else
                            {
                                res.status(200).end();
                            }
                        });
                    });
                }
            }
        });
  
}

});

passport.serializeUser(function(user_id, done){
    done(null, user_id);
});

passport.deserializeUser(function(user_id, done){
    done(null, user_id);
});

module.exports = router;