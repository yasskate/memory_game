import { FC } from 'react'
import { CardProps } from '../../entities/card'
import { CardContainer } from '../../styles/card'

export interface CardFCProps extends CardProps {
  handleSelectedCard: (card: CardProps) => void;
  disabled: boolean;
}

const Card: FC<CardFCProps> = props => {
  const { handleSelectedCard, disabled, ...card } = props
  const { cardId, isFaceUp, image, coverImage } = card

  const handleOnclick = () => {
    if (cardId) handleSelectedCard(card)
  }

  return (
    <CardContainer>
      <button className='card-button' onClick={handleOnclick} disabled={disabled}>
        <img className='card-image' src={isFaceUp ? image : coverImage} alt='tsdaf' />
      </button>
    </CardContainer>
  )
}

export default Card

