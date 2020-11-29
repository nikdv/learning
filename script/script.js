let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

let money,
    income = 'Фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую?'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 100000,
    period = 6;

let start = function(){
  money = prompt('Ваш месячный доход?');

  while (!isNumber(money)) {
    money = prompt('Ваш месячный доход?');
  }
  
};    

start();

let ShowTypeof = function(item){
  console.log(typeof item);
};
ShowTypeof(money);
ShowTypeof(income);
ShowTypeof(deposit);

let expenses = [];

console.log(addExpenses.toLowerCase().split(', '));

// Четвертая домашняя работа

let getExpensesMonth = function(){
  let sum = 0;

  for(let i = 0; i < 4; i++) {

     expenses[i] = prompt('Введите обязательную статью расходов?');
    

     sum = prompt('во сколько это обойдется?')

      while (!isNumber(sum)) {
      sum = prompt('во сколько это обойдется?');
    };
  
  }
  
  console.log(expenses);
  return sum;
};

let expensesAmount = getExpensesMonth();

console.log('Расходы за месяц: '  + expensesAmount);

let getAccumulatedMonth = function(){
  return money - expensesAmount;
};

let accumulatedMonth = getAccumulatedMonth();

let getTargetMonth = function(){
  return  mission / accumulatedMonth
};

let budgetDay = function(){
  return accumulatedMonth / 30
};

if(getTargetMonth()>0){
console.log('Цель будет достигнута за ' + Math.ceil(getTargetMonth()) + ' месяц');
} else {
  console.log('Цель не будет достигнута');
};

let getStatusIncome = function(){
  if (budgetDay < 300) {
    return('Низкий уровень дохода');
  } else if(budgetDay <= 800) {
    return('Средний уровень дохода');
  } else {
    return('Высокий уровень дохода');

  }

};

console.log(getStatusIncome());

