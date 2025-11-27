// app.js - simple invoice generator
(function(){
  const { jsPDF } = window.jspdf;

  // DOM refs
  const itemsBody = document.getElementById('itemsBody');
  const addItemBtn = document.getElementById('addItem');
  const subtotalEl = document.getElementById('subtotal');
  const taxRateInput = document.getElementById('taxRate');
  const grandTotalEl = document.getElementById('grandTotal');
  const previewPdfBtn = document.getElementById('previewPdf');
  const resetBtn = document.getElementById('reset');

  // Helpers
  function format(n){ return Number(n||0).toFixed(2); }

  function addItemRow(description='', qty=1, rate=0){
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input class="desc" value="${description}" placeholder="Description"></td>
      <td><input class="qty" type="number" min="0" value="${qty}"></td>
      <td><input class="rate" type="number" min="0" value="${rate}"></td>
      <td class="lineTotal">${format(qty*rate)}</td>
      <td><button class="remove">x</button></td>
    `;
    itemsBody.appendChild(tr);

    // events
    tr.querySelectorAll('.qty,.rate').forEach(inp=>{
      inp.addEventListener('input', updateTotals);
    });
    tr.querySelector('.remove').addEventListener('click', ()=>{
      tr.remove();
      updateTotals();
    });
    updateTotals();
  }

  function getItems(){
    return Array.from(itemsBody.querySelectorAll('tr')).map(tr=>{
      const desc = tr.querySelector('.desc').value;
      const qty = Number(tr.querySelector('.qty').value||0);
      const rate = Number(tr.querySelector('.rate').value||0);
      return {desc, qty, rate, total: qty*rate};
    });
  }

  function updateTotals(){
    const items = getItems();
    const subtotal = items.reduce((s,i)=>s + i.total, 0);
    const taxRate = Number(taxRateInput.value||0);
    const tax = subtotal * (taxRate/100);
    const total = subtotal + tax;
    subtotalEl.textContent = format(subtotal);
    grandTotalEl.textContent = format(total);
    // update line totals in UI
    itemsBody.querySelectorAll('tr').forEach((tr,i)=>{
      const t = items[i].total;
      tr.querySelector('.lineTotal').textContent = format(t);
    });
  }

  addItemBtn.addEventListener('click', ()=> addItemRow());

  taxRateInput.addEventListener('input', updateTotals);

  // Populate with one row
  addItemRow('Initial consulting', 2, 50);

  // PDF generation
  previewPdfBtn.addEventListener('click', ()=>{
    const doc = new jsPDF({unit:'pt', format:'a4'});
    const margin = 40;
    let y = 40;

    const fromName = document.getElementById('fromName').value || 'Your Name';
    const fromAddress = document.getElementById('fromAddress').value || '';
    const toName = document.getElementById('toName').value || 'Client';
    const toAddress = document.getElementById('toAddress').value || '';
    const invoiceNo = document.getElementById('invoiceNo').value || 'INV-001';
    const invoiceDate = document.getElementById('invoiceDate').value || new Date().toISOString().slice(0,10);
    const notes = document.getElementById('notes').value || '';

    doc.setFontSize(18);
    doc.text('Invoice', margin, y);
    y += 24;

    doc.setFontSize(10);
    doc.text(`Invoice #: ${invoiceNo}`, margin, y);
    doc.text(`Date: ${invoiceDate}`, margin + 250, y);
    y += 18;

    doc.setFontSize(12);
    doc.text('From:', margin, y);
    doc.setFontSize(10);
    doc.text(fromName, margin, y+14);
    doc.text(fromAddress, margin, y+28);

    doc.setFontSize(12);
    doc.text('To:', margin + 300, y);
    doc.setFontSize(10);
    doc.text(toName, margin + 300, y+14);
    doc.text(toAddress, margin + 300, y+28);
    y += 60;

    // Table header
    doc.setFontSize(11);
    doc.text('Description', margin, y);
    doc.text('Qty', margin + 300, y);
    doc.text('Rate', margin + 360, y);
    doc.text('Total', margin + 440, y);
    y += 12;

    // Draw lines
    const items = getItems();
    items.forEach(it=>{
      if(y > 750){ doc.addPage(); y = 40; }
      y += 18;
      doc.text(it.desc || '-', margin, y);
      doc.text(String(it.qty), margin + 300, y);
      doc.text(format(it.rate), margin + 360, y);
      doc.text(format(it.total), margin + 440, y);
    });

    y += 30;
    doc.text(`Subtotal: ${subtotalEl.textContent}`, margin + 360, y);
    y += 14;
    doc.text(`Tax (${taxRateInput.value || 0}%):`, margin + 360, y);
    y += 14;
    doc.setFontSize(13);
    doc.text(`Total: ${grandTotalEl.textContent}`, margin + 360, y);

    y += 30;
    doc.setFontSize(10);
    doc.text('Notes:', margin, y);
    doc.text(notes, margin, y+14);

    doc.save(`${invoiceNo}.pdf`);
  });

  resetBtn.addEventListener('click', ()=>{
    if(confirm('Reset form?')) location.reload();
  });

})();
