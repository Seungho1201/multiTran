// File: src/services/GeminiService.js

// 🚨 API 키 노출을 막기 위해 모든 기존 import와 함수 로직은 삭제해야 합니다.

/**
 * Netlify Function을 호출하여 안전하게 번역을 수행합니다.
 */
export const translateText = async (text, targetLanguage) => {
    if (!text || !text.trim()) {
        return "";
    }
    
    // Netlify Function 엔드포인트 호출
    const response = await fetch('/.netlify/functions/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // 서버리스 함수가 필요로 하는 데이터를 JSON 형태로 전송
        body: JSON.stringify({ 
            textToTranslate: text, 
            targetLanguage: targetLanguage 
        }),
    });

    if (!response.ok) {
        // 서버리스 함수에서 반환된 오류 처리
        const errorData = await response.json().catch(() => ({ error: "Server error or bad response" }));
        throw new Error(errorData.error || "Translation request failed.");
    }
    
    // 서버리스 함수에서 반환된 JSON 데이터 파싱
    const data = await response.json();
    return data.translatedText;
};

// 🚨 중요: 이 파일 외에 다른 파일에서도 Gemini API를 직접 호출하는 코드가 없는지 확인해야 합니다.