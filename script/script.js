'use strict';

let money,
    income = 'Фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую?'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 100000,
    period = 6;

let ShowTypeof = function(item){
  console.log(typeof item);
};
ShowTypeof(money);
ShowTypeof(income);
ShowTypeof(deposit);

let expenses1 = prompt('Ведете обязательную статью расходов?', 'Да'),
    expenses2 = prompt('Ведете обязательную статью расходов?', 'Нет'),
    amount1 = +prompt('Во сколько это обойдется?', 1000),
    amount2 = +prompt('Во сколько это обойдется?', 2000);

console.log(addExpenses.toLowerCase().split(', '));

// Четвертая домашняя работа

let getExpensesMonth = function(){
  return amount1 + amount2;
};

let getAccumulatedMonth = function(){
  return money - getExpensesMonth();
};

let accumulatedMonth = getAccumulatedMonth();

let getTargetMonth = function(){
  return  mission / accumulatedMonth
};

let budgetDay = function(){
  return accumulatedMonth / 30
};