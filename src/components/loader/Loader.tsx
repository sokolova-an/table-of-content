import React from "react";
import ContentLoader from "react-content-loader";

const Loader = () => (
  <ContentLoader
    speed={2}
    width={300}
    height={300}
    viewBox="0 0 200 160"
    backgroundColor="#e0e0e0"
    foregroundColor="#bdbcbc"
  >
    <rect x="0" y="0" rx="3" ry="3" width="100" height="6" />
    <rect x="0" y="20" rx="3" ry="3" width="140" height="6" />
    <rect x="0" y="40" rx="3" ry="3" width="100" height="6" />
    <rect x="0" y="60" rx="3" ry="3" width="140" height="6" />
    <rect x="0" y="80" rx="3" ry="3" width="100" height="6" />
    <rect x="0" y="100" rx="3" ry="3" width="140" height="6" />
    <rect x="0" y="120" rx="3" ry="3" width="100" height="6" />
    <rect x="0" y="140" rx="3" ry="3" width="140" height="6" />
    <rect x="0" y="160" rx="3" ry="3" width="100" height="6" />
    <rect x="0" y="180" rx="3" ry="3" width="140" height="6" />
  </ContentLoader>
);

export default Loader;
