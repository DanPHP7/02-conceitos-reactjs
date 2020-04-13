import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import arrayToTextConverter from "./utils/arrayTextConverter";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([]);
  const [newRepo, setNewRepo] = useState("");
  const [url, setUrl] = useState("");
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((result) => setRepository(result.data));
  }, []);
  async function handleAddRepository() {
    // TODO
    const arrayTechs = arrayToTextConverter(techs);
    const response = await api.post("/repositories", {
      title: newRepo,
      url,
      techs: arrayTechs,
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

        <label htmlFor="techs">Techs</label>
        <input
          type="text"
          id="techs"
          value={techs}
          onChange={(e) => setTechs(e.target.value)}
        />

        <button onClick={handleAddRepository}>Adicionar</button>
      </form>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            <div id="content">
              <a style={{ paddingLeft: "10px" }} href={repo.url}>
                <span>{repo.title}</span>
              </a>
              <MdClose
                color="#ca4949"
                size={20}
                onClick={() => handleRemoveRepository(repo.id)}
              />
            </div>

            <div id="techs">
              {repo.techs.map((tech) => (
                <span>{tech}</span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
