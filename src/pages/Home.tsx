import { useEffect, useState } from 'react';
import { InputText } from '../components/InputText';
import { RadioGroupDemo } from '../components/radioGroup/RadioGroup';
import { useFetch } from '../hooks/useFetch';


interface Answer {
  questionId: string;
  value: string;
  description: string
}


interface section {
  name: string,
  questions: any
}


export function Home() {

  const { data: sections, isFetching } = useFetch<section[]>('/section')
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  

  useEffect(() => { generateQuestions() }, [answers]);


  let skipSection = false
  function generateQuestions() {

    if (sections == null) return;
    
    return sections[currentSection].questions.filter((question: any)  => {
      
      if(skipSection) return false;

      if(question.radios.length == 0) return true;

      let radioWithAction = question.radios.find((radio: any) => radio.action == 0)

      if (radioWithAction && (answers.findIndex(ans => ans.questionId == question.id && (ans.value == null ||  ans.value == radioWithAction.value))) ) {
        skipSection = true
        return true;}
      else if (radioWithAction){
        skipSection = false
        return true
      }
    console.log(skipSection)

    }).map((item: any) => {
      switch (item.type) {
        case 0:
          return <InputText label={item.label} />
        case 1:
          return <RadioGroupDemo label={item.label} values={item.radios} questionId={item.id} onAnswer={(answer: Answer) => handleAnswers(answer)} />
        case 3:
          return  <RadioGroupDemo label={item.label} values={item.radios} questionId={item.id} onAnswer={(answer: Answer) => handleAnswers(answer)} showDescription={true}/>
      }
    })
  }



  function handleAnswers(answer: Answer) {
    const indexAnswer = answers.findIndex(ans => ans.questionId === answer.questionId);
    if (indexAnswer > -1) answers[indexAnswer] = answer;
    else  answers.push(answer);
    
    setAnswers(answers)
    console.log(answers)
  }



  return (
    <>

      <div className="flex flex-col justify-center items-center bg-slate-50">
        <form className="min-h-screen max-w-5xl mt-5 mb-5">
          <h1 className='text-bluePurple-500 text-2xl font-bold'>{sections? sections[0].name: ""}</h1>
          <hr />
          {isFetching && <p>Carregando...</p>}
          {generateQuestions()}
        </form>
      </div>
    </>
  )
}