#  Projeto Final - Gestão de Processos Jurídicos

**Aluno:** Jessica Baptistello
**UFCD:** Programação JavaScript
**Framework:** Angular
**Linguagem:** TypeScript

---

##  Descrição

Este projeto consiste numa **Single Page Application (SPA)** desenvolvida em Angular, que simula um sistema pessoal de **Gestão de Processos Jurídicos e Administrativos**.

A aplicação permite registar, visualizar, editar e remover processos jurídicos e administrativos, facilitando a organização e acompanhamento de da situação dos clientes.

O sistema foi desenvolvido seguindo boas práticas de arquitetura, componentização e separação de responsabilidades, com tipagem em TypeScript e utilização de Services para gestão de estado e persistência de dados.

---

##  Funcionalidades

###  Dashboard

* Total de processos registados
* Total de processos ativos
* Total de processos concluídos
* Processo mais recente adicionado

---

###  Listagem de Processos

* Lista dinâmica com `*ngFor`
* Filtro por estado (Novos / Ativos / Concluídos )
* Pesquisa por nome do cliente ou nº do processo
* Ordenação por data ou prioridade
* Indicadores visuais com `ngClass`

---

###  Detalhe do Processo

* Rota dinâmica 
* Informação completa do processo:

  * Número do processo
  * Nome do cliente
  * Tipo de processo
  * Estado
  * Descrição

---

###  Criação e Edição

* Uso de **Reactive Forms**
* Campos obrigatórios:

  * Nº do processo
  * Nome do cliente
  * Tipo de processo
  * Descrição
    
* Validação adicional:

  * Email válido ou formato do processo
* Feedback visual de erro nos inputs
* Descrição com pelo menos 10 caracteres

---

###  Persistência de Dados

* Armazenamento em **LocalStorage**
* CRUD completo:

  * Criar
  * Ler
  * Atualizar
  * Eliminar
* Lógica isolada em Service

---

##  Tecnologias Utilizadas

* Angular (v20+)
* TypeScript (Strict Mode)
* HTML5
* CSS3
* LocalStorage API
* Angular Router
* Reactive Forms

---
Link para o GitHub Pages: 
https://jessicabaptistello.github.io/ProjetoFinal/

---

##  Instalação e Execução

### 1️⃣ Clonar repositório

```bash
git clone https://github.com/jessicabaptistello/projetoFinal.git
```

### 2️⃣ Entrar na pasta

```bash
cd projeto-final
```

### 3️⃣ Instalar dependências

```bash
npm install
```

### 4️⃣ Executar aplicação

```bash
ng serve
```

### 5️⃣ Abrir no navegador

http://localhost:4200/

---

##  Estrutura do Projeto

src/
├── app/
│   ├── components/
│   ├── services/
│   ├── models/
│   ├── pages/
│   └── app-routing.module.ts
├── assets/
└── index.html

---

##  Requisitos Técnicos Implementados

✔️ Interfaces tipadas 
✔️ Services com Injeção de Dependência
✔️ RouterModule para navegação
✔️ Componentes reutilizáveis
✔️ Pipe de formatação
✔️ Reactive Forms com validação
✔️ Persistência em LocalStorage

---

## 📌 Estado do Projeto

Em desenvolvimento / Concluído

---

##  Licença

Projeto académico desenvolvido no âmbito da UFCD Programação JavaScript.



