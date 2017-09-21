/**
 * Created by Oluwasegun Somefun on 21.9.17.
 */

"use strict";

function arrGeo(array) {
    // AP
    let arithmetic = isAP(array);
    // GP
    let geometric = isGP(array);

    return arithmetic && geometric ? 'Arithmetic and Geometric'
        : arithmetic ? 'Arithmetic'
            : geometric ? 'Geometric'
                : arithmetic === 0 || geometric === 0 ? 0
                    : -1;

}

function isAP(array) {
    /*
     * The AP of a sequence is specified by its first term, 'a', a common difference, 'd'
     * and the length, 'n' of the sequence: a + (n-1)d
     */
    let arith_array = Array.from(array);
    let array_length = arith_array.length;

    let isArithmetic = false;
    
    if ( (!Array.isArray(arith_array) || !array_length ) || arith_array < 3 ) {
        console.error("Either Progression Array is empty OR Array must contains less than 3 terms.");
        return 0;
    }

    let multiplier =  Math.pow(10,10); // used to prevent floating point errors in javascript

    // common difference
    let comm_diff = Math.trunc((arith_array[1] - arith_array[0]) * multiplier) / multiplier;
    //console.log(comm_diff);

    // difference between the second term and third term value
    let first_diff = Math.trunc((arith_array[2] - arith_array[1]) * multiplier) / multiplier;
    //console.log(first_diff);

    // difference between the second-to-the-last term and last term value
    let last_diff = Math.trunc((arith_array[array_length-1] - arith_array[array_length-2]) * multiplier) / multiplier;
    //console.log(last_diff);

    // maximum difference in the sequence, i.e difference between the last term and the first term
    let max_diff = Math.trunc((arith_array[array_length-1] - arith_array[0]) * multiplier) / multiplier;
    //console.log(max_diff);
    //console.log(Math.round(max_diff/comm_diff)); console.log(array_length-1);

    // To be an AP: All the first and last difference must be equal to the common difference
    // and the ratio of the max-difference of the sequence and the common difference of the sequence
    // should be a multiple of the common-difference equal to the zero-index of the last term in the sequence

    // For GPs: the log of its terms must also satisfy this condition

    if ( first_diff === comm_diff && last_diff === comm_diff &&
        Math.round(max_diff / comm_diff) === (array_length-1) ) {

        isArithmetic = true;
        //console.log(isArithmetic);
    }

    // else the progression type is false
    return isArithmetic;
}

function isGP(array) {
    /*
     * A GP is an AP in the element-wise logarithm of the sequence.
     * This means we can find the GP like the AP in linear time.
     */
    return isAP(Array.from(array, (i) => Math.log(i)));

}