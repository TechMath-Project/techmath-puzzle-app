import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { puzzleId } = body

        // バリデーション
        if (!puzzleId) {
            return NextResponse.json({ message: 'puzzleIdが必要です' }, { status: 400 })
        }

        // パズル情報を取得
        const puzzleInfo = await prisma.puzzle.findUnique({
            where: { id: Number(puzzleId) },
        })

        if (!puzzleInfo) {
            return NextResponse.json({ message: 'パズルが見つかりません' }, { status: 404 })
        }

        return NextResponse.json({ puzzleInfo })
    } catch (error) {
        console.error('Get puzzle info error:', error)
        return NextResponse.json({ message: 'サーバーエラーが発生しました' }, { status: 500 })
    }
}
