# FrontAuth

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Project Structure

```-- phpMyAdmin SQL Dump
-- version 4.9.5deb2ubuntu0.1~esm1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 25, 2023 at 08:35 PM
-- Server version: 8.0.34-0ubuntu0.20.04.1
-- PHP Version: 7.4.3-4ubuntu2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ideas`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`admin`@`localhost` PROCEDURE `fetch_all_ideas` ()  BEGIN
		SELECT i.`id`, i.`title`, i.`description`, 
		 `user`.`name` AS userName, `user`.`id` AS userId,
		   GROUP_CONCAT(tags.`tagName`) AS tags
		    FROM ideas i
		left outer JOIN tagmaping ON i.`id` = tagmaping.`ideaId`
		left outer JOIN tags ON tagmaping.`tagId` = tags.`id`
		INNER JOIN `user` ON user.`id` = i.`userId`
		GROUP BY i.`id`;
	END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`) VALUES
(132, 'First Name', 'admin@gmail.com', '$2b$10$sgQlaixOeT2QT6v2cdYLueDwc4p5Q49dkwxBrfZoUagIMtav5UV1S'),
(136, 'Name', 'demo@gmai.com', '$2b$10$tLHXct2Ws3nQ031MLJSOdufFt/CysqsUnRsGbhnXE/NMMxw4ija5C'),
(138, 'My Name', 'myemail@gmail.com', '$2b$10$4EyfQRNx7Qnp08APyBUjF.f7sqhG0sPicy4AE.OmWj2.F6/JSHjdS');


-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id` int NOT NULL,
  `tagName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `tagName`) VALUES
(1, 'java'),
(2, 'JavaScript'),
(3, 'Angular'),
(4, 'NodeJS'),
(5, 'MySQL'),
(6, 'C'),
(8, 'C++'),
(9, 'C#'),
(10, 'Python');

-- --------------------------------------------------------
--
-- Table structure for table `ideas`
--

CREATE TABLE `ideas` (
  `id` int NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `tagMapId` int DEFAULT NULL,
  `userId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ideas`
--

INSERT INTO `ideas` (`id`, `title`, `description`, `userId`) VALUES
(1, 'ist', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, cumque exercitationem officia architecto rerum rem numquam cum sint animi earum, nihil atque tenetur doloribus doloremque deleniti quo optio incidunt aspernatur non inventore. Eius, nisi. Magnam suscipit totam harum enim. Minima expedita sunt odio aliquid, odit necessitatibus ullam ipsam voluptatum eum, animi, harum porro earum repudiandae enim? Ipsam temporibus id ex sint, repellendus fugiat odio dicta, a praesentium magnam quae. Praesentium vero voluptate iusto, adipisci numquam deleniti voluptatibus autem. Ex natus facere modi laudantium libero similique vero provident! Et, qui! Ipsam facere velit dicta?', NULL, 136),
(2, '2nd', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, cumque exercitationem officia architecto rerum rem numquam cum sint animi earum, nihil atque tenetur doloribus doloremque deleniti quo optio incidunt aspernatur non inventore. Eius, nisi. Magnam suscipit totam harum enim. Minima expedita sunt odio aliquid, odit necessitatibus ullam ipsam voluptatum eum, animi, harum porro earum repudiandae enim? Ipsam temporibus id ex sint, repellendus fugiat odio dicta, a praesentium magnam quae. Praesentium vero voluptate iusto, adipisci numquam deleniti voluptatibus autem. Ex natus facere modi laudantium libero similique vero provident! Et, qui! Ipsam facere velit dicta? Vero voluptatum alias impedit voluptates incidunt molestiae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, cumque exercitationem officia architecto rerum rem numquam cum sint animi earum, nihil atque tenetur doloribus doloremque deleniti quo optio incidunt aspernatur non inventore. Eius, nisi. Magnam suscipit totam harum enim. Minima expedita sunt odio aliquid, odit necessitatibus ullam ipsam voluptatum eum, animi, harum porro earum repudiandae enim? Ipsam temporibus id ex sint, repellendus fugiat odio dicta, a praesentium magnam quae. Praesentium vero voluptate iusto, adipisci numquam deleniti voluptatibus autem. Ex natus facere modi laudantium libero similique vero provident! Et, qui! Ipsam facere velit dicta? Vero voluptatum alias impedit voluptates incidunt molestiae.', NULL,  132),
(67, 'Todo List', 'Project Description: Todo List Application with Angular, Node.js, and MySQL\n\nOverview:\nThis project aims to build a web-based Todo List application using Angular for the frontend, Node.js for the backend, and MySQL as the database. The application will allow users to create, manage, and organize their tasks in an efficient and user-friendly manner. Users will be able to add new tasks, mark them as completed, update task details, and delete tasks.\n\nKey Features:\n1. User Authentication: The application will support user registration and login functionality to allow each user to have a personalized todo list.\n\n2. Task Management: Users can create new tasks with a title, description, due date, and priority level. They can view all their tasks in a list, mark tasks as completed, and sort or filter tasks based on their priority or due date.\n\n3. Task Details: Users can view and edit task details, including updating the task title, description, due date, and priority.\n\n4. Real-time Updates: Th', NULL, 138),
(73, 'title', 'desc', NULL, 132);

-- --------------------------------------------------------

--
-- Table structure for table `tagmaping`
--

CREATE TABLE `tagmaping` (
  `id` int NOT NULL,
  `tagId` int NOT NULL,
  `ideaId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tagmaping`
--

INSERT INTO `tagmaping` (`id`, `tagId`, `ideaId`) VALUES
(1, 1, 1),
(2, 3, 1),
(3, 4, 2),
(5, 2, 2),
(6, 1, 2),
(7, 5, 2),
(27, 4, 67),
(28, 3, 67),
(29, 5, 67),
(38, 10, 73),
(39, 6, 73);

-- --------------------------------------------------------

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ideas`
--
ALTER TABLE `ideas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `std_detl`
--
ALTER TABLE `std_detl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tagmaping`
--
ALTER TABLE `tagmaping`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tagId` (`tagId`),
  ADD KEY `ideaId` (`ideaId`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQUE` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ideas`
--
ALTER TABLE `ideas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT for table `std_detl`
--
ALTER TABLE `std_detl`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tagmaping`
--
ALTER TABLE `tagmaping`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=149;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ideas`
--
ALTER TABLE `ideas`
  ADD CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `user` (`id`);

--
-- Constraints for table `tagmaping`
--
ALTER TABLE `tagmaping`
  ADD CONSTRAINT `ideaId` FOREIGN KEY (`ideaId`) REFERENCES `ideas` (`id`),
  ADD CONSTRAINT `tagId` FOREIGN KEY (`tagId`) REFERENCES `tags` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
```
