console.log("the custom script is running");
// Initialize Firebase
const config = {
    apiKey: "",
    authDomain: "self-discipline-tracker.firebaseapp.com",
    databaseURL: "https://self-discipline-tracker.firebaseio.com",
    projectId: "self-discipline-tracker",
    storageBucket: "self-discipline-tracker.appspot.com",
    messagingSenderId: ""
};
firebase.initializeApp(config);

const click_count = document.getElementById('click_count');
const dbRefrence = firebase.database().ref().child('count');
var currentCount;
var newCount;

dbRefrence.on('value', snap => {
    click_count.innerHTML = snap.val();
    currentCount = snap.val();
});

function addClicks() {
    // add one to clicks
    newCount = (currentCount + 1);
    updateDatabase();
}

function subtractClicks() {
    // minus one from clicks
    if ((currentCount - 1) > 0){
        newCount = (currentCount - 1);
    }
    else {
        // can't go below zero
        newCount = 0;
    }
    updateDatabase();
}

function resetClicks() {
    newCount = 0;
    updateDatabase();
}

function updateDatabase() {
   return firebase.database().ref().update({ count: newCount });
};

document.getElementById("add_button").addEventListener("click", addClicks);
document.getElementById("subtract_button").addEventListener("click", subtractClicks);
document.getElementById("reset_button").addEventListener("click", resetClicks);