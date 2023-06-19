// CONSTants
    // --- visual correction for canvas
    const correctionCoeff = 0.987;
    const verticalScrollbarWidth = (document.body.clientWidth - window.innerWidth);
    export const fullViewportWidth = (document.body.clientWidth - verticalScrollbarWidth);
    export const fullViewportHeight = (window.innerHeight * correctionCoeff);