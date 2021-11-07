import { useLayoutEffect } from 'react';

const useDocumentTitle = (title) => {
  useLayoutEffect(() => {
    if (title) {
      document.title = title;
    } else {
      document.title = 'Art & Craft Gallery';
    }
  }, [title]);
};

export default useDocumentTitle;
