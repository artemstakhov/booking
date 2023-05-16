import React, { useState } from 'react';
import {faCircleMinus, faCirclePlus} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './dish-card.sass';

function DishCard(props) {
  const { ingredients } = props;

  const formatData = (item) => {
    const { name, quantity, unit } = item;
    const unitText = unit === 'piece' ? 'p' : 'g';
    return `${name}(${quantity}${unitText})`;
  };

  const formattedList = ingredients.map(formatData).join(', ');

  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const calculatePrice = () => {
    if (count === 0) {
      return props.price;
    } else {
      return props.price * count;
    }
  };

  return (
    <div className="dish-card__wrapper">
      <div className="dish-card__img">
        <img src={props.image} alt={`Dish ${props.name}`} />
      </div>
      <div className="dish-card__name">{props.name}</div>
      <div className="dish-card__descr">{props.description}</div>
      <div className="dish-card__ingr">{formattedList}</div>
      <div className="dish-card__price">{calculatePrice()}</div>
      <div className="dish-card__count">
        <div className="count-btn" onClick={handleDecrement}><FontAwesomeIcon icon={faCircleMinus} /></div>
        <div className="count-value">{count}</div>
        <div className="count-btn" onClick={handleIncrement}><FontAwesomeIcon icon={faCirclePlus} /></div>
      </div>
    </div>
  );
}

export default DishCard;
