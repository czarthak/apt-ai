DROP DATABASE IF EXISTS inventory;
CREATE DATABASE IF NOT EXISTS inventory;
USE inventory;
CREATE TABLE IF NOT EXISTS user (
	email VARCHAR(128) NOT NULL,
    lname VARCHAR(64) NOT NULL,
    fname VARCHAR(64) NOT NULL,
    password VARCHAR(32) NOT NULL,
    phone_number VARCHAR(14),
    year VARCHAR(255),
    major VARCHAR(255),
    bio TEXT,
    budget DECIMAL(10,2),
    personal_trait VARCHAR(255),
    PRIMARY KEY (email)
);
# INSERT INTO user (email, lname, fname, password, phone_number) VALUES
# ('lukebrown@example.com', 'Brown', 'Luke', 'securepass1', '987-654-3211'),
# ('oliviabell@example.com', 'Bell', 'Olivia', 'securepass2', '987-654-3212'),
# ('melissajones@example.com', 'Jones', 'Melissa', 'securepass3', '987-654-3213'),
# ('anthonypeters@example.com', 'Peters', 'Anthony', 'securepass4', '987-654-3214'),
# ('emilyjohnson@example.com', 'Johnson', 'Emily', 'sciencePass', '8888888888');
INSERT INTO user (email, lname, fname, password, phone_number, year, major, bio, budget, personal_trait)
VALUES
    ('john.doe@example.com', 'Doe', 'John', 'password123', '123-456-7890', 'Senior', 'Computer Science', 'I love coding and exploring new technologies.', 500.00, 'IJTG'),
    ('janesmith@example.com', 'Smith', 'Jane', 'pass456', '987-654-3210', 'Junior', 'Electrical', 'Passionate about renewable energy and sustainable solutions.', 700.00, 'ENTG'),
    ('mike.jackson@example.com', 'Jackson', 'Mike', 'mikepass', '555-555-5555', 'Sophomore', 'Business', 'Entrepreneur with a focus on innovation and growth.', 1100.00, 'INFP'),
    ('emily.jones@example.com', 'Jones', 'Emily', 'em123', '777-888-9999', 'Freshman', 'Psychology', 'Exploring the human mind and behavior is my passion.', 1500.00, 'INFG'),
    ('david.white@example.com', 'White', 'David', 'davidpass', '333-222-1111', 'Senior', 'Computer Science', 'Designing machines that make a difference in the world.', 2000.00, 'INTJ'),
    ('sara.miller@example.com', 'Miller', 'Sara', 'sara456', '111-999-8888', 'Junior', 'Business', 'Appreciating the beauty of art from different eras and cultures.', 1500.00, 'ENTJ'),
    ('alex.turner@example.com', 'Turner', 'Alex', 'alexpass', '666-777-8888', 'Sophomore', 'Electrical', 'Passionate about social justice and international relations.', 600.00, 'EJFG'),
    ('olivia.wilson@example.com', 'Wilson', 'Olivia', 'olivia123', '888-999-0000', 'Junior', 'Business', 'Effective communication is the key to success.', 600.00, 'ENTP'),
	('alicedoe@example.com', 'Doe', 'Alice', 'securepass', '987-654-3210', 'junior', 'Chemistry', 'Hi Im alice', '900', 'ENTP'),
	('johnsmith@example.com', 'Smith', 'John', 'password123', '123-456-7890', 'freshman', 'Computer Science', 'Hi my name is John', '800.0', 'EJFG');

CREATE TABLE IF NOT EXISTS apt (
  email VARCHAR(128) NOT NULL,
  description VARCHAR(512),
  id VARCHAR(256) NOT NULL,
  db_id INT AUTO_INCREMENT NOT NULL,
  PRIMARY KEY (db_id),
  CONSTRAINT fk_user_apt FOREIGN KEY (email) REFERENCES user (email)
);

INSERT INTO apt(email, description, id) VALUES
('alicedoe@example.com', 'Collegiate Suites & Hunters Ridge, Henry Lane, Blacksburg, VA, USA', 'ChIJWf94jHyVTYgR0piad-XCMWw'),
('alicedoe@example.com', 'The Edge Apartment Homes, Edge Way, Blacksburg, VA, USA', 'ChIJfTLXfW6VTYgRFpbHGhO5yDE'),
('janesmith@example.com', 'West Ambler Johnston Hall, Washington Street Southwest, Blacksburg, VA, USA', 'ChIJudcIPgyVTYgRwuFWL1hEYdM'),
('johnsmith@example.com', 'Alight Blacksburg, Patrick Henry Drive, Blacksburg, VA, USA', 'ChIJn0P0cmSVTYgR5C5kZoj5N7U');

CREATE TABLE IF NOT EXISTS listing (
  email VARCHAR(128) NOT NULL,
  description VARCHAR(1024),
  people INT,
  bathrooms INT,
  price DECIMAL(10,2),
  pets ENUM('YES', 'SERVICE', 'NO') NOT NULL,
  sex ENUM('MALE', 'FEMALE', 'EITHER'),
  id VARCHAR(256) NOT NULL,
  dbid INT AUTO_INCREMENT,
  PRIMARY KEY (dbid),
  CONSTRAINT fk_user_listing FOREIGN KEY (email) REFERENCES user (email)
);

INSERT INTO listing (email, description, people, bathrooms, price, pets, sex, id, dbid) 
VALUES
('janesmith@example.com', 'bbl drizzy', 19, 2, 50.00, 'NO', 'FEMALE', 'ChIJr0LOfG2VTYgRRiv2A2Hfo9k', 11),
('alicedoe@example.com', 'banana house', 2, 2, 7500.00, 'NO', 'EITHER', 'ChIJr0LOfG2VTYgRRiv2A2Hfo9k', 12),
('alex.turner@example.com', 'asdfasdf', 2, 5, 500.00, 'YES', 'MALE', 'ChIJr0LOfG2VTYgRRiv2A2Hfo9k', 13),
('alicedoe@example.com', 'good very nice house', 2, 2, 1.00, 'NO', 'FEMALE', 'ChIJT6wA1RSVTYgR-jS1Xr6qnbs', 14),
('david.white@example.com', 'skibidi ohio land', 3, 2, 90.00, 'NO', 'MALE', 'ChIJ3ddNLK3wQIgRPwQBAsPf1EA', 15),
('mike.jackson@example.com', 'edge bitch', 4, 4, 1000.00, 'NO', 'MALE', 'ChIJadHyQW6VTYgRJDQmIlUC2Ao', 16),
('olivia.wilson@example.com', 'cozy cabin in the woods', 4, 2, 850.00, 'NO', 'EITHER', 'ChIJ8aBtoavqTYgRxHZVBDg8-IA', 23),
('olivia.wilson@example.com', 'suburban home with large yard', 4, 2, 1000.00, 'NO', 'EITHER', 'ChIJ6bAclDK-TYgRwALSJRjm5Mw', 24),
('john.doe@example.com', 'modern loft with city view', 2, 1, 1200.00, 'YES', 'MALE', 'ChIJkcaodqWVTYgRR8S_npnkuR0', 17),
('janesmith@example.com', 'spacious apartment in downtown', 3, 2, 1600.00, 'YES', 'FEMALE', 'ChIJs0lcfJWVTYgRgQ_iUKPT_Rw', 18),
('mike.jackson@example.com', 'cozy cottage with garden', 4, 3, 2200.00, 'YES', 'FEMALE', 'ChIJh3AmlQyVTYgRDeWTUK2CWhc', 19),
('sara.miller@example.com', 'charming penthouse with balcony', 1, 1, 2500.00, 'NO', 'MALE', 'ChIJiUPlZQyVTYgRsVVMFOYY_es', 20),
('emily.jones@example.com', 'suburban home with large yard', 4, 2, 1800.00, 'YES', 'FEMALE', 'ChIJJyztKd-2t4kRL1MTwPjQg68', 21),
('janesmith@example.com', 'luxurious apartment with gym access', 2, 2, 2100.00, 'NO', 'MALE', 'ChIJ3ddNLK3wQIgRPwQBAsPf1EA', 22);

