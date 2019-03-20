import React, { useState } from 'react';
import moment from 'moment';
import $ from 'jquery';
import classnames from 'classnames';
import { useTitle, useDay, useWeek } from '../hooks';
import { daysOfWeek, months } from '../default';
import './WeekCalendar.css';


const WeekCalendar = ({ onDayChange, onWeekChange }) => {
  const defaultStart = moment().add(0, 'weeks').startOf('isoWeek');
  const defaultEnd = moment().add(0, 'weeks').endOf('isoWeek');
  const [pageIndex, setPageIndex] = useState(0);
  const [title, setTitle] = useTitle(months[defaultEnd.month()]);
  const [selectedDay, setCurrentDay] = useDay(moment());
  const [{ startOfWeek, endOfWeek }, setWeek] = useWeek({ startOfWeek: defaultStart, endOfWeek: defaultEnd });

  const isActiveDay = (day) => {
    return moment(selectedDay).format('DD-MM-YYYY') === moment(day).format('DD-MM-YYYY');
  };
  const isInvalidDay = (day) => {
    return moment(day).isBefore(moment(), 'day');
  };
  const renderWeek = () => {
    const days = [];
    let day = startOfWeek;
    while (day <= endOfWeek) {
      days.push(day.toDate());
      day = day.clone().add(1, 'd');
    }

    return days;
  };
  const convertToDate = (day) => {
    return moment(day).date();
  };
  const handleDayChange = (day) => {
    onDayChange(day);
    if (isInvalidDay(day)) {
      return;
    }
    return setCurrentDay(day);
  };
  const moveLeft = () => {
    $('#w-week-calendar__slider .w-week-calendar__slider-list').animate({
      left: +270,
    }, 100, () => {
      $('#w-week-calendar__slider .w-week-calendar__slider-list li:last-child')
        .prependTo('#w-week-calendar__slider .w-week-calendar__slider-list');
      $('#w-week-calendar__slider .w-week-calendar__slider-list').css('left', '');
    });
  };
  const moveRight = () => {
    $('#w-week-calendar__slider .w-week-calendar__slider-list').animate({
      left: -270,
    }, 100, () => {
      $('#w-week-calendar__slider .w-week-calendar__slider-list li:first-child')
        .appendTo('#w-week-calendar__slider .w-week-calendar__slider-list');
      $('#w-week-calendar__slider .w-week-calendar__slider-list').css('left', '');
    });
  };
  const nextWeek = () => {
    const startOfWeek = moment().add(pageIndex + 1, 'weeks').startOf('isoWeek');
    const endOfWeek = moment().add(pageIndex + 1, 'weeks').endOf('isoWeek');
    onWeekChange({ startOfWeek, endOfWeek });
    setPageIndex(pageIndex + 1);
    setWeek(pageIndex + 1);
    setTitle(endOfWeek);
    moveRight();
  };
  const prevWeek = () => {
    if (pageIndex === 0) {
      return;
    }
    const startOfWeek = moment().add(pageIndex - 1, 'weeks').startOf('isoWeek');
    const endOfWeek = moment().add(pageIndex - 1, 'weeks').endOf('isoWeek');
    onWeekChange({ startOfWeek, endOfWeek });
    setPageIndex(pageIndex - 1);
    setWeek(pageIndex - 1);
    setTitle(endOfWeek);
    moveLeft();
  };

  const leftArrowClasses = classnames('w-week-calendar__switcher w-week-calendar__switcher--left', {
    'w-week-calendar--hidden': pageIndex === 0,
  });
  const weekClasses = day => classnames('w-week-calendar__day', {
    'w-week-calendar__day--active': isActiveDay(day),
    'w-week-calendar__day--invalid': isInvalidDay(day),
  });
  return (
    <div className="w-week-calendar">
      <span className={leftArrowClasses} onClick={prevWeek}>
        <i className="w-week-calendar__switcher-icon fa fa-angle-right" />
      </span>
      <div className="w-week-calendar__year">
        <div className="w-week-calendar__year-title">
          {title}
        </div>
      </div>
      <div className="w-week-calendar__weeks">
        <ul className="w-week-calendar__weeks-list">
          { daysOfWeek.map((day, index) => <li key={index} className="w-week-calendar__weeks-list-item">{ day }</li>) }
        </ul>
      </div>
      <div id="w-week-calendar__slider" className="w-week-calendar__slider">
        <ul className="w-week-calendar__slider-list">
          {[1, 2, 3].map((slide, index) => {
            return (
              <li key={index}>
                {renderWeek().map((day, index) => (
                  <div key={index}  className={weekClasses(day)} onClick={() => handleDayChange(day)}>
                  { convertToDate(day) }
                  </div>
                ))}
              </li>
            );
          })}
        </ul>
      </div>
      <span className="w-week-calendar__switcher w-week-calendar__switcher--right" onClick={nextWeek}>
        <i className="w-week-calendar__switcher-icon fa fa-angle-right" />
      </span>
    </div>
  )
};

export default WeekCalendar;
