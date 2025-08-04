import React, { useEffect, useState } from "react";
import TweetCard from "../Tweet/Tweetcard.js";
import { fetchAllTweets } from "../../api/tweet.js";

const Tweets = () => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTweets = async () => {
      try {
        const tweetsData = await fetchAllTweets(1, 20);
        console.log("Fetched tweets:", tweetsData);
        setTweets(tweetsData);
      } catch (err) {
        console.error("Failed to fetch tweets", err);
      } finally {
        setLoading(false);
      }
    };

    loadTweets();
  }, []);

  return (
    <div
      style={{
        padding: "24px",
        marginLeft: "240px",
        minHeight: "100vh",
        backgroundColor: "#000",
      }}
    >
      <h2 style={{ color: "#fff", fontSize: "2rem", marginBottom: "16px" }}>
        Latest Tweets 🗨️
      </h2>
      {loading ? (
        <p style={{ color: "#bbb", fontSize: "1.2rem" }}>Loading tweets...</p>
      ) : tweets.length === 0 ? (
        <p style={{ color: "#777", fontStyle: "italic" }}>
          No tweets available yet.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          {tweets.map((tweet) => (
            <TweetCard key={tweet._id} tweet={tweet} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Tweets;