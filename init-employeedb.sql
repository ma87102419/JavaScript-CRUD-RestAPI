DROP TABLE IF EXISTS employee;
CREATE TABLE employee
(
    name CHARACTER varying(16) NOT NULL,
    age INT,
    education CHARACTER varying(255),
    experience CHARACTER varying(255),
    profile CHARACTER varying(255),
    department CHARACTER varying(255),
    salary INT
);

INSERT INTO employee (name, age, education, experience, profile, department, salary)
VALUES ('Olivia Parker', 24, 'Master of Computer Science', 3, 'Software Developer', 'IT Department', 90000),
       ('Jane Doe', 35, 'Master of Business Administration', 7, 'Project Manager', 'Management', 100000),
       ('Ethan Patel', 28, 'Bachelor of Mechanical Engineering', 2, 'Mechanical Engineer', 'Engineering', 85000),
       ('Sophia Rodriguez', 29, 'Bachelor of International Business', 4, 'Marketing Specialist', 'Marketing', 65000),
       ('David Lee', 40, 'Doctor of Medicine', 12, 'Medical Director', 'Healthcare', 150000);
