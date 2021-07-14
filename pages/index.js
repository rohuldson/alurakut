import Box from "../src/components/Box";
import MainGrid from "../src/components/MainGrid";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelationship";
import { AlurakutMenu, OrkutNostalgicIconSet } from "../src/lib/OrkutCommons";


function ProfileSidebar(props) {
  console.log(props);

  return (
    <Box>
      <img
        src={`https://github.com/${props.githubUser}.png`}
        style={{ borderRadius: "8px" }}
      />
    </Box>
  );
}

export default function Home() {
  const githubUser = "rohuldson";
  const pessoasFavoritas = ['franklinribe', 'rafaballerini', 'marcobrunodev', 'juunegreiros', 'felipefialho', 'rohuldson']

  return (
    <>
    <AlurakutMenu />
    <MainGrid>
      <div className="profileArea" style={{ gridArea: "profileArea" }}>
        <ProfileSidebar githubUser={githubUser} />
      </div>

      <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
        <Box>
          <h1 className="title">Hey, Bem vindo(a)!</h1>

          <OrkutNostalgicIconSet />
          </Box>
      </div>

      <div
        className="profileRelationshipArea"
        style={{ gridArea: "profileRelationshipArea" }}
      >
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">Pessoas das comunidades ({pessoasFavoritas.length})</h2>
          
          <ul>
            { pessoasFavoritas.map((item)=>{
            return (
             <li>
                <a href={`/users/${item}`} key={item}>
                <img src={`https://github.com/${item}.png`} />
                <span>{item}</span>
                </a>
             </li>
            )
            })}


          </ul>
          
        </ProfileRelationsBoxWrapper>

        <div className="comunites" style={{ gridArea: "comunites" }}>
          <Box>comunidades</Box>
        </div>
      </div>
    </MainGrid>
    </>
  );
}
