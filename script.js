// Ao marcar checkbox, abre modal de confirmação
document.getElementById('aceite').addEventListener('change', function() {
  if (this.checked) {
    document.getElementById('modalConfirmacao').style.display = 'block';
  }
});

// Cancelar confirmação
document.getElementById('cancelarBtn').addEventListener('click', function() {
  document.getElementById('modalConfirmacao').style.display = 'none';
  document.getElementById('aceite').checked = false;
});

// Confirmar → fecha primeiro modal e abre o da câmera
document.getElementById('confirmarBtn').addEventListener('click', function() {
  document.getElementById('modalConfirmacao').style.display = 'none';
  document.getElementById('modalCamera').style.display = 'block';
  iniciarCamera();
});

// Iniciar câmera
function iniciarCamera() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      const video = document.getElementById('video');
      video.srcObject = stream;
    })
    .catch(err => {
      alert("Erro ao acessar câmera: " + err);
    });
}
const ctx = canvas.getContext('2d');
// espelha de volta ao desenhar
ctx.translate(canvas.width, 0);
ctx.scale(-1, 1);
ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
// Tirar foto
document.getElementById('fotoBtn').addEventListener('click', function() {
  const canvas = document.getElementById('canvas');
  const video = document.getElementById('video');
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

  // Fecha modal da câmera
  document.getElementById('modalCamera').style.display = 'none';

  // Mostra resultado no contrato
  const resultado = document.getElementById('resultado');
  resultado.innerHTML = `
    <p>Assinado para todo sempre:</p>
    <p><strong>Flávio Henrique Camilo Silva</strong> e <strong>Joyce de Paula Macedo</strong></p>
    <div class="result-photo">
      <p>Foto anexada abaixo:</p>
    </div>
    <br>
    <button id="finalizarBtn">Finalizar</button>
  `;

  const img = new Image();
  img.src = canvas.toDataURL("image/png");
  document.querySelector('.result-photo').appendChild(img);

document.getElementById('finalizarBtn').addEventListener('click', function() {
  const { jsPDF } = window.jspdf;

  html2canvas(document.querySelector('.container')).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    // Dimensões da página A4
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Ajusta a imagem para caber na página inteira
    pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);

    pdf.save("Contrato_de_Noivado.pdf");
  });
});
});
