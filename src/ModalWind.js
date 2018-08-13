import React from 'react';
import moment from 'moment'

class ModalWind extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      text: '',
      priority: 'yellow',
      index:''
    };
    this.hideDisplay=this.hideDisplay.bind(this);
    this.setValue=this.setValue.bind(this);
    this.createTask= this.createTask.bind(this);
    this.redactTask=this.redactTask.bind(this);
    this.setNameText=this.setNameText.bind(this);
  }

  hideDisplay(){
    this.setState({name:'', text:''})
    this.props.hideDisplay({
      display:'none'
    })
  }

  setValue(e){
    let name= e.target.name;
    if (name==="priority"){
      this.setState({
        index: e.target.id,
        priority: e.target.value
      })
    }else{
      this.setState({
        [name]: e.target.value
      })}
    }

    createTask(){
      let date= moment().format('MMMM Do YYYY, h:mm:ss a')
      let name= this.state.name;
      let text= this.state.text;
      let priority=this.state.priority;
      let index= this.state.index+moment().format('DDMMYYYYHmmss');
      this.props.taskAdd({name, text, priority, index, date})
      this.hideDisplay()
    }

    redactTask(props){
      let name= this.state.name;
      let text= this.state.text;
      let priority=this.state.priority;
      let index=this.state.index
      this.props.taskRedact({name, text, priority, index})
      this.hideDisplay()
    }

    setNameText(props){
      this.setState({name:props.name, text:props.text})
    }

     componentWillReceiveProps(props){
   this.setNameText({name: props.name, text: props.text})   
    }

  render(){
    if (this.props.onlyPriority === false) {
      return(
        <div className = "galWind" style={{display:this.props.display}}>
        <div className = "modContent">
        <h3>Enter a title for the task </h3><br/>
        <input id="taskName" type="text" name="name" style={{width:'20vw'}} value={this.state.name} onChange={this.setValue}/> <br/>
        <h3>Task description</h3><br/>
        <textarea id="taskContent" rows="10" style={{width:'30vw'}} name="text" value={this.state.text} onChange={this.setValue}/><br/>
        <input className="radio" id="331" type="radio" name="priority" value="red" onClick={this.setValue}/>First priority<br/>
        <input className="radio" id="332" type="radio" name="priority" value="yellow" onClick={this.setValue}/>Medium priority<br/>
        <input className="radio" id="333" type="radio" name="priority" value="blue" onClick={this.setValue}/>Low priority<br/>
        <button id="createBut" style={{display: this.props.create, float: 'left'}} onClick={this.createTask}>Create task</button>
        <button id="redBut" style={{display:this.props.redact, float: 'left'}} onClick={this.redactTask}>Redact</button>
        <button className="closeRed" style={{float: 'right'}} onClick={this.hideDisplay}>Close</button>
        </div>
        </div>
        )
    } else {
      return(
        <div className = "galWind" style={{display:this.props.display}}>
        <div className = "modContent">
        <input className="radio" id="331" type="radio" name="priority" value="red" onClick={this.setValue}/>High priority<br/>
        <input className="radio" id="332" type="radio" name="priority" value="yellow" onClick={this.setValue}/>Medium priority<br/>
        <input className="radio" id="333" type="radio" name="priority" value="blue" onClick={this.setValue}/>Low priority<br/>
        <button id="redBut" style={{display:this.props.redact, float: 'left'}} onClick={this.redactTask}>Redact</button>
        <button className="closeRed" style={{float: 'right'}} onClick={this.hideDisplay}>Close</button>
        </div>
        </div>
        )
    }
  }
}
export default ModalWind