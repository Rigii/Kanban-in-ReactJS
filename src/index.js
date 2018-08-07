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
            return +(a.index) == +(b.index) ? 0 : (+(a.index) < +(b.index) ? 1 : -1);
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
}
taskAdd(props){
    const card = props;
    this.setState(function(pevState){
        const columns= this.state.columns;
        columns[0].cards.push(card);
        localStorage.setItem('initial', JSON.stringify(columns));
        return {columns}
    })}

    taskRedact(props){
        this.setState(function(pevState){
            const columns= this.state.columns;
            let kardKey=this.state.kardKey
            let colKey=this.state.colKey
            let card=columns[colKey].cards.splice(kardKey, 1)
            if(colKey===0){
                card[0].name=props.name;
                card[0].text=props.text
            }
            card[0].priority=props.priority;
            columns[colKey].cards.push(card[0]);
            localStorage.setItem('initial', JSON.stringify(columns));
            return {columns}
        })
    }

    taskMoove(props){
        let kardKey=props.kardKey
        let colKey=props.colKey
        let nextColumn=props.nextColumn
        const columns= this.state.columns;
        this.setState(function(pevState){
         let card= columns[colKey].cards.splice(kardKey, 1)
           if (nextColumn!==null){
             columns[nextColumn].cards.push(card[0])
             localStorage.setItem('initial', JSON.stringify(columns));
             return {columns}}
             localStorage.setItem('initial', JSON.stringify(columns));
             return {columns}
         })
    }

    storageState(){
        let storage= JSON.parse(localStorage.getItem('initial'))
        if(storage!=null){
            this.setState({columns: storage}) 
        }
    }

    componentDidMount(){
        this.storageState()
    }
    
    render(){
        sortNodes(columns)
console.log(localStorage.getItem('initial'))
        return(
           <div className="kanban">
           <span id="button" onClick={this.displayer}>CREATE TASK</span>
           <ModalWind 
           ref="child"
           hideDisplay={this.hideDisplay}
           setValue={this.setValue}
           taskAdd={this.taskAdd}
           display={this.state.display}
           create= {this.state.create}
           onlyPriority={this.state.onlyPriority}
           redact= {this.state.redact}
           cardKey= {this.state.cardKey}
           colKey= {this.state.colKey}
           headTask={this.state.headTask}
           textTask={this.state.textTask}
           taskRedact={this.taskRedact}
           />
           <table className="table">
           <tbody>
           <tr>
           <th className='stage head'>TO DO</th>
           <th className='stage head'>IN PROCESS</th>
           <th className='stage head'>DONE</th>
           <th className='stage head'>CANCELED</th>
           </tr>
            </tbody>
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
