import './paginacao.css'

function Paginacao({ paginaAtual, qtdPaginas, setPagina }) {

  const botoes = [];

  const maxPaginas = 5

  let paginaInicial
  let paginaFinal

  if (qtdPaginas <= maxPaginas) {
    paginaInicial = 1
    paginaFinal = qtdPaginas
  } else if (paginaAtual <= 3) {
    paginaInicial = 1
    paginaFinal = maxPaginas
  } else if (paginaAtual >= qtdPaginas - 2) {
    paginaFinal = qtdPaginas
    paginaInicial = qtdPaginas - maxPaginas + 1
  } else {
    paginaInicial = paginaAtual - 2
    paginaFinal = paginaAtual + 2
  }

  for (let p = paginaInicial; p <= paginaFinal; p++) {
    botoes.push(
      <button
        key={p}
        onClick={() => setPagina(p)}
        disabled={paginaAtual === p}
      >
        {p}
      </button>
    );
  }

  return (
    <div className="paginacao">
      <button onClick={() => setPagina(1)} disabled={paginaAtual  === 1}> Início </button>
      <button onClick={() => setPagina(paginaAtual - 1)} disabled={paginaAtual === 1}> {'<<'} </button>
      {botoes}
      <button onClick={() => setPagina(paginaAtual + 1)} disabled={paginaAtual === qtdPaginas}>{'>>'}</button>
      <button onClick={() => setPagina(qtdPaginas)} disabled={paginaAtual === qtdPaginas}>Última</button>
    </div>
  );
}

export default Paginacao;