'use strict'

let start = document.getElementById('start'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    depositCheck = document.querySelector('#deposit-check'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    expensesIncomeValue = document.getElementsByClassName('expenses_month-value')[0],
    acumulatedMontheValue = document.getElementsByClassName('acumulated_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelector('.expenses-items'),
    additionalExpenses = document.querySelector('.additional-expenses'),
    periodSelect = document.querySelector('.period-select'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    incomeItem = document.querySelectorAll('.income-items');


let  appData = {
    income:{},
    addIncome: [],
    expenses: {}, 
    addExpenses: [],
    deposit: false,
    parcentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    start: function() {

        if(salaryAmount.value === ''){
          alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
          return;
        }
        let allInput = document.querySelectorAll ( '.data input[type = text]');
        allInput.forEach(function (item) {
          item.setAttribute('disabled', 'disabled');
        });
        btnExpAdd.setAttribute('disabled', 'disabled');
        btnIncAdd.setAttribute('disabled', 'disabled');
        start.style.display = 'none';
        cancel.style.display = 'block';
        
        this.budget = +salaryAmount.value;

        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();  
 


      },
      showResult: function(){
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('change', function () {
          incPeriodValue.value = appData.calcPeriod();
        });
      },
      addExpensesBlock: function() {

        
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(CloneExpensesItem, btnExpAdd);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
          expensesPlus.style.display = 'none';
        }
      },
      getExpenses: function() {
        expensesItems.forEach(function(item){
          let itemExpenses = item.querySelector('.expenses-title').value;
          let cashExpenses = item.querySelector('.expenses-amount').value;
          if(itemExpenses !== '' && cashExpenses !== ''){
            appData.expenses[itemExpenses] = cashExpenses;
          } 
        });
      },

       addIncomeBlock: function() {

        
      let cloneExpensesItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(CloneIncomeItem, btnIncAdd);
        incomeItems = document.querySelectorAll('.income-items');

        if (incomeItems.length === 3){
          incomeItems.style.display = 'none';
        }
       },    

      getAddExpenses: function () {
        let addExpenses = additionalIncomeItem.value.split(', ');
        addExpenses.forEach(function (item){
          item = item.trim();
          if (item !== ''){
            appData.addExpenses.push(item);
          }
        });
      },
      getAddIncome: function() {
        additionalIncomeItem.forEach(function (item) {
          let itemValue = item.value.trim();
          if(itemValue !== '') {
            appData.addIncome.push(itemValue);
          }
        });
      },
      asking: function() {

      if(confirm('Есть ли у вас дополнительный заработок?')) {
        let itemIncome = prompt('Какой?',' Таксую');
        let cashIncome = prompt('Сколько в месяц зарабатываете на этом?', 10000);
        appData.income[itemIncome] = cashIncome;
        }
        let addExpenses = prompt('Перечислите возможные расходы через запятую?');
          appData.addExpenses = addExpenses.toUpperCase().split(', ');
          
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
      appData.budgetDay = appData.budgetMonth / 30;
    },
    getTargetMonth: function () {
      return targetAmount.value / appData.budgetMonth;
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
      return appData.budgetMonth * periodSelect.value;
    }
    
}; 

start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);