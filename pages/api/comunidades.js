import { SiteClient } from "datocms-client";

export default async function recebedorDeRequest(req, res) {
  if (req.method === "POST") {
    const TOKEN = "6369256af2999c38dd749239e9aafc";

    const client = new SiteClient(TOKEN);

    // validar os dados antes de cadastrar
    const registroCriado = await client.items.create({
      itemType: "975438", // ID criado pelo model do Dato CMS
      ...req.body,
      /* title: "Aprendendo Next.Js",
      imageUrl:
        "https://images.ctfassets.net/23aumh6u8s0i/c04wENP3FnbevwdWzrePs/1e2739fa6d0aa5192cf89599e009da4e/nextjs",
      creatorSlug: "rohuldson", */
    });

    console.log(registroCriado);

    res.json({
      dados: "algum",
      registroCriado: registroCriado,
    });
    return
  }
  res.status(404).json({
      message: "Sem dados por aqui mermão!"
  })
}
