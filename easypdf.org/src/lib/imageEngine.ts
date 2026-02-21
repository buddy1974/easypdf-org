export type ImageFormat = 'image/jpeg' | 'image/png' | 'image/webp'

export interface ConversionOptions {
  format: ImageFormat
  quality?: number
  maxWidth?: number
  maxHeight?: number
}

export interface ConversionResult {
  blob: Blob
  url: string
  filename: string
  originalSize: number
  convertedSize: number
}

export async function convertImage(
  file: File,
  options: ConversionOptions
): Promise<ConversionResult> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const objectUrl = URL.createObjectURL(file)

    img.onload = () => {
      const canvas = document.createElement('canvas')
      let { width, height } = img

      if (options.maxWidth && width > options.maxWidth) {
        height = Math.round((height * options.maxWidth) / width)
        width = options.maxWidth
      }
      if (options.maxHeight && height > options.maxHeight) {
        width = Math.round((width * options.maxHeight) / height)
        height = options.maxHeight
      }

      canvas.width = width
      canvas.height = height

      const ctx = canvas.getContext('2d')!
      if (options.format === 'image/jpeg') {
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, width, height)
      }
      ctx.drawImage(img, 0, 0, width, height)

      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(objectUrl)
          if (!blob) { reject(new Error('Conversion failed')); return }
          const ext = options.format.split('/')[1].replace('jpeg', 'jpg')
          const originalName = file.name.replace(/\.[^.]+$/, '')
          const filename = `${originalName}.${ext}`
          resolve({
            blob,
            url: URL.createObjectURL(blob),
            filename,
            originalSize: file.size,
            convertedSize: blob.size,
          })
        },
        options.format,
        options.quality ?? 0.85
      )
    }

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error('Failed to load image'))
    }

    img.src = objectUrl
  })
}

export async function compressImage(file: File, quality: number): Promise<ConversionResult> {
  const format = file.type === 'image/png' ? 'image/png' : 'image/jpeg'
  return convertImage(file, { format: format as ImageFormat, quality })
}

export async function resizeImage(
  file: File,
  maxWidth: number,
  maxHeight: number
): Promise<ConversionResult> {
  const format = (file.type as ImageFormat) || 'image/jpeg'
  return convertImage(file, { format, maxWidth, maxHeight })
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}
