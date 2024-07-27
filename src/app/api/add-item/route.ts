import { NextRequest, NextResponse } from 'next/server'
import { Client } from '@notionhq/client'

const notion = new Client({
    auth: 'secret_jhCV4YLPl4CStcZfr3o86oGMjG76ccBsB3OY5WWWFns',
})

const databaseId = '8fd172c923e6434c9c194bbf72f61af2'

async function addItem(name: string) {
    try {
        const response = await notion.pages.create({
            parent: { database_id: databaseId },
            properties: {
                title: [
                    {
                        text: {
                            content: name,
                        },
                    },
                ],
            },
        })
        console.log(response)
    } catch (error) {
        console.error(JSON.stringify(error))
    }
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const name = searchParams.get('name')

    if (!name) {
        return NextResponse.json({ message: 'No name' }, { status: 400 })
    }

    try {
        await addItem(name)
        return NextResponse.json({ message: `Success: ${name} added` })
    } catch (error) {
        return NextResponse.json(
            { message: `Fail: ${name} added` },
            { status: 400 },
        )
    }
}
