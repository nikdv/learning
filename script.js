'use strict';

let money = prompt('Ваш месячный доход?', 60000);
console.log( typeof money);

let income = 'Фриланс';
console.log(typeof income);

let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
console.log(addExpenses.length);

let deposit = confirm('Есть ли у вас депозит в банке?');
console.log(typeof deposit);

let mission = 100000;
console.log('Цель заработать ' + mission + ' рублей');

let period = 6;
console.log('Период равен ' + period + ' месяцев');

console.log(addExpenses.toLowerCase().split(', '));

let expenses1 = prompt('Ведете обязательную статью расходов?', 'Да'),
    expenses2 = prompt('Ведете обязательную статью расходов?', 'Нет'),
    amount1 = +prompt('Во сколько это обойдется?', 1000),
    amount2 = +prompt('Во сколько это обойдется?', 2000);

let amount = amount1 + amount2;
console.log(amount);   
let budgetMonth = (money - (amount));
console.log('Доход за месяц: ' + budgetMonth);
let periodMission = Math.ceil(mission / budgetMonth);

let budgetDay = budgetMonth / 30;

console.log('Бюджет на день: ' + Math.floor(budgetDay));

console.log('Цель будет достигнута за ' + periodMission + ' месяц');

if (budgetDay < 600) {
  console.log('Низкий уровень дохода');
} else if (budgetDay <= 1200) {
  console.log('Средний уровень дохода');
} else if (budgetDay > 1200) {
  console.log('Высокий уровень дохода');
}  