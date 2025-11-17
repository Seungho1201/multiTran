import React from 'react';
import { TranslatorPanel } from './TranslatorPanel';
import { UI_TEXT } from '../constants/config';

export function InputPanel({
  inputText,
  onInputTextChange,
  isLoading,
  onTranslate,
}) {
  return (
    <div className="input-panel-wrapper">
      <TranslatorPanel
        language="auto"
        text={inputText}
        onTextChange={onInputTextChange}
        isInput={true}
        isLoading={isLoading}
        onTranslate={onTranslate}
        placeholder={UI_TEXT.PLACEHOLDER_INPUT}
        label={UI_TEXT.LABEL_SOURCE}
      />
    </div>
  );
}