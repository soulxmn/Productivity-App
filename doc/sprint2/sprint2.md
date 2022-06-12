# Sprint 2 Planning Document

## Sprint 2 Goal:

> “Completing the core functionality of the app to ~60% at least, so each of our personas (basic user, average user, and power user) can effectively serve their individual needs. This includes task scheduling, notification updates, front end work to fix layout and aesthetic, and backend work regarding redux and typescript to keep things organized. The personal goal for each developer on the team this sprint is becoming intimately familiar with github workflow, peer reviewing, and code optimization in a group project setting.” 

We feel that this is an adequate objective to achieve within the two weeks given. To provide an overall outlook, the remaining 40% core functionality would be done by Sprint 3, in addition to a few amenity features peppered along the way from Sprints 1 and 2. Finally, Sprint 4 would be completing the final few luxury features and ensuring everything works prior to demonstration day.

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
Based on the user stories we have assigned to this sprint, and our estimation of each story's points we have estimated our velocity to now be 76, up from 45 last sprint. A portion of the time spent last sprint was used on non-coding related objectives (such as technology setups, documentation, and required sprint files). This sprint, we are able to concentrate on the coding alone, which is why the velocity appears increased despite the time/effort required moreorless staying the same. Additionally, we also have 3 user stories this sprint that are weighted at 13 points each.

## User Stories to be completed:
We have decided on the following user stories:

* PP-5 As Lisa, a basic user, I want to be able to schedule tasks in advance so that I can plan future events/to-do's up to a year ahead.
* PP-6 As Lisa, a basic user, I want to be able to resechedule tasks so that if I don't complete them on time, I can include them in my next plan.
* PP-18 As Aayan, a power user, I want a built-in pomodoro timer to help me work, as this way I can schedule a cycle of controlled breaks amongst my productivity bursts to prevent burnout and better hold my focus.
* PP-13 As Aayan, a power user, I want to be able to add a music player widget to the planner so I can quickly turn on music to help me focus.
* PP-14 As Lisa, a basic user, I want to be notified of important tasks coming up, so I don't miss them and can plan in advance.
* PP-45 As Lisa, a basic user, I want to intuitively understand the main dashboard layout, have easy access to my notes/projects, and see the widgets I care about right away.
* PP-21 As Aayan, a power user, I should be able to turn on a do not disturb mode, to help tune out distractions while I work.

**Reasoning:**

PP-5 and PP-6 are core functions that are essential for this app being used as a planning tool. They are at the top priority. PP-18, PP-14, and PP-21 all ensure that the user will be able to work productively while using the app in their day-to-day. This is required for personal success, and will also later pave the way towards user history and analysis, since the user will be able to complete work effectively once these stories are completed. Finally, PP-45 is vital for easier testing purposes, and solving layout issues now will help integrate new features later on much faster.

**Additional User Stories:**

The following are more developer stories, but still tasks that have been created and assigned on Jira and reflected in the updated PB.md. Their goal is to aid the team in coding the project.

* PP-44 As a developer, I want redux configured to store information in a global state.
* PP-46 As a developer, I want to create typescript data models to keep the codebase organized and types enforced.

## User Story Breakdown into Subtasks:
The above user stories have been broken down as follows:

* PP-5
  * \[PP-60\] Make Task due date optional.
  * \[PP-61\] Add support for datetime filters on Task API endpoints.
  * \[PP-62\] Cleanup/redesign React TaskList specifically the date picker.
* PP-6
  * \[PP-63\] Create the front-end component for rescheduling.     
  * \[PP-64\] Implement the back-end.
* PP-21 
  * \[PP-40\] Implement the Do Not Disturb backend.
* PP-45
  * \[PP-47\] Add tabs to the left side of the screen.
  * \[PP-48\] Add the widgets column to the right side of the screen. Place widgets here.
  * \[PP-49\] Add a notes page with the notes bar.
  * \[PP-50\] Create template pages for analytics, settings, and widget store.
  * \[PP-51\] Layout the main dashboard of the app.
* PP-18 
  * \[PP-66\] Create the front-end interactive pomodoro timer.
  * \[PP-65\] Implement the back-end of the component.
  * \[PP-55\] Styling the component.
  * \[PP-67\] Points allocation.
* PP-13
  * \[PP-56\] Research on how to create/start the component.
  * \[PP-58\] Implementing the audio player.
  * \[PP-59\] Testing the component for full functionality.
* PP-14
  * \[PP-52\] Setting the User Node attribute for storing a list of dates.
  * \[PP-53\] Creating the front-end pop-up notification.
  * \[PP-54\] Merging notifications with Do Not Disturb feature, so user can control when they are thrown.
