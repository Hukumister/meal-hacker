import {getSetting} from "@/models/setting";
import {Recipe} from "@/types/recipe";
import {Result} from "@/types/result";

export async function extractRecipe(description: string): Promise<Result<Recipe>> {
    const prompt = await getSetting("recipe_prompt")
    const modelResponse = await fetch(
        "https://llm.api.cloud.yandex.net/foundationModels/v1/completion",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${process.env.YANDEX_GPT_API_KEY}`,
            },
            body: JSON.stringify(
                {
                    "modelUri": "gpt://b1gophpthepfs5v8mn0k/llama/latest",
                    "completionOptions": {
                        "stream": false,
                        "temperature": 0.6,
                        "maxTokens": "5000",
                        "reasoningOptions": {
                            "mode": "DISABLED"
                        }
                    },
                    "messages": [
                        {
                            "role": "system",
                            "text": prompt.value
                        },
                        {
                            "role": "user",
                            "text": description
                        }
                    ],
                    "json_object": true
                }
            ),
        }
    )
    const json = await modelResponse.json()
    const text = json.result.alternatives[0].message.text as string
    const resultJson = convertMarkdownJsonToObject(text)
    if (resultJson.hasOwnProperty("error")) {
        return {error: resultJson.error, success: false};
    } else {
        return {data: resultJson as Recipe, success: true};
    }
}

function convertMarkdownJsonToObject(markdownJson: string): any {
    let processedText = markdownJson.trim();

    if (processedText.startsWith('```') && processedText.endsWith('```')) {
        processedText = processedText.substring(3, processedText.length - 3).trim();

        const firstLineBreak = processedText.indexOf('\n');
        if (firstLineBreak > 0 && !processedText.substring(0, firstLineBreak).includes('{')) {
            processedText = processedText.substring(firstLineBreak).trim();
        }
    }

    return JSON.parse(processedText);
}