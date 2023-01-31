/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react"
import "./App.css"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

import Sentiment from "sentiment"
import { Avatar, CardHeader, Grid } from "@mui/material"
import { red } from "@mui/material/colors"
import styled from "styled-components"
const sentiment = new Sentiment()

const BtnChoice = styled.button`
  background-color: white;
  border: 3px solid ${(props) => props.bgColor};
  // max-width: 100px;

  color: ${(props) => props.bgColor};
  border-radius: 15px;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    background-color: ${(props) => props.bgHover};
    transition: all 0.1s ease-in 0s;
    text-shadow: none;
    color: white;
  }
`

const EmojiResult = (props) => {
  const { score } = props
  return parseInt(score.current) === 0 ? (
    <div className="imageDisplay">
      <img
        width={150}
        height={150}
        alt="neutral emoji"
        src="https://img.icons8.com/officel/80/000000/neutral-emoticon.png"
      />
    </div>
  ) : parseInt(score.current) > 0 ? (
    <div className="imageDisplay">
      <img
        width={150}
        height={150}
        alt="happy emoji"
        src="https://img.icons8.com/color/96/000000/happy.png"
      />
    </div>
  ) : (
    <div className="imageDisplay">
      <img
        width={150}
        height={150}
        alt="angry emoji"
        src="https://img.icons8.com/emoji/512/angry-face-emoji--v2.png"
      />
    </div>
  )
}

const TwitterCard = (props) => {
  const { tweet } = props

  return (
    <Card
      sx={{
        minWidth: 150,
        maxWidth: 300,
        borderRadius: 5,
        margin: 1,
        maxHeight: "fit-content",
      }}
    >
      <CardContent>
        <Typography sx={{ mb: 0.5 }} color="text.primary">
          {tweet.text}
        </Typography>
      </CardContent>
      <CardActions>
        <a
          href={`https://twitter.com/anyuser/status/${tweet.id}`}
          target="_blank"
          rel="noreferrer"
        >
          <Button size="small">Read Tweet</Button>
        </a>
      </CardActions>
    </Card>
  )
}

const NewsCard = (props) => {
  const { article } = props

  return (
    <Card
      sx={{
        minWidth: 150,
        maxWidth: 300,
        borderRadius: 5,
        margin: 1,
        maxHeight: "fit-content",
      }}
    >
      <CardHeader title={article.source.name} subheader={article.publishedAt} />
      <CardContent>
        <Typography sx={{ mb: 0.5 }} color="text.primary">
          {article.title}
        </Typography>
      </CardContent>
      <CardActions>
        <a href={`${article.url}`} target="_blank" rel="noreferrer">
          <Button size="small">Read Post</Button>
        </a>
      </CardActions>
    </Card>
  )
}

const RedditCard = (props) => {
  const { post } = props
  var timeStamp = new Date(post.time * 1000)
  return (
    <Card
      sx={{
        minWidth: 150,
        maxWidth: 300,
        borderRadius: 5,
        margin: 1,
        maxHeight: "fit-content",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              backgroundColor: red[500],
              fontSize: "12px",
              fontWeight: "bold",
            }}
            aria-label="recipe"
          >
            {post.score}
          </Avatar>
        }
        title={post.author}
        subheader={timeStamp.toLocaleDateString()}
      />
      <CardContent>
        <Typography sx={{ mb: 0.5 }} color="text.primary">
          {post.title}
        </Typography>
      </CardContent>
      <CardActions>
        <a
          href={`https://www.reddit.com${post.url}`}
          target="_blank"
          rel="noreferrer"
        >
          <Button size="small">Read Post</Button>
        </a>
      </CardActions>
    </Card>
  )
}

function App() {
  const [toggleReddit, setToggleReddit] = useState(false)
  const [toggleTwitter, setToggleTwitter] = useState(false)
  const [toggleNews, setToggleNews] = useState(false)

  const handleClick = (e) => {
    if (e.target.id === "Reddit" || e.target.id === "RedditLogo") {
      if (toggleReddit === true) {
      } else {
        setToggleReddit(!toggleReddit)
        setToggleTwitter(false)
        setToggleNews(false)
      }
    }
    if (e.target.id === "Twitter" || e.target.id === "TwitterLogo") {
      if (toggleTwitter === true) {
      } else {
        setToggleTwitter(!toggleTwitter)
        setToggleReddit(false)
        setToggleNews(false)
      }
    }
    if (e.target.id === "News" || e.target.id === "GlobeLogo") {
      if (toggleNews === true) {
      } else {
        setToggleNews(!toggleNews)
        setToggleReddit(false)
        setToggleTwitter(false)
      }
    }
  }

  const renderView = () => {
    if (toggleReddit) {
      return <Reddit />
    }
    if (toggleTwitter) {
      return <Twitter />
    }
    if (toggleNews) {
      return <News />
    }
  }

  return (
    <div>
      <div id="headerSection">
        <div id="headerContent">
          <h1 style={{ color: "black" }}>Sentiment Tracker</h1>
          <div id="websiteOptions">
            <BtnChoice
              bgColor="#FF5700"
              bgHover="#FF5700"
              id="Reddit"
              onClick={handleClick}
              className="btn-choice"
            >
              Reddit
              <img
                src="https://i.imgur.com/T8CbSS2.png"
                width="25px"
                id="RedditLogo"
                alt="reddit logo"
                style={{ padding: "0 0 0 5px" }}
              />
            </BtnChoice>
            <BtnChoice
              bgColor="#1DA1F2"
              bgHover="#1DA1F2"
              id="Twitter"
              onClick={handleClick}
              className="btn-choice"
            >
              Twitter
              <img
                src="https://i.imgur.com/0SVzlVQ.png"
                width="25px"
                alt="twitter logo"
                id="TwitterLogo"
              />
            </BtnChoice>
            <BtnChoice
              bgColor="#14171A"
              bgHover="#14171A"
              id="News"
              onClick={handleClick}
              className="btn-choice"
            >
              News
              <img
                src="https://i.imgur.com/ZdEcdRi.png"
                width="20px"
                alt="globe logo"
                id="GlobeLogo"
                style={{ padding: "0 0 0 5px" }}
              />
            </BtnChoice>
          </div>
        </div>
      </div>

      {renderView()}
    </div>
  )
}

const Reddit = () => {
  const [query, setQuery] = useState("")
  const [submittedQuery, setSubmittedQuery] = useState("")
  const [sentimentScore, setSentimentScore] = useState(null)
  const [subreddit, setSubreddit] = useState("")
  const [posts, setPosts] = useState([])
  let result = useRef(0)

  useEffect(() => {
    if (posts.length > 0) {
      posts.forEach((post) => {
        result.current = result.current + sentiment.analyze(post.title).score
      })
      setSentimentScore(result)
    }
  }, [posts])

  useEffect(() => {
    if (submittedQuery !== "") {
      const url = `https://www.reddit.com/subreddits/search.json?q=${submittedQuery}&restrict_sr=on`

      fetch(url, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          let arr = {
            name: data.data.children[0].data.display_name,
            subredditTitle: data.data.children[0].data.display_name_prefixed,
          }
          setSubreddit(arr)
        })
        .catch((error) => console.log("error", error))
    }
  }, [submittedQuery])

  useEffect(() => {
    if (subreddit !== "") {
      const url = `https://www.reddit.com/r/${subreddit.name}/hot.json`

      fetch(url, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          let arr = []
          for (let i = 0; i < data.data.children.length; i++) {
            let item = {
              title: data.data.children[i].data.title,
              score: data.data.children[i].data.score,
              author: data.data.children[i].data.author,
              url: data.data.children[i].data.permalink,
              time: data.data.children[i].data.created_utc,
            }
            arr.push(item)
          }
          setPosts(arr)
        })
        .catch((error) => console.log("error", error))
    }
  }, [subreddit])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (e.target[0].value !== "") {
      setSubmittedQuery(query)
    }
    setQuery("")
    setSentimentScore(0)
    result.current = 0
  }

  return (
    <div className="container">
      <div className="searchContainer">
        <div className="searchBox">
          <label>Search for a subreddit</label>
          <form onSubmit={handleSubmit} className="searchForm">
            <div className="searchInput">
              <input
                className="inputContainer"
                placeholder="Search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="searchIconContainer" type="submit">
                <img src="https://i.imgur.com/7YmDG87.png" alt="search-icon" />
              </button>
            </div>
          </form>
        </div>
        <div>
          {submittedQuery !== "" ? (
            <div>
              You searched for{" "}
              <span style={{ fontWeight: "bold" }}>{submittedQuery}</span>
            </div>
          ) : (
            "Waiting for a query"
          )}
        </div>
        <div>
          {subreddit !== "" ? (
            <div>
              Looking up posts in{" "}
              <span style={{ fontWeight: "bold" }}>
                {subreddit.subredditTitle}
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="resultsContainer">
        <div className="sentimentDisplay">
          {result !== 0 ? (
            <p>
              Sentiment Score:{" "}
              <span style={{ fontWeight: "bold" }}>{result.current}</span>
            </p>
          ) : (
            ""
          )}
          {sentimentScore ? <EmojiResult score={sentimentScore} /> : ""}
        </div>

        <Grid container spacing={0.5}>
          {posts.length > 0
            ? posts.map((post) => {
                return (
                  <Grid key={post.time} item xs>
                    <RedditCard key={post.time} post={post} />
                  </Grid>
                )
              })
            : ""}
        </Grid>
      </div>
    </div>
  )
}

const News = () => {
  const [sentimentScore, setSentimentScore] = useState(null)
  const [headlines, setHeadlines] = useState([])
  const [query, setQuery] = useState("")
  const [submittedQuery, setSubmittedQuery] = useState("")
  let result = useRef(0)

  useEffect(() => {
    if (headlines.length > 0) {
      headlines.forEach((headline) => {
        result.current =
          result.current + sentiment.analyze(headline.title).score
      })
      setSentimentScore(result)
    }
  }, [headlines])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (e.target[0].value !== "") {
      setSubmittedQuery(query)
    }
    setQuery("")
    setSentimentScore(0)
    result.current = 0
  }

  useEffect(() => {
    if (submittedQuery !== "") {
      const url = `/news?q=${submittedQuery}`
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: submittedQuery }),
      })
        .then((response) => response.json())
        .then((data) => {
          setHeadlines(data)
        })
        .catch((error) => console.log("error", error))
    }
  }, [submittedQuery])

  return (
    <div className="container">
      <div className="searchContainer">
        <div className="searchBox">
          <label>Search for news headlines</label>
          <form className="searchForm" onSubmit={handleSubmit}>
            <div className="searchInput">
              <input
                className="inputContainer"
                placeholder="Search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="searchIconContainer" type="submit">
                <img src="https://i.imgur.com/7YmDG87.png" alt="search-icon" />
              </button>
            </div>
          </form>
        </div>

        <div>
          {submittedQuery !== "" ? (
            <div>
              You searched for{" "}
              <span style={{ fontWeight: "bold" }}>{submittedQuery}</span>
            </div>
          ) : (
            "Waiting for a query"
          )}
        </div>
      </div>

      <div className="resultsContainer">
        <div className="sentimentDisplay">
          {result !== 0 ? (
            <p>
              Sentiment Score:{" "}
              <span style={{ fontWeight: "bold" }}>{result.current}</span>
            </p>
          ) : (
            ""
          )}
          {sentimentScore ? <EmojiResult score={sentimentScore} /> : ""}
        </div>

        <div>
          {headlines.length > 0 ? (
            <div>
              <Grid container spacing={0.5}>
                {headlines.length > 0
                  ? headlines.map((item) => {
                      return (
                        <Grid key={item.url} item xs>
                          <NewsCard key={item.url} article={item} />
                        </Grid>
                      )
                    })
                  : ""}
              </Grid>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  )
}

const Twitter = () => {
  const [sentimentScore, setSentimentScore] = useState(null)
  const [tweets, setTweets] = useState([])
  const [query, setQuery] = useState("")
  const [submittedQuery, setSubmittedQuery] = useState("")
  let result = useRef(0)

  useEffect(() => {
    if (tweets.length > 0) {
      tweets.forEach((tweet) => {
        result.current = result.current + sentiment.analyze(tweet.text).score
      })
      setSentimentScore(result)
    }
  }, [tweets])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (e.target[0].value !== "") {
      setSubmittedQuery(query)
    }
    setQuery("")
    setSentimentScore(0)
    result.current = 0
  }

  useEffect(() => {
    if (submittedQuery !== "") {
      const url = `/tweets?q=${submittedQuery}`

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: submittedQuery }),
      })
        .then((response) => response.json())
        .then((data) => {
          setTweets(data)
        })
        .catch((error) => console.log("error", error))
    }
  }, [submittedQuery])

  return (
    <div className="container">
      <div className="searchContainer">
        <div className="searchBox">
          <label>Search for a topic</label>
          <form onSubmit={handleSubmit} className="searchForm">
            <div className="searchInput">
              <input
                className="inputContainer"
                placeholder="Search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="searchIconContainer" type="submit">
                <img src="https://i.imgur.com/7YmDG87.png" alt="search-icon" />
              </button>
            </div>
          </form>
        </div>

        <div>
          {submittedQuery !== "" ? (
            <div>
              You searched for{" "}
              <span style={{ fontWeight: "bold" }}>{submittedQuery}</span>
            </div>
          ) : (
            "Waiting for a query"
          )}
        </div>
      </div>

      <div className="resultsContainer">
        <div className="sentimentDisplay">
          {result !== 0 ? (
            <p>
              Sentiment Score:{" "}
              <span style={{ fontWeight: "bold" }}>{result.current}</span>
            </p>
          ) : (
            ""
          )}

          {sentimentScore ? <EmojiResult score={sentimentScore} /> : ""}
        </div>
        <div>
          {tweets.length > 0 ? (
            <div>
              <Grid container spacing={0.5}>
                {tweets.length > 0
                  ? tweets.map((item) => {
                      return (
                        <Grid key={item.id} item xs>
                          <TwitterCard key={item.id} tweet={item} />
                        </Grid>
                      )
                    })
                  : ""}
              </Grid>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  )
}

export default App

