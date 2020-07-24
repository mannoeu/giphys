import React, { useState, useEffect } from "react";
import api from "./services/api";

function App() {
  const [gifs, setGifs] = useState([]);
  const [search, setSearch] = useState("");

  async function getGifs() {
    const res = await api.get(
      `gifs/search?q=${search}&api_key=${process.env.REACT_APP_API_KEY}&limit=4`
    );
    setGifs(res.data?.data);
    console.log(res.data?.data);
  }

  useEffect(() => {
    getGifs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          getGifs();
        }}
      >
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <>
        {gifs.length > 0 ? (
          gifs.map((gif) => (
            <img
              key={gif.id}
              src={`${gif.images?.downsized?.url}`}
              alt="Gif"
            ></img>
          ))
        ) : (
          <h1>Carregando</h1>
        )}
      </>
    </div>
  );
}

export default App;
