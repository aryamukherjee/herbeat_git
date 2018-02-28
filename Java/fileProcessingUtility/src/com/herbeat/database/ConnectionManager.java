package com.herbeat.database;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

import com.herbeat.properties.PropertiesSingleton;

public class ConnectionManager 
{
    private static Connection con;
    private static Properties props = null;

    public static Connection getConnection() throws ClassNotFoundException, SQLException, FileNotFoundException, IOException 
    {
    	props = PropertiesSingleton.getInstance().getPropInstance();
    	
        Class.forName(props.getProperty("DRIVERNAME"));
        con = DriverManager.getConnection(props.getProperty("URL"), 
        		props.getProperty("USERNAME"), 
        		props.getProperty("PASSWORD"));

        return con;
    }
}
