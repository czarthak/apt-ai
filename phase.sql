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
    ('olivia.wilson@example.com', 'Wilson', 'Olivia', 'olivia123', '888-999-0000', 'Junior', 'Business', 'Effective communication is the key to success.', 600.00, 'ENTP');

INSERT INTO user (email, lname, fname, password, phone_number, year, major, bio, budget, personal_trait) VALUES
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

INSERT INTO listing (email, description, people, bathrooms, price, pets, sex, id) VALUES ('alex.turner@example.com ', 'Looking for one male roommate, message me @ 5408241234', 1, 1, 701.71, 'YES', 'EITHER', '39daf856-1bfa-4167-bddd-33fa753d6aa5');
INSERT INTO listing (email, description, people, bathrooms, price, pets, sex, id) VALUES ('alicedoe@example.com', 'Spacious two bedroom, need a female roommate ASAP! Text 5408245678', 2, 1, 1341.65, 'YES', 'EITHER', '2372a5eb-d9b5-48ad-a3cf-42b973a87092');
INSERT INTO listing (email, description, people, bathrooms, price, pets, sex, id) VALUES ('david.white@example.com', 'Pet-friendly two-bedroom available, call 5408249876', 2, 1, 773.17, 'YES', 'EITHER', '8fd04a1d-4fc6-4077-879d-503961f8a866');
INSERT INTO listing (email, description, people, bathrooms, price, pets, sex, id) VALUES ('emily.jones@example.com', 'One male roommate needed for 2-bedroom apartment. Call 5408245623', 1, 3, 1336.72, 'NO', 'FEMALE', 'a50bc81c-4325-42f9-9ab5-df7de707622c');
INSERT INTO listing (email, description, people, bathrooms, price, pets, sex, id) VALUES ('janesmith@example.com', 'One male roommate needed for 2-bedroom apartment. Call 5408245623', 3, 1, 992.81, 'SERVICE', 'MALE', 'e509fb4c-b8e3-4148-a926-b8f163b9381c');
INSERT INTO listing (email, description, people, bathrooms, price, pets, sex, id) VALUES ('john.doe@example.com', 'One-bedroom unit available, pet-friendly. Call @ 5408247890', 4, 3, 789.24, 'YES', 'FEMALE', '783f6649-96a2-4fab-a189-9373e62d49c0');
INSERT INTO listing (email, description, people, bathrooms, price, pets, sex, id) VALUES ('johnsmith@example.com', 'One male roommate needed for 2-bedroom apartment. Call 5408245623', 1, 3, 1484.2, 'SERVICE', 'EITHER', '80fd4b27-95d3-4724-a958-629de29d8cd7');
INSERT INTO listing (email, description, people, bathrooms, price, pets, sex, id) VALUES ('mike.jackson@example.com', 'Male roommate needed, call @ 5408248765', 4, 1, 1215.11, 'SERVICE', 'FEMALE', 'fd377e2b-0271-45ce-9236-7591cb787586');
INSERT INTO listing (email, description, people, bathrooms, price, pets, sex, id) VALUES ('olivia.wilson@example.com', 'Two girls looking for two girl roommates, text us @ 5408248782', 4, 1, 1017.84, 'SERVICE', 'EITHER', '98e0a89f-1850-4a34-b447-faf84db8c37c');
INSERT INTO listing (email, description, people, bathrooms, price, pets, sex, id) VALUES ('sara.miller@example.com', 'Looking for 3 female roommates, text me @ 5408242389', 2, 1, 1406.27, 'NO', 'FEMALE', 'bb290089-2ce1-491e-8cd8-4d074ad0929a');



;