import { Textarea } from "../../components/Textarea"
import { NoteItem } from "../../components/NoteItem"
import { Section } from "../../components/Section"
import { Header } from "../../components/Header"
import { Button } from "../../components/Button"
import { Input } from "../../components/Input"
import { Link } from "react-router-dom"

import { Container, Form } from "./style"

export function New() {
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
            <NoteItem placeholder="Novo link" value="https://www.teste.com"/>
            <NoteItem placeholder="Novo link" isNew value=""/>
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