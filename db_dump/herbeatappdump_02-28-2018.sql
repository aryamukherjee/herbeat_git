-- MySQL dump 10.13  Distrib 5.7.21, for Linux (x86_64)
--
-- Host: localhost    Database: herbeatapp
-- ------------------------------------------------------
-- Server version	5.7.21-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Utility_Log`
--

DROP TABLE IF EXISTS `Utility_Log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Utility_Log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `runtime` datetime DEFAULT NULL,
  `status` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1159 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `activity_record`
--

DROP TABLE IF EXISTS `activity_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activity_record` (
  `record_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `user_sitting_duration` time NOT NULL,
  `user_walking_duration` time NOT NULL,
  `user_step_count` decimal(7,2) DEFAULT NULL,
  `distance_covered_in_miles` decimal(5,2) NOT NULL,
  `user_heart_rate` int(11) NOT NULL,
  `activity_time` datetime NOT NULL,
  PRIMARY KEY (`record_id`,`username`)
) ENGINE=InnoDB AUTO_INCREMENT=6097 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `app_users`
--

DROP TABLE IF EXISTS `app_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_users` (
  `record_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  PRIMARY KEY (`record_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bluetooth_connection_failed`
--

DROP TABLE IF EXISTS `bluetooth_connection_failed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bluetooth_connection_failed` (
  `record_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `activity_time` datetime NOT NULL,
  PRIMARY KEY (`record_id`,`username`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `checking_activity_record`
--

DROP TABLE IF EXISTS `checking_activity_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `checking_activity_record` (
  `record_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `walk` decimal(10,2) DEFAULT NULL,
  `step_count` decimal(10,2) DEFAULT NULL,
  `sitting` decimal(10,2) DEFAULT NULL,
  `activity_time` datetime NOT NULL,
  PRIMARY KEY (`record_id`,`username`)
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ema_response`
--

DROP TABLE IF EXISTS `ema_response`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ema_response` (
  `record_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `user_selected_activity` varchar(1000) DEFAULT NULL,
  `user_company` varchar(1000) DEFAULT NULL,
  `user_curr_location` varchar(1000) DEFAULT NULL,
  `user_food_habit` varchar(1000) DEFAULT NULL,
  `user_feelings` varchar(1000) DEFAULT NULL,
  `activity_time` datetime DEFAULT NULL,
  `motivation_screen` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`record_id`,`username`)
) ENGINE=InnoDB AUTO_INCREMENT=227 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ema_schedule_perday`
--

DROP TABLE IF EXISTS `ema_schedule_perday`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ema_schedule_perday` (
  `record_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `ema_time` time NOT NULL,
  `activity_time` datetime DEFAULT NULL,
  PRIMARY KEY (`record_id`,`username`)
) ENGINE=InnoDB AUTO_INCREMENT=1176 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ematime_notification_fired`
--

DROP TABLE IF EXISTS `ematime_notification_fired`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ematime_notification_fired` (
  `record_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `notification_fired_time` datetime NOT NULL,
  PRIMARY KEY (`record_id`,`username`)
) ENGINE=InnoDB AUTO_INCREMENT=1850 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feedback` (
  `record_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `message` varchar(1000) NOT NULL,
  `activity_time` datetime NOT NULL,
  `target_walk` decimal(9,6) DEFAULT NULL,
  `resultant_walk` decimal(9,6) DEFAULT NULL,
  `walk_after_goal_set` decimal(9,6) DEFAULT NULL,
  PRIMARY KEY (`record_id`,`username`)
) ENGINE=InnoDB AUTO_INCREMENT=162 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `heartrate_checking`
--

DROP TABLE IF EXISTS `heartrate_checking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `heartrate_checking` (
  `record_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `user_heart_rate` int(11) NOT NULL,
  `activity_time` datetime NOT NULL,
  PRIMARY KEY (`record_id`,`username`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `intervention_msg`
--

DROP TABLE IF EXISTS `intervention_msg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `intervention_msg` (
  `record_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `message` varchar(1000) NOT NULL,
  `activity_time` datetime NOT NULL,
  PRIMARY KEY (`record_id`,`username`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `phonebattery_checking`
--

DROP TABLE IF EXISTS `phonebattery_checking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `phonebattery_checking` (
  `record_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `remaining_battery` int(11) NOT NULL,
  `activity_time` datetime NOT NULL,
  PRIMARY KEY (`record_id`,`username`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `phonebattery_low`
--

DROP TABLE IF EXISTS `phonebattery_low`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `phonebattery_low` (
  `record_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `remaining_battery` int(11) NOT NULL,
  `activity_time` datetime NOT NULL,
  PRIMARY KEY (`record_id`,`username`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `physical_activity`
--

DROP TABLE IF EXISTS `physical_activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `physical_activity` (
  `record_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `user_sitting_duration` time NOT NULL,
  `user_walking_duration` time NOT NULL,
  `user_step_count` decimal(7,2) DEFAULT NULL,
  `distance_covered_in_miles` decimal(5,2) NOT NULL,
  `user_heart_rate` int(11) NOT NULL,
  `activity_time` datetime NOT NULL,
  `vdate` date DEFAULT NULL,
  PRIMARY KEY (`record_id`,`username`)
) ENGINE=InnoDB AUTO_INCREMENT=16172 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `progress_checking`
--

DROP TABLE IF EXISTS `progress_checking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `progress_checking` (
  `record_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `walk` time DEFAULT NULL,
  `step_count` decimal(10,2) DEFAULT NULL,
  `sitting` time DEFAULT NULL,
  `activity_time` datetime NOT NULL,
  PRIMARY KEY (`record_id`,`username`)
) ENGINE=InnoDB AUTO_INCREMENT=1488 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `remaining_activity_msg`
--

DROP TABLE IF EXISTS `remaining_activity_msg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `remaining_activity_msg` (
  `record_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `remaining_activity_msg` varchar(1000) NOT NULL,
  `activity_time` datetime NOT NULL,
  PRIMARY KEY (`record_id`,`username`)
) ENGINE=InnoDB AUTO_INCREMENT=302 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `remaining_goal_checking`
--

DROP TABLE IF EXISTS `remaining_goal_checking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `remaining_goal_checking` (
  `record_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `remaining_activity_msg` varchar(1000) NOT NULL,
  `activity_time` datetime NOT NULL,
  PRIMARY KEY (`record_id`,`username`)
) ENGINE=InnoDB AUTO_INCREMENT=218 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `selected_activity`
--

DROP TABLE IF EXISTS `selected_activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `selected_activity` (
  `record_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `user_selected_activity` varchar(1000) DEFAULT NULL,
  `user_company` varchar(1000) DEFAULT NULL,
  `user_curr_location` varchar(1000) DEFAULT NULL,
  `user_food_habit` varchar(1000) DEFAULT NULL,
  `user_feelings` varchar(1000) DEFAULT NULL,
  `activity_time` datetime DEFAULT NULL,
  PRIMARY KEY (`record_id`,`username`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sent_push_msg`
--

DROP TABLE IF EXISTS `sent_push_msg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sent_push_msg` (
  `record_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `msg` varchar(1000) NOT NULL,
  `status` int(11) NOT NULL,
  `time_sent` datetime NOT NULL,
  PRIMARY KEY (`record_id`,`username`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `set_goals`
--

DROP TABLE IF EXISTS `set_goals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `set_goals` (
  `record_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `user_readiness_level` int(11) NOT NULL,
  `user_walk_target` int(11) NOT NULL,
  `user_current_energy` int(11) NOT NULL,
  `activity_time` datetime DEFAULT NULL,
  PRIMARY KEY (`record_id`,`username`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_goals`
--

DROP TABLE IF EXISTS `user_goals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_goals` (
  `record_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `user_readiness_level` int(11) NOT NULL,
  `user_walk_target` int(11) NOT NULL,
  `user_current_energy` int(11) NOT NULL,
  `activity_time` datetime DEFAULT NULL,
  PRIMARY KEY (`record_id`,`username`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_watching_video`
--

DROP TABLE IF EXISTS `user_watching_video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_watching_video` (
  `record_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `video_title` varchar(1000) NOT NULL,
  `activity_time` datetime NOT NULL,
  PRIMARY KEY (`record_id`,`username`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `utility_log`
--

DROP TABLE IF EXISTS `utility_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `utility_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `runtime` datetime DEFAULT NULL,
  `status` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `watch_disconnected`
--

DROP TABLE IF EXISTS `watch_disconnected`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `watch_disconnected` (
  `record_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `activity_time` datetime NOT NULL,
  PRIMARY KEY (`record_id`,`username`)
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `watchbattery_low`
--

DROP TABLE IF EXISTS `watchbattery_low`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `watchbattery_low` (
  `record_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `remaining_battery` int(11) NOT NULL,
  `activity_time` datetime NOT NULL,
  PRIMARY KEY (`record_id`,`username`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `watching_video`
--

DROP TABLE IF EXISTS `watching_video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `watching_video` (
  `record_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `video_title` varchar(1000) NOT NULL,
  `activity_time` datetime NOT NULL,
  PRIMARY KEY (`record_id`,`username`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `wifi_disconnected`
--

DROP TABLE IF EXISTS `wifi_disconnected`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wifi_disconnected` (
  `record_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `activity_time` datetime NOT NULL,
  PRIMARY KEY (`record_id`,`username`)
) ENGINE=InnoDB AUTO_INCREMENT=238 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-02-28  9:05:54
