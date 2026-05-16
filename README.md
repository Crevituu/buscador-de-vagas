# SkillMatch JS

> Simulador de compatibilidade entre candidato e vagas de Front-End Júnior.

---

## Sobre o projeto

O **SkillMatch JS** compara as habilidades de uma pessoa candidata com os requisitos de vagas fictícias de front-end júnior e exibe no console:

- percentual de compatibilidade com cada vaga;
- habilidades encontradas e faltantes por vaga;
- classificação da compatibilidade (Alta / Média / Baixa);
- vaga com maior aderência ao perfil;
- recomendação de estudo personalizada.

---

## Como executar

Este projeto **não precisa de Node.js ou instalação**.

### Opção 1 - VS Code com extensão

1. Instale a extensão **Code Runner** (`formulahendry.code-runner`).
2. Abra o arquivo `skillmatch.js`.
3. Pressione `Ctrl + Alt + N` para executar.

### Opção 2 - Ambiente online

Acesse [jsfiddle.net](https://jsfiddle.net) ou [playcode.io](https://playcode.io), cole o código e execute.

---

## Estrutura do projeto

```
skillmatch-js/
│
├── skillmatch.js   ← código principal
└── README.md       ← este arquivo
```

---

## Conceitos aplicados

| Conceito                         | Onde aparece                                                    |
| -------------------------------- | --------------------------------------------------------------- |
| Objeto literal                   | `candidato`                                                     |
| Array de objetos                 | `vagas`                                                         |
| Tipos de dados                   | strings, numbers, booleans, arrays                              |
| `const` e `let`                  | em todo o código (`var` não é usado — ver nota abaixo)          |
| `if-else`                        | `classificarCompatibilidade`                                    |
| Operadores lógicos e matemáticos | cálculo de percentual                                           |
| `for` implícito via métodos      | `map`, `filter`, `reduce`, `find`, `every`, `forEach`           |
| Funções e arrow functions        | `analisarVaga`, `gerarResultados`, `classificarCompatibilidade` |
| `map`                            | gerar array de resultados das vagas                             |
| `filter`                         | habilidades encontradas e faltantes                             |
| `find`                           | localizar vaga que o candidato atende 100%                      |
| `every`                          | verificar se todos os requisitos são cobertos                   |
| `reduce`                         | encontrar vaga com maior compatibilidade                        |
| Classes                          | `Vaga`                                                          |
| Herança (`extends`)              | `VagaFrontEnd extends Vaga`                                     |
| `this`                           | métodos `exibirResumo()` e `exibirNivel()`                      |
| Callback                         | `finalizarAnalise(nome, callback)`                              |
| Closure                          | `criarContadorDeAnalises()`                                     |
| Promise                          | `buscarVagasSimuladas()`                                        |
| `async/await`                    | `iniciarSistema()`                                              |

---

## Nota sobre `var`, `let` e `const`

- **`const`** é usado para valores que não mudam (objetos, funções, arrays declarados).
- **`let`** é usado quando o valor pode ser reatribuído (ex.: `total` dentro do closure).
- **`var`** **não é utilizado** neste projeto. Embora ainda funcione em JavaScript, `var` tem escopo de função e é içada (_hoisted_) ao topo do escopo, o que pode causar bugs difíceis de rastrear. Por isso, `const` e `let` são preferidos desde o ES6.

---

## Como a internet funciona (resumo)

Quando você acessa um site, seu navegador (cliente) envia uma **requisição HTTP** para um servidor remoto. O servidor processa e devolve uma **resposta** — geralmente HTML, CSS e JavaScript. Essa troca segue o modelo **cliente-servidor**: o cliente solicita, o servidor responde.

No SkillMatch JS, a função `buscarVagasSimuladas()` imita essa espera com `setTimeout` e uma `Promise`, simulando o tempo que um servidor levaria para responder com a lista de vagas.

---

## Arquitetura cliente-servidor

```
[ Navegador / Console ]           [ Servidor (simulado) ]
        │                                   │
        │── fetch / requisição HTTP ────────▶│
        │                                   │
        │◀─ resposta com dados (vagas) ─────│
        │                                   │
  exibe resultados
```

No projeto, `buscarVagasSimuladas()` retorna uma `Promise` que resolve após 1 segundo, simulando a latência de rede.

---

## Extensões recomendadas (VS Code)

| Extensão                    | Finalidade                        |
| --------------------------- | --------------------------------- |
| `formulahendry.code-runner` | Executa JS diretamente no VS Code |
| `esbenp.prettier-vscode`    | Formata o código automaticamente  |
| `dbaeumer.vscode-eslint`    | Aponta erros e boas práticas      |

---

## Versionamento - Branches utilizadas

| Branch               | Objetivo                    |
| -------------------- | --------------------------- |
| `main`               | código estável e entregável |
| `develop`            | integração das features     |
| `feat/analise-vagas` | lógica de compatibilidade   |
| `feat/classes-poo`   | classes, herança e this     |
| `docs/readme`        | documentação                |

---

## Exemplo de saída no console

```
  Buscando vagas disponíveis...
  3 vagas carregadas com sucesso!

═══════════════════════════════════════════════════════
        SkillMatch JS - Análise de Vagas
═══════════════════════════════════════════════════════
 Candidato : Cleviton
 Área      : Front-End
  Habilidades: JavaScript, GitHub, Lógica de Programação, Kanban
 Experiência: 3 meses

───────────────────────────────────────────────────────
 Análise nº 1 - [1] Desenvolvedor Front-End Júnior - TechStart
   Nível da vaga: Júnior
   Compatibilidade : 100%
   Classificação   : Alta compatibilidade
   ✔ Encontradas  : JavaScript, GitHub, Lógica de Programação
   ✘ Faltantes    : nenhuma
...
  Vaga mais compatível:
   TechStart - Desenvolvedor Front-End Júnior
   Compatibilidade: 100%

  Recomendação de estudo:
   Priorize estudar Arrays, Objetos e Funções...
```

---

## Autoria

Projeto desenvolvido como **Mini-Projeto Avaliativo (Semana 06)**  
Curso: Carreira Tech - Trilha Desenvolvimento de Software
