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
        <div className='bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20'>
            <div className='space-y-6'>
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>答え：</label>
                    <input
                        type='text'
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500'
                        placeholder='答えを入力してください'
                    />
                </div>

                <button
                    onClick={onSubmit}
                    disabled={!answer.trim()}
                    className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                    送信
                </button>

                {message && (
                    <div
                        className={`p-4 rounded-xl text-center font-medium ${
                            message.includes('正解')
                                ? 'bg-green-100 text-green-800 border border-green-200'
                                : message.includes('不正解')
                                ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                : 'bg-red-100 text-red-800 border border-red-200'
                        }`}
                    >
                        {message}
                    </div>
                )}
            </div>
        </div>
    )
}
