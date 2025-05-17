<!-- this is practice one page for practicing paragraph 50 words paragraph -->

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { typing_data } from '@/Data';

// this variable is for string data that i receive from database randomly as you can see below function of getting_paragraph_data 
const para_description = ref("");
const total_words = ref(0);

// this variable to store total number of paragraph entries in server database so that i can use that in random number generation and other use if needed
// const minimum_number_posts = ref(200);
const number_of_para_posts = ref(90);

// audio instances for now i am keeping keyboard three audio 
const keyboard_eight = new Audio("../../sounds/keyboard_eight.mp3");

// get request to get paragraph data randomly based on rndom number generated and use that number to use as an id in get request
const getting_paragraph_data = () => {
    const random_id = Math.ceil(Math.random() * number_of_para_posts.value);
    // axios.get(`http://localhost:5185/paragraph/${random_id}`)
    //     .then((response) => {
    //         para_description.value = response.data.description;
    //         total_words.value = para_description.value.split(" ").length;
    //     })
    //     .catch((error) => {
    //         console.error("error occured during fetching the data", error);
    //     })
    const random_paragraph = typing_data[random_id];
    para_description.value = random_paragraph;
    total_words.value = para_description.value.split(" ").length;
}

// calling getting_random_data function here to run get initial data.
getting_paragraph_data();

// variables created for storing input and then emptying when needed to, index of data string for moving data string from one character to another, correct, incorrect and result display for calculating result based on correct and incorrect matches. and also creating seconds counter variable to record the total time to get total time 
const typing_input = ref("");
const index = ref(0);
const correct_match = ref(0);
const incorrect_match = ref(0);
const result = ref(0);
const words_per_minute = ref(0);
const seconds_counter = ref(0);

// this is created for displaying different screens based on practice and then displaying results and back to practice with restore button (in prodection i can have next and home button for giving those preferance) 
const test_display = ref(true);
const result_display = ref(false);

// this is the function to calculate total time it takes to complete a session
setInterval(() => {
    if (index.value > 0 && index.value <= para_description.value.length) {
        seconds_counter.value += 1;
    }
}, 1000);

// this is mega function about matching keys with data string and then keeping that in record in correct or incorrect match and then calculation of result of accuracy (WPM soon to calculate)
const matching_funcitionality = (event) => {
    // here i have to keep condition like this because after finishing index still i have to press a key to get to the else statement and that is not what i want here i can get to else as soon as i press last key but only problem is last key is not considered so you may not get accuracy 100% ever.
    if (index.value < para_description.value.length - 1) {
        keyboard_eight.play();
        if ((event.key === "Backspace") || (event.key === "Shift")) {
            console.log("do nothing");
        }
        else {
            const match_char = event.key === para_description.value[index.value];
            if (match_char) {
                correct_match.value += 1;
            }
            else {
                incorrect_match.value += 1;
            }
            index.value += 1;
            typing_input.value = "";
        }
    }
    else {
        alert("press enter to continue");
        words_per_minute.value = Number(Math.round(60 * total_words.value / seconds_counter.value));
        result.value = Math.round(correct_match.value / para_description.value.length * 100);
        test_display.value = false;
        result_display.value = true;
    }
}


const restore_practice = () => {
    typing_input.value = "";
    test_display.value = true;
    result_display.value = false;
    correct_match.value = 0;
    incorrect_match.value = 0;
    index.value = 0;
    result.value = 0;
    seconds_counter.value = 0;

    getting_paragraph_data();

}

</script>

<template>
    <div id="practice_one_main">
        <div id="practice_text_display" v-show="test_display">
            <p><span v-for="(character, char_index) in para_description" :key="char_index"
                    :class="{ highlight_charecter: char_index === index }">{{ character }}</span></p>
            <input type="text" placeholder="type here" v-on:keydown="matching_funcitionality" v-model="typing_input"
                class="caret_cursor_hiding">
        </div>
        <div id="practice_result_display" v-show="result_display">
            <p>Your accuracy is : <span>{{ result }}%</span></p>
            <p>Your WPM is : <span>{{ words_per_minute }}</span></p>
            <br>
            <button v-on:click="restore_practice()">Next</button>
        </div>
    </div>
</template>

<style scoped>
#practice_one_main {
    width: 65vw;
    height: 65vh;
    margin: auto;
    transform: translateY(8vh);
    border-radius: 20px;
    box-shadow: 1px 1px 10px var(--font_color_one);
    padding: 5px;
    animation: appearance 2s ease-in-out, movement_two 2s ease-in-out;
}

#practice_one_main:hover {
    box-shadow: 2px 2px 20px var(--font_color_one);
}

#practice_text_display {
    animation: appearance 2s ease-in-out;
}

#practice_text_display p {
    color: var(--font_color_two);
    font-size: 26px;
    line-height: 2;
    padding: 20px;
    word-spacing: 2px;
    letter-spacing: 1.6px;
    height: 45vh;
    font-weight: 400;
}

#practice_text_display input {
    display: block;
    margin: 40px auto;
    padding: 10px 30px;
    width: 20vw;
    font-size: 30px;
    text-align: center;
    border-radius: 20px;
    background-color: var(--font_color_three);
    color: var(--font_color_two);
}

#practice_result_display {
    display: flex;
    flex-direction: column;
    transform: translateY(10vh);
    align-items: center;
    animation: appearance 2s ease-in-out;
}

#practice_result_display p {
    font-size: 26px;
    text-align: center;
    color: var(--font_color_one);
    padding: 20px;
    font-weight: 700;
}

#practice_result_display span {
    color: var(--font_color_two);
}

#practice_result_display button {
    background-color: var(--font_color_three);
    border: 1px solid var(--font_color_three);
    box-shadow: 1px 1px 5px var(--font_color_one);
    color: var(--font_color_one);
    padding: 15px;
    margin: 10px;
    font-size: 20px;
    border-radius: 10px;
    text-align: center;
    width: 20vw;
    font-weight: 700;
}

#practice_result_display button:hover {
    background-color: var(--font_color_one);
    color: var(--background_color_one);
    box-shadow: 1px 1px 10px var(--font_color_one);
    font-style: italic;
    font-weight: 900;
    border: 1px solid var(--font_color_one);
}

.caret_cursor_hiding {
    caret-color: transparent;
}

.highlight_charecter {
    text-decoration: underline;
    color: var(--font_color_one);
    font-weight: 600;
    /* background-color: var(--font_color_one); */
}
</style>