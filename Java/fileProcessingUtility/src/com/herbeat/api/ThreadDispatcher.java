package com.herbeat.api;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.concurrent.ExecutorService;

import com.herbeat.properties.PropertiesSingleton;

public class ThreadDispatcher 
{
	private List<String> fileNames = new ArrayList<String>();	
	private List<String> exceptionFileNames = new ArrayList<String>();
	private Properties props = null;
	
	private ExecutorService threadPool;
	
	public ThreadDispatcher(ExecutorService threadPool) throws FileNotFoundException, IOException
	{
		this.threadPool = threadPool;
		this.props = PropertiesSingleton.getInstance().getPropInstance();
	}
	
	public ArrayList<ArrayList<String>> dispatchWork() throws FileNotFoundException, IOException
	{
		ArrayList<ArrayList<String>> listOfLists = new ArrayList<ArrayList<String>>();
		readFileNames();
		for(String fileName : fileNames)
		{
			threadPool.submit(new FileIOWorker(fileName, exceptionFileNames));
		}
		listOfLists.add((ArrayList<String>) fileNames);
		listOfLists.add((ArrayList<String>) exceptionFileNames);
		return listOfLists;
	}
	
	public void readFileNames()
	{
		File downloadfolder = new File(props.getProperty("DOWNLOADFOLDERPATH"));
		File[] listOfFiles = downloadfolder.listFiles();
	
		for (File file : listOfFiles) 
		{
		    if (file.isFile()) 
		    {
		        fileNames.add(file.getName());
		    }
		}
	}
}