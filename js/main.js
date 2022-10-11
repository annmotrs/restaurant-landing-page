const menu = document.querySelector('.header__menu');
const nav = document.querySelector('.header__list');
const menuOpen = document.querySelector('.header__menu-open');
const menuClose = document.querySelector('.header__menu-close');

//Открытие меню в мобильной версии
menu.addEventListener('click', function(){
  nav.classList.toggle('header__list--active');
  menuOpen.classList.toggle('header__menu-open--active');
  menuClose.classList.toggle('header__menu-close--active');
});

//Закрытие открытого меню в мобильной версии при скролле сайта
window.addEventListener('scroll', () =>{
  closeMenu();
});

//Закрытие открытого меню в мобильной версии при клике по пункту меню или в область вне меню
document.addEventListener( 'click', (event) => {
	const withinBoundaries = event.composedPath().includes(menu) || event.composedPath().includes(nav);
 
	if (!withinBoundaries ) {
    closeMenu();
	}

  if(event.target.dataset.menuItem === ""){
    closeMenu();
  }
})

//Слайдеры
var swiper1 = new Swiper(".reviews__cards", {
  loop: true,
  autoplay: true,
  speed: 300,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

var swiper2 = new Swiper(".menu__cards", {
  slidesPerView: 3,
  spaceBetween: 30,
  grabCursor: true, 
  breakpoints: {
    0: {
      slidesPerView: 1,    
    },
    757: {
      slidesPerView: 2,
    },
    1155: {
      slidesPerView: 3,
    },
  },
});


window.addEventListener("resize", function() {
  swiper2.update();
});

//Маски для полей
var phoneElement = document.querySelector('#phone');
var phoneMaskOptions = {
  mask: '+7(000)000-00-00',
  lazy: false
} 
var phoneMask = new IMask(phoneElement, phoneMaskOptions);

var numberElement = document.querySelector('#number');
var numberMaskOptions = {
  mask: Number,
  min: 1,
  max: 100
};
var numberMask = new IMask(numberElement, numberMaskOptions);

//Открытие модального окна
const linksReservation = document.querySelectorAll('.link-reservation');
linksReservation.forEach(link => link.addEventListener('click', showModalDialog));

function showModalDialog(event) {
  event.preventDefault();
  const modalDialog = document.querySelector('.modal-dialog');
  modalDialog.classList.add('modal-dialog--active');
  disableScroll();
}

//Перемещение по модальному окну
const btnNext = document.querySelector('#btn-next');
const btnPrev = document.querySelector('#btn-prev');
const btnBooking = document.querySelector('#btn-booking');
const btnSuccessBooking = document.querySelector('#btn-success-booking');
const btnClose = document.querySelector('.modal-dialog__box-close-img');
const nameField = document.querySelector('#name');
const phoneField =  document.querySelector('#phone');
const emailField =  document.querySelector('#email');
const numberField = document.querySelector('#number');
const dateField =  document.querySelector('#date');
const checkboxField =  document.querySelector('#checkbox');


btnNext.addEventListener('click', function(event){
  event.preventDefault();

  if(nameField.value.trim() === "" || emailField.value.trim() === "" || phoneField.value.indexOf("_") !== -1) {
    if(nameField.value.trim() === "") {
      addWarning(nameField);
    }
    if(emailField.value.trim() === "") {
      addWarning(emailField);
    }
    if(phoneField.value.indexOf("_") !== -1) {
      addWarning(phoneField);
    }
  }
  else {
    deleteWarning();
    const parentForm = event.target.closest('.modal-dialog__form-step');
    const nextForm = parentForm.nextElementSibling;
    parentForm.classList.remove('modal-dialog__form-step--active');
    nextForm.classList.add('modal-dialog__form-step--active');
    const progressStepOne = document.querySelector('.modal-dialog__progress-step--active');
    const progressStepTwo = progressStepOne.nextElementSibling;
    progressStepTwo.classList.add('modal-dialog__progress-step--active');
    updateProgress("50%");
  }


});

btnPrev.addEventListener('click', function(event){
  event.preventDefault();
  const parentForm = event.target.closest('.modal-dialog__form-step');
  const prevForm = parentForm.previousElementSibling;
  parentForm.classList.remove('modal-dialog__form-step--active');
  prevForm.classList.add('modal-dialog__form-step--active');
  const progressSteps = document.querySelectorAll('.modal-dialog__progress-step--active');
  progressSteps[progressSteps.length - 1].classList.remove('modal-dialog__progress-step--active');
  updateProgress("0%");
});

btnBooking.addEventListener('click', function(event){
  event.preventDefault();

  if(numberField.value === "" || dateField.value === "" || checkboxField.checked === false) {
    if(numberField.value === "") {
      addWarning(numberField);
    }
    if(dateField.value === "") {
      addWarning(dateField);
    }
  }
  else {
  deleteWarning();
  const parentForm = event.target.closest('.modal-dialog__form-step');
  const nextForm = parentForm.nextElementSibling;
  parentForm.classList.remove('modal-dialog__form-step--active');
  nextForm.classList.add('modal-dialog__form-step--active');
  const progressSteps = document.querySelectorAll('.modal-dialog__progress-step--active');
  const progressStepThree = progressSteps[progressSteps.length - 1].nextElementSibling;
  progressStepThree.classList.add('modal-dialog__progress-step--active');
  updateProgress("90%");
  btnClose.style.display = "none";
  //Вставляем имя в итоговое окно 
  const textSuccessName = document.querySelector('.modal-dialog__text-successfully-name');
  textSuccessName.textContent = nameField.value;    
  }

 
});

btnSuccessBooking.addEventListener('click', function(event){
  event.preventDefault();
  const parentModalDialog = event.target.closest('.modal-dialog');
  parentModalDialog.classList.remove('modal-dialog--active');
  const progressSteps = document.querySelectorAll('.modal-dialog__progress-step--active');
  for(let i = 1; i < progressSteps.length; i++){
    progressSteps[i].classList.remove('modal-dialog__progress-step--active');
  }
  updateProgress("0%");
  btnClose.style.display = "block";

  const parentForm = event.target.closest('.modal-dialog__form-step');
  const firstForm = parentForm.previousElementSibling.previousElementSibling;
  parentForm.classList.remove('modal-dialog__form-step--active');
  firstForm.classList.add('modal-dialog__form-step--active');
  
  document.querySelector('.modal-dialog__form').reset();
  phoneField.value = "+7(___)___-__-__"; 
  enableScroll();
});

function updateProgress(val){
  const progress = document.querySelector('.modal-dialog__progress');
  progress.style.width = val;
}

//Добавление предупреждения в модальное окно, если поле не заполнено 
function addWarning(field) {
  field.classList.add('modal-dialog__input--warning');
  const parent = field.closest('.modal-dialog__input-group');
  parent.querySelector('.modal-dialog__warning').classList.add('modal-dialog__warning--active');
}

//Удаление предупреждения в модальном окне
function deleteWarning() {
  const warningInput = document.querySelectorAll('.modal-dialog__input');
  const warning = document.querySelectorAll('.modal-dialog__warning');
  for(let item of warningInput){
    if(item.classList.contains('modal-dialog__input--warning')) {
      item.classList.remove('modal-dialog__input--warning');
    }
  };
  for(let item of warning){
    if(item.classList.contains('modal-dialog__warning--active')) {
      item.classList.remove('modal-dialog__warning--active');
    }
  };
}

//Изменение значения поля, где надо указать количество персон
const btnPlus = document.querySelector('.modal-dialog__button-plus');
const btnMinus = document.querySelector('.modal-dialog__button-minus');
const fieldNumber = document.querySelector('.modal-dialog__input-number');

btnPlus.addEventListener('click', function(){
  if(+fieldNumber.value < 100) {
    fieldNumber.value = +fieldNumber.value + 1;
  }  
});

btnMinus.addEventListener('click', function(){
  if(+fieldNumber.value > 1) {
    fieldNumber.value = +fieldNumber.value - 1;
  }  
});

//Закрытие модального окна 
btnClose.addEventListener('click', function(event) {
 const parentModalDialog = event.target.closest('.modal-dialog');
 parentModalDialog.classList.remove('modal-dialog--active');
 deleteWarning();
 enableScroll();
});


//Отключение скролла на сайте
function disableScroll() { 
  let pagePosition = window.scrollY;
  document.body.classList.add('disable-scroll');
  document.body.dataset.position = pagePosition;
  document.body.style.top = -pagePosition + 'px';
  document.documentElement.style.scrollBehavior = 'auto';
}

 //Включение скролла на сайте
function enableScroll() { 
  let pagePosition = parseInt(document.body.dataset.position, 10);
  document.body.style.top = 'auto';
  document.body.classList.remove('disable-scroll');
  window.scroll({top: pagePosition, left: 0});
  document.body.removeAttribute('data-position');
  document.documentElement.style.scrollBehavior = 'smooth';
}

//Закрытие открытого меню в мобильной версии
function closeMenu() {
  nav.classList.remove('header__list--active');
  menuOpen.classList.add('header__menu-open--active');
  menuClose.classList.remove('header__menu-close--active');
}

//Добавление анимации при скролле
AOS.init({
  once: true
}); 
