'use client';

import { useState } from 'react';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const tools = [
  { label: 'B', action: 'bold', surround: '**' },
  { label: 'I', action: 'italic', surround: '_' },
  { label: 'Code', action: 'code', surround: '`' },
  { label: 'Link', action: 'link', format: '[text](url)' },
  { label: 'H1', action: 'h1', prefix: '# ' },
  { label: 'H2', action: 'h2', prefix: '## ' },
  { label: 'H3', action: 'h3', prefix: '### ' },
  { label: 'List', action: 'list', prefix: '- ' },
  { label: 'Quote', action: 'quote', prefix: '> ' },
];

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const handleToolClick = (tool: any) => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.substring(start, end) || 'text';

    let newValue = value;
    let newStart = start;
    let newEnd = end;

    if (tool.surround) {
      newValue = value.substring(0, start) + tool.surround + selected + tool.surround + value.substring(end);
      newStart = start + tool.surround.length;
      newEnd = newStart + selected.length;
    } else if (tool.prefix) {
      newValue = value.substring(0, start) + tool.prefix + selected + value.substring(end);
      newStart = start + tool.prefix.length;
    } else if (tool.format) {
      newValue = value.substring(0, start) + tool.format + value.substring(end);
      newStart = start + tool.format.length;
    }

    onChange(newValue);

    // Restore cursor position
    setTimeout(() => {
      textarea.setSelectionRange(newStart, newEnd);
      textarea.focus();
    }, 0);
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2 flex-wrap p-3 rounded-lg" style={{ background: 'rgba(0, 229, 195, 0.05)', border: '1px solid rgba(0, 229, 195, 0.15)' }}>
        {tools.map(tool => (
          <button
            key={tool.action}
            type="button"
            onClick={() => handleToolClick(tool)}
            className="px-3 py-1 rounded text-sm font-space-mono"
            style={{
              background: 'var(--input-bg)',
              border: '1px solid rgba(0, 229, 195, 0.2)',
              color: '#FFFFFF',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--teal)';
              e.currentTarget.style.color = 'var(--teal)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 229, 195, 0.2)';
              e.currentTarget.style.color = '#FFFFFF';
            }}>
            {tool.label}
          </button>
        ))}
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your post in Markdown..."
        className="w-full min-h-96 p-4 rounded-lg font-space-mono text-sm"
        style={{
          background: 'var(--input-bg)',
          border: '1px solid rgba(0, 229, 195, 0.15)',
          color: '#FFFFFF',
          fontFamily: 'var(--font-space-mono)',
          resize: 'vertical',
        }}
      />
      <div style={{ color: 'var(--text-light)' }} className="text-xs">
        Tip: You can use standard Markdown syntax. Use # for headings, ** for bold, _ for italic, etc.
      </div>
    </div>
  );
}
