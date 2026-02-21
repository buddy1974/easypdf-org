const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://api.easypdfkit.org'

async function apiCall(endpoint: string, formData: FormData): Promise<Blob> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    body: formData,
  })
  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || `API error: ${response.status}`)
  }
  return response.blob()
}

export async function mergePDFs(files: File[]): Promise<Blob> {
  const formData = new FormData()
  files.forEach((f) => formData.append('files', f))
  return apiCall('/merge', formData)
}

export async function splitPDF(file: File, pages: string): Promise<Blob> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('pages', pages)
  return apiCall('/split', formData)
}

export async function compressPDF(file: File, level: 'low' | 'medium' | 'high'): Promise<Blob> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('level', level)
  return apiCall('/compress', formData)
}

export async function pdfToWord(file: File): Promise<Blob> {
  const formData = new FormData()
  formData.append('file', file)
  return apiCall('/pdf-to-word', formData)
}

export async function wordToPDF(file: File): Promise<Blob> {
  const formData = new FormData()
  formData.append('file', file)
  return apiCall('/word-to-pdf', formData)
}

export async function jpgToPDF(files: File[]): Promise<Blob> {
  const formData = new FormData()
  files.forEach((f) => formData.append('files', f))
  return apiCall('/jpg-to-pdf', formData)
}

export async function pdfToJPG(file: File): Promise<Blob> {
  const formData = new FormData()
  formData.append('file', file)
  return apiCall('/pdf-to-jpg', formData)
}

export async function rotatePDF(file: File, degrees: 90 | 180 | 270): Promise<Blob> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('degrees', String(degrees))
  return apiCall('/rotate', formData)
}

export async function protectPDF(file: File, password: string): Promise<Blob> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('password', password)
  return apiCall('/protect', formData)
}

export async function unlockPDF(file: File, password: string): Promise<Blob> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('password', password)
  return apiCall('/unlock', formData)
}

export async function textToPDF(text: string, title: string): Promise<Blob> {
  const formData = new FormData()
  formData.append('text', text)
  formData.append('title', title)
  return apiCall('/text-to-pdf', formData)
}

export async function htmlToPDF(html: string): Promise<Blob> {
  const formData = new FormData()
  formData.append('html', html)
  return apiCall('/html-to-pdf', formData)
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
