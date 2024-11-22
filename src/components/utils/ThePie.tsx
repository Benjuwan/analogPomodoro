import { PieChart, Pie, Cell } from 'recharts';
import { useContext } from 'react';
import { PomodoroTimeContext } from '../../providers/PomodoroTimeContext';

// type renderCustomizedLabelType = ({ cx, cy, midAngle, innerRadius, outerRadius, index }: {
//   cx: number;
//   cy: number;
//   midAngle: number;
//   innerRadius: number;
//   outerRadius: number;
//   index: number;
// }) => JSX.Element;

export const ThePie = () => {
  const { pomodoroTime } = useContext(PomodoroTimeContext);

  const data = [
    { name: 'breakTime', value: pomodoroTime.breakStartTime },
    { name: 'focusTime', value: pomodoroTime.focus_reStartTime },
    { name: 'remands', value: 180 - (pomodoroTime.focus_reStartTime + pomodoroTime.breakStartTime) }
  ];

  /* 右（transparent）から始点 */
  const COLORS = ['#82ffa0', '#9debff', 'transparent'];

  /* renderCustomizedLabel ：ポモドーロタームの角度数値を確認したいデバック用途の記述 */
  // const renderCustomizedLabel: renderCustomizedLabelType = ({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
  //   const RADIAN = Math.PI / 180;
  //   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  //   const x = cx + radius * Math.cos(-midAngle * RADIAN);
  //   const y = cy + radius * Math.sin(-midAngle * RADIAN);

  //   return (
  //     <text x={x} y={y} fill="#fff" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
  //       {data[index].value}
  //     </text>
  //   );
  // };

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
}