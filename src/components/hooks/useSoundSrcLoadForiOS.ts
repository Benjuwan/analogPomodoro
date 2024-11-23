import { useState } from "react";

export const useSoundSrcLoadForiOS = (
    startSoundRef: React.MutableRefObject<HTMLAudioElement | null>,
    doneSoundRef: React.MutableRefObject<HTMLAudioElement | null>
) => {
    const [isAudioLoaded, setIsAudioLoaded] = useState(false);

    /* 音声再生に関してはiOSの制限が厳しいため明示的かつ確実に音声ファイルのロードを試みる */
    const loadAudio: () => Promise<void> = async () => {
        try {
            /**
             * load メソッドは Promise を返すため（ファイル）ロードの成功/失敗を確実に把握できる
             * Promise.all を用いて全ての非同期処理（すべての音声ファイルの読込）が成功した場合に処理を進める（※どちらか一方でも失敗すると、catch ブロックに移行する）
            */
            await Promise.all([
                startSoundRef.current?.load(),
                doneSoundRef.current?.load()
            ]);

            setIsAudioLoaded(true);
            console.log('Audio files loaded successfully');
        } catch (error) {
            setIsAudioLoaded(false);
            console.error('Failed to load audio:', error);
        }
    };

    return { loadAudio, isAudioLoaded }
}