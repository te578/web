import { NextRequest, NextResponse } from "next/server"
import { backendPost } from "@/lib/apibackend"

export async function POST(request: NextRequest) {
    const body = await request.json()
    const backendResponse = await backendPost(request, "/api/auth/reset/confirm", body)

    if (!backendResponse.ok) {
        const errorBody = await backendResponse.json()
        return NextResponse.json(errorBody, { status: backendResponse.status })
    }

    return NextResponse.json(await backendResponse.json(), { status: backendResponse.status })
}
