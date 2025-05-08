document.querySelectorAll('[data-page]').forEach(button => {
    button.addEventListener('click', () => {
      const pageId = button.getAttribute('data-page');
  
      // Alterna visibilidade de páginas
      document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
      document.getElementById(pageId).classList.add('active');
      // Atualiza o estado do menu inferior
document.querySelectorAll('.bottom-nav i').forEach(icon => icon.classList.remove('ativo'));
const currentIcon = document.querySelector(`.bottom-nav i[data-page="${pageId}"]`);
if (currentIcon) currentIcon.classList.add('ativo');

  
      // Troca a classe no <body> para controlar exibição de seções
      document.body.classList.toggle('perfil-ativo', pageId === 'perfil');
    });
  });
  
  document.querySelector(".bottom-nav .perfil-icone").addEventListener("click", function() {
    document.querySelector(".perfil").style.display = "block";
    document.body.classList.add("perfil-ativo"); // Oculta os botões principais quando o perfil é aberto
});

document.addEventListener("DOMContentLoaded", () => {
  // Recupera o nome e foto do usuário no localStorage ao carregar a página
  const nomeUsuario = localStorage.getItem("nomeUsuario") || "Camila Queiroz";
  document.querySelector(".perfil-nome").innerText = nomeUsuario;

  const fotoPerfil = localStorage.getItem("fotoPerfil") || "https://via.placeholder.com/100";
  document.getElementById("fotoPerfil").src = fotoPerfil;
});

// Função para trocar a foto de perfil
document.getElementById("uploadFoto").addEventListener("change", function(event) {
    const fotoPerfil = document.getElementById("fotoPerfil");
    const arquivo = event.target.files[0];

    if (arquivo) {
        const leitor = new FileReader();
        leitor.onload = function(e) {
            fotoPerfil.src = e.target.result;
            localStorage.setItem("fotoPerfil", e.target.result); // Salva a nova foto
        };
        leitor.readAsDataURL(arquivo);
    }
});


// Função para salvar lembretes de consultas e medicações
function salvarLembrete(tipo, descricao, horario) {
  let lembretes = JSON.parse(localStorage.getItem("lembretes")) || [];
  lembretes.push({ tipo, descricao, horario });
  localStorage.setItem("lembretes", JSON.stringify(lembretes));
  atualizarLembretesNaTela();
}

// Função para mostrar lembretes add na tela
function atualizarLembretesNaTela() {
  const container = document.querySelector(".schedule");
  container.innerHTML = "";
  let lembretes = JSON.parse(localStorage.getItem("lembretes")) || [];

  lembretes.forEach((lembrete, index) => {
      const item = document.createElement("div");
      item.classList.add("day");
      item.innerHTML = `
          <div class="details">
              <p>${lembrete.tipo}: ${lembrete.descricao}</p>
              <span>${lembrete.horario}</span>
          </div>
          <button onclick="removerLembrete(${index})">❌</button>
      `;
      container.appendChild(item);
  });
}

// Função para remover um lembrete 
function removerLembrete(index) {
  let lembretes = JSON.parse(localStorage.getItem("lembretes")) || [];
  lembretes.splice(index, 1);
  localStorage.setItem("lembretes", JSON.stringify(lembretes));
  atualizarLembretesNaTela();
}

document.addEventListener("DOMContentLoaded", atualizarLembretesNaTela);

// Função de notificações de lembrete no horário certo
setInterval(() => {
  let agora = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  let lembretes = JSON.parse(localStorage.getItem("lembretes")) || [];

  lembretes.forEach(lembrete => {
      if (lembrete.horario === agora) {
          alert(`🔔 Lembrete: ${lembrete.tipo} - ${lembrete.descricao}`);
      }
  });
}, 60000);

// Função de logout p limpar dados e reiniciar sessão
document.querySelector(".logout").addEventListener("click", () => {
  localStorage.clear();
  alert("Sessão encerrada!");
  window.location.reload();
});
