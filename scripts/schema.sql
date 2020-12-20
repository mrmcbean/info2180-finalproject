CREATE DATABASE IF NOT EXISTS dbase;
USE dbase;
CREATE TABLE IF NOT EXISTS`Users`
(
    `id` integer(11) PRIMARY KEY auto_increment,
    `firstname` varchar(35) NOT NULL,
    `lastname` varchar(35) NOT NULL,
    `password` varchar (255) NOT NULL,
    `email` varchar(35) NOT NULL,
    `date_joined` datetime NOT NULL
);

CREATE TABLE IF NOT EXISTS  `Issues`
(
    `id` integer(11) NOT NULL auto_increment,
    `title` varchar(35) NOT NULL ,
    `description` text(255) NOT NULL ,
    `type` varchar(35) NOT NULL,
    `priority` varchar(35) NOT NULL,
    `status` varchar(35) NOT NULL,
    `assigned_to` integer(35) NOT NULL,
    `created_by` integer(35) NOT NULL,
    `created` datetime NOT NULL,
    `updated` datetime NOT NULL,
    PRIMARY KEY (`id`)


);
INSERT INTO Users (firstname, lastname, password,email,date_joined) VALUES ('admin', 'admin', '$2y$12$JjlkP2mcYXvgovKsmhRU2.UImG0FaKVLpFrcEpycJqFMfg.J44EZG', 'admin@project2.com', CURDATE())