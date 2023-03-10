CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(15) NOT NULL,
  `permissions` json DEFAULT NULL,
  `admin` tinyint DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `path` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `instances` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `tag` int DEFAULT NULL,
  `admin` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_idx` (`tag`),
  CONSTRAINT `fkinstanceid` FOREIGN KEY (`tag`) REFERENCES `tags` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(65) NOT NULL,
  `token` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `userxroles` (
  `userId` int NOT NULL,
  `roleId` int NOT NULL,
  PRIMARY KEY (`userId`,`roleId`),
  KEY `fkuxruser` (`userId`),
  KEY `fkuxrrol` (`roleId`),
  CONSTRAINT `fkuxrrol` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fkuxruser` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `userssubscribedinstances` (
  `instanceId` int NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`instanceId`,`userId`),
  KEY `fkusiinstance_idx` (`instanceId`),
  KEY `fkusiuser_idx` (`userId`),
  CONSTRAINT `fkusiinstance` FOREIGN KEY (`instanceId`) REFERENCES `instances` (`id`),
  CONSTRAINT `fkusiuser` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `roles`(`id`,`name`,`permissions`,`admin`)VALUES('1', 'admin', '[\"login\", \"user-show\", \"user-show-all\", \"user-create\", \"user-update\", \"user-update-all\", \"instance-show-subscribed\", \"instance-show-other-subscribed\", \"instance-show-all\", \"instance-show-admin\", \"instance-subscribe\", \"instance-subscribe-admin\", \"instance-other-subscribe\", \"instance-other-subscribe-admin\", \"user-delete-all\"]', '1');
INSERT INTO `roles`(`id`,`name`,`permissions`,`admin`)VALUES('2', 'standard', '[\"login\", \"user-show\", \"instance-show-subscribed\"]', '0');
INSERT INTO `users`(`id`,`username`,`password`,`token`)VALUES('1', 'root', '', NULL);
INSERT INTO `userxroles`(`userId`,`roleId`)VALUES('1', '1');

