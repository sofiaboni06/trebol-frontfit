import React, { useState } from 'react'

// Placeholder SVG de planta
const PLANT_PLACEHOLDER_SVG = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNGNEYxRUEiLz4KICAKICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSI5MCIgcj0iMzAiIGZpbGw9IiMyRTVFNEUiIG9wYWNpdHk9IjAuMiIvPgogIAogIDwhLS0gVGFsbG8gcHJpbmNpcGFsIC0tPgogIDxyZWN0IHg9Ijk2IiB5PSIxMjAiIHdpZHRoPSI4IiBoZWlnaHQ9IjQ1IiBmaWxsPSIjMkU1RTRFIi8+CiAgCiAgPCEtLSBIb2phIGl6cXVpZXJkYSBkZSBhcnJpYmEgLS0+CiAgPHBhdGggZD0iTTk2IDEwMEMgOTYgMTAwIDgwIDg1IDc1IDEwMCIgc3Ryb2tlPSIjMkU1RTRFIiBzdHJva2Utd2lkdGg9IjUiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIAogIDwhLS0gSG9qYSBkZXJlY2hhIGRlIGFycmliYSAtLT4KICAKICQ2IGQiQ2lyY2xlIGN4PSIxMjAiIGN5PSI5MCIgcj0iMjAiIGZpbGw9IiMyRTVFNEUiIG9wYWNpdHk9IjAuNiIgdHJhbnNmb3JtPSJyb3RhdGUoMzAgMTIwIDkwKSIvPgogIAogIDwhLS0gSG9qYSBkZXJlY2EgLT4KICAKICSKIKSKIKSKI8L3N2Zz4='

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)

  const handleError = () => {
    setDidError(true)
  }

  const { src, alt, style, className, ...rest } = props

  return didError ? (
    <div
      className={`inline-block bg-[#F4F1EA] flex items-center justify-center ${className ?? ''}`}
      style={style}
    >
      <img 
        src={PLANT_PLACEHOLDER_SVG} 
        alt="Imagen no disponible" 
        className="w-3/4 h-3/4 object-contain opacity-60"
      />
    </div>
  ) : (
    <img src={src} alt={alt} className={className} style={style} {...rest} onError={handleError} />
  )
}
