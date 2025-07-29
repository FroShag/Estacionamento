class Parquimetro {
  constructor(valorInserido) {
    this.valorInserido = valorInserido;
    this.tabela = [
      { preco: 1.00, tempo: 30 },
      { preco: 1.75, tempo: 60 },
      { preco: 3.00, tempo: 120 }
    ];
  }

  calcular() {
    if (this.valorInserido < 1) {
      return { mensagem: "Valor insuficiente para estacionar." };
    }

    // Encontrar a maior tarifa que o valor cobre
    let tarifaEscolhida = this.tabela[0];
    for (let i = this.tabela.length - 1; i >= 0; i--) {
      if (this.valorInserido >= this.tabela[i].preco) {
        tarifaEscolhida = this.tabela[i];
        break;
      }
    }

    const troco = (this.valorInserido - tarifaEscolhida.preco).toFixed(2);
    return {
      tempo: tarifaEscolhida.tempo,
      troco: parseFloat(troco)
    };
  }
}

// Interação com a página
document.getElementById("calcular").addEventListener("click", () => {
  const valor = parseFloat(document.getElementById("valor").value);
  const resultadoDiv = document.getElementById("resultado");

  if (isNaN(valor)) {
    resultadoDiv.innerHTML = "<p>Por favor, insira um valor válido.</p>";
    return;
  }

  const parquimetro = new Parquimetro(valor);
  const resultado = parquimetro.calcular();

  if (resultado.mensagem) {
    resultadoDiv.innerHTML = `<p style="color:red">${resultado.mensagem}</p>`;
  } else {
    resultadoDiv.innerHTML = `
      <p>Tempo de permanência: <strong>${resultado.tempo} minutos</strong></p>
      <p>Troco: <strong>R$ ${resultado.troco.toFixed(2)}</strong></p>
    `;
  }
});
