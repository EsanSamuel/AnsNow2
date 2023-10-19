"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import PromptCard from "./PromptCard";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "blue",
};

const CardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 flex justify-center flex-col items-center gap-3">
      {data?.length > 0 ? (
        <>
          {data.reverse().map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleTagClick={handleTagClick}
            />
          ))}
        </>
      ) : (
        <div>No post found!</div>
      )}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [allPost, setAllPosts] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const [isLoading,setIsLoading] = useState(false)

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      const response = await axios.get("/api/prompt");
      setAllPosts(response.data.reverse());
      console.log(response.data);
      setIsLoading(false)
    };

    getData();
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPost.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  
  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };


  return (
    <div className="mt-10">
      <input
        className="w-full flex rounded-lg mt-2 p-3 text-sm text-gray-500 outline-0 input"
        type="search"
        placeholder="Search..."
        onChange={handleSearchChange}
        value={searchText}
      />

      {isLoading && (
      <div className='text-center mt-10'>
      <ClipLoader
        color='blue'
        loading='loading'
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>
      )}

      {searchText ? (
        <CardList data={searchedResults} handleTagClick={handleTagClick} />
      ) : (
        <CardList data={allPost} handleTagClick={handleTagClick} />
      )}
    </div>
  );
};

export default Feed;
