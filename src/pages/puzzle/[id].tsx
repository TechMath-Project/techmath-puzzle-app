import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Puzzle() {
    const router = useRouter()
    const { id, penName } = router.query

    const [explanation, setExplanation] = useState('')
    const [answer, setAnswer] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (!router.isReady) {
            return
        }
        const fetchPuzzle = async () => {
            const res = await fetch('/api/get-puzzle-info', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ puzzleId: id }),
            })
            const data = await res.json()
            setExplanation(data.puzzleInfo.explanation)
        }
        fetchPuzzle()
    }, [router.isReady, id])

    const onSubmit = async () => {
        const res = await fetch('/api/check-answer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ penName, puzzleId: id, answer }),
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
            <div style={{ whiteSpace: 'pre-line' }}>問題：{explanation}</div>

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
