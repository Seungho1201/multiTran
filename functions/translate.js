// File: functions/translate.js (Netlify Function)

import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. 설정 정보
const MODEL = "gemini-2.5-flash-lite";
const GENERATION_CONFIG = {
    temperature: 0.2,
    maxOutputTokens: 1024,
};

// 2. 프롬프트 생성
const createTranslationPrompt = (text, targetLanguage) => {
    return `Translate the following text to ${targetLanguage}. Only provide the translation, without any additional explanations or notes.: "${text.trim()}"`;
};

// 3. 번역 텍스트 클린업
const cleanTranslationResponse = (text) => {
    let cleanedText = text.trim();

    if (
        (cleanedText.startsWith('"') && cleanedText.endsWith('"')) ||
        (cleanedText.startsWith("'") && cleanedText.endsWith("'"))
    ) {
        cleanedText = cleanedText.slice(1, -1);
    }
    return cleanedText;
};

// Netlify Function 메인 핸들러
export const handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        // 요청 파싱
        const { textToTranslate, targetLanguage } = JSON.parse(event.body);

        if (!textToTranslate || !textToTranslate.trim() || !targetLanguage) {
            return { statusCode: 400, body: JSON.stringify({ error: "Missing text or target language." }) };
        }

        // API Key 로드
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        // 모델 초기화
        const model = genAI.getGenerativeModel({
            model: MODEL,
            generationConfig: GENERATION_CONFIG,
        });

        const prompt = createTranslationPrompt(textToTranslate, targetLanguage);

        // 5. Gemini API 호출
        const result = await model.generateContent(prompt);

        // 👉 핵심 수정: 실제 텍스트는 여기에 있음
        const translatedTextRaw = result.response.text(); 

        // 안전 처리
        let finalTranslation = "";

        if (!translatedTextRaw || !translatedTextRaw.trim()) {
            console.warn("Translation Warning: Gemini returned empty text.");
            finalTranslation = "";
        } else {
            finalTranslation = cleanTranslationResponse(translatedTextRaw);
        }

        // 성공 응답
        return {
            statusCode: 200,
            body: JSON.stringify({
                translatedText: finalTranslation,
            }),
        };

    } catch (error) {
        console.error("Translation Error in Function:", error.message);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Translation failed due to an internal server error." }),
        };
    }
};
