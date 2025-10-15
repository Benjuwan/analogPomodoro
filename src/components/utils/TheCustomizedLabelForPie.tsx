import { JSX, useContext } from "react";
import { PomodoroTimeContext } from "../../providers/PomodoroTimeContext";

type propsCustomizedLabelType = {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent?: number;
    index?: number;
};

type renderCustomizedLabelType = (props: propsCustomizedLabelType) => JSX.Element | undefined;

/* `renderCustomizedLabel`属性値：ポモドーロタームの角度数値を確認したいデバック用途（`Pie`コンポーネントの`label`属性に指定する）*/
// [公式ドキュメント](https://recharts.org/en-US/examples/PieChartWithCustomizedLabel)の例示コードでは`renderCustomizedLabel`（※ここでは`TheCustomizedLabelForPie`）の型に`any`を指定している
export const TheCustomizedLabelForPie: renderCustomizedLabelType = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    index
}: propsCustomizedLabelType) => {
    const { pomodoroTime } = useContext(PomodoroTimeContext);

    const data = [
        { name: 'breakTime', value: pomodoroTime.breakStartTime },
        { name: 'focusTime', value: pomodoroTime.focus_reStartTime },
        { name: 'remands', value: 180 - (pomodoroTime.focus_reStartTime + pomodoroTime.breakStartTime) }
    ];

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (typeof index === 'undefined') {
        return;
    }

    return (
        <text x={x} y={y} fill="#fff" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {data[index].value}
        </text>
    );
};