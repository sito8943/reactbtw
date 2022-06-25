const SECOND_IN_MS = 1000;
const UPDATE_INTERVAL = SECOND_IN_MS / 60; // Update 60 times per second (60 FPS)
const SKILL_CLASS = 'skill';
const DISABLED_CLASS = 'disabled';
const skills = [0,0,0,0,0]
const cooldowns = [5,1,2,4,6]

// Cooldowns per skill in milliseconds
const COOLDOWN_MAP = new Map([
  ['run', 1000],
  ['jump', 2000],
  ['crawl', 3000],
  ['slide', 4000],
  ['tumble', 5000],
]);

// Get skills table from the DOM
const skillsTable = document.querySelector('.skills-table');
const passButton = document.getElementById("pass");

// Activate clicked skill by timer
/*const activateSkill = (event) => {
  const {target} = event;
  
  // Exit if we click on anything that isn't a skill
  if(!target.classList.contains(SKILL_CLASS)) return;
  
  target.classList.add(DISABLED_CLASS);
  target.style = '--time-left: 100%';
  
  // Get cooldown time
  const skill = target.dataset.skill;
  let time = COOLDOWN_MAP.get(skill) - UPDATE_INTERVAL;
  
  // Update remaining cooldown
  const intervalID = setInterval(() => {
    // Pass remaining time in percentage to CSS
    const passedTime = time / COOLDOWN_MAP.get(skill) * 100;
    target.style = `--time-left: ${passedTime}%`;
    
    // Display time left
    target.textContent = (time / SECOND_IN_MS).toFixed(2);
    time -= UPDATE_INTERVAL;
    
    // Stop timer when there is no time left
    if(time < 0) {
      target.textContent = '';
      target.style = '';
      target.classList.remove(DISABLED_CLASS);
      
      clearInterval(intervalID);
    }
  }, UPDATE_INTERVAL);
}*/

// Activate clicked skill by turn
const activateSkill = (e) => {
  const {target} = e;
  const {id} = e.target;
  const parsedId = Number(id.substring(5))
  
  // Exit if we click on anything that isn't a skill
  if(!target.classList.contains(SKILL_CLASS)) return;
  
  target.classList.add(DISABLED_CLASS);
  target.style = '--time-left: 100%';

  skills[parsedId] = cooldowns[parsedId]
  turn(1, parsedId)
}

const turn = (count, used) => {
  skills.forEach((item,i) => {
    if (i !== used && skills[i] > 0) {
      const current = document.getElementById(`skill${i}`)
      // Pass remaining time in percentage to CSS
      let passedTime = (skills[i] - count); // get missing part
      passedTime = passedTime * 100 / cooldowns[i]; // to percentage
      current.style = `--time-left: ${passedTime}%`;
  
      // update global time
      skills[i] -= count
      
      // Stop timer when there is no time left
      if(skills[i] - count < 0) {
        // current.textContent = '';
        current.style = '';
        current.classList.remove(DISABLED_CLASS);
      }
    }
  })
}

// Add click handler to the table
skillsTable.addEventListener('click', activateSkill, false);
passButton.onclick = (e) => {
  turn(1)
}