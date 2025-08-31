import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'POSTのみ対応しています' })
    }
    const { penName, puzzleId, answer } = req.body
    if (!penName || !puzzleId || !answer) {
        return res.status(400).json({ success: false, message: '必須項目がありません' })
    }
    try {
        const puzzleAnswers = await prisma.puzzleAnswer.findMany({
            where: { puzzleId: Number(puzzleId) },
        })
        const correctAnswer = puzzleAnswers[0].answer
        if (!correctAnswer) {
            return res.status(404).json({ success: false, message: '無効な問題IDです' })
        }
        const isCorrect = normalize(correctAnswer) === normalize(answer)
        if (isCorrect) {
            const webhookUrl = process.env.DISCORD_WEBHOOK_URL
            if (webhookUrl) {
                await fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        content: `ペンネーム「${penName}」さんが問題ID「${puzzleId}」に正解しました！`,
                    }),
                })
            }
        }
        return res.status(200).json({ success: true, correct: isCorrect })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: 'サーバーエラーが発生しました' })
    }
}

const normalize = (str: string) =>
    str
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0))
