import React from 'react';
import moment from 'moment'

class Card extends React.Component{
	constructor(props){
		super(props);
		this.state={
			kardkey: props.cardKey,
			date: moment().format('MMMM Do YYYY, h:mm:ss a'),
			taskName: props.taskName,
			taskContent: props.taskContent,
		}
		this.moove=this.moove.bind(this)
		this.redact= this.redact.bind(this)
	}
	moove(e){
		let kardKey=this.state.kardkey;
		let colKey=this.props.colKey;
		let nextColumn;
		if (e.target.className=="pushRight"){nextColumn=colKey+1};
		if (e.target.className=="cancel"){nextColumn=3};
		if (e.target.className=="delTask"){nextColumn=null};
		this.props.taskMoove({kardKey, colKey, nextColumn})
	}
	redact(){
		let kardKey=this.state.kardkey;
		let colKey=this.props.colKey;
		let redact= 'inline-block';
		let taskName=this.state.taskName;
		let taskContent=this.state.taskContent;
		this.props.display({kardKey,colKey,redact,taskName,taskContent})
	}
	render(){
            let taskName = this.props.taskName;// значение заголовка 
            let taskContent = this.props.taskContent;// значение контента
            let timeIndex = moment().format('DDMMYYYYHmmss');
            let color = this.props.color;
            let showDel=this.props.colKey==2||this.props.colKey==3? "inline-block": 'none'
            let showCancel=this.props.colKey==0||this.props.colKey==1? "inline-block": 'none' 
            let showRed=this.props.colKey==0||this.props.colKey==1? "inline-block": 'none'
            let showRight=this.props.colKey==0||this.props.colKey==1? "inline-block": 'none'
            return (<div id={timeIndex} className="radioId" style={{backgroundColor:color}}>
            	<div className="taskWindReady"><div><h4>{taskName}</h4></div><p>{taskContent}</p>
            	<p>{this.state.date}</p>
            	<img className="delTask" src={require("./img/ico/del.png")} alt="del" style={{display: showDel, cursor: 'pointer'}}
            	onClick={this.moove}/>
            	<img className="cancel" src={require("./img/ico/cancel.png")} alt="cancel" style={{cursor: 'pointer', display: showCancel}}
            	onClick={this.moove}/>
            	<img className="redact" src={require("./img/ico/redact.png")} alt="redact" style={{cursor: 'pointer', display: showRed}}
            	onClick={this.redact}/>
            	<img className="pushRight" src={require("./img/ico/right.png")} height="27" style={{float: 'right', cursor: 'pointer', display: showRight}} 
            	onClick={this.moove} alt="pushRight"/>
            	</div>
            	</div>
            	)
        }
    }

    class Column extends React.Component{
    	constructor (props){
    		super(props)
    	}
    	render(){
    		let cards=this.props.cards
    		let column=this.props.column
    		let columnIndex=this.props.colInd
    		let taskMoove= this.props.taskMoove
    		let display= this.props.display
    		return( 
    			<td className="stage forSort" id={this.props.id}>
    			{cards.map(function(card, cardIndex){
    				return <Card
    				taskName={card.name}
    				taskContent={card.text}
    				color={card.priority}
    				key={cardIndex}
    				cardKey={cardIndex}
    				colKey={columnIndex}
    				display={display}
    				taskMoove= {taskMoove}
    				/>
    			})
    		}
    		</td>
    		)
    	}
    }
    export default (Column)