import { prisma } from '@/lib/db'
import { AnswerForm } from '@/components/AnswerForm'
import WordPressEmbed from '@/components/WordPressEmbed'

type PuzzlePageProps = {
    params: Promise<{ id: string }>
    searchParams?: Promise<{ penName?: string }>
}

export default async function PuzzlePage({ params, searchParams }: PuzzlePageProps) {
    const { id } = await params
    const { penName = '' } = (await searchParams) ?? {}
    const puzzle = await prisma.puzzle.findUnique({
        where: { id: Number(id) },
    })
    const puzzleItems = await prisma.puzzleItem.findMany({
        where: { puzzle_id: Number(id) },
        orderBy: { order_no: 'asc' },
    })
    if (!puzzle) {
        return (
            <div className='min-h-screen bg-blue-50 flex items-center justify-center p-4'>
                <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-md w-full text-center'>
                    <div className='text-6xl mb-4'>🧩</div>
                    <h1 className='text-2xl font-bold text-gray-800 mb-2'>
                        パズルが見つかりませんでした
                    </h1>
                    <p className='text-gray-600'>
                        指定されたパズルは存在しないか、削除された可能性があります。
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4'>
            <div className='max-w-2xl mx-auto pt-8'>
                <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl pt-2 pl-8 pr-8 pb-8 mb-6'>
                    <WordPressEmbed url={puzzle.blog_url} />

                    <div className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100'>
                        <h2 className='text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2'>
                            <span className='text-blue-600'>📝</span>
                            問題
                        </h2>
                        <div className='text-gray-800 leading-relaxed whitespace-pre-line text-balance'>
                            {puzzle.explanation}
                        </div>
                    </div>
                </div>

                <AnswerForm puzzleId={puzzle.id} penName={penName} puzzleItems={puzzleItems} />
            </div>
        </div>
    )
}
