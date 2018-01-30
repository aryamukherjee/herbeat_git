module.exports = function(app, conn) {

    app.get('/api/gethratebypid', function(req, res) {
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
    app.get('/api/gethratebyDate', function(req, res) {
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
                res.json(results);
                console.log(results);
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
        conn.query('SELECT video_title, activity_time FROM user_watching_video WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? ORDER BY activity_time', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
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
        conn.query('SELECT video_title, activity_time FROM user_watching_video WHERE lower(username) = lower(?) AND activity_time BETWEEN  ? AND ? ORDER BY activity_time', [req.query.p_id, req.query.startdate, req.query.enddate], function (error, results) {
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
};