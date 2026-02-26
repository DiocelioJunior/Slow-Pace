document.addEventListener("DOMContentLoaded", () => {

  const moreInfoBtn = document.getElementById('more-info-btn');
  const moreInfoTxt = document.querySelector('.more-info-txt');

  if (moreInfoBtn) {
    moreInfoBtn.addEventListener('click', () => {
      if (moreInfoTxt.style.display === 'none' || moreInfoTxt.style.display === '') {
        moreInfoTxt.style.display = 'block';
        moreInfoBtn.innerText = 'Ver Menos';
      } else {
        moreInfoTxt.style.display = 'none';
        moreInfoBtn.innerText = 'Saiba mais';
      }
    });
  }

});
