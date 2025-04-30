import { VercelRequest, VercelResponse } from '@vercel/node'
import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

export default async function handler(req: VercelRequest, res: VercelResponse) {
  switch (req.method) {
    case 'GET': {
      const users = await prisma.user.findMany()
      return res.status(200).json(users)
    }
    case 'POST': {
      const { email, name } = req.body
      if (!email) return res.status(400).json({ error: 'Email is required' })
      const newUser = await prisma.user.create({ data: { email, name } })
      return res.status(201).json(newUser)
    }
    default:
      res.setHeader('Allow', ['GET','POST'])
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
