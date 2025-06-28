'use client';

import {useState} from 'react';
import {ChevronLeft, ChevronRight, Plus} from 'lucide-react';

const daysOfWeek = [
  'понедельник', 'вторник', 'среда',
  'четверг', 'пятница', 'суббота', 'воскресенье'
];

const Schedule = () => {
  const [weekOffset, setWeekOffset] = useState(0);

  const getWeekDates = () => {
    const start = new Date();
    start.setDate(start.getDate() - start.getDay() + 1 + weekOffset * 7);
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return date;
    });
  };

  const weekDates = getWeekDates();

  return (
    <div className="bg-white text-grey p-3 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-7">
        <button onClick={() => setWeekOffset(weekOffset - 1)}>
          <ChevronLeft className="w-5 h-5"/>
        </button>
        <h2 className="text-lg">
          Неделя {weekDates[0].toLocaleDateString('ru-RU')}
        </h2>
        <button onClick={() => setWeekOffset(weekOffset + 1)}>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {weekDates.map((date, i) => (
          <div key={i} className="bg-gray-100 rounded-xl p-4 flex justify-between items-center">
            <span>
              {daysOfWeek[i]} {date.getDate()} апр.
            </span>
            <button className="flex items-center bg-gray-200 px-5 py-2 rounded-xl">
              <Plus className="mr-2" size={16} /> План
            </button>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <button className="text-gray-400 text-sm underline"> Печать</button>
      </div>
    </div>
  );
};

export default Schedule;
