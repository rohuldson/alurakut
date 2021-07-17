import React from "react";
import comunidades from "../pages/api/comunidades";

import Box from "../src/components/Box";
import MainGrid from "../src/components/MainGrid";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelationship";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../src/lib/OrkutCommons";

function ProfileSidebar(props) {
  return (
    <Box as="aside">
      <img
        src={`https://github.com/${props.githubUser}.png`}
        style={{ borderRadius: "8px" }}
      />

      <hr />

      <p>
        <a className="boxLink" href="https://github.com/${props.githubUser}">
          @{props.githubUser}
        </a>
      </p>

      <p>
        masculino, <br />
        solteiro(a) <br />
        Brasil
      </p>

      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

function ProfileRelationsBox(props){
  return (
    <ProfileRelationsBoxWrapper>
    <h2 className="smallTitle">
      {props.title} ({props.items.length})
    </h2>

    <ul>
     {/*  { pessoasFavoritas.map((item) => {
        return (
          <ul>

          <li key={item}>
            <a href={`/users/${item}`} >
              <img src={`https://github.com/${item}.png`} />
              <span>{item}</span>
            </a>
          </li>
        );
      })}  */} 
    </ul>
  </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const githubUser = "rohuldson";
  const [comunidades, setComunidades] = React.useState([]);
  
  const pessoasFavoritas = [
    "franklinribe",
    "rafaballerini",
    "marcobrunodev",
    "juunegreiros",
    "felipefialho",
    "rohuldson",
  ];

  // 0 - pegar o array de dados do github

const [seguidores, setSeguidores] = React.useState([]);

  React.useEffect(function(){
   fetch('https://api.github.com/users/rohuldson/followers')
    .then(function (respostaDoServidor) {
      return respostaDoServidor.json();
    })
    .then(function(respostaCompleta){
      setSeguidores(respostaCompleta)
    })

    // API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {          
         'Authorization': '7d325e8223fc3297a8b5134a233faf',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": ` query {     
        allCommunities {
          id
          title
          imageUrl
          creatorSlug             
        }
      }` })
    })
    .then(res => res.json())
.then((res) => {
  const comunidadesDatoCMS = res.data.allCommunities
  console.log(comunidadesDatoCMS)

  setComunidades(comunidadesDatoCMS)

})
.catch((error) => {
  console.log(error);
});

  }, []) 

  console.log('seguidores do return', seguidores)

  
// 1- criar um box com map baseado nos intens do array que pegar do github

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

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form
              onSubmit={function handleCreateCummunit(e) {
                e.preventDefault();
                const dadosDoForm = new FormData(e.target);
                console.log("Campo: ", dadosDoForm.get("title"));
                console.log("Campo: ", dadosDoForm.get("image"));

                const comunidade = {                 
                  title: dadosDoForm.get("title"),
                  imageUrl: dadosDoForm.get("image"),
                  creatorSlug: githubUser,
                };

                fetch('/api/comunidades', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json'},
                  body: JSON.stringify(comunidade) 
                })
                .then(async (res) => {
                  const dados = await res.json();
                  console.log(dados.registroCriado);
                  
                const comunidade = dados.registroCriado;
                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas); 
                })

            
              }}
            >
              <div>
                <input
                  type="text"
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>

        <div
          className="profileRelationshipArea"
          style={{ gridArea: "profileRelationshipArea" }}
        >

        <ProfileRelationsBox title="Seguidores" items={seguidores} />

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas das comunidades ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((item) => {
                return (
                  <li key={item}>
                    <a href={`/users/${item}`} >
                      <img src={`https://github.com/${item}.png`} />
                      <span>{item}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
              
         

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Minhas comunidades ({comunidades.length})
            </h2>

            <ul>
              {comunidades.map((item) => {
                return (
                  <li key={item.id}>
                    <a href={`/comunities/${item.id}`}>
                      <img src={item.imageUrl} />
                      <span>{item.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
