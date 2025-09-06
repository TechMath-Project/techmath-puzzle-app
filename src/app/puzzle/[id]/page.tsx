import { prisma } from '@/lib/db'
import { AnswerForm } from '@/components/AnswerForm'

interface PuzzlePageProps {
    params: { id: string }
    searchParams?: { penName?: string }
}

export default async function PuzzlePage({ params, searchParams }: PuzzlePageProps) {
    const puzzle = await prisma.puzzle.findUnique({
        where: { id: Number(params.id) },
    })

    if (!puzzle) {
        return <p>パズルが見つかりませんでした。</p>
    }

    const penName = searchParams?.penName || ''

    return (
        <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
            <div style={{ whiteSpace: 'pre-line' }}>問題：{puzzle.explanation}</div>
            <AnswerForm puzzleId={puzzle.id} penName={penName} />
        </div>
    )
}
