document.querySelectorAll(".typing-text").forEach((element) => {
  const text = element.dataset.text;

  let index = 0;
  let deleting = false;

  function animate() {
    element.textContent = text.substring(0, index);

    let delay;

    if (!deleting && index < text.length) {
      index++;
      delay = 100 + Math.random() * 35;
    } else if (!deleting) {
      deleting = true;
      delay = 1800;
    } else if (index > 0) {
      index--;
      delay = 55;
    } else {
      deleting = false;
      delay = 450;
    }

    setTimeout(animate, delay);
  }

  animate();
});





// letter animation 2 

document.querySelectorAll(".animated-name").forEach((element) => {
  if (element.dataset.animated) return;

  element.dataset.animated = "true";

  const letters = [...element.textContent.trim()];
  element.replaceChildren();

  letters.forEach((letter, index) => {
    const span = document.createElement("span");

    span.textContent = letter === " " ? "\u00A0" : letter;
    span.style.animationDelay = `${index * 0.07}s`;

    element.appendChild(span);
  });
});



// view button animated 
