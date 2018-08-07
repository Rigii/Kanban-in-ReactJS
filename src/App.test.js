import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
/*
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

class button extends React.component{
    render(){
        return <span id="button">CREATE TASK</span>
    }
}
*/
class RenderTable extends React.component{
    render(){
        return(
            <span id="button">CREATE TASK</span>
            <table class="table">
              <tr>
                <th class='stage head'>TO DO</th>
                <th class='stage head'>IN PROCESS</th>
                <th class='stage head'>DONE</th>
                <th class='stage head'>CANCELED</th>
              </tr>
              <tr class="bodyTable">
                <td id='initial' class='stage forSort'></td>
                <td id='in_progress' class='stage forSort'></td>
                <td id='done' class='stage forSort'></td>
                <td id='aborted' class='stage forSort'></td>
              </tr>
            </table>
        )
    }
}
ReactDOM.render(
  <RenderTable />,document.getElementById('kanban'));

class ModalWind extends React.component{
    constructor(props){
        super(props);
        this.state = {isToggleOn: true};
    }
   
    render(){
         let headTask = props.headTask === undefined ? '' : props.headTask;
    let textTask = props.textTask === undefined ? '' : props.textTask;
      if (props.onlyPriority == false) {
            return(
                <div class = "galWind">
                <div class = "modContent">
                  <h3>Enter a title for the task </h3><br/>
                  <input id="taskName" type="text" style="width:20vw" value={headTask}/> <br/>
                    <h3>Task description</h3><br/>
                    <textarea id="taskContent" rows="10" style="width:30vw" name="text">{textTask}</textarea><br/>
                    <input class="radio" id="333" type="radio" name="priority" value="red"/>First priority<br/>
                      <input class="radio" id="332" type="radio" name="priority" value="yellow" checked/>Medium priority<br/>
                        <input class="radio" id="331" type="radio" name="priority" value="blue"/>Low priority<br/>
                          <button id="createBut" style="display: {props.create}; float: left">Create task</button>
                          <button id="redBut" style="display:{props.redact}; float: left">Redact</button>
                          <button class="closeRed" style="float: right">Close</button>
                </div>
                </div>
        )
        } else {
            return(
            <input class="radio" id="333" type="radio" name="priority" value="red"/>High priority<br/>
            <input class="radio" id="332" type="radio" name="priority" value="yellow" checked/>Medium priority<br/>
            <input class="radio" id="331" type="radio" name="priority" value="blue"/>Low priority<br/>
            <button id="redBut" style="display:{props.redact}; float: left">Redact</button>
            <button class="closeRed" style="float: right">Close</button>
            )
        }
        }
        }


class TaskBody extends React.component{
            constructor(props){
        super(props);
    }
    render(){
            let taskName = props.taskName.value;// значение заголовка 
            let taskContent = props.taskContent.value;// значение контента
            let date = moment().format('MMMM Do YYYY, h:mm:ss a');
            let timeIndex = moment().format('DDMMYYYYHmmss');
            let radioVal = props.radio.value;//
            let radioId = props.radio.id;//
             let newTask = 
            <div id="{timeIndex}" class="radioId" style="backgroundColor:{radioVal}">
            <div class="taskWindReady"><div class="{tskName}"><h4>{taskName}</h4></div><p>{taskContent}</p>
                <p>{date}</p>
                <img class="delTask" src="img/ico/del.png" alt="del" style="display: none; cursor: pointer"/>
                <img class="cancel" src="img/ico/cancel.png" alt="cancel" style="cursor: pointer"/>
                <img class="redact" src="img/ico/redact.png" alt="redact" style="cursor: pointer"/>
                <img class="pushRight" height="27" style="float:right; cursor: pointer" src="img/ico/right.png" alt="pushRight"/>
            </div>
            </div>

    return(<newTask/> 
           {localStorage.setItem('initial'+timeIndex, JSON.stringify(newTask.outerHTML)); //при событии будет вставлятся в отд. компоненте
          initial.appendChild(<newTask/>);// будет вставлятся при вызове
      }
            )
        }
    }
    
class RedactTaskBody extends React.component{
            let taskName = document.getElementById('taskName');
            let taskContent = document.getElementById('taskContent');
            let date = moment().format('MMMM Do YYYY, h:mm:ss a');
            let radio = document.getElementsByClassName('radio');
            let taskId = props.taskId;
            let target = document.getElementById(taskId);

            render(){
            if (props.onlyPriority == true) {
            return(
            for (i in radio) {
            if (radio[i].checked) {
            target.style.background = radio[i].value;
            target.className = radio[i].id;
        }
        }
            )
        } else {
            return(
            <div class="taskWindReady"><div class="tskName"><h4>{taskName.value}</h4></div><p>{taskContent.value}</p>
            <p>{date}</p>
            <img class="delTask" src="img/ico/del.png" alt="del" style="display: none; cursor: pointer">
            <img class="cancel" src="img/ico/cancel.png" alt="cancel" style="cursor: pointer">
            <img class="redact" src="img/ico/redact.png" alt="redact" style="cursor: pointer">
            <img class="pushRight" height="27" style="float:right; cursor: pointer" src="img/ico/right.png" alt="pushRight"></div>
            {for (i in radio) {
                if (radio[i].checked) {
                target.style.background = radio[i].value;
                target.className = radio[i].id;
            }
            }
                )
            }
            }
            }