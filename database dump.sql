-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: balances_limits
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE IF NOT EXISTS `balances_limits` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `balances_limits`;

--
-- Table structure for table `bills`
--

DROP TABLE IF EXISTS `bills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `deal_id` int(11) NOT NULL,
  `number` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `summ` double NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `deal_id` (`deal_id`),
  CONSTRAINT `bills_ibfk_1` FOREIGN KEY (`deal_id`) REFERENCES `deals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=252 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bills`
--

LOCK TABLES `bills` WRITE;
/*!40000 ALTER TABLE `bills` DISABLE KEYS */;
INSERT INTO `bills` VALUES (87,49,'1',1500,'2021-01-31'),(88,74,'2104',19792.55,'2021-01-31'),(92,49,'43',1500,'2021-02-28'),(117,44,'118',8000,'2021-01-31'),(222,75,'137',21183.36,'2021-02-27'),(223,75,'114',24733.98,'2021-01-30');
/*!40000 ALTER TABLE `bills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deals`
--

DROP TABLE IF EXISTS `deals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `product` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `summ` double NOT NULL,
  `partner` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `limit_id` int(11) DEFAULT NULL,
  `is_bid` tinyint(4) NOT NULL DEFAULT '0',
  `economy` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `deals_ibfk_1` (`limit_id`),
  CONSTRAINT `deals_ibfk_1` FOREIGN KEY (`limit_id`) REFERENCES `limits` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=205 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deals`
--

LOCK TABLES `deals` WRITE;
/*!40000 ALTER TABLE `deals` DISABLE KEYS */;
INSERT INTO `deals` VALUES (44,'223/21','2021-01-11','Информ-конс услуги по 1С',8000,'ИП Аллянова АА',27,0,NULL),(48,'3287','2021-02-01','Сопровождение ПП Гарант',29700,'ООО Гарант-Специалист',27,0,NULL),(49,'1/21','2021-01-11','ТО пожарной сигнализации',15000,'ЧРО ВДПО',29,0,NULL),(67,'Ф/380205-02-ТП','2021-02-24','Сопровождение ПП Фарватер',10000,'ООО Фарватер',27,0,NULL),(71,'09.0004.21ТИ','2021-01-15','Техническая инвентаризация',14225.81,'ООО Земля и право',28,0,NULL),(74,'Чн1-01697/21','2021-01-11','Вывоз ТБО',226612.98,'ООО РСО',26,0,NULL),(75,'20/21 (44-ФЗ)','2021-01-11','Сброс и очистка сточных вод',68906.1,'ООО Центральная котельная',26,0,NULL),(203,'test free deal','2021-07-15','test for free deals working',50000,'test partner',NULL,0,NULL),(204,'test number','2021-07-15','test for bid working',50000,'test partner',26,1,NULL);
/*!40000 ALTER TABLE `deals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `limits`
--

DROP TABLE IF EXISTS `limits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `limits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `kvr` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `kosgu` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `kvfo` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ok` varchar(17) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `summ` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `limits`
--

LOCK TABLES `limits` WRITE;
/*!40000 ALTER TABLE `limits` DISABLE KEYS */;
INSERT INTO `limits` VALUES (26,'Коммунальные услуги','244','223','2','80611100000000000',350000),(27,'Прочие работы, услуги (инф-коммуник технолог)','244','226','2','80611000000000000',200000),(28,'Прочие работы, услуги','244','226','2','80699900000000000',2000000),(29,'Работы, услуги по содержанию имущества (противопожарные мероприятия)','244','225','2','80610700000000000',421206.36),(43,'Увеличение стоимости продуктов питания','244','342','4','80699900000000000',2500000);
/*!40000 ALTER TABLE `limits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `limit_id` int(11) NOT NULL,
  `number` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `summ` double NOT NULL,
  `date` date NOT NULL,
  `purpose_of_payment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `partner` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `limit_id` (`limit_id`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`limit_id`) REFERENCES `limits` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=167 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (43,26,'197',19792.55,'2021-02-07','Услуга по обращению с ТКО за январь 2021г. по счету №2104 от 31 января 2021г. без  НДС','Общество с ограниченной ответственностью \"Региональный северный оператор\"'),(63,43,'270',83248.07,'2021-02-11','Оплата за продукты согласно счета №63 от 28 января 2021г. Контракт № 2020.0110 от 25.12.2020г. без НДС','Общество с ограниченной ответственностью «Сибирский продукт»'),(66,27,'275',8000,'2021-02-11','Оплата за информационно-консультационные услуги по счету №118 от 31 января 2021г. Договор №223/21 от 11.01.21г. без НДС','Индивидуальный предприниматель Аллянова Анастасия Александровна'),(68,29,'277',31746.31,'2021-02-11','Оплата за  техническое обслуживание по счету № 43000010775 от 11января 2021г. Договор №351/44 от 11.01.21г. в т.ч. НДС 5291.05','Федеральное государственное унитарное предприятие \"Охрана\" Росгвардии'),(74,43,'292',185500,'2021-02-16','Оплата за молоко и сливки сухие по счету №2097 от 15 февраля 2021г. Контракт №44/04 от 01.02.21г. без НДС','Общество с ограниченной ответственностью \"Правильный выбор\"'),(98,29,'276',1500,'2021-02-25','Оплата за техническое обслуживание 1 объектового прибора с мониторингом по счету № 1 от 31 января 2021г. Договор №1/21 от 11.01.21г. без НДС','Чунское РО ВДПО'),(105,29,'389',31746.31,'2021-03-02','Оплата за техническое обслуживание по счету № 43000023903 от 01 февраля 2021г. Договор №351/44 от 11.01.21г. в т.ч. НДС 5291.05','Федеральное государственное унитарное предприятие \"Охрана\" Росгвардии'),(107,29,'388',1500,'2021-03-02','Оплата за техническое обслуживание 1 объектового прибора с мониторингом сигнала пожарной сигнализации объекта по счету №43 от 28 февраля 2021г. Договор №1/21 от 11.01.21г. без НДС','Чунское РО ВДПО');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-15 13:39:06
