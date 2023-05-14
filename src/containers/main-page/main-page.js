import React, { useState, useEffect } from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import './main-page.sass';

function MainPage() {
  const [value, setValue] = React.useState(dayjs());

  return (
    <>
      <Header page='main' />
      <div className="rest-list__wrapper">
        <div className="rest-list__filter">
          <label htmlFor="text-input">Текст:</label>
          <input type="text" id="text-input" placeholder="Введіть текст" />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Оберіть дату"
              value={value}
              onChange={(newValue) => setValue(newValue)}
              />
            </LocalizationProvider>
          <button>Пошук</button>
        </div>
        <ul className="rest-list">
          {/* Здесь будут элементы списка */}
        </ul>
      </div>
      <Footer />
    </>
  );
}

export default MainPage;
