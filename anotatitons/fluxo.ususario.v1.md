## **Fluxo de Uso do Cliente (MVP)**

### **1️⃣ Acesso Inicial (Visitante)**

- O usuário acessa o site sem estar logado.
- Ele pode:
  - Navegar pelo **feed público** (`/feed`).
  - Visualizar **páginas de projetos** (`/projeto/:id`).
  - Visitar **perfis de usuários** (`/perfil/:username`).
  - Ir até a página de **Ajuda** (`/help`).
  - Criar uma conta via botão **"Entrar"** no menu.

---

### **2️⃣ Cadastro/Login**

- Ao clicar em **"Entrar"**, ele é redirecionado para:
  - **Login** (`/login`) → Se já tem conta.
  - **Cadastro** (`/cadastro`) → Se for novo usuário.
- Após o login bem-sucedido, ele é levado para o **Onboarding**.

---

### **3️⃣ Onboarding (Configuração Inicial)**

- O usuário escolhe:
  - **Nome e foto de perfil**.
  - **Áreas de interesse** (usadas no feed personalizado).
- Depois, ele é direcionado para o **Dashboard** (`/app`).

---

### **4️⃣ Dashboard (Área Privada)**

- Aqui, ele pode:
  - Criar um novo projeto (`/projeto/novo`).
  - Ver e editar seus projetos existentes.
  - Acessar configurações da conta (`/configuracoes`).
  - Voltar ao **feed** para explorar outros projetos (`/feed`).

---

### **5️⃣ Criando um Projeto**

- No dashboard, o usuário clica em **"Criar Projeto"**.
- Ele preenche:
  - **Título** e **descrição**.
  - **Imagens/Vídeos do projeto**.
  - **Tags (categorias pré-definidas)**.
- Publica o projeto, e ele se torna visível no **feed**.

---

### **6️⃣ Interação no Feed**

- No feed (`/feed`), o usuário pode:
  - Curtir projetos.
  - Comentar nos projetos.
  - Clicar para ver detalhes (`/projeto/:id`).
  - Seguir outros desenvolvedores (futuro recurso).

---

### **7️⃣ Gerenciamento e Configurações**

- O usuário pode acessar `/configuracoes` para:
  - Alterar foto, nome, bio.
  - Gerenciar notificações (futuro recurso).
  - Excluir conta (futuro recurso).

---

Esse fluxo cobre o básico do MVP. Quer adicionar algum outro ponto ou alguma tela extra? 🚀
