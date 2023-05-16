import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/header/header';
import Carousel from 'react-bootstrap/Carousel';
import DishCard from './dish-card/dish-card';
import './rest-page.sass';

function RestPage() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState([]);
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const restaurantResponse = await axios.get(`http://localhost:3002/restaurant/${id}`);
        setRestaurant(restaurantResponse.data);
  
        const dishResponses = await Promise.all(
          restaurantResponse.data.dishes.map((dishId) => axios.get(`http://localhost:3002/dish/${dishId}`))
        );
        const dishData = dishResponses.map((res) => res.data);
        setDishes(dishData);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [id]);

  // Функция для открытия ссылки на Google Maps
  const openGoogleMaps = () => {
    const address = encodeURIComponent(restaurant.address);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${address}`;
    window.open(googleMapsUrl, '_blank');
  };

  // Функция для форматирования ссылки почты
  const formatEmail = (email) => {
    const formattedEmail = `mailto:${email}`;
    return formattedEmail;
  };

  return (
    <>
      <Header page='rest' />
      <div className="rest-info__wrapper">
        <div className="rest-info__name">
          {restaurant.name}
        </div>
        <div className="rest-info__descr">
          {restaurant.description}
        </div>
        <div className="rest-info__address">
          <a href="#" onClick={openGoogleMaps}>{restaurant.address}</a>
        </div>
        <div className="rest-info__phone">
          <a href={`tel:${restaurant.phone}`}>{restaurant.phone}</a>
        </div>
        <div className="rest-info__email">
          <a href={formatEmail(restaurant.email)}>{restaurant.email}</a>
        </div>
        <div className="rest-info__rating">
          {restaurant.rating}
        </div>
        <button className="rest-info__btn">
          Забронювати стіл
        </button>
      </div>
      <div className="rest-img-slider__wrapper">
        <Carousel interval={10000}>
          {restaurant.photos && restaurant.photos.map((photo, index) => (
            <Carousel.Item key={index}>
              <img className="rest-img-slider__item" src={`${photo}`} alt={`Photo ${index + 1}`} />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      {dishes.length > 0 && (
        <div className="dish-cards__wrapper">
          {dishes.map((dish) => (
            <DishCard
              key={dish.id}
              image={dish.image}
              name={dish.name}
              description={dish.description}
              ingredients={dish.ingredients}
              price={dish.price}
            />
          ))}
        </div>
      )}

    </>
  );

}

export default RestPage;
