import React from 'react';
import { Loader } from 'semantic-ui-react'

function Loading({ color, size, inverted }) {
    return (
        <Loader
            style={{ color: color }}
            active
            inline='centered'
            size={size}
            inverted={inverted}
        >
            Loading
        </Loader>
    )
}

export default Loading;