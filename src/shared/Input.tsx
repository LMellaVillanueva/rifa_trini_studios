import React from 'react'

type Props = {
    type: string
    label: string
    name: string
    value: string
    onChange: React.ChangeEventHandler<HTMLInputElement>
    maxLength: number
    required: boolean
}

const Input = ({ type, label, name, value, onChange, maxLength, required }: Props) => {
  return (
        <div className='flex flex-col items-start gap-2'>
            <label htmlFor={name}>{label}</label>
            <input 
            type={type}
            name={name}
            className='border-2 border-lime-400 text-lg w-full rounded-lg p-0.5'
            value={value}
            onChange={onChange}
            maxLength={maxLength}
            required={required}
            />
        </div>
  )
}

export default Input