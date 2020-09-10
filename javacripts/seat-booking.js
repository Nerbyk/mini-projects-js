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

let selectElement = document.createElement("select")
selectElement.setAttribute("id", "AvailableFilms")
let selectItem = document.getElementById("select-film").appendChild(selectElement)

let availableFilms = [
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
const seatsElement = document.getElementById("seats")

function generateOccupied() {
    let seatRows = seatsElement.querySelectorAll('.row').length
    let seatCols = seatsElement.querySelector('.row').childElementCount
    let amountOfOccupied = getRandomArbitrary(5, 10)

    // returns amount of seats in current case
    amountOfSeats = () => {
        return seatRows * seatCols
    }

    // return an array of integers - seats which must be occupied 
    occupiedSeats = () => {
        array = Array.from(Array(amountOfOccupied)).map(x => getRandomArbitrary(0, amountOfSeats()))
        return array.filter(onlyUnique);
    }

    // occupies seat with passed coordinates
    toOccupie = (row, seat) => {
        rowNumber = seatsElement.querySelectorAll('.row')
        seatNumber = rowNumber[row].querySelectorAll('.seat')
        seatNumber[seat].classList.add('occupied')
    }

    occupiedSeats().forEach(
        seatNumber => {
            let row = Math.floor(seatNumber / (seatRows + 2))
            let col = Math.floor((seatNumber) - row * seatCols)
            col > 0 ? col = Math.abs(col -= 7) : col = Math.abs(col += 7)
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

updateCounter = () => {
    selectedAmount = seatsElement.querySelectorAll('.seat.selected').length
    count.textContent = selectedAmount
    total.textContent = selectElement.value * selectedAmount
}

container.addEventListener('click', e => {
    if (
        e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')
    ) {
        e.target.classList.toggle('selected');

        updateCounter()
    }
});