import { useGetTermsOfUseQuery } from '../../store/api';
import { MarkdownInfo } from '../../components/markdownInfo';

export const TermsPage = () => {
  const {data: terms} = useGetTermsOfUseQuery();

  return (
    <MarkdownInfo>{terms}</MarkdownInfo>
  );
};
