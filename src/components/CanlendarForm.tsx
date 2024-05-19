'use client';
import { useState } from 'react';
import Calendar from 'react-calendar';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CalendarFormProps {
  date: Value;
  setDate: React.Dispatch<React.SetStateAction<Value>>;
}

const CalendarForm: React.FC<CalendarFormProps> = ({ date, setDate }) => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div>
      <Calendar onChange={setDate} value={date} />
    </div>
  );
}

export default CalendarForm;