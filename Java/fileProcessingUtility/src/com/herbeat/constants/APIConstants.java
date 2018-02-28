package com.herbeat.constants;

public final class APIConstants 
{
	public static String fileNameWithActivity_Record = "physicalactivity";//physicalactivity
	public static String fileNameWithTodayEMAtime = "emaschedule";//emaschedule
	public static String fileNameWithSet_Goal = "setgoal";//setgoal
	public static String fileNameWithEMAtime_Notification = "emanotificationfired";//emanotificationfired
	public static String fileNameWithSelected_Activity = "emaresponse";//emaresponse
	public static String fileNameWithRemaining_Activity_Message = "remaininggoalchecking";//remaininggoalchecking
	public static String fileNameWithHeartRate = "heartratechecking";//heartratechecking
	public static String fileNameWithChecking_Activity = "progresschecking";//progresschecking
	public static String fileNameWithWatching_Video = "watchingvideo";//watchingvideo
	public static String fileNameWithWatch_Disconnected = "watchdisconnected";//watchdisconnected
	public static String fileNameWithWifi_Disconnected = "wifidisconnected";//wifidisconnected
	public static String fileNameWithBluetoothConnection = "bluetoothdisconnected";//bluetoothdisconnected
	public static String fileNameWithPhoneBattery = "phonebatterylow";//phonebatterylow
	public static String fileNameWithInterventionMessage = "feedback";//feedback
	public static String fileNameWithWatchBattery = "watchbatterylow";//watchbatterylow
	
	public static String Insert_into_activity_record = "INSERT INTO physical_activity(USERNAME, USER_SITTING_DURATION, USER_WALKING_DURATION, USER_STEP_COUNT, DISTANCE_COVERED_IN_MILES, USER_HEART_RATE, ACTIVITY_TIME, VDATE) VALUES(?,?,?,?,?,?,?,?)";
	public static String Insert_into_ema_schedule_perday = "INSERT INTO ema_schedule_perday(USERNAME, EMA_TIME, ACTIVITY_TIME) VALUES(?,?,?)";
	public static String Insert_into_user_goals = "INSERT INTO set_goals(USERNAME, USER_READINESS_LEVEL, USER_WALK_TARGET, USER_CURRENT_ENERGY, ACTIVITY_TIME) VALUES(?,?,?,?,?)";
	public static String Insert_into_ematime_notification_fired = "INSERT INTO ematime_notification_fired(USERNAME, NOTIFICATION_FIRED_TIME) VALUES(?,?)";
	public static String Insert_into_selected_activity = "INSERT INTO ema_response(USERNAME, USER_SELECTED_ACTIVITY, USER_COMPANY, USER_CURR_LOCATION, USER_FOOD_HABIT, USER_FEELINGS, MOTIVATION_SCREEN, ACTIVITY_TIME) VALUES(?,?,?,?,?,?,?,?)";
	public static String Insert_into_heartrate_checking = "INSERT INTO heartrate_checking(USERNAME, USER_HEART_RATE, ACTIVITY_TIME) VALUES(?,?,?)";
	public static String Insert_into_checking_activity = "INSERT INTO progress_checking(USERNAME, WALK, STEP_COUNT, SITTING, ACTIVITY_TIME) VALUES(?,?,?,?,?)";
	public static String Insert_into_watch_disconnected = "INSERT INTO watch_disconnected(USERNAME, ACTIVITY_TIME) VALUES(?,?)";
	public static String Insert_into_wifi_disconnected = "INSERT INTO wifi_disconnected(USERNAME, ACTIVITY_TIME) VALUES(?,?)";
	public static String Insert_into_intervention_msg = "INSERT INTO feedback(USERNAME, MESSAGE, TARGET_WALK, RESULTANT_WALK, WALK_AFTER_GOAL_SET, ACTIVITY_TIME) VALUES(?,?,?,?,?,?)";
	public static String Insert_into_remaining_activity_msg = "INSERT INTO remaining_goal_checking(USERNAME, REMAINING_ACTIVITY_MSG, ACTIVITY_TIME) VALUES(?,?,?)";
	public static String Insert_into_user_watching_video = "INSERT INTO watching_video(USERNAME, VIDEO_TITLE, ACTIVITY_TIME) VALUES(?,?,?)";
	public static String Insert_into_bluetooth_connection_failed = "INSERT INTO bluetooth_connection_failed(USERNAME, ACTIVITY_TIME) VALUES(?,?)";
	public static String Insert_into_phonebattery_checking = "INSERT INTO phonebattery_low(USERNAME, REMAINING_BATTERY, ACTIVITY_TIME) VALUES(?,?,?)";
	public static String Insert_into_watchbattery_checking = "INSERT INTO watchbattery_low(USERNAME, REMAINING_BATTERY, ACTIVITY_TIME) VALUES(?,?,?)";
}
