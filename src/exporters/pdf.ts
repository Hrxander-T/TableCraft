import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export async function exportPDF(elementId: string, filename = 'table') {
    const el = document.getElementById(elementId)
    if (!el) return
    const canvas = await html2canvas(el, { scale: 2, useCORS: true })
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [canvas.width, canvas.height] })
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
    pdf.save(`${filename}.pdf`)
}