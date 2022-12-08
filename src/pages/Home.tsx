import { useEffect, useState, FormEvent, useContext, useRef } from 'react';
import { Button } from '../components/Button';
import { RadioGroupDemo } from '../components/radioGroup/RadioGroup';
import { useFetch } from '../hooks/useFetch';
import { useRegister } from '../hooks/useRegister';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { TextField } from '../components/TextField';
import { AnswerContext } from '../contexts/answer';

interface Answer {
  questionId: string;
  primaryValue: string;
  secondaryValue: string;
  radioIndex: string;
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
  const { answer, setAnswer } = useContext(AnswerContext);
  
  const navigate = useNavigate();

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
        if (answers.findIndex(ans => ["75", "69"].includes(ans.questionId)) > 0) {
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

  function generateQuestions() {
    if (!currentStep) return;
    return currentStep.map((question: any) => {
      switch (question.type) {
        case 0:
          return <TextField label={question.label} key={question.id} questionId={question.id} onAnswer={(answer: Answer) => handleAnswers(answer)} />
        case 1:
          return <RadioGroupDemo label={question.label} values={question.radios} questionId={question.id} onAnswer={(answer: Answer) => handleAnswers(answer)} key={question.id} questionDescription={question.description} />
        case 2:
          return <RadioGroupDemo label={question.label} values={question.radios} questionId={question.id} onAnswer={(answer: Answer) => handleAnswers(answer)} key={question.id} showRadioWithChildren={true} questionDescription={question.description} />
        case 3:
          return <RadioGroupDemo label={question.label} values={question.radios} questionId={question.id} onAnswer={(answer: Answer) => handleAnswers(answer)} showDescription={true} key={question.id} questionDescription={question.description} />
      }
    })
  }


  function handleAnswers(answer: Answer) {
    const indexAnswer = answers.findIndex(ans => ans.questionId === answer.questionId);
    if (indexAnswer > -1) answers[indexAnswer] = answer;
    else answers.push(answer);

    setAnswers(answers)
  }


  async function passSectionOrStep(event: FormEvent) {
    event.preventDefault();


    //Valida se todas as questoes foram respondidas, incluindo o campo secundario se houver
    if (sections) {
      if (answers.findIndex(ans => [null, "", []].includes(ans.primaryValue)) >= 0) return toast.error("Por favor preencha todos os campos"); // se estiver faltando questão sem resposta

      let questionsWithSecondaryValue = sections[currentSection].questions.filter((question: any) => [2, 3].includes(question.type)).map((question: any) => ({ id: question.id, firstRadioValue: question.radios[0].value }))
      if (questionsWithSecondaryValue.findIndex((q: any) => answers.findIndex(ans => (ans.questionId == q.id && ans.primaryValue != q.firstRadioValue && !ans.secondaryValue)) >= 0) >= 0) return toast.error("Por favor preencha todos os campos");
    }

    let lastQuestion = currentStep[currentStep.length - 1];
    let indexRadioFilter = lastQuestion.radios.findIndex((radio: any) => radio.action != null)
    let isQuestionFilter = indexRadioFilter >= 0

    let lastAnswer = isQuestionFilter ? answers.find(ans => ans.questionId == lastQuestion.id) : null
    let isToSkipSection = isQuestionFilter ? lastAnswer?.radioIndex == indexRadioFilter && lastQuestion.radios[indexRadioFilter].action == 0 && lastAnswer?.primaryValue == lastQuestion.radios[indexRadioFilter].value : nextStep.length == 0
    let isToSkipTwoSections = isQuestionFilter && !isToSkipSection ? lastAnswer?.radioIndex == indexRadioFilter && lastQuestion.radios[indexRadioFilter].action == 1 && lastAnswer?.primaryValue == lastQuestion.radios[indexRadioFilter].value : nextStep.length == 0


    if (lastSection) {
      await useRegister('/form', {
        enrollment: "123123",
        email: "teste@gmail.com",
        answers
      })
      navigate("/agradecimentos");
    }

    if (isToSkipTwoSections) {
      setCurrentSection(currentSection + 2)
      setActualStep(null);
    }

    if (isToSkipSection) {
      setCurrentSection(currentSection + 1)
      setActualStep(null);
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
        <form className="min-h-[84vh] max-w-5xl mt-5 mb-5" onSubmit={passSectionOrStep}>
          <h1 className='text-bluePurple-500 text-2xl font-bold'>{sections ? sections[currentSection].name : ""}</h1>
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