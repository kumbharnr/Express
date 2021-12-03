# Express

Assignment on Express - Sequelize
(5) Define the table named Insurance and have the fields (a) PolicyNumber (Primary Key) (b)Policy Holders Name (c)Policy Amt (d) Maturity Amount (e) Nominee
 Define the following functions in express and data has to be fetched from DB using Sequelize.
    (a)get - getAllPolicies - Retrieves all the policies in the table.
    (b)get - getPolicyById  - Retrieves the record based on the given policy id.
    (c)post - newRecord  - Inserts the data in the Insurance table.
    (d) put - updatePolicy - Updates the policy record based on policy number.
    (f) delete - deletePolicy - Deletes the policy record based on policyNumber.
    (g) post - login - Checks whether the given user and password is valid or not by fetching records from USER table.  User table will have UserID, Password and Role as the fields.  Role will be either User or Admin.
   (h) post - Register - Given data should be inserted into the USER Table.      

(I)  All the functions should be tested from postman.  
(II) After user regisgters, check with login with the same data as given in reigster.
(III)  Every function should return the status code along with the data.  Status code should be verified in postman.
         Status code 200 for if everything is fine.  
         Stutus code 400 0f things are not fine.  
         Status code 401 if unauthenticated if login fails.
        Status code 201 fo the POST / PUT for insert and update transactions are perfomed successfully.

If you want to send the status from the server, you can use it this way
   res.status(200).send (data); --> This will send the status 200 (Everything is fine) 

(IV) If possible, Create a folder named Model and Place two js files in this.  (a) Policy.js (b) Credentials.js.  
Policy.js will have all the db related functions for policy.  Credetials.js will have login and registration functions.
Export these modules and import them in the Express code and use it.  All the routing code should be in Express code which makes use of these modules accordingly.







