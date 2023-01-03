import React, {useEffect, useState} from 'react';
import {getHeroes, addHero, updateHero, deleteHero} from '../api-calls/HeroService'
import HeroEditor from './HeroEditor'
import Modal from 'react-modal';

export default function Heroes({user}) {
    const [heroes, setHeroes] = useState([]);
    const [selectedHero, setSelectedHero] = useState({});
    const [error, setError] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const isContributor = user && user.role === "Contributor";

    const customStyles = {
        content : {
            top         : '50%',
            left        : '50%',
            right       : 'auto',
            bottom      : 'auto',
            marginRight : '-50%',
            transform   : 'translate(-50%, -50%)',
            maxHeight   : '100vh',
            overflowY   : 'auto'
        }
    };

    //When the component is created then get the heroes using Web API
    useEffect(() => {
        try {
            console.log("Heroes.user", user);
            setError('');
            getHeroes().then(heroes => setHeroes(heroes) && console.log(heroes));
        } catch (e) {
            console.dir(e);
            setError(`${e.error}. Please make sure the server is running.`);
        }
    }, []);

    const openModal = () => {
       setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const onDeleteHero = async (heroId) => {
        if (!confirm('Confirm Delete?')) {
            return;
        }

        await deleteHero(heroId);

        // Remove the deleted hero
        setHeroes(heroes.filter(h => h._id != heroId))
    };

    const onEditHero = async (e, heroId) => {
        e.preventDefault();
        const hero = heroes.find(h => h._id === heroId);
        //Clone the hero to avoid direct edit of the hero displayed in the list
        setSelectedHero({...hero});
        openModal();
    };

    const onAddHero = () => {
        setSelectedHero(null);
        openModal();
    };

    const saveHero = async (hero) => {
        console.log("saveHero.hero: ", hero);

        //If the hero has an id then update otherwise add
        if (hero._id) {
            await updateHero(hero);
            const index = heroes.findIndex(h => h._id == hero._id);

            const newHeroes = [...heroes];
            newHeroes[index] = hero;
            setHeroes(newHeroes);
        } else {
            hero = await addHero(hero);
            //Clone the tasks then add the new one
            const newHeroes = [...heroes, hero];
            setHeroes(newHeroes);
        }
    }

    return (
        <div>
            <h2>Heroes</h2>
            {error && <p className="text-danger">{error}</p>}
            
            {!isContributor &&
                <p className="text-info">
                    Need a Contributor role to add/update/delete heroes.
                    Login using your Google Account to get these permissions.
                </p>
            }

            {isContributor &&
            <button onClick={onAddHero}>
                <i className="fas fa-plus"></i> Hero
            </button>
            }
            <table>
                <tbody>
                {heroes.map((hero, index) => (
                    <tr key={hero._id}>
                        <td>
                            {isContributor &&
                            <a href="#" onClick={(e) => onEditHero(e, hero._id)}>
                                {hero.name}
                            </a>
                            }
                            {!isContributor &&
                            <span>
                                {hero.name}
                            </span>
                            }
                        </td>
                        <td> {hero.heroType}</td>
                        <td align="right">
                            <ul>
                                {hero.quotes.map((quote, index) => (
                                    <li style={{ direction: "rtl" }} key={`${hero._id}-${index}`}>
                                        {quote.text}
                                    </li>
                                ))}
                            </ul>
                        </td>
                        {isContributor &&
                        <td>
                            <span className="delete" title="Delete hero"
                                  onClick={() => onDeleteHero(hero._id)}>
                                <i style={{ color: "indianred" }} className="fas fa-minus-circle"></i>
                            </span>
                        </td>
                        }
                    </tr>
                ))}
                </tbody>
            </table>
            <br/>

            {/* Wrap the form in a model tag to be able to open it as a dialog */}
            { isContributor &&
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}>
                    <HeroEditor selectedHero={selectedHero} onSave={saveHero} onCancel={closeModal}/>
                </Modal>
            }
        </div>
    )
}

//Needed otherwise you get a warning
Modal.setAppElement('#root');