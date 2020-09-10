// helpers 

// returns random integer from range
getRandomArbitrary = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

// callback function to unique array values
onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
}


// Select and optons generating 

const selectElement = document.createElement("select")
selectElement.setAttribute("id", "AvailableFilms")
const selectItem = document.getElementById("select-film").appendChild(selectElement)

// json parser imitation 
const availableFilms = [
    { name: "Tenet", value: 12 },
    { name: "The Prestige", value: 7 },
    { name: "Interstellar", value: 9 },
    { name: "Inception", value: 11 }
]

availableFilms.forEach(
    film => {
        let option = document.createElement("option")
        option.text = `${film.name} ${film.value}$`
        option.value = film.value
        selectItem.add(option)
    }
)


// generates 5-10 occupied seats
TOINDEX = 7
const seatsElement = document.getElementById("seats")
const rows = seatsElement.querySelectorAll('.row')

function generateOccupied() {
    let seatRows = rows.length
    let seatCols = seatsElement.querySelector('.row').childElementCount
    let amountOfOccupied = getRandomArbitrary(5, 10)

    // returns amount of seats in current case
    function amountOfSeats() {
        return seatRows * seatCols
    }

    // return an array of integers - seats which must be occupied 
    function occupiedSeats() {
        array = Array.from(Array(amountOfOccupied)).map(x => getRandomArbitrary(0, amountOfSeats()))
        return array.filter(onlyUnique);
    }

    // occupies seat with passed coordinates
    function toOccupie(row, seat) {
        rowNumber = rows
        seatNumber = rowNumber[row].querySelectorAll('.seat')
        seatNumber[seat].classList.add('occupied')
    }
    // makes value compatible with array indexes
    function indexate(col) {

        return col > 0 ? Math.abs(col -= TOINDEX) : Math.abs(col += TOINDEX)
    }

    occupiedSeats().forEach(
        seatNumber => {
            let row = Math.floor(seatNumber / (seatRows + 2))
            let col = Math.floor((seatNumber) - row * seatCols)
            col = indexate(col)
            toOccupie(row, col)
        }
    )
}

generateOccupied()

// select seats

const container = document.querySelector('#seats');
const seatCounter = document.getElementById('seat-counter')
const count = document.getElementById('count')
const total = document.getElementById('total')

function updateCounter() {
    selectedAmount = seatsElement.querySelectorAll('.seat.selected').length
    count.textContent = selectedAmount
    total.textContent = selectElement.value * selectedAmount
}

function isVacantSeat(element) {
    return element.target.classList.contains('seat') && !element.target.classList.contains('occupied')
}

container.addEventListener('click', element => {
    if (isVacantSeat(element)) {
        element.target.classList.toggle('selected');
        updateCounter()
    }
});

selectItem.addEventListener('change', (event) => updateCounter())