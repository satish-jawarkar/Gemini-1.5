// import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAI }from '@google/generative-ai';
import './App.css';
import { useState } from 'react';

function App() {

  const [query, setQuery] = useState("");
  const [copy, setCopy] = useState("");
  const [result, setResult] = useState("");
  const [flag, setFlag] = useState(false);

  const genAi = new GoogleGenerativeAI("Enter your gemini API here");

  // const model = genAi.getGenerativemodel({
  //   model: "gemini-1.5-pro"
  // });

  const model = genAi.getGenerativeModel({
    model:  "gemini-1.5-pro",
  })
  const val = "Hold on!! We are getting things ready for you 😁👍";


  // const res = model.generateContent(query);

  // const handle = setTimeout(() => {
  //   console.log("Hold on!! We are getting things ready for you 😁👍");

  //   const res = model.generateContent(query);
  //   res.then((r) =>{
  //     console.log(r.response);
  //     console.log(r.response.candidates[0].content.parts[0].text);
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
  //   .finally(()=>{
  //     console.log("API Worked Succefully!")
  //   })} ,5000);

  const handle = (e) => {
    if(e.key === 'Enter'){
      setFlag(true)
      const res = model.generateContent(query);
      // console.log("Hold on!! We are getting things ready for you 😁👍");
      res.then((r) =>{
        console.log(r.response.candidates[0].content.parts[0].text);
        let a = r.response.candidates[0].content.parts[0].text;
        let proceesedData = a.replace(/\*\**/g,' ');
        // let ans = document.createElement("h3");
        // h3.innerHTML = a;        
        setResult(proceesedData);
        setCopy(query);
        setQuery("");
        setFlag(false);
        // console.log(r.response.text);
      })
      .catch((err) => {
        console.log(err);
        setResult("[500] An internal error has occurred")
        // console.log("[500] An internal error has occurred");
      })
      .finally(()=>{
        console.log("API Worked Succefully!")
      })
    }
  }

  return (
    <div className="App">
      <div className='container'>
        <div className='returnPromise'>
          <h1>Ask me anything</h1> <br/>
          {copy ? <h2>You: {copy}</h2> : null}
          {flag ? <h2>{val}</h2> : null}
          {/* <div className='resultSet'>

          </div> */}
          <br/>
          {result ? <h2>Gemini 1.5  Pro: {result}</h2> : null}
        </div>
        <div className='inputBox'>
        <input type="text" className='textBox' placeholder="Enter any question or anything...." value={query} onChange={(e)=>{setQuery(e.target.value)}} onKeyDown={handle}/>
        </div>  
      {/* <button onClick={handle}>Hit me!</button> */}
      </div>
    </div>
  );
}

export default App;
