import { prisma } from '@/lib/db'
import PuzzleSelector from '@/components/PuzzleSelector'

export default async function PuzzlePage() {
    const puzzles = await prisma.puzzle.findMany({
        select: { id: true, name: true },
        orderBy: { id: 'asc' },
    })
    return (
        <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
            <h1>てくますパズルへようこそ</h1>
            <PuzzleSelector puzzles={puzzles} />
        </div>
    )
}
