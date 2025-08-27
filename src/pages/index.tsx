import { useState } from 'react'
import { useRouter } from 'next/router'

const problems = [{ id: '1', title: '問題1：論理包含の3兄弟' }]

export default function Home() {
    const [penName, setPenName] = useState('')
    const [selectedProblem, setSelectedProblem] = useState('')
    const router = useRouter()

    const onStart = () => {
        if (!penName) {
            alert('ペンネームを入力してください')
            return
        }
        if (!selectedProblem) {
            alert('問題を選択してください')
            return
        }
        router.push(`/${selectedProblem}?penName=${encodeURIComponent(penName)}`)
    }

    return (
        <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
            <h1>てくますパズルへようこそ</h1>

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
                    {problems.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.title}
                        </option>
                    ))}
                </select>
            </label>

            <button onClick={onStart} style={{ marginTop: 30, padding: '10px 20px', fontSize: 16 }}>
                スタート
            </button>
        </div>
    )
}
