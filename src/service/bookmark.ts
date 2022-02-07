const BOOKMARK_KEY = "BOOKMARKED_URLS";

export const getBookmarkedItems = () => {
  const text = window.localStorage.getItem(BOOKMARK_KEY);
  if (text) {
    return JSON.parse(text) as string[];
  } else {
    return [];
  }
};

export const addRemoveBookmarkItem = (link: string) => {
  const currentItems = getBookmarkedItems();
  if (!currentItems.includes(link)) {
    window.localStorage.setItem(
      BOOKMARK_KEY,
      JSON.stringify([...currentItems, link])
    );
  } else {
    const linkPos = currentItems.indexOf(link);
    currentItems.splice(linkPos, 1);
    window.localStorage.setItem(BOOKMARK_KEY, JSON.stringify(currentItems));
  }
};
