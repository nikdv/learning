const collections = document.querySelectorAll('.book');

const adv = document.querySelector('.adv');
adv.remove();      

    console.log(collections);

    collections[0].before(collections[1]);
    collections[2].before(collections[4]);
    collections[2].before(collections[3]);
    collections[5].after(collections[2]);
   


document.body.style.backgroundImage = 'url(./image/open_book.jpg)';

const a = document.querySelectorAll('a');
console.log(a);

a[2].textContent = 'Книга 3. this и Прототипы Объектов';

// const li = document.createElement('li'),
// const ul = document.querySelectorAll('ul');
// console.log(ul);

// ul[5].insertAdjacentElement('beforeend', 'li');


const li = document.querySelectorAll('li');
li[55].insertAdjacentText('afterend', 'Глава 8: Заключение');

    