import { useEffect, useState, FormEvent } from 'react';
import { Button } from '../components/Button';
import { InputText } from '../components/InputText';
import { RadioGroupDemo } from '../components/radioGroup/RadioGroup';
import { useFetch } from '../hooks/useFetch';
import { useRegister } from '../hooks/useRegister';
import { useNavigate  } from "react-router-dom";


interface Answer {
  questionId: string;
  primaryValue: string;
  secondaryValue: string
}


interface section {
  name: string,
  questions: any
}

export function Home() {

  const { data: sections, isFetching } = useFetch<section[]>('/section')
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [actualStep, setActualStep] = useState<any>();


  const navigate = useNavigate();

  useEffect(() => {
  }, [currentSection, actualStep]);

  var currentStep: any
  var nextStep: any
  
  let lastSection = false

  if (!nextStep && (sections && sections[sections.length-1].name == sections[currentSection].name)) lastSection = true;

  splitQuestions()
  function splitQuestions() {

    if (!sections) return;

    let questions = actualStep?.length > 0 ? actualStep : sections[currentSection].questions

    let questionFiltred = questions.find((question: any) => question.radios.some((radio: any) => radio.action == 0))

    let indexFilterQuestion = 100000;
    if (questionFiltred) {
      indexFilterQuestion = questionFiltred.id
    }

    currentStep = questions.filter((question: any) => question.id <= indexFilterQuestion) //carrega todas as questoes até a pergunta filtro (ele é incluida)
    nextStep = currentStep.length != questions.length ? questions.slice(currentStep.length, questions.length) : [] // carrega todas as questoes após a primeira questão filtro

  }

  function generateQuestions() {
    if (!currentStep) return;
    return currentStep.map((question: any) => {
      switch (question.type) {
        case 0:
          return <InputText label={question.label} key={question.id} />
        case 1:
          return <RadioGroupDemo label={question.label} values={question.radios} questionId={question.id} onAnswer={(answer: Answer) => handleAnswers(answer)} key={question.id} />
        case 3:
          return <RadioGroupDemo label={question.label} values={question.radios} questionId={question.id} onAnswer={(answer: Answer) => handleAnswers(answer)} showDescription={true} key={question.id} />
      }
    })
  }


  function handleAnswers(answer: Answer) {
    const indexAnswer = answers.findIndex(ans => ans.questionId === answer.questionId);
    if (indexAnswer > -1) answers[indexAnswer] = answer;
    else answers.push(answer);

    console.log(answers)
    setAnswers(answers)
  }


  async function passSectionOrStep(event: FormEvent) {
    event.preventDefault();


    //Valida se todas as questoes foram respondidas, incluindo o campo secundario se houver
    if(sections){
      if (answers.findIndex(ans => [null, "", []].includes(ans.primaryValue)) >= 0) return // se estiver faltando questão sem resposta

      let questionsWithSecondaryValue = sections[currentSection].questions.filter((question: any) => [2,3].includes(question.type)).map((question: any) => ({id: question.id, firstRadioValue: question.radios[0].value}))
      if (questionsWithSecondaryValue.findIndex((q:any) => answers.findIndex(ans => (ans.questionId == q.id && ans.primaryValue != q.firstRadioValue && !ans.secondaryValue))>= 0) >= 0) return
    }

    let lastQuestion = currentStep[currentStep.length - 1];
    let indexRadioFilterSkipAll = lastQuestion.radios.findIndex((radio: any) => radio.action == 0)
    let isQuestionFilter = indexRadioFilterSkipAll >= 0


    let isToSkipSection = isQuestionFilter ? answers.find(ans => ans.questionId == lastQuestion.id)?.primaryValue == lastQuestion.radios[indexRadioFilterSkipAll].value : false

    if(lastSection){
      await useRegister('/form', {
        enrollment: "123123",
        email: "teste@gmail.com",
        answers})

        navigate("/agradecimentos");
    }


    if (isToSkipSection || nextStep.length == 0) {
      setCurrentSection(currentSection + 1)
      setActualStep(null);
    }
    else if (!isToSkipSection) {
      setActualStep(nextStep)
    }
    window.scrollTo({top: 0,  behavior: 'smooth' })
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-slate-50">
        <form className="min-h-[84vh] max-w-5xl mt-5 mb-5" onSubmit={passSectionOrStep}>
          <h1 className='text-bluePurple-500 text-2xl font-bold'>{sections ? sections[currentSection].name : ""}</h1>
          <hr />
          {isFetching && <span>Carregando...</span>}
          {generateQuestions()}

          <div className='flex flex-col items-end'>
            {sections ? <Button value={lastSection ? 'Finalizar' : 'Continuar'} /> : "" }
          </div>
        </form>
      </div>
    </>
  )
}