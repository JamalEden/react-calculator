import React, { Component } from 'react';
import  math from 'mathjs';
import update from 'react-addons-update';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
      this.state = { operations : []};
  }

  makeCalculations(state){
    var result = this.state.operations.join('');
    
    if(result){
      result = String(math.eval(result));
      this.setState({ operations : [result] });
      
    }
  }
  handelClick = (e) => {
   var value = e.target.getAttribute("data-value");
   switch(value){
     case 'clear':
     this.setState({ operations: []});
     break;
     case 'equal':
     this.setState(this.makeCalculations);
     break;
     case 'clearAll':
     this.setState(this.resetSreen);
     default:
     var newOperations = update(this.state.operations, {$push: [value]});
     this.setState({operations: newOperations});
     break;
   }
  }

  render() {
    return (
     <div className="app">
      <Display data={this.state.operations} />
      <Buttons>
        <Button onClick={ this.handelClick } label="AC" value="clear"/>
        <Button onClick={ this.handelClick } label="7" value="7"/>
        <Button onClick={ this.handelClick } label="4" value="4"/>
        <Button onClick={ this.handelClick } label="1" value="1"/>
        <Button onClick={ this.handelClick } label="0" value="0"/>

        <Button onClick={ this.handelClick } label="/" value="/"/>
        <Button onClick={ this.handelClick } label="8" value="8"/>
        <Button onClick={ this.handelClick } label="5" value="5"/>
        <Button onClick={ this.handelClick } label="2" value="2"/>
        <Button onClick={ this.handelClick } label="." value="."/>

        <Button onClick={ this.handelClick } label="*" value="*"/>
        <Button onClick={ this.handelClick } label="9" value="9"/>
        <Button onClick={ this.handelClick } label="6" value="6"/>
        <Button onClick={ this.handelClick } label="3" value="3"/>
        <Button label="" />

        <Button onClick={ this.handelClick } label="-" value="-"/>
        <Button onClick={ this.handelClick } label="+" value="+" />
        <Button onClick={ this.handelClick } label="=" value="equal" />
      </Buttons>
     </div>
    );
  }
}

class Display extends Component{
  render() {
    var string = this.props.data.join('');
    
    return (
      <div className="Display">
        {string}
      </div>
    );
  }
}

class Buttons extends Component{
  render() {
    return(
     <div className="Buttons">
        {this.props.children}
     </div>
    );
  }
} 

class Button extends Component {
  render() {
    return(
      <button onClick={this.props.onClick} className="Button" data-value={this.props.value}>
        {this.props.label} 
      </button>
    );
  }
}

export default App;
