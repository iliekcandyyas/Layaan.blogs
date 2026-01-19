const PASSWORD = "il0vevaresa"; 
let clickCount = 0;

const title = document.getElementById("secretTitle");
const adminPanel = document.getElementById("adminPanel");

title.addEventListener("click", () => {
  clickCount++;

  if (clickCount === 5) {
    const input = prompt("HAI LAYAAN! or maybe it isnt Layaan.. prove with the password!");
    if (input === PASSWORD) {
      adminPanel.style.display = "block";
      adminPanel.classList.add("show");
      playSound("pop");
      alert("HAI LAYAAN!! 💗");
    } else {
      alert("Wrong password 😭");
      playSound("fahh")
    }
    clickCount = 0; // reset
  }
});
const sounds = {
  pop: new Audio("pop.mp3"),
  fahh: new Audio("fahh.mp3")
};

function playSound(name) {
  if (sounds[name]) {
    sounds[name].currentTime = 0;
    sounds[name].play();
  }
}


