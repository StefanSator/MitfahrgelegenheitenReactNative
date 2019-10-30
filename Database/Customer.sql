USE Mitfahrgelegenheiten;

Create Table Customer (
	customerId	INT	AUTO_INCREMENT PRIMARY KEY,
    username	VARCHAR(40) NOT NULL,
    password	VARCHAR(40) NOT NULL,
    email		VARCHAR(40) NOT NULL,
    created_at	TIMESTAMP	DEFAULT CURRENT_TIMESTAMP
);

Drop Procedure if exists insertCustomers;
DELIMITER //  
CREATE PROCEDURE insertCustomers()   
BEGIN
DECLARE i INT DEFAULT 0; 
WHILE (i <= 50) DO
    INSERT INTO `Customer` (username, password, email)
    VALUES ("Mustermann", "password", "max.mustermann@mail.de");
    SET i = i+1;
END WHILE;
END;
//
CALL insertCustomers(); 