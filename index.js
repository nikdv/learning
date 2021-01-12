'use strict';


const start = document.querySelector('#start'),
      cancel = document.querySelector('#cancel'),
      btnPlus = document.querySelectorAll('button'),
      btnIncomePlus = btnPlus[0],
      btnExpensesPlus = btnPlus[1],
      additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
      budgetDayValue = document.querySelector('.budget_day-value'),
      expensesMonthValue = document.querySelector('.expenses_month-value'),
      additionalIncomeValue = document.querySelector('.additional_income-value'),
      additionalExpensesValue = document.querySelector('.additional_expenses-value'),
      incomePeriodValue = document.querySelector('.income_period-value'),
      targetMonthValue = document.querySelector('.target_month-value'),
      salaryAmount = document.querySelector('.salary-amount'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      targetAmount = document.querySelector('.target-amount'),
      periodSelect = document.querySelector('.period-select'),
      depositCheck = document.getElementById('.deposit-check'),
      periodAmount = document.querySelector('.period-amount'),
      depositBank = document.querySelector('.deposit-bank'),
      depositAmount = document.querySelector('.deposit-amount'),
      depositPercent = document.querySelector('.deposit-percent'); 

let   expensesItems = document.querySelectorAll('.expenses-items'),
      incomeItems = document.querySelectorAll('.income-items');
    
class AppData { 
    constructor() {
      this.budget = 0;
      this.budgetDay = 0;
      this.budgetMonth = 0;
      this.income = {};
      this.incomeMonth = 0;
      this.addIncome = [];
      this.expenses = {};
      this.expensesMonth = 0;
      this.addExpenses = [];
      this.deposit = false;
      this.parcentDeposit = 0;
      this.moneyDeposit = 0;
      this.addExpenses = [];
      
    }    

    isNum(n) {
        return (!isNaN(parseFloat(n)) && isFinite(n));
    }

      start() {
        salaryAmount.value = salaryAmount.value.trim();
        if(!this.isNum(salaryAmount.value)) {
          alert('Введите сумму месячного дохода');
          return;
        }
        this.budget = +salaryAmount.value;
        this.getIncome();
        this.getExpenses();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getInfoDeposit();
        this.getBudget();
        this.getTargetMonth();

        this.showResult();
        
        this.turnStartCancel(1);
        this.blockUnBlockInput(1);
    }
    
    reset() {
      expensesItems = document.querySelectorAll('.expenses-items');
      if (expensesItems.length > 1) {
          for (let i = expensesItems.length - 1; i >= 1; i--) {
              if (expensesItems[i].parentNode) {
                  expensesItems[i].parentNode.removeChild(expensesItems[i]);
              }
          }    
      }
      btnExpensesPlus.hidden = false;

      incomeItems = document.querySelectorAll('.income-items');
      if (incomeItems.length > 1) {
          for (let i = (incomeItems.length - 1); i >= 1; i--) {
              if (incomeItems[i].parentNode) {
                  incomeItems[i].parentNode.removeChild(incomeItems[i]);
              }
          }    
      }
      btnIncomePlus.hidden = false;

      document.querySelectorAll('input').forEach(item => {
        item.value = '';
      });

      periodSelect.value = 1;
      periodAmount.textContent = '1';
      depositCheck.checked = false;
      this.addIncome = [];
      this.addExpenses = [];

      this.turnStartCancel(0);
      this.blockUnBlockInput(0);
    }  

    turnStartCancel(n) {
        if (n) {
            start.hidden = true;
            cancel.style.display = "block";
        } else {
            start.hidden = false;
            cancel.style.display = "none";
        }
    }

    blockUnBlockInput(n) {
        const divData = document.querySelector('.data');
        const arrElemBlock = divData.getElementsByTagName('*');
        for(let i = 0; i < arrElemBlock.length; i++) {
            if (arrElemBlock[i].type !== 'range') {
                arrElemBlock[i].disabled = !!(n);
            }
        }
    }

    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();

        periodSelect.addEventListener('change', () => {
          this.getPeriod();
        });
        incomePeriodValue.value = this.calcPeriod();

    }

    addExpensesBlock() {   
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelectorAll('input').forEach(item => item.value = '');
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExpensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3) {
          btnExpensesPlus.hidden = true;
        }
    }

    getExpenses() {
        expensesItems.forEach(item => {
          let itemExpenses = item.querySelector('.expenses-title').value,
              cashExpenses = item.querySelector('.expenses-amount').value;
          if(itemExpenses !== '' && cashExpenses !== '') {
              this.expenses[itemExpenses] = cashExpenses;
          } 
        });
      }


    addIncomeBlock() {    
        const cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelectorAll('input').forEach(item => item.value = '');
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnIncomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
          btnIncomePlus.hidden = true;
        }
    }

    getIncome() {
        incomeItems.forEach(item => {

          let itemIncome = item.querySelector('.income-title'). value,
              cashIncome = item.querySelector('.income-amount').value;
          if (itemIncome !== '' && cashIncome !== '') {
              this.income[itemIncome] = cashIncome;
          }
        });
        for (let key in this.income) {
          this.incomeMonth += +this.income[key];
        }
    }

    getAddExpenses() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(item => {
          let itemValue = item.trim();
          if (itemValue !== '') {
              this.addExpenses.push(itemvalue);
          }
        });
      }

    getAddIncome() {
        additionalIncomeItem.forEach(item => {
          let itemValue = item.value.trim();
          if (itemValue !== '') {
              this.addIncome.push(itemValue);
          }
        });
      }

    getPeriod() {
      this.period = document.querySelector('.period-select').value;
      periodAmount.textContent = this.period;
    }

    getExpensesMonth() {
        for (let key in this.expenses) {
          this.expensesMonth += +this.expenses[key];
        }
    }

    getBudget() {

      const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
      this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
      this.budgetDay = Math.floor(this.budgetMonth / 30);
    }

    getTargetMonth() {
      return Math.ceil(targetAmount.value / this.budgetMonth);
    }

    
    getStatusIncome() {
      if (this.budgetDay <= 0) {
          return ('Что то пошло не так!');
      } else if (this.budgetDay <= 300) {
          return('Низкий уровень дохода');
      } else if (this.budgetDay <= 800) {
          return('Средний уровень дохода');
      } else {
          return('Высокий уровень дохода');
      }
    }

    calcPeriod() {
      return this.budgetMonth * periodSelect.value;
    }

    getInfoDeposit() {
        if (this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }

    changePercent() {
        const valueSelect = this.value;
        if (valueSelect === 'other') {

        } else {
            depositPercent.value = valueSelect
        }
    }

    depositHandler() {
      if (depositCheck.checked) {
          depositBank.style.display ='inlaine-block';
          depositAmount.style.display ='inlaine-block';
          this.deposit = true;
          depositBank.addEventListener('change', this.changePercent);
      } else {
          depositBank.style.display ='none';
          depositAmount.style.display ='none';
          depositBank.value ='';
          depositAmount.value ='';
          this.deposit = false;
          depositBank.removeEventListener('change', this.changePercent);
      }
    }

    eventsListeners() {
        start.addEventListener('click', this.start.bind(this));

        btnExpensesPlus.addEventListener('click', this.addExpensesBlock);
        btnIncomePlus.addEventListener('click',this.addIncomeBlock);

        periodSelect.addEventListener('change', () => {
            this.getPeriod();
            incomePeriodValue.value = this.calcPeriod();
        });

        cancel.addEventListener('click', this.reset.bind(this));

        depositCheck.addEventListener('change', this.depositHandler.bind(this));

    }
}  

const newData = new AppData();
newData.eventsListeners();