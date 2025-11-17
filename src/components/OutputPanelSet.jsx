import React from 'react';
import { TranslatorPanel } from './TranslatorPanel';
import { getLanguageLabel } from '../constants/languages';
import { UI_TEXT } from '../constants/config';

export function OutputPanelSet({
  targetLang1,
  onTargetLang1Change,
  result1,
  targetLang2,
  onTargetLang2Change,
  result2,
  isLoading,
}) {
  return (
    <div className="output-panels">
      <TranslatorPanel
        language={targetLang1}
        onLanguageChange={onTargetLang1Change}
        text={result1}
        isLoading={isLoading}
        placeholder={UI_TEXT.PLACEHOLDER_OUTPUT}
        label={`${UI_TEXT.LABEL_TARGET_1}`}
      />
      <TranslatorPanel
        language={targetLang2}
        onLanguageChange={onTargetLang2Change}
        text={result2}
        isLoading={isLoading}
        placeholder={UI_TEXT.PLACEHOLDER_OUTPUT}
        label={`${UI_TEXT.LABEL_TARGET_2}`}
      />
    </div>
  );
}