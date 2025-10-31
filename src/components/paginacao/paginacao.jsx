function Paginacao({ paginaAtual, qtdPaginas, setPagina }) {

  const botoes = [];

  for (let i = 1; i <= qtdPaginas; i++) {
    botoes.push(
      <button
        key={i}
        onClick={() => setPagina(i)}
        disabled={paginaAtual === i}
      >
        {i}
      </button>
    );
  }

  return (
    <div>
      {botoes}
    </div>
  );
}

export default Paginacao;