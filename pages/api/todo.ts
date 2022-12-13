import type { NextApiRequest, NextApiResponse } from 'next'

type Item = {
    Title: string,
    Description?: string,
    Priority?: number,
    Completed: boolean,
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Item[]>
) {
    let todoItems = [
        {
            Title: 'Schedule doctor appointment',
            Description: 'Annual checkup with Dr. Smith',
            Priority: 10,
            Completed: false,
        },
        {
            Title: 'Clean garage',
            Priority: 10,
            Completed: false,
        },
        {
            Title: 'Put up Chirstmas tree',
            Priority: 1,
            Completed: false,
        },
        {
            Title: 'Build new dining room table',
            Completed: true,
        }
    ] as Item[]


  res.status(200).json(todoItems)
}
