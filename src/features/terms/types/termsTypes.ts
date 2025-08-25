type TermsKey =
  | 'all'
  | 'service'
  | 'privacy'
  | 'marketing'
  | 'data'
  | 'identity';

type TermsType = 'required' | 'optional' | 'none';

interface TermsItem {
  key: TermsKey;
  type: TermsType;
  title: string;
  description: string | null;
}

export type { TermsItem, TermsKey, TermsType };
