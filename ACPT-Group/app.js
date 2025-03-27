document.addEventListener('DOMContentLoaded', () => {
    const group1Exercises = document.getElementById('group-1-exercises');
    const group2Exercises = document.getElementById('group-2-exercises');
    const group3Exercises = document.getElementById('group-3-exercises');
    const group4Exercises = document.getElementById('group-4-exercises');
    const addCustomStation = document.getElementById('add-station-group');
    const totalTimeDisplay = document.getElementById('total-time');
    const workoutPage = document.getElementById('workout-page');
    const customizePage = document.getElementById('customize-page');
    const sessionTimer = document.getElementById('session-timer');
    const group1Video = document.getElementById('group-1-video');
    const group2Video = document.getElementById('group-2-video');
    const group3Video = document.getElementById('group-3-video');
    const group4Video = document.getElementById('group-4-video');
    const group5Video = document.getElementById('group-5-video');
    const group6Video = document.getElementById('group-6-video');
    const group7Video = document.getElementById('group-7-video');
    const group8Video = document.getElementById('group-8-video');
    const group1CountTimer = document.getElementById('group1-timer');
    const group2CountTimer = document.getElementById('group2-timer');
    const currentExDisplay1 = document.getElementById('group1-current-exercise');
    const currentExDisplay2 = document.getElementById('group2-current-exercise');
    const currentExDisplay3 = document.getElementById('group3-current-exercise');
    const currentExDisplay4 = document.getElementById('group4-current-exercise');
    const playPauseButton = document.getElementById('pause-play');
    const fileInput = document.getElementsByClassName('video-upload');
    const exerciseTimerCell = document.getElementById('exercise-timer');
    const repeatExercise = document.getElementById('duration-repeat');
    const timerContainer = document.getElementsByClassName('timer-container');
    const selectColorCode = document.getElementsByClassName('color-coded');
    const currentExerciseTimer = document.getElementById('current-exercise-timer');
    const sessionContainer = document.getElementsByClassName('session-container');
    const warmupContainer = document.getElementById('warmup-container');
    const coolContainer = document.getElementById('cooldown-container');
    const videoContainer1 = document.getElementById('video-container-1');
    const videoContainer2 = document.getElementById('video-container-2');
    const videoContainer3 = document.getElementById('video-container-3');
    const videoContainer4 = document.getElementById('video-container-4');
    const noneP = document.getElementById('none-p');
    const sessionVariable = document.getElementById('session-name');
    const loadSelectSession = document.getElementById('load-session');
    const arrow = document.getElementById('arrow-text');
    const timeBar = document.getElementById('time-bar');
    const refreshButton = document.getElementById('refresh-button');
    const timeSlider = document.getElementById("timeSlider");

    //const for save feature only
    const saveVariableMinutes = document.getElementsByClassName('duration-minutes');
    const saveVariableSeconds = document.getElementsByClassName('duration-seconds');
    const savedVariableRepeats = document.getElementById('duration-repeat');
    const saveVariableColor = document.getElementsByClassName('color-coded');

    //Save feature for color
    let tmpArrayCount = 0;

    const current = 0;
    const maxSessionContainer = 4;
    let sessionData = { group1: [], group1Single: [], group1Cool: [], group4: [], group5: [], group6: [], group7: [], group8: [] };
    let totalDuration = 0;
    let isPaused = false;
    let currentExercise = 0;
    let group1Interval, group2Interval;
    let group1Count = 0;
    let group2Count = 0;
    let globalCount = 4;
    let groupTimer = 0;
    let repeat = 1;
    let repeatFirstCellCount = 1;
    let endRepeat = 1;
    var beep = new Audio('sounds/beep.wav');
    var longBeep = new Audio('sounds/sportslong.wav');
    let videoContainerCount = 0;
    let currentTime = 0;
    let exited = false;

    //Intervals
    var warmupTimer;
    var workoutTimer;
    var cooldownTimer;

    let tmpRepeat = 0;
    let stopTimerFunction = false;
    let stopWarmUpFunction = false;
    let stopCoolFunction = false;
    let insideDivs = false;
    let triggerZero = false;

    //Videos set to none
    group1Video.src = '';
    group2Video.src = '';
    group3Video.src = '';
    group4Video.src = '';

    //Save for save function
    let exerciseTotalCells = 1; //For total amount for each minutes, seconds and color
    let addCellExerciseCount = 0; //For load function to load page
    let stationContainerCount = 4;
    let loadCountArray = 0; //For load session function
    let savedCellsCount = 0; //Counting the amount of cells in array
    var totalStorageCountDes = 0;
    var fileCount = 0;

    // Store video files uploaded by the user
    let group1VideoFiles = [];
    let group2VideoFiles = [];
    let group3VideoFiles = [];
    let group4VideoFiles = [];
    let group5VideoFiles = [];
    let group6VideoFiles = [];
    let group7VideoFiles = [];
    let group8VideoFiles = [];

    //Store user changes
    //sessionUserData is for user input
    //sessionPageData is for page changes like div
    //sessionVideoData is for videos saved location
    let sessionFiles = { sessionUserData: { sessionUserSessionName: [], sessionInput: [] }, sessionPageData: [], sessionVideoData: [] };

    document.getElementById('button-add-station').addEventListener('click', () => {
        if (globalCount < 8) {
            globalCount++;
            console.log(globalCount);
            addStation(addCustomStation, globalCount, 'group' + globalCount, videoContainer3, videoContainer4);
        }
    });

    document.getElementById('button-remove').addEventListener('click', () => {
        removeStation(addCustomStation);
        globalCount = 4;
    });

    //Add exercise timer cell
    document.getElementById('add-timer').addEventListener('click', () => {
        addExercise(exerciseTimerCell);
    });

    //Refresh button
    document.getElementById('refresh-button').addEventListener('click', () => {
        location.reload();
    });

    //refresh calculations
    document.querySelectorAll('#warmup-container .exercise, .duration-seconds .duration-minutes').forEach(input => {
        input.addEventListener('input', updateTotalTime);
    });

    document.querySelectorAll('#cooldown-container .exercise, .duration-seconds .duration-minutes').forEach(input => {
        input.addEventListener('input', updateTotalTime);
    });

    //Rotate button
    document.getElementById('rotate-button').addEventListener('click', () => {

        document.body.style = `    -webkit-transform: rotate(-90deg);
    -moz-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
    width: 1064px;
    height: 1920px;
    margin: -447px 447px;
    zoom: 100%;
    transform: rotate(-90deg);`;
    });

    //Rotate back
    document.getElementById('rotate-back-button').addEventListener('click', () => {

        document.body.style = `    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    width: 1064px;
    height: 1920px;
    margin: auto auto;
    zoom: 100%
    transform: rotate(0deg);`;
    });

    //Save Session storage
    document.getElementById('save-session-as').addEventListener('click', () => {
        saveFunction(sessionVariable);
    });

    //Auto load for select element
    window.onstorage = autoLoadList(loadSelectSession);

    //Load session from storage
    document.getElementById('load-button').addEventListener('click', () => {

        exerciseTimerCell.innerHTML = ``;//Clear when loading

        removeStation(addCustomStation);//Station cleared

        globalCount = 4; // Setting global count to default
        totalStorageCountDes = 0;
        loadCountArray = 0;

        loadSession(loadSelectSession.value, saveVariableMinutes); //Load variables from session array
        loadSession(loadSelectSession.value, saveVariableSeconds);
        //Need Repeat and Color
        loadSession(loadSelectSession.value, saveVariableColor);
        loadSession(loadSelectSession.value, repeatExercise);

        //add station and add file input
        loadSession(loadSelectSession.value, savedCellsCount);
        loadSession(loadSelectSession.value, fileInput);

        //End must refresh
        updateTotalTime();
    });

    //Delete session from Storage
    document.getElementById('delete-button').addEventListener('click', () => {
        deleteSession();
    });

    //Save session function
    function saveFunction(variableDoc) {
        if (variableDoc.value.trim() !== "") {
            //var tmpKey = "option-" + new Date().getTime();
            //localStorage.setItem(tmpKey, variableDoc.value);
            saveInput(saveVariableMinutes, variableDoc.value, "Minutes"); //Minutes
            saveInput(saveVariableSeconds, variableDoc.value, "Seconds");
            saveInput(saveVariableColor, variableDoc.value, "Color");
            //saveVideoArray(fileInput, variableDoc.value, "Videos");//Save videos location
            saveInputSingleVar(repeatExercise, variableDoc.value, "Repeats");
            saveInputSingleVar(globalCount, variableDoc.value, "Station-count");
            saveInputSingleVar(savedCellsCount, variableDoc.value, "Cells-counted");//Saved cells for load
            alert("Saved as: " + variableDoc.value + "\n\nRefreshing...");
            location.reload();
        }

        else {
            alert("Please enter session name!");
        }
    }

    function saveInput(variableInput, sessionName, inputName) {
        var tmpKey = sessionName + " ~ " + new Date().getDay();//Test key outside scope
        var result = Array.from(variableInput);
        var globalFile = sessionFiles.sessionUserData.sessionInput;
        var tmpArray = [];

        result.forEach(function (element) {
            //console.log(element.value);
            //sessionFiles.sessionUserData.sessionInput
            if (element.value === NaN) {
                element.value = 0;
            }
            savedCellsCount++;
            globalFile.push(element.value);
            console.log("Saved cells" + savedCellsCount);
        });
        //var globalArray = sessionFiles.sessionUserData.sessionInput;
        tmpArray.push(globalFile);
        localStorage.setItem(tmpKey, tmpArray);
        //console.log("Saved variables for" + ": " + sessionName);

        /*
        for (let i = 0; i < variableInput.length; i++) {
            console.log("There are: " + i + "Cells");
            console.log(variableInput.toString());
        }
        */
        //alert("Saved Variables for: " + sessionName); 

    }

    function saveInputSingleVar(variableInput, sessionName, inputName) {
        var tmpKey = sessionName + " ~ " + new Date().getDay();
        var result = variableInput;
        var globalFile = sessionFiles.sessionUserData.sessionInput;
        var tmpArray = [];

        //console.log("saveInputSingle: "+result);
        if (variableInput === repeatExercise) {
            globalFile.push(JSON.stringify(parseInt(result.value)));
            console.log(globalFile);
            tmpArray.push(globalFile);
            //console.log("Current array"+tmpArray);
            localStorage.setItem(tmpKey, tmpArray);
        }

        if (variableInput === globalCount) {
            globalFile.push(JSON.stringify(parseInt(result)));
            console.log(globalFile);
            tmpArray.push(globalFile);
            //console.log("Current array"+tmpArray);
            localStorage.setItem(tmpKey, tmpArray);
        }

        if (variableInput === savedCellsCount) {
            globalFile.push(JSON.stringify(parseInt(result)));
            console.log(globalFile);
            tmpArray.push(globalFile);
            //console.log("Current array"+tmpArray);
            localStorage.setItem(tmpKey, tmpArray);
        }

    }

    function saveVideoArray(variableInput, sessionName, inputName) {
        var tmpKey = sessionName + " ~ " + new Date().getDay();
        var result = Array.from(variableInput);
        var globalFile = sessionFiles.sessionUserData.sessionInput;
        var tmpArray = [];
        var file = {};

        result.forEach(function (video) {
            //const videoUrl = toString(variableInput[video].value);
            //To do
            //var file = URL.createObjectURL(video.files[0]);

            const fileName = video.files[0].name; // Save this name or URL in your app
            console.log('File Name:', fileName);


            globalFile.push(fileName);
        });
        tmpArray.push(globalFile);
        console.log("File: " + JSON.stringify(tmpArray));
        localStorage.setItem(tmpKey, JSON.stringify(tmpArray));
    }

    //auto load session
    function autoLoadList(target) {
        //localStorage.removeItem(key);

        if (!localStorage.length) {
            console.log("None saved!");
        }
        else {
            var loadingData = sessionFiles.sessionUserData.sessionUserSessionName;
            for (var i = 0; i < localStorage.length; i++) {
                var tmpKey = localStorage.key(i);
                var tmpValue = localStorage.getItem(tmpKey);

                //Assigning key and values to array
                loadingData.push(tmpKey);

                console.log(loadingData);

                //Display
                console.log(tmpKey + " : " + tmpValue);
                const optionEl = document.createElement('option');
                const selectAllOptions = document.getElementsByClassName("session-option");
                selectAllOptions.innerHTML = '';
                optionEl.classList.add('session-option');
                optionEl.text = tmpValue;
                optionEl.value = tmpKey;
                optionEl.innerHTML = `${tmpKey.split('~')[0]}`;

                target.add(optionEl);
            }
        }
    }

    //load session userdata function per class
    function loadSession(selector, target) {
        var storage = localStorage.getItem(selector);
        if (!storage) {
            alert("There is nothing to load");
        }
        else {
            var trimmedStorage = storage.split(',');
            if (totalStorageCountDes == 0) {
                for (var i = 0; i < trimmedStorage.length; i++) {
                    console.log(i);
                    totalStorageCountDes++;
                }
            }
            var cellsCountPosition = parseInt(trimmedStorage[totalStorageCountDes - 1]);

            console.log("Amount of cells " + cellsCountPosition);

            var subtract = totalStorageCountDes;
            subtract = subtract - 3; //Subtracting for the position

            if (target === saveVariableMinutes) {
                for (var i = 0, n = loadCountArray; i < cellsCountPosition / 3; i++) {
                    var tmp = parseInt(cellsCountPosition / 3) - 2;
                    if (i < tmp) {
                        addExercise(exerciseTimerCell);
                        console.log(tmp);
                    }
                    target[i].value = parseInt(trimmedStorage[i]);
                    //console.log(n);
                    loadCountArray++;
                }
                return;
            }

            if (target === saveVariableSeconds) {
                for (var i = 0, n = loadCountArray; i < cellsCountPosition / 3; i++, n++) {
                    target[i].value = parseInt(trimmedStorage[n]);
                    //console.log(target[i].value);
                }
                tmpArrayCount = loadCountArray;
                loadCountArray = 0;
                return;
            }

            if (target === saveVariableColor) {
                var tmp = tmpArrayCount * 3 - tmpArrayCount;
                for (var i = 0; i < cellsCountPosition / 3; i++) {
                    console.log(trimmedStorage[i + tmp]);
                    //console.log("Pass")
                    target[i].value = trimmedStorage[i + tmp];

                    //Refresh color
                    let colorCode = document.getElementsByClassName('color-coded')[i];
                    target[i].style.backgroundColor = colorCode.value;
                }
                return;
            }

            if (target === repeatExercise) {
                var tmp = parseInt(trimmedStorage.length) - 3;
                target.value = trimmedStorage[tmp];
            }

            if (target === savedCellsCount) {
                //var store1 = trimmedStorage.length + 2;
                //var position = trimmedStorage.length[totalStorageCountDes - 1];
                var number = parseInt(trimmedStorage[totalStorageCountDes - 2]);
                for (var i = 4; i < number; i++) {
                    globalCount++;
                    addStation(addCustomStation, globalCount, 'group' + globalCount, videoContainer3, videoContainer4);
                }
            }
            //To do
            if (target === fileInput) {
                var position = trimmedStorage.length;
                var tmpFiles = [];
                for (var i = position - globalCount - 3, n = 0; n < globalCount; i++, n++) {
                    tmpFiles.push(trimmedStorage[i]);
                }

                for (var j = 0; j < globalCount; j++) {
                    /*
                    fileInput[j] = tmpFiles[j];

                    const file = new File([fileInput[j]], 'filename.txt', { type: fileInput[j].type });
                    const formData = new FormData();
                    formData.append('fileInputName', file);

                    // Send with fetch or other AJAX method
                    fetch('/upload', {
                        method: 'POST',
                        body: formData,
                    }).then(response => response.json())
                        .then(data => console.log('File uploaded successfully:', data))
                        .catch(error => console.error('Error uploading file:', error));


                    console.log(file);
                    */
                }
            }
        }
    }

    //load session page data function

    //load video session log

    //Delete session function
    function deleteSession() {
        var removeSession = document.getElementById("load-session").value;
        console.log("Removing: " + removeSession);
        localStorage.removeItem(removeSession);
        alert("Removed!");
        location.reload();
        //clearUserData(variableDoc);
    }

    //Clear function for user data
    function clearUserData() {

    }

    //Clear page to default function




    function addExercise(container) {
        const exercise = document.createElement('div');
        exercise.classList.add('exercise');
        exercise.innerHTML = `            
            <input type="number" class="duration-minutes" placeholder="Minutes" onclick="this.select()">
            <input type="number" class="duration-seconds" placeholder="Seconds" onclick="this.select()">
            <select name="color-coded" class="color-coded">
                <option id="color-not-selected" value=" None " disabled selected> -Select colour- </option>
                <option id="color-green" value="green"> Go </option>
                <option id="color-red" value="red"> Rest </option>
                <option id="color-dodgerblue" value="dodgerblue"> Extra 1 </option>
                <option id="color-darkmagenta" value="darkmagenta"> Extra 2 </option>
                <option id="color-gold" value="gold"> Switch </option>
            </select>
            <button class="remove-cell">Remove</button>
        `;

        noneP.innerHTML = '';

        container.appendChild(exercise);

        //Counting for save feature
        addCellExerciseCount++;
        exerciseTotalCells++;
        console.log("Exercise cell count: " + addCellExerciseCount);

        exercise.querySelector('.remove-cell').addEventListener('click', () => {
            container.removeChild(exercise);
            addCellExerciseCount--;
            exerciseTotalCells--;
            console.log("Exercise cell count: " + addCellExerciseCount);
            updateTotalTime();
        });

        exercise.querySelectorAll('#exercise-timer .duration-minutes, .duration-seconds').forEach(input => {
            input.addEventListener('input', updateTotalTime);
        });

        document.querySelector('#duration-repeat').addEventListener('input', () => {
            updateTotalTime();
        });

        //Color coded
        document.querySelectorAll('.color-coded').forEach(change => {
            change.addEventListener('change', () => {
                for (var i = 0, len = selectColorCode.length; i < len; i++) {
                    let colorCode = document.getElementsByClassName('color-coded')[i];
                    colorCode.style.backgroundColor = colorCode.value;
                }
            }
            );
        });

        // Handle video upload ***commented out***
        /*
        const videoUploadInput = exercise.querySelector('.video-upload');
        videoUploadInput.addEventListener('change', (event) => {
            const videoFile = event.target.files[0];
            if (group === 'group1') {
                group1VideoFiles.push(videoFile);
            } else {
                group2VideoFiles.push(videoFile);
            }
        });
        */

    }

    //Add Station
    function addStation(container, count, group, workoutSlot1, workoutSlot2) {
        const createDiv = document.createElement('div');
        createDiv.classList.add('group');
        createDiv.innerHTML = `
            <h2>Station ${count}</h2>
            <div id="group-${count}-exercises">
            <!-- Group ${count} Exercises -->
            <input type="file" class="video-upload" accept="video/*">
            </div>
        `;
        container.appendChild(createDiv);

        //For workout page
        const createSlot = document.createElement('div');
        createSlot.innerHTML = `
        <div class="group" id="group${count}">
            <h3>${count}</h3>
            <video id="group-${count}-video" width="320" muted></video>
            <div id="group${count}-current-exercise">None</div>
        </div>
    `;
        stationContainerCount++;
        console.log("Station count: " + stationContainerCount);

        //For workout page
        if (count <= 6) {
            workoutSlot1.appendChild(createSlot);
        }

        else if (count <= 8 && count > 6) {
            workoutSlot2.append(createSlot);
        }

        //Test
        /*
        if (count > 4) {
            const videoUploadInput = createDiv.querySelector('.video-upload');
            videoUploadInput.addEventListener('change', (event) => {
                const videoFile = event.target.files[0];
                if (group === 'group5') {
                    group1VideoFiles.push(videoFile);
                }
                if (group === 'group6') {
                    group2VideoFiles.push(videoFile);
                }
                if (group === 'group7') {
                    group3VideoFiles.push(videoFile);
                }
                if (group === 'group8') {
                    group4VideoFiles.push(videoFile);
                }
            });
        }
        */

    }

    //Remove Station
    function removeStation(container) {
        container.innerHTML = '';
        videoContainer3.innerHTML = '';
        videoContainer4.innerHTML = '';
        stationContainerCount = 4;
        console.log("Station count: " + stationContainerCount);
    }

    //Update the timer

    function updateTotalTime() {
        let totalGroup1 = 0;
        let totalGroup2 = 0; //Leave it, might be useful for the future

        repeat = parseInt(repeatExercise.value) || 0;

        // Calculate total duration for all exercises
        document.querySelectorAll('#exercise-timer .exercise').forEach(exercise => {
            let minutes = parseInt(exercise.querySelector('.duration-minutes').value) || 0;
            let seconds = parseInt(exercise.querySelector('.duration-seconds').value) || 0;

            //let firstSeconds = parseInt(document.querySelector('#exercise-timer:first-child .duration-seconds').value || 0);
            //console.log(firstSeconds);

            totalGroup1 += minutes * 60 + seconds;
        });

        //Repeats
        totalGroup1 = repeat * totalGroup1;

        let warmupSeconds = parseInt(document.querySelector('#warmup-container .exercise .duration-seconds').value || 0);
        let warmupMinutes = parseInt(document.querySelector('#warmup-container .exercise .duration-minutes').value || 0);

        let coolSeconds = parseInt(document.querySelector('#cooldown-container .exercise .duration-seconds').value || 0);
        let coolMinutes = parseInt(document.querySelector('#cooldown-container .exercise .duration-minutes').value || 0);
        totalGroup1 = totalGroup1 + warmupMinutes * 60 + warmupSeconds;
        totalGroup1 = totalGroup1 + coolMinutes * 60 + coolSeconds;

        // Set the total time based on the longer group's duration
        totalDuration = Math.max(totalGroup1, totalGroup2);
        const totalMinutes = Math.floor(totalDuration / 60);
        const totalSeconds = totalDuration % 60;
        totalTimeDisplay.textContent = `${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}`;

        //Saving for timer
        groupTimer = totalDuration;
    }

    // Save session
    function saveSession() {
        const sessionName = document.getElementById('session-name').value;
        sessionData.group1 = extractExercises(exerciseTimerCell);
        sessionData.group1Single = extractExercises(warmupContainer);
        sessionData.group1Cool = extractExercises(coolContainer);


        sessionData.group2 = extractExercises(group2Exercises);
        sessionData.group3 = extractExercises(group3Exercises);
        sessionData.group4 = extractExercises(group4Exercises);
        sessionStorage.setItem('sessionName', sessionName);
        sessionStorage.setItem('sessionData', JSON.stringify(sessionData));
    }

    function extractExercises(container) {
        const exercises = [];
        container.querySelectorAll('.exercise').forEach(exercise => {
            //const name = exercise.querySelector('input[type="text"]').value;
            const minutes = parseInt(exercise.querySelector('.duration-minutes').value) || 0;
            const seconds = parseInt(exercise.querySelector('.duration-seconds').value) || 0;
            const color = exercise.querySelector('.color-coded').value;
            exercises.push({ minutes, seconds, color });
        });
        return exercises;
    }

    // Start Workout
    document.getElementById('start-workout').addEventListener('click', () => {
        saveSession();
        customizePage.style.display = 'none';
        workoutPage.style.display = 'block';
        sessionData = JSON.parse(sessionStorage.getItem('sessionData'));
        currentExercise = 0;
        timeSlider.max = totalDuration;
        timeSlider.value = 0;
        startTimer();
        startSessionTimer(groupTimer);
        fillTimeBar(sessionData.group1Single, sessionData.group1, sessionData.group1Cool, groupTimer);
        beep.play();
        longBeep.play();
        longBeep.pause();
        tmpRepeat = repeat;
        playNextExercise();

        //Check 4 stations video
        document.querySelectorAll('.session-container .video-upload').forEach(event => {
            const videoFile = event.files[0];
            group1VideoFiles.push(videoFile)
        });

        document.querySelectorAll('.extra-station-container .video-upload').forEach(event => {
            const videoFile = event.files[0];
            group2VideoFiles.push(videoFile)
        });

        playVideo(group1Video, group1VideoFiles[0]);
        if (group1VideoFiles[0]) {
            currentExDisplay1.textContent = group1VideoFiles[0].name.split(".")[0];
        }

        playVideo(group2Video, group1VideoFiles[1]);
        if (group1VideoFiles[1]) {
            currentExDisplay2.textContent = group1VideoFiles[1].name.split(".")[0];
        }

        playVideo(group3Video, group1VideoFiles[2]);
        if (group1VideoFiles[2]) {
            currentExDisplay3.textContent = group1VideoFiles[2].name.split(".")[0];
        }


        playVideo(group4Video, group1VideoFiles[3]);
        if (group1VideoFiles[3]) {
            currentExDisplay4.textContent = group1VideoFiles[3].name.split(".")[0];
        }


        //Done
        group5Play = document.getElementById('group-5-video');
        group6Play = document.getElementById('group-6-video');
        group7Play = document.getElementById('group-7-video');
        group8Play = document.getElementById('group-8-video');

        //5-8 Video
        currentExDisplay5 = document.getElementById('group5-current-exercise');
        currentExDisplay6 = document.getElementById('group6-current-exercise');
        currentExDisplay7 = document.getElementById('group7-current-exercise');
        currentExDisplay8 = document.getElementById('group8-current-exercise');

        if (globalCount > 4 && globalCount <= 6) {
            //Do something after 4 stations
            if (globalCount === 5) {
                playVideo(group5Play, group2VideoFiles[0]);
                if (group2VideoFiles[0]) {
                    currentExDisplay5.textContent = group2VideoFiles[0].name.split(".")[0];
                }

            }

            if (globalCount === 6) {
                playVideo(group5Play, group2VideoFiles[0]);
                if (group2VideoFiles[0]) {
                    currentExDisplay5.textContent = group2VideoFiles[0].name.split(".")[0];
                }

                playVideo(group6Play, group2VideoFiles[1]);
                if (group2VideoFiles[1]) {
                    currentExDisplay6.textContent = group2VideoFiles[1].name.split(".")[0];
                }

            }
        }

        //7-8
        if (globalCount >= 7) {
            //Do something after 4 stations
            if (globalCount === 7) {
                playVideo(group5Play, group2VideoFiles[0]);
                if (group2VideoFiles[0]) {
                    currentExDisplay5.textContent = group2VideoFiles[0].name.split(".")[0];
                }

                playVideo(group6Play, group2VideoFiles[1]);
                if (group2VideoFiles[1]) {
                    currentExDisplay6.textContent = group2VideoFiles[1].name.split(".")[0];
                }

                playVideo(group7Play, group2VideoFiles[2]);
                if (group2VideoFiles[2]) {
                    currentExDisplay7.textContent = group2VideoFiles[2].name.split(".")[0];
                }

            }

            if (globalCount === 8) {
                playVideo(group5Play, group2VideoFiles[0]);
                if (group2VideoFiles[0]) {
                    currentExDisplay5.textContent = group2VideoFiles[0].name.split(".")[0];
                }

                playVideo(group6Play, group2VideoFiles[1]);
                if (group2VideoFiles[1]) {
                    currentExDisplay6.textContent = group2VideoFiles[1].name.split(".")[0];
                }

                playVideo(group7Play, group2VideoFiles[2]);
                if (group2VideoFiles[2]) {
                    currentExDisplay7.textContent = group2VideoFiles[2].name.split(".")[0];
                }

                playVideo(group8Play, group2VideoFiles[3]);
                if (group2VideoFiles[3]) {
                    currentExDisplay8.textContent = group2VideoFiles[3].name.split(".")[0];
                }

            }
        }

    });

    // **Done**
    function playNextExercise() {
        if (repeatFirstCellCount != 1) {
            if (currentExercise < sessionData.group1.length || currentExercise < sessionData.group2.length) {
                if (sessionData.group1[currentExercise]) {
                    //playVideo(group1Video, group1VideoFiles[currentExercise]);
                    startWorkoutTimer(group1CountTimer, sessionData.group1[currentExercise]);
                }
            } else if (repeat > 1) {
                repeatWorkout(repeat);
            }
            else {
                endCooldown(group1CountTimer, sessionData.group1Cool[current]);
            }
        }
        else {
            startWarmup(group1CountTimer, sessionData.group1Single[current]);
        }

    }

    //Play video back up
    /*
    function playVideo(exercise, videoElement, videoFile) {
        const videoUrl = URL.createObjectURL(videoFile);
        videoElement.src = videoUrl;
        videoElement.play();
        videoElement.loop = true;
        const duration = (exercise.minutes * 60 + exercise.seconds) * 1000;
        const interval = setTimeout(() => {
            stopAllVideos();
            currentExercise++;
            playNextExercise();
        }, duration);
    
        if (videoElement.id === 'group-1-video') {
            group1Interval = interval;
    
        } else {
            group2Interval = interval;
        }
    }
    */

    //Play video
    function playVideo(videoElement, videoFile) {
        if (videoFile) {
            const videoUrl = URL.createObjectURL(videoFile);
            videoElement.src = videoUrl;
            videoElement.play();
            videoElement.loop = true;
        }
        else {
            //nothing
        }

    }

    //Current exercise name function
    function currentExerciseName(group) {
        let nextName = '';
        if (group) nextName += ` ${group.name} `;
        return nextName;
    }

    function stopAllVideos() {
        clearTimeout(group1Interval);
        clearTimeout(group2Interval);
        group1Video.pause();
        group2Video.pause();
        group1Video.src = '';
        group2Video.src = '';
        currentExDisplay1.innerHTML = 'None';
        currentExDisplay2.innerHTML = 'None';

        //3-4
        group3Video.pause();
        group4Video.pause();
        group3Video.src = '';
        group4Video.src = '';
        currentExDisplay3.innerHTML = 'None';
        currentExDisplay4.innerHTML = 'None';


        //5-6
        group5Play = document.getElementById('group-5-video');
        group6Play = document.getElementById('group-6-video');
        currentExDisplay5 = document.getElementById('group5-current-exercise');
        currentExDisplay6 = document.getElementById('group6-current-exercise');
        if (globalCount === 5) {
            group5Play.pause();
            group5Play.src = '';
            currentExDisplay5.innerHTML = 'None';
        }

        if (globalCount === 6) {
            group5Play.pause();
            group5Play.src = '';
            currentExDisplay5.innerHTML = 'None';
            group6Play.pause();
            group6Play.src = '';
            currentExDisplay6.innerHTML = 'None';
        }

        group7Play = document.getElementById('group-7-video');
        group8Play = document.getElementById('group-8-video');
        currentExDisplay7 = document.getElementById('group7-current-exercise');
        currentExDisplay8 = document.getElementById('group8-current-exercise');

        //7-8
        if (globalCount === 7) {
            group5Play.pause();
            group5Play.src = '';
            currentExDisplay5.innerHTML = 'None';
            group6Play.pause();
            group6Play.src = '';
            currentExDisplay6.innerHTML = 'None';
            group7Play.pause();
            group7Play.src = '';
            currentExDisplay7.innerHTML = 'None';
        }

        if (globalCount === 8) {
            group5Play.pause();
            group5Play.src = '';
            currentExDisplay5.innerHTML = 'None';
            group6Play.pause();
            group6Play.src = '';
            currentExDisplay6.innerHTML = 'None';
            group7Play.pause();
            group7Play.src = '';
            currentExDisplay7.innerHTML = 'None';
            group8Play.pause();
            group8Play.src = '';
            currentExDisplay8.innerHTML = 'None';
        }
    }

    // Pause/Play
    playPauseButton.addEventListener('click', togglePlayPause);
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            togglePlayPause();
        }
    });

    function togglePlayPause() {
        if (isPaused) {
            if (group1Video.src) {
                group1Video.play();
            }

            if (group2Video.src) {
                group2Video.play();
            }

            if (group3Video.src) {
                group3Video.play();
            }

            if (group4Video.src) {
                group4Video.play();
            }
            //5-6
            group5Play = document.getElementById('group-5-video');
            group6Play = document.getElementById('group-6-video');
            if (globalCount === 5) {
                group5Play.play();
            }

            if (globalCount === 6) {
                group5Play.play();
                group6Play.play();
            }

            group7Play = document.getElementById('group-7-video');
            group8Play = document.getElementById('group-8-video');

            //7-8
            if (globalCount === 7) {
                group5Play.play();
                group6Play.play();
                group7Play.play();
            }

            if (globalCount === 8) {
                group5Play.play();
                group6Play.play();
                group7Play.play();
                group8Play.play();
            }

            isPaused = false;
            playPauseButton.textContent = 'Pause';
        } else {
            group1Video.pause();
            group2Video.pause();
            group3Video.pause();
            group4Video.pause();

            //5-6
            group5Play = document.getElementById('group-5-video');
            group6Play = document.getElementById('group-6-video');
            if (globalCount === 5) {
                group5Play.pause();
            }

            if (globalCount === 6) {
                group5Play.pause();
                group6Play.pause();
            }

            group7Play = document.getElementById('group-7-video');
            group8Play = document.getElementById('group-8-video');

            //7-8
            if (globalCount === 7) {
                group5Play.pause();
                group6Play.pause();
                group7Play.pause();
            }

            if (globalCount === 8) {
                group5Play.pause();
                group6Play.pause();
                group7Play.pause();
                group8Play.pause();
            }
            isPaused = true;
            playPauseButton.textContent = 'Play';
        }
    }

    //Group session timer DONE!!!
    function startSessionTimer(duration) {
        let timer = duration, minutes, seconds;
        let tmpTimer = timer;
        let count = 0;
        let counting = 0;
        let timerDivide = 0;
        let pixelOnePercent = 0;



        const permTimer = timer;

        let paddingInc = 0;
        let maxPixel = 345;

        arrow.innerHTML = '';
        //Just in case if i need it again ->  <img id="arrow-img" src="arrowdown.png">


        interval = setInterval(function () {

            //Add seek bar COPY FOR OTHER FUNCTIONS and pause function to work with
            timeSlider.addEventListener("click", (e) => {

                currentTime = parseInt(e.target.value, 10);
                timer = updateTimerDisplay(totalDuration);
                tmpTimer = updateTimerDisplay(totalDuration);

                let rect = timeSlider.getBoundingClientRect();
                let clickX = e.clientX - rect.left; // Click position relative to seek bar
                let seekBarWidth = rect.width;

                let clickedTime = (clickX / seekBarWidth) * totalDuration; // Convert to time
                stopTimerFunction = true;

                jumpToExercise(clickedTime);

                if(isPaused == true){
                    currentExercise++;
                }

                //isPaused == false;
                //playPauseButton.textContent = 'Pause';

                timeSlider.value = currentTime;


            });

            tmpTimer = userPaused(tmpTimer, timer, count, interval);

            timer = tmpTimer;

            console.log("Timer original: ", timer);

            pixelOnePercent = maxPixel / 1000;

            timerDivide = permTimer / 1000;

            counting = pixelOnePercent / timerDivide;

            counting = arrowPaused(counting);

            paddingInc += counting;
            //Timer

            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            sessionTimer.textContent = `${minutes}:${seconds}`;
            arrow.style.paddingLeft = paddingInc + 'px';

            document.getElementById('return-home').addEventListener('click', () => {
                clearInterval(interval);
                timer = 0;
                currentTime = 0;
            });

            if (--timer <= 0) {
                var delayInMilliseconds = 1001;

                setTimeout(function () {
                    clearInterval(interval);
                    sessionTimer.textContent = "Session Completed!";
                    group1CountTimer.textContent = " 🏁 COMPLETE 🏁 ";
                    arrow.textContent = " 🏁 ";
                    group1CountTimer.style.backgroundColor = "gold";
                }, delayInMilliseconds);
            }
        }, 1000);
    }

    //Single timer
    function startWorkoutTimer(groupText, group) {
        let totalGroup = 0;
        const Vminutes = parseInt(group.minutes) || 0;
        const Vseconds = parseInt(group.seconds) || 0;
        totalGroup += Vminutes * 60 + Vseconds;

        let timer = totalGroup, minutes, seconds;
        let tmpTimer = timer;
        let count = 0;
        workoutTimer = setInterval(function () {

            if (stopTimerFunction == true) {
                clearInterval(workoutTimer);
                timer = 0;
                stopTimerFunction = false;
            }
            //pause event listener
            tmpTimer = userPaused(tmpTimer, timer, count, workoutTimer);

            timer = tmpTimer;

            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            groupText.textContent = `${minutes}:${seconds}`;

            //Color change
            const Vcolor = group.color;
            document.getElementById('group1-timer').style.backgroundColor = Vcolor;


            document.getElementById('return-home').addEventListener('click', () => {
                document.getElementById('group1-timer').style.backgroundColor = "gold";
                clearInterval(workoutTimer);
                timer = 0;
                currentTime = 0;
                groupText.textContent = `00:00`;
                beep.pause();
                longBeep.pause();
                console.log("Left workout page");
            });

            if (timer === 3) {
                longBeep.play();
            }

            if (--timer <= 0) {
                clearInterval(workoutTimer);
                currentExercise++;
                playNextExercise();
            }
        }, 1000);
    }

    //Repeat function
    function repeatWorkout(repeatedVarWorkout) {
        if (repeatedVarWorkout != 0) {
            repeat--;
            currentExercise = 0;
            playNextExercise();
        }
        else {

        }
    }

    //Warmup timer function
    function startWarmup(groupText, group) {
        groupText.textContent = `00:00`;
        let totalGroup = 0;
        const Vminutes = parseInt(group.minutes) || 0;
        const Vseconds = parseInt(group.seconds) || 0;
        totalGroup += Vminutes * 60 + Vseconds;
        stopWarmUpFunction = false;
        if (Vseconds > 0 || Vminutes > 0) {

            let timer = totalGroup, minutes, seconds;
            let tmpTimer = timer;
            let count = 0;



            warmupTimer = setInterval(function () {
                tmpTimer = userPaused(tmpTimer, timer, count, warmupTimer);

                timer = tmpTimer;

                minutes = parseInt(timer / 60, 10);
                seconds = parseInt(timer % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                groupText.textContent = `${minutes}:${seconds}`;

                //Color change
                const Vcolor = group.color;
                document.getElementById('group1-timer').style.backgroundColor = Vcolor;


                document.getElementById('return-home').addEventListener('click', () => {
                    clearInterval(warmupTimer);
                    timer = 0;
                    currentTime = 0;
                    groupText.textContent = `00:00`;
                    beep.pause();
                    longBeep.pause();
                    console.log("Left workout page");
                });

                if (timer === 3) {
                    longBeep.play();
                }

                if (stopWarmUpFunction == true) {
                    clearInterval(warmupTimer);
                    timer = 0;
                    stopWarmUpFunction = false;
                    //playNextExercise();
                }

                if (--timer <= 0) {
                    clearInterval(warmupTimer);
                    repeatFirstCellCount = 0;
                    playNextExercise();
                }


            }, 1000);
        }
        else if (Vseconds === 0 && Vminutes === 0) {
            repeatFirstCellCount = 0;
            playNextExercise();
        }
    }

    //Cooldown timer funtion
    function endCooldown(groupText, group) {
        let totalGroup = 0;
        const Vminutes = parseInt(group.minutes) || 0;
        const Vseconds = parseInt(group.seconds) || 0;
        totalGroup += Vminutes * 60 + Vseconds;

        if (Vseconds > 0 || Vminutes > 0) {

            let timer = totalGroup, minutes, seconds;
            let tmpTimer = timer;
            let count = 0;
            cooldownTimer = setInterval(function () {

                tmpTimer = userPaused(tmpTimer, timer, count, interval);
                timer = tmpTimer;

                minutes = parseInt(timer / 60, 10);
                seconds = parseInt(timer % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                groupText.textContent = `${minutes}:${seconds}`;

                //Color change
                const Vcolor = group.color;
                document.getElementById('group1-timer').style.backgroundColor = Vcolor;


                document.getElementById('return-home').addEventListener('click', () => {
                    clearInterval(cooldownTimer);
                    beep.pause();
                    longBeep.pause();
                    console.log("Left workout page");
                });

                if (timer === 3) {
                    longBeep.play();
                }

                if (--timer <= 0) {
                    var delayInMilliseconds = 1000;

                    setTimeout(function () {
                        clearInterval(cooldownTimer);
                        stopAllVideos();
                        beep.play();
                    }, delayInMilliseconds);
                }

            }, 1000);
        }
        else if (Vseconds === 0 && Vminutes === 0) {
            console.log(Vseconds);
        }
    }

    function userPaused(tmp, duration, count, interval) {
        if (isPaused == true) {
            console.log("Paused");
            longBeep.pause();
            duration = tmp - count;
            return duration;
        }

        else if (isPaused == false) {
            console.log("Unpause");
            return duration;
        }
    }

    function arrowPaused(counting) {
        let zero = 0;
        if (isPaused == true) {
            console.log("Arrow Paused");
            return zero; //Done do not change!!!
        }

        else if (isPaused == false) {
            console.log("Unpause");
            return counting;
        }
    }

    function arrowTimer(duration) {
        let timer = duration, minutes, seconds;
        let tmpTimer = timer;
        let paddingInc = 0;
        let counting = 0;
        let maxPixel = 345;

        arrow.style.paddingLeft = '0px'
        //arrow.textContent = '🡇';

        interval = setInterval(function () {
            tmpTimer = userPaused(tmpTimer, timer, paddingInc, interval);

            timer = tmpTimer;

            paddingInc = maxPixel / timer;

            paddingInc = paddingInc * 60;

            arrow.style.paddingLeft = paddingInc + 'px';

            if (--timer <= 0) {
                clearInterval(interval);
                setTimeout(function () {
                    arrow.textContent = " 🏁 ";
                });
            }

            document.getElementById('return-home').addEventListener('click', () => {
                timer = 0;
                currentTime = 0;
                clearInterval(interval);
            });


        }, 1000);
    }
    //Fill time bar with div colored backgrounds
    //To do
    function fillTimeBar(dataWarm, dataSingles, dataCool, duration) {
        let warmUp = dataWarm;
        let mainRepeats = dataSingles;
        let cool = dataCool;

        for (let i = 0; i < warmUp.length; i++) {
            let tmp = warmUp[i].color;
            let timer = duration;
            let maxPixel = 345;

            let minutes = parseFloat(warmUp[i].minutes) || 0;
            let seconds = parseFloat(warmUp[i].seconds) || 0;

            let repeated = 1;
            let combined = (parseFloat(minutes * 60) + parseFloat(seconds)) * repeated;

            let pixelOnePercent = maxPixel / 1000;
            let timerDivide = timer / 1000;
            let counting = pixelOnePercent / timerDivide;

            let paddingInc = (combined * counting) / exerciseTotalCells;

            let percentageTime = paddingInc / maxPixel;

            let total = percentageTime * ((exerciseTotalCells) * repeat);

            percentageTime = total;


            const createDiv = document.createElement('div');
            createDiv.id = `${tmp}-bar`;


            createDiv.style.flex = paddingInc + ' ' + '1' + ' ' + '0' + 'px';
            createDiv.style.borderLeft = `solid ${tmp} ${paddingInc}px`;
            createDiv.style.borderRight = `solid ${tmp} ${paddingInc}px`;
            createDiv.style.background = tmp;
            createDiv.style.height = '100%';
            timeBar.appendChild(createDiv);

        }

        for (let j = 0; j < repeat; j++) {
            for (let i = 0; i < mainRepeats.length; i++) {
                let tmp = mainRepeats[i].color;
                let timer = duration;
                let maxPixel = 345;

                let minutes = parseFloat(mainRepeats[i].minutes || 0);
                let seconds = parseFloat(mainRepeats[i].seconds || 0);

                let counting = 0;
                let timerDivide = 0;
                let pixelOnePercent = 0;

                const permTimer = timer;

                pixelOnePercent = maxPixel / 1000;

                timerDivide = permTimer / 1000;

                counting = pixelOnePercent / timerDivide;

                console.log('Filling Minutes Divs: ', minutes);
                console.log('Filling Seconds Divs: ', seconds);

                let repeated = 1;
                let combined = (parseFloat(minutes * 60) + parseFloat(seconds)) * repeated;

                let paddingInc = (combined * counting) / exerciseTotalCells;

                let percentageTime = paddingInc / maxPixel;

                let total = percentageTime * ((exerciseTotalCells + 2) * repeat);

                percentageTime = total;

                console.log("Repeat padding: " + paddingInc);

                const createDiv = document.createElement('div');
                createDiv.id = `${tmp}-bar`;

                createDiv.style.flex = paddingInc + ' ' + '1' + ' ' + '0' + 'px';
                createDiv.style.borderLeft = `solid ${tmp} ${paddingInc}px`;
                createDiv.style.borderRight = `solid ${tmp} ${paddingInc}px`;
                createDiv.style.background = tmp;
                createDiv.style.height = '100%';
                timeBar.appendChild(createDiv);

            }
        }

        for (let i = 0; i < cool.length; i++) {
            let tmp = cool[i].color;
            let timer = duration;
            let maxPixel = 345;

            let minutes = parseFloat(cool[i].minutes) || 0;
            let seconds = parseFloat(cool[i].seconds) || 0;

            let repeated = 1;

            let combined = (parseFloat(minutes * 60) + parseFloat(seconds)) * repeated;

            let pixelOnePercent = maxPixel / 1000;
            let timerDivide = timer / 1000;
            let counting = pixelOnePercent / timerDivide;

            let paddingInc = (combined * counting) / exerciseTotalCells;
            let percentageTime = paddingInc / maxPixel;

            let total = percentageTime * ((exerciseTotalCells) * repeat);

            percentageTime = total;


            const createDiv = document.createElement('div');
            createDiv.id = `${tmp}-bar`;


            createDiv.style.flex = paddingInc + ' ' + '1' + ' ' + '0' + 'px';
            createDiv.style.borderLeft = `solid ${tmp} ${paddingInc}px`;
            createDiv.style.borderRight = `solid ${tmp} ${paddingInc}px`;
            createDiv.style.background = tmp;
            createDiv.style.height = '100%';
            timeBar.appendChild(createDiv);
        }

    }

    //Slider

    function startTimer() {
        exited = false;
        currentTime = 0;
        let interval = 0;
        let tmp = totalDuration;
        console.log(" Total Duration: ", totalDuration);
        interval = setInterval(() => {
            if (currentTime < tmp && isPaused == false) {
                currentTime++;
                timeSlider.value = currentTime;
                console.log(" Adding more: ", currentTime);
            } if (currentTime < tmp && isPaused == true) {
                timeSlider.value = currentTime + 0;
            }
            if (exited == true) {
                timeSlider.value = 0;
                clearInterval(interval);
            }

        }, 1000);
    }

    function pauseTimer() {
        clearInterval(interval);
    }

    function updateTimerDisplay(timer) {
        console.log("Current Time:", currentTime); // Replace with UI update logic
        //To do: slider
        timer -= currentTime;
        console.log("Seek: ", timer);
        return timer;
    }

    function jumpToExercise(clickedTime) {
        let warmUpTime = (sessionData.group1Single[current].minutes * 60) + sessionData.group1Single[current].seconds;
        let coolDownTime = (sessionData.group1Cool[current].minutes * 60) + sessionData.group1Cool[current].seconds;
        let mainWorkoutTime = totalDuration - (warmUpTime + coolDownTime);

        let sessionDataTemp = sessionData.group1.length; // Total exercises in a full cycle
        let cycleDuration = mainWorkoutTime / tmpRepeat;
        let currentCycle = Math.floor(clickedTime / cycleDuration); // Find which repeat cycle was clicked

        let timeInCycle = clickedTime % cycleDuration; // Time within that specific cycle
        let accumulatedTime = 0;
        let matchedIndex = 0;
        let newRepeat = 1;
        let section = "main"; // Tracks which section we're in


        //Check if user clicked within Warm-Up
        if (clickedTime <= warmUpTime) {
            repeatFirstCellCount = 1;
            stopCoolFunction = true;
            stopTimerFunction = true;
            section = "warmup";
            currentExercise = 0;
            newRepeat = tmpRepeat;
            console.log("Playing:  warmup");
            setTimeout(() => {
                clearInterval(warmupTimer);
                clearInterval(workoutTimer);
                clearInterval(cooldownTimer);
                startWarmup(group1CountTimer, sessionData.group1Single[current]);
                return;
            }, 1000);
            return;
        }
        //Check if user clicked within Cooldown
        else if (clickedTime >= (warmUpTime + mainWorkoutTime)) {
            stopCoolFunction = false;
            stopWarmUpFunction = true;
            stopTimerFunction = true;
            //currentExercise = 0;
            repeatFirstCellCount = 0;
            section = "cooldown";
            repeat = 1;
            console.log("Playing:  cooldown");
            setTimeout(() => {
                clearInterval(warmupTimer);
                clearInterval(workoutTimer);
                clearInterval(cooldownTimer);
                endCooldown(group1CountTimer, sessionData.group1Cool[current]);
                return;
            }, 1000);
            return;
        }

        // Find the exact exercise within the cycle
        else if (clickedTime >= warmUpTime && clickedTime <= (warmUpTime + mainWorkoutTime)) {
            stopWarmUpFunction = true;
            insideDivs = true;
            repeatFirstCellCount = 0;
            stopCoolFunction = true;
            let timeInMain = clickedTime - (warmUpTime);
            let currentCycle = Math.floor(timeInMain / cycleDuration);
            let timeInCycle = timeInMain % cycleDuration;

            accumulatedTime = 0;

            for (let i = 0; i < sessionData.group1.length; i++) {
                let exerciseDuration = (sessionData.group1[i].minutes * 60) + sessionData.group1[i].seconds;

                if (timeInCycle < accumulatedTime + (exerciseDuration / 2)) {
                    matchedIndex = i;
                    break;
                }

                accumulatedTime += exerciseDuration;
            }

            newRepeat = Math.max(tmpRepeat - currentCycle, 1);
            currentExercise = matchedIndex;
        }


        //accumulatedTime += warmUpTime;
        //accumulatedTime += coolDownTime;


        // **Ensure we don't skip on the first exercise of a repeat cycle**
        if (matchedIndex === 0 && timeInCycle < accumulatedTime) {
            matchedIndex = -1; // Prevents jumping to the next exercise too soon
            newRepeat = Math.max(newRepeat - 1, 1);
        } else {
            matchedIndex = Math.max(matchedIndex - 1, -1); // Standard correction
        }
        // Adjust repeat count correctly when in the last cycle
        repeat = newRepeat;

        currentExercise = matchedIndex;

        console.log("Playing:  singles : ", currentExercise);

        console.log("Jumping to exercise index:", matchedIndex, "Remaining repeats: ", repeat);

        setTimeout(() => {
            clearInterval(warmupTimer);
            clearInterval(workoutTimer);
            clearInterval(cooldownTimer);
            playNextExercise();
            return;
        }, 1000);
        return;

    }








    // Return to Home
    document.getElementById('return-home').addEventListener('click', () => {
        stopAllVideos();
        currentExercise = 0;
        totalDuration = 0;
        groupTimer = 0;
        repeat = 1;
        repeatFirstCellCount = 1;
        endRepeat = 1;
        currentTime = 0;
        beep.pause();
        longBeep.pause();
        group1VideoFiles = [];
        group2VideoFiles = [];
        groupTimer = 0;
        exited = true;
        updateTotalTime();
        //When clicked home video set to default play
        isPaused = false;
        timeSlider.value = 0;
        playPauseButton.textContent = 'Pause';
        //
        workoutPage.style.display = 'none';
        customizePage.style.display = 'block';
        arrow.style.paddingLeft = '0px'
        arrow.innerHTML = '<img id="arrow-img" src="arrowdown.png">';
        timeBar.innerHTML = '';
        console.log("Left Workout Page");
    });
});


