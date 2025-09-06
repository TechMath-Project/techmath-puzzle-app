'use client'

import { useState } from 'react'

export function AnswerForm({ puzzleId, penName }: { puzzleId: number; penName: string }) {
    const [answer, setAnswer] = useState('')
    const [message, setMessage] = useState('')

    const onSubmit = async () => {
        try {
            const res = await fetch('/api/check-answer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ penName, puzzleId, answer }),
            })
            const data = await res.json()
            if (data.success) {
                setMessage(
                    data.correct
                        ? '正解です！おめでとうございます！'
                        : '残念、不正解です。もう一度試してください。'
                )
            } else {
                setMessage(data.message || 'エラーが発生しました。')
            }
        } catch (error) {
            console.error('Failed to submit answer:', error)
            setMessage('回答の送信に失敗しました。')
        }
    }

    return (
        <div>
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
