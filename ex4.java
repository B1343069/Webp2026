function repeatchar(n, arg_char) {
    let result = "";
    for (let i = 0; i < n; i++) {
        result += arg_char;
    }
    return result;
}
function printTreeTop(n) {
    for (let i = 0; i < n; i++) {
        let spaces = repeatchar(n - 1 - i, ' ');
        let stars = repeatchar(2 * i + 1, '*');
        console.log(spaces + stars);
    }
}
function printTreeBottom(n) {
    for (let i = 0; i < 3; i++) {
        let spaces = repeatchar(n - 1, ' ');
        console.log(spaces + '*');
    }
}
function tree(n) {
    printTreeTop(n);
    printTreeBottom(n);
}

// °õ¦æ
tree(4);