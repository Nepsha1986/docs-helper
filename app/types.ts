type Link = {
    text: string;
    url: string;
  };
  
  type InfoBlock = {
    title: string;
    description: string;
    links: Link[];
  };
  
  export type DocsMapper = {
    [key: string]: InfoBlock;
  };