package com.herbeat.api;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import org.apache.log4j.Logger;

import com.herbeat.properties.PropertiesSingleton;

public class MoveProcessedFiles 
{
	private Path sourcePath = null;
	private Path tragetPath = null;
	private static Properties props = null;
	private List<String> fileNames = new ArrayList<String>();
	private List<String> exceptionFileNames = new ArrayList<String>();
	ArrayList<ArrayList<String>> listOfLists = new ArrayList<ArrayList<String>>();
	private Logger logger = Logger.getLogger(MoveProcessedFiles.class);
	
	public MoveProcessedFiles(ArrayList<ArrayList<String>> listOfLists)
	{
		this.listOfLists = listOfLists; 
	}
	
	public void moveFiles()
	{
		try 
		{
			props = PropertiesSingleton.getInstance().getPropInstance();
			fileNames = listOfLists.get(0);
			exceptionFileNames = listOfLists.get(1);
			fileNames.removeAll(exceptionFileNames);
			
			for(String file: fileNames)
			{
				sourcePath = Paths.get(props.getProperty("DOWNLOADFOLDERPATH") + "/" + file);
				tragetPath = Paths.get(props.getProperty("PROCFOLDERPATH"));
				Files.move(sourcePath, tragetPath.resolve(sourcePath.getFileName()), 
						StandardCopyOption.REPLACE_EXISTING);
			}
			
		} 
		catch (IOException e) 
		{
			logger.error("Exception while moving files!", e);
		}
	}
}
