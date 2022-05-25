import React, { Component } from 'react'
import './App.css'
import butcherPig from './assets/butcherPig.jpeg'
import funnypig1 from './assets/funnypig1.jpeg'
import funnypig2 from './assets/funnypig2.jpeg'
import funnypig3 from './assets/funnypig3.jpeg'


class App extends Component{
  constructor(props){
    super(props)
    const img1 = require('./assets/funnypig1.jpeg');
    const img2 = require('./assets/funnypig2.jpeg');
    const img3 = require('./assets/funnypig3.jpeg');
    const img0 = require('./assets/butcherPig.jpeg');
    // the state object holds information that can be displayed to the user and updated throughout the program
    this.state = {
      // "phrase" is the text entered by the user - right now there are test words hard coded to make the process of testing your code faster and easier
      // ACTION ITEM: when you are ready for your full user experience, delete the test words so phrase is assigned an empty string
      phrase: "",
      // "phraseTranslated" is what the user will see appear on the page as Pig Latin, it starts as the preset message and updates when your user clicks the "submit" button
      phraseTranslated: "This is where your translated sentence will appear.",
      imgIndex: 0,
      imgList: [img0, img1, img2, img3]
    }
  }

  // The "myPigLatinCodeHere" function is where you will put your logic to convert the sentence entered by the user to Pig Latin

  myPigLatinCodeHere = () => {
    // the variable "userInput" will contain the text input from the user modified into an array of words
    // no need to change this variable
    let userInput = this.state.phrase.split(" ")
    console.log("userInput:", userInput)

    // now that we have an array of words, we can map over the array and access each word
    let translatedWordsArray = userInput.map(currentWord => {
      // ACTION ITEM: use "currentWord" as a starting point for your code
      console.log("currentWord:", currentWord)

      let vowelsArray = currentWord.split("").filter(vowel => {
        return vowel === "a" || vowel === "e" || vowel === "i" || vowel === "o" || vowel === "u"
      })
      console.log("vowelsArray:", vowelsArray)

      // your code here!
      //tools we can use to identify/move the words around: slice()- take an index number and everything after it or to a point, .push() to add to the end, unshift() to add to the start
      //concat to add letters ay, way, etc
      //we need to use a conditional:
      //to add way to the end of words begining with way vowel
      //to move first consonants to the end and add ay
      //if the first consonant contains qu move u with the q === quay
      //y is treated like a vowel in appropriate circumstances...? if it starts with y it is treated as a consonant, if at the end it is treated as a vowel and moved to the end
      //add ay to the second half of the word
      let pigWord = ""

      if(currentWord === ""){
        pigWord = "Enter some words"
      }else if(currentWord.toLowerCase()[0] === "a" || currentWord.toLowerCase()[0] === "e" || currentWord.toLowerCase()[0] === "i" || currentWord.toLowerCase()[0] === "o" || currentWord.toLowerCase()[0] === "u"){
        pigWord = currentWord.concat("way")
      }else if(currentWord.toLowerCase()[0]=== "q" && currentWord.toLowerCase()[1] === "u"){
        pigWord = currentWord.slice(2).concat(currentWord.slice(0,2))+'ay'
        // let beginSliced2 = currentWord.slice(0,2)
        // return endSliced2.concat(beginSliced2)+'ay'
      }else if(currentWord.toLowerCase()[0] !== "a" || currentWord.toLowerCase()[0] !== "e" || currentWord.toLowerCase()[0] !== "i" || currentWord.toLowerCase()[0] !== "o" || currentWord.toLowerCase()[0] !== "u"){
        pigWord = currentWord.slice(currentWord.indexOf(vowelsArray[0])).concat(currentWord.slice(0, currentWord.indexOf(vowelsArray[0])))+'ay'
        // let beginSlice = currentWord.split("").reverse().slice(currentWord.indexOf(vowelsArray[-0])).reverse().join("") -this was really messed up way of trying to do it...
        // let beginSlice = currentWord.slice(0, currentWord.indexOf(vowelsArray[0]))
        // return endSliced.concat(beginSlice) + 'ay'
      }

      // Remember: console.log is your friend :)


      // ACTION ITEM: change the value of currentWord to the name of whatever variable you made containing your Pig Latin'd word
      return pigWord
    })


    // joining the array back to a string of translated words
    // no need to change this variable
    let translatedWords = translatedWordsArray.join(" ")
    console.log("translatedWords:", translatedWords)

    // the setState method will take your information from "translatedWords" and update the state object that is displayed to the user
    // no need to change this method
    this.setState({phraseTranslated: translatedWords})
  }

  restartGame = () => {
    // this method restarts the game by setting the original state
    // ACTION ITEM: when you are ready for your full user experience, delete the test words in phrase so that is assigned an empty string
    this.setState({
      phrase: "",
      phraseTranslated: "This is where your translated sentence will appear."
    })
  }

  // no need to modify this method
  setUpPreventDefault = (e) => {
    // this method prevents React from refreshing the page unnecessarily
    e.preventDefault()
    this.myPigLatinCodeHere()
    this.handleClick()
  }

  // no need to modify this method
  handleInput = (e) => {
    // this method takes the input and saves the value in this.state.phrase so we can use the input in our program
    this.setState({phrase: e.target.value})
  }
  handleClick = () => {
    if(this.state.imgIndex +1 === this.state.imgList.length){
      this.setState({ imgIndex:0 })
    }else{
        this.setState({imgIndex: this.state.imgIndex +1})
    }
  }

//onClick = images[Math.floor(Math.random()*3)]
  render() {
    return (
      <>
        <h1>Swineslator</h1>
        <div id="images">
        <img
          src={this.state.imgList[this.state.imgIndex]}
          alt="pig with butcher cut names in pig latin"
          className="butcherPig"
        />
        </div>
        <div className="inputArea">
          <h4 id="headerTitle">Enter phrase to be translated:</h4>
          {/* user input field - every DOM event that happens in the input will call the handleChange method and update state */}
          <input
            type="text"
            className="userInput"
            onChange={this.handleInput}
            value={this.state.phrase}
            placeholder="enter text here"
          />
          <br />
          {/* button that called the setUpPreventDefault method which calls the myPigLatinCodeHere method */}
          <button onClick={this.setUpPreventDefault}>
          Submit
          </button>

          <button onClick={this.restartGame}>Clear</button>
        </div>
        <p id="translated">{this.state.phraseTranslated}</p>
        <footer>Coded by ~Stephen OMarrah && Nic Last~</footer>
      </>
    )
  }
}

export default App
