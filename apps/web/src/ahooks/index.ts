import { useLocalStorageState } from 'ahooks';
import { useEffect } from 'react';
import { changePageColor } from 'src/utils';

export const useTheme = () => {
  const [arcoThem] = useLocalStorageState('arco-theme');
  useEffect(() => {
    if (arcoThem) {
      document.body.setAttribute('arco-theme', 'dark');
    } else {
      document.body.setAttribute('arco-theme', '');
    }
  }, []);
};

export const useColor = () => {
  const [arcoThemColor, setArcoThemColor] = useLocalStorageState<any>('#0037A1');
  useEffect(() => {
    if (!arcoThemColor) {
      setArcoThemColor('#0037A1');
    }

    changePageColor('#0037A1');
  }, [arcoThemColor]);
  return [arcoThemColor, setArcoThemColor];
};
