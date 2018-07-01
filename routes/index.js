var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/home', function(req, res) {
    console.log(req.isAuthenticated());
    if(req.isAuthenticated())
    {
        res.sendFile('index.html', {root: appRoot + '/public/views'});  
    }
    else
    {
        res.redirect('/auth/login');
    }
    
});

module.exports = router;