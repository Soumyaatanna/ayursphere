
import React from 'react';
import { marked } from 'marked';

interface MarkdownPreviewProps {
  content: string;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ content }) => {
  const [html, setHtml] = React.useState('');

  React.useEffect(() => {
    if (content) {
      // Use the imported marked library instead of window.marked
      const parsed = marked.parse(content);
      
      if (typeof parsed === 'string') {
        setHtml(parsed);
      } else if (parsed instanceof Promise) {
        // If it's a promise, handle it
        parsed.then(result => {
          setHtml(result);
        });
      }
    } else {
      setHtml('<p>Nothing to preview</p>');
    }
  }, [content]);

  return (
    <div 
      className="prose-ayur max-w-none" 
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MarkdownPreview;
