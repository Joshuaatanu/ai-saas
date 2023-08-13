import { auth } from "@clerk/nextjs";
import { response } from "express";
import { NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration);

const instructionMessage: ChatCompletionRequestMessage = {
    role: "system",
    content: "You are a code generator. You must answer only in markdown code snippets. Use code commments for Explantion"
}

export async function POST(
    req: Request,
) {
    try {
        const { userId } = auth()
        const body = await req.json()
        const { messages } = body

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        } //cheking if user is not logged in or not authenticated

        if (!configuration.apiKey) {
            return new NextResponse("OpenAI API Key not configured", { status: 500 })
        } //checking if Api kay is configured

        if (!messages) {
            return new NextResponse("Messages are required", { status: 400 })
        }

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages
        })
        return NextResponse.json(response.data.choices[0].message)


    } catch (error) {
        console.log("[]CONVERSATION_ERROR")
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}