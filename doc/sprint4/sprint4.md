# Sprint 4 Planning Document

## Sprint 4 Goal:

> “Completing the **total** functionality of the app to ~90%. At this point, every persona (basic user, average user, and power user) meets their basic user needs entirely, and has some relevant amenity features each. Sprint 4's goal is to build on the setup of Sprint 3 for widgets: we aim to add the weather widget and the progress tracking widget. We also plan to add the re-arranging of widgets to the side bar, as a Quality of Life change. Developer work for this sprint includes minor changes to prior features (notifications, points display) so that they can be adapted to recent additions made in Sprint 3 (project *due dates*, a *non-free* widget).” 

Due to having added additional User and Developer stories along the way at each sprint, the project cannot reach 100% completion by end of Sprint 4. There are 5 user stories left over, unfortunately.

## Spikes:
Each user story is adequately assessed for its point estimation, and has been divided into subtasks which have also been assigned points. There are no research blockers to estimating these goals, as we are confident in what they entail.
There are however, a few user stories that require research for implementation - but the broad scope / time estimate is still well-grasped.

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
Our velocity this sprint is 46, the exact same as last sprint. We feel this is a good range as everyone contributes, and it leaves sufficient room for
trouble shooting / emergency situations that tend to arise come merge time. Moreover, PP-16 is a rather large task even if it is scheduled for a 1-sprint completion. We want to leave some margin in case the developers want to request team collaboration and help. Our 3 demo-able features will be PP-15 (task list priority filtering), PP-11 (weather widget), and PP-16 (being able to re-arrange widgets in the side bar). Our remaining 2 user stories are PP-20 (tracking progress of completed tasks) and PP-92 (custom project deletion button). 

## User Stories to be completed:
We have decided on the following user/developer stories:

* PP-11 As Treyvon, an average user, I want to be able to check the weather for the day, so that I know if I will need an umbrella later on.
* PP-15 As Treyvon, an average user, I want to be able to tag tasks with priority levels; this way I can better prioritize my important tasks from my lesser ones. I want to also be able to sort them based off these priority levels.
* PP-16 As Aayan, a power user, I want to be able to rearrange widgets I have achieved so I can put the most important ones to me in a more accessible place.
* PP-20 As Treyvon, an average user, I want a visual indicator of how many projects I’ve completed, so I can remind myself of how far I have come.
* PP-92 As Treyvon, an average user, I want to be able to delete projects manually on my own time, rather than having them auto-delete on completion. This lets me keep track of what I've completed so far recently.
* PP-93 As a developer, I want to refine existing features in the new UI layout: specifically points display and notification popups.

**Reasoning:**

PP-11 and PP-20 are two additional amenities our personas will be able to (and want to) use. PP-15 and PP-92 are both Quality of Life improvements, that allow users to sort tasks by what is most important to them, as well as delete projects as *they* wish, rather than it being done automatically.

PP-16 is the big user story to keep an eye on this Sprint. Although two responsible developers have been assigned to it, it is still a large task - implementing widget re-arranging functionality in a nested component (the side bar) - one that will moreover have additional widgets added to it down the road. Although the task is still completable and there exist some good UI components that do this, it is still a large feature and the team as a whole should keep that mind - in case any additional help is required at any point to deliver on time.

Finally, PP-93 is a new developer story added to address minor changes to previous features. This is due to Projects being given a due date last sprint, and additional *non-free* widgets being added this sprint.

## User/Developer Story Breakdown into Subtasks:
The above user and developer stories have been broken down as follows:

* **\[PP-11\]**
  * \[PP-100\] Research simple weather APIs to embed in websites
  * \[PP-101\] Implement a weather API that is refreshing accurately to show location-relevant data
  * \[PP-102\] Position the weather widget appropriately on front end in dashboard and widget store.
* **\[PP-15\]**
  * \[PP-96\] Implement frontend
    * Description: Sort the tasks by their priority levels in descending order.
* **\[PP-16\]**
  * \[PP-103\] Research how "Beautiful DnD (Drag 'n Drop)" component works.
  * \[PP-104\] Implement the Beautiful DnD in side bar for widgets.
  * \[PP-105\] Ensure apps purchased from widget store appear in the re-done sidebar with drag 'n drop functionality.
* **\[PP-20\]**
  * \[PP-106\] Research live graph-modelling visual displays
  * \[PP-107\] Store in back-end all the completed/deleted projects of a user with title information.
  * \[PP-108\] Create graphic visual using stored projects on front end.
* **\[PP-92\]**
  * \[PP-94\] Implement backend
    * Description: Delete button should remove Projects from user's stored list. Upon login the state should remain consistent.
  * \[PP-95\] Implement frontend
    * Description: Ensure delete button appears per each Project, and let completed projects remain as they appear.
* **\[PP-93\]**
  * \[PP-97\] Use non-free widget to subtract points via backend.
  * \[PP-98\] Make notifications appear in the centre of the new UI layout.
  * \[PP-99\] Make notifications appear via newly added Projects due dates as well
    * Description: This is in addition to prior implementation done using Task due dates only.




