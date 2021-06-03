-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 03, 2021 at 03:17 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.4.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `antonini_portfolio`
--

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `name`, `email`, `subject`, `message`, `ip_address`, `created_at`) VALUES
(1, 'Mohammad Wasi Ibtida', 'wasi.ibtida@gmail.com', 'Greeting', 'Hi,\nBye.', NULL, '2021-04-01 03:16:28');

-- --------------------------------------------------------

--
-- Table structure for table `finderlinks`
--

CREATE TABLE `finderlinks` (
  `id` int(11) NOT NULL,
  `page_id` int(11) NOT NULL,
  `icon_id` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `finderlinks`
--

INSERT INTO `finderlinks` (`id`, `page_id`, `icon_id`, `link`, `created_at`, `updated_at`) VALUES
(1, 1, '1', 'https://github.com/antonin686', NULL, '2021-05-17 07:44:42'),
(2, 1, '2', 'https://twitter.com/antonin686', NULL, NULL),
(3, 1, '3', 'https://www.facebook.com/AnToNin686', NULL, NULL),
(4, 2, '5', 'http://health-bmdc.research.glitch-innovations.com', NULL, '2021-04-23 05:34:18'),
(5, 3, '1', 'https://github.com/antonin686/anven', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `icons`
--

CREATE TABLE `icons` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `icon` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `icons`
--

INSERT INTO `icons` (`id`, `name`, `icon`, `created_at`, `updated_at`) VALUES
(1, 'Github', 'github-square-brands.svg', NULL, NULL),
(2, 'Twitter', 'twitter-square-brands.svg', NULL, NULL),
(3, 'Facebook', 'facebook-square-brands.svg', NULL, NULL),
(4, 'Eye', 'eye-solid.svg', NULL, NULL),
(5, 'Globe-asia', 'globe-asia-solid.svg', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `page_id` int(11) NOT NULL,
  `path` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `page_id`, `path`, `title`, `created_at`, `updated_at`) VALUES
(1, 2, 'uploads/imgs/1620079318nhms1.jpg', 'Welcome Page', NULL, NULL),
(2, 2, 'uploads/imgs/nhms2.jpg', 'Super Admin Dashboard', NULL, NULL),
(3, 3, 'uploads/imgs/anven.png', 'Logo', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `header_title` varchar(255) DEFAULT NULL,
  `header_body` text NOT NULL,
  `img_path` varchar(255) DEFAULT NULL,
  `main_title` varchar(255) NOT NULL,
  `main_body` text NOT NULL,
  `extra_title` varchar(255) NOT NULL,
  `extra_body` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`id`, `type`, `header_title`, `header_body`, `img_path`, `main_title`, `main_body`, `extra_title`, `extra_body`, `created_at`, `updated_at`) VALUES
(1, 'front', 'What I do?', 'I am currently doing my undergraduate in Software Engineering from AIUB.', 'uploads/imgs/1621984994profile.jpg', 'More About Me', 'I started programming in high school and looking forward to a career based around programming.', 'Top Expertise', 'Fullstack Developer with primary focus on Laravel and React:', NULL, '2021-05-25 17:23:14'),
(2, 'project', 'BMDC Portal', 'An admin portal for National Health Management System. Which connects with 2 other users of the platform.\r\n', 'uploads/imgs/nhms1.jpg', 'About The Project', 'An admin portal for National Health Management System. Which connects with 2 other users of the platform.', 'Technologies', '', NULL, '2021-05-24 18:40:36'),
(3, 'project', 'Anven', 'Anven is a stunningly fast and light PHP micro-framework for building web applications.', 'uploads/imgs/anven.png', 'About The Project', 'Anven is a stunningly fast and light PHP micro-framework for building web applications. Anven attempts to make your backend development process simple by easing common tasks such as routing, database. It also helps you develope fast with the \"ven\" console commands feature.', 'Technologies', '', NULL, NULL),
(4, 'project', 'Dunno Yet', 'A game made using Phaser 3', 'uploads/imgs/1620389121img.png', 'About The Project', 'Still in Progress yeah', 'Technologies', '', '2021-05-07 04:54:12', '2021-05-26 06:23:35');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `page_id` int(11) NOT NULL,
  `tags` varchar(255) NOT NULL,
  `status` int(10) NOT NULL DEFAULT 0,
  `timespan` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `page_id`, `tags`, `status`, `timespan`, `created_at`, `updated_at`) VALUES
(1, 2, 'Laravel|Mysql', 1, '2019', '2021-01-01 17:33:27', NULL),
(2, 3, 'Php', 1, '2020', '2021-02-01 17:33:34', NULL),
(3, 4, 'Phaser 3|TS', 0, '2021 - Present', '2021-05-07 04:54:13', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `techsets`
--

CREATE TABLE `techsets` (
  `id` int(11) NOT NULL,
  `page_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `extra` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `techsets`
--

INSERT INTO `techsets` (`id`, `page_id`, `name`, `extra`, `created_at`, `updated_at`) VALUES
(1, 1, 'Html', 'Bootstrap', NULL, NULL),
(2, 1, 'Php', 'Laravel', NULL, NULL),
(3, 1, 'Javascript', 'React', NULL, NULL),
(4, 2, '- Language: Php, Js', '', NULL, NULL),
(7, 3, '- Language: Php', '', NULL, NULL),
(8, 3, '- Framework: Symfony/console', '', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `type`, `created_at`, `updated_at`) VALUES
(1, 'antonin', '990331', 'boss', '2021-02-02 09:07:04', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `finderlinks`
--
ALTER TABLE `finderlinks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `icons`
--
ALTER TABLE `icons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `techsets`
--
ALTER TABLE `techsets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `finderlinks`
--
ALTER TABLE `finderlinks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `icons`
--
ALTER TABLE `icons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `techsets`
--
ALTER TABLE `techsets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
