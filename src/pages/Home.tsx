import { useEffect, useState, FormEvent, useContext, useRef } from 'react';
import { Button } from '../components/Button';
import { RadioGroupDemo } from '../components/radioGroup/RadioGroup';
import { useFetch } from '../hooks/useFetch';
import { useRegister } from '../hooks/useRegister';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { TextField } from '../components/TextField';
import { AnswerContext } from '../contexts/answer';
import { RadioGroupDemo2 } from '../components/radioGroup2/RadioGroup2';
import ProgressDemo from '../components/progress/Progress';
import { LabelForm } from '../components/Label';

interface Answer {
  questionId: number;
  primaryValue: string;
  secondaryValue: string;
  radioIndex: string;
  type: number;
  sectionId?: number; 
}

interface section {
  name: string,
  questions: any,
  id: number
}

export function Home() {

  const { data: sections, isFetching } = useFetch<section[]>('/section')
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [actualStep, setActualStep] = useState<any>();
  const { answer, setAnswer } = useContext(AnswerContext);
  
  const navigate = useNavigate();

  var isFinished = useRef(false)
  var isFirstSection19 = useRef(true)

  let count = useRef(0)

  useEffect(() => {
      if (count.current == 0 && Object.values(answer).findIndex((val:any) =>  ["", null, undefined].includes(val)) >= 0) {
          navigate("/agradecimentos")
      }

  }, [answer]);

  useEffect(() => {
  }, [currentSection, actualStep]);

  var currentStep: any
  var nextStep: any

  let lastSection = false


  splitQuestions()
  function splitQuestions() {

    if (!sections) return;

    if (actualStep?.find((q: any) => q.id == 58)) {
      if (answers.findIndex(ans => [57, 56, 55].includes(Number(ans.questionId)) && ans.primaryValue == "1") < 0) {
        actualStep.shift();
      }

    }

    let questions = actualStep?.length > 0 ? actualStep : []
    if (questions.length == 0) {
      if (sections[currentSection].name == "PÂNICO") {
        if (answers.findIndex(ans => [75, 69].includes(ans.questionId)) <= 0) {
          setCurrentSection(currentSection + 1)
        }
      }
      questions = sections[currentSection].questions
    }

    let questionFiltred = questions.find((question: any) => question.radios.some((radio: any) => radio.action != null))

    let indexFilterQuestion = 100000;
    if (questionFiltred) {
      indexFilterQuestion = questionFiltred.id
    }

    currentStep = questions.filter((question: any) => question.id <= indexFilterQuestion) //carrega todas as questoes até a pergunta filtro (ele é incluida)
    nextStep = currentStep.length != questions.length ? questions.slice(currentStep.length, questions.length) : [] // carrega todas as questoes após a primeira questão filtro
    if (nextStep.length == 0 && (sections && sections[sections.length - 1].name == sections[currentSection].name)) lastSection = true;

  }

  function convertDate(date:string){
    if (!date) return date;
    const [year, month, day] = date.split('-');
    return [month, day, year].join('/');
  }


  function generateQuestions() {
    if (!currentStep) return;

    if(currentSection == 18){
      let obj = {} as any;

      for (let index = 1; index < 19; index++) {
        obj["sec"+(index-1)] = answers.filter(ans => ans.type == 1 && ans.sectionId == index).reduce((a, {primaryValue}) => a + Number(primaryValue), 0).toString();
      }
      let sectionsToShow = Object.values(answer).filter((value: any) => Number(value) >=2);
      if (sectionsToShow.length <=0 ){
        setCurrentSection(19)
        return;
      }

      if(isFirstSection19.current){
      handleAnswers({primaryValue:"", secondaryValue:"", radioIndex:"", questionId:112, sectionId:19, type:1})
      handleAnswers({sectionId:19, type:0, primaryValue: "", questionId:113, secondaryValue:"", radioIndex:""})
      isFirstSection19.current = false;
      }
      return <>

      <RadioGroupDemo2 label="Você me disse que teve alguns problemas durante a semana passada, qual desses problemas mais o incomodou?"
      values={sections ? sections?.filter((sec :any) => sectionsToShow.includes(sec.id.toString())).map((sec:any) => sec.name): [] }
      onAnswer={(ans: any) => handleAnswers({...ans, questionId:112, sectionId:19, type:1})}
      questionId="112"
      />
      <div className="mt-4 pl-8 pr-6 py-8 w-full bg-white rounded-md border-2">
      <LabelForm label="Quando este problema começou? " />
          <input className="bg-slate-50 py-3 px-4 rounded text-sm mt-1
          border-b-slate-500 text-gray-700
          placeholder:text-gray-400
          hover:border-gray-800
          focus:text-gray-800
          focus:border-gray-50 "
          onChange={(e: any) => handleAnswers({sectionId:19, type:0, primaryValue: convertDate(e.target.value), questionId:113, secondaryValue:"", radioIndex:""})} type="date"></input>
      </div>
      </>
      
    }


    return currentStep.map((question: any) => {
      switch (question.type) {
        case 0:
          return <TextField label={question.label} key={question.id} questionId={question.id} onAnswer={(answer: Answer) => handleAnswers(answer)} />
        case 1:
          return <RadioGroupDemo sectionId={sections != null ? sections[currentSection].id : undefined} questionType={question.type} label={question.label} values={question.radios} questionId={question.id} onAnswer={(answer: Answer) => handleAnswers(answer)} key={question.id} questionDescription={question.description} />
        case 2:
          return <RadioGroupDemo sectionId={sections != null ? sections[currentSection].id : undefined} questionType={question.type} label={question.label} values={question.radios} questionId={question.id} onAnswer={(answer: Answer) => handleAnswers(answer)} key={question.id} showRadioWithChildren={true} questionDescription={question.description} />
        case 3:
          return <RadioGroupDemo sectionId={sections != null ? sections[currentSection].id : undefined} questionType={question.type} label={question.label} values={question.radios} questionId={question.id} onAnswer={(answer: Answer) => handleAnswers(answer)} showDescription={true} key={question.id} questionDescription={question.description} />
        case 4: 
          return <RadioGroupDemo sectionId={sections != null ? sections[currentSection].id : undefined} questionType={question.type} label={question.label} values={question.radios} questionId={question.id} onAnswer={(answer: Answer) => handleAnswers(answer)} showOtherType={true} key={question.id} questionDescription={question.description} />
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

  function generateProgress(){
    return <ProgressDemo value={currentSection}/>
  }

  async function passSectionOrStep(event: FormEvent) {
    event.preventDefault();

    if(isFinished.current) return;

    //Valida se todas as questoes foram respondidas, incluindo o campo secundario se houver
    if (sections) {
      if (answers.findIndex(ans => [null, "", []].includes(ans.primaryValue)) >= 0) return toast.error("Por favor preencha todos os campos"); // se estiver faltando questão sem resposta

      let questionsWithSecondaryValue = sections[currentSection].questions.filter((question: any) => [2, 3].includes(question.type)).map((question: any) => ({ id: question.id, firstRadioValue: question.radios[0].value }))
      if (questionsWithSecondaryValue.findIndex((q: any) => answers.findIndex(ans => (ans.questionId == q.id && ans.primaryValue != q.firstRadioValue && !ans.secondaryValue)) >= 0) >= 0) return toast.error("Por favor preencha todos os campos");
      
      let questionsWithSecondaryValue2 = sections[currentSection].questions.filter((question: any) => 4 == question.type).map((question: any) => ({ id: question.id, lastRadioValue: question.radios[question.radios.length -1].value }))
      if (questionsWithSecondaryValue2.findIndex((q: any) => answers.findIndex(ans => (ans.questionId == q.id && ans.primaryValue == q.lastRadioValue && !ans.secondaryValue)) >= 0) >= 0) return toast.error("Por favor preencha todos os campos");
    }

    let lastQuestion = currentStep[currentStep.length - 1];
    let indexRadioFilter = lastQuestion.radios.findIndex((radio: any) => radio.action != null)
    let isQuestionFilter = indexRadioFilter >= 0

    let lastAnswer = isQuestionFilter ? answers.find(ans => ans.questionId == lastQuestion.id) : null
    let isToSkipSection = isQuestionFilter ? lastAnswer?.radioIndex == indexRadioFilter && lastQuestion.radios[indexRadioFilter].action == 0 && lastAnswer?.primaryValue == lastQuestion.radios[indexRadioFilter].value : nextStep.length == 0
    let isToSkipTwoSections = isQuestionFilter && !isToSkipSection ? lastAnswer?.radioIndex == indexRadioFilter && lastQuestion.radios[indexRadioFilter].action == 1 && lastAnswer?.primaryValue == lastQuestion.radios[indexRadioFilter].value : false 


    if (lastSection) {
      
      isFinished.current = true;

      let obj = {} as any;

      for (let index = 1; index < 19; index++) {
        obj["sec"+(index-1)] = answers.filter(ans => ans.type == 1 && ans.sectionId == index).reduce((a, {primaryValue}) => a + Number(primaryValue), 0).toString()
      }

      await useRegister('/form', {
        ...answer,
        answers,
        ...obj
      })
      navigate("/agradecimentos");
    }

    if (isToSkipTwoSections) {
      setCurrentSection(currentSection + 2)
    }
    else if (isToSkipSection) {
      setCurrentSection(currentSection + 1)
      setActualStep(null)
    }
    else if (!isToSkipSection) {
      setActualStep(nextStep)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
    {answer? 
      <div className="flex flex-col justify-center items-center bg-slate-50">
        <form className="min-h-[84vh] max-w-4xl my-5" onSubmit={passSectionOrStep}>
          <h1 className='text-bluePurple-500 text-2xl font-bold ml-2'>{sections ? sections[currentSection].name : ""}</h1>
          <div className='my-3 ml-2'>
            {sections ? generateProgress(): ""}
          </div>
          <hr />
          {isFetching && <span>Carregando...</span>}
          {generateQuestions()}

          <div className='flex flex-col  mx-1'>
            {sections ? <Button value={lastSection && nextStep.length == 0 ? 'Finalizar' : 'Continuar'} /> : ""}
          </div>
        </form>
      </div>
      :
      setAnswer(undefined)
      }
    </>
  )
}