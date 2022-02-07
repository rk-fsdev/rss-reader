export interface IBackChannel {
  rss: {
    channel: {
      description: string;
      generator: string;
      image: {
        url: string;
        title: string;
        link: string;
      };
      item: IRSSItem[];
    };
  };
}

export interface IRSSItem {
  title: string;
  pubDate: string;
  link: string;
  updated: {
    __prefix: string;
    __text: string;
  };
  creator: {
    __prefix: string;
    __cdata: string;
  };
  category: string[];
  encoded?: {
    __prefix: "content";
    __cdata: string;
  };
}
