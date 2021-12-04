function ageInDays()
{
    //Get month, day, and year from user
    let monthString = prompt('What month were you born?');
    let birthMonth = monthNum(monthString);
    let birthDay = prompt('What day were you born?');
    let birthYear = prompt('What year were you born?');

    let startDate = new Date(birthMonth + '/' + birthDay + '/' + birthYear);
    let today = new Date(currentDay());

    let differenceInTime = today.getTime() - startDate.getTime();
    let differenceInDays = differenceInTime / (1000 * 3600 * 24);

    let h1 = document.createElement('h1');
    let textAnswer = document.createTextNode('You are ' + differenceInDays + ' days old! Wow!');

    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flexBoxResult').appendChild(h1);
}

function currentDay()
{
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    return today;
}

function monthNum(str)
{
    switch (str)
    {
        case 'January': return 1;
        case 'February': return 2;
        case 'March': return 3;
        case 'April': return 4;
        case 'May': return 5;
        case 'June': return 6;
        case 'July': return 7;
        case 'August': return 8;
        case 'September': return 9;
        case 'October': return 10;
        case 'November': return 11;
        case 'December': return 12;
        default: alert("Type the full month as a string");
    }
}

function reset()
{
    document.getElementById('ageInDays').remove();
}