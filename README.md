# COSC-4353-Project

Each team member has done a different part of the project.

Andrew Barret - Fuel Quote Forms + Pricing Module and backend integration.

Lizandro Mesa - Profile Management + backend integration.

Carlos Molina - Login, Sign Up, Oauth login, authentication/validation, and overall css and design.

For the Login-form I used styled components, react icons, and keyframes (styled-components). All backend is included in the server folder. For backend I used Passport for oauth validation, joi for validating manual (regular email and password) signups and logins, made JWT tokens for authenticating users, and Bcrypt for storing hashed passwords, and I'm storing users on MySQL. 

Error popups were included for the validation and auth process. User profile from oauth (Google, Github, etc.) is mainly a beta feature with no DB implementation it is just for demo purposes. However, users are persistent due to DB implementation and now only new users are allowed to sign up and the DB is checked for correct user info upon login.

Unit tests have now been implemented in the front-end side with simple checks on the singular components. Mostly, just to see if the components render properly and certain user states are working correctly in the App.jsx file. However, the meat of the integration testing is done in cyrpess and their client. There, I do end-to-end tests making sure all aspects of the login and sign up process are working and that the error states are being handled properly.

**Side Note: I included my .env file as env.txt in the Server folder. Just make sure to change the filename back to .env so my app can run with all the ENV variables I set for the backend.**

--Carlos Molina--
