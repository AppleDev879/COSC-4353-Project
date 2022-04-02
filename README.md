# COSC-4353-Project

Each team member has done a different part of the project, see top folders.

For the Login-form I used styled components, react icons, and keyframes (styled-components). All backend is included in the server folder. For backend I used Passport for oauth validation, joi for validating manual (regular email and password) signups and logins, made JWT tokens for authenticating users, and Bcrypt for storing hashed passwords, and I'm storing users on MongoDB. Unit tests files not yet created but soon to come.

In this iteration error popups were included for the validation and auth process. User profile info from oauth (Google, Github, etc.) shows up on the homepage nav. Now, users are persistent due to DB implementation and now only new users are allowed to sign up and the DB is checked for correct user info upon login.

--Carlos Molina--
