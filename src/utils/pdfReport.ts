import jsPDF from 'jspdf'
import type { Platform, ScoreResult } from '../data/assessment'
export function generateReport(platform: Platform, result: ScoreResult, date: string) {
  const pdf = new jsPDF(); let y = 22
  pdf.setTextColor(38, 35, 78); pdf.setFontSize(22); pdf.text('privacy.check', 20, y); y += 14
  pdf.setFontSize(11); pdf.setTextColor(95, 91, 112); pdf.text('Social Media Privacy Analyzer · Educational report', 20, y); y += 14
  pdf.setTextColor(38, 35, 78); pdf.setFontSize(14); pdf.text(`Assessment for ${platform}`, 20, y); y += 8
  pdf.setFontSize(10); pdf.setTextColor(95, 91, 112); pdf.text(`Date: ${date}`, 20, y); y += 16
  pdf.setTextColor(38, 35, 78); pdf.setFontSize(28); pdf.text(`${result.total} / 100`, 20, y); y += 8
  pdf.setFontSize(12); pdf.text(result.band, 20, y); y += 18
  pdf.setFontSize(14); pdf.text('Category breakdown', 20, y); y += 9; pdf.setFontSize(10)
  result.categories.forEach((c) => { pdf.text(`${c.title}: ${c.score} / ${c.max}`, 24, y); y += 7 })
  y += 8; pdf.setFontSize(14); pdf.text('Personalized recommendations', 20, y); y += 9; pdf.setFontSize(10)
  result.recommendations.forEach((r) => { const lines = pdf.splitTextToSize(`• ${r}`, 165); pdf.text(lines, 24, y); y += lines.length * 6 })
  y += 10; pdf.setFontSize(9); pdf.setTextColor(95, 91, 112); pdf.text('This is an educational self-assessment based only on your answers. It does not access, scan, hack, or verify any social media account.', 20, y, { maxWidth: 170 })
  pdf.save(`privacy-check-${platform.toLowerCase()}-report.pdf`)
}
