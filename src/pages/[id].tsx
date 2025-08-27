import { useState } from 'react'
import { useRouter } from 'next/router'

const problemDetails: Record<string, { text: string }> = {
    '1': { text: '3兄弟を年上から順に並べてください。\n回答方法：氏名>氏名>氏名' },
}

const WORKERS_API_URL =
    'https://techmath-puzzle-app-backend.yukkin1204-mathematics.workers.dev/check-answer'

export default function Question() {
    const router = useRouter()
    const { id, penName } = router.query

    const [answer, setAnswer] = useState('')
    const [message, setMessage] = useState('')

    if (!id || !penName) {
        return <p>読み込み中...</p>
    }

    const onSubmit = async () => {
        const res = await fetch(WORKERS_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ penName, problemId: id, answer }),
        })
        const data = await res.json()
        if (data.success) {
            if (data.correct) {
                setMessage('正解です！おめでとうございます！')
            } else {
                setMessage('残念、不正解です。もう一度試してください。')
            }
        } else {
            setMessage(data.message || 'エラーが発生しました。')
        }
    }

    return (
        <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
            <div style={{ whiteSpace: 'pre-line' }}>
                {problemDetails[id as string]?.text || '問題がありません'}
            </div>

            <label>
                答え：
                <input
                    type='text'
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    style={{ width: '100%', padding: 8, marginTop: 8 }}
                />
            </label>

            <button
                onClick={onSubmit}
                style={{ marginTop: 20, padding: '10px 20px', fontSize: 16 }}
            >
                送信
            </button>

            {message && <p style={{ marginTop: 20, fontWeight: 'bold' }}>{message}</p>}
        </div>
    )
}
