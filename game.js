const textElement = document.getElementById('text');
const optionButtonsEl = document.getElementById('option-buttons');

let state = {}

function gameStart(){
state = {};
showTextNode(1);
};

function showTextNode(textNodeIndex){
const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
textElement.innerText = textNode.text;
while(optionButtonsEl.firstChild){
  optionButtonsEl.removeChild(optionButtonsEl.firstChild)

};
textNode.options.forEach(option => {
  if (showOption(option)) {
   const button = document.createElement('button')
   button.innerText = option.text;
   button.classList.add('btn');
   button.addEventListener('click', () => optionSelected(option));
   optionButtonsEl.appendChild(button);

  }
})
}

function showOption(option) {
return option.RequiredState == null || option.RequiredState(state) ;
};

function optionSelected(option){
const nextTextNodeId = option.nextText;
if (nextTextNodeId <= 0){
  return gameStart()
};
state = Object.assign(state, option.setState);
showTextNode(nextTextNodeId);
};

const textNodes = [
{
  id: 1,
  text: "You've woken up in a cold, dark and unfamiliar place; luckily there's something besides you and it looks like a katana, what do you do?",
  options: [
    {
      text: "take the katana and find your way out.",
      setState: { armed: true },
      nextText:2,
    },
    {
      text: "you don't like weapons, find your way out without it.",
      nextText:2,
    }
  ]
},
{
  id: 2,
  text: "Found your way out, you realize you are in a forest and that you were sleeping in a crypt; who put you there, and why? With no memories of your past life, you gaze at the path upon you.",
  options: [
    {
      text: "venture forward into the uknown.",
      nextText:4,
    },
    {
      text: "you are not willing to carry this burden, you kill yourself.",
      nextText:3,
    }
  ]
},
{
  id:3,
  text: "Well this harsh life isn't for everybody, may you find something better elsewhere, good boy.",
  options: [
    {
      text: "restart the adventure.",
      nextText:-1,
    }
  ]
},
{
  id:4,
  text: "It truly is a beautiful day, it's sunny and the brids are chirping but.. all of the sudden a man comes out of the bushes and while pointing his dagger at you, he says: everything you got or your life, mister. ",
  options: [
    {
      text:"not keen to violence, you put your katana on the ground and try to reason with him.",
      requiredState: (currentState) => currentState.armed,
      nextText:5,
    },
    {
      text:"you instinctively step forward and with a quick movement slash at his throat.",
      requiredState: (currentState) => currentState.armed,
      nextText:6,
    },
    {
      text:"you beg the bandit for mercy.",
      nextText:5,
    }
  ]
},
{
  id:5,
  text: "You must be really dumb to think this would have gone well, the bandit robs you of everything and sells you to the slave traders.",
  options: [
    {
      text: "restart the adventure.",
      nextText:-1,

    }
  ]
},
{
  id:6,
  text: "It appears you are a master at the art of war, drenched in blood you keep on journeying until.. you hear noises ahead and you see a small town.",
  options: [
    {
      text: "finally! Regardless of your current state, you decide to enter the town.",
      nextText:8,
    },
    {
      text: "entering anywhere with all this blood on yourself might not be wise move, so you decide to look around for a river.",
      nextText:7,
    },
    {
      text: "you wipe some blood off of you by using some leaves, and you enter the town.",
      nextText:9,
    }
  ]
}


];


gameStart()
