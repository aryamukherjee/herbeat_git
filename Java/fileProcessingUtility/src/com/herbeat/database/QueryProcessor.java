package com.herbeat.database;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Time;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

import com.herbeat.constants.APIConstants;

public class QueryProcessor 
{
	//handles insert into activity_record table
	public static void insertIntoActivityRecord(List<String> parameters, Connection dbCon, PreparedStatement preparedStatement) throws SQLException, ParseException
	{
		preparedStatement = dbCon.prepareStatement(APIConstants.Insert_into_activity_record);
    	preparedStatement.setString(1, parameters.get(0));
    	//format the String to Time
    	SimpleDateFormat sdf = new SimpleDateFormat("hh:mm:ss");
    	long ms = sdf.parse(parameters.get(1)).getTime();
    	preparedStatement.setTime(2, new Time(ms));
    	long ms2 = sdf.parse(parameters.get(2)).getTime();
    	preparedStatement.setTime(3, new Time(ms2));
    	preparedStatement.setBigDecimal(4, new BigDecimal(parameters.get(3)));
    	preparedStatement.setBigDecimal(5, new BigDecimal(parameters.get(4)));
    	preparedStatement.setInt(6, new Integer(parameters.get(5)));
    	preparedStatement.setTimestamp(7, Timestamp.valueOf(parameters.get(6).replace("/", "-")));
    	preparedStatement.setDate(8, Date.valueOf(parameters.get(6).replace("/", "-").split(" ")[0]));
    	preparedStatement.executeUpdate();
	}
	//handles insert into ema_schedule_perday table
	public static void insertIntoEmaSchedulePerday(List<String> parameters, Connection dbCon, PreparedStatement preparedStatement) throws SQLException, ParseException
	{
		preparedStatement = dbCon.prepareStatement(APIConstants.Insert_into_ema_schedule_perday);
    	preparedStatement.setString(1, parameters.get(0));
    	//format the String to Time
    	SimpleDateFormat sdf = new SimpleDateFormat("hh:mm:ss");
    	long ms = sdf.parse(parameters.get(1)).getTime();
    	preparedStatement.setTime(2, new Time(ms));
    	preparedStatement.setTimestamp(3, Timestamp.valueOf(parameters.get(2).replace("/", "-")));
    	preparedStatement.executeUpdate();
	}
	//handles insert into activity_record table
	public static void insertIntoUserGoals(List<String> parameters, Connection dbCon, PreparedStatement preparedStatement) throws SQLException, ParseException
	{
		preparedStatement = dbCon.prepareStatement(APIConstants.Insert_into_user_goals);
    	preparedStatement.setString(1, parameters.get(0));
    	preparedStatement.setInt(2, new Integer(parameters.get(1)));
    	preparedStatement.setInt(3, new Integer(parameters.get(2)));
    	preparedStatement.setInt(4, new Integer(parameters.get(3)));
    	preparedStatement.setTimestamp(5, Timestamp.valueOf(parameters.get(4).replace("/", "-")));
    	preparedStatement.executeUpdate();
	}
	//handles insert into activity_record table
	public static void insertIntoEmaTimeNotificationFired(List<String> parameters, Connection dbCon, PreparedStatement preparedStatement) throws SQLException, ParseException
	{
		preparedStatement = dbCon.prepareStatement(APIConstants.Insert_into_ematime_notification_fired);
    	preparedStatement.setString(1, parameters.get(0));
    	preparedStatement.setTimestamp(2, Timestamp.valueOf(parameters.get(1)));
    	preparedStatement.executeUpdate();
	}
	//handles insert into SELECTED_ACTIVITY table
	public static void insertIntoSelectedActivity(List<String> parameters, Connection dbCon, PreparedStatement preparedStatement) throws SQLException, ParseException
	{
		preparedStatement = dbCon.prepareStatement(APIConstants.Insert_into_selected_activity);
    	preparedStatement.setString(1, parameters.get(0));
    	preparedStatement.setString(2, parameters.get(1));
    	preparedStatement.setString(3, parameters.get(2));
    	preparedStatement.setString(4, parameters.get(3));
    	preparedStatement.setString(5, parameters.get(4));
    	preparedStatement.setString(6, parameters.get(5));
    	preparedStatement.setString(7, parameters.get(6));
    	preparedStatement.setTimestamp(8, Timestamp.valueOf(parameters.get(7).replace("/", "-")));
    	preparedStatement.executeUpdate();
	}
	//handles insert into heartrate_checking table
	public static void insertIntoHeartrateChecking(List<String> parameters, Connection dbCon, PreparedStatement preparedStatement) throws SQLException, ParseException
	{
		preparedStatement = dbCon.prepareStatement(APIConstants.Insert_into_heartrate_checking);
    	preparedStatement.setString(1, parameters.get(0));
    	preparedStatement.setInt(2, new Integer(parameters.get(1)));
    	preparedStatement.setTimestamp(3, Timestamp.valueOf(parameters.get(2).replace("/", "-")));
    	preparedStatement.executeUpdate();
	}
	//handles insert into checking_activity_record table
	public static void insertIntoCheckingActivityRecord(List<String> parameters, Connection dbCon, PreparedStatement preparedStatement) throws SQLException, ParseException
	{
		preparedStatement = dbCon.prepareStatement(APIConstants.Insert_into_checking_activity);
    	preparedStatement.setString(1, parameters.get(0));
    	SimpleDateFormat sdf = new SimpleDateFormat("hh:mm:ss");
    	long ms = sdf.parse(parameters.get(1)).getTime();
    	preparedStatement.setTime(2, new Time(ms));
    	preparedStatement.setBigDecimal(3, new BigDecimal(parameters.get(2)));
    	long ms1 = sdf.parse(parameters.get(3)).getTime();
    	preparedStatement.setTime(4, new Time(ms1));
    	preparedStatement.setTimestamp(5, Timestamp.valueOf(parameters.get(4).replace("/", "-")));
    	preparedStatement.executeUpdate();
	}
	//handles insert into watch_disconnected table
	public static void insertIntoWatchDisconnected(List<String> parameters, Connection dbCon, PreparedStatement preparedStatement) throws SQLException, ParseException
	{
		preparedStatement = dbCon.prepareStatement(APIConstants.Insert_into_watch_disconnected);
    	preparedStatement.setString(1, parameters.get(0));
    	preparedStatement.setTimestamp(2, Timestamp.valueOf(parameters.get(1).replace("/", "-")));
    	preparedStatement.executeUpdate();
	}
	//handles insert into wifi_disconnected table
	public static void insertIntoWifiDisconnected(List<String> parameters, Connection dbCon, PreparedStatement preparedStatement) throws SQLException, ParseException
	{
		preparedStatement = dbCon.prepareStatement(APIConstants.Insert_into_wifi_disconnected);
    	preparedStatement.setString(1, parameters.get(0));
    	preparedStatement.setTimestamp(2, Timestamp.valueOf(parameters.get(1).replace("/", "-")));
    	preparedStatement.executeUpdate();
	}
	//handles insert into intervention_msg table
	public static void insertIntoInterventionMsg(List<String> parameters, Connection dbCon, PreparedStatement preparedStatement) throws SQLException, ParseException
	{
		preparedStatement = dbCon.prepareStatement(APIConstants.Insert_into_intervention_msg);
    	preparedStatement.setString(1, parameters.get(0));
    	preparedStatement.setString(2, parameters.get(1));
    	preparedStatement.setBigDecimal(3, new BigDecimal(parameters.get(2)));
    	preparedStatement.setBigDecimal(4, new BigDecimal(parameters.get(3)));
    	preparedStatement.setBigDecimal(5, new BigDecimal(parameters.get(4)));
    	preparedStatement.setTimestamp(6, Timestamp.valueOf(parameters.get(5).replace("/", "-")));
    	preparedStatement.executeUpdate();
	}
	//handles insert into remaining_activity_message table
	public static void insertIntoRemainingActivityMsg(List<String> parameters, Connection dbCon, PreparedStatement preparedStatement) throws SQLException, ParseException
	{
		preparedStatement = dbCon.prepareStatement(APIConstants.Insert_into_remaining_activity_msg);
    	preparedStatement.setString(1, parameters.get(0));
    	preparedStatement.setString(2, parameters.get(1));
    	preparedStatement.setTimestamp(3, Timestamp.valueOf(parameters.get(2).replace("/", "-")));
    	preparedStatement.executeUpdate();
	}
	//handles insert into user_watching_video table
	public static void insertIntoUserWatchingVideo(List<String> parameters, Connection dbCon, PreparedStatement preparedStatement) throws SQLException, ParseException
	{
		preparedStatement = dbCon.prepareStatement(APIConstants.Insert_into_user_watching_video);
    	preparedStatement.setString(1, parameters.get(0));
    	preparedStatement.setString(2, parameters.get(1));
    	preparedStatement.setTimestamp(3, Timestamp.valueOf(parameters.get(2).replace("/", "-")));
    	preparedStatement.executeUpdate();
	}
	//handles insert into bluetooth_connection_failed table
	public static void insertIntoBluetoothConnectionFailed(List<String> parameters, Connection dbCon, PreparedStatement preparedStatement) throws SQLException, ParseException
	{
		preparedStatement = dbCon.prepareStatement(APIConstants.Insert_into_bluetooth_connection_failed);
    	preparedStatement.setString(1, parameters.get(0));
    	preparedStatement.setTimestamp(2, Timestamp.valueOf(parameters.get(1).replace("/", "-")));
    	preparedStatement.executeUpdate();
	}
	//handles insert into phonebattery_low table
	public static void insertIntoPhonebatteryChecking(List<String> parameters, Connection dbCon, PreparedStatement preparedStatement) throws SQLException, ParseException
	{
		preparedStatement = dbCon.prepareStatement(APIConstants.Insert_into_phonebattery_checking);
    	preparedStatement.setString(1, parameters.get(0));
    	preparedStatement.setInt(2, new Integer(parameters.get(1)));
    	preparedStatement.setTimestamp(3, Timestamp.valueOf(parameters.get(2)));
    	preparedStatement.executeUpdate();
	}
	//handles insert into watchbattery_low table
	public static void insertIntoWatchbatteryChecking(List<String> parameters, Connection dbCon, PreparedStatement preparedStatement) throws SQLException, ParseException
	{
		preparedStatement = dbCon.prepareStatement(APIConstants.Insert_into_watchbattery_checking);
    	preparedStatement.setString(1, parameters.get(0));
    	preparedStatement.setInt(2, new Integer(parameters.get(1)));
    	preparedStatement.setTimestamp(3, Timestamp.valueOf(parameters.get(2)));
    	preparedStatement.executeUpdate();
	}
}
