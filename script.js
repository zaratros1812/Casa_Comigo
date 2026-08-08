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

// Tirar foto (com espelhamento e alta resolução)
document.getElementById('fotoBtn').addEventListener('click', function() {
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  // Ajusta o canvas para resolução real do vídeo
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // limpa o canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // aplica espelhamento horizontal
  ctx.save();
  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);

  // desenha o vídeo espelhado em alta resolução
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  ctx.restore();
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

  // cria imagem responsiva e nítida
  const img = new Image();
  img.src = canvas.toDataURL("image/png");
  img.style.maxWidth = "100%";
  img.style.height = "auto";
  img.style.borderRadius = "10px";
  document.querySelector('.result-photo').appendChild(img);

  // Botão finalizar → gera PDF com print da tela inteira
  document.getElementById('finalizarBtn').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;

    html2canvas(document.querySelector('.container')).then(canvasFull => {
      const imgData = canvasFull.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
      pdf.save("Contrato_de_Noivado.pdf");
    });
  });
});
