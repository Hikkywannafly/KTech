import { useState, useEffect } from 'react';

export function useMobileMenu() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const openMenu = () => {
        setIsMobileMenuOpen(true);
        document.body.classList.add('mobile-menu-open');
    };

    const closeMenu = () => {
        setIsMobileMenuOpen(false);
        document.body.classList.remove('mobile-menu-open');
    };

    const toggleMenu = () => {
        setIsMobileMenuOpen((prev) => {
            const next = !prev;
            if (next) {
                document.body.classList.add('mobile-menu-open');
            } else {
                document.body.classList.remove('mobile-menu-open');
            }
            return next;
        });
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            document.body.classList.remove('mobile-menu-open');
        };
    }, []);

    return {
        isMobileMenuOpen,
        openMenu,
        closeMenu,
        toggleMenu,
        setIsMobileMenuOpen,
    };
} 