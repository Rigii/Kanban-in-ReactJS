import React from 'react';
import ReactDOM from 'react-dom';
import Column from "./Column";

class Columns extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let columns=this.props.columns;
        let taskMoove=this.props.taskMoove
        let display=this.props.display
       return (
        <tbody className="bodyTable">
        <tr>
        {columns.map(function(column, columnIndex){
            return <Column 
            key={columnIndex} 
            colInd= {columnIndex} 
            column={column} 
            id={column.id} 
            taskMoove={taskMoove} 
            display={display}
            cards={column.cards}
            />})}
        </tr>
        </tbody>)
   }
}
export default (Columns)