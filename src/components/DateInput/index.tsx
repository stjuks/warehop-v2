import React, { useState } from 'react';
import { SingleDatePicker } from 'react-dates';
import { FiCalendar } from 'react-icons/fi';
import moment from 'moment';

import { DateInputContainer } from './styles';

import Input from '../Input';

interface DateInputProps {
    name: string;
    setFieldValue: Function;
    value: moment.Moment;
    label: string;
}

const DateInput: React.FC<DateInputProps> = ({ name, setFieldValue, value, label }) => {
    const [isFocused, setFocused] = useState(false);

    return (
        <DateInputContainer>
            <Input value={value.format('DD.MM.YYYY')} icon={<FiCalendar />} label={label} readOnly={true} />
            <SingleDatePicker
                date={value}
                focused={isFocused}
                onFocusChange={({ focused }) => setFocused(focused)}
                id={name}
                onDateChange={date => setFieldValue(name, date)}
            />
        </DateInputContainer>
    );
};

export default DateInput;
