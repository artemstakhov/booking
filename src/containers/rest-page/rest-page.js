import { useParams } from 'react-router-dom';
import './rest-page.sass';
import { useEffect, useState } from 'react';
import axios from 'axios';

function RestPage() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/restaurant/${id}`);
        setRestaurant(response.data); // Обратите внимание, что здесь используется response.data
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  console.log(restaurant); // Вызов console.log внутри useEffect

  return (
    <>
      <p>{restaurant}</p>
    </>
  );
}

export default RestPage;
