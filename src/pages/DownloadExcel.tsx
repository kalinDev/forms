import { useState, FormEvent } from 'react';

import { InputText } from '../components/InputText';
import { Button } from '../components/Button';

import { api } from "../lib/axios";
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
      await api.get(`form-excel/${user}/${password}`, {
        headers: {"Content-Security-Policy": "upgrade-insecure-requests"},
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
    <div className='bg-slate-100 min-h-[83vh] mx-auto flex flex-col justify-center items-center'>

      <h1 className='text-bluePurple-500 text-4xl text-center font-bold'>
        ENTREVISTA CLÍNICA
      </h1>
      <h1 className='text-bluePurple-500 text-4xl text-center font-bold'>
        ESTRUTURADA
      </h1>

      <form onSubmit={handleForm} className='flex flex-col w-1/5 max-[1101px]:w-auto mt-5'>
        <label className='text-zinc-800 font-semibold'>Usuário:</label>
        <input
          className='p-3 mt-2 border-solid border-2 border-gray-300
          hover:border-gray-500 focus:border-gray-500 rounded-lg'
          type="text"
          placeholder='Informe seu usuário'
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />

        <label className='text-zinc-800 font-semibold mt-3'>Senha:</label>
        <input
          className='p-3 mt-2 border-solid border-2 border-gray-300
          hover:border-gray-500 focus:border-gray-500 rounded-lg'
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