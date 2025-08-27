import type { NextApiRequest, NextApiResponse } from 'next'

const ANSWERS: Record<string, string> = {
    '1': '三郎>太郎>次郎',
}

const normalize = (str: string) =>
    str
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0))

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'POSTのみ対応しています' })
    }

    const { penName, problemId, answer } = req.body

    if (!penName || !problemId || !answer) {
        return res.status(400).json({ success: false, message: '必須項目がありません' })
    }

    const correctAnswer = ANSWERS[problemId]
    if (!correctAnswer) {
        return res.status(404).json({ success: false, message: '無効な問題IDです' })
    }

    const isCorrect = normalize(correctAnswer) === normalize(answer)

    return res.status(200).json({ success: true, correct: isCorrect })
}
