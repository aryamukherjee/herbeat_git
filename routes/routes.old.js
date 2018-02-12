module.exports = function(app, conn, fadmin) {

    /*Added by Bharath */
    app.get('/api/gethratebypid', function(req, res) {
        conn.query('SELECT user_heart_rate , activity_time FROM activity_record WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? ORDER BY activity_time', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
            if (error)
            {
                console.log(error);
            }
            else
            {
                res.json(results);
                console.log(results);
                console.log('Fetched from DB.');
            }
        });
    });
    app.get('/api/gethratebyDate', function(req, res) {
        conn.query('SELECT user_heart_rate, activity_time FROM activity_record WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? ORDER BY activity_time', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
            if (error)
            {
                console.log(error);
            }
            else
            {
                res.json(results);
                console.log(results);
                console.log('Fetched from DB.');
            }
        });
    });
    /*Added by Bharath for Message*/
    
    app.get('/api/getmsgbypid', function(req, res) {
        conn.query('select activity_time, message from intervention_msg WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? ORDER BY activity_time', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
            if (error)
            {
                console.log(error);
            }
            else
            {
                res.json(results);
                console.log(results);
                console.log('Fetched from DB.');
            }
        });
    });
    app.get('/api/getmsgbyDate', function(req, res) {
        conn.query('select activity_time, message from intervention_msg WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? ORDER BY activity_time', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
            if (error)
            {
                console.log(error);
            }
            else
            {
                res.json(results);
                console.log(results);
                console.log('Fetched from DB.');
            }
        });
    });
    
    /*End*/
	
	app.get('/api/getheartRatebypid', function(req, res) {
        conn.query('SELECT user_heart_rate , activity_time FROM heartrate_checking WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? ORDER BY activity_time', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
            if (error)
            {
                console.log(error);
            }
            else
            {
                res.json(results);
                console.log(results);
                console.log('Fetched from DB.');
            }
        });
    });
    app.get('/api/getheartRatebyDate', function(req, res) {
        conn.query('SELECT user_heart_rate, activity_time FROM heartrate_checking WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? ORDER BY activity_time', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
            if (error)
            {
                console.log(error);
            }
            else
            {
                res.json(results);
                console.log(results);
                console.log('Fetched from DB.');
            }
        });
    });
    
    
    /*Ends*/
    
    app.get('/api/getgoalsbypid', function(req, res) {
        conn.query('SELECT user_readiness_level, user_walk_target, user_current_energy, activity_time FROM user_goals WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? ORDER BY activity_time', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
            if (error)
            {
                console.log(error);
            }
            else
            {
                res.json(results);
                console.log(results);
                console.log('Fetched from DB.');
            }
        });
    });
    
    app.get('/api/getusergoalsbyDate', function(req, res) {
        conn.query('SELECT user_readiness_level, user_walk_target, user_current_energy, activity_time FROM user_goals WHERE lower(username) = lower(?)  AND activity_time BETWEEN  ? AND ? ORDER BY activity_time', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
            if (error)
            {
                console.log(error);
            }
            else
            {
                res.json(results);
                console.log(results);
                console.log('Fetched from DB.');
            }
        });
    });
    
    app.get('/api/getactivitesbypid', function(req, res) {
        conn.query('SELECT user_sitting_duration, user_walking_duration, user_step_count, distance_covered_in_miles, user_heart_rate, activity_time FROM activity_record WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? ORDER BY activity_time desc LIMIT 1', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
            if (error)
            {
                console.log(error);
            }
            else
            {
                res.json(results);
                console.log(results);
                console.log('Fetched from DB.');
            }
        });
    });
    
    app.get('/api/getuseractivitybyDate', function(req, res) {
        conn.query('SELECT user_sitting_duration, user_walking_duration, user_step_count, distance_covered_in_miles, user_heart_rate, activity_time FROM activity_record WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? ORDER BY activity_time', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
            if (error)
            {
                console.log(error);
            }
            else
            {
                //res.json(results);
                //console.log(results);
                console.log('Fetched from DB.');
            }
        });
    });
    
    app.get('/api/getEMAresbypid', function(req, res) {
        conn.query('SELECT user_selected_activity, user_company, user_curr_location, user_food_habit, user_feelings, activity_time FROM selected_activity WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? ORDER BY activity_time', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
            if (error)
            {
                console.log(error);
            }
            else
            {
                res.json(results);
                console.log(results);
                console.log('Fetched from DB.');
            }
        });
    });
    
    app.get('/api/getemarespbyDate', function(req, res) {
        conn.query('SELECT user_selected_activity, user_company, user_curr_location, user_food_habit, user_feelings, activity_time FROM selected_activity WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? ORDER BY activity_time', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
            if (error)
            {
                console.log(error);
            }
            else
            {
                res.json(results);
                console.log(results);
                console.log('Fetched from DB.');
            }
        });
    });
    
    app.get('/api/getWatchedVideosbypid', function(req, res) {
        conn.query('SELECT video_title, activity_time FROM watching_video WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? ORDER BY activity_time', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
            if (error)
            {
                console.log(error);
            }
            else
            {
                res.json(results);
                console.log(results);
                console.log('Fetched from DB.');
            }
        });
    });
    
    app.get('/api/getWatchedVideosbyDate', function(req, res) {
        conn.query('SELECT video_title, activity_time FROM watching_video WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? ORDER BY activity_time', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
            if (error)
            {
                console.log(error);
            }
            else
            {
                res.json(results);
                console.log(results);
                console.log('Fetched from DB.');
            }
        });
    });
    
    app.get('/api/getBluetoothDiscbypid', function(req, res) {
        conn.query('SELECT activity_time FROM bluetooth_connection_failed WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? ORDER BY activity_time', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
            if (error)
            {
                console.log(error);
            }
            else
            {
                res.json(results);
                console.log(results);
                console.log('Fetched from DB.');
            }
        });
    });
    
    app.get('/api/getBluetoothDiscbyDate', function(req, res) {
        conn.query('SELECT activity_time FROM bluetooth_connection_failed WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? ORDER BY activity_time', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
            if (error)
            {
                console.log(error);
            }
            else
            {
                res.json(results);
                console.log(results);
                console.log('Fetched from DB.');
            }
        });
    });
    
    app.get('/api/getRemainingBatterybypid', function(req, res) {
        conn.query('SELECT remaining_battery, activity_time FROM phonebattery_checking WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? ORDER BY activity_time', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
            if (error)
            {
                console.log(error);
            }
            else
            {
                res.json(results);
                console.log(results);
                console.log('Fetched from DB.');
            }
        });
    });
    
    app.get('/api/getRemainingBatterybyDate', function(req, res) {
        conn.query('SELECT remaining_battery, activity_time FROM phonebattery_checking WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? ORDER BY activity_time', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
            if (error)
            {
                console.log(error);
            }
            else
            {
                res.json(results);
                console.log(results);
                console.log('Fetched from DB.');
            }
        });
    });
    
    app.get('/api/getWifiDiscbypid', function(req, res) {
        conn.query('SELECT activity_time FROM wifi_disconnected WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? ORDER BY activity_time', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
            if (error)
            {
                console.log(error);
            }
            else
            {
                res.json(results);
                console.log(results);
                console.log('Fetched from DB.');
            }
        });
    });
    
    app.get('/api/getWifiDiscbyDate', function(req, res) {
        conn.query('SELECT activity_time FROM wifi_disconnected WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? ORDER BY activity_time', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
            if (error)
            {
                console.log(error);
            }
            else
            {
                res.json(results);
                console.log(results);
                console.log('Fetched from DB.');
            }
        });
    });
    
    app.get('/api/getWatchDiscbypid', function(req, res) {
        conn.query('SELECT activity_time FROM watch_disconnected WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? ORDER BY activity_time', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
            if (error)
            {
                console.log(error);
            }
            else
            {
                res.json(results);
                console.log(results);
                console.log('Fetched from DB.');
            }
        });
    });
    
    app.get('/api/getWatchDiscbyDate', function(req, res) {
        conn.query('SELECT activity_time FROM watch_disconnected WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? ORDER BY activity_time', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
            if (error)
            {
                console.log(error);
            }
            else
            {
                res.json(results);
                console.log(results);
                console.log('Fetched from DB.');
            }
        });
    });
    
    app.get('/api/getallusernames', function(req, res) {
        conn.query('SELECT username FROM app_users ORDER BY username', function (error, results) {
            if (error)
            {
                console.log(error);
            }
            else
            {
                res.json(results);
                console.log(results);
                console.log('Fetched from DB.');
            }
        });
    });
    
    app.post('/api/sendmsgtodevice', function(req, res) {
        conn.query("SELECT token FROM app_users WHERE username = ?", [req.body.username], function (error, results) {
            if (error)
            {
                console.log(error);
            }
            else
            {
                var token = results[0].token;
                var payload = {
                    notification: {
                        title: "Notification",
                        body: req.body.message
                    }
                };
                var options = {
                    priority: "high",
                    timeToLive: 60*60*24
                };
                fadmin.messaging().sendToDevice(token, payload, options)
                    .then(function(response){
                        console.log("success!", response);
                        res.json({status: 1});
                    })
                    .catch(function(error){
                        console.log("error!", error);
                        res.json({status: 0});
                    });
            }
        });
    });
    
    app.post('/api/storeapptoken', function(req, res) {
        conn.query("SELECT token FROM app_users WHERE username = ?", [req.body.username], function (error, results) {
            if(results != null && results.length > 0)
            {
                conn.query("UPDATE app_users SET token = ? WHERE username = ?", [req.body.token, req.body.username], function (error, results) {
                    if (error)
                    {
                        res.json({ack: "FAILED"});
                        //log the username and token
                        console.log("Time: " + new Date().toLocaleDateString() + ", " 
                                + req.body.username + ", " + req.body.token);
                        console.log(error);
                    }
                    else
                    {
                        res.json({ack: "OK"});
                        console.log("Value stored successfully");
                    }
                });
            }
            else
            {
                conn.query('INSERT INTO app_users(username, token) VALUES(?, ?)', [req.body.username, req.body.token], function (error, results) {
                    if (error)
                    {
                        res.json({ack: "FAILED"});
                        //log the username and token
                        console.log("Time: " + new Date().toLocaleDateString() + ", " 
                                + req.body.username + ", " + req.body.token);
                        console.log(error);
                    }
                    else
                    {
                        res.json({ack: "OK"});
                        console.log("Value stored successfully");
                    }
                });
            }
        });
    
    });
};