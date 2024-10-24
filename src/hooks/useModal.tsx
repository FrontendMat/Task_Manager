import { useCallback, useState } from "react"

export const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const onToggleModal = useCallback(() => {
        setIsOpen(prev => !prev)
    }, []);

    return {
        isOpen,
        onToggleModal
    }
}