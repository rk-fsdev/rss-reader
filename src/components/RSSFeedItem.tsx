import React, { useEffect, useRef } from "react";
import classnames from "classnames";

import { IRSSItem } from "../types/xml";

import "./RSSFeedItem.css";

interface Props {
  data: IRSSItem;
  isBookmarked: boolean;
  onClick(rssItem: IRSSItem): void;
  onBookmarkClick(rssItem: IRSSItem): void;
}

const RSSFeedItem: React.FC<Props> = ({
  data,
  isBookmarked,
  onClick,
  onBookmarkClick,
}: Props) => {
  const mainImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data?.encoded?.__cdata) {
      const htmlNode = new DOMParser().parseFromString(
        data.encoded.__cdata,
        "text/html"
      );

      const mainImage = htmlNode.getElementsByTagName("img")?.item(0);
      if (mainImage && mainImageRef.current) {
        mainImageRef.current.replaceWith(mainImage);
      }
    }
  }, [data, mainImageRef]);

  const handleClick = () => {
    onClick(data);
  };

  const handleBookmarkClick = () => {
    onBookmarkClick(data);
  };

  return (
    <li className="rss-feed-item">
      <div
        className={classnames("rss-feed-item__bookmark", {
          active: isBookmarked,
        })}
        onClick={handleBookmarkClick}
      ></div>
      <div>
        <div ref={mainImageRef}></div>
        <p onClick={handleClick}>{data.title}</p>
      </div>
    </li>
  );
};

export default RSSFeedItem;
