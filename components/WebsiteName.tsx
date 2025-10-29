"use client";

const WebsiteName = () => {
  const siteName = window.location.hostname;
  return <>{siteName}</>;
};

export default WebsiteName;
