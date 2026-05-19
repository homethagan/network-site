'use client';

import { useState, useRef } from 'react';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const tools = [
  { label: '**', action: 'bold', surround: '**', title: 'Bold (Ctrl+B)', group: 'text' },
  { label: '_', action: 'italic', surround: '_', title: 'Italic (Ctrl+I)', group: 'text' },
  { label: '<>', action: 'code', surround: '`', title: 'Inline Code', group: 'text' },
  { label: '~~', action: 'strikethrough', surround: '~~', title: 'Strikethrough', group: 'text' },
  
  { label: 'H1', action: 'h1', prefix: '# ', title: 'Heading 1', group: 'heading' },
  { label: 'H2', action: 'h2', prefix: '## ', title: 'Heading 2', group: 'heading' },
  { label: 'H3', action: 'h3', prefix: '### ', title: 'Heading 3', group: 'heading' },
  
  { label: '• List', action: 'list', prefix: '- ', title: 'Bullet List', group: 'list' },
  { label: '1. List', action: 'orderedList', prefix: '1. ', title: 'Numbered List', group: 'list' },
  { label: '☐', action: 'checklist', prefix: '- [ ] ', title: 'Checkbox List', group: 'list' },
  
  { label: '🔗', action: 'link', format: '[text](url)', title: 'Insert Link', group: 'element' },
  { label: '🖼', action: 'image', format: '![alt](url)', title: 'Insert Image', group: 'element', special: 'image' },
  { label: '❝', action: 'quote', prefix: '> ', title: 'Blockquote', group: 'element' },
  { label: '{ }', action: 'codeblock', format: '```\ncode\n```', title: 'Code Block', group: 'element' },
  { label: '↔', action: 'table', format: '| Col1 | Col2 |\n|------|------|\n| Data | Data |', title: 'Table', group: 'element' },
  
  { label: '─', action: 'divider', format: '\n---\n', title: 'Divider', group: 'special' },
];

// Simple markdown to HTML converter for preview
function parseMarkdownPreview(md: string): string {
  let html = md;
  
  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width: 100%; margin: 10px 0; border: 1px solid #ddd;" />');
  
  // Code blocks
  html = html.replace(/```(.*?)```/gs, '<pre style="background: #f5f5f5; padding: 10px; border-left: 3px solid #111; overflow-x: auto;"><code>$1</code></pre>');
  
  // Headings
  html = html.replace(/^### (.*?)$/gm, '<h3 style="font-size: 1.5em; font-weight: bold; margin: 10px 0;">$1</h3>');
  html = html.replace(/^## (.*?)$/gm, '<h2 style="font-size: 1.8em; font-weight: bold; margin: 10px 0;">$1</h2>');
  html = html.replace(/^# (.*?)$/gm, '<h1 style="font-size: 2.2em; font-weight: bold; margin: 10px 0;">$1</h1>');
  
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight: bold;">$1</strong>');
  
  // Italic
  html = html.replace(/_(.*?)_/g, '<em style="font-style: italic;">$1</em>');
  
  // Links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" style="color: #0E7490; text-decoration: underline;">$1</a>');
  
  // Line breaks
  html = html.replace(/\n/g, '<br />');
  
  return html;
}

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const [showPreview, setShowPreview] = useState(true);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleToolClick = (tool: any) => {
    if (tool.special === 'image') {
      imageInputRef.current?.click();
      return;
    }

    const textarea = textareaRef.current;
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
      const lineStart = value.lastIndexOf('\n', start - 1) + 1;
      newValue = value.substring(0, lineStart) + tool.prefix + value.substring(lineStart);
      newStart = lineStart + tool.prefix.length;
    } else if (tool.format) {
      newValue = value.substring(0, start) + tool.format + value.substring(end);
      newStart = start + tool.format.length;
    }

    onChange(newValue);

    setTimeout(() => {
      textarea.setSelectionRange(newStart, newEnd);
      textarea.focus();
    }, 0);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a data URL for preview
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageDataUrl = event.target?.result as string;
      const imageName = file.name;
      const imageMarkdown = `![${imageName}](${imageDataUrl})`;
      
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const newValue = value.substring(0, start) + '\n' + imageMarkdown + '\n' + value.substring(start);
      onChange(newValue);

      setTimeout(() => {
        textarea.setSelectionRange(start + imageMarkdown.length + 2, start + imageMarkdown.length + 2);
        textarea.focus();
      }, 0);
    };
    reader.readAsDataURL(file);

    // Reset input
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  const groupedTools = {
    text: tools.filter(t => t.group === 'text'),
    heading: tools.filter(t => t.group === 'heading'),
    list: tools.filter(t => t.group === 'list'),
    element: tools.filter(t => t.group === 'element'),
    special: tools.filter(t => t.group === 'special'),
  };

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="border-2 border-[#111] bg-white flex justify-between items-center">
        <div className="flex gap-0.5 p-2 flex-wrap flex-1">
          {groupedTools.text.map(tool => (
            <button
              key={tool.action}
              type="button"
              onClick={() => handleToolClick(tool)}
              title={tool.title}
              className="px-2.5 py-1.5 border border-[#999] bg-white hover:bg-[#f5f5f5] text-[#333] font-bold text-xs transition-all"
              style={{ minWidth: '32px' }}
            >
              {tool.label}
            </button>
          ))}
          
          <div className="w-px bg-[#ddd] mx-1"></div>

          {groupedTools.heading.map(tool => (
            <button
              key={tool.action}
              type="button"
              onClick={() => handleToolClick(tool)}
              title={tool.title}
              className="px-2.5 py-1.5 border border-[#999] bg-white hover:bg-[#f5f5f5] text-[#333] font-bold text-xs transition-all"
              style={{ minWidth: '32px' }}
            >
              {tool.label}
            </button>
          ))}

          <div className="w-px bg-[#ddd] mx-1"></div>

          {groupedTools.list.map(tool => (
            <button
              key={tool.action}
              type="button"
              onClick={() => handleToolClick(tool)}
              title={tool.title}
              className="px-2.5 py-1.5 border border-[#999] bg-white hover:bg-[#f5f5f5] text-[#333] font-bold text-xs transition-all"
              style={{ minWidth: '32px' }}
            >
              {tool.label}
            </button>
          ))}

          <div className="w-px bg-[#ddd] mx-1"></div>

          {groupedTools.element.map(tool => (
            <button
              key={tool.action}
              type="button"
              onClick={() => handleToolClick(tool)}
              title={tool.title}
              className="px-2.5 py-1.5 border border-[#999] bg-white hover:bg-[#f5f5f5] text-[#333] font-bold text-xs transition-all"
              style={{ minWidth: '32px' }}
            >
              {tool.label}
            </button>
          ))}

          <div className="w-px bg-[#ddd] mx-1"></div>

          {groupedTools.special.map(tool => (
            <button
              key={tool.action}
              type="button"
              onClick={() => handleToolClick(tool)}
              title={tool.title}
              className="px-2.5 py-1.5 border border-[#999] bg-white hover:bg-[#f5f5f5] text-[#333] font-bold text-xs transition-all"
              style={{ minWidth: '32px' }}
            >
              {tool.label}
            </button>
          ))}
        </div>

        {/* Preview Toggle */}
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="px-3 py-2 border-l border-[#999] bg-white hover:bg-[#f5f5f5] text-[#333] font-bold text-xs transition-all whitespace-nowrap"
          title="Toggle preview"
        >
          {showPreview ? '👁 Hide' : '👁 Show'}
        </button>

        {/* Hidden file input */}
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
      </div>

      {/* Editor + Preview */}
      <div className={`flex gap-3 ${showPreview ? 'grid grid-cols-1 lg:grid-cols-2' : ''}`}>
        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write your post in Markdown..."
          className="w-full min-h-96 p-4 border-2 border-[#111] font-space-mono text-sm"
          style={{
            background: '#FFFFFF',
            color: '#111111',
            fontFamily: "'Space Mono', monospace",
            resize: 'vertical',
            boxShadow: '4px 4px 0px rgba(0, 0, 0, 0.1)',
          }}
        />

        {/* Preview Pane */}
        {showPreview && (
          <div 
            className="border-2 border-[#111] p-4 overflow-y-auto"
            style={{
              background: '#FFFFFF',
              minHeight: '384px',
              boxShadow: '4px 4px 0px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div className="font-bold text-xs uppercase tracking-widest text-[#111] mb-4 pb-2 border-b border-[#ddd]">
              Preview
            </div>
            <div 
              dangerouslySetInnerHTML={{ __html: parseMarkdownPreview(value) }}
              style={{
                fontSize: '14px',
                lineHeight: '1.6',
                color: '#333',
              }}
            />
          </div>
        )}
      </div>

      {/* Help Text */}
      <div className="bg-[#F9F9F9] border border-[#ddd] p-3 text-xs text-[#666]">
        <strong>Tip:</strong> Use the toolbar buttons to format text. Click 🖼 to upload images. Enable preview to see live formatting.
      </div>
    </div>
  );
}
