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
  ('name', 'email@email.com', 'password', 'user'),
  ('nick', 'nick@email.com', 'pasf4s1', 'user'),
  ('james', 'james.sniper@email.com', 'K3k1l@2s', 'user')
ON DUPLICATE KEY UPDATE
  email = VALUES(email),
  password = VALUES(password),
  role = VALUES(role),
  updated_at = CURRENT_TIMESTAMP;



CREATE TABLE IF NOT EXISTS materials (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL UNIQUE,
	quantity INT NOT NULL DEFAULT 1,
	position VARCHAR(255) NOT NULL
);

INSERT INTO materials (name, quantity, position)
VALUES
	('STM32F401RE', 34, 'armadietto a destra, secondo scaffale'),
	('ESP8266', 30, 'seconda scatola sopra l\'armadietto a destra'),
	('sensore HX711', 5, 'scatola sensori')
ON DUPLICATE KEY UPDATE
	quantity = VALUES(quantity),
	position = VALUES(position);