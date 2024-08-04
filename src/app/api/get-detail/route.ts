import { NextRequest, NextResponse } from 'next/server'
import notion from '@util/notion'

async function getDetail(pageId: string, propertyId: string) {
    try {
        return await notion.pages.properties.retrieve({
            page_id: pageId,
            property_id: propertyId,
        })
    } catch (error) {
        console.error(JSON.stringify(error))
    }
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const pageId = searchParams.get('pageId')
        const propertyId = searchParams.get('propertyId')

        const response = await getDetail(String(pageId), String(propertyId))
        return NextResponse.json({
            detail: response,
            message: `Success`,
        })
    } catch (error) {
        return NextResponse.json({ message: `Fail` }, { status: 400 })
    }
}
