import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

import { FiPlus, FiSearch } from "react-icons/fi";
import { Container, Brand, Menu, Search, Content, NewNote } from "./styles";

import { Header } from "../../components/Header"
import { ButtonText } from "../../components/ButtonText"
import { Input } from "../../components/Input"
import { Section } from "../../components/Section"
import { Note } from "../../components/Note"

export function Home() {
  const [tags, setTags] = useState([])
  const [tagsSelected, setTagsSelected] = useState([])
  const [search, setSearch] = useState([])
  const [notes, setNotes] = useState([])

  const navigate = useNavigate()


    function handleTagSelected(tagName) {
      if(tagName === "all") {   //limpa os filtros e deixa apenas o filtro de todos selecionado
        return setTagsSelected([])
      }

      const alreadySelected = tagsSelected.includes(tagName)

      if (alreadySelected) {
        const filteredTags = tagsSelected.filter(tag => tag !== tagName)
        setTagsSelected(filteredTags)
      } else {
        setTagsSelected(prevState =>[...tagsSelected, tagName])
      }

     function handleDetails(id) { //levar para a página de detalhes da tag dependendo do usuário
      navigate(`/detail${id}`)
     }

  useEffect(() => {
    async function fetchTags() {
      const response = await api.get("/tags")
      setTags(response.data)
    }
  
  }),[]

  useEffect(() => {
    fetchTags()
      async function fetchNotes() {
        const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`)
        setNotes(response.data)
      }
      fetchNotes()

  }),[tagsSelected, search]

  return (
    <Container>
      <Brand>
      <h1>Rocketnotes</h1>
      </Brand>

      <Header/>

      <Menu>
      <li><ButtonText 
        title="Todos" 
        onClick={() => handleTagSelected("all")}
        isActive={tagsSelected.length === 0}
        />
      </li>
        {
          tags && tags.map(tag => (
              <li hey={String(tag.id)}>
                <ButtonText 
                 title={tag.name} 
                 onClick={() => handleTagSelected(tag.name)}
                 isActive={tagsSelected.includes(tag.name)}
                />
              </li>
          ))
        }
      </Menu>

      <Search>
        <Input 
          placeholder="Pesquisar pelo título" 
          onChange={(e) => setSearch(e.target.value)} //filtra as tags por parte dos nomes (incluindo letras) obedecendo o filtro "like" do backend linkado ao useeffect linha 44 do fronte deste código
          icon={FiSearch}/>
      </Search>

      <Content>
        <Section title="Minhas notas">
          {
            note.map(note => (
              <Note
              key={String(note.id)}
              data={note}
              onClick={() => handleDetails(note_id)} //mostra os detalhes da nota
              />
            ))
          }
        </Section>
      </Content>

      <NewNote to="/new">
        <FiPlus/>
        Criar Nota
      </NewNote>

    </Container>
    )
  }
}