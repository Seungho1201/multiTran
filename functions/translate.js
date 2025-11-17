// File: functions/translate.js (Netlify Function)

import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. 설정 정보 (config.js에서 가져와 여기에 하드코딩)
const MODEL = "gemini-2.5-flash-lite"; 
const GENERATION_CONFIG = {
    temperature: 0.2,
    maxOutputTokens: 1024,
};

// 2. 헬퍼 함수: 프롬프트 생성 (기존 로직 유지)
const createTranslationPrompt = (text, targetLanguage) => {
    return `Translate the following text to ${targetLanguage}. Only provide the translation, without any additional explanations or notes.: "${text.trim()}"`;
};

// 3. 헬퍼 함수: 응답 정리 (기존 로직 유지)
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

// Netlify Function의 메인 핸들러
export const handler = async (event) => {
    // Netlify Function은 POST 요청으로 데이터를 받으므로, GET 요청은 거부합니다.
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        // 프론트엔드에서 JSON 형태로 보낸 데이터 파싱
        const { textToTranslate, targetLanguage } = JSON.parse(event.body);

        if (!textToTranslate || !textToTranslate.trim() || !targetLanguage) {
            return { statusCode: 400, body: JSON.stringify({ error: "Missing text or target language." }) };
        }

        // 4. 환경 변수에서 안전하게 API 키를 가져와 클라이언트 초기화
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ 
            model: MODEL,
            generationConfig: GENERATION_CONFIG,
        });
        
        const prompt = createTranslationPrompt(textToTranslate, targetLanguage);
        
        // 5. API 호출
        const result = await model.generateContent({ contents: prompt });
        const translatedText = result.response.text;

        if (!translatedText || !translatedText.trim()) {
            throw new Error("Empty translation response received");
        }
        
        const finalTranslation = cleanTranslationResponse(translatedText);

        // 6. 성공적으로 번역된 결과를 프론트엔드로 반환
        return {
            statusCode: 200,
            body: JSON.stringify({
                translatedText: finalTranslation,
            }),
        };

    } catch (error) {
        console.error("Translation Error in Function:", error.message);
        // 클라이언트에게는 일반적인 오류 메시지를 전달 (자세한 서버 에러는 숨김)
        return { 
            statusCode: 500, 
            body: JSON.stringify({ error: "Translation failed due to a server error or rate limit." }) 
        };
    }
};

// 참고: handleTranslationError는 서버 측 로직이므로 여기서는 간단한 에러 처리를 사용했습니다.