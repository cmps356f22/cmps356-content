import React, {useState} from "react";
import AyaList from "./AyaList";
import SurahSelector from "./SurahSelector";

export default function SurahExplorer() {
    const [selectedSurah, setSelectedSurah] = useState(0);
    
    function handleOnSurahSelected(surahId) {
       setSelectedSurah(surahId)
    }

    return (
        <>
            <SurahSelector onSurahSelected={handleOnSurahSelected}/>
            <AyaList surahId={selectedSurah}/>
        </>
    );
}