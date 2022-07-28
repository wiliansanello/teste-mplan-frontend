import React, {useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver} from '@hookform/resolvers/yup'
import InputMask from 'react-input-mask'

const schema = yup.object().shape({
  name: yup.string().required('*Campo obrigatório'),
  cellphone: yup
    .string()
    .required('*Campo obrigatório'),
  birth: yup 
    .string()
    .required('*Campo obrigatório'),
  email: yup
    .string()
    .required('*Campo obrigatório')
    .email('*Preencha um e-mail válido')
})

const Registration = () =>{
  const {register, watch, handleSubmit, setValue, formState: {errors}
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  useEffect(()=> {
    const loadData = async () => {
      const data = await fetch('http://localhost:3001/record-form')
      /*const json = await data.json()

      setValue('name', json.name)
      setValue('phone', json.phone)
      setValue('cellphone', json.cellphone)
      setValue('birth', json.birth)
      setValue('email', json.email)
      setValue('profile',json.profile)*/
    }
    //loadData()
  }, [])
  const onSubmit = async (values) => {
    const data = await fetch('http://localhost:3001/record-form', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application-json'
      },
      body: JSON.stringify(values)      
    })
    const json = await data.json()
    console.log(json)
  }
  
  const [sucess, setSucess] = useState(false)

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
    {!sucess && <div className="w-1/5 mx-auto my-6">
      <label>
        Nome
        {errors?.name && <p className="text-red-500">{errors.name.message}</p>}
        <input 
          type='text' {...register('name')}          
          className="p-2 bg-teal-100 my-2 rounded"
          name="name"
          />          
      </label>
      <label>
        Telefone
        <InputMask 
          mask='(99)9999-9999' {...register('phone')}
          className='p-2 bg-teal-100 my-2 rounded'
          name='phone'
          />
      </label>
      <label>
        Celular
        {errors?.cellphone && <p className="text-red-500">{errors.cellphone.message}</p>}
        <InputMask 
          mask='(99)99999-9999' {...register('cellphone')}
          className='p-2 bg-teal-100 my-2 rounded'
          name='cellphone'
          />          
      </label>
      <label>
        Data de nascimento
        {errors?.birth && <p className="text-red-500">{errors.birth.message}</p>}
        <input 
          type='text' {...register('birth')}
          className='p-2 bg-teal-100 my-2 rounded'
          name='birth'
          />
      </label>
      <label>
        E-mail
        {errors?.email && <p className="text-red-500">{errors.email.message}</p>}
        <input 
          type='text' {...register('email')}
          className='p-2 bg-teal-100 my-2 rounded'
          name="email"
          />
      </label>
      <label>
        Perfil do usuário
        <input 
          type="text" {...register('profile')}
          className="p-2 bg-teal-100 my-2 rounded"
          name="profile"
          />
      </label>
      <button
        type='submit'
        method='post'
        className="bg-cyan-400 px-8 py-4 my-2 font-bold rounded-lg hover:shadow"
        name="salvar">
        Salvar
      </button>
      <button
        className="bg-cyan-400 px-4 py-4 mx-4 my-2 font-bold rounded-lg hover:shadow"
        name="cancelar">
        Cancelar
        </button> 
    </div>}
    </form>
    </>
  )
}

export default Registration