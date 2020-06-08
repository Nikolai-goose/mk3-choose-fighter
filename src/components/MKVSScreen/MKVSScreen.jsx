import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

export default function MKVSScreen() {
    const history = useHistory();
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        console.log(history.location.state);
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
