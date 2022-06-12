# Sprint 1 Planning Document

## Sprint Goal:
Our goal for this sprint is the following: 

> “To get functional authentication (login in and registration for users). A functional dashboard for the user. Developers should learn the tools and become more comfortable with the software being used to build the project.”

This means at the end of this sprint a user should be able to login and registrar to our app/chrome extension. When logged in the user should have a basic/dashboard for the app allowing them to have some basic functionality including creating a task, jotting down a quick note, and some other smaller features. Our developers (us) should also become more familiar and comfortable with the coding environment/process.

## Spikes:
We don’t plan on having any spikes this sprint as we are just planning to build basic user functionality and there is nothing we are looking to explore feature wise.

## Participants:
Everyone on the team has participated in the planning, and everyone will be participating in the development process this sprint. 
Formally the members names are
- Suleiman Mirza
- Nilabh Anand
- Zhaoyu Guo
- Vishnu Manoj
- Asad Durrani
- Aidan Britnell
- Jackson Joseph Hoogenboom


## Teams Capacity/Velocity:
Based on the user stories we have assigned to this sprint, and our estimation of each story's points we have estimated our velocity to be 45, we believe this is our team's capacity of anywhere from 40-50 points a sprint. Each team member will on average be handling about 6-8 points, with our largest story estimated at 13 points being split between two developers. 




## User Stories to be completed:
We have decided to the following user stories:

- PP-1 As Lisa, a basic user, I want to be able to register for an account, this way I can have my work saved to my profile.

- PP-2 As Lisa, a basic user, I want to be able to login to my account, this way I can keep my tasks private.

- PP-3 As Lisa, a basic user, I want to be able to add tasks to my to-do list, so that I can keep track of what needs to be done.

- PP-8 As Aayan, a power user, I want to be able to quickly note some things down so I can easily record important information for later use.

- PP-21 As Aayan, a power user, I should be able to turn on a do not disturb mode, to help tune out distractions while I work.

We choose the following user stories as stories PP1-3 are of our highest priority in terms of app functionality/user requirements. We choose PP-8 as the other high priority stories are blocked by PP-3, thus it can not be completed or worked on properly until it is complete. Lastly we chose PP-21 as we felt it the next highest priority task that wasn’t blocked and was small enough to be a good starting task since at this point we did not want to overwhelm ourselves as we are still learning the technologies.

## User Story Breakdown into Subtasks:
The above user stories have been broken down as follows:
 
- PP-1
    - Implement auth0 to our backend
    - Create registration screen in the frontend
    - Add a logout button to the user dashboard
- PP-2 
    - Create backend Login authentication endpoint
    - Create front end login page for the app
- PP-3
    - Backend API endpoints for adding tasks to the database
    - Implement front-end components for PP3, including sending requests
- PP-8 
    - Database schema creation for notes
    - Research about adding rich text functionality
    - Setup draftjs to replace traditional editing fields
    - Sending/Receiving Data from the Database to the form
    - Add API’s for necessary routes
    - Fronted note design/link API’s
    - Add new route for editing the note for the frontend
- PP-21 
    - Use Material UI to create/import a visual component for the pop-up notification box that fades away after a moment. Must have the message “Do Not Disturb mode enabled.”
        - Create a mirror pop-up for the opposite disabled message.
    - Create a visual button to click for enabling “Do Not Disturb”.
    - Create a function in the Controller backend that activates upon click of the button (called by the Model), and sends the appropriate UI component box to the View.
    - Conduct online research on how DND is implemented in an MVC environment.
    - Implement the Controller backend. Whenever the function executes, it must alert all the other notification functions to not update the View until further notice.
        - Subsequently, re-notify them they can update again once DND is turned off.  
        - Implement this function communication with a timer (maybe wait()?).
            - Clock UI for manual input.

