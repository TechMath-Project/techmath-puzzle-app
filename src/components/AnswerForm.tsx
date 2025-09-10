'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react'

type PuzzleItem = {
    id: number
    label: string
}

export function AnswerForm({
    puzzleId,
    penName,
    puzzleItems,
}: {
    puzzleId: number
    penName: string
    puzzleItems: PuzzleItem[]
}) {
    const [answers, setAnswers] = useState<string[]>(Array(puzzleItems.length).fill(''))
    const [message, setMessage] = useState('')

    const handleChange = (index: number, value: string) => {
        const newAnswers = [...answers]
        newAnswers[index] = value
        setAnswers(newAnswers)
    }

    const onSubmit = async () => {
        try {
            const res = await fetch('/api/check-answer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // body: JSON.stringify({ penName, puzzleId, answer }),
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

    const getMessageType = () => {
        if (message.includes('正解')) return 'success'
        if (message.includes('不正解')) return 'warning'
        return 'error'
    }

    const getMessageIcon = () => {
        const type = getMessageType()
        if (type === 'success') return <CheckCircle className='h-4 w-4' />
        if (type === 'warning') return <AlertCircle className='h-4 w-4' />
        return <XCircle className='h-4 w-4' />
    }

    return (
        <Card className='bg-white/90 backdrop-blur-sm shadow-xl border-white/20'>
            <CardContent className='p-8'>
                <div className='space-y-6'>
                    {puzzleItems.map((item, index) => (
                        <Input
                            key={item.id}
                            id={`answer-${item.id}`}
                            type='text'
                            value={answers[index]}
                            onChange={(e) => handleChange(index, e.target.value)}
                            placeholder={`${item.label} の答え`}
                            className='text-gray-900 flex-1'
                        />
                    ))}

                    <div className='flex justify-center'>
                        <Button
                            variant='sky'
                            onClick={onSubmit}
                            // disabled={!answer.trim()}
                            size='lg'
                        >
                            送信
                        </Button>
                    </div>

                    {message && (
                        <Alert
                            className={`${
                                getMessageType() === 'success'
                                    ? 'border-green-200 bg-green-50 text-green-800'
                                    : getMessageType() === 'warning'
                                    ? 'border-yellow-200 bg-yellow-50 text-yellow-800'
                                    : 'border-red-200 bg-red-50 text-red-800'
                            }`}
                        >
                            {getMessageIcon()}
                            <AlertDescription className='font-medium'>{message}</AlertDescription>
                        </Alert>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
