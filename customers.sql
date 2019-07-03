CREATE TABLE IF NOT EXISTS `customer`(
   `ID` VARCHAR(36) NOT NULL,
   `USERSTATUS` VARCHAR(20) default 'Current' ,
   `USERNAME` VARCHAR(100) ,
   `GENDER` VARCHAR(2),
   `AGE` int(1),   
   `PHONENUMBER` VARCHAR(40), 
   `CREATEDATE` DATETIME,
   PRIMARY KEY ( `ID` ),
   INDEX (`USERNAME`)
);


CREATE TABLE IF NOT EXISTS `customernote`(
   `ID` INT UNSIGNED AUTO_INCREMENT,
   `USERID` VARCHAR(36) NOT NULL,
   `NOTE` VARCHAR(100) NOT NULL,
   PRIMARY KEY ( `ID` ),
   FOREIGN KEY (`USERID`) REFERENCES customer (`ID`)
);


INSERT INTO Customer(ID,USERNAME,GENDER,AGE,PHONENUMBER,CREATEDATE) values('1ed5256e-a35a-4b27-b6cb-a60c57655f2e','Frank','M','20','0284292388','2019-02-20 15:13:29.762');
INSERT INTO Customer(ID,USERNAME,GENDER,AGE,PHONENUMBER,CREATEDATE) values('1ed5357e-a35a-3c29-b6cb-a60c57655f2e','Van','M','18','13910935505','2019-05-20 03:13:29.762');
INSERT INTO Customer(ID,USERNAME,GENDER,AGE,PHONENUMBER,CREATEDATE) values('1ed5458e-a35a-4d28-b6cb-a60c57655f2e','Hongzhong','M','42','13511054770','2018-03-20 17:13:29.762');
INSERT INTO Customer(ID,USERNAME,GENDER,AGE,PHONENUMBER,CREATEDATE) values('1ed5559e-a35a-6e26-b6cb-a60c57655f2e','Caohui','M','60','0274292335','2017-10-20 10:13:20.762');
INSERT INTO Customer(ID,USERNAME,GENDER,AGE,PHONENUMBER,CREATEDATE) values('1ed5655e-a35a-4f25-b6cb-a60c57655f2e','Chris','F','12','0214282007','2016-06-20 07:45:29.762');


INSERT INTO customernote(USERID,NOTE) values('1ed5256e-a35a-4b27-b6cb-a60c57655f2e','handsome boy');
INSERT INTO customernote(USERID,NOTE) values('1ed5357e-a35a-3c29-b6cb-a60c57655f2e','peaceful');
INSERT INTO customernote(USERID,NOTE) values('1ed5458e-a35a-4d28-b6cb-a60c57655f2e','lovely');
INSERT INTO customernote(USERID,NOTE) values('1ed5655e-a35a-4f25-b6cb-a60c57655f2e','cute');
