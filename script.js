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

// Confirmar → fecha modal e mostra contrato pronto
document.getElementById('confirmarBtn').addEventListener('click', function() {
  document.getElementById('modalConfirmacao').style.display = 'none';

  const resultado = document.getElementById('resultado');
  resultado.innerHTML = `
    <p>Assinado para todo sempre:</p>
    <p><strong>Flávio Henrique Camilo Silva</strong> e <strong>Joyce de Paula Macedo</strong></p>
    <br>
    <button id="finalizarBtn">Finalizar</button>
  `;

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
