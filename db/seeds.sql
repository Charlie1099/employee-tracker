INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
("Ricky", "Bobby", 1, NULL),
("Cal", "Naughton", 2, 1),
("Glenn", "McBrayer", 3, 2),
("Lucius", "Washington", 4, NULL),
("Kyle", "Roberts", 5, 2),
("Susan", "Adams", 6, NULL),
("Larry", "Dennit", 7, 3);

INSERT INTO role 
(title, salary, department_id)
VALUES 
("Race Driver", 100000, 1),
("Lead Driver", 200000, 1),
("Pit Crew", 50000, 2),
("Pit Crew Lead", 150000, 2),
("Marketer", 60000, 3),
("Marketing Manager", 150000, 3);

INSERT INTO department
(department_name)
VALUES
("Driver"),
("Pit Crew Team"),
("Marketing");