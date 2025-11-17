import { useState } from 'react';
import { translateText } from '../services/geminiService.js';
import { getLanguageLabel } from '../constants/languages.js';

/**
 * 번역 기능을 관리하는 커스텀 훅
 * @param {string} targetLang1 - 첫 번째 대상 언어 코드
 * @param {string} targetLang2 - 두 번째 대상 언어 코드
 * @returns {Object} 번역 관련 상태와 함수
 */
export const useTranslation = (targetLang1, targetLang2) => {
  const [result1, setResult1] = useState('');
  const [result2, setResult2] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * 텍스트를 두 개의 언어로 동시에 번역
   * @param {string} text - 번역할 텍스트
   */
  const translate = async (text) => {
    if (!text?.trim()) {
      setError('번역할 텍스트를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult1('');
    setResult2('');

    try {
      const [translation1, translation2] = await Promise.all([
        translateText(text, getLanguageLabel(targetLang1)),
        translateText(text, getLanguageLabel(targetLang2)),
      ]);

      setResult1(translation1);
      setResult2(translation2);
    } catch (err) {
      const errorMessage = err.message || 'Errorrrr';
      setError(errorMessage);
      setResult1(errorMessage);
      setResult2(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 결과 초기화
   */
  const resetResults = () => {
    setResult1('');
    setResult2('');
    setError(null);
  };

  return {
    result1,
    result2,
    isLoading,
    error,
    translate,
    resetResults,
  };
};

