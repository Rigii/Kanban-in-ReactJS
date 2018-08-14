# Kanban

Kanban is a SPA for the organization of current tasks. 
Its appearance is four columns and a button "create a task."
When you click on it, a window appears in which you should enter the name and essence of the task.
Also, you can choose the priority of the job displayed in color.
After pressing the button, a task appears in the "TO DO" column.
All tasks in the columns are sorted by priority and creation time.
At different stages of the task execution, you should move it using the dialog button.
The essence of the task can be edited only in the column "TO DO". In the column "IN PROGRESS" it is possible to change the priority.
The task can be canceled by pressing the "Cancel" button in this case it will appear in the "CANCELED" column.
In the columns "DONE" and "CANCELED", the task can be deleted.

### Run the version not for production
-Download the whole project <br/>
-Open the command line in the root and run<br/>
```npm start```<br/>

### Launch the production version
- Download the "build" folder.<br/>
- Run the application from the local server<br/>
For this:<br/>
- install http server<br/>
 ```npm install http-server -g```<br/>
- run the command line in this directory and type<br/>
```http-server```<br/>
- Now you can open the application at<br/>
```http: // localhost: 8080```<br/>