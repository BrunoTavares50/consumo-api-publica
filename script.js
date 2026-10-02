async function carregarPokemons()
{
    const mensagem = document.querySelector("#mensagem");

    mensagem.textContent = "Iniciando busca...";

    const resposta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");

    const pokemons = await resposta.json();
    console.log(pokemons)

    const lista = document.querySelector("#listaPokemons");
    lista.textContent = "";

    const styleImagem = document.createElement("style");
    styleImagem.textContent = `
        img {
            width: 100px;
            height: 100px;
        }
    `;
    document.head.appendChild(styleImagem);

    const styleNome = document.createElement("style");
    styleNome.textContent = `
        li {
            font-weight: bold;
            font-size: 20px;
            background-color: #f0f0f0;
            padding: 10px;
            margin: 5px 0;
        }
    `;
    document.head.appendChild(styleNome);

    const styleTipo = document.createElement("style");
    styleTipo.textContent = `
        p {
            font-style: italic;
            font-size: 16px;
            color: #000000;
            margin: 5px 0;
        }
    `;
    document.head.appendChild(styleTipo);

    for (let i = 0; i < 151; i++) {
        const item = document.createElement("li");
        const imagemUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`;
        const tipo = document.createElement("p");
        
        item.textContent = pokemons.results[i].name.toUpperCase();
        lista.appendChild(item);

        const tipoResposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`);
        const tipoData = await tipoResposta.json();
        const tipos = tipoData.types.map(typeInfo => typeInfo.type.name);
        tipo.textContent = `Tipo: ${tipos.join(", ")}`;
        lista.appendChild(tipo);


        const imagem = document.createElement("img");
        imagem.src = imagemUrl;
        lista.appendChild(imagem);
    }
    mensagem.textContent = "Pokemons Buscados!"

}