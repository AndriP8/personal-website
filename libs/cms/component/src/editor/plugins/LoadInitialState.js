import { $generateNodesFromDOM } from '@lexical/html';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot, $insertNodes } from 'lexical';
import React from 'react';

export const LoadInitialContent = ({ initialContent }) => {
  const [editor] = useLexicalComposerContext();

  React.useEffect(() => {
    if (!initialContent) {
      return;
    }
    editor.update(() => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(initialContent, 'text/html');
      const nodes = $generateNodesFromDOM(editor, dom);
      $getRoot().select();
      $insertNodes(nodes);
    });
  }, [editor, initialContent]);
  return null;
};
