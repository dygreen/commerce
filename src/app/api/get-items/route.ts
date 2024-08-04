import { NextRequest, NextResponse } from 'next/server'
import notion from '@util/notion'

async function getItem() {
    try {
        return await notion.databases.query({
            database_id: process.env.NOTION_DATABASE_ID as string,
            sorts: [
                {
                    property: 'price',
                    direction: 'ascending',
                },
            ],
        })
    } catch (error) {
        console.error(JSON.stringify(error))
    }
}

export async function GET() {
    try {
        const response = await getItem()
        return NextResponse.json({
            item: response?.results,
            message: 'Success',
        })
    } catch (error) {
        return NextResponse.json({ message: 'Fail' }, { status: 400 })
    }
}
