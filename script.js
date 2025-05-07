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