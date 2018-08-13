import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Column from "./Column";
import ModalWind from "./ModalWind";
import Columns from './Columns';

function sortNodes(props) {
    let sortArr=props;
    for (let i = 0; i < sortArr.length; i++) {
        var items = sortArr[i];
        items.cards.sort(function(a,b){
            return +(a.index) == +(b.index) ? 0 : (+(a.index) < +(b.index) ? -1 : 1);
        })
    }
    return sortArr
}

const columns=[
{
    id: 'initial',
    cards: []
},
{
    id: 'in_progress',
    cards: []
},
{
    id: 'done',
    cards: []
},
{
    id: 'aborted',
    cards: []
}
]

class RenderTable extends React.Component{
    constructor(props){
        super(props)
        this.state={
           columns: props.arrColumns,
           display:'none',
           onlyPriority: false,
           redact: 'none',
           create: 'inline-block',
           cardKey: '',
           colKey: '',
           headTask: '',
           textTask: ''
       };

       this.displayer=this.displayer.bind(this)
       this.hideDisplay=this.hideDisplay.bind(this)
       this.taskAdd=this.taskAdd.bind(this)
       this.taskMoove=this.taskMoove.bind(this)
       this.taskRedact=this.taskRedact.bind(this)
       this.storageState=this.storageState.bind(this)

   }
   displayer(props){
   let onlyPriority= props.colKey===1? true: false
   if (props.redact==='inline-block'){
      this.setState({
        display: 'block',
        redact: props.redact,
        kardKey: props.kardKey,
        colKey: props.colKey,
        create: 'none',
        headTask: props.taskName,
        textTask: props.taskContent,
        onlyPriority: onlyPriority
    })
  }else{
      this.setState({
        display: 'block',
        create: 'inline-block',
        redact: 'none',
        onlyPriority: false
    })}

  }
  hideDisplay(state){
    this.setState({display: state.display})
    this.setState({headTask:'', textTask:''})
}
taskAdd(props){
    const card= props;
    card.index= '0'+card.index;
    localStorage.setItem(card.index, JSON.stringify(card));
    this.setState(function(pevState){
        const columns= this.state.columns;
        columns[0].cards.push(card);
        return {columns}
    })}

    taskRedact(props){
        this.setState(function(pevState){
            const columns= this.state.columns;
            let kardKey=this.state.kardKey;
            let colKey=this.state.colKey;
            let card=columns[colKey].cards.splice(kardKey, 1);
            let index= String(colKey)+props.index+card[0].index.slice(4);
            let prevIndex=card[0].index;
            if(colKey===0){
                card[0].name=props.name //==''?card[0].name:props.name;
                card[0].text=props.text //==''?card[0].text:props.text;
                card[0].index=index;
            }
            card[0].priority=props.priority;
            card[0].index=index;
            columns[colKey].cards.push(card[0]);
            localStorage.removeItem(prevIndex);
            localStorage.setItem(index, JSON.stringify(card[0])); 
            return {columns}
        })
    }
    taskMoove(props){
        let kardKey=props.kardKey;
        let colKey=props.colKey;
        let nextColumn=props.nextColumn;
        const columns= this.state.columns;
        this.setState(function(pevState){
         let card= columns[colKey].cards.splice(kardKey, 1)
           if (nextColumn!==null){
             columns[nextColumn].cards.push(card[0]);
             localStorage.removeItem(card[0].index); //remoove prev task data from storage
             card[0].index=String(card[0].index).replace(colKey,nextColumn);
             localStorage.setItem(card[0].index, JSON.stringify(card[0]));//creating a new with new index
             return {columns}};
             localStorage.removeItem(card[0].index);
             return {columns};
         })
    }

    storageState(){
       for (var key in localStorage) {
        let column= key.slice(0,1)
      let json=JSON.parse(localStorage.getItem(key))
      this.setState(function(pevState){
        if(isNaN(column)!=true){
        this.state.columns[column].cards.push(json);
        return {columns}
        }
    })
       }
    }

    componentDidMount(){
        this.storageState()
    }
    
    render(){
        sortNodes(columns)
     // console.log(this.state.headTask)
        return(
           <div className="kanban">
           <span id="button" onClick={this.displayer}>CREATE TASK</span>
           <ModalWind 
           hideDisplay={this.hideDisplay}
           setValue={this.setValue}
           taskAdd={this.taskAdd}
           display={this.state.display}
           create= {this.state.create}
           onlyPriority={this.state.onlyPriority}
           redact= {this.state.redact}
           taskRedact={this.taskRedact}
           name={this.state.headTask}
           text={this.state.textTask}
           />
           <table className="table">
           <thead>
           <tr>
           <th className='stage head'>TO DO</th>
           <th className='stage head'>IN PROCESS</th>
           <th className='stage head'>DONE</th>
           <th className='stage head'>CANCELED</th>
           </tr>
            </thead>
           <Columns 
           columns={this.state.columns}
           taskMoove={this.taskMoove}
           display={this.displayer}
           />
          
           </table>
           </div>
           )
    }
}
ReactDOM.render(
   <RenderTable arrColumns={columns}/>,document.getElementById('kanban'));
registerServiceWorker();
