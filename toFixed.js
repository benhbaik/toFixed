function toFixed(number, precision) {
        var numberSplit = number.toString().split('');
        var numberLength = numberSplit.length;
        var decPtIndex = numberSplit.indexOf('.');
        var decimalsLength = numberSplit.slice(decPtIndex + 1, numberLength + 1).length;
        var roundedNumber;
        // handle simple cases
        if (arguments.length < 2 || precision === 0) {
            return Math.round(number).toString();
        }
        // handle whole numbers
        if (decPtIndex === -1) {
            numberSplit.push('.');

            for(var i = 0; i < precision; i++) {
                numberSplit.push('0');
            }

            return numberSplit.join('')
        }
        // handle cases where precision is more than decimalsLength
        if (decimalsLength < precision) {
            for(var i = 0; i < precision - decimalsLength; i++) {
                numberSplit.push('0');
            }

            return numberSplit.join('')
        }
        // roundedNumber does not have decimal due to rounding
        roundedNumber = getRoundedNumber(numberSplit);

        return reformat(roundedNumber);

        function getRoundedNumber(numberArray) {
            var newNumber;
            // move decimal
            numberArray.splice(decPtIndex, 1);
            numberArray.splice(decPtIndex + precision, 0, '.');
            // assemble and return rounded number
            newNumber = numberArray.join('');
            return Math.round(Number(newNumber));
        }

        function reformat(number) {
            var desiredLength = decPtIndex + precision;
            var number = number.toString().split('');
            // handle negative numbers
            if (number[0] === '-') {
                while (desiredLength > number.length) {
                    number.splice(1, 0, '0');
                }
            }
            // get number back to original length
            while (desiredLength > number.length) {
                number.unshift('0');
            }
            // put decimal in right place
            number.splice(number.length - precision, 0, '.');
            // handle cases with '.' in front
            if (number[0] === '.') {
                number.unshift('0');
            }
            // handle negatives
            if ((number[0] === '-') && (number[1] === '.')) {
                number.splice(1, 0, '0');
            }

            return number.join('');
        }
}
