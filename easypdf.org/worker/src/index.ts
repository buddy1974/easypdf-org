/**
 * EasyPDFKit – Cloudflare Worker API Scaffold
 *
 * This is a production-ready scaffold. PDF processing logic
 * should be connected to a PDF microservice or Cloudflare binding.
 * All endpoints follow the contract expected by src/lib/pdfEngine.ts.
 */

const ALLOWED_ORIGINS = [
  'https://easypdfkit.org',
  'https://www.easypdfkit.org',
]

const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024 // 50 MB
const RATE_LIMIT_RPM = 60

// Simple in-memory rate limiter (resets per Worker isolate restart)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function getCorsHeaders(origin: string): HeadersInit {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  }
}

function jsonResponse(data: unknown, status = 200, origin = ''): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...getCorsHeaders(origin),
    },
  })
}

function errorResponse(message: string, status = 400, origin = ''): Response {
  return jsonResponse({ error: message, ok: false }, status, origin)
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 })
    return true
  }
  if (entry.count >= RATE_LIMIT_RPM) return false
  entry.count++
  return true
}

async function validateUpload(request: Request): Promise<{ ok: true; formData: FormData } | { ok: false; error: string }> {
  const contentType = request.headers.get('content-type') || ''
  if (!contentType.includes('multipart/form-data')) {
    return { ok: false, error: 'Request must be multipart/form-data' }
  }
  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return { ok: false, error: 'Failed to parse form data' }
  }

  for (const [, value] of formData.entries()) {
    if (value instanceof File && value.size > MAX_FILE_SIZE_BYTES) {
      return { ok: false, error: `File "${value.name}" exceeds the 50 MB size limit` }
    }
  }

  return { ok: true, formData }
}

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url)
    const origin = request.headers.get('origin') || ''
    const ip = request.headers.get('cf-connecting-ip') || 'unknown'

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: getCorsHeaders(origin) })
    }

    // Health check
    if (url.pathname === '/health' && request.method === 'GET') {
      return jsonResponse({ ok: true, service: 'EasyPDFKit API', version: '1.0.0' }, 200, origin)
    }

    // Rate limiting
    if (!checkRateLimit(ip)) {
      return errorResponse('Rate limit exceeded. Please wait before making more requests.', 429, origin)
    }

    // Route POST endpoints
    if (request.method === 'POST') {
      const validation = await validateUpload(request)
      if (!validation.ok) {
        return errorResponse(validation.error, 400, origin)
      }
      const { formData } = validation

      switch (url.pathname) {
        case '/merge':
          return handleMerge(formData, origin)
        case '/split':
          return handleSplit(formData, origin)
        case '/compress':
          return handleCompress(formData, origin)
        case '/pdf-to-word':
          return handlePdfToWord(formData, origin)
        case '/word-to-pdf':
          return handleWordToPdf(formData, origin)
        case '/jpg-to-pdf':
          return handleJpgToPdf(formData, origin)
        case '/pdf-to-jpg':
          return handlePdfToJpg(formData, origin)
        case '/rotate':
          return handleRotate(formData, origin)
        case '/protect':
          return handleProtect(formData, origin)
        case '/unlock':
          return handleUnlock(formData, origin)
        case '/text-to-pdf':
          return handleTextToPdf(formData, origin)
        case '/html-to-pdf':
          return handleHtmlToPdf(formData, origin)
        default:
          return errorResponse('Endpoint not found', 404, origin)
      }
    }

    return errorResponse('Method not allowed', 405, origin)
  },
}

// ─── Endpoint handlers ────────────────────────────────────────────────────────
// Each handler receives validated formData. Connect PDF processing logic here.

function notImplemented(endpoint: string, origin: string): Response {
  return jsonResponse(
    {
      ok: false,
      error: `${endpoint} processing logic not yet connected. Scaffold only.`,
      hint: 'Connect a PDF microservice or Cloudflare binding to implement this endpoint.',
    },
    501,
    origin,
  )
}

async function handleMerge(_formData: FormData, origin: string): Promise<Response> {
  // TODO: Extract files[], merge PDFs in order, return merged PDF blob
  return notImplemented('POST /merge', origin)
}

async function handleSplit(_formData: FormData, origin: string): Promise<Response> {
  // TODO: Extract file, pages param (e.g. "1-3,5"), split and return ZIP
  return notImplemented('POST /split', origin)
}

async function handleCompress(_formData: FormData, origin: string): Promise<Response> {
  // TODO: Extract file, level param (low|medium|high), compress, return PDF
  return notImplemented('POST /compress', origin)
}

async function handlePdfToWord(_formData: FormData, origin: string): Promise<Response> {
  // TODO: Extract file, convert PDF→DOCX, return DOCX blob
  return notImplemented('POST /pdf-to-word', origin)
}

async function handleWordToPdf(_formData: FormData, origin: string): Promise<Response> {
  // TODO: Extract file, convert DOCX→PDF, return PDF blob
  return notImplemented('POST /word-to-pdf', origin)
}

async function handleJpgToPdf(_formData: FormData, origin: string): Promise<Response> {
  // TODO: Extract files[], combine images into PDF, return PDF blob
  return notImplemented('POST /jpg-to-pdf', origin)
}

async function handlePdfToJpg(_formData: FormData, origin: string): Promise<Response> {
  // TODO: Extract file, render each page as JPG, return ZIP of images
  return notImplemented('POST /pdf-to-jpg', origin)
}

async function handleRotate(_formData: FormData, origin: string): Promise<Response> {
  // TODO: Extract file, degrees param (90|180|270), rotate, return PDF
  return notImplemented('POST /rotate', origin)
}

async function handleProtect(_formData: FormData, origin: string): Promise<Response> {
  // TODO: Extract file, password param, apply password protection, return PDF
  return notImplemented('POST /protect', origin)
}

async function handleUnlock(_formData: FormData, origin: string): Promise<Response> {
  // TODO: Extract file, password param, remove password, return PDF
  return notImplemented('POST /unlock', origin)
}

async function handleTextToPdf(_formData: FormData, origin: string): Promise<Response> {
  // TODO: Extract text content, title param, generate PDF, return blob
  return notImplemented('POST /text-to-pdf', origin)
}

async function handleHtmlToPdf(_formData: FormData, origin: string): Promise<Response> {
  // TODO: Extract html content, render to PDF via headless browser or API
  return notImplemented('POST /html-to-pdf', origin)
}
