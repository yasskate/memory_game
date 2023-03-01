import { FC } from 'react'
import { CardContainer } from '../../styles/card'
import { CardProps } from '../../entities/card'

const Card: FC<CardProps> = card => {

  return (
    <CardContainer>
       <img src={card.image} alt='tsdaf' />
    </CardContainer>
  )
}

export default Card

