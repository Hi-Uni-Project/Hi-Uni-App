type TermsKey =
  | 'all'
  | 'service'
  | 'privacy'
  | 'marketing'
  | 'data'
  | 'identity';

type TermsType = 'required' | 'optional' | 'none';

interface TermsItem {
  readonly key: TermsKey;
  readonly type: TermsType;
  readonly title: string;
  readonly description: string | null;
}

export type { TermsItem, TermsKey, TermsType };
