// パズル選択コンポーネント
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Puzzle {
    id: number
    name: string
}

// メインコンポーネント
export default function PuzzleSelector({ puzzles }: { puzzles: Puzzle[] }) {
    const router = useRouter()
    const [penName, setPenName] = useState('')
    const [selectedProblem, setSelectedProblem] = useState('')

    // スタートボタン押下時の処理
    const onStart = () => {
        router.push(`/puzzle/${selectedProblem}?penName=${encodeURIComponent(penName)}`)
    }

    return (
        <Card className='max-w-lg mx-auto'>
            {/* カードのヘッダー部分 */}
            <CardHeader className='text-center'>
                <CardTitle className='text-2xl'>パズルを選んで挑戦しよう</CardTitle>
                <CardDescription>ペンネームを入力して問題を選択してください</CardDescription>
            </CardHeader>
            {/* カードの内容部分 */}
            <CardContent className='space-y-4'>
                {/* ペンネーム入力欄 */}
                <div className='space-y-2'>
                    <Label htmlFor='penName'>ペンネーム</Label>
                    <Input
                        id='penName'
                        type='text'
                        value={penName}
                        onChange={(e) => setPenName(e.target.value)}
                        placeholder='あなたのペンネームを入力'
                    />
                </div>
                {/* パズル選択セレクトボックス */}
                <div className='space-y-2'>
                    <Label htmlFor='problem'>問題を選んでください</Label>
                    <Select value={selectedProblem} onValueChange={setSelectedProblem}>
                        <SelectTrigger id='problem'>
                            <SelectValue placeholder='-- 選択してください --' />
                        </SelectTrigger>
                        <SelectContent>
                            {puzzles.map((p) => (
                                <SelectItem key={p.id} value={p.id.toString()}>
                                    {p.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                {/* スタートボタン */}
                <Button
                    variant='sky'
                    onClick={onStart}
                    className='w-full'
                    disabled={!selectedProblem || !penName}
                >
                    スタート
                </Button>
            </CardContent>
        </Card>
    )
}
