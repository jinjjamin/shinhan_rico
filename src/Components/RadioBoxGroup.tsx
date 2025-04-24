import React from 'react';
import { Link } from 'react-router-dom';

/*  Components */
import RadioBox  from './RadioBox';

interface RadioBoxGroupProps {
    children : React.ReactNode;
}

const RadioBoxGroup:React.FC<RadioBoxGroupProps> = ({children}) => {
    return (
        <>
            <div className="radioList">
                {children}
            </div>
        </>
    )
}

export default RadioBoxGroup;