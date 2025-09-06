// パズル一覧ページ
import { prisma } from '@/lib/db'
import PuzzleSelector from '@/components/PuzzleSelector'

export default async function PuzzleListPage() {
    const puzzles = await prisma.puzzle.findMany({
        select: { id: true, name: true },
        orderBy: { id: 'asc' },
    })
    return (
        <main className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4'>
            <div className='container mx-auto'>
                <div className='text-center mb-8'>
                    <h1 className='text-4xl font-bold text-gray-800 mb-4'>
                        てくますパズルへようこそ
                    </h1>
                    <p className='text-lg text-gray-600'>お好みのパズルを選んで挑戦しましょう！</p>
                </div>
                <PuzzleSelector puzzles={puzzles} />
            </div>
        </main>
    )
}
