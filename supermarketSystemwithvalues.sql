CREATE DATABASE IF NOT EXISTS supermarketSystem;
USE supermarketSystem;
CREATE TABLE IF NOT EXISTS positions (
	positionID VARCHAR(50),
    privilegeLevel VARCHAR(50),
    positionDescription VARCHAR(100),
    PRIMARY KEY (positionID)
);
show tables;
INSERT INTO positions (positionID , privilegeLevel, positionDescription) values 
("1","1","position 1 is cashier"),
("2","2","position 2 is price co-ordinator"),
("3","3","position 3 is ADMIN"),
("4","4","position 4 is reciever");

CREATE TABLE IF NOT EXISTS employees (
	employeeID VARCHAR(50),
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    DOB VARCHAR(50),
    gender VARCHAR(50),
    email VARCHAR (50),
    employeePhone VARCHAR(100),
    hireDate VARCHAR(50),
    positionID VARCHAR(50),
    pword VARCHAR(100),
    PRIMARY KEY (employeeID),
    FOREIGN KEY (positionID) REFERENCES positions(positionID)
);
INSERT INTO employees (employeeID, firstName, lastName, DOB, gender, email, employeePhone, hireDate, positionID,pword) VALUES
(100, 'Vinaydeep Singh ', 'Singh', '05-26-98',"Male", "vSingh@example.com" , "2031111222","01-01-2019","1","yolo123"),
(101, 'Kevin ', 'Kuna', '06-01-98',"Male", "kKuna@example.com","2031113232","01-01-2019","2","kuna234"),
(102, 'Mir Hamza', 'Nasiri', '05-01-56',"Male", "mNasiri@example.com","2031123445","03-01-2019","3","hamza2121"),
(103, 'Rafael', 'Ramos', '05-01-98',"Male", "rRamos@exmaple.com","9083232456","01-01-2020","4","Ramos213"),
(104, 'Romi', 'Barde', '08-15-90',"Female", "rBarde@example.com","2056831222","01-09-2019","2","Barde190"),
(105, 'Jack', 'Singh', '05-20-98',"Male", "jSingh@example.com","2038754322","01-02-2019","1","yolo12323456");

CREATE TABLE IF NOT EXISTS taxes (
	taxID VARCHAR(50),
    taxRate FLOAT,
    taxDescription VARCHAR(100),
    taxNotes VARCHAR(100),
    PRIMARY KEY (taxID)
);
insert into taxes (taxID,taxRate,taxDescription,taxNotes) values
("1092",7.00,"tobacco tax","??"),
("1100",4.50,"grocery tax","??"),
("1082",6.00,"coffee tax","??"),
("1210",9.00,"essentials tax","??"),
("1105",0.50,"gas tax","??"),
("1200",2.00,"lotto tax","??"),
("1103",10.00,"softdrinks tax","??");

CREATE TABLE IF NOT EXISTS departments (
	deptNum VARCHAR(50),
    deptDescription VARCHAR(100),
    deptNotes VARCHAR(100),
    taxID VARCHAR(50),
    PRIMARY KEY (deptNum),
    FOREIGN KEY (taxID) REFERENCES Taxes(taxID)
);
insert into departments (deptNum,deptDescription,deptNotes,taxID) values 
("250", "Tobacco","tobacco?","1092"),
("251", "groceries","cereals vegetables fruits","1100"),
("252", "SoftDrinks","all the drinks","1103"),
("253", "Gas","diesel gas","1105"),
("254", "Lotto Tickets","connecticut lottery","1200"),
("255", "Essentials","items like tire puncture ,","1210"),
("256", "Coffee","tea and coffee from machine","1082");

CREATE TABLE IF NOT EXISTS items (
	UPC VARCHAR(100),
    deptNum VARCHAR(50),
    price FLOAT,
    itemDescription VARCHAR(100),
    notes VARCHAR(100),
    amount INT,
    PRIMARY KEY (UPC),
    FOREIGN KEY (deptNum) REFERENCES departments (deptNum)
);

insert into items (UPC,deptNUm,price,itemDescription,notes,amount) values 
("600","250",13.27,"Marlboro cigarettes","cigs",120),
("601","250",12.15,"Newport shorts","cigs",180),
("602","250",14.45,"Pall mall","cigs",200),
("603","250",21.45,"JUUL PODS","cigs",100),
("611","251",5.25,"Kelloggs cereal","grocs",10),
("612","251",6.37,"stars and moon","grocs",15),
("613","251",6.81,"gallon premium milk","grocs",25),
("620","252",2.37,"coke","soft drinks",110),
("621","252",3.50,"coke2L","soft drinks",109),
("622","252",2.10,"pepsi","soft drinks",123),
("623","252",2.37,"canada dry","soft drinks",150),
("700","253",3.39,"Gas unleaded","Gas",6000),
("701","253",3.49,"Gas 5% lead","Gas",6000),
("702","253",3.89,"Gas premium","Gas",6000),
("703","253",3.10,"diesel","Gas",5000),
("801","254",2.00,"powerball","connecticut lottery",1000),
("802","254",2.00,"Megamillions","connecticut lottery",1000),
("803","254",2.00,"lotto","connecticut lottery",1000),
("804","254",2.00,"lucky for life","connecticut lottery",1000),
("900","255",6.00,"AA batteries","essentials",100),
("901","255",4.00,"AAA batteries","essentials",50),
("902","255",2.24,"nailcutter","essentials",80),
("903","255",3.35,"pencil box","essentials",50),
("904","255",4.43,"parker pen","essentials",10),
("1000","256",1.00,"small coffee","coffee",100),
("1001","256",1.25,"medium coffee","coffee",100),
("1002","256",1.50,"large coffee","coffee",100),
("1003","256",1.00,"tea","coffee",100);


CREATE TABLE IF NOT EXISTS transactionItems (
	transactionID VARCHAR(50),
	UPC VARCHAR(100),
	amount INT,
	Cost FLOAT,
	Tax FLOAT,
	PRIMARY KEY(transactionID, UPC)
);
insert into transactionitems (transactionID,UPC,amount,cost,tax) values 
("T1","600",2,26.54,1.85),
("T1","620",1,2.37,0.23),
("T2","700",3,10.17,0.05),
("T2","1000",1,1.00,0.06),
("T2","801",1,2.00,0.04),
("T3","603",3,64.35,4.50),
("T4","612",4,24.48,1.08),
("T4","621",1,3.50,0.35),
("T4","901",2,8.00,0.72),
("T4","1001",1,1.25,0.75),
("T5","600",10,26.54,1.85),
("T6","700",10,33.90,0.15);

CREATE TABLE IF NOT EXISTS paymentInfo (
	paymentID INT,
    transactionID VARCHAR(50),
    transactionTotal FLOAT,
    paymentMethod VARCHAR(100),
    PRIMARY KEY (paymentID),
    FOREIGN KEY (transactionID) REFERENCES transactionItems (transactionID)
);
insert into paymentInfo (paymentID,transactionID,transactionTotal,paymentMethod) values
(2345,"T1",30.99,"CASH"),
(2346,"T2",13.32,"Credit"),
(2347,"T3",68.85,"CASH"),
(2348,"T4",39.63,"credit"),
(2349,"T5",28.39,"CASH"),
(2350,"T6",34.05,"Credit");

CREATE TABLE IF NOT EXISTS customers (
	customerID VARCHAR(50),
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    customerPhone VARCHAR(100),
    address VARCHAR(100),
    city VARCHAR(100),
    zipCode VARCHAR(50),
    email VARCHAR(100),
    PRIMARY KEY (customerID)
    );
insert into customers (customerID,firstName,lastName,customerPhone,address,city,zipCode,email) values
("C1","Alfreds"," Futterkiste","2034569870","Obere Str. 57","Berlin","12209","alfredsfutterkiste@hotmail.com"),
("C2","Yang Wang"," su","2031234570","120 Hanover Sq.","california","23459","yangsu@hotmail.com"),
("C3","Martín"," sommer","2037845370","24, place Kléber","madrid","12209","soomermadrid@hotmail.com"),
("C4","Hanari Carnes"," singh","2034902760","2732 Baker Blvd.","vancouver","12209","carnesjatt@hotmail.com"),
("C5","pistoul"," singh","2030939870","8 Johnstown Road","verdansk","12209","finishertime@hotmail.com"),
("C6","poootoo"," rekhi","2087254870","h.no 10 gyani road","mohali","12209","gyanisingh1212@hotmail.com");



CREATE TABLE IF NOT EXISTS customerTransaction (
	customerID VARCHAR(50),
    transactionID VARCHAR(50),
    PRIMARY KEY (customerID, transactionID),
    FOREIGN KEY (customerID) REFERENCES customers (customerID),
    FOREIGN KEY (transactionID) REFERENCES transactionItems (transactionID)
);
insert into customerTransaction( customerID,transactionID) values
("C1","T1"),
("C2","T2"),
("C3","T3"),
("C4","T4"),
("C5","T5"),
("C6","T6");

CREATE TABLE IF NOT EXISTS employeeTransaction (
	employeeID VARCHAR(50),
    transactionID VARCHAR(50),
    PRIMARY KEY (employeeID, transactionID),
    FOREIGN KEY (employeeID) REFERENCES employees (employeeID),
    FOREIGN KEY (transactionID) REFERENCES transactionItems (transactionID)
);
insert into employeeTransaction (employeeID,transactionID) values 
("100","T1"),
("100","T2"),
("100","T3"),
("100","T4"),
("105","T5"),
("105","T6");
show tables;
select * from transactionitems natural join paymentinfo natural join employeetransaction;
select * from transactionitems;

CREATE TABLE IF NOT EXISTS Entity (
    transactionID VARCHAR(50),
    UPC VARCHAR(100),
    PRIMARY KEY (transactionID, UPC),
    FOREIGN KEY (transactionID) REFERENCES transactionItems (transactionID),
    FOREIGN KEY (UPC) REFERENCES items (UPC));
    

    
