export default function fitext( fittables, wideable ) {
    [...fittables].forEach( box => {

        const WRAPPER_CLASSNAME = 'fitter'

        if ( !RegExp( WRAPPER_CLASSNAME ).test( box.firstElementChild.className ) )
            box.innerHTML = `<div class='${WRAPPER_CLASSNAME}'>${box.innerHTML}</div>`

        const
            FITTER = box.firstElementChild,
            CHILDREN = [...box.getElementsByTagName( '*' )]

        FITTER.style.display = 'inline-block'

        const core = () => {
            const
                OVERFLOWING = () => {
                    const
                        BOX_PADDING_TOP = parseFloat( getComputedStyle( box ).paddingTop ),
                        BOX_PADDING_BOTTOM = parseFloat( getComputedStyle( box ).paddingBottom ),
                        NORMALIZED_BOX_HEIGHT = box.offsetHeight - ( BOX_PADDING_TOP + BOX_PADDING_BOTTOM )

                    return FITTER.offsetHeight > NORMALIZED_BOX_HEIGHT
                },
                UPDATE_FONT_SIZE = ( child, multiplier ) => child.style.fontSize = `${parseFloat( getComputedStyle( child ).fontSize ) * multiplier}px`


            CHILDREN.forEach( child => {
                if ( !child.dataset.size )
                    child.dataset.size = getComputedStyle( child ).fontSize
            } )

            function check() {
                if ( OVERFLOWING() )
                    while ( OVERFLOWING() )
                        CHILDREN.forEach( child => UPDATE_FONT_SIZE( child, .99 ) )
                else
                    if ( wideable )
                        while ( !OVERFLOWING() )
                            CHILDREN.forEach( child => UPDATE_FONT_SIZE( child, 1.01 ) )
                    else
                        CHILDREN.forEach( child => parseFloat( child.style.fontSize ) * 1.01 < child.dataset.size
                            ? UPDATE_FONT_SIZE( child, 1.01 )
                            : child.style.removeProperty( 'font-size' ) )

                if ( OVERFLOWING() )
                    check()
            }
            check()
        }
        core()

        FITTER.style.removeProperty( 'display' )
    } )
}
