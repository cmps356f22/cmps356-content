import React, {useState} from 'react';

export default function Calculator() {
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [operation, setOperation] = useState('');

    const compute = () => {
        let result = NaN;
        const expression = `${num1}  ${operation}  ${num2}`;
        try {
            result = eval(expression);
        } catch (e) {
        }
        //console.log(result);
        return result;
    };

    return (
        <div className="align-center">
            <h1>Calculator</h1>
            <input type="text" value={num1} onChange={e => setNum1(e.target.value)} />
            <select id="operation" value={operation} onChange={e => setOperation(e.target.value)} style={{ margin : '8px' }}>
                <option></option>
                <option>+</option>
                <option>-</option>
                <option>*</option>
                <option>/</option>
            </select>
            <input type="text" value={num2} onChange={e => setNum2(e.target.value)}/>
            <br/><br/>
            <div>{num1} {operation} {num2} = {compute()} </div>
        </div>
    );
}