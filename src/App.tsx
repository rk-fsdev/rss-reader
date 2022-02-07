import React, { useEffect, useState } from "react";
import X2JS from "x2js";

import MOCK_XML from "./mock/backchannel.xml";
import RSSFeedItem from "./components/RSSFeedItem";
import { addRemoveBookmarkItem, getBookmarkedItems } from "./service/bookmark";
import { IBackChannel, IRSSItem } from "./types/xml";

import "./App.css";

var x2js = new X2JS();

const App: React.FC = () => {
  const [xmlLoading, setXMLLoading] = useState<boolean>(false);
  const [xmlContent, setXMLContent] = useState<string>();
  const [backChannelData, setBackChannelData] = useState<IBackChannel>();
  const [selectedFeed, setSelectedFeed] = useState<IRSSItem>();
  const [bookmarkedURLs, setBookmarkedURLs] = useState<string[]>(
    getBookmarkedItems()
  );

  useEffect(() => {
    async function fetchBackChannel() {
      setXMLLoading(true);
      try {
        const response = await fetch(`https://medium.com/feed/backchannel`, {
          method: "GET",
          headers: {
            "Content-Type": "application/xml",
          },
        });
        if (response.status === 200) {
          const data = await response.text();
          setXMLContent(data);
        }
      } catch (err) {
        // if failed to fetch xml, then let's use mock data
        const response = await fetch(MOCK_XML, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
          },
        });
        const text = await response.text();
        setXMLContent(text);
      }
      setXMLLoading(false);
    }
    fetchBackChannel();
  }, []);

  useEffect(() => {
    if (xmlContent) {
      const response: IBackChannel = x2js.xml2js(xmlContent);
      setBackChannelData(response);
    }
  }, [xmlContent]);

  const handleItemClick = (item: IRSSItem) => {
    setSelectedFeed(item);
  };

  const handleBookmarkClick = (item: IRSSItem) => {
    addRemoveBookmarkItem(item.link);
    setBookmarkedURLs(getBookmarkedItems());
  };

  if (xmlLoading) return <>Loading...</>;

  return (
    <div className="App">
      <div className="sider">
        <ul>
          {backChannelData &&
            backChannelData.rss.channel.item.map((item) => (
              <RSSFeedItem
                key={item.link}
                data={item}
                onClick={handleItemClick}
                onBookmarkClick={handleBookmarkClick}
                isBookmarked={bookmarkedURLs.includes(item.link)}
              />
            ))}
        </ul>
      </div>
      <div className="content">
        {selectedFeed && (
          <div>
            <p
              dangerouslySetInnerHTML={{
                __html: selectedFeed?.encoded?.__cdata || "No data",
              }}
            ></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
