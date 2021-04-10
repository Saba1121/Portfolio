const pageVariants = {
    initial : {
        x : '100vw'
    },
    in : {
        x : 0
    }, 
    out : {
        x : '-100vw'
    }
}

const pageTransition = {
    ease: "easeOut",
    delay: .5,
    duration: 1
}

const aboutProjectTransition = {
    ease: "easeOut",
    // delay: .5,
    duration: 1
}

const aboutProjectVariants = {
    initial : {
        x : '100vw'
    },
    in : {
        x : 0
    }, 
    out : {
        x : '-100vw'
    }
}

export {
    pageVariants,
    pageTransition
}