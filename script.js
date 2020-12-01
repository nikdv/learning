let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

let start = function(){
  money = prompt('Ваш месячный доход?', 60000);

  while (!isNumber(money)) {
    money = prompt('Ваш месячный доход?', 60000);
  }
  
};    

start();

let  appData = {
    income:{},
    addIncome: [],
    expenses: { 
          'Введите обязательную статью расходов?, Садик Государственный' : 'Во сколько это обойдется?',
          'Введите обязательную статью расходов?, Садик Частный' : 'Во сколько это обойдется?'
          }, 
    addExpenses: [],
    deposit: false,
    mission: 60000,
    period: 3,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function() {
      let addExpenses = prompt('Перечислите возможные расходы через запятую?');
          appData.addExpenses = addExpenses.toLowerCase().split(', ');
          appData.deposit = confirm('Есть ли у вас депозит в банке?');     
    }

};  

console.log(appData);

let expenses = [1, 2, 3, 4];

appData.getExpensesMonth = function(){
  let sum = 0;

    for(let item in expenses)
  {

     expenses[1, 2, 3, 4] = prompt('Введите обязательную статью расходов?');
    

     sum = prompt('во сколько это обойдется?')

      while (!isNumber(sum)) {
      sum = prompt('во сколько это обойдется?');
    };
  
  }
  
  console.log(expenses);
  return sum;
};

let expensesAmount = appData.getExpensesMonth();

console.log('Расходы за месяц: '  + expensesAmount);

appData.getBudget = function(){
  return money - expenses;
};

let accumulatedMonth = appData.getBudget();

appData.getTargetMonth = function(){
  return  appData.mission / appData.getBudget
};

let budgetDay = function(){
  return appData.getBudget / 30
};

if(appData.getTargetMonth()>0){
console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяц');
} else {
  console.log('Цель не будет достигнута');
};

appData.getStatusIncome = function(){
  if (budgetDay < 300) {
    return('Низкий уровень дохода');
  } else if(budgetDay <= 800) {
    return('Средний уровень дохода');
  } else {
    return('Высокий уровень дохода');

  }

};

console.log(appData.getStatusIncome());

