package com.herbeat.properties;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Properties;

public class PropertiesSingleton 
{
	  private static PropertiesSingleton INSTANCE = null;
	  private static Properties props = new Properties();
	  private PropertiesSingleton() throws FileNotFoundException, IOException 
	  {
		  props.load(new FileInputStream("C:/eclipse_workspace/HerBeatAppProj/herbeatapp.properties"));
	  }
	  
	  public static PropertiesSingleton getInstance() throws FileNotFoundException, IOException 
	  {
		  if(INSTANCE == null) 
		  {
		     synchronized(PropertiesSingleton.class) 
		     {
		       if(INSTANCE == null) 
		       {
		    	   INSTANCE = new PropertiesSingleton();
		       }
		    }
		  }
		  return INSTANCE;
	  }
	  
	  public Properties getPropInstance() 
	  {
		  return props;
	  }
}
