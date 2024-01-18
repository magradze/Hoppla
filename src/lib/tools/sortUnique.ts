export const sortUnique = (arr: any) => {
    return arr.sort().filter(function (el: any, i: any, a: any) {
        return (i === a.indexOf(el));
    });
}