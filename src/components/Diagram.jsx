import React from 'react'
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Diagram = ({ totalIncome, totalExpense, totalBalance }) => {
    // Проверяем, равны ли все значения 0
    const isAllZero = totalIncome === 0 && totalExpense === 0 && totalBalance === 0;

    const data = {
        labels: ['Ümumi mədaxil', 'Ümumi xərc', 'Ümumi balans'],
        datasets: [
            {
                data: isAllZero 
                    ? [0.01, 0.01, 0.01]  // Добавляем фиктивные значения
                    : [totalIncome, totalExpense, totalBalance],
                backgroundColor: [
                    'oklch(0.723 0.219 149.579)',
                    'oklch(0.637 0.237 25.331)',
                    'oklch(0.623 0.214 259.815)'
                ],
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        if (isAllZero) return `${tooltipItem.label}: 0`;
                        return `${tooltipItem.label}: ${tooltipItem.raw}`;
                    }
                }
            }
        }
    };

    return (
        <Pie data={data} options={options} className='mx-auto' />
    )
}

export default Diagram;
