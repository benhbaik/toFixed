tests({
    'it should round the first argument to whole integer(no precision argument)': function() {
        eq(toFixed(0.615), '1');
        eq(toFixed(4.913), '5');
        eq(toFixed(10.353), '10');
    },
    'it should round according to precision': function() {
        eq(toFixed(0.615, 2), '0.62');
        eq(toFixed(0.4831, 3), '0.483');
        eq(toFixed(0.124, 2), '0.12');
        eq(toFixed(0.0431, 1), '0.0');
        eq(toFixed(0.2499, 1), '0.2');
    },
    'it should round problem numbers': function() {
        eq(toFixed(0.99, 1), '1.0');
        eq(toFixed(0.11, 1), '0.1');
        eq(toFixed(0.55, 1), '0.6');
        eq(toFixed(9.99, 1), '10.0')
    },
    'it should add precision to whole numbers': function() {
        eq(toFixed(400, 1), '400.0');
        eq(toFixed(5, 6), '5.000000');
        eq(toFixed(14, 3), '14.000');
    },
    'it should be able to round negative numbers': function() {
        eq(toFixed(-0.319, 1), '-0.3');
        eq(toFixed(-0.5915, 2), '-0.59');
        eq(toFixed(-0.0085, 2), '-0.01');
    },
    'should return 0.62': function() {
        var testOne = toFixed(.615, 2);
        eq(testOne, "0.62");
    },
    'should return 10.24': function() {
        var testTwo = toFixed(10.235, 2);
        eq(testTwo === "10.24", true);
    },
    'should return 1.01': function() {
        var testThree = toFixed(1.005, 2);
        eq(testThree, "1.01");
    },
    'should return 0.236': function() {
        var testFour = toFixed(.2356, 3);
        eq(testFour === "0.236", true);
    },
    'should return 10.7': function() {
        var testFive = toFixed(10.678, 1);
        eq(testFive, "10.7");
    },
    'should return 10': function() {
        var testSix = toFixed(10.235, 0);
        eq(testSix === "10", true);
    },
    'should return 11': function() {
        var testSeven = toFixed(10.635, 0);
        eq(testSeven, "11");
    },
    'should return 1.00201': function() {
        var testSeven = toFixed(1.002005, 5);
        eq(testSeven, "1.00201");
    },
    '".005" with 2 precision shoud return "0.01"': function() {
        var oneHundred = 100;
        eq( toFixed(.005, 2), '0.01' );
    },
    '"1.005" with 2 precision return "1.01"': function() {
        eq( toFixed(1.005, 2), '1.01' );
    },
    '"12314.12342145" with 7 precision return "12314.1234215"': function() {
        eq( toFixed(12314.12342145, 7), '12314.1234215' );
    },
    'Precision greater than number of decimals': function() {
        eq( toFixed(12314.12342145, 15), '12314.123421450000000' );
    },
    'it should round 0.615 correctly to 0.62': function() {
        eq(toFixed(0.615, 2), '0.62');
    },
    'it should round 10.235 correctly to 10.24': function() {
        eq(toFixed(10.235, 2), '10.24');
    },
    'it should round 1.005 correctly to 1.01': function() {
        eq(toFixed(1.005, 2), '1.01');
    },
    'it should pad 1.5 correctly to 1.5000': function() {
        eq(toFixed(1.5, 4), '1.5000');
    },
    'it should return a string if given a number': function () {
        eq(typeof toFixed(1.005), 'string');
    },
    'it should, for integers, return the integer as a string with a decimal point and the number of precision 0s': function () {
        eq(toFixed(1005, 2), '1005.00');
    },
    'it should return a string with the properly rounded values': function () {
        eq(toFixed(1.005, 2), '1.01');
        eq(toFixed(1.0005, 3), '1.001');
        eq(toFixed(1005, 0), '1005');
        eq(toFixed(103.2, 4), '103.2000');
        eq(toFixed(10.235, 2), '10.24');
        eq(toFixed(0.615, 2), '0.62');
    }
});
