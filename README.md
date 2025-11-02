# Projeto Pokédex

Esta é uma aplicação web desenvolvida como um teste técnico para listar, buscar e ver detalhes de Pokémons consumindo a PokeAPI. O foco foi criar uma interface funcional, com bom gerenciamento de estado e um design responsivo e bonito.

---

## 📋 Funcionalidades Implementadas

O projeto atende a todos os requisitos funcionais solicitados:

* **Listagem de Pokémons:** Visualização paginada dos Pokémons.
* **Busca por Nome:** Campo de busca funcional que busca um Pokémon específico pelo nome.
* **Detalhes do Pokémon:** Um modal exibe informações detalhadas (imagem, tipos, habilidades, stats, peso, altura) ao clicar em um item.
* **Estados de UI:** A aplicação exibe mensagens claras para o estado de **Carregando**. Casos de **Erro** ou **Vazio** (como "Pokémon não encontrado") são tratados com a mensagem "Nenhum pokémon encontrado".
* **Sistema de Favoritos:** O usuário pode marcar/desmarcar Pokémons como favoritos (`☆`/`⭐`). A lista é salva no **LocalStorage** e pode ser visualizada em uma listagem separada clicando no botão mostrar favoritos.
* **Responsividade:** A aplicação se adapta a diferentes tamanhos de tela.

---

## 🛠️ Tecnologias e Decisões de Implementação

Aqui estão as principais decisões de estrutura e design tomadas durante o desenvolvimento.

### 1. API Utilizada
O projeto consome dados da API pública **PokeAPI (v2)**.
* **Endpoint de Listagem:** `.../api/v2/pokemon?limit=20&offset=0` 
* **Endpoint de Busca/Detalhes:** `.../api/v2/pokemon/{id|name}` 

### 2. Stack (React + Vite)
Escolhi o React.js com JavaScript puro por já possuir uma base de conhecimento do curso e estar focada em me aprimorar nesta tecnologia. O projeto foi uma excelente oportunidade para solidificar essa experiência prática. Para a ferramenta de build, utilizei o Vite, que é conhecido por ser mais rápido que o create-react-app.

### 3. Gerenciamento de Estado
Todo o gerenciamento de estado foi feito utilizando **Hooks nativos do React** (`useState` e `useEffect`), sem a necessidade de bibliotecas externas.
* `useState` foi usado para controlar a lista de Pokémons, a página atual, o estado de loading , a lista de favoritos, entre outros.
* `useEffect` foi usado para disparar a busca de dados quando a página ou o estado de "mostrar favoritos" mudam, e também para salvar a lista de favoritos no LocalStorage.

### 4. Design e Interface (UI)
O design da aplicação foi focado em ser limpo e de fácil utilização. Foi utilizada uma paleta de cores neutras com o vermelho como cor de destaque principal (no header e botões) para ter uma identidade visual similar a da pokedex.

* **Identificação Visual:** Os tipos de Pokémon (ex: Grass, Fire) são exibidos como etiquetas coloridas, facilitando a leitura rápida.
* **Imagem padrão:** Caso a imagem de um Pokémon não seja encontrada na API, uma silhueta é exibida no lugar, mantendo a consistência do layout.
* **Estrutura:** A estrutura da página garante que o rodapé (footer) permaneça fixo na parte inferior da tela, mesmo quando a lista de Pokémon está vazia.
* **Modal de Detalhes:** Ao clicar no botão "Mais detalhes", uma janela (modal) é aberta exibindo as informações completas do Pokémon (stats, habilidades, peso e altura). Para manter o foco, o restante da página é escurecido e o design do modal segue a mesma identidade visual do resto da aplicação.

### 5. Busca de Dados
O projeto utiliza funções nativas do JavaScript, como `async/await`, para buscar os dados da PokeAPI. Essa abordagem permite que a aplicação espere pela resposta da API sem bloquear a interface principal.

---

## 🚀 Como Executar o Projeto

Siga os passos abaixo para rodar o projeto localmente.

**Pré-requisitos:**
* Node.js (v18 ou superior)

**Passos:**

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/RenzisElen/pokedex.git
    cd pokedex
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento (Vite):**
    ```bash
    npm run dev
    ```

4.  **Acesse a aplicação:**
    Abra seu navegador e acesse `http://localhost:5173` (ou a porta indicada no seu terminal).