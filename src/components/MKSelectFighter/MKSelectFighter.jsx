import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useKeyPress } from '../../utils/hooks';
import fighters from '../../utils/fighters';

export default function MKSelectFighter() {
    const history = useHistory();
    const [active, setActive] = useState(0);
    const upPress = useKeyPress('ArrowUp');
    const downPress = useKeyPress('ArrowDown');
    const leftPress = useKeyPress('ArrowLeft');
    const rightPress = useKeyPress('ArrowRight');
    const enterPress = useKeyPress('Enter');

    useEffect(() => {
        if (upPress) {
            if (active > 0 && active < 6) {
                setActive((a) => 16 + a);
            } else if (active >= 7 && active <= 12) {
                setActive((a) => a - 6);
            } else if (active >= 12 && active <= 16) {
                setActive((a) => a - 5);
            } else if (active >= 17 && active <= 22) {
                setActive((a) => a - 5);
            }
        }
    }, [upPress]);
    useEffect(() => {
        if (downPress) {
            if (active > 0 && active < 7) {
                setActive((a) => a + 6);
            } else if (active >= 7 && active <= 12) {
                setActive((a) => a + 5);
            } else if (active >= 12 && active <= 16) {
                setActive((a) => a + 5);
            } else if (active >= 17 && active <= 22) {
                setActive((a) => Math.abs(16 - a));
            }
        }
    }, [downPress]);
    useEffect(() => {
        if (leftPress) {
            if (active > 0) {
                setActive((a) => a - 1);
            } else {
                setActive(21);
            }
        }
    }, [leftPress]);
    useEffect(() => {
        if (rightPress) {
            if (active < 21) {
                setActive((a) => a + 1);
            } else {
                setActive(0);
            }
        }
    }, [rightPress]);
    useEffect(() => {
        if (enterPress) {
            history.push('/vs', { fighter: active });
        }
    }, [enterPress]);

    return (
        <div className="screen">
            <h1>Select your fighter</h1>
            <ul className="fighters-list">
                {fighters.map((fighter, i) => (
                    <div
                        className={`
                            fighters-list__fighter 
                            fighters-list__fighter--${i + 1}
                            ${
                                active === i
                                    ? 'fighters-list__fighter--active'
                                    : ''
                            }
                            fighter
                        `}
                        key={fighter.name}
                    >
                        <img
                            className="fighter__image"
                            src={`${process.env.PUBLIC_URL}fighters/${fighter.name}/${fighter.name}.gif`}
                            alt={fighter.name}
                        />
                    </div>
                ))}
            </ul>
        </div>
    );
}
