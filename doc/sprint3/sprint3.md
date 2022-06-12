# Sprint 3 Planning Document

## Sprint 3 Goal:

> “Completing the **total** functionality of the app to ~70% at least, so each of our personas (basic user, average user, and power user) can have more options to serve/customize with. This includes "Project" heading for grouping tasks under, and implementing the points system for each component as well as the corresponding widget store to spend them. Developer work for this sprint is to clean up and optimize existing code. The personal goal for each developer on the team this sprint is feeling fully confident in the application of the software architecture, and the MVC pattern for an "simultaneously-developing" project.” 

Our personas should have their needs fully met after the completion of Sprint 2. Now, we are beginning to focus more heavily on the amenities our app provides. This Sprint we also have a large focus (18-points worth) on developer stories to help solidify the groundwork of the project and make future coding more seamless. After this sprint, approximately 30% of the actual demo-able user stories will be left over to be completed (in part) in Sprint 4.

## Spikes:
Each user story is adequately assessed for its point estimation, and has been divided into subtasks which have also been assigned points. There are no research blockers to estimating these goals, as we are confident in what they entail.

## Participants:
* Suleiman Mirza
* Nilabh Anand
* Zhaoyu Guo
* Vishnu Manoj
* Asad Durrani
* Aidan Britnell
* Jackson Joseph Hoogenboom

Everyone on the team has participated in the planning, and everyone will be participating in the development process this sprint.

## Teams Capacity/Velocity:
Based on the user stories we have assigned to this sprint, and our estimation of each story's points we have estimated our velocity to now be 46, down from 76 last sprint and closer to the 45 from the sprint before that. We realized an excessive workload can result in unfinished tasks, so it is better to shoot for a more reasonable expectation. As such we have chosen 3 fully demo-able user stories this sprint, and 2 developer stories (for a total of 5 reasonably-scoped tasks). Instead of three stories weighted at 13-points each like last time, we now have only 2. 

## User Stories to be completed:
We have decided on the following user/developer stories:

* PP-4 As Lisa, a basic user, I want to group large tasks into projects, with multiple smaller tasks in it, this way I can better organize the tasks are all related to a similar project.
* PP-9 As Treyvon, an average user, I want to be able to accumulate points for completing tasks so I can use them to buy cool widgets/add ons to my productivity planner.
* PP-10 As Treyvon, an average user, I want to be able to spend my accumulated productivity points on different add ons or features in a feature store, so I can customize my planner and stay motivated to complete more task.
* PP-68 As a developer, I want to generally clean up, re-organize, and optimize the project code.
* PP-69 As a developer, I want to associate Tasks and Notes to a User by their email address, and reflect this authorization in Notifications as well.

**Reasoning:**

PP-4 marks the final "core functionality" user story of the app. Once tasks are able to be filed under custom "Project" tasks, all the needs of our personas will have been met, particularly for organization/productivity purposes. PP-9 and PP-10 mark the start of the amenities sprints (Sprints 3 and 4) as we dive into developing luxury features such as custom backgrounds, weather, or ambient sounds (potential Sprint 4 user stories). PP-9 and PP-10 are best to complete together, as it means the backend logic will be fully setup by the end of Sprint 3 for collecting and spending points.

Finally, PP-68 is for streamlining existing code - helping bring differing component implementations under one style for easier communication between them (as well as cleaning up/fixing minor issues with other user stories). PP-69 in a similar manner is of the utmost important - it allows user authentication from the backend so components can finally pull user-custom settings instead of resetting upon login.

## User Story Breakdown into Subtasks:
The above user and developer stories have been broken down as follows:

* **\[PP-4\]**
  * \[PP-73\] Design/build the front end card component, with title, and progress bar
  * \[PP-74\] Design/build the modal where you can view more details about project and see subtasks
  * \[PP-75\] Add editing/update functionality to the modal to allow for adding subtasks changing the project name
  * \[PP-76\] Add button to create new projects
  * \[PP-77\] Add backend functionality so all the users work gets saved.
* **\[PP-9\]**
  * \[PP-71\] Implement back-end    
  * \[PP-72\] Display a user's points in the History/Analysis page.
* **\[PP-10\]**
  * \[PP-84\] Front-end store page layout with multiple widgets
  * \[PP-85\] Back-end points adjustment
    * Description: Adjust a user's points when they buy a widget from the widget store page.
  * \[PP-86\] Reflect widget purchases in the UX (make them actually usable)
    * Description: Once a widget has been bought, display it in its appropriate place.  
* **\[PP-68\]**
  * \[PP-78\] Styling the Task Scheduler Calendar
    * Description: Make it easier to read and select from for the user, it is a little condensed at the moment.
  * \[PP-79\] Human-readable date format
    * Description: Make the date easier to read in conventional terms (dd/mm/yyyy for example, over UTC seconds inclusion).
  * \[PP-80\] Pomodoro Timer slider labels
    * Description: Update timer with labels added to the sliders.
  * \[PP-81\] Task deletion backend
    * Description: Implement full support for task deletion from user's backend data, instead of just front-facing changes.
  * \[PP-87\] Refactor the minor/extensive components' styling into inline/css files styling respectively.
  * \[PP-88\] Refactor the class components into functional components.
    * Description: This will bring all the components into one similarly-styled/interactive implementation, making communication between them better (and easier to understand).
* **\[PP-69\]**
  * \[PP-89\] Associate Tasks with email address
  * \[PP-90\] Associate Notes with email address
  * \[PP-91\] Implement Tasks authorization in Notifications
