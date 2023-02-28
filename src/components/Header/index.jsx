import { RiShutDownLine } from "react-icons/ri"
import { Container, Profile, Logout } from "./styles";

export function Header(){
  return(
    <Container>
      <Profile to="/profile:id">
        <img 
          src="https://www.github.com/rovedabr.png" 
          alt="Foto do usuário" 
        />
        <div>
          <span>Bem-vindo</span>
          <strong>Ivan Roveda</strong>
        </div>
      </Profile>

      <Logout>
        <RiShutDownLine/>
      </Logout>

    </Container>
  )
}