## 📋 Sobre o Projeto

O **Habit Tracker** é uma ferramenta desenvolvida para auxiliar na organização pessoal e na manutenção de rotinas. O foco da aplicação é oferecer uma experiência visual clara sobre o desempenho do usuário, permitindo o acompanhamento de hábitos de forma intuitiva.

#### 🚀 Funcionalidades Principais

* **Gestão de Hábitos:** Criação e monitoramento de tarefas diárias.
* **Sistema de Streaks:** Lógica para calcular e exibir sequências de dias consecutivos (fogo/meta atingida).
* **Dashboard Visual:** Interface com cards coloridos e barras de progresso que facilitam a leitura do desempenho semanal.
* **Persistência Híbrida:** Uso de **Local Storage** para garantir uma interface rápida (*optimistic UI*) antes da sincronização via Fetch API com o banco de dados.

#### 🛠️ Tecnologias

* **(Joel) Design:** Figma.
* **(Lucas) Front-end:** React, TypeScript, Tailwind CSS, Local Storage.

---

## ⚙️ Como Executar o Projeto

Para rodar este projeto localmente, você precisará ter instalado em sua máquina o **Node.js**.

### 1. Clonar o Repositório
```bash
git clone https://github.com/bytessou/habit-tracker.git
cd habit-tracker
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
* **Persistência:** No primeiro acesso, o app utilizará o **Local Storage** do seu navegador.
