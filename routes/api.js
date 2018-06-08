var fadmin = require('../firebase/init');
var conn = require('../database/db');
var express = require('express');
var app = express.Router();

    /*Added by Bharath */
    app.get('/gethratebypid', function(req, res) {
        conn.query('select DATE_FORMAT(activity_time,  "%m/%d/%Y %k:00:00" ) as activity_time_formatted ,min(user_heart_rate) as mine ,max(user_heart_rate) as maxe,avg(user_heart_rate) as avge from physical_activity  WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? group by DATE_FORMAT(activity_time,  "%m/%d/%Y %k:00:00" ) order by STR_TO_DATE(activity_time_formatted,"%m/%d/%Y %k:00:00") asc', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
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
    app.get('/gethratebyDate', function(req, res) {
        conn.query('select DATE_FORMAT(activity_time,  "%m/%d/%Y %k:00:00" ) as activity_time_formatted ,min(user_heart_rate) as mine ,max(user_heart_rate) as maxe,avg(user_heart_rate) as avge from physical_activity  WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? group by DATE_FORMAT(activity_time,  "%m/%d/%Y %k:00:00" ) order by STR_TO_DATE(activity_time_formatted,"%m/%d/%Y %k:00:00") asc', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
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
    
    app.get('/getmsgbypid', function(req, res) {
        conn.query('select DISTINCT DATE_FORMAT(activity_time,  "%m/%d/%Y") as date, DATE_FORMAT(activity_time,  "%T") as time, activity_time , message from feedback WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? ORDER BY activity_time desc', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
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
    app.get('/getmsgbyDate', function(req, res) {
        conn.query('select DISTINCT DATE_FORMAT(activity_time,  "%m/%d/%Y") as date, DATE_FORMAT(activity_time,  "%T") as time, activity_time , message from feedback WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? ORDER BY activity_time desc', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
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
	
	app.get('/getheartRatebypid', function(req, res) {
        conn.query('SELECT DISTINCT user_heart_rate , DATE_FORMAT(activity_time,  "%m/%d/%Y") as date, DATE_FORMAT(activity_time,  "%T") as time, activity_time  FROM heartrate_checking WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? ORDER BY activity_time desc', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
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
    app.get('/getheartRatebyDate', function(req, res) {
        conn.query('SELECT DISTINCT user_heart_rate, DATE_FORMAT(activity_time,  "%m/%d/%Y") as date, DATE_FORMAT(activity_time,  "%T") as time, activity_time  FROM heartrate_checking WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? ORDER BY activity_time desc', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
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
    
    app.get('/getgoalsbypid', function(req, res) {
        conn.query('SELECT DISTINCT user_readiness_level, user_walk_target, user_current_energy, DATE_FORMAT(activity_time,  "%m/%d/%Y") as date, DATE_FORMAT(activity_time,  "%T") as time, activity_time  FROM set_goals WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? ORDER BY activity_time desc', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
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
    
    app.get('/getusergoalsbyDate', function(req, res) {
        conn.query('SELECT DISTINCT user_readiness_level, user_walk_target, user_current_energy, DATE_FORMAT(activity_time,  "%m/%d/%Y") as date, DATE_FORMAT(activity_time,  "%T") as time, activity_time  FROM set_goals WHERE lower(username) = lower(?)  AND activity_time BETWEEN  ? AND ? ORDER BY activity_time desc', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
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
    
    app.get('/getactivitesbypid', function(req, res) {
        conn.query('SELECT DISTINCT user_sitting_duration, user_walking_duration, user_step_count, distance_covered_in_miles, user_heart_rate, DATE_FORMAT(activity_time,  "%m/%d/%Y") as date, DATE_FORMAT(activity_time,  "%T") as time, activity_time  FROM physical_activity WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? ORDER BY activity_time desc LIMIT 1', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
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
    
    app.get('/getuseractivitybyDate', function(req, res) {
        conn.query('select DISTINCT user_sitting_duration, user_walking_duration, user_step_count, distance_covered_in_miles, user_heart_rate, DATE_FORMAT(activity_time,  "%m/%d/%Y") as date, DATE_FORMAT(activity_time,  "%T") as time, activity_time from physical_activity p1 right join (select vdate, max(activity_time) as maxdate from physical_activity where username = ? group by vdate) p2 on p2.maxdate = p1.activity_time where p2.vdate between ? and ? order by activity_time desc', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
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
    
    app.get('/getEMAresbypid', function(req, res) {
        conn.query('SELECT DISTINCT user_selected_activity, user_company, user_curr_location, user_food_habit, user_feelings, DATE_FORMAT(activity_time,  "%m/%d/%Y") as date, DATE_FORMAT(activity_time,  "%T") as time, activity_time , motivation_screen FROM ema_response WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? ORDER BY activity_time desc', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
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
    
    app.get('/getemarespbyDate', function(req, res) {
        conn.query('SELECT DISTINCT user_selected_activity, user_company, user_curr_location, user_food_habit, user_feelings, DATE_FORMAT(activity_time,  "%m/%d/%Y") as date, DATE_FORMAT(activity_time,  "%T") as time, activity_time , motivation_screen FROM ema_response WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? ORDER BY activity_time desc', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
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
    
    app.get('/getWatchedVideosbypid', function(req, res) {
        conn.query('SELECT DISTINCT video_title, DATE_FORMAT(activity_time,  "%m/%d/%Y") as date, DATE_FORMAT(activity_time,  "%T") as time, activity_time  FROM watching_video WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? ORDER BY activity_time desc', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
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
    
    app.get('/getWatchedVideosbyDate', function(req, res) {
        conn.query('SELECT DISTINCT video_title, DATE_FORMAT(activity_time,  "%m/%d/%Y") as date, DATE_FORMAT(activity_time,  "%T") as time, activity_time  FROM watching_video WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? ORDER BY activity_time desc', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
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
    
    app.get('/getBluetoothDiscbypid', function(req, res) {
        conn.query('SELECT DISTINCT DATE_FORMAT(activity_time,  "%m/%d/%Y") as date, DATE_FORMAT(activity_time,  "%T") as time, activity_time  FROM bluetooth_connection_failed WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? ORDER BY activity_time desc', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
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
    
    app.get('/getBluetoothDiscbyDate', function(req, res) {
        conn.query('SELECT DISTINCT DATE_FORMAT(activity_time,  "%m/%d/%Y") as date, DATE_FORMAT(activity_time,  "%T") as time, activity_time  FROM bluetooth_connection_failed WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? ORDER BY activity_time desc', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
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
    
    app.get('/getRemainingBatterybypid', function(req, res) {
        conn.query('SELECT DISTINCT remaining_battery, DATE_FORMAT(activity_time,  "%m/%d/%Y") as date, DATE_FORMAT(activity_time,  "%T") as time, activity_time  FROM phonebattery_low WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? ORDER BY activity_time desc', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
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
    
    app.get('/getRemainingBatterybyDate', function(req, res) {
        conn.query('SELECT DISTINCT remaining_battery, DATE_FORMAT(activity_time,  "%m/%d/%Y") as date, DATE_FORMAT(activity_time,  "%T") as time, activity_time  FROM phonebattery_low WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? ORDER BY activity_time desc', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
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
    
    app.get('/getWifiDiscbypid', function(req, res) {
        conn.query('SELECT DISTINCT DATE_FORMAT(activity_time,  "%m/%d/%Y") as date, DATE_FORMAT(activity_time,  "%T") as time, activity_time  FROM wifi_disconnected WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? ORDER BY activity_time desc', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
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
    
    app.get('/getWifiDiscbyDate', function(req, res) {
        conn.query('SELECT DISTINCT DATE_FORMAT(activity_time,  "%m/%d/%Y") as date, DATE_FORMAT(activity_time,  "%T") as time, activity_time  FROM wifi_disconnected WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? ORDER BY activity_time desc', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
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
    
    app.get('/getWatchDiscbypid', function(req, res) {
        conn.query('SELECT DISTINCT DATE_FORMAT(activity_time,  "%m/%d/%Y") as date, DATE_FORMAT(activity_time,  "%T") as time, activity_time  FROM watch_disconnected WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? ORDER BY activity_time desc', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
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
    
    app.get('/getWatchDiscbyDate', function(req, res) {
        conn.query('SELECT DISTINCT DATE_FORMAT(activity_time,  "%m/%d/%Y") as date, DATE_FORMAT(activity_time,  "%T") as time, activity_time  FROM watch_disconnected WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? ORDER BY activity_time desc', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
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
    
    app.get('/getallusernames', function(req, res) {
        conn.query('SELECT DISTINCT username FROM app_users ORDER BY username', function (error, results) {
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
    
    app.post('/sendmsgtodevice', function(req, res) {
        conn.query("SELECT token FROM app_users WHERE username = ?", [req.body.username], function (error, results) {
            if (error)
            {
                console.log(error);
            }
            else
            {
                var token = results[0].token;
                var payload = {
                    data: {
                        message : req.body.message 
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
                        conn.query('INSERT INTO sent_push_msg(username, msg, status, time_sent) VALUES(?, ?, ?, ?)', [req.body.username, req.body.message, 1, req.body.date], function (error, results) {
                            if (error)
                            {
                                console.log(error);
                            }
                        });
                    })
                    .catch(function(error){
                        console.log("error!", error);
                        res.json({status: 0});
                        conn.query('INSERT INTO sent_push_msg(username, msg, status, time_sent) VALUES(?, ?, ?, ?)', [req.body.username, req.body.message, 0, req.body.date], function (error, results) {
                            if (error)
                            {
                                console.log(error);
                            }
                        });
                    });
            }
        });
    });
    
    app.post('/storeapptoken', function(req, res) {
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
    
    app.get('/getsentmsgbypid', function(req, res) {
        conn.query('SELECT DISTINCT msg, DATE_FORMAT(time_sent,  "%m/%d/%Y") as date, DATE_FORMAT(time_sent,  "%T") as time, time_sent FROM sent_push_msg WHERE username = ? and status = 1  AND time_sent BETWEEN  ? AND ? ORDER BY time_sent desc', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
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
    
    app.get('/getsentmsgbyDate', function(req, res) {
        conn.query('SELECT DISTINCT msg, DATE_FORMAT(time_sent,  "%m/%d/%Y") as date, DATE_FORMAT(time_sent,  "%T") as time, time_sent FROM sent_push_msg WHERE lower(username) = lower(?) AND status = 1 AND time_sent BETWEEN  ? AND ? ORDER BY time_sent desc', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
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

module.exports = app;