import React from 'react';
import { Link } from 'react-router-dom';

interface RadioBoxProps {
    id?  : string;
    name? : string;
    label : string;
    value? : string;
    onChange? : () => void;
    defaultChecked? : boolean;
    disabled? : boolean;
}

const RadioBox:React.FC<RadioBoxProps> = ({id, name, label, value, defaultChecked, disabled, onChange}) => {
    return (
        <>
            <span className="inpRadio">
                <input type="radio" id={id} name={name} value={value} defaultChecked={defaultChecked} disabled={disabled} onChange={onChange} />
                <label htmlFor={id}><span>{label}</span></label>
            </span>
        </>
    )
}

export default RadioBox;