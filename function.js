var years = 0
var corn = 6000
var citizens = 100
var fields = 400
var HarvestPerField
var PricePerField = 5
var end = false

concludeData()

monitor.addEventListener("click", startGame);

function startGame () {
    if (end != true) {
        years += 1
        calcHarvestSuccess()
        parseInput()
        calcFieldPrice()
        concludeData()
        checkGame()
    }
}

function calcHarvestSuccess () {
    HarvestPerField = Math.round(Math.random() * 5 + Math.random() * 5 + 0.5)
}

function calcFieldPrice () {
    PricePerField = Math.round(Math.random() * 10 + 0.5)
    if (Math.random() > 0.9) {
        PricePerField = Math.round(Math.random() * 15 + 0.5)
    }
}

function parseInput() {
    var input = prompt("Make your decisions, honored ruler", "Food, Seed, Land trade")
    var commands = input.split(",")

    var sharedCorn = parseInt(commands[0])
    var seededCorn = parseInt(commands[1])
    var tradedLand = parseInt(commands[2])

    if (isNaN(sharedCorn) || sharedCorn < 0) {
        sharedCorn = 0
    }
    if (isNaN(seededCorn) || seededCorn < 0) {
        seededCorn = 0
    }
    if (isNaN(tradedLand)) {
        tradedLand = 0
    }

    calcCitizens(sharedCorn)
    calcHarvest(seededCorn)
    calcFields(tradedLand)
    
}

function calcCitizens (food) {
    if (food > corn) {
        food = corn
    }

    corn -= food
    var adequateFood = Math.round(food / 20) - citizens

    var newCitizens = 0
    if (adequateFood > 0) {
        newCitizens = adequateFood / 2
    }

    var starvedCitizens = 0
    if (adequateFood < 0) {
        starvedCitizens = Math.abs(adequateFood)
    }

    citizens = Math.round(citizens + newCitizens - starvedCitizens)
}

function calcHarvest (seed) {
    if (seed > corn) {
        seed = corn
    }
    corn -= seed
    var possibleSeed = parseInt(seed / 2)

    if (possibleSeed > fields) {
        possibleSeed = fields
    }
    if (possibleSeed > citizens * 10) {
        possibleSeed = citizens * 10
    }

    harvestedSeed = possibleSeed * HarvestPerField
    corn += harvestedSeed
}

function calcFields (trade) {
    if (trade < 0) {
        var toSell = Math.abs(trade)
        if (toSell > fields) {
            return;
        } else {
            fields -= toSell
            corn += toSell * PricePerField
        }
    }

    if (trade > 0) {
        if (trade * PricePerField > corn) {
            alert("Not enough corn to buy " + trade + " fields of land!")
            return;
        } else {
            fields += trade
            corn -= trade * PricePerField
        }
    }
}

function concludeData () {
    var status
    switch (HarvestPerField) {
        case 1:
            status = "Stormes and strong rainfalls destroyed most of your harvest."
            break;
        case 2:
        case 3:
            status = "The weather was bad."
            break;
        case 6:
        case 7:
            status = "The weather was good and the harvest plenty."
            break;
        case 8:
        case 9:
        case 10:
            status = "The weather was very good and the harvest excellent."
            break;
        case 4:
        case 5:
        default:
            status = "The weather was normal."
            break;
    }
    var info = "Wise ruler Hammurabi!<br>"
    info += "We are writing the year " + years + " of your leadership.<br><br>"
    info += citizens + " citizens are under your command.<br>"
    info += status + "<br>" + corn + " bushels of corn are beeing stored  in your corn chambers.<br>"
    info += fields + " fields of land are in your possession.<br>"
    info += PricePerField + " bushels of corn costs one field of land."
    monitor.innerHTML = info
    return;
}

function checkGame() {
    var text="<br>"
    if (citizens < 1) {
        end = true
        text += "You have not enough citizens to harvest your corn. "
    }
    if (fields < 1) {
        end = true
        text += "You have not enough fields to see your corn. "
    }
    if (corn < 1) {
        end = true
        text += "Your stock of corn is empty. "
    }
    if (years > 20 && end == false) {
        end = true
        text = "After 20 years your time as a ruler has come to an end.<br>Your name shall be praised forever! You have ruled wise and fair. "
    }
    if (end) {
        text = "<br><br>Your leadership has ended now. " + text
        monitor.innerHTML = monitor.innerHTML + text
    }
}