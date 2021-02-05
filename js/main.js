(function() {
  const spendRangeValue = document.getElementById('spend-range-value');
  const spendRangeMark = document.getElementById('spend-range-mark');

  const saveRangeValue = document.getElementById('save-range-value');
  const saveRangeMark = document.getElementById('save-range-mark');

  const cashbackPurchasesValue = document.getElementById('cashback-purchases-value');

  const cashbackBalance = document.getElementById('cashback-balance');
  const cashbackBalanceNote = document.getElementById('cashback-balance-note');
  const cashbackBalanceValue = document.getElementById('cashback-balance-value');

  const serviceNote = document.getElementById('service-note');
  const serviceValue = document.getElementById('service-value');

  const profit = document.getElementById('profit');
  const profitValue = document.getElementById('profit-value');

  $('#spend-range').rangeslider({
    polyfill: false,
    onInit: function() {
      spendRangeValue.textContent = this.value;
      cashbackPurchasesValue.textContent = `${Math.round(this.value*12*0.01)}`

      if (this.value < 3000) {
        spendRangeMark.classList.remove('range-slider__mark--active');
        cashbackBalance.classList.add('text-danger');
        cashbackBalanceNote.style.display = 'block';
        cashbackBalanceValue.textContent = '0';
      } else {
        spendRangeMark.classList.add('range-slider__mark--active');
        cashbackBalance.classList.remove('text-danger');
        cashbackBalanceNote.style.display = 'none';
        cashbackBalanceValue.textContent = `${Math.round(parseInt(saveRangeValue.textContent, 10)*0.035)}`;
      }

      profitValue.textContent = `${
        parseInt(cashbackPurchasesValue.textContent, 10) +
        parseInt(cashbackBalanceValue.textContent, 10) -
        (parseInt(saveRangeValue.textContent, 10) > 50000 ? 0 : 1188)
      }`;

      if (parseInt(profitValue.textContent, 10) < 0) {
        profit.classList.add('text-danger');
      } else {
        profit.classList.remove('text-danger');
      }
    },
    onSlide: function(position, value) {
      spendRangeValue.textContent = value;
      cashbackPurchasesValue.textContent = `${Math.round(value*12*0.01)}`

      if (value < 3000) {
        spendRangeMark.classList.remove('range-slider__mark--active');
        cashbackBalance.classList.add('text-danger');
        cashbackBalanceNote.style.display = 'block';
        cashbackBalanceValue.textContent = '0';
      } else {
        spendRangeMark.classList.add('range-slider__mark--active');
        cashbackBalance.classList.remove('text-danger');
        cashbackBalanceNote.style.display = 'none';
        cashbackBalanceValue.textContent = `${Math.round(parseInt(saveRangeValue.textContent, 10)*0.035)}`;
      }

      profitValue.textContent = `${
        parseInt(cashbackPurchasesValue.textContent, 10) +
        parseInt(cashbackBalanceValue.textContent, 10) -
        (parseInt(saveRangeValue.textContent, 10) > 50000 ? 0 : 1188)
      }`;

      if (parseInt(profitValue.textContent, 10) < 0) {
        profit.classList.add('text-danger');
      } else {
        profit.classList.remove('text-danger');
      }
    },
  });

  $('#save-range').rangeslider({
      polyfill: false,
      onInit: function() {
        saveRangeValue.textContent = this.value;
        cashbackBalanceValue.textContent = parseInt($('#spend-range').val(), 10) < 3000 ? 0 : `${Math.round(this.value*0.035)}`;

        if (this.value < 50000) {
          saveRangeMark.classList.remove('range-slider__mark--active');
          serviceNote.style.display = 'block';
          serviceValue.classList.add('text-danger');
          serviceValue.textContent = '−1188 Р/год';
        } else {
          saveRangeMark.classList.add('range-slider__mark--active');
          serviceNote.style.display = 'none';
          serviceValue.classList.remove('text-danger');
          serviceValue.textContent = 'Бесплатно';;
        }

        profitValue.textContent = `${
          parseInt(cashbackPurchasesValue.textContent, 10) +
          parseInt(cashbackBalanceValue.textContent, 10) -
          (parseInt(saveRangeValue.textContent, 10) > 50000 ? 0 : 1188)
        }`;

        if (parseInt(profitValue.textContent, 10) < 0) {
          profit.classList.add('text-danger');
        } else {
          profit.classList.remove('text-danger');
        }
      },
      onSlide: function(position, value) {
        saveRangeValue.textContent = value;
        cashbackBalanceValue.textContent = parseInt($('#spend-range').val(), 10) < 3000 ? 0 : `${Math.round(this.value*0.035)}`;

        if (value < 50000) {
          saveRangeMark.classList.remove('range-slider__mark--active');
          serviceNote.style.display = 'block';
          serviceValue.classList.add('text-danger');
          serviceValue.textContent = '−1188 Р/год';
        } else {
          saveRangeMark.classList.add('range-slider__mark--active');
          serviceNote.style.display = 'none';
          serviceValue.classList.remove('text-danger');
          serviceValue.textContent = 'Бесплатно';
        }

        profitValue.textContent = `${
          parseInt(cashbackPurchasesValue.textContent, 10) +
          parseInt(cashbackBalanceValue.textContent, 10) -
          (parseInt(saveRangeValue.textContent, 10) > 50000 ? 0 : 1188)
        }`;

        if (parseInt(profitValue.textContent, 10) < 0) {
          profit.classList.add('text-danger');
        } else {
          profit.classList.remove('text-danger');
        }
      },
    });

  const promoSlideBtn = document.getElementById('promo-slide-btn');
  const issueCardBtn = document.getElementById('issue-card-btn');
  const promoSlide = document.getElementById('promo-slide');
  const main = document.getElementById('main');


  promoSlideBtn.addEventListener('click', () => {
    promoSlide.style.display = 'none';
    main.style.display = 'block'
  });

  issueCardBtn.addEventListener('click', () => {
    if (window.FbPlayableAd) {
      window.FbPlayableAd.onCTAClick();
    }
  });
})();
