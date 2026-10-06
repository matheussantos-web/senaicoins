# 🎮 SENAICOINS - Painel do Professor

Sistema simples e direto para gerenciamento e atribuição de moedas/pontos aos alunos do curso.

---

## 🚀 Funcionalidades

- **Sincronização com Supabase**: Carrega a lista de alunos automaticamente do banco de dados.
- **Armazenamento de Moedas**: Consulta e persiste o saldo de moedas de cada aluno via API *FreeOnlineStorage*.
- **Área Restrita do Professor**:
  - Operações práticas de **Adicionar (+)**, **Subtrair (-)** ou **Definir Saldo Exato**.
  - **Atalhos rápidos** de pontuação (`+5`, `+10`, `+20`, `+50`) para agilizar durante a aula.
  - **Histórico de movimentações** por aluno, com data, tipo, variação de pontos e descrição opcional.
  - **Filtro de busca**: Encontre qualquer aluno instantaneamente digitando o nome.
  - **Seleção com 1 clique**: Clique diretamente sobre o aluno na lista para selecioná-lo no painel.
  - **Lembrar senha**: Opção de salvar a senha de admin no navegador local (`localStorage`) para não precisar redigitar a cada aula.
  - **Proteção contra concorrência e duplo clique**: Desabilita botões durante o processamento e busca os dados mais recentes antes de gravar.
- **Segurança com Serverless Function**: A senha mestra de admin não fica exposta no código frontend; ela é validada no backend via Vercel Function (`/api/salvar`).

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3 moderno, [Vue.js 3](https://vuejs.org/) (via CDN)
- **Backend / Serverless**: Node.js na [Vercel Functions](https://vercel.com/docs/functions)
- **Banco de Dados**: [Supabase](https://supabase.com/) (leitura da lista de alunos)
- **Armazenamento em Nuvem**: API *FreeOnlineStorage* (Bucket: `senai`, Chaves: `coins` e `coin-history`)

---

## ⚙️ Configuração de Variáveis de Ambiente

Para proteger a rota de alteração de pontos (`/api/salvar.js`), configure a seguinte variável no painel da **Vercel**:

| Variável | Descrição |
|---|---|
| `ADMIN_AUTH` | Senha secreta que o professor digita no painel para autorizar o salvamento |

---

## 📁 Estrutura do Projeto

```text
senaicoins/
├── api/
│   └── salvar.js        # Serverless Function da Vercel (valida a senha e grava na API externa)
├── index.html           # Interface visual do painel (Vue.js 3)
└── README.md            # Documentação do projeto
```
# senaicoins