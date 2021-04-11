// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

const glyphs = document.getElementsByClassName("like-glyph");
const divError = document.getElementById('modal');
divError.className = 'hidden';

const errorMessage = document.getElementById('modal-message');


for (let i = 0; i < glyphs.length; i++) {
  glyphs[i].innerHTML = EMPTY_HEART;
  glyphs[i].classList.remove('activated-heart');
}

for (let i = 0; i < glyphs.length; i++) {

  glyphs[i].addEventListener('click', event => {

    const glyphSpan = event.target;
    const glyphState = glyphSpan.classList.contains('activated-heart');

    if (glyphState) {
      glyphSpan.classList.remove('activated-heart');
      glyphSpan.innerHTML = EMPTY_HEART;
    }
    else {
      PostServer(glyphSpan);
    }
  });
}



errorMessage.innerHTML = '';

function PostServer(glyphSpan) {
  mimicServerCall()
  .then( () => {
    glyphSpan.innerHTML = FULL_HEART;
    glyphSpan.classList.add('activated-heart');
  })
  .catch( e => {
    divError.className = '';
    errorMessage.innerHTML = e;
    setTimeout(() => divError.className = 'hidden', 2000);
  });
}





//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
