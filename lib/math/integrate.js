/**
 * Integrate using Simpson's 1/3 rule
 * @private
 * @param {number[]} x - Values to integrate over. Length must be >= 3 and odd
 */
function simpsons13(x) {
    if(x.length % 2 == 0) {
        throw new Error('Array length must be odd');
    }

    // If only 0 or 1 points, return an area of 0, as need a minimum of 2 points to integrate
    if(x.length < 2) {
        return 0;
    }

    /*
    Area under quadratic of points (a, b, c) is (a + 4b + c)/3
    (integrate from 0 to 2 (x = 0, x = 1, and x = 2 for the three array indices) and you'll end up with above formula)
    We can combine segments to get area over a larger area
    So, the area of (a, b, c, d, e) becomes:
    area(a, b, c) + area(c, d e) = (a + 4b + c)/3 + (c + 4d + e)/3 = (a + 4b + 2c + 4d + e) / 3
    This reduces to not scaling the first and last value and scaling alternating middle values by 4 and 2, then sum and divide by 3
    */

    let area = x[0] + x[x.length - 1];

    for(let i = 1; i < x.length - 1; i += 2) {
        area += 4 * x[i];
    }

    for(let i = 2; i < x.length - 1; i += 2) {
        area += 2 * x[i];
    }

    area /= 3;

    return area;
}

/**
 * Integrate using Simpson's 3/8ths rule
 * @private
 * @param {number[]} x - Values to integrate over. Length must be >= 4 and (length - 1) must be a multiple of 3
 */
function simpsons38(x) {
    if(x.length < 4 || (x.length - 1) % 3 != 0) {
        throw new Error('Array length - 1 must be a multiple of 3 and must be at least 4');
    }

    // Extending the 1/3rd rule, we can also do 4 points instead of 3
    // Formula for area under 4 points is (1a + 3b + 3c + 1d) * 3/8
    // When doing more than 4, the last point overlaps, so pattern of coefficients becomes 1 3 3 2 3 3 2 3 3 ... 1

    // Handle the first and last value with coefficient of 1
    let area = x[0] + x[x.length - 1];

    // Handle the first '3 coefficient'
    for(let i = 1; i < x.length - 1; i += 3) {
        area += 3 * x[i];
    }

    // Handle the second '3 coefficient'
    for(let i = 2; i < x.length - 1; i += 3) {
        area += 3 * x[i];
    }

    // Handle the '2 coefficient'
    for(let i = 3; i < x.length - 1; i += 3) {
        area += 2 * x[i];
    }

    area *= (3 / 8);

    return area;
}

/**
 * Integrate over discrete values
 * Private right now for internal use, as still settling on usage
 * @memberof module:bcijs
 * @private
 * @param {number[]} x - Values to integrate over
 * @param {Object} [options]
 * @param {string} [options.rule='1/3'] - 'trapz' for trapezoid rule, '1/3' for Simpson's 1/3rd rule, or '3/8' for Simpson's 3/8ths rule. Default is '3/8' as it is generally the most accurate.
 * @param {number} [options.dx=1] - Spacing between integration points. Defaults to 1.
 * @returns {number} The area under the curve
 * 
 * @example
 * let x = [1,5,2,6,10,11];
 * let area = integrate(x, {rule: 'trapz'}); // 29
 */
function integrate(x, options) {
    // Default options
    let {rule, dx} = Object.assign({
        rule: '1/3',
        dx: 1
	}, options);

    // Check the rule is valid
    let rules = ['trapz', '1/3', '3/8'];
    if(rules.indexOf(rule) == -1) {
        throw new Error(`Passed rule must be '1/3' or '3/8'`);
    }

    // Need at least 2 points to integrate
    if(x.length < 2) {
        return 0;
    }

    // Fall back to trapezoid rule if only 2 points
    if(x.length == 2) {
        return (x[0] + x[1]) / 2 * dx;
    }

    // Trapezoid rule
    else if(rule == 'trapz') {
        let area = 0;
        for(let i = 1; i < x.length; i++) {
            area += x[i - 1] + x[i];
        }
        area /= 2;
        return area * dx;
    }

    // Simpson's 1/3rd rule (needs at least 3 points)
    else if(rule == '1/3') {
        // Simpson's 1/3rd rule requires an odd number of points
        if(x.length % 2 == 1) {
            return simpsons13(x) * dx;
        } else {
            /*
            If we get an even number of points, we can split the array to solve the issue.
            Integrate last 4 points with 3/8ths rule, this leaves an odd number of points
            at the beginning which we can integrate with 1/3rd rule. Then combine.
            */

            let left = x.slice(0, x.length - 3);
            let right = x.slice(x.length - 4);

            return (simpsons13(left) + simpsons38(right)) * dx;
        }
    }

    // Simpson's 3/8ths rule (needs at least 4 points)
    else if(rule == '3/8') {
        if(x.length == 3) {
            // Fall back to 1/3rd rule as need a minimum of 4 for 3/8ths rule
            return simpsons13(x) * dx;
        }
        // Simpson's 3/8ths rule requires (length - 1) be a multiple of 3
        else if((x.length - 1) % 3 == 0) {
            return simpsons38(x) * dx;
        }
        // We can split up array to make one segment have the right number and use a fall back method for the remaining
        else {
            // How many values can we fit if we need length - 1 to have multiple of 3?
            let n = Math.floor((x.length - 1) / 3) * 3 + 1;

            let left = x.slice(0, n);

            // Will be either 2 values long (use trapezoid) or 3 values long (use 1/3rd rule)
            let right = x.slice(n - 1);

            return simpsons38(left) * dx + integrate(right, {rule: rule, dx: dx});
        }
    }
}

module.exports = integrate;
