import React from 'react'
import useSWR from 'swr'
import Link from 'next/link'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Index = () => {

  const extractDate = (birthDate) => {
    return birthDate.substring(8,10)+
          '/'+birthDate.substring(5,7)
          +'/'+birthDate.substring(0,4)
  }

  const selectedUser = () => {
    console.log(document.getElementById('1'))  
  }

  const { data, error } = useSWR('http://localhost:3001', fetcher)
  return (    
    <div>
      {!data && <p className='py-8'>Carregando...</p>}
      <div className='bg-cyan-500 p-2 shadow-md text-center'>
        <Link href='/registration'>
            <a className='px-2 hover:underline'>Incluir</a>
          </Link>
          <Link href='/search'>
            <a className='px-2 hover:underline'>Buscar</a>
          </Link>
          <Link href='/registration'>
            <a className='px-2 hover:underline'>Alterar</a>
          </Link>
          <Link href='/delete'>
            <a className='px-2 hover:underline'>Excluir</a>
          </Link>
      </div> 
      {data &&        
        <table className='mt-8 table-auto mx-auto'>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Celular</th>
              <th>Data Nascimento</th>
              <th>Email</th>
              <th>Perfil</th>
            </tr>          
             {data.map(reg => {
              let i = 1
              return (                               
               <tr className="hover:bg-sky-300" id={i} onClick={selectedUser()}>
                <td><input type='radio' ></input></td>
                <td>{reg.usr_id}</td>             
                <td>{reg.usr_nome}</td>
                <td>{reg.usr_telefone}</td>
                <td>{reg.usr_celular}</td>
                <td>{extractDate(reg.usr_nascimento)}</td>
                <td>{reg.usr_email}</td>
                <td>{reg.prf_descricao}</td>             
               </tr> 
             )
             i++}             
             )}          
        </table>
      }
    </div>
  )
}

export default Index