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
        return (
            <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4'>
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

    const penName = searchParams?.penName || ''

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4'>
            <div className='max-w-2xl mx-auto pt-8'>
                <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-6'>
                    <div className='flex items-center gap-3 mb-6'>
                        <div className='text-3xl'>🧩</div>
                        <h1 className='text-2xl font-bold text-gray-800'>パズル #{puzzle.id}</h1>
                    </div>

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

                <AnswerForm puzzleId={puzzle.id} penName={penName} />
            </div>
        </div>
    )
}
