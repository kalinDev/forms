import { useState, FormEvent } from 'react';

import { InputText } from '../components/InputText';
import { Button } from '../components/Button';

import axios from 'axios';
import '../styles/main.css';

export function DownloadExcel() {

  const [user, setUser] = useState<string>();
  const [password, setPassword] = useState<string>();


  async function handleForm(event: FormEvent) {
    event.preventDefault();

    if (!user || !password) {
      return;
    }
    try {
      await axios.get(` http://localhost:90/form-excel/${user}/${password}`, {
        responseType: 'blob'
      })
        .then((result) => {
          var binaryData = [];
          binaryData.push(result.data);
          var href = window.URL.createObjectURL(new Blob(binaryData, { type: "application/xlsx" }))

          const link = document.createElement('a');
          link.href = href;
          link.setAttribute('download', 'file.xlsx');
          document.body.appendChild(link);
          link.click();

          document.body.removeChild(link);
          URL.revokeObjectURL(href);
        });


      alert('Excel baixado com sucesso!');
    } catch (error) {
      alert('Erro ao baixar excel!');
    }
  }

  return (
    <div className='bg-slate-50 min-h-screen mx-auto flex flex-col justify-center items-center'>

      <h1 className='text-bluePurple-500 text-4xl text-center font-bold'>ENTREVISTA CLÍNICA</h1>
      <h1 className='text-bluePurple-500 text-4xl text-center font-bold'>ESTRUTURADA</h1>

      <form onSubmit={handleForm} className='flex flex-col'>
        <InputText
          label='Usuário'
          placeholder='Informe seu usuário'
          value={user}
          onChange={(e) => setUser(e.target.value)} />

        <InputText
          label='Senha'
          type="password"
          placeholder='Informe sua senha'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button value='Baixar Excel' />
      </form>

    </div>
  )
};