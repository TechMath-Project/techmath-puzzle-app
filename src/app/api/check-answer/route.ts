import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { penName, puzzleId, answer } = body

        // バリデーション
        if (!penName || !puzzleId || !answer) {
            return NextResponse.json(
                { success: false, message: '必須項目がありません' },
                { status: 400 }
            )
        }

        // パズルの正解を取得
        const puzzleAnswers = await prisma.puzzleItem.findMany({
            where: { puzzle_id: Number(puzzleId) },
        })

        const correctAnswer = puzzleAnswers[0]?.answer
        if (!correctAnswer) {
            return NextResponse.json(
                { success: false, message: '無効な問題IDです' },
                { status: 404 }
            )
        }

        // 回答の正誤判定
        const isCorrect = normalize(correctAnswer) === normalize(answer)

        // 正解時のDiscord通知
        if (isCorrect) {
            const webhookUrl = process.env.DISCORD_WEBHOOK_URL
            if (webhookUrl) {
                try {
                    await fetch(webhookUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            content: `ペンネーム「${penName}」さんが問題ID「${puzzleId}」に正解しました！`,
                        }),
                    })
                } catch (webhookError) {
                    console.error('Discord webhook error:', webhookError)
                    // Webhook エラーは回答結果に影響させない
                }
            }
        }

        return NextResponse.json({ success: true, correct: isCorrect })
    } catch (error) {
        console.error('Check answer error:', error)
        return NextResponse.json(
            { success: false, message: 'サーバーエラーが発生しました' },
            { status: 500 }
        )
    }
}

const normalize = (str: string) =>
    str
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0))
