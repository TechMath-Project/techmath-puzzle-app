import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { puzzleId } = req.body
    try {
        const puzzleInfo = await prisma.puzzle.findUnique({
            where: { id: Number(puzzleId) },
        })
        return res.status(200).json({ puzzleInfo: puzzleInfo })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'サーバーエラーが発生しました' })
    }
}
