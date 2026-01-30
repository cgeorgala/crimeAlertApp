import { useGetPrivacyPolicyQuery } from '../../store/api';
import { MarkdownInfo } from '../../components/markdownInfo';

export const PrivacyPage = () => {
  const {data: privacy} = useGetPrivacyPolicyQuery();

  return (
    <MarkdownInfo>{privacy}</MarkdownInfo>
  );
};
