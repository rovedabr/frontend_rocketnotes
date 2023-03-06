import { useState, useState } from "react";
import { Container, Links, Content } from "./styles";
import { useParams, useNavigate } from "react-router-dom"; //buscar os parâmetros - usenavigate para navegação das páginas

import { api } from "../../services/api"; //para recuperar os dados usando o useEffect

import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { Section } from "../../components/Section";
import { Tag } from "../../components/Tag";
import { ButtonText } from "../../components/ButtonText";

export function Details(){

  const [data, setDate] = useState(null) //inicia sem conteúdo

  const params = useParams(); //busca os parâmetro junto com linha 2
  const navigate = useNavigate() //constante para navegação das páginas

  function handleBack ()  {
    navigate("/") //volta para a página inicial usado no botão voltar
  }

  async function handleRemove() {
    const confirm = window.confirm("Deseja realmente excluir esta nota?") //função que confirma a exclusão de uma nota, retorna VERDADEIRO ou FALSO

    if (confirm) {
      await api.delete(`/notes/${params.id}`) //exclui a nota
      navigate("/")                           //leva o usuário de volta ao início
    }
  }

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

            <ButtonText 
              title="Excluir nota"
              onClick={handleRemove} //função para excluir a nota
            />

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
                      <li key={String(link.id)}> 
                        <a href={link.url} target="_blank"> {/* abrir uma nova página  = target = _blank */}
                          {link.url}
                        </a>
                      </li>
                    ))
                  } 
                  </Links>
              </Section>
            }

            {  //para renderizar as tags dos marcadores
              data.tags && //se tiver tags para mostrar
                <Section title="Marcadores">
                  {
                   data.tags.map( tag => ( //função para mostrar as tags
                     <Tag 
                       key={String(tag.id)}
                       title={tag.name}
                     />
                   )) 
                  }
                </Section>
            }

            <Button 
              title="Voltar" 
              onClick={handleBack}
            />   

          </Content>
        </main>
      }
    </Container>
  )
}