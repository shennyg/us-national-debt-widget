"use strict";

class DebtClock {
  constructor(options = {}) {
    this.elementId = options.elementId || "debtClock";
    this.element = document.getElementById(this.elementId);
    this.currency = options.currency || "$";
    this.decimalLength = options.decimalLength || 0;
    this.updateInterval = options.updateInterval || 100; // 1/10th of a second
    this.autoUpdate = options.autoUpdate || true;
    // the number of 1/10th of a seconds since the baseDebtDate
    this.elapsedTenths = 1;
    /**
     * pass in an anonymous function to override this widget's calculation
     *
     * E.g.
     * var options = {
     *   customCalculateFunction: function () {
     *     return 0;
     *   }
     * };
     */
    this.customCalculateFunction = options.customCalculateFunction || null;
    // increase in debt by the second
    // @todo confirm this number, currently from https://www.nabber.org/projects/debtcounter/
    this.perSecondDebt = 32026.40;
    this.perTenthDebt = this.perSecondDebt / 10;
    // to be more accurate periodically update the baseDebt and the baseDebt{Year,Month,Day} based on http://www.treasurydirect.gov/NP/debt/current
    this.baseDebt = (typeof options.baseDebt != 'undefined') ? options.baseDebt : 19064879099682.52;
    this.baseDebtYear = options.baseDebtYear || 2016;
    this.baseDebtMonth = options.baseDebtMonth || 2;
    this.baseDebtDay = options.baseDebtDay || 24;
    this.baseDebtDate = new Date(this.baseDebtYear, this.baseDebtMonth - 1, this.baseDebtDay); // Month is 0-11 in JavaScript
    this.now = new Date();

    this.go();
  }

  /**
   * calculates debt
   * @returns float
   */
  calculate() {
    // if we are passed in a custom calculate function, use it!
    if (typeof this.customCalculateFunction === 'function') {
      return this.customCalculateFunction();
    }

    // a tenth of a second in miliseconds is 100 miliseconds
    // http://www.wolframalpha.com/input/?i=a+tenth+of+a+second+in+miliseconds
    // how many 10ths of a second since baseDebt was updated (aka this.baseDebtDate)
    this.elapsedTenths = Math.ceil(
        // current miliseconds minus the miliseconds at the debt start date over 100 miliseconds
        (this.now.getTime() - this.baseDebtDate.getTime()) / 100
      );
    return (this.elapsedTenths * this.perTenthDebt) + this.baseDebt;
  }

  /**
   * kick off widget
   */
  go() {
    // initially update element
    this.updateElement();

    // recursive
    if (this.autoUpdate) {
      // hang onto scope
      let that = this;

      // update element at an interval to make it look like the debt is increasing in realtime
      setInterval(function() {
            // now needs to update to increase debt
            that.now = new Date();
            // continually update element
            that.updateElement();
          },
          // how often to update
          this.updateInterval
        );
    }
  }

  /**
   * calculates and formats debt amount
   * @returns {string}
   */
  formatAmount() {
    return this.calculate().formatMoney(this.decimalLength);
  }

  /**
   * Compile template and run the calculation.
   * Use ES2015 Template literals to combine our data and template
   * @returns {string}
   */
  toString() {
    return `<span class="currency">${ this.currency }</span><span class="amount">${ this.formatAmount() }</span>`;
  }

  /**
   * Replace element with compiled template.
   */
  updateElement() {
    this.element.innerHTML = this.toString();
  }
}

/*
 * add formatMoney method to native Number
 *
 * c - decimal length
 * d - decimal separator
 * t - thousands separator
 *
 * modified from source: http://stackoverflow.com/a/149099/38406
 */
Number.prototype.formatMoney = function(c, d, t) {
  c = isNaN(c = Math.abs(c)) ? 2 : c;
  d = d === undefined ? "." : d;
  t = t === undefined ? "," : t;

  var n = this,
      s = n < 0 ? "-" : "",
      i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
      j = (j = i.length) > 3 ? j % 3 : 0;

   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

