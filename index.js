const button = document.querySelector("button");
const input = document.querySelector("input");
const wordResult = document.querySelector(".wordResult");
const audioResult = document.querySelector(".audioResult");
const antonymsResult = document.querySelector(".antonymsResult");
const synonymsResult = document.querySelector(".synonymsResult");
const definitionResult = document.querySelector(".definitionResult")
const exampleResult = document.querySelector(".exampleResult")
const partsOfSpeechResult = document.querySelector(".partsOfSpeechResult");






const fetchData = async (word) => {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (response.status === 404) {
            return;
        } else {
            const data = await response.json();
            fillData(data);
        }

    } catch (error) {
    }
}

const fillData = (data) => {
    wordResult.textContent = data[0].word;
    if (!data[0].phonetics[2]) {
    } else {
        audioResult.src = data[0].phonetics[2].audio;

    }
    antonymsResult.textContent = data[0].meanings[0].antonyms.slice(0, 3).toString();
    synonymsResult.textContent = data[0].meanings[0].synonyms.slice(0, 3).toString();
    definitionResult.textContent = data[0].meanings[0].definitions[0].definition;

    if (!data[0].meanings[1]) {
        exampleResult.textContent = `example  unavailable`
    } else {
        exampleResult.textContent = data[0].meanings[1].definitions[0].example;
    }


    let partSpeech = data[0].meanings.map(item => item.partOfSpeech);
    partsOfSpeechResult.textContent = partSpeech.toString();

}




button.addEventListener("click", () => {
    if (input.value == "") {
        return;
    }
    fetchData(input.value);
    input.value = "";

})


input.addEventListener("keyup", (event) => {
    if (event.target.value != "") {
        fetchData(event.target.value);
    }
    else {
        fetchData('dictionary');
    }
})
