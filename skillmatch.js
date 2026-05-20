// ============================================================
// SkillMatch JS — Simulador de Compatibilidade com Vagas
// Módulo 01 - Semana 06 - Front-End React
// ============================================================

// ─────────────────────────────────────────────────────────────
// RF01 – Perfil do candidato
// ─────────────────────────────────────────────────────────────
const candidato = {
  nome: "Cleviton",
  area: "Front-End",
  habilidades: ["JavaScript", "GitHub", "Lógica de Programação", "Kanban"],
  experienciaMeses: 3,
};

// ─────────────────────────────────────────────────────────────
// RF09 – Classe Vaga (com RF11: uso de this e RF10: herança)
// ─────────────────────────────────────────────────────────────
class Vaga {
  constructor(id, empresa, cargo, requisitos, salario, modalidade) {
    this.id = id;
    this.empresa = empresa;
    this.cargo = cargo;
    this.requisitos = requisitos;
    this.salario = salario;
    this.modalidade = modalidade;
  }

  // RF11 – uso de this
  exibirResumo() {
    return `[${this.id}] ${this.cargo} · ${this.empresa} · R$ ${this.salario} · ${this.modalidade}`;
  }
}

// RF10 – Herança
class VagaFrontEnd extends Vaga {
  constructor(id, empresa, cargo, requisitos, salario, modalidade, nivel) {
    super(id, empresa, cargo, requisitos, salario, modalidade);
    this.nivel = nivel;
  }

  // RF11 – uso de this
  exibirNivel() {
    return `Nível da vaga: ${this.nivel}`;
  }
}

// ─────────────────────────────────────────────────────────────
// RF02 – Lista de vagas (instâncias de VagaFrontEnd)
// ─────────────────────────────────────────────────────────────
const vagas = [
  new VagaFrontEnd(
    1,
    "TechStart",
    "Desenvolvedor Front-End Júnior",
    ["JavaScript", "GitHub", "Lógica de Programação"],
    2800,
    "Remoto",
    "Júnior",
  ),
  new VagaFrontEnd(
    2,
    "CodeLab",
    "Estágio Front-End",
    ["JavaScript", "Kanban", "GitHub"],
    1800,
    "Híbrido",
    "Estágio",
  ),
  new VagaFrontEnd(
    3,
    "WebSolutions",
    "Programador JavaScript Júnior",
    ["JavaScript", "Arrays", "Objetos", "Funções"],
    3000,
    "Presencial",
    "Júnior",
  ),
];

// ─────────────────────────────────────────────────────────────
// RF13 – Closure: contador de análises realizadas
// ─────────────────────────────────────────────────────────────
function criarContadorDeAnalises() {
  let total = 0;
  return function () {
    total++;
    return total;
  };
}
const contarAnalise = criarContadorDeAnalises();

// ─────────────────────────────────────────────────────────────
// RF04 – Classificar compatibilidade (if-else)
// ─────────────────────────────────────────────────────────────
const classificarCompatibilidade = (percentual) => {
  if (percentual >= 80) {
    return "Alta compatibilidade";
  } else if (percentual >= 50) {
    return "Média compatibilidade";
  } else {
    return "Baixa compatibilidade";
  }
};

// ─────────────────────────────────────────────────────────────
// RF03 + RF05 – Analisar uma vaga (calcula %, faltantes)
// ─────────────────────────────────────────────────────────────
const analisarVaga = (vaga, habilidadesDoCandidato) => {
  // RF08 – filter: habilidades que o candidato tem e a vaga pede
  const habilidadesEncontradas = vaga.requisitos.filter((req) =>
    habilidadesDoCandidato.includes(req),
  );

  // RF08 – filter: habilidades que faltam
  const habilidadesFaltantes = vaga.requisitos.filter(
    (req) => !habilidadesDoCandidato.includes(req),
  );

  // RF03 – cálculo do percentual
  const percentual = Math.round(
    (habilidadesEncontradas.length / vaga.requisitos.length) * 100,
  );

  const classificacao = classificarCompatibilidade(percentual);

  return {
    vaga,
    percentual,
    classificacao,
    habilidadesEncontradas,
    habilidadesFaltantes,
  };
};

// ─────────────────────────────────────────────────────────────
// RF08 – map: gerar resultados de todas as vagas
// ─────────────────────────────────────────────────────────────
const gerarResultados = (vagas, candidato) =>
  vagas.map((v) => analisarVaga(v, candidato.habilidades));

// ─────────────────────────────────────────────────────────────
// RF06 – Encontrar a vaga com maior compatibilidade (reduce)
// RF08 – reduce
// ─────────────────────────────────────────────────────────────
const encontrarMelhorVaga = (resultados) =>
  resultados.reduce((melhor, atual) =>
    atual.percentual > melhor.percentual ? atual : melhor,
  );

// ─────────────────────────────────────────────────────────────
// RF07 – Gerar recomendação de estudo
// RF08 – find (exemplo: buscar vaga por id), every
// ─────────────────────────────────────────────────────────────
const gerarRecomendacao = (resultados) => {
  // RF08 – every: verificar se candidato atende TODOS os requisitos de ALGUMA vaga
  const vagaCompleta = resultados.find((r) =>
    r.vaga.requisitos.every((req) => candidato.habilidades.includes(req)),
  );

  // coleta todas as habilidades faltantes sem repetição
  const todasFaltantes = [
    ...new Set(resultados.flatMap((r) => r.habilidadesFaltantes)),
  ];

  if (todasFaltantes.length === 0) {
    return "Parabéns! Você atende todos os requisitos das vagas analisadas.";
  }

  return `Priorize estudar ${todasFaltantes.join(
    ", ",
  )}, pois esses conteúdos aparecem nas vagas analisadas.${
    vagaCompleta
      ? `\nVocê já atende 100% dos requisitos da vaga "${vagaCompleta.vaga.cargo}" na ${vagaCompleta.vaga.empresa}!`
      : ""
  }`;
};

// ─────────────────────────────────────────────────────────────
// RF12 – Callback: finalizar análise
// ─────────────────────────────────────────────────────────────
function finalizarAnalise(nomeCandidato, callback) {
  console.log("═".repeat(55));
  console.log(" Análise finalizada.");
  callback(nomeCandidato);
}

function exibirMensagemFinal(nome) {
  console.log(
    ` ${nome}, revise suas habilidades faltantes e atualize seu plano de estudos.`,
  );
}

// ─────────────────────────────────────────────────────────────
// RF14 – Promise + async/await: simular busca de vagas
// ─────────────────────────────────────────────────────────────
function buscarVagasSimuladas() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(vagas);
    }, 1000);
  });
}

async function iniciarSistema() {
  console.log("  Buscando vagas disponíveis...");
  const vagasCarregadas = await buscarVagasSimuladas();
  console.log(`  ${vagasCarregadas.length} vagas carregadas com sucesso!\n`);

  // ── Cabeçalho ──────────────────────────────────────────────
  console.log("═".repeat(55));
  console.log("        SkillMatch JS — Análise de Vagas");
  console.log("═".repeat(55));
  console.log(` Candidato : ${candidato.nome}`);
  console.log(` Área      : ${candidato.area}`);
  console.log(`  Habilidades: ${candidato.habilidades.join(", ")}`);
  console.log(` Experiência: ${candidato.experienciaMeses} meses\n`);

  // ── Resultados por vaga ─────────────────────────────────────
  const resultados = gerarResultados(vagasCarregadas, candidato);

  resultados.forEach((resultado) => {
    const n = contarAnalise(); // RF13 – closure em uso
    const {
      vaga,
      percentual,
      classificacao,
      habilidadesEncontradas,
      habilidadesFaltantes,
    } = resultado;

    console.log("─".repeat(55));
    console.log(` Análise nº ${n} — ${vaga.exibirResumo()}`);
    console.log(`   ${vaga.exibirNivel()}`);
    console.log(`   Compatibilidade : ${percentual}%`);
    console.log(`   Classificação   : ${classificacao}`);
    console.log(
      `   ✔ Encontradas  : ${
        habilidadesEncontradas.length > 0
          ? habilidadesEncontradas.join(", ")
          : "nenhuma"
      }`,
    );
    console.log(
      `   ✘ Faltantes    : ${
        habilidadesFaltantes.length > 0
          ? habilidadesFaltantes.join(", ")
          : "nenhuma"
      }`,
    );
  });

  // ── Melhor vaga ─────────────────────────────────────────────
  const melhorVaga = encontrarMelhorVaga(resultados);
  console.log("\n" + "═".repeat(55));
  console.log("  Vaga mais compatível:");
  console.log(`   ${melhorVaga.vaga.empresa} — ${melhorVaga.vaga.cargo}`);
  console.log(`   Compatibilidade: ${melhorVaga.percentual}%`);

  // ── Recomendação ─────────────────────────────────────────────
  console.log("\n  Recomendação de estudo:");
  console.log(`   ${gerarRecomendacao(resultados)}`);

  // ── Finalizar com callback ───────────────────────────────────
  finalizarAnalise(candidato.nome, exibirMensagemFinal);
}

// ── Ponto de entrada ──────────────────────────────────────────
iniciarSistema();
