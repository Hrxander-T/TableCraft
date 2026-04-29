import { useState, useEffect } from 'react'

// --- Returns true if viewport width < 768px ---
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    function handle() { setIsMobile(window.innerWidth < 768) }
    window.addEventListener('resize', handle)
    return () => window.removeEventListener('resize', handle)
  }, [])

  return isMobile
}