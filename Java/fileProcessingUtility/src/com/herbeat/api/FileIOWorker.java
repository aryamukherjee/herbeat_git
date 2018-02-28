package com.herbeat.api;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Properties;

import org.apache.log4j.Logger;

import com.herbeat.constants.APIConstants;
import com.herbeat.database.ConnectionManager;
import com.herbeat.database.QueryProcessor;
import com.herbeat.properties.PropertiesSingleton;

public class FileIOWorker implements Runnable
{
	private String fileName;
	private String username;
	private List<String> exceptionFileNames;
	private Logger logger = Logger.getLogger(FileIOWorker.class);
	private Properties props = null;
	
	public FileIOWorker(String fileName, List<String> exceptionFileNames) throws FileNotFoundException, IOException
	{
		this.fileName = fileName;
		this.exceptionFileNames = exceptionFileNames;
		this.props = PropertiesSingleton.getInstance().getPropInstance();
	}
	
	@Override
	public void run() 
	{
		BufferedReader br = null;
		Connection dbCon = null;
		PreparedStatement preparedStatement = null;
		List<String> parameters = new ArrayList<String>();
		logger.info("Processing file: " + fileName);
		username = fileName.substring(0, fileName.indexOf("_", 0));
	    try 
	    {
	    	dbCon = ConnectionManager.getConnection();
        	//open a transaction
        	dbCon.setAutoCommit(false);
        	parameters.add(username);
    		br = new BufferedReader(new FileReader(new File(props.getProperty("DOWNLOADFOLDERPATH") + "/" + fileName)));
	    	if(fileName.contains(APIConstants.fileNameWithActivity_Record))
	    	{
	    		String line = null;
	            while((line = br.readLine())!= null)
	            {
	            	String[] tokens = line.split("\\s{2,}");
        			String[] tks1 = tokens[1].split("\\s");
        			if(tks1.length == 6)
        			{
        				parameters.add(tks1[0].trim()+":"+tks1[2].trim()+":"+tks1[4].trim());
        			}
        			else if(tks1.length == 4)
        			{
        				parameters.add("00"+":"+tks1[0].trim()+":"+tks1[2].trim());
        			}
        			else
        			{
        				parameters.add("00"+":"+"00"+":"+tks1[0].trim());
        			}
        			String[] tks2 = tokens[3].split("\\s");
        			if(tks2.length == 6)
        			{
        				parameters.add(tks2[0].trim()+":"+tks2[2].trim()+":"+tks2[4].trim());
        			}
        			else if(tks2.length == 4)
        			{
        				parameters.add("00"+":"+tks2[0].trim()+":"+tks2[2].trim());
        			}
        			else
        			{
        				parameters.add("00"+":"+"00"+":"+tks2[0].trim());
        			}
        			parameters.add(tokens[5].trim());
        			parameters.add((tokens[7].split("\\s"))[0].trim());
        			parameters.add(tokens[9].trim());
        			String[] tkns = tokens[11].split("_");
        			parameters.add(tkns[0].trim() + " " + tkns[1].trim());
	            	//handle insert
	            	QueryProcessor.insertIntoActivityRecord(parameters, dbCon, preparedStatement);
	            	parameters.retainAll(new ArrayList<String>(Arrays.asList(parameters.get(0))));
	            }
	    	}
	    	else if(fileName.contains(APIConstants.fileNameWithTodayEMAtime))
	    	{
	    		String line = null;
	            while((line = br.readLine())!= null)
	            {
	            	String[] tokens = line.split("\\s{2,}");
        			String[] tks1 = tokens[1].split(":");
        			parameters.add(tks1[0].trim()+":"+tks1[1].trim()+":00");
        			String[] tkns = tokens[2].split("_");
        			parameters.add(tkns[0].trim() + " " + tkns[1].trim() + ":00");
	            	//handle insert
	            	QueryProcessor.insertIntoEmaSchedulePerday(parameters, dbCon, preparedStatement);
	            	parameters.retainAll(new ArrayList<String>(Arrays.asList(parameters.get(0))));
	            }
	    	}
	    	else if(fileName.contains(APIConstants.fileNameWithSet_Goal))
	    	{
	    		String line = null;
	            while((line = br.readLine())!= null)
	            {
	            	String[] tokens = line.split("\\s{2,}");
        			parameters.add(tokens[1].trim());
        			parameters.add(tokens[3].trim());
        			parameters.add(tokens[5].trim());
        			String[] tkns = tokens[7].split("_");
        			parameters.add(tkns[0].trim() + " " + tkns[1].trim());
	            	//handle insert
	            	QueryProcessor.insertIntoUserGoals(parameters, dbCon, preparedStatement);
	            	parameters.retainAll(new ArrayList<String>(Arrays.asList(parameters.get(0))));
	            }
	    	}
	    	else if(fileName.contains(APIConstants.fileNameWithEMAtime_Notification))
	    	{
	    		String line = null;
	            while((line = br.readLine())!= null)
	            {
	            	String[] tokens = line.split("\\s");
		            parameters.add(tokens[0].trim()+ " " +tokens[1].trim() + ":00");
	            	//handle insert
	            	QueryProcessor.insertIntoEmaTimeNotificationFired(parameters, dbCon, preparedStatement);
	            	parameters.retainAll(new ArrayList<String>(Arrays.asList(parameters.get(0))));
	            }
	    	}
	    	else if(fileName.contains(APIConstants.fileNameWithSelected_Activity))
	    	{
	    		String line = null;
	            while((line = br.readLine())!= null)
	            {
	            	String[] tokens = line.split("\\s{2,}");
        			parameters.add(tokens[1].trim());
        			parameters.add(tokens[3].trim());
        			parameters.add(tokens[5].trim());
        			parameters.add(tokens[7].trim());
        			parameters.add(tokens[9].trim());
        			parameters.add(tokens[11].trim());
        			String[] tkns = tokens[13].split("_");
        			parameters.add(tkns[0].trim() + " " + tkns[1].trim());
	            	//handle insert
	            	QueryProcessor.insertIntoSelectedActivity(parameters, dbCon, preparedStatement);
	            	parameters.retainAll(new ArrayList<String>(Arrays.asList(parameters.get(0))));
	            }
	    	}
	    	else if(fileName.contains(APIConstants.fileNameWithRemaining_Activity_Message))
	    	{
	    		String line = null;
	            while((line = br.readLine())!= null)
	            {
	            	String[] tokens = line.split("\t");
        			parameters.add(tokens[1].trim());
        			String[] tkns = tokens[3].split("_");
        			parameters.add(tkns[0].trim() + " " + tkns[1].trim());
	            	//handle insert
	            	QueryProcessor.insertIntoRemainingActivityMsg(parameters, dbCon, preparedStatement);
	            	parameters.retainAll(new ArrayList<String>(Arrays.asList(parameters.get(0))));
	            }
	    	}
	    	else if(fileName.contains(APIConstants.fileNameWithHeartRate))
	    	{
	    		String line = null;
	            while((line = br.readLine())!= null)
	            {
	            	String[] tokens = line.split("\\s{2,}");
        			parameters.add(tokens[1].trim());
        			String[] tkns = tokens[3].split("_");
        			parameters.add(tkns[0].trim() + " " + tkns[1].trim());
	            	//handle insert
	            	QueryProcessor.insertIntoHeartrateChecking(parameters, dbCon, preparedStatement);
	            	parameters.retainAll(new ArrayList<String>(Arrays.asList(parameters.get(0))));
	            }
	    	}
	    	else if(fileName.contains(APIConstants.fileNameWithChecking_Activity))
	    	{
	    		String line = null;
	            while((line = br.readLine())!= null)
	            {
	            	String[] tokens = line.split("\\s{2,}");
	            	String[] tks1 = tokens[1].split("\\s");
        			if(tks1.length == 6)
        			{
        				parameters.add(tks1[0].trim()+":"+tks1[2].trim()+":"+tks1[4].trim());
        			}
        			else if(tks1.length == 4)
        			{
        				parameters.add("00"+":"+tks1[0].trim()+":"+tks1[2].trim());
        			}
        			else
        			{
        				parameters.add("00"+":"+"00"+":"+tks1[0].trim());
        			}
        			parameters.add(tokens[3].trim());
        			String[] tks2 = tokens[5].split("\\s");
        			if(tks2.length == 6)
        			{
        				parameters.add(tks2[0].trim()+":"+tks2[2].trim()+":"+tks2[4].trim());
        			}
        			else if(tks2.length == 4)
        			{
        				parameters.add("00"+":"+tks2[0].trim()+":"+tks2[2].trim());
        			}
        			else
        			{
        				parameters.add("00"+":"+"00"+":"+tks2[0].trim());
        			}
        			String[] tkns = tokens[7].split("_");
        			parameters.add(tkns[0].trim() + " " + tkns[1].trim());
	            	//handle insert
	            	QueryProcessor.insertIntoCheckingActivityRecord(parameters, dbCon, preparedStatement);
	            	parameters.retainAll(new ArrayList<String>(Arrays.asList(parameters.get(0))));
	            }
	    	}
	    	else if(fileName.contains(APIConstants.fileNameWithWatching_Video))
	    	{
	    		String line = null;
	            while((line = br.readLine())!= null)
	            {
	            	String[] tokens = line.split("\t");
        			parameters.add(tokens[1].trim());
        			String[] tkns = tokens[3].split("_");
        			parameters.add(tkns[0].trim() + " " + tkns[1].trim());
	            	//handle insert
	            	QueryProcessor.insertIntoUserWatchingVideo(parameters, dbCon, preparedStatement);
	            	parameters.retainAll(new ArrayList<String>(Arrays.asList(parameters.get(0))));
	            }
	    	}
	    	else if(fileName.contains(APIConstants.fileNameWithWatch_Disconnected))
	    	{
	    		String line = null;
	            while((line = br.readLine())!= null)
	            {
	            	String[] tokens = line.split("\\s{2,}");
	    			String[] tkns = tokens[2].split("_");
	    			parameters.add(tkns[0].trim() + " " + tkns[1].trim());
	            	//handle insert
	            	QueryProcessor.insertIntoWatchDisconnected(parameters, dbCon, preparedStatement);
	            	parameters.retainAll(new ArrayList<String>(Arrays.asList(parameters.get(0))));
	            }
	    	}
	    	else if(fileName.contains(APIConstants.fileNameWithWifi_Disconnected))
	    	{
	    		String line = null;
	            while((line = br.readLine())!= null)
	            {
	            	String[] tokens = line.split("\\s{2,}");
	    			String[] tkns = tokens[1].split("_");
	    			parameters.add(tkns[0].trim() + " " + tkns[1].trim());
	            	//handle insert
	            	QueryProcessor.insertIntoWifiDisconnected(parameters, dbCon, preparedStatement);
	            	parameters.retainAll(new ArrayList<String>(Arrays.asList(parameters.get(0))));
	            }
	    	}
	    	else if(fileName.contains(APIConstants.fileNameWithBluetoothConnection))
	    	{
	    		String line = null;
	            while((line = br.readLine())!= null)
	            {
	            	String[] tokens = line.split("\t");
	    			String[] tkns = tokens[2].split("_");
	    			parameters.add(tkns[0].trim() + " " + tkns[1].trim());
	            	//handle insert
	            	QueryProcessor.insertIntoBluetoothConnectionFailed(parameters, dbCon, preparedStatement);
	            	parameters.retainAll(new ArrayList<String>(Arrays.asList(parameters.get(0))));
	            }
	    	}
	    	else if(fileName.contains(APIConstants.fileNameWithPhoneBattery))
	    	{
	    		String line = null;
	            while((line = br.readLine())!= null)
	            {
	            	String[] tokens = line.split("\\s{2,}");
	            	String[] remainingBat = tokens[0].split(":");
        			parameters.add(remainingBat[1].trim());
        			String[] tkns = tokens[2].split("_");
        			parameters.add(tkns[0].trim() + " " + tkns[1].trim());
	            	//handle insert
	            	QueryProcessor.insertIntoPhonebatteryChecking(parameters, dbCon, preparedStatement);
	            	parameters.retainAll(new ArrayList<String>(Arrays.asList(parameters.get(0))));
	            }
	    	}
	    	else if(fileName.contains(APIConstants.fileNameWithWatchBattery))
	    	{
	    		String line = null;
	            while((line = br.readLine())!= null)
	            {
	            	String[] tokens = line.split("\\s{2,}");
	            	String[] remainingBat = tokens[0].split(":");
        			parameters.add(remainingBat[1].trim());
        			String[] tkns = tokens[2].split("_");
        			parameters.add(tkns[0].trim() + " " + tkns[1].trim());
	            	//handle insert
	            	QueryProcessor.insertIntoWatchbatteryChecking(parameters, dbCon, preparedStatement);
	            	parameters.retainAll(new ArrayList<String>(Arrays.asList(parameters.get(0))));
	            }
	    	}
	    	else if(fileName.contains(APIConstants.fileNameWithInterventionMessage))
	    	{
	    		String line = null;
	            while((line = br.readLine())!= null)
	            {
	            	String[] tokens = line.split("\t");
	            	parameters.add(tokens[1].trim());
	            	parameters.add(tokens[3].trim());
	            	parameters.add(tokens[5].trim());
	            	parameters.add(tokens[7].trim());
	    			String[] tkns = tokens[9].split("_");
	    			parameters.add(tkns[0].trim() + " " + tkns[1].trim());
	            	//handle insert
	            	QueryProcessor.insertIntoInterventionMsg(parameters, dbCon, preparedStatement);
	            	parameters.retainAll(new ArrayList<String>(Arrays.asList(parameters.get(0))));
	            }
	    	}
	    	//commit a transaction
	    	dbCon.commit();
	    	
		} 
	    catch (IOException e) 
	    {
	    	logger.error("Exception for file: " + fileName, e);
	    	exceptionFileNames.add(fileName);
			//e.printStackTrace();
		}
	    catch (SQLException e) 
	    {
	    	logger.error("Exception for file: " + fileName, e);
	    	exceptionFileNames.add(fileName);
	    	try 
	    	{
				dbCon.rollback();
			} 
	    	catch (SQLException ex) 
	    	{
	    		logger.error("Exception while rolling back!", e);
			}
			//e.printStackTrace();
		}
	    catch (ParseException e) 
	    {
	    	logger.error("Exception for file: " + fileName, e);
	    	exceptionFileNames.add(fileName);
			//e.printStackTrace();
		}
	    catch (ArrayIndexOutOfBoundsException e) 
	    {
	    	logger.error("Exception for file: " + fileName, e);
	    	exceptionFileNames.add(fileName);
			//e.printStackTrace();
		}
	    catch (Exception e) 
	    {
	    	logger.error("Exception for file: " + fileName, e);
	    	exceptionFileNames.add(fileName);
			//e.printStackTrace();
		}
	    finally
	    {
	    	//close all the resources
	    	if (preparedStatement != null) 
	    	{
				try 
				{
					preparedStatement.close();
				} 
				catch (SQLException e) 
				{
					logger.error("Exception while closing DB resource!", e);
				}
			}

			if (dbCon != null) 
			{
				try 
				{
					dbCon.close();
				} 
				catch (SQLException e) 
				{
					logger.error("Exception while closing DB resource!", e);
				}
			}
			try 
			{
				br.close();
			} 
			catch (IOException e) 
			{
				logger.error("Exception while closing FILE resource!", e);
			}

	    }
	}
	
}
