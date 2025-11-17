/**
 * 지원하는 언어 목록
 */
export const LANGUAGE_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'ko', label: 'Korean' },
  { value: 'ja', label: 'Japanese' },
  { value: 'zh-CN', label: 'Chinese' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'vi', label: 'Vietnamese' },
];

/**
 * 기본 언어 설정
 */
export const DEFAULT_LANGUAGES = {
  SOURCE: 'auto',
  TARGET_1: 'ko',
  TARGET_2: 'ja',
};

/**
 * 언어 코드로 언어 레이블 찾기
 * @param {string} value - 언어 코드
 * @returns {string} 언어 레이블
 */
export const getLanguageLabel = (value) => {
  return LANGUAGE_OPTIONS.find(l => l.value === value)?.label || value;
};

