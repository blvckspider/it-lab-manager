CREATE DATABASE IF NOT EXISTS it_lab_manager;
USE it_lab_manager;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('dev', 'admin', 'user') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO users (username, email, password, role)
VALUES
  ('name', 'email@email.com', '$2b$10$rXxKP4RdwisF44oamWtqfeET78GUBK3WhbCew9P.quFksyqqMnw0y', 'dev'), -- password: password
  ('nick', 'nick@email.com', '$2b$10$rXxKP4RdwisF44oamWtqfeET78GUBK3WhbCew9P.quFksyqqMnw0y', 'admin'), -- password: password
  ('james', 'james.sniper@email.com', '$2b$10$rXxKP4RdwisF44oamWtqfeET78GUBK3WhbCew9P.quFksyqqMnw0y', 'user') -- password: password
ON DUPLICATE KEY UPDATE
  email = VALUES(email),
  password = VALUES(password),
  role = VALUES(role),
  updated_at = CURRENT_TIMESTAMP;


CREATE TABLE IF NOT EXISTS materials (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL UNIQUE,
	quantity INT NOT NULL DEFAULT 1,
	note VARCHAR(255),
	laboratory VARCHAR(255) NOT NULL,
	locker INT NOT NULL,
	shelf INT NOT NULL
);

INSERT INTO materials (name, quantity, note, laboratory, locker, shelf)
VALUES
	('STM32F401RE', 34, '', 'informatica', 1, 2),
	('ESP8266', 30, 'xx/xx/xx: tizio ha preso 2pz (classe X)', 'telecomunicazioni', 2, 3),
	('sensore HX711', 5, 'xx/xx/xx: tizio ha preso 2pz (classe X)', 'fisica', 3, 4)
ON DUPLICATE KEY UPDATE
	quantity = VALUES(quantity),
	note = VALUES(note),
	laboratory = VALUES(laboratory),
	locker = VALUES(locker),
	shelf = VALUES(shelf);
