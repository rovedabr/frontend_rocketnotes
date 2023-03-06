import { useState } from "react";
import { useAuth } from "../../hooks/auth";
import avatarPlaceholder from "../../assets/avatar_placeholder.svg"

import { api } from "../../services/api";

import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from "react-icons/fi"
import { Button } from "../../components/Button";
import { Input } from "../../components/Input"
import { useNavigate } from "react-router-dom"; //usenavigate para navegação

import { Container, Form, Avatar } from "./style";
import { ButtonText } from "../../components/ButtonText";

export function Profile() {
  const { user, updateProfile } = useAuth()

  const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar} ` : avatarPlaceholder

  const [ name, setName] = useState(user.name);
  const [ email, setEmail] = useState(user.email);
  const [ passwordOld, setPasswordOld ] = useState();
  const [ passwordNew, setPasswordNew ] = useState();

  const [ avatar, setAvatar ] = useState(user.avatar)
  const [ avatarFile, setAvatarFile ] = useState(null)
  const navigate = useNavigate()

  function handleBack ()  {
    // navigate("/") //volta para a página inicial usado no botão voltar, mas "empilha" as páginas
    navigate(-1) //volta para a página anterior sem "empilhar" o histórico de navegação
  }

  async function handleUpdate() {
    const updated = {    //atualizar os dados do usuário
      name,
      email,
      password: passwordNew,
      old_password: passwordOld
    }

    const userUpdated = Object.assign(user, updated) //atualiza os dados do usuário sobrescrevendo dados antigos

    await updateProfile({ user: userUpdated, avatarFile })

  }

  function handleChangeAvatar(event){
    const file = event.target.files[0]
    setAvatarFile(file)

    const imagePreview = URL.createObjectURL(file)
    setAvatar(imagePreview)
  }

  return (
    <Container>

      <header>
        <button
          type="button"
          onClick={handleBack}
        >
          <FiArrowLeft size={24}/> {/* tamanho do ícone */}
        </button>
        
     
        <Link to="/">
        </Link>
      </header>

      <Form>

        <Avatar>
          <img 
          src={avatar} 
          alt="Foto do usuário" />

          <label htmlFor="avatar">
            <FiCamera/>
            <input
              id="avatar"
              type="file"
              onChange={handleChangeAvatar}
            />
          </label>
        </Avatar>

        <Input
          placeholder="Nome"
          type="text"
          icon={FiUser}
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Input
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          placeholder="Senha atual"
          type="password"
          icon={FiLock}
          onChange={e => setPasswordOld(e.target.value)}
        />
        <Input
          placeholder="Nova senha"
          type="password"
          icon={FiLock}
          onChange={e => setPasswordNew(e.target.value)}
        />

        <Button 
          title="Salvar" 
          onClick={handleUpdate}
        />

      </Form>
    </Container>
  )
}