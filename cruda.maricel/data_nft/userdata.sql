CREATE TABLE IF NOT EXISTS `userdata` (
`id` INT NULL,
`name` VARCHAR(MAX) NULL,
`username` VARCHAR(MAX) NULL,
`email` VARCHAR(MAX) NULL,
`address` VARCHAR(MAX) NULL,
`password` VARCHAR(MAX) NULL,
`one_liner` VARCHAR(MAX) NULL,
`member_since` VARCHAR(MAX) NULL
);

INSERT INTO userdata VALUES
(1,'Susanne Mcpherson','user1','user1@gmail.com','Whitmer\, Oregon',md5('pass'),'Cillum nostrud amet labore ex duis labore ut irure proident.','2022-03-21'),
(2,'Hood Koch','user2','user2@gmail.com','Fairview\, Puerto Rico',md5('pass'),'Minim elit excepteur incididunt nisi exercitation id labore ex.','2022-04-08'),
(3,'Lila Drake','user3','user3@gmail.com','Bainbridge\, California',md5('pass'),'Adipisicing consequat Lorem ea minim sunt elit nulla elit duis pariatur consectetur ipsum.','2022-03-20'),
(4,'Davidson Watkins','user4','user4@gmail.com','Shrewsbury\, Nevada',md5('pass'),'Aliquip laborum incididunt dolore labore laboris exercitation excepteur ut qui cillum.','2022-03-19'),
(5,'Banks Doyle','user5','user5@gmail.com','Marenisco\, Texas',md5('pass'),'Adipisicing duis cupidatat duis id in nostrud et velit excepteur dolor irure fugiat et.','2022-01-06'),
(6,'Key Finley','user6','user6@gmail.com','Thatcher\, South Carolina',md5('pass'),'Aliqua enim fugiat est est ex et tempor pariatur.','2022-01-07'),
(7,'Frank Stein','user7','user7@gmail.com','Oberlin\, New Hampshire',md5('pass'),'Duis magna exercitation qui irure id amet adipisicing anim nulla sint nisi occaecat qui pariatur.','2022-04-01'),
(8,'Bentley Fowler','user8','user8@gmail.com','Dargan\, Indiana',md5('pass'),'Nisi nisi aute cillum ea velit velit et voluptate ex veniam esse ullamco.','2022-03-21'),
(9,'Rosalinda Castillo','user9','user9@gmail.com','Grahamtown\, Utah',md5('pass'),'Deserunt incididunt Lorem magna deserunt labore laborum ad Lorem.','2022-02-24'),
(10,'Ola Lynn','user10','user10@gmail.com','Neibert\, Arizona',md5('pass'),'Enim anim ea ullamco ea.','2022-03-11');