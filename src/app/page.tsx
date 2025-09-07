// パズル一覧ページコンポーネント
import { prisma } from '@/lib/db'
import PuzzleSelector from '@/components/PuzzleSelector'
export const revalidate = 600 // 10分ごとに再生成

// データベースからパズル一覧を取得する関数
async function getPuzzles() {
    return prisma.puzzle.findMany({
        select: { id: true, name: true },
        orderBy: { id: 'asc' },
    })
}

// メインコンポーネント
export default async function PuzzleListPage() {
    let puzzles: { id: number; name: string }[] = []
    let errorMessage = ''

    // パズル一覧の取得
    try {
        puzzles = await getPuzzles()
    } catch (error) {
        console.error('パズル取得エラー:', error)
        errorMessage = 'パズルを取得できませんでした。時間を置いて再度アクセスしてください。'
    }

    return (
        <main className='min-h-screen bg-indigo-50 py-12 px-4'>
            <div className='container mx-auto'>
                {/* ページヘッダー */}
                <div className='text-center mb-8'>
                    <h1 className='text-4xl font-bold text-gray-800 mb-4'>
                        てくますパズルへようこそ！
                    </h1>
                    {/* エラーがない場合のみ説明文を表示 */}
                    {!errorMessage && (
                        <p className='text-lg text-gray-600'>
                            このページでは{' '}
                            <a
                                href='https://techmath-project.com/'
                                className='text-blue-600 underline'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                TechMath Project
                            </a>{' '}
                            が作成したパズル問題に挑戦できます
                        </p>
                    )}
                </div>
                {/* エラーがある場合はエラーメッセージ、ない場合はパズル選択コンポーネントを表示 */}
                {errorMessage ? (
                    <p className='text-red-600 text-lg text-center'>{errorMessage}</p>
                ) : (
                    <PuzzleSelector puzzles={puzzles} />
                )}
            </div>
            {/* ページフッター */}
            <footer className='mt-12 text-center text-gray-500 text-sm'>
                &copy; 2025 TechMath Project. All rights reserved.
            </footer>
        </main>
    )
}
