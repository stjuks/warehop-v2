import React, { useState } from 'react';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';

const DateInput = ({ name, setFieldValue, value }) => {
    const [isFocused, setFocused] = useState(false);

    return (
        <SingleDatePicker
            date={value}
            focused={isFocused}
            onFocusChange={({ focused }) => setFocused(focused)}
            id={name}
            onDateChange={date => setFieldValue(name, date)}
        />
    );
};

export default DateInput;