---
title: Xu's Example
date: 2019-06-24
tags: React,Redux,Saga,Bootstrap,Reselect,Springboot,Mybatis,Swagger,Mysql
---
## Back-end program description in CustomerServer Project(Eclipse):
### 1. SpringBoot + Mybatis + Mysql
### 2.Program structure introduction in .\CustomerServer\src folder:
>* 1. Entities: Customer,CustomerNote
>* 2. Persistent layer interface: CustomerMapper, CustomerNoteMapper
>* 3. Service Interface: CustomerService, CustomerNoteService 
>* 4. Implement of Service Interface: CustomerServiceImpl, CustomerNoteServiceImpl
>* 5. Controller
>* 6. Unit tests that contain all the APIs

### 3.Restful APIs
>you can get API information using the following address:  http://localhost:8080/swagger-ui.html

![image](https://github.com/microxu/CustomersManagement/blob/master/images/swagger.jpg)

#### APIs for external systems:
>* 1. Add a Customer: POST  /customer
>* 2. Delete a Customer: DELETE  /customer/{id}
>* 3. Update a Customer: PUT  /customer
>* 4. Query a Customer: Get  /customer/{id}
>* 5. Query All Customers: GET  /customer
>* 6. Query A Page of Customers: GET  /customer/{currPage}/{pageSize}

----------

## About DB
>The name of test DB is TEC-TEST,and the test tables are customer and customernote. The table builder script is "customers.sql" which contains some initial data for the test.

----------
## Front-end program description in CustomerClient Project(VS Code in TypeScript):
### 1. React + Redux + Saga + Bootstrap
### 2.Program structure introduction in .\CustomerClient\src folder:
>* 1. components: CustomerList,CustomerRow ,NoteEditor and FilterComponent
>* 2. Actions: commands for saga. Customer , sorting and filters for reducers 
>* 3. Reducers: customers reducer , notes reducer, sorting reducer and filter reducer
>* 3. Store: Customers, Notes, Sorting and Filter information
>* 4. sagas: customersSaga read and update customer data, and notesSaga read,insert,update customer's note data
>* 5. selectors: customers ,current customer's notes cache, as well as sorting and filter customers data.
>* 6. api: Model contains entity interface of customer and note. Web-api contains async functions to access Restful Apis. 
>* 7. Stub-api is for tests. You can run this programe without deploying backend project by changing the value of apiClient to stubClient in api\index.ts,
>* 8. \_\_tests\_\_: including  some unit tests.

### 3.Below are two screenshots of the UI for modifying customer status, notes and viewing details, including sorting and filter

![image](https://github.com/microxu/CustomersManagement/blob/master/images/viewandnotes.jpg)
![image](https://github.com/microxu/CustomersManagement/blob/master/images/filterandsort.jpg)

----------
