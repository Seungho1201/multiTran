import { ERROR_MESSAGES } from '../constants/config.js';

/**
 * 에러 타입 판별 및 메시지 반환
 * @param {Error} error - 에러 객체
 * @returns {string} 사용자 친화적인 에러 메시지
 */
export const handleTranslationError = (error) => {
  // 에러 메시지 추출 (다양한 속성 확인)
  const errorMessage = error?.message || error?.toString() || '';
  const errorStatus = error?.status || error?.statusCode || '';
  const errorCode = error?.code || '';
  
  // 전체 에러 문자열 생성
  const fullErrorString = `${errorMessage} ${errorStatus} ${errorCode}`.toLowerCase();
  
  // API 요청 한도 초과
  if (
    fullErrorString.includes('429') ||
    fullErrorString.includes('quota') ||
    fullErrorString.includes('rate limit') ||
    fullErrorString.includes('resource_exhausted') ||
    fullErrorString.includes('too many requests')
  ) {
    return ERROR_MESSAGES.RATE_LIMIT;
  }
  
  // API 키 오류
  if (
    fullErrorString.includes('api key') ||
    fullErrorString.includes('api_key') ||
    fullErrorString.includes('permission_denied') ||
    fullErrorString.includes('unauthenticated') ||
    fullErrorString.includes('401') ||
    fullErrorString.includes('403') ||
    fullErrorString.includes('invalid api key')
  ) {
    return ERROR_MESSAGES.API_KEY_INVALID;
  }
  
  // 모델 관련 오류
  if (
    fullErrorString.includes('model') ||
    fullErrorString.includes('not found') ||
    fullErrorString.includes('404')
  ) {
    return '모델을 찾을 수 없습니다. 모델 이름을 확인해주세요.';
  }
  
  // 네트워크 오류
  if (
    fullErrorString.includes('network') ||
    fullErrorString.includes('fetch') ||
    fullErrorString.includes('connection') ||
    fullErrorString.includes('timeout')
  ) {
    return '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.';
  }
  
  // API 키 관련 추가 확인
  if (
    fullErrorString.includes('invalid') ||
    fullErrorString.includes('unauthorized') ||
    fullErrorString.includes('permission')
  ) {
    return 'API 키가 유효하지 않거나 권한이 없습니다. Google AI Studio에서 API 키를 확인하고 모델 접근 권한을 활성화해주세요.';
  }
  
  // 기타 에러 - 원본 메시지 포함
  const displayMessage = errorMessage || ERROR_MESSAGES.UNKNOWN_ERROR;
  return `${ERROR_MESSAGES.TRANSLATION_FAILED}: ${displayMessage}`;
};

