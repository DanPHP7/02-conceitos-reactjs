import React, { useEffect, useState } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([]);
  const [newRepo, setNewRepo] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    api.get("/repositories").then((result) => setRepository(result.data));
  }, []);
  async function handleAddRepository() {
    // TODO
    const response = await api.post("/repositories", {
      title: newRepo,
      url,
      techs: ["git", "go", "javascript"],
    });
    const repository = response.data;

    setRepository([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`/repositories/${id}`);

    const repository = repositories.findIndex((repo) => repo.id === id);

    const newArrayRepositories = repositories;

    newArrayRepositories.splice(repository, 1);

    setRepository([...newArrayRepositories]);
  }

  return (
    <div id="container">
      <form>
        <label htmlFor="title">Titulo</label>
        <input
          type="text"
          id="title"
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
        />

        <label htmlFor="url">URL</label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button onClick={handleAddRepository}>Adicionar</button>
      </form>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            <span>{repo.title}</span>
            <a style={{ paddingLeft: "10px" }} href={repo.url}>
              url
            </a>
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
