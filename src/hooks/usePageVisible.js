import { useEffect, useState } from 'react';

/** True while the browser tab is visible — used to pause the 3D loop in background tabs. */
export default function usePageVisible() {
  const [visible, setVisible] = useState(() => (typeof document === 'undefined' ? true : !document.hidden));

  useEffect(() => {
    const onChange = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', onChange);
    return () => document.removeEventListener('visibilitychange', onChange);
  }, []);

  return visible;
}
