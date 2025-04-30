# Live Coding Front-End React

## Objetivo

Este projeto foi desenvolvido como parte de um desafio técnico para avaliar a capacidade de criar interfaces reutilizáveis, organizadas e alinhadas com boas práticas em React.js.

O cenário simula um sistema interno utilizado por uma equipe para analisar dados coletados em campo, permitindo a filtragem personalizada e o cadastro manual de informações. O sistema facilita a visualização estruturada dos dados, otimizando a operação diária da equipe.

## Funcionalidades

- **Tela de Listagem:**  
  - Filtros dinâmicos e combináveis
  - Paginação
  - Componentes reutilizáveis para filtros e tabela

- **(Extra) Tela de Cadastro:**  
  - Cadastro simples de registros

## Como rodar o projeto

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repo>
   cd desafio-geosapiens
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o projeto:**
   ```bash
   npm run dev
   ```
   O Vite irá iniciar o servidor localmente. Acesse pelo navegador:  
   [http://localhost:5173](http://localhost:5173)  
   (ou outra porta informada no terminal)

## Próximos Passos & Evoluções

### Para o done da parte de listagem: 

- **Tabela Inteligente:**  
  Evoluir o componente de tabela para suportar diferentes formatações de células (ex: valores monetários, datas, booleanos), tornando-o ainda mais reutilizável para múltiplas telas e contextos do sistema.

- **Tipagem:**  
  Implementar uma camada de tipagem mais robusta, eliminando o uso de `any` e garantindo maior segurança e previsibilidade no desenvolvimento.

- **Melhorar componente e SOLID:**  
  Refatorar e isolar ainda mais os componentes, facilitando a manutenção e a extensão do sistema para novos módulos. Ex: o componente filtro ficou muito poluído, poderiamos isolar algumas funções no utils por exemplo. 

- **Ver a possibilidade do uso de filtros da própria tabela do MUI**  
 Como os filtros são com operadores bem como no frontend, fazer o uso do DataGrid do MUI pode trazer mais facilidade e um código menos verboso.

- **Validação e Feedback:**  
  Adicionar validações visuais e feedbacks para o usuário durante o uso dos filtros e cadastro.

- **Testes unitários:**  
  Adicionar testes unitários.

- **Estilo:**  
  Melhorar parte de estilo, css no geral para melhorar experiência.

- **Definições de padrões:**  
  Nomes de váriaveis e funções, conventional commits, lint, prettier,  definição e documentação da stack já mencionando libs como axios, mui por exemplo para evitar libs que fazem a mesma coisa no projeto;
  
### Para próxima feature:

- **Garantir a próxima feature de cadastro:**  
  Quebrar as tasks, e desenvolver;

---
