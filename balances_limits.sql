-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Фев 24 2021 г., 10:19
-- Версия сервера: 10.3.22-MariaDB
-- Версия PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `balances_limits`
--

-- --------------------------------------------------------

--
-- Структура таблицы `bills`
--

CREATE TABLE `bills` (
  `id` int(11) NOT NULL,
  `deal_id` int(11) NOT NULL,
  `number` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `summ` float NOT NULL,
  `kvr` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kosgu` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kvfo` varchar(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ok` varchar(17) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `deals`
--

CREATE TABLE `deals` (
  `id` int(11) NOT NULL,
  `number` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `product` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `summ` float NOT NULL,
  `kvr` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kosgu` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kvfo` varchar(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ok` varchar(17) COLLATE utf8mb4_unicode_ci NOT NULL,
  `partner` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `balance` float NOT NULL,
  `limit_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `limits`
--

CREATE TABLE `limits` (
  `id` int(11) NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `kvr` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kosgu` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kvfo` varchar(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ok` varchar(17) COLLATE utf8mb4_unicode_ci NOT NULL,
  `summ` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `limits`
--

INSERT INTO `limits` (`id`, `name`, `kvr`, `kosgu`, `kvfo`, `ok`, `summ`) VALUES
(1, 'Увеличение стоимости прочих оборотных запасов (материалов)', '244', '346', '2', '80699900000000000', 8306930);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `bills`
--
ALTER TABLE `bills`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `deals`
--
ALTER TABLE `deals`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `limits`
--
ALTER TABLE `limits`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `bills`
--
ALTER TABLE `bills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `deals`
--
ALTER TABLE `deals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `limits`
--
ALTER TABLE `limits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
