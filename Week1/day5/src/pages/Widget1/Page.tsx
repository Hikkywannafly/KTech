import React, { useState } from 'react';

const buttons = [
    ['7', '8', '9', '÷'],
    ['4', '5', '6', '×'],
    ['1', '2', '3', '-'],
    ['0', '.', 'C', '+'],
];

const Calculator: React.FC = () => {
    const [expression, setExpression] = useState('');
    const [result, setResult] = useState<string | null>(null);

    const isOperator = (val: string) => ['+', '-', '×', '÷'].includes(val);

    const handleButtonClick = (val: string) => {
        if (val === 'C') {
            setExpression('');
            setResult(null);
            return;
        }
        if (val === '=') {
            try {
                let exp = expression.replace(/×/g, '*').replace(/÷/g, '/');

                if (/\/0(?!\d)/.test(exp)) {
                    setResult('Error');
                } else {

                    const evalResult = eval(exp);
                    setResult(evalResult.toString());
                }
            } catch {
                setResult('Error');
            }
            return;
        }

        if (val === '.') {
            const parts = expression.split(/[-+×÷]/);
            const last = parts[parts.length - 1];
            if (last.includes('.')) return;
        }

        if (isOperator(val)) {
            if (expression === '' || isOperator(expression.slice(-1))) return;
        }
        setResult(null);
        setExpression(expression + val);
    };

    return (
        <div className="bg-white border-2 border-gray-200 rounded-xl p-5 w-[260px] mx-auto mt-8 shadow-md">
            <div className="h-12 bg-gray-50 border border-gray-300 rounded mb-4 text-xl flex items-center justify-end px-3 overflow-x-auto">
                {result !== null ? result : expression || '0'}
            </div>
            <div className="grid grid-cols-4 gap-3 mb-4">
                {buttons.flat().map((btn) => (
                    <button
                        key={btn}
                        className={
                            isOperator(btn)
                                ? 'bg-yellow-400 text-gray-900 text-lg rounded-lg py-4 transition hover:bg-yellow-500'
                                : btn === 'C'
                                    ? 'bg-red-500 text-white text-lg rounded-lg py-4 transition hover:bg-red-600'
                                    : 'bg-black text-white text-lg rounded-lg py-4 transition hover:bg-gray-800'
                        }
                        onClick={() => handleButtonClick(btn)}
                    >
                        {btn}
                    </button>
                ))}
            </div>
            <button
                className="bg-green-400 text-white text-xl rounded-lg py-4 w-full transition hover:bg-green-500"
                onClick={() => handleButtonClick('=')}
            >
                =
            </button>
        </div>
    );
};

const Page: React.FC = () => <Calculator />;

export default Page;
