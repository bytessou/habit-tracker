## 📋 Sobre o Projeto

O **Habit Tracker** é uma ferramenta desenvolvida para auxiliar na organização pessoal e na manutenção de rotinas. O foco da aplicação é oferecer uma experiência visual clara sobre o desempenho do usuário, permitindo o acompanhamento de hábitos de forma intuitiva.

#### 🚀 Funcionalidades Principais

* **Gestão de Hábitos:** Criação e monitoramento de tarefas diárias.
* **Sistema de Streaks:** Lógica de back-end para calcular e exibir sequências de dias consecutivos (fogo/meta atingida).
* **Dashboard Visual:** Interface com cards coloridos e barras de progresso que facilitam a leitura do desempenho semanal.
* **Persistência Híbrida:** Uso de **Local Storage** para garantir uma interface rápida (*optimistic UI*) antes da sincronização via Fetch API com o banco de dados.

#### 🛠️ Tecnologias

* **(Joel) Front-end:** React, TypeScript, Tailwind CSS, Local Storage.
* **(Lucas) Back-end:** ASP.NET — Rotas RESTful para persistência e lógica de streaks.

---

## ⚙️ Como Executar o Projeto

Para rodar este projeto localmente, você precisará ter instalado em sua máquina o **Node.js** (para o Front-end) e o **.NET SDK** (para o Back-end).

### 1. Clonar o Repositório
```bash
git clone https://github.com/bytessou/habit-tracker.git
cd habit-tracker
```

### 2. Configurando o Back-end (ASP.NET)

**Entre na pasta do servidor:**
```bash
cd backend
```

**Restaure as dependências:**
```bash
dotnet restore
```

**Execute a aplicação:**
```bash
dotnet run
```
> O servidor estará disponível em `http://localhost:5000` (ou na porta configurada no seu `launchSettings.json`).

### 3. Configurando o Front-end (React + Vite/CRA)

**Entre na pasta do cliente:**
```bash
cd frontend
```

**Instale as dependências:**
```bash
npm install
```

**Inicie o projeto:**
```bash
npm run dev
```
> A interface abrirá no seu navegador, geralmente em `http://localhost:5173`.

---

### 📝 Observações Técnicas

* **TypeScript & Tailwind:** O projeto utiliza tipagem estática e estilização via classes utilitárias para garantir um código limpo e escalável.
* **Conexão com a API:** Certifique-se de que a URL base no Front-end esteja apontando para a porta correta onde o ASP.NET está rodando.
* **Persistência:** No primeiro acesso, o app utilizará o **Local Storage** do seu navegador. Após a configuração do banco de dados no Back-end, os dados serão sincronizados via Fetch.
