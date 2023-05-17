import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import Header from '../../components/header/header';
import Carousel from 'react-bootstrap/Carousel';
import DishCard from './dish-card/dish-card';
import './rest-page.sass';

function RestPage() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [dishes, setDishes] = useState([]);
  const [total_price, settotal_price] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const restaurantResponse = await axios.get(`http://localhost:3002/restaurant/${id}`);
        setRestaurant(restaurantResponse.data);

        const dishResponses = await Promise.all(
          restaurantResponse.data.dishes.map((dishId) => axios.get(`http://localhost:3002/dish/${dishId}`))
        );
        const dishData = dishResponses.map((res) => ({ ...res.data, id: res.data._id, count: 0 }));

        setDishes(dishData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const openGoogleMaps = () => {
    const address = encodeURIComponent(restaurant.address);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${address}`;
    window.open(googleMapsUrl, '_blank');
  };

  const formatEmail = (email) => {
    const formattedEmail = `mailto:${email}`;
    return formattedEmail;
  };

  const uniqueCategories = [...new Set(dishes.map((dish) => dish.category))];

  const handleOrder = () => {
    const user = 'your_user_id'; // Замените на фактический id пользователя
  
    // Получение текущей даты
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const order = {
      user,
      dishes: dishes
        .filter((dish) => dish.count >= 1)
        .map((dish) => ({ id: dish.id, count: dish.count })),
      total_price,
      data: currentDate // Добавление свойства data с днем заказа
    };
  
    console.log(order); // Вывод объекта заказа в консоль (для тестирования)
    // Отправка заказа на сервер - добавьте соответствующий код здесь
  };
  

  const handleCountChange = (dishId, dishCount) => {
    setDishes((prevDishes) =>
      prevDishes.map((prevDish) => {
        if (prevDish.id === dishId) {
          return { ...prevDish, count: dishCount };
        }
        return prevDish;
      })
    );
  };


  useEffect(() => {
    const total_price = dishes.reduce((total, dish) => {
      return total + dish.price * dish.count;
    }, 0);
    settotal_price(total_price);
  }, [dishes]);



  return (
    <>
      <Header page='rest' />
      <div className="rest-info__wrapper">
        <div className="rest-info__name">{restaurant.name}</div>
        <div className="rest-info__descr">{restaurant.description}</div>
        <div className="rest-info__address">
          <a href="#" onClick={openGoogleMaps}>
            {restaurant.address}
          </a>
        </div>
        <div className="rest-info__phone">
          <a href={`tel:${restaurant.phone}`}>{restaurant.phone}</a>
        </div>
        <div className="rest-info__email">
          <a href={formatEmail(restaurant.email)}>{restaurant.email}</a>
        </div>
        <div className="rest-info__rating">{restaurant.rating}</div>
        <button className="rest-info__btn">
          Забронювати стіл
        </button>
      </div>
      
      <div className="rest-img-slider__wrapper">
        <Carousel interval={10000}>
          {restaurant.photos &&
            restaurant.photos.map((photo, index) => (
              <Carousel.Item key={index}>
                <img className="rest-img-slider__item" src={`${photo}`} alt={`Photo ${index + 1}`} />
              </Carousel.Item>
            ))}
        </Carousel>
      </div>
      {dishes.length > 0 && (
        <div className="dish-cards__wrapper accordion-container">
          {uniqueCategories.map((category) => (
            <Accordion key={category}>
              <AccordionSummary expandIcon={<ExpandMore />} aria-controls={`${category}-content`} id={`${category}-header`}>
                <Typography>{category}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="dish-cards__wrapper">
                  {dishes
                    .filter((dish) => dish.category === category)
                    .map((dish) => {
                      const dishCopy = { ...dish };
                      return (
                        <DishCard
                          key={dishCopy.id}
                          dish={dishCopy}
                          handleCountChange={handleCountChange}
                          dishCount={dishCopy.count} // Замените dishCopy.count на dishCount
                        />

                      );
                    })}
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      )}
      <button className="rest-info__btn" onClick={handleOrder}>
        Order
      </button>
      <div className="rest-info__total-price">Total Price: {total_price}</div>
    </>
  );
}

export default RestPage;
