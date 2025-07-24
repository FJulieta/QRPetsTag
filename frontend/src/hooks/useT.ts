import { useI18n } from '../context/I18nContext';
export const useT = () => {
  const { t } = useI18n();
  return t;
};
