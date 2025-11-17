/**
 * API 설정
 */
export const API_CONFIG = {
  // 무료 API 키 (환경 변수가 있으면 우선 사용)
  API_KEY: null,
  
  // 모델 설정 (실제 사용 가능한 모델로 설정)
  MODEL: "gemini-2.5-flash-lite", // 무료 할당량에서 사용 가능한 최신 모델
  
  // 생성 설정 (성능 최적화)
  GENERATION_CONFIG: {
    temperature: 0.2, // 번역의 일관성과 속도 향상을 위해 낮은 temperature 사용
    maxOutputTokens: 1024, // 최대 출력 토큰 제한으로 응답 속도 향상
  },
};

/**
 * UI 텍스트
 */
export const UI_TEXT = {
  LOADING: 'Ai is working...',
  TRANSLATE_BUTTON: 'Translate',
  PLACEHOLDER_INPUT: 'typing',
  PLACEHOLDER_OUTPUT: '',
  LABEL_SOURCE: '',
  LABEL_TARGET_1: 'Langauage 1',
  LABEL_TARGET_2: 'Langauage 2',
  AUTO_DETECT: 'Auto Detect',
};

/**
 * 에러 메시지
 */
export const ERROR_MESSAGES = {
  API_KEY_INVALID: 'API ket is invalid. Please check your API key.',
  RATE_LIMIT: 'THe API request limit has been reached. Please try again in a moment',
  TRANSLATION_FAILED: 'Translate fail',
  UNKNOWN_ERROR: 'Error',
  EMPTY_TEXT: '번역할 텍스트를 입력해주세요.',
};

/**
 * 로컬 스토리지 키
 */
export const LOCAL_STORAGE_KEYS = {
  TARGET_LANG_1: 'targetLang1',
  TARGET_LANG_2: 'targetLang2',
};

