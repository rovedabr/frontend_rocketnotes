import { useState } from "react"

import { Textarea } from "../../components/Textarea"
import { NoteItem } from "../../components/NoteItem"
import { Section } from "../../components/Section"
import { Header } from "../../components/Header"
import { Button } from "../../components/Button"
import { Input } from "../../components/Input"
import { Link } from "react-router-dom"

import { Container, Form } from "./style"

export function New() {

  const [links, setLinks] = useState([])
  const [newLink, setNewLink] useState("")

  function handleAddLink(){
    setLinks(prevState => [...prevState, newLink])
    setNewLink("")
  }

  return (
    <Container>
      <Header/>

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <Link to="/"></Link>
          </header>

          <Input placeholder = "Título"/>
          <Textarea placeholder="Observações"/>

          <Section title="Links úteis">

            {
              links.map((link, index) => (
                <NoteItem 
                key={String(index)}
                value={link}
                onClick={() => {}}
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
              <NoteItem placeholder="React" value=""/>
              <NoteItem placeholder="Nova tag" isNew value=""/>
            </div>
          </Section>

          <Button title="Salvar" />

        </Form>
      </main>
    </Container>
  )
}