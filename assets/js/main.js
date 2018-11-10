function calculateMonthlyCost(loanAmount, repaymentYears, interest) {
    var months = repaymentYears * 12;

    return Math.round(loanAmount * (interest / 100) / 12 / (1 - Math.pow(1 + (interest / 100) / 12, (months * -1))));
}

var app = new Vue({
    el: '#app',
    data() {
        return {
             /* Collecting all the fiels in a Object */
             calculatorFields: {
                'amount': {
                    label: this.getContent().loanAmountLabel,
                    suffix: this.getContent().loanAmountSuffix,
                    value: 250000,
                    increment: 5000,
                    limits: {
                        min: 5000,
                        max: 600000
                    }
                },
                'repayment': {
                    label: this.getContent().repaymentYearsLabel,
                    suffix: this.getContent().repaymentYearsSuffix,
                    value: 14,
                    increment: 1,
                    limits: {
                        min: 1,
                        max: 15
                    }
                }
            }
        };
    },
    methods: {
        /**
         * Simulates an API call to a CMS.
         */
        getContent() {
            return {
                "monthlyCostLabel": "Månadskostnad",
                "monthlyCostSuffix": "kr",
                "loanAmountLabel": "Lånebelopp",
                "loanAmountSuffix": "kr",
                "repaymentYearsLabel": "Återbetalningstid",
                "repaymentYearsSuffix": "år",
                "ctaLabel": "Ansök nu",
                "interest": 5.77
            };
        },

        /* Updates the value in calculatorFields with incrementDir */
        updateCalculatorValue(calculatorField, incrementDir) {

            /* 
                Todo: 
                If time left insert check here.
                - if calculatorField exists
                - if incrementDir === 1 or -1
             */

            const calculatorValue = this.calculatorFields[calculatorField].value;
            const calculatorIncrement = this.calculatorFields[calculatorField].increment;
            const calculatorLimits = this.calculatorFields[calculatorField].limits;

            /* The value after increment */
            const calculatorNewValue = calculatorValue + (calculatorIncrement * incrementDir);

            /* Check if inside of limmits */
            if(calculatorNewValue >= calculatorLimits.min && calculatorNewValue <= calculatorLimits.max) {
                this.calculatorFields[calculatorField].value = calculatorNewValue;
                /*
                    Todo: Disable btn if limmit reached 
                 */

            } else {
                /* 
                   Todo: error message 
                 */
            }
        },
        /* Filter the input from invalid chars and outof range values */
        filterInput(calculatorField, event) {

            /*
                Todo: Using this function with keyup will give errors. But the function is still working. 
                It there is time left build a workarund.
             */

            const eventValue = event.target.value;
            const calculatorLimits = this.calculatorFields[calculatorField].limits;
            let eventValueFliterd = eventValue.replace(/[^0-9]|\s/g,''); /* Remove anything that is not a number */

            let newValue;
 
            /* Check if the filterde value is in range */
            if(eventValueFliterd < calculatorLimits.min) {
                newValue = calculatorLimits.min;
            } else if(eventValueFliterd > calculatorLimits.max) {
                newValue = calculatorLimits.max;
            } else {
                newValue = eventValueFliterd;
            }

            /* return the new value */
            this.calculatorFields[calculatorField].value = newValue;
        }
    },
    computed: {
        monthlyCost() {
            const loanAmount = this.calculatorFields['amount'].value;
            const repaymentYears = this.calculatorFields['repayment'].value;
            const interest = this.getContent().interest;

            return calculateMonthlyCost(loanAmount, repaymentYears, interest);
        }
    }
});