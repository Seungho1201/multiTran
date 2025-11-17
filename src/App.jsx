import React, { useState, useEffect } from 'react';
import { useTranslation } from './hooks/useTranslation.js';
import { DEFAULT_LANGUAGES } from './constants/languages.js';
import { LOCAL_STORAGE_KEYS } from './constants/config.js';
import { InputPanel } from './components/InputPanel.jsx';
import { OutputPanelSet } from './components/OutputPanelSet.jsx';
import './App.css';

/**
 * 메인 앱 컴포넌트
 */
function App() {
  // 로컬 스토리지에서 언어 설정 불러오기
  const getInitialLanguage = (key, defaultValue) => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? storedValue : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage', error);
      return defaultValue;
    }
  };

  // 언어 선택 상태
  const [targetLang1, setTargetLang1] = useState(() =>
    getInitialLanguage(LOCAL_STORAGE_KEYS.TARGET_LANG_1, DEFAULT_LANGUAGES.TARGET_1)
  );
  const [targetLang2, setTargetLang2] = useState(() =>
    getInitialLanguage(LOCAL_STORAGE_KEYS.TARGET_LANG_2, DEFAULT_LANGUAGES.TARGET_2)
  );

  // 입력 텍스트 상태
  const [inputText, setInputText] = useState('');

  // 번역 훅 사용
  const { result1, result2, isLoading, translate } = useTranslation(
    targetLang1,
    targetLang2
  );

  // 언어 설정이 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.TARGET_LANG_1, targetLang1);
    } catch (error) {
      console.error('Error writing to localStorage', error);
    }
  }, [targetLang1]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.TARGET_LANG_2, targetLang2);
    } catch (error) {
      console.error('Error writing to localStorage', error);
    }
  }, [targetLang2]);

  /**
   * 번역 실행 핸들러
   */
  const handleTranslate = () => {
    translate(inputText);
  };

  return (
    <div className="app-container google-style">
      <main className="panels-wrapper">
        <OutputPanelSet
          targetLang1={targetLang1}
          onTargetLang1Change={setTargetLang1}
          result1={result1}
          targetLang2={targetLang2}
          onTargetLang2Change={setTargetLang2}
          result2={result2}
          isLoading={isLoading}
        />
        <InputPanel
          inputText={inputText}
          onInputTextChange={setInputText}
          isLoading={isLoading}
          onTranslate={handleTranslate}
        />
      </main>
    </div>
  );
}

export default App;
