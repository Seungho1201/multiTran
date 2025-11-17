import React from 'react';
import { LANGUAGE_OPTIONS } from '../constants/languages.js';
import { UI_TEXT } from '../constants/config.js';
import './TranslatorPanel.css';

/**
 * 번역 패널 컴포넌트
 * @param {Object} props
 * @param {string} props.language - 선택된 언어 코드
 * @param {Function} props.onLanguageChange - 언어 변경 핸들러
 * @param {string} props.text - 표시할 텍스트
 * @param {Function} props.onTextChange - 텍스트 변경 핸들러 (입력 패널일 때만)
 * @param {boolean} props.isInput - 입력 패널 여부
 * @param {boolean} props.isLoading - 로딩 상태
 * @param {Function} props.onTranslate - 번역 실행 핸들러 (입력 패널일 때만)
 * @param {string} props.placeholder - 플레이스홀더 텍스트
 * @param {string} props.label - 패널 라벨
 */
export const TranslatorPanel = ({
  language,
  onLanguageChange,
  text,
  onTextChange,
  isInput = false,
  isLoading = false,
  onTranslate,
  placeholder,
  label,
}) => {
  const handleTranslate = () => {
    if (onTranslate && text?.trim()) {
      onTranslate();
    }
  };

  return (
    <div className="translator-panel">
      {!isInput && (
        <div className="panel-header">
          <div className="panel-label">{label}</div>
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="language-select"
          >
            {LANGUAGE_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}
      
      <div className="panel-body">
        {isInput ? (
          <textarea
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder={placeholder}
            className="input-textarea"
          />
        ) : (
          <div className="output-text">
            {isLoading ? (
              <div className="loading-container">
                <span className="loading-text">{UI_TEXT.LOADING}</span>
              </div>
            ) : (
              text || <span className="placeholder-text">{UI_TEXT.PLACEHOLDER_OUTPUT}</span>
            )}
          </div>
        )}
      </div>
      
      {isInput && (
        <div className="panel-footer">
          <button
            onClick={handleTranslate}
            disabled={isLoading || !text?.trim()}
            className="translate-button"
          >
            {isLoading ? UI_TEXT.LOADING : UI_TEXT.TRANSLATE_BUTTON}
          </button>
        </div>
      )}
    </div>
  );
};

