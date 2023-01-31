function Reddit() {
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
          // setPosts(data)
        })
        .catch((error) => console.log("error", error))
    }
  }, [subreddit])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target[0].value)
    if (e.target[0].value !== "") {
      setSubmittedQuery(query)
    }
    setQuery("")
    setSentimentScore(0)
    result.current = 0
  }

  return (
    <div>
      <div id="container">
        <h4>Get reddit subreddit sentiment</h4>
        <form onSubmit={handleSubmit}>
          <label>
            Enter your query:
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <input type="submit" />
        </form>
        <div>
          {submittedQuery !== "" ? `You searched for ${submittedQuery}` : ""}
        </div>
        <div>
          {subreddit !== ""
            ? `Looking up posts in ${subreddit.subredditTitle}`
            : ""}
        </div>
        {result !== 0 ? <p>Sentiment Score: {result.current}</p> : ""}
        {sentimentScore ? (
          sentimentScore.current === 0 ? (
            <img
              width={150}
              height={150}
              alt=""
              src="https://img.icons8.com/officel/80/000000/neutral-emoticon.png"
            />
          ) : sentimentScore.current > 0 ? (
            <img
              width={150}
              height={150}
              alt=""
              src="https://img.icons8.com/color/96/000000/happy.png"
            />
          ) : (
            <img
              width={150}
              height={150}
              alt=""
              src="https://img.icons8.com/emoji/512/angry-face-emoji--v2.png"
            />
          )
        ) : (
          ""
        )}
        <Grid container spacing={0.5}>
          {posts.length > 0
            ? posts.map((post) => {
                return <BasicCard key={post.time} post={post} />
              })
            : ""}
        </Grid>
      </div>
    </div>
  )
}

export default Reddit

