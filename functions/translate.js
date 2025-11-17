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
        const result = await model.generateContent(prompt); 
        const translatedText = result.text; // result.response.text 대신 .text 사용 (수정 완료)

        // ----------------------------------------------------------------------
        // 🚨 최종 수정: 빈 응답일 때 에러를 throw 하는 대신, 빈 문자열로 처리
        // ----------------------------------------------------------------------
        let finalTranslation = "";
        
        if (!translatedText || !translatedText.trim()) {
            // console.error 대신 console.warn을 사용하여 치명적인 에러가 아님을 표시
            console.warn("Translation Warning: Gemini returned empty text, likely due to short input or safety filters.");
            finalTranslation = "";
        } else {
            finalTranslation = cleanTranslationResponse(translatedText);
        }
        
        // 6. 성공적으로 처리된 결과를 프론트엔드로 반환 (200 OK)
        return {
            statusCode: 200,
            body: JSON.stringify({
                translatedText: finalTranslation,
            }),
        };

    } catch (error) {
        // API 키 오류나 다른 심각한 서버 측 오류가 발생했을 경우만 500 응답
        console.error("Translation Error in Function:", error.message);
        
        return { 
            statusCode: 500, 
            body: JSON.stringify({ error: "Translation failed due to an internal server error." }) 
        };
    }
};