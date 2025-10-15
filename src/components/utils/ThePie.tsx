import { PieChart, Pie, Cell } from 'recharts';
import { memo, useContext } from 'react';
import { PomodoroTimeContext } from '../../providers/PomodoroTimeContext';
// import { TheCustomizedLabelForPie as renderCustomizedLabel } from './TheCustomizedLabelForPie';

export const ThePie = memo(() => {
  const { pomodoroTime } = useContext(PomodoroTimeContext);

  const data = [
    { name: 'breakTime', value: pomodoroTime.breakStartTime },
    { name: 'focusTime', value: pomodoroTime.focus_reStartTime },
    { name: 'remands', value: 180 - (pomodoroTime.focus_reStartTime + pomodoroTime.breakStartTime) }
  ];

  /* 右（transparent）から始点 */
  const COLORS = ['#82ffa0', '#9debff', 'transparent'];

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={50}
        endAngle={180} // 180deg：常に半円（分度器・半月状態）で表示
        fill="#eaeaea"
        labelLine={false}
      // label={renderCustomizedLabel}
      >
        {data.map((_entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]} stroke='transparent' />
        ))}
      </Pie>
    </PieChart>
  );
});