import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from '../firebase/index.js'
import SearchByChair from './SearchByChair.js'
import SearchByDate from './SearchByDate.js'
import SearchByKaiserNumber from './SearchByKaiserNumber.js'
import SignOut from './SignOut.js'
import Result from './Result.js'
import fire from '../firebase/index.js'

class Home extends Component{

  constructor(props) {
    super(props);
    this.state={
	    	result:[],
	    	type:"",
    	}
    this.setResult = this.setResult.bind(this)
    this.setKaiserNumberResult = this.setKaiserNumberResult.bind(this)
  }

  setResult(result){
  	this.setState({result})
  }

  async setKaiserNumberResult(kaiserNumber){
  	
    var snap = await fire.database.ref(`/patients/${kaiserNumber}/appointments`).once('value')
    if(!snap.val()){
      alert("Error: ref not found")
      return
    }
  	var json = snap.val()
  	var arr =[]
  	for(var prop in json){
  		arr.push({date:prop, chair:json[prop].chair, numIntervals:json[prop].numIntervals})
  	}
  	this.setResult(arr)
  }	

  render() {
  	console.log(this.state.result)
    return (
      <div>
    	  <SignOut/>
	      <SearchByKaiserNumber setKaiserNumberResult={this.setKaiserNumberResult}/>
      	<SignOut/>
	      <SearchByKaiserNumber setResult={this.setResult}/>
	      <SearchByDate/>
	      <Result results={this.state.results} type={this.state.type}/>

      </div>
    );
  }
}


export default Home;