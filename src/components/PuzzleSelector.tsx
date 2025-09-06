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

    return (
        <>
            <label>
                ペンネーム：
                <br />
                <input
                    type='text'
                    value={penName}
                    onChange={(e) => setPenName(e.target.value)}
                    style={{ width: '100%', padding: 8 }}
                />
            </label>

            <label style={{ marginTop: 20, display: 'block' }}>
                問題を選んでください：
                <select
                    value={selectedProblem}
                    onChange={(e) => setSelectedProblem(e.target.value)}
                    style={{ width: '100%', padding: 8, marginTop: 8 }}
                >
                    <option value=''>-- 選択してください --</option>
                    {puzzles.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.name}
                        </option>
                    ))}
                </select>
            </label>

            <button onClick={onStart} style={{ marginTop: 30, padding: '10px 20px', fontSize: 16 }}>
                スタート
            </button>
        </>
    )
}
