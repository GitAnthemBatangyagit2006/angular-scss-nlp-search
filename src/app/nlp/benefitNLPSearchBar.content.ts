export interface RootObject {
  default: Content;
}

export interface Content {
  searchBarHint: string;
  searchBarAriaLabel: string;
  showMore: string;
  showLess: string;
  noMatchingKeywords: string;
  categories: Category[];
}

export interface Category {
  name: string;
  description: string;
  ariaLabel: string;
  image: string;
  analyticTag: string;
  sortNo?: number,
}
