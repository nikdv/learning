'use strict';

let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    btnIncAdd = document.getElementsByTagName('button')[0],
    btnExpAdd = document.getElementsByTagName('button')[1],
    checkBox = document.querySelector('#deposit-check'),
    addIncItem = document.querySelectorAll('.additional_income-item'),
    budgetDayValue = document.querySelector('.result-budget_day input'),
    expensesMonthValue = document.querySelector('.result-expenses_month input'),
    addIncomeValue = document.querySelector('.result-additional_income input'),
    addExpValue = document.querySelector('.result-additional_expenses input'),
    incPeriodValue = document.querySelector('.result-income_period input'),
    targetMonthValue = document.querySelector('.result-target_month input'),
    salaryAmount = document.querySelector('.salary-amount'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    addExpItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    budgetMonthValue = document.querySelector('.result-budget_month input'),
    incomeItems = document.querySelectorAll('.income-items');

    
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
          start.setAttribute('disabled', 'true');
          return;
        }
        let allInput = document.querySelectorAll ( '.data input[type = text]');
        allInput.forEach(function (item) {
          item.setAttribute('disabled', 'true');
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
        this.getInfoDeposit();
        this.getStatusIncome();
        this.showResult();  
 
      };


      AppData.prototype.showResult = function() {
        const _this = this;
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        addExpValue.value = this.addExpenses.join(', ');
        addIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incPeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('change', function () {
          incPeriodValue.value = _this.calcPeriod();
        });

      };

      AppData.prototype.addExpensesBlock = function() {
        
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExpAdd);
        expensesItems = document.querySelectorAll('.expenses-items');

        if(expensesItems.length === 3) {
          btnExpAdd.style.display = 'none';
        }
      };
      AppData.prototype.getExpenses = function() {
        const _this = this;
        expensesItems.forEach(function (item) {
          let itemExpenses = item.querySelector('.expenses-title').value;
          let cashExpenses = item.querySelector('.expenses-amount').value;
          if(itemExpenses !== '' && cashExpenses !== '') {
            _this.expenses[itemExpenses] = cashExpenses;
          } 
        });
      };
      AppData.prototype.addIncomeBlock = function() {
       
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnIncAdd);
        incomeItems = document.querySelectorAll('.income-items');

        if (incomeItems.length === 3) {
          btnIncAdd.style.display = 'none';
        }
      };
      AppData.prototype.getIncome = function () {
        const _this = this;
        incomeItems.forEach(function (item) {
          let itemIncome = item.querySelector('.income-title'). value;
          let cashIncome = item.querySelector('.income-amount').value;

          if (itemIncome !== '' && cashIncome !== '') {
            _this.income[itemIncome] = cashIncome;
          }
        });
        for (let key in this.income) {
          this.incomeMonth += +this.income[key];
        }
      };
      AppData.prototype.getAddExpenses = function () {
        let addExpenses = addExpItem.value.split(',');
        const _this = this;
        addExpenses.forEach(function (item) {
          item = item.trim();
          if (item !== ''){
            _this.addExpenses.push(item);
          }
        });
      };
      AppData.prototype.getAddIncome = function() {
        const _this = this;
        addIncItem.forEach(function (item) {
          let itemValue = item.value.trim();
          if(itemValue !== '') {
            _this.addIncome.push(itemValue);
          }
        });
      };
      AppData.prototype.getExpensesMonth = function () {
        for (let key in this.expenses) {
          this.expensesMonth += +this.expenses[key];
        }
    };

    AppData.prototype.getBudget = function () {
      this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
      this.budgetDay = Math.floor(this.budgetMonth / 30);

    };
    AppData.prototype.getTargetMonth = function () {
      return targetAmount.value / this.budgetMonth;

    };

    AppData.prototype.getStatusIncome = function () {
      if (this.budgetDay >= 800) {
        return('Высокий уровень дохода');
      } else if(this.budgetDay >= 300 && this.budgetDay < 800) {
        return('Средний уровень дохода');
      } else if (this.budgetDay >= 0 && this.budgetDay < 300){
        return('Низкий уровень дохода');
      } else if (this.budgetDay < 0) {
        return('Что то пошло не так!');
      }
    };
    AppData.prototype.getInfoDeposit = function () {
        if(this.deposit) {
          do {
            this.parcentDeposit = prompt('Какой годовой процент?', '12');  
          }while (isNaN(this.parcentDeposit) || this.parcentDeposit ===' ' || this.parcentDeposit === null);
          do {
            this.moneyDeposit = promt('Какая сумма заложена?', '10000');
          }while (isNaN(this.moneyDeposit) || this.moneyDeposit ==='' || this.moneyDeposit ===' ' || this.moneyDeposit === null);
        }
    };

    AppData.prototype.calcPeriod = function () {
      return this.budgetMonth * periodSelect.value;
    };
    AppData.prototype.reset = function () {

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
    });
    
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
cancel.addEventListener('click', appData.reset.bind(appData));


periodSelect.addEventListener('change', function() {
  periodAmount.innerHTML = periodSelect.value;
});

let addExp = [];
for (let i = 0; i < appData.addExpenses.length; i++) {
    let element = appData.addExpenses[i].trin();
    element = element.charAt(0).toUpperCase() +element.substring(1).toLowerCase();
    addExp.push(element);
}
