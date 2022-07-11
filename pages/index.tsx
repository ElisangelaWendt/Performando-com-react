import { FormEvent, useState } from "react"
import { SearchResult } from "../components/SearchResults";

export default function Home(){
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])


  async function handleSearch(event: FormEvent){
    event.preventDefault();

    // verificar se a busca não está vazia, caso esteja vazia a funcção não vai executar
    if(!search.trim()){
      return;
    }

    const response = await fetch(`http://localhost:3333/product?q=${search}`)
    const data = await response.json();

    setResults(data);
  }
  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        {/* no onChange, cada vez que o usuário digitar algo será atualizado o valor de pesquisa */}
        <input type="text" 
        value={search} 
        onChange={e => setSearch(e.target.value)} />
        <button type="submit">Buscar</button>
      </form>

      <SearchResult results={results}/>
    </div>
  )
}
