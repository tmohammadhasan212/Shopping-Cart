const container = document.getElementsByClassName('container');
let count = 0
const countSpan = document.querySelector('.count');
const modalBody = document.querySelector('.modal-body');
const addButtons = document.getElementsByClassName('add-btn');
const total = document.querySelector('.total span');
let totalOfprices = 0;
let countArray = [0, 0, 0, 0];
// show the items in the basket
const showItem = (title, price, img) => {
        const newItem = document.createElement('div');
        newItem.classList.add('row', 'buy-item');
        const itemContent = `<div class="col-12">
            <div class="row mb-3">
                <div class="col-4 basket-image">
                    <img src="${img}" class="w-100">
                </div>
                <div class="col-8">
                    <div class="basket-info">
                        <div class="basket-title">${title}
                        </div>
                        <div class="basket-price mt-4 ">
                        <span>${price}</span> تومان
                        </div>
                        <div class="mt-4 text-left">
                            <button type="button" class="basket-count btn">1</button>
                            <button type="button" class="delete-count btn"><i class="fa fa-trash" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
        newItem.innerHTML = itemContent;
        modalBody.appendChild(newItem);
        total.innerHTML = totalPrice(price);
        count++;
        countSpan.innerHTML = count;
    }
    //  getting information of every each item and put them in the 'information' object
const getInfo = event => {
        event.preventDefault();
        if(event.target.classList.contains('add-btn')) {
            const information = {
                title: event.target.parentElement.previousElementSibling.innerHTML,
                price: parseInt(event.target.nextElementSibling.firstElementChild.innerHTML),
                imgSource: event.target.parentElement.parentElement.parentElement.parentElement.previousElementSibling.firstElementChild.firstElementChild.firstElementChild.getAttribute('src')
            }
            showItem(information.title, information.price, information.imgSource);
            saveToStorage(information);
        }
    }
    // decrease the number of items in the basket
const decreaseCount = () => {
        count--;
        countSpan.innerHTML = count
    }
    // remove item from the basket
const removeItem = event => {
        //trash icon
        if(event.target.classList.contains('fa-trash')) {
            event.target.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
            let price = parseInt(event.target.parentElement.parentElement.previousElementSibling.firstElementChild.innerHTML);
            decreaseCount();
            total.innerHTML = decreaseTotal((price));
            const img = event.target.parentElement.parentElement.parentElement.parentElement.previousElementSibling.firstElementChild.getAttribute('src');
            removeCourseLS(img);
            console.log(img);
        }
        // button of remove
        if(event.target.classList.contains('delete-count')) {
            event.target.parentElement.parentElement.parentElement.parentElement.remove();
            let price = parseInt(event.target.parentElement.previousElementSibling.firstElementChild.innerHTML);
            decreaseCount();
            total.innerHTML = decreaseTotal((price));
            const img = event.target.parentElement.parentElement.parentElement.previousElementSibling.firstElementChild.getAttribute('src');
            removeCourseLS(img);
            console.log(img);
        }
    }
    // calculate the total price of items in the basket
const totalPrice = num => {
        totalOfprices += num;
        return totalOfprices;
    }
    // calculate the total price after deleting an item
const decreaseTotal = price => {
    let result = parseInt(total.innerHTML) - price;
    return result;
}
const saveToStorage = course => {
        // get array of courses from storage
        let courses = getFromStorage()
            // add the new course to the array of courses
        courses.push(course)
        localStorage.setItem('courses', JSON.stringify(courses));
    }
    // get content from storage
const getFromStorage = () => {
        let courses;
        // if courses exist before
        if(localStorage.getItem('courses') !== null) {
            courses = JSON.parse(localStorage.getItem('courses'))
        } else {
            courses = []
        }
        return courses
    }
    // function for show items in basket afer reloading the website
const showItemFromLsOnLoad = () => {
        const itemsArray = getFromStorage();
        itemsArray.forEach((element, index) => {
            const newItem = document.createElement('div');
            newItem.classList.add('row', 'buy-item');
            const itemContent = `<div class="col-12">
            <div class="row mb-3">
                <div class="col-4 basket-image">
                    <img src="${element.imgSource}" class="w-100">
                </div>
                <div class="col-8">
                    <div class="basket-info">
                        <div class="basket-title">${element.title}
                        </div>
                        <div class="basket-price mt-4 ">
                        <span>${element.price}</span> تومان
                        </div>
                        <div class="mt-4 text-left">
                            <button type="button" class="basket-count btn">1</button>
                            <button type="button" class="delete-count btn"><i class="fa fa-trash" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
            newItem.innerHTML = itemContent;
            modalBody.appendChild(newItem);
            total.innerHTML = totalPrice(element.price);
            count++
        });
        countSpan.innerHTML = count;
    }
    // function for remove an item from localStorage
const removeCourseLS = imgSource => {
    let coursesLS = getFromStorage()
    let i = 0;
    while(coursesLS[i].imgSource !== imgSource) {
        i++;
    }
    coursesLS.splice(i, 1);
    localStorage.setItem('courses', JSON.stringify(coursesLS))
}
container[0].addEventListener('click', getInfo);
modalBody.addEventListener('click', removeItem);
document.addEventListener('DOMContentLoaded', showItemFromLsOnLoad);