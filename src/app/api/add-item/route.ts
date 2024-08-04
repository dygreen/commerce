import { NextRequest, NextResponse } from 'next/server'
import notion from '@util/notion'

async function addItem(name: string) {
    try {
        const response = await notion.pages.create({
            parent: { database_id: process.env.NOTION_DATABASE_ID as string },
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
