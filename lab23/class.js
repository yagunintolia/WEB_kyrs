class ElectricityStation {
    constructor() {
        this.power = this.generatePower();
    }
    generatePower() {
        return Math.ceil(Math.random() * 100);
    }
}

class SolarPanel {
    constructor() {
        this.power = this.generatePower();
    }
    generatePower() {
        return Math.ceil(Math.random() * 5);
    }
}

class Building {
    constructor(apartmentsNum) {
        this.consumption = 4;
        this.apartmentsNum = apartmentsNum >= 1 && apartmentsNum <= 400 ? Math.trunc(apartmentsNum) : 400;
    }
}

class ElectricalLine {
    constructor(capacity, pricePerMegaWatt) {
        this.capacity = capacity;
        this.pricePerMegaWatt = pricePerMegaWatt;
    }
}

class ElectricalGrid {
    constructor() {
        this.elements = [];
    }
    addElement(el) {
        return this.elements.push(el);
    }
    totalDemand() {
        let totalDayDemand = 0;
        let totalNightDemand = 0;
        this.elements.forEach((element) => {
            if (element instanceof Building) {
                totalDayDemand += element.apartmentsNum * element.consumption;
                totalNightDemand += element.apartmentsNum;
            }
        });
        return { day: totalDayDemand, night: totalNightDemand };
    }
    totalSupply() {
        let totalDailySupply = 0;
        let totalNightSupply = 0;
        this.elements.forEach((element) => {
            if (element instanceof ElectricityStation) {
                totalDailySupply += element.power;
                totalNightSupply += element.power;
            } else if (element instanceof SolarPanel) {
                totalDailySupply += element.power;
            }
        });
        return { day: totalDailySupply, night: totalNightSupply };
    }
    isEnough() {
        const totalDemand = this.totalDemand();
        const totalSupply = this.totalSupply();
        const dayDifference = totalSupply.day - totalDemand.day;
        const nightDifference = totalSupply.night - totalDemand.night;
        if (dayDifference >= 0) {
            console.log('Енергії достатньо для дня.\nМожемо продавати надлишок');
            console.log(
                'Маємо ' + dayDifference + ' Мегаватт надлишкової енергії вдень'
            );
            this.sellEnergy(dayDifference);
        } else {
            console.log('Енергії недостатньо для дня.\nПотрібно купити ще');
            console.log(
                'Не вистачає ' +
                Math.abs(dayDifference) +
                ' Мегаватт енергії вдень'
            );
            this.buyEnergy(dayDifference);
        }
        if (nightDifference >= 0) {
            console.log('Енергії достатньо для ночі.\nМожемо продавати надлишок');
            console.log(
                'Маємо ' + nightDifference + ' Мегаватт надлишкової енергії вночі'
            );
            this.sellEnergy(nightDifference);
        } else {
            console.log('Енергії недостатньо для ночі.\nПотрібно купити ще');
            console.log(
                'Не вистачає ' +
                Math.abs(nightDifference) +
                ' Мегаватт енергії вночі'
            );
            this.buyEnergy(nightDifference);
        }
    }
    sellEnergy(energyAmount) {
        let profit = 0;
        if (energyAmount === 0) {
            console.log("Енергії рівно стільки, скільки потрібно. Немає надлишку для продажу.");
            profit = 0;
            return profit;
        }
        let electricalLines = this.elements.filter(
            (el) => el instanceof ElectricalLine
        );
        electricalLines.sort((a, b) => b.pricePerMegaWatt - a.pricePerMegaWatt);
        if (electricalLines.length > 0) {
            const lineToSell = electricalLines[0];
            const energySold = Math.min(energyAmount, lineToSell.capacity);
            profit = energySold * lineToSell.pricePerMegaWatt;
        }
        console.log('Можемо продати всю надлишкову енергію за ' + profit + ' доларів');
        return profit;
    }
    buyEnergy(energyAmount) {
        let expenses = 0;
        const electricalLines = this.elements.filter(
            (el) => el instanceof ElectricalLine
        );
        electricalLines.sort((a, b) => b.pricePerMegaWatt - a.pricePerMegaWatt);
        if (electricalLines.length > 0) {
            const lineToSell = electricalLines[0];
            const energyToBuy = Math.min(energyAmount, lineToSell.capacity);
            expenses = energyToBuy * lineToSell.pricePerMegaWatt;
        }
        console.log(
            'Можемо купити потрібну енергію за ' + Math.abs(expenses) + ' доларів'
        );
        return expenses;
    }
}

const grid = new ElectricalGrid();
grid.addElement(new Building(20));
grid.addElement(new Building(5));
grid.addElement(new ElectricityStation());
grid.addElement(new ElectricityStation());
grid.addElement(new SolarPanel());
grid.addElement(new SolarPanel());
grid.addElement(new SolarPanel());
grid.addElement(new ElectricalLine(500, 10));
grid.addElement(new ElectricalLine(500, 400));
grid.addElement(new ElectricalLine(100, 1));
console.log(grid.isEnough());
