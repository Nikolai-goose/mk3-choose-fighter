import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

export default function MKVSScreen() {
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShouldRedirect(true);
        }, 10000);
    }, []);

    if (shouldRedirect) {
        return <Redirect to="/" />;
    }

    return (
        <div>
            <h1>vs</h1>
        </div>
    );
}
