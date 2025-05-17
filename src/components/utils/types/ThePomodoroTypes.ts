// 以下の各timeプロパティは、`src\components\utils\ThePie.tsx`のポモドーロ視覚UIの設置（表示）角度を担う役割も持つため
// `src\components\utils\SelectTerm.tsx`にて *6 した数値が格納される
export type setPomodoroTimeType = {
    focus_reStartTime: number;
    breakStartTime: number;
};