import { useState } from 'react';

import './styles/main.css';

import { LabelForm } from './components/Label';
import { InputText } from './components/InputText';
import { Button } from './components/Button';

function App() {
  
  



  return (
    <div className='bg-black min-h-screen mx-auto flex flex-col justify-center items-center'>

      <h1 className='text-bluePurple-500 text-4xl font-bold'>ENTREVISTA CLÍNICA ESTRUTURADA</h1>


      {/* <h1 className='text-bluePurple-500 text-4xl font-bold'>É O FORMS</h1>

      <div className='flex flex-col'>
        <LabelForm label='Usuário' />
        <InputText placeholder='Informe seu usuário' />

        <LabelForm label='Senha' />
        <InputText type="password" placeholder='Informe sua senha' />

        <Button value='Login' />
      </div> */}

    </div>
  )
}

export default App
