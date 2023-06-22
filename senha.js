// Password check functions
function inPwRange(pw) {
    return pw.length >= 8 && pw.length <= 250; // checks range
};

function correctLength(pw1, pw2) {
    return inPwRange(pw1) && inPwRange(pw2); // checks range for both pws
};

function validatePw(event) { // function called when user clicks button-box element in html
    event.preventDefault()
    let pw = document.getElementById('pw').value;
    let confirm = document.getElementById('confirm-pw').value;
    let pwErrorCharsText = document.getElementById('erro-chars');
    let pwErrorEqualText = document.getElementById('erro-igual');

    // setting default error message styles
    pwErrorCharsText.style.display = "none";
    pwErrorEqualText.style.display = "none";

    if (!correctLength(pw, confirm)) { 
        pwErrorCharsText.style.display = "inline";
        return false;
    } if (pw !== confirm) {
        pwErrorEqualText.style.display = "inline";
        return false;
    }
    return true;
};