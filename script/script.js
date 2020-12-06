'use strict';

let money,
    income

  let start = function() {
    do {
      money = prompt('Ваш месячный доход?', 60000);
    }
    while (isNaN(money) || money === '' || money === null) 

    do {
      income = prompt('Сколько в месяц зарабатываете на этом?', 10000);
    }
    while (isNaN(income) || income === '' || income === null)

  };  



start();

let  appData = {
    budget: money,
    income:{},
    addIncome: [],
    expenses: {}, 
    addExpenses: [],
    deposit: false,
    parcentDeposit: 0,
    moneyDeposit: 0,
    mission: 60000,
    period: 3,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function() {

      if(confirm('Есть ли у вас дополнительный заработок?')) {
        let itemIncome = prompt('Какой?',' Таксую');
        let cashIncome = prompt('Сколько в месяц зарабатываете на этом?', 10000);
        appData.income[itemIncome] = cashIncome;
      }
      let addExpenses = prompt('Перечислите возможные расходы через запятую?');
          appData.addExpenses = addExpenses.toUpperCase().split(', ');
          console.log(addExpenses);

          for (let i = 0; i < 2; i++) {
            let itemExpenses = prompt('Введите обязательную статью расходов?', "Садик Государственный");
            let cashExpenses;
            do {
              cashExpenses = prompt('Во сколько это обойдется?', 2500);
            }
            while (isNaN(cashExpenses) || cashExpenses === '' || cashExpenses === null);

            appData.expenses[itemExpenses] = cashExpenses;

          }      
          
    },
    getInfoDeposit: function() {
      appData.deposit = confirm('Есть ли у вас депозит в банке?'); 
      if(appData.deposit) {
        appData.parcentDeposit = prompt('Какой годовой процент?', '10');
        appData.moneyDeposit = prompt('Какая сумма задолжности?', 10000);
      }
    },

    getExpensesMonth: function () {
      for (let key in appData.expenses) {
        appData.expensesMonth += +appData.expenses[key];
      }
    },
    getBudget: function () {
      appData.budgetMonth = appData.budget - appData.expensesMonth;
      appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function () {
      return appData.mission / appData.budgetMonth;
    },
    getStatusIncome: function () {
      if (appData.budgetDay > 800) {
        return('Высокий уровень дохода');

      } else if(appData.budgetDay > 300) {
        return('Средний уровень дохода');
      } else if (appData.budgetDay > 0){
        return('Низкий уровень дохода');

      } else {
        return('Что то пошло не так!');
      }
    },
    calcPeriod: function () {
      return appData.budgetMonth * appData.period
    }
    
}; 

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log('Расходы за месяц: '  + appData.expensesAmount);

if (appData.getTargetMonth() > 0) {
  console.log("Цель будет достигнута за " + Math.ceil(appData.getTargetMonth()) + 'месяца');
} else {
  console.log('Цель не будет достигнута');
}

console.log(appData.getStatusIncome());




