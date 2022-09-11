import React, {useState, useEffect} from "react";

export default function Surahs() {
    const [surahs, setSurahs] = useState([]);
    const [ayat, setAyat] = useState([]);
    const [selectedSurah, setSelectedSurah] = useState(0);

    //Invoked only one time when the component is first mounted to the DOM.
    useEffect(() => {
        async function getSurahs() {
            const url = "https://api.quran.com/api/v4/chapters";
            const response = await fetch(url);
            const surahs = await response.json();
            return  surahs.chapters;
        }

        console.log(`I just mounted!`);
        getSurahs().then(surahList => setSurahs(surahList));
        setSelectedSurah(1);
    }, []);

    //Gets auto-executed every time selectedSurah changes
    useEffect(() => {
        async function getVerses(surahId) {
            if (surahId == 0) return [];
            const url = `https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${surahId}`;
            const response = await fetch(url);
            const verses = await response.json();
            return  verses.verses;
        }

        console.log(`selectedSurah is now ${selectedSurah}`);
        getVerses(selectedSurah).then(verses => setAyat(verses));

    }, [selectedSurah]);

    return (
        <>
            <label htmlFor="surahDD">Surah</label>
            <select id="surahDD" onChange={(e) => setSelectedSurah(e.target.value)}>
                {surahs.map(surah =>
                    <option value={surah.id}>
                        {surah.name_arabic} - {surah.name_simple}
                    </option>
                )}
            </select>
            <ul style= { { direction: "rtl" }}>
                {ayat.map((aya, i) =>
                    <li key={aya.id}>
                        {aya.text_uthmani} ({i+1})
                    </li>
                )}
            </ul>
        </>
    );
}