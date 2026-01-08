const { jsPDF } = window.jspdf;

function toggleFullPaid() {
  const checked = document.getElementById("fullPaid").checked;
  const pending = document.getElementById("pendingAmount");
  const nextDate = document.getElementById("nextDate");

  if (checked) {
    pending.value = 0;
    pending.disabled = true;
    nextDate.value = "";
    nextDate.disabled = true;
  } else {
    pending.disabled = false;
    nextDate.disabled = false;
  }
}

function generatePDF() {
  const doc = new jsPDF();

  let receiptNo = localStorage.getItem("rr_receipt_no");
  receiptNo = receiptNo ? parseInt(receiptNo) + 1 : 1;
  localStorage.setItem("rr_receipt_no", receiptNo);

  const year = new Date().getFullYear();
  const receiptId = `RR/${year}/${String(receiptNo).padStart(6, "0")}`;

  const student = document.getElementById("studentName").value;
  const course = document.getElementById("course").value;
  const courseFee = document.getElementById("courseFee").value || 0;
  const fee = document.getElementById("feeDesc").value;
  const paid = document.getElementById("amountPaid").value || 0;
  const discount = document.getElementById("discount").value || 0;
  const pending = document.getElementById("pendingAmount").value || 0;
  const nextDate = document.getElementById("nextDate").value;
  const mode = document.getElementById("paymentMode").value;
  const note = document.getElementById("note").value;
  const fullPaid = document.getElementById("fullPaid").checked;

  // LOGO
  const logo = new Image();
  logo.src = "logo.png";
  doc.addImage(logo, "PNG", 85, 10, 40, 20);

  doc.setFontSize(14);
  doc.text("R.R. International College", 105, 40, { align: "center" });

  doc.setFontSize(10);
  doc.text(`Receipt No: ${receiptId}`, 14, 50);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 50);

  let y = 65;
  doc.text(`Student Name: ${student}`, 14, y);
  y += 8;
  doc.text(`Course: ${course}`, 14, y);
  y += 8;
  doc.text(`Course Fee: ₹${courseFee}`, 14, y);
  y += 8;
  doc.text(`Fee Description: ${fee}`, 14, y);
  y += 10;

  doc.text(`Amount Paid: ₹${paid}`, 14, y);
  y += 8;
  doc.text(`Discount: ₹${discount}`, 14, y);
  y += 8;
  doc.text(`Pending Amount: ₹${pending}`, 14, y);
  y += 8;

  if (!fullPaid && nextDate) {
    doc.text(`Next Installment Date: ${nextDate}`, 14, y);
    y += 8;
  }

  doc.text(`Payment Mode: ${mode}`, 14, y);

  // PAID STAMP
  doc.setTextColor(46, 125, 50);
  doc.setFontSize(38);
  doc.text("PAID", 105, 125, { align: "center", angle: 25 });
  doc.setTextColor(0, 0, 0);

  // NOTE BOX
  y = 145;
  doc.setFontSize(11);
  doc.text("Note:", 14, y);
  doc.rect(14, y + 4, 180, 30);
  doc.setFontSize(10);
  doc.text(note || "-", 16, y + 12);

  // SIGNATURE
  const sign = new Image();
  sign.src = "sign.png";
  doc.addImage(sign, "PNG", 140, 180, 40, 15);

  doc.text("R.R. International College", 14, 195);
  doc.text("Authorized Signature", 140, 195);

  doc.save(`${receiptId}.pdf`);
}