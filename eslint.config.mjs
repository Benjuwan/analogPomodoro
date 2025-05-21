import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

// 設定をエクスポート
export default [
    {
        // TypeScriptとTSXファイルに対する設定
        files: ["**/*.ts", "**/*.tsx"],
        // languageOptions： パーサーやその詳細なオプション設定、グローバル変数の定義、サポートするECMAScriptのバージョンなどを設定するプロパティ
        languageOptions: {
            parser: typescriptParser,       // TypeScriptパーサーの設定
            parserOptions: {
                ecmaVersion: "latest",      // 最新のECMAScript機能をサポート
                sourceType: "module",       // ESモジュール形式を使用
                ecmaFeatures: {
                    jsx: true               // JSX構文のサポートを有効化
                }
            }
        },
        // 使用するプラグインの設定
        plugins: {
            "@typescript-eslint": typescript,   // TypeScript用のESLintプラグイン
            react,                              // React用のESLintプラグイン
            "react-hooks": reactHooks           // React Hooks用のESLintプラグイン
        },
        // 各種ルールの設定
        rules: {
            /* Reactルール */
            "react/jsx-uses-react": "error",        // JSXコンポーネント内でのReactの適切な使用を確認
            "react/jsx-uses-vars": "error",         // JSX内での変数の使用状況を追跡
            "react-hooks/rules-of-hooks": "error",  // React Hooksのルールを厳格に適用（コンポーネントのトップレベルでのみ使用可能）
            "react-hooks/exhaustive-deps": "warn",  // useEffectの依存配列の検証（パフォーマンス最適化のため）
            /* TypeScriptルール */
            "@typescript-eslint/no-explicit-any": "warn",               // any型の使用を警告
            "@typescript-eslint/explicit-function-return-type": "off",  // 関数の戻り値型の明示を任意に設定
            "@typescript-eslint/no-unused-vars": "warn"                 // 未使用変数を警告
        }
    }
];
