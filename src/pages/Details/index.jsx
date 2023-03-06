import { useState, useState } from "react";
import { Container, Links, Content } from "./styles";
import { useParams } from "react-router-dom"; //buscar os parâmetros

import { api } from "../../services/api"; //para recuperar os dados usando o useEffect

import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { Section } from "../../components/Section";
import { Tag } from "../../components/Tag";
import { ButtonText } from "../../components/ButtonText";

export function Details(){

  const [data, setDate] = useState(null) //inicia sem conteúdo

  const params = useParams(); //busca os parâmetro junto com linha 2

  useEffect(() => {
    async function fetchNote() {
      const response = await api.get(`/notes/${params.id}`)
      setDate(response.data) //busca os detalhes da nota
    }

    fetchNote()
  }, [])

  return(
    <Container>
      <Header/>
      {
        data && // se tem conteúdo mostra o "data", caso contrário não mostra nada
        <main>
          <Content> 

            <ButtonText title="Excluir nota"/>

            <h1>
              {data.title}
            </h1>
            <p>
              {data.description}
            </p>
            {
              data.links &&   //se tem conteúdo mostra os links 
              <Section title="Links úteis">
                <Links>
                  {
                    data.links.map(link => ( //função para mostrar os links
                      <li>
                        <a href={link.url}>
                          {link.url}
                        </a>
                      </li>
                    ))
                  } 
                  </Links>
              </Section>
            }
            <Section title="Marcadores">
              <Tag title="express" />
              <Tag title="nodejs" />
            </Section>

            <Button title="Voltar"/>   

          </Content>
        </main>
      }
    </Container>
  )
}