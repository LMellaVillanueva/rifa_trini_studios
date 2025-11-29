import React from 'react'

type Props = {
    onClick: React.MouseEventHandler<HTMLButtonElement>
    text: string
}

const Button = ({ onClick, text }: Props) => {
  return (
    <button
    className='text-lime-400 border border-lime-400 px-[25px] py-3 w-38 rounded-2xl font-semibold cursor-pointer transition-colors duration-200
    hover:text-lime-100 hover:border-lime-100'
    onClick={onClick}>
        {text}
    </button>
  )
}

export default Button