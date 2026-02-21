import { useRef, useState } from 'react'
import { Upload } from 'lucide-react'

interface UploadZoneProps {
  accept: string
  multiple?: boolean
  onFiles: (files: File[]) => void
  label?: string
  hint?: string
}

export function UploadZone({ accept, multiple = false, onFiles, label, hint }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)

  const handleFiles = (files: FileList | null) => {
    if (!files) return
    onFiles(Array.from(files))
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDragOver(false)
        handleFiles(e.dataTransfer.files)
      }}
      className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors
        ${dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <Upload className="mx-auto mb-4 text-gray-400" size={40} />
      <p className="font-semibold text-gray-700 mb-1">{label || 'Click or drag files here'}</p>
      {hint && <p className="text-sm text-gray-500">{hint}</p>}
    </div>
  )
}
