import { useEffect } from 'react'

export const useIntersectionAnim = (selector: string) => {
    useEffect(() => {
        // Observer para animaciones
        const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('show')
                    } else entry.target.classList.remove('show')
                })
            })
            const elements = document.querySelectorAll(selector)
            elements.forEach(el => observer.observe(el))
            return () => observer.disconnect()
    }, [selector])
}