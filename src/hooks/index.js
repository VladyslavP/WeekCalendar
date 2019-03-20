import { useState } from 'react';
import moment from 'moment';
import { months } from '../default';

export const useTitle = (initialState) => {
  const [title, setTitle] = useState(initialState);

  function toggleTitle(endOfWeek) {
    const month = moment(endOfWeek).month();
    const title = `${months[month]} ${moment(endOfWeek).format('YYYY')}`;
    setTitle(title);
  }

  return [
    title,
    toggleTitle,
  ];
};

export const useDay = (initialState) => {
  const [day, setDay] = useState(initialState);

  function toggleDay(day) {
    setDay(day);
  }

  return [
    day,
    toggleDay,
  ];
};

export const useWeek = (initialState) => {
  const [week, setWeek] = useState(initialState);

  function toggleWeek(pageIndex = 0) {
    const startOfWeek = moment().add(pageIndex, 'week').startOf('isoWeek');
    const endOfWeek = moment().add(pageIndex, 'week').endOf('isoWeek');
    setWeek({ startOfWeek, endOfWeek });
  }

  return [
    week,
    toggleWeek,
  ];
};
