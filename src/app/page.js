"use client";

import "./app.css";
import "@appwrite.io/pink-icons";
import { useState, useRef} from "react";
const inputs = require('../questions.json')

export default function Home() {
  const [status, setStatus] = useState(false);

  const formRef = useRef();

  async function sendPing(e) {
    e.preventDefault()
    const inputsElements = [].slice.call(formRef.current.elements);
    const isOk = inputsElements.every((input) => {
      const {id} = input.dataset;
      if(!id){
        return true;
      }
      const {answer} = inputs.find((data) => `${data.id}` === `${id}`);
      if(`${answer}`.trim().toLowerCase() !== `${input.value}`.trim().toLowerCase()){
        input.classList.add('errored');
        setTimeout(() => {
          input.classList.remove('errored');
        }, 800);
        return false;
      } else {
        input.classList.remove('errored');
        return true;
      }
    });
    if(isOk){
      setStatus('5 3 2 6');
    } else {
      setStatus(false);
    }
  }

  const lines = Array.from({ length: 80 });

  if(status){
    return <div className="status">{status}</div>
  }
  return (
    <main>
      <section className="mt-12 flex h-52 flex-col items-center">
        {status === "loading" ? (
          <div>
            Loading...</div>
        ) : status === "error" ? (
          <div>
            Nope
          </div>
        ) : status}
        {lines.map((_, i) => {
          const arr = [Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100];
          arr.sort((a, b) => a - b);

          const [num1, num2, num3, num4] = arr;
          return (
            <div style={{
              backgroundImage: `repeating-linear-gradient(
                90deg,            
                var(--lines) 0px,          
                var(--lines) ${num1}px,        
                transparent ${num1}px,   
                transparent ${num2}px,  
                var(--lines) ${num2}px,
                var(--lines) ${num3}px,      
                transparent ${num3}px,
                transparent ${num4}px    
              )`,
              'animationDuration': `${Math.random() * 100}s`,
              top: `${Math.random() * 100}%`
            }} className={"stripes " + `str_${i}`} key={`str_${i}`}></div>
          )
        })}
        <form 
          onSubmit={sendPing} ref={formRef}>
        {inputs.map(({question, id, answer}, i) => {
          const top = Math.random() * 90;
          const left = Math.random() * 90;
          return <div style={{
            top: `${top}%`,
            left: `${left}%`
          }} className={"inputWrap " + (top < 50 ? 'bottom': '')} key={`input_${question}`}>
            <div className="question">{question}</div>
            <input style={{width: `${`${answer}`.length * 10}px`}} data-id={id} type="text"></input>
          </div>
        })}
        <button
        type="submit"
          className={`sendBtn`}
        >
          <span className="text-white">Get a code</span>
        </button>
        </form>
      </section>
    </main>
  );
}
