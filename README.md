# costco-app
 
## Links
* Repository: https://github.com/masonmarinko/costco-app

## Technologies Used
* React
* Express
* Node.js
* Javascript
* Typescript
* CSS
* HTML
* Axios
* Mongoose
* MongoDB


## Description

* costco-app was created to fill a need at my current job (Major Sales Assistant at Costco Wholesale). I saw 2 problems that I believed I could solve. First, when items are returned at Membership they go to a lock up cage that is only supposed to be accessed by Supervisors or Managers. In order to easier communicate last items I added the ability to add and remove items. It also shows the item number, item description, and price. This allows people who can go in the "MPU Cage" can list items that the Sales floor can refer to. The second issue was communication, I felt there was a better way. So I created a comment system. This system not only allows a user to post a "comment" but it also allows them to specify if it's a task or a memo. A task allows other users to click "complete" while a memo allows the user to select "read". The reason I added a person's name is to not only give the employee credit for completing tasks if they are interested in moving up. It also gives the supervisor the ability to see who's doing work and if they are getting the job done right. When removing a task the supervisor will be prompted with an alert (will be a modal) that says "Have you verified (employee name) has completed this task" further giving the employee credit and allowing the person who posted the task a reminder to check if its been completed. Also, if a task has been completed by 1 user it cannot be clicked on by another. A memo allows users to select "read", each and every employee that clicks read will have their name added, memo's can take on multiple names. This is useful in passing along information to employees and having a record or who says they read the memo. This will help managers and supervisors know who has acknowledged reading the memo in case something comes about in the future (one future feature is storing memo's for records as well as recalling rather than the person who posted removing it). In issues you'll see more ideas for the app, while it isn't styled right now I do plan on making a dashboard that looks different for Supervisors/Managers and non-supervisor hourly employees. This will allow for a cleaner and more efficient look.


## Website Look/Layout

- As mentioned before styling is to come, in the meantime i'm working on the architecture of the site. In the future I'm hoping to have a dashboard that would make the app more efficient from the user side.


### Home Screen

- Very simple home page, you can either post items or comments. When posting a comment you will select either a memo or task. Tasks are meant to be things that can be completed while memos are not things that can be completed but more passing information to employees and getting their acknowledgment that they've seen the message.

Home Screen: ![image](./assets/images/home_page_nothing.png)


### Item Posted

- In the meantime an item can be added and removed with the following information Item Number, Item Name, Item Price, Item Quantity. The users name will automatically posted if they're logged in. If a user is not logged in and tries to post they will be met with an error. I have multiple updates planned for items and posting. Adding/Removing quantity in case there is more than 1, the ability to open a drop down which someone could further specify things such a last one, display only, or other information the sales floor might like the member/customer to know.

Item Posted: ![image](./assets/images/home_page_item_posted.png)

Not Logged In Alert: ![image](./assets/images/posting_not_loggedin.png)


### Comment Posted (Task or Memo)

- Also for now this is for anyone to post a task or a memo for other employees to read or complete. A user that is not logged in will not be able to post a comment or select completed or read on a comment if they're not logged in.

Comment Posted (Memo and Task to show different buttons): ![image](./assets/images/home_page_comment_posted.png)


- There are also different views. The person posting the comment will only see remove buttons where the people reading the posts will see read for memos or completed for tasks.

Task vs Memo Person Posting View: ![image](./assets/images/task_vs_memo_poster_view.png)

Task vs Memo Person Reading View: ![image](./assets/images/task_vs_memo_reader_view.png)


### Errors If User Removes Task or Memo Before Someone Has Selected Read or Completed

- For now i'm using alerts to pass along errors or messages. These will be modals once the project is live. The alerts here are prompted by a user removing a task or memo before anyone has read or completed them. For now, the same message on memos is used for removing a memo with or without people having "read" it.

Alert for Removing Memo Before Anyone Selected Read: ![image](./assets/images/alert_remove_memo_before_selected.png)

Alert for Removing Memo Before Anyone Selected Completed: ![image](./assets/images/alert_remove_task_before_selected.png)


### Alerts If User Selects Completed After Someone Has Already Completed

- First screenshot is an alert letting the employee know someone has already selected complete. The second is alerting an employee that they have already selected "read" on the memo.

Alert That A User Has Already Completed Task: ![image](./assets/images/trying_to_complete_task_already_completed.png)

Alert That User Has Already Selected Read: ![image](./assets/images/already_read_memo.png)


### What Page Looks Like With Completed And Read Selected

- This is how the comments look with users attached as either completed or read.

Tasks and Memos Marked as "read" and "completed": ![image](./assets/images/marked_as_read_completed_reader_view.png.png)


### User Who Posted Removing Items Alerts

- When a user removes their own memo or task they will be met with different alerts. As mentioned before if the post has no one on it an alert will ask if they are sure they want to remove a comment that no one has completed. However, when removing one with users attached they will be met by 1 of 2 alerts. If a task is removed the alert will state "have you verified (users name) has completed the task" if a memo is removed it asks "have you verified that all users have read the memo". Again, for now, the same message on memos is used for removing a memo with or without people having "read" it.

Alert Removing Memo With Users Attached: ![image](./assets/images/alert_remove_memo_before_selected.png)

Alert Removing Task with User Attached: ![image](./assets/images/remove_task_poster_view_completed.png)


## Creators
- Mason Marinko (email: mason.p.marinko@gmail.com)
