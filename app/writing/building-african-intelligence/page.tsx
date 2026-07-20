import type { Metadata } from 'next';
import ArticleView from './ArticleView';

export const metadata: Metadata = {
  title: 'Building African Intelligence',
  description:
    'Why sovereign AI, built government-first, is the future of intelligence in Africa. By Tatenda Ncube-Muchandibaya, Founder & CEO of Lattanye.'
};

export default function Page() {
  return <ArticleView />;
}
