hello = (first,last) =>{
    return "Hello " + first + " " + last;
}


console.log(hello('hussein','hareb'));


const arrayidk = [1,2,3,4,5,6];

evenOrOdd = (number) => {
    if(number%2)
    {
        return 'Odd'
    }
    return 'Even';
}

const newList = arrayidk.map(item => evenOrOdd(item));

console.log(newList);

