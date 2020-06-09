import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faYinYang,
    faQuestion,
    faBolt,
} from '@fortawesome/free-solid-svg-icons';
import './MKVSScreen.scss';
import fighters from '../../utils/fighters';
import { useKeyPress } from '../../utils/hooks';

const actionsArr = [];
actionsArr.length = 6;
actionsArr.fill([
    {
        icon: faYinYang,
    },
    {
        icon: faQuestion,
    },
    {
        icon: faBolt,
    },
]);

export default function MKVSScreen() {
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const [active, setActive] = useState(0);
    const [activeArr, setActiveArr] = useState([0, 0, 0, 0, 0, 0]);

    const upPress = useKeyPress('w');
    const downPress = useKeyPress('s');
    const leftPress = useKeyPress('a');
    const rightPress = useKeyPress('d');
    const history = useHistory();

    const fighterId = history.location.state
        ? history.location.state.fighter
        : 0;
    const fighter = fighters[fighterId];

    useEffect(() => {
        setTimeout(() => {
            setShouldRedirect(true);
        }, 10000);
    }, []);

    useEffect(() => {
        if (upPress) {
            const currActive = activeArr[active];
            if (currActive === 2) {
                setActiveArr((arr) =>
                    arr.map((a, i) => (i === active ? 0 : a))
                );
            } else {
                setActiveArr((arr) =>
                    arr.map((a, i) => (i === active ? a + 1 : a))
                );
            }
        }
    }, [upPress]);
    useEffect(() => {
        if (downPress) {
            const currActive = activeArr[active];
            if (currActive === 0) {
                setActiveArr((arr) =>
                    arr.map((a, i) => (i === active ? 2 : a))
                );
            } else {
                setActiveArr((arr) =>
                    arr.map((a, i) => (i === active ? a - 1 : a))
                );
            }
        }
    }, [downPress]);
    useEffect(() => {
        if (leftPress) {
            if (active > 0) {
                setActive((a) => a - 1);
            } else {
                setActive(2);
            }
        }
    }, [leftPress]);
    useEffect(() => {
        if (rightPress) {
            if (active < 2) {
                setActive((a) => a + 1);
            } else {
                setActive(0);
            }
        }
    }, [rightPress]);

    if (shouldRedirect) {
        return <Redirect to="/" />;
    }

    return (
        <div className="vs-screen">
            <div className="vs-screen__header">
                <img
                    className="vs-screen__battle"
                    src={`${process.env.PUBLIC_URL}/battle.gif`}
                    alt="battle"
                />
            </div>
            <div className="vs-screen__actions actions">
                {actionsArr.map((a, i) => (
                    <div className="actions__action" key={i}>
                        <FontAwesomeIcon icon={a[activeArr[i]].icon} />
                    </div>
                ))}
            </div>
            <img
                className="vs-screen__versus"
                src={`${process.env.PUBLIC_URL}/vs.gif`}
                alt="vs"
            />
            <div className="vs-screen__fighter vs-screen__fighter--left">
                <img
                    className="vs-screen__fighter-image"
                    src={`${process.env.PUBLIC_URL}/fighters/${fighter.name}/versus.png`}
                    alt={fighter.name}
                />
            </div>
            <div className="vs-screen__fighter vs-screen__fighter--right">
                <img
                    className="vs-screen__fighter-image"
                    src={`${process.env.PUBLIC_URL}/fighters/kabal/versus.png`}
                    alt={fighter.name}
                />
            </div>
        </div>
    );
}
