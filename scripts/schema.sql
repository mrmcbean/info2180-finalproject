DROP TABLE IF EXISTS `Users`;
CREATE TABLE 'Users'
(
    'id' integer(11) NOT NULL PRIMARY KEY,
    'firstname' varchar(35) NOT NULL,
    'lastname' varchar(35) NOT NULL,
    'password' varchar (35) NOT NULL,
    'email' varchar(35) NOT NULL,
    'date_joined' datetime(25) NOT NULL
);


DROP TABLE IF EXISTS `Issues`;
CREATE TABLE `Issues`
(
    `id` integer(11) NOT NULL auto_increment,
    `title` varchar(35) NOT NULL default '',
    `description` text(255) NOT NULL default '',
    `type` varchar(35) NOT NULL,
    `priority` varchar(35) NOT NULL,
    `status` varchar(35) NOT NULL,
    `assigned_to` integer(35) NOT NULL,
    `created_by` integer(35) NOT NULL,
    `created` datetime(25) NOT NULL,
    `updated` datetime(25) NOT NULL,
    PRIMARY KEY (`id`)
);
