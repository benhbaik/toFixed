(function() {
    var view = {
        render: function(tests, failures) {
            var numberOfTests = Object.keys(tests).length;
            var successes = numberOfTests - failures;
            var summaryString = 'Ran ' + numberOfTests + ' tests: ' + successes + ' successes, ' + failures + ' failures.';
            var summaryElement = document.createElement('h1');

            setTimeout(function() {
                if (window.document && document.body) {
                    document.body.style.backgroundColor = (failures === 0 ? '#99ff99' : '#ff9999');
                    summaryElement.textContent = summaryString;
                    document.body.appendChild(summaryElement);
                }
            }, 0);
        }
    }
    var ittyBittyTest = {
        run: function(tests) {
            var failures = 0;
            for (var testCase in tests) {
                var testAction = tests[testCase];
                try {
                    testAction();
                    console.log('%c' + testCase, "color: green;");
                } catch(e) {
                    failures++;
                    console.groupCollapsed('%c' + testCase, "color: red;");
                    console.error(e.stack);
                    console.groupEnd();
                }
            }
            view.render(tests, failures);
        },
        fail: function() {
            throw new Error('Default fail.');
        },
        assert: function (valueOne) {
            if (!valueOne) {
                throw new Error();
            }
        },
        assertStrictEquals: function(actualValue, expectedValue) {
            if (actualValue !== expectedValue) {
                throw new Error(actualValue + ' does not equal ' + expectedValue + '.');
            }
        },
        assertArrayDeepEquals: function(actualArray, expectedArray) {
            if (!actualArray || !expectedArray) {
                throw new Error('One or both of the arguments are undefined.');
            }
            if ( !(actualArray instanceof Array) || !(expectedArray instanceof Array) ) {
                throw new Error('One or both of the arguments is not an array');
            }
            if (actualArray.length !== expectedArray.length) {
                throw new Error(actualArray + ' does not equal ' + expectedArray + '.');
            }
            for (var i = 0; i < actualArray.length; i++) {
                var currentActualVal = actualArray[i];
                var currentExpectedVal = expectedArray[i];

                if (currentActualVal instanceof Array && currentExpectedVal instanceof Array) {

                     if ( this.assertArrayDeepEquals(currentActualVal, currentExpectedVal) ) {
                         throw new Error(actualArray + ' does not equal ' + expectedArray + '.');
                     }
                     continue;

                }
                if ((typeof currentActualVal === 'object') !== (typeof currentExpectedVal === 'object')) {
                    throw new Error(actualArray + ' does not equal ' + expectedArray + '.');
                }
                if (typeof currentActualVal === 'object' && typeof currentExpectedVal === 'object') {
                    this.assertObjectDeepEquals(currentActualVal, currentExpectedVal);
                }
                if ((typeof currentActualVal !== 'object') && (typeof currentExpectedVal !== 'object')) {

                    if (currentActualVal !== currentExpectedVal) {
                        throw new Error(actualArray + ' does not equal ' + expectedArray + '.');
                    }

                }
            }
        },
        assertObjectDeepEquals: function(actualObject, expectedObject) {
            if (!actualObject || !expectedObject) {
                throw new Error('One or both of the arguments are undefined.');
            }
            if ( !(actualObject instanceof Object) || !(expectedObject instanceof Object) ) {
                throw new Error('One or both of the arguments is not an object.');
            }
            if (Object.keys(actualObject).length !== Object.keys(expectedObject).length) {
                throw new Error(actualObject + ' does not equal ' + expectedObject + '.');
            }
            for (var prop in actualObject) {
                var actualPropVal = actualObject[prop];
                var expectedPropVal = expectedObject[prop];

                if ( !expectedObject.hasOwnProperty(prop) ) {
                    throw new Error(actualObject + ' does not equal ' + expectedObject + '.');
                }
                if (actualPropVal instanceof Array !== expectedPropVal instanceof Array) {
                    throw new Error(actualObject + ' does not equal ' + expectedObject + '.');
                }
                if (actualPropVal instanceof Array && expectedPropVal instanceof Array) {
                    this.assertArrayDeepEquals(actualPropVal, expectedPropVal);
                }
                switch (typeof actualPropVal) {
                    case 'object':
                        if ( !(actualPropVal instanceof Array) ) {

                            if ( !(this.assertObjectDeepEquals(actualPropVal, expectedPropVal)) ) {
                                throw new Error(actualObject + ' does not equal ' + expectedObject + '.');
                            }

                        }
                        break;
                    case 'function':
                        if ( (actualPropVal.toString() !== expectedPropVal.toString()) ) {
                            throw new Error(actualObject + ' does not equal ' + expectedObject + '.');
                        }
                        break;
                    default:
                        if (actualPropVal !== expectedPropVal) {
                            throw new Error(actualObject + ' does not equal ' + expectedObject + '.');
                        }
                }
            }
        }
    }
    window.fail     = ittyBittyTest.fail.bind(ittyBittyTest);
    window.tests    = ittyBittyTest.run.bind(ittyBittyTest);
    window.eq       = ittyBittyTest.assertStrictEquals.bind(ittyBittyTest);
    window.assert   = ittyBittyTest.assert.bind(ittyBittyTest);
    window.arrayEq  = ittyBittyTest.assertArrayDeepEquals.bind(ittyBittyTest);
    window.objectEq = ittyBittyTest.assertObjectDeepEquals.bind(ittyBittyTest);
}());
