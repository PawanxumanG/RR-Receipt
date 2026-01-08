const { jsPDF } = window.jspdf;

function generatePDF() {
  const doc = new jsPDF();

  let receiptNo = localStorage.getItem("rr_receipt_no");
  receiptNo = receiptNo ? parseInt(receiptNo) + 1 : 1;
  localStorage.setItem("rr_receipt_no", receiptNo);

  const year = new Date().getFullYear();
  const receiptId = `RR/${year}/${String(receiptNo).padStart(6, "0")}`;

  const student = document.getElementById("studentName").value;
  const course = document.getElementById("course").value;
  const fee = document.getElementById("feeDesc").value;
  const paid = document.getElementById("amountPaid").value;
  const pending = document.getElementById("pendingAmount").value;
  const nextDate = document.getElementById("nextDate").value;
  const mode = document.getElementById("paymentMode").value;
  const note = document.getElementById("note").value;

  doc.setFontSize(14);
  doc.text("R.R. International College", 105, 20, { align: "center" });

  doc.setFontSize(10);
  doc.text(`Receipt No: ${receiptId}`, 14, 35);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 35);

  let y = 50;
  doc.text(`Student Name: ${student}`, 14, y);
  y += 8;
  doc.text(`Course: ${course}`, 14, y);
  y += 8;
  doc.text(`Fee Description: ${fee}`, 14, y);
  y += 12;

  doc.text(`Amount Paid: ₹${paid}`, 14, y);
  y += 8;
  doc.text(`Pending Amount: ₹${pending}`, 14, y);
  y += 8;
  doc.text(`Next Installment Date: ${nextDate}`, 14, y);
  y += 8;
  doc.text(`Payment Mode: ${mode}`, 14, y);

  // PAID STAMP
  doc.setTextColor(46, 125, 50);
  doc.setFontSize(40);
  doc.text("PAID", 105, 120, { align: "center", angle: 25 });
  doc.setTextColor(0, 0, 0);

  // Note box
  y = 140;
  doc.setFontSize(11);
  doc.text("Note:", 14, y);
  doc.rect(14, y + 4, 180, 30);
  doc.setFontSize(10);
  doc.text(note || "-", 16, y + 12);

  doc.text("Authorized Signature", 140, 190);
  doc.text("R.R. International College", 14, 190);

  doc.save(`${receiptId}.pdf`);
}