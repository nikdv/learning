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

    const AppData = function () {

    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.deposit = false;
    this.parcentDeposit = 0;
    this.moneyDeposit = 0;
    this.addExpenses = [];
    
};

AppData.prototype.check = function () {
    if (salaryAmount.value !== '') {
        start.removeAttribute('disabled');
    }
};

AppData.prototype.start = function() {

        if(salaryAmount.value === ''){
          alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
          return;
        }
        let allInput = document.querySelectorAll ( '.data input[type = text]');
        allInput.forEach(function (item) {
          item.setAttribute('disabled', 'disabled');
        });
        btnExpAdd.setAttribute('disabled', 'true');
        btnIncAdd.setAttribute('disabled', 'true');
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
 
      };
      AppData.prototype.showResult = function() {
        const _this = this;
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('change', function () {
          incPeriodValue.value = _this.calcPeriod();
        });
      };
      AppData.prototype.addExpensesBlock = function() {

        
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(CloneExpensesItem, btnExpAdd);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
          expensesPlus.style.display = 'none';
        }
      };
      AppData.prototype.getExpenses = function() {
        const _this = this;
        expensesItems.forEach(function(item){
          let itemExpenses = item.querySelector('.expenses-title').value;
          let cashExpenses = item.querySelector('.expenses-amount').value;
          if(itemExpenses !== '' && cashExpenses !== ''){
            _this.expenses[itemExpenses] = cashExpenses;
          } 
        });
      };

       AppData.prototype.addIncomeBlock = function() {

        
      let cloneExpensesItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(CloneIncomeItem, btnIncAdd);
        incomeItems = document.querySelectorAll('.income-items');

        if (incomeItems.length === 3){
          incomeItems.style.display = 'none';
        }
       };    

      AppData.prototype.getAddExpenses = function () {
        const _this = this;
        let addExpenses = additionalIncomeItem.value.split(', ');
        addExpenses.forEach(function (item){
          item = item.trim();
          if (item !== ''){
            _this.addExpenses.push(item);
          }
        });
      };
      AppData.prototype.getAddIncome = function() {
        const _this = this;
        additionalIncomeItem.forEach(function (item) {
          let itemValue = item.value.trim();
          if(itemValue !== '') {
            _this.addIncome.push(itemValue);
          }
        });
      };
      AppData.prototype.asking = function() {

      if(confirm('Есть ли у вас дополнительный заработок?')) {
        let itemIncome = prompt('Какой?',' Таксую');
        let cashIncome = prompt('Сколько в месяц зарабатываете на этом?', 10000);
        appData.income[itemIncome] = cashIncome;
        }
        let addExpenses = prompt('Перечислите возможные расходы через запятую?');
          appData.addExpenses = addExpenses.toUpperCase().split(', ');
          
      };
      AppData.prototype.getInfoDeposit= function() {
      appData.deposit = confirm('Есть ли у вас депозит в банке?'); 
      if(appData.deposit) {
        appData.parcentDeposit = prompt('Какой годовой процент?', '10');
        appData.moneyDeposit = prompt('Какая сумма задолжности?', 10000);
      }
    };
    AppData.prototype.getExpensesMonth = function () {

      for (let key in appData.expenses) {
        appData.expensesMonth += +appData.expenses[key];
      }

    };
    AppData.prototype.getBudget = function () {
      appData.budgetMonth = appData.budget - appData.expensesMonth;
      appData.budgetDay = appData.budgetMonth / 30;
    };
    AppData.prototype.getTargetMonth = function () {
      return targetAmount.value / appData.budgetMonth;
    };
    AppData.prototype.getStatusIncome = function () {
      if (appData.budgetDay > 800) {
        return('Высокий уровень дохода');

      } else if(appData.budgetDay > 300) {
        return('Средний уровень дохода');
      } else if (appData.budgetDay > 0){
        return('Низкий уровень дохода');

      } else {
        return('Что то пошло не так!');
      }
    };

    AppData.prototype.getInfoDeposit = function () {
        if(this.deposit) {
          do {
            this.parcentDeposit = prompt('Какой процент?', '12');  
          }while (isNaN(this.parcentDeposit) || this.parcentDeposit !==' ' || this.parcentDeposit !== null);
          do {
            this.moneyDeposit = promt('Какая сумма заложена?', '10000');
          }while (isNaN(this.moneyDeposit) || this.moneyDeposit !=='' || this.moneyDeposit !==' ' || this.moneyDeposit !== null);
        }
    };
    
    AppData.prototype.calcPeriod = function () {
      return appData.budgetMonth * periodSelect.value;
    };
    


    AppData.prototype.reset = function() {

    let inputTextData = document.querySelectorAll('.data input[type = text]'),
        resultInputAll = document.querySelectorAll('.result input[type = text]');
    
    inputTextData.forEach(function (elem) {
      elem.value = '';
      elem.removeAttribute('disabled');
      periodSelect.value = '0';
      periodAmount.innerHTML = periodSelect.value;
    });
    resultInputAll.forEach(function(elem) {
      elem.value = '';
    })
    
    for (let i = 1; i < incomeItems.length; i++) {
      incomeItems[i].parentNode.removeChild(incomeItems[i]);
      btnIncAdd.style.display = 'block';
    }
    for (let i = 1; i < expensesItems.length; i++) {
      expensesItems[i].parentNode.removeChild(expensesItems[i]);
      btnExpAdd.style.display = 'block';
    }

    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.deposit = false;
    this.parcentDeposit = 0;
    this.moneyDeposit = 0;
    this.addExpenses = [];

    cancel.style.display = 'none';
    start.style.display = 'block';
    btnExpAdd.removeAttribute('disabled');
    btnIncAdd.removeAttribute('disabled');
    checkBox.checked = false;

  
};

const appData = new AppData();

console.log(appData);


start.addEventListener('click', appData.start.bind(appData));
btnExpAdd.addEventListener('click', appData.addExpensesBlock);
btnIncAdd.addEventListener('click',appData.addIncomeBlock);
salaryAmount.addEventListener('keyup', appData.check);
cancel.addEventListener('click', appData.resent.bind(appData));


periodSelect.addEventListener('change', function() {
  periodAmount.innerHTML = periodSelect.value;
});

let addExp = [];
for (let i = 0; i < appData.addExpenses.length; i++) {
    let element = appData.addExpenses[i].trin();
    element = element.charAt(0).toUpperCase() +element.substring(1).toLowerCase();
    addExp.push(element);
}
