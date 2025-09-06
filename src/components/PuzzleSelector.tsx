'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Puzzle {
    id: number
    name: string
}

export default function PuzzleSelector({ puzzles }: { puzzles: Puzzle[] }) {
    const router = useRouter()
    const [penName, setPenName] = useState('')
    const [selectedProblem, setSelectedProblem] = useState('')

    const onStart = () => {
        if (!selectedProblem || !penName) {
            alert('ペンネームと問題を選択してください')
            return
        }
        router.push(`/puzzle/${selectedProblem}?penName=${encodeURIComponent(penName)}`)
    }

    const safePuzzles = puzzles || []

    return (
        <div className='max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6'>
            <div className='space-y-4'>
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                        ペンネーム
                    </label>
                    <input
                        type='text'
                        value={penName}
                        onChange={(e) => setPenName(e.target.value)}
                        placeholder='あなたのペンネームを入力'
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-gray-900 placeholder-gray-500'
                    />
                </div>

                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                        問題を選んでください
                    </label>
                    <select
                        value={selectedProblem}
                        onChange={(e) => setSelectedProblem(e.target.value)}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-gray-900 bg-white'
                    >
                        <option value='' className='text-gray-500'>
                            -- 選択してください --
                        </option>
                        {safePuzzles.map((p) => (
                            <option key={p.id} value={p.id} className='text-gray-900'>
                                {p.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <button
                onClick={onStart}
                className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
                disabled={!selectedProblem || !penName}
            >
                スタート
            </button>
        </div>
    )
}
