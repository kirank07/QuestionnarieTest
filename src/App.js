import { useEffect, useState } from 'react';
import './App.css';
import { QUESTIONS } from './questions';

function App() {
  const [answer,setAnswer] = useState([]);
  const [score,setScore] = useState(0);
  const [avgScore,setAvgScore] = useState(0);
  const [questionListY,setQuestionsListY] = useState([]);

  useEffect(()=>{
    const totalScore = answer.reduce((acc,cur) => {
      return cur === 'Yes' ? acc + 1 : acc ;
    },0);
    const avg = (totalScore/(answer.length || 1)) * 100;
    setAvgScore(avg);
  },[answer]);

  const questionsList = Object.entries(QUESTIONS);
  //console.log(questionsList);

  const handleAnswer = (index,ans) => {
    const answer = [...ans];
    //console.log(answer);
    answer[index] = ans;
    setAnswer(answer);
    const scoreAns = calculateScore();
    setScore(scoreAns);
    const ans1 = answer.filter(answer => answer === 'Yes');
    if(ans1[0] === 'Yes'){
      setQuestionsListY(prevQ => [...prevQ,questionsList[index]]);
    }
      
  }

  const calculateScore = () => {
    const countY = answer.filter(answer => answer === 'Yes').length;
    const totalQ = questionsList.length;
    const  scoreCal = 100 * countY / totalQ;
    return scoreCal;
  }

  return (
    <div className="App">
    <div className="main__wrap">
        <main className="container">
          <div>
          TODO
            <h3>Score :{score}</h3>
            <h3>Average Score : {avgScore}</h3>
            {
              questionsList.map((question,index) => (
                <div key={index}>
                  <p>{question}</p>
                  <button onClick={() => handleAnswer(index,'Yes')}>Yes</button>
                  <button onClick={() => handleAnswer(index,'No')}>No</button>
                </div>
              ))
            }
          </div> 
          <div>
          <h2>List of Answered (Yes) Questions</h2>
            
              {questionListY.map((ques,i) => (
                <p key={i}>{ques}</p>
              ))}
            
          </div>
           
        </main>
      </div>
    </div>
  );
}

export default App;
