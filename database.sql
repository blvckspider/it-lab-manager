CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('dev', 'admin', 'user') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- INSERT INTO users (username, email, password, role)
-- VALUES
--   ('name', 'email@email.com', 'password', 'user'),
--   ('nick', 'nick@email.com', 'pasf4s1', 'user'),
--   ('james', 'james.sniper@email.com', 'K3k1l@2s', 'user')
-- ON DUPLICATE KEY UPDATE
--   email = VALUES(email),
--   password = VALUES(password),
--   role = VALUES(role),
--   updated_at = CURRENT_TIMESTAMP;


CREATE TABLE IF NOT EXISTS materials (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL UNIQUE,
	quantity INT NOT NULL DEFAULT 1,
	note VARCHAR(255),
	location VARCHAR(255) NOT NULL
);

-- INSERT INTO materials (name, quantity, note, location)
-- VALUES
-- 	('STM32F401RE', 34, '', 'armadietto a destra, secondo scaffale'),
-- 	('ESP8266', 30, 'xx/xx/xx: tizio ha preso 2pz (classe X)', 'seconda scatola sopra l\'armadietto a destra'),
-- 	('sensore HX711', 5, 'xx/xx/xx: tizio ha preso 2pz (classe X)', 'scatola sensori')
-- ON DUPLICATE KEY UPDATE
-- 	quantity = VALUES(quantity),
-- 	note = VALUES(note),
-- 	location = VALUES(location);
