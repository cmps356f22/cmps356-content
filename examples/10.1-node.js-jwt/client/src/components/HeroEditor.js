import React, {useState, useEffect} from 'react';

export default function HeroEditor({selectedHero, onSave, onCancel}) {
    const [hero, setHero] = useState({name: '', heroType: '' });
    const heroTypes = ['Prophet', 'Companion', 'Scholar'];

    useEffect(() => {
        if (selectedHero != null) {
            setHero(selectedHero);
        }
        console.log("HeroEditor.hero: ", selectedHero);
    }, [selectedHero])

    const handleChange = e => {
        const {name, value} = e.target;
        setHero({...hero, [name]: value});
    };

    const handleSubmit = () => {
        onSave(hero);
    };

    const handleCancel = () => {
        onCancel();
    };

    const addQuote = () => {
        const updatedHero = {...hero};

        if (!updatedHero.quotes) {
            updatedHero.quotes = [];
        }
        updatedHero.quotes.push({text: ''});
        setHero(updatedHero);
    };

    const updateQuote = (index, quoteText) => {
        const updatedHero = {...hero};
        updatedHero.quotes[index].text = quoteText;
        setHero(updatedHero);
    };

    const deleteQuote = (quoteIndex) => {
        const updatedHero = {...hero};
        updatedHero.quotes.splice(quoteIndex, 1);
        setHero(updatedHero);
    };

    return (
        <div>
            <button className="close-button" aria-label="Close modal" type="button" style={{float: 'right'}}
                    onClick={handleCancel}>
                <span aria-hidden="true">&times;</span>
            </button>

            {hero && hero._id && <h3>Edit Hero</h3>}
            {hero && !hero._id && <h3>Add Hero</h3>}

            <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required value={hero.name} onChange={handleChange} autoFocus />

            <label htmlFor="heroType">Hero Type</label>
            <select id="heroType" name="heroType" required value={hero.heroType} onChange={handleChange}>
                <option value=""></option>
                {heroTypes.map(heroType =>
                    <option value={heroType} key={heroType}> {heroType} </option>
                )}
            </select>

            <label>Quotes</label>
            < span title="Add Quote" onClick={addQuote}>
                      <i style={{color: "blue"}} className="fas fa-plus"></i> Quote
             </span>

            {hero.quotes && hero.quotes.map((quote, index) => (
                <div  key={`${hero._id}-${index}`} style={{gridColumn: "1 / 3"}}>
                    <input type="text" required value={quote.text || ''} onChange={(e) => updateQuote(index, e.target.value)} />
                    <span className="delete" title="Delete quote" onClick={() => deleteQuote(index)}>
                          <i style={{color: "indianred"}} className="fas fa-minus-circle" ></i>
                    </span>
                </div>
            ))}
            <br />
                <button type="submit">Save</button>
            </form>
        </div>
)}