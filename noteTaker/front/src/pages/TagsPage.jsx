import React, { useEffect, useState } from "react";
import "../styles/TagsPage.scss";
import { fetchTags } from "../api/documents/fetchTags";
import TagList from "../components/ProfilePage/TagList";


const TagsPage = () => {
  return (
    <div className="tags-page">
      <TagList />
    </div>
  );
};

export default TagsPage;
