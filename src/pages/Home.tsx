import { useState, useEffect } from 'react';
import { HealthSection } from "../components/sections/HealthSection";
import { SymptomsSection } from "../components/sections/SymptomsSection";

interface Answer {
  questionId: string;
  value: string;
  description: string
}

export function Home() {

  const [section, setSection] = useState<number>(0);
  useEffect(() => attSection(section), [section]);

  let answers: Answer[] = [];
  
  function handleAnswers(answer: Answer) {
    const indexAnswer = answers.findIndex(ans => ans.questionId === answer.questionId);
    if (indexAnswer > -1) answers[indexAnswer] = answer;
    else answers.push(answer);
    console.log(answer)
  }

  function attSection(sectionValue: number) {
    handleCurrentSection(sectionValue)
  }

  function handleCurrentSection(sectionValue: number) {

    if (sectionValue < 0) sectionValue = 0

    //troca isso para um switch karai (*-*)
    if (sectionValue === 0) return <HealthSection onAnswer={(answer: Answer) => handleAnswers(answer)} />
    else if (sectionValue === 1) return <SymptomsSection onAnswer={(answer: Answer) => handleAnswers(answer)} />
  }




  return (
    <>

      {
        handleCurrentSection(section)
      }

      <button onClick={() => setSection(section - 1)}>VOLTAR</button>
      <br />
      <button onClick={() => setSection(section + 1)}>PRÓXIMA</button>

    </>
  )
}