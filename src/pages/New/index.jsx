import { useState } from "react"
import { api } from "../../services/api"
import { useNavigate } from "react-router-dom"

import { ButtonText } from "../../components/ButtonText"
import { Textarea } from "../../components/Textarea"
import { NoteItem } from "../../components/NoteItem"
import { Section } from "../../components/Section"
import { Header } from "../../components/Header"
import { Button } from "../../components/Button"
import { Input } from "../../components/Input"
import { Link } from "react-router-dom"

import { Container, Form } from "./style"

export function New() {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [links, setLinks] = useState([])
  const [newLink, setNewLink] = useState("")

  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState("")

  const navigate = useNavigate()


  function handleAddLink(){
    setLinks(prevState => [...prevState, newLink])
    setNewLink("")
  }

  function handleBack ()  {
    // navigate("/") //volta para a página inicial usado no botão voltar, mas "empilha" as páginas
    navigate(-1) //volta para a página anterior sem "empilhar" o histórico de navegação
  }

  function handleRemoveLink(deleted) {
    setLinks(prevState => prevState.filter(link => link !== deleted))
  }

  function handleAddTag() {
    setTags(prevState => [...prevState, newTag])
    setNewTag("")
  }

  function handleRemoveTag(deleted) {
    setTags(prevState => prevState.filter(tag => tag !== deleted))
  }

  async function handleNewNote() {

    if(!title) {
      return alert("Digite o título da nota")
    }

    if(newLink) {
      return alert("Você deixou um Link preenchido e não clicou em adicionar.")
    }

    if(newTag) {
    return alert("Você deixou uma Tag preenchida e não clicou em adicionar.")
    }

    await api.post("/notes", {
      title,
      description,
      tags,
      links
    })

    alert("Nota criada com sucesso!")
    navigate(-1) //navegar para a página anterior
  }

  return (
    <Container>
      <Header/>

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <ButtonText 
              title="Voltar"
              onClick={handleBack}
            />
            <Link to="/"></Link>
          </header>

          <Input 
            placeholder = "Título"
            oncChange={e => setTitle(e.target.value)}
          />

          <Textarea 
            placeholder="Observações"
            oncChange={e => setDescription(e.target.value)}
          />

          <Section title="Links úteis">

            {
              links.map((link, index) => (
                <NoteItem 
                key={String(index)}
                value={link}
                onClick={() => handleRemoveLink(link)}
              />
              ))
            }

            <NoteItem 
              isNew
              placeholder="Novo link"
              value={newLink}
              oncChange={e => setNewLink(e.target.value)}
              onClick={handleAddLink}
            />

          </Section>

          <Section title="Marcadores">

            <div className="tags">
              {
                tags.map((tag, index) => (
                  <NoteItem
                    key={String(index)}
                    value={tag}
                    onClick={() => handleRemoveTag(tag)}
                  />
                ))
              }
              <NoteItem 
                isNew
                placeholder="React" 
                oncChange={e => setNewTag(e.target.value)}
                value={newTag}
                onClick={handleAddTag}
              />
            </div>

          </Section>

          <Button 
            title="Salvar" 
            onClick={handleNewNote}
          />

        </Form>
      </main>
    </Container>
  )
}
