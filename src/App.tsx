import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Toaster } from 'react-hot-toast';

import { AnswerContext } from './contexts/answer';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { Home } from './pages/Home';
import { CheckAge } from './pages/CheckAge';
import { DownloadExcel } from './pages/DownloadExcel';
import { Acknowledgment } from './pages/Acknowledgment';
import { Sociodemographic } from './pages/Sociodemographic';


function App() {
  let answerObj = {
    matricula: null,
    email: null,
    idade: null,
    sexo: null,
    curso: null,
    anoCurso: null,
    semestre: null,
    renda: null,
    apoioFamiliar: null,
    relacionamento: null,
    antissocial: null,
    autoavaliacao: null,
    desistirCurso: null,
    horasEstudo: null,
  }
  
  const [answer, setAnswer] = useState<any>(answerObj);
  const [checkAge, setCheckAge] = useState<boolean>();


  return (
    <div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <Header />
      <AnswerContext.Provider value={{ checkAge, setCheckAge ,answer}}>
        <Router>
          <Routes>
            <Route path='/' element={<CheckAge />} />
            <Route path='/sociodemografico' element={<Sociodemographic />} />
            <Route path='/questoes' element={<Home />} />
            <Route path='/agradecimentos' element={<Acknowledgment />} />
            <Route path='/baixar-excel' element={<DownloadExcel />} />
          </Routes>
        </Router>
      </ AnswerContext.Provider>
      <Footer />
    </div >
  )

}

export default App