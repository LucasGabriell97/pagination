// Add item list on screen
const data = []

for (let i = 0; i < 100; i++) {
    data.push(`Item ${(i + 1)}`)
}

let perPage = 5
const state = {
    page: 1,
    perPage,
    totalPage: Math.ceil(data.length / perPage),
    maxVisibleNumbers: 5
}

const getFirst = document.querySelector('.first')
const getLast = document.querySelector('.last')
const getNext = document.querySelector('.next')
const getPrev = document.querySelector('.prev')

const controls = {
    next() {
        state.page++

        const lastPage = state.page > state.totalPage
        if(lastPage) {
            state.page--
        }
    },
    prev() {
        state.page--

        if(state.page < 1) {
            state.page++
        }
    },
    goTo(page) {
        if(page < 1) {
            page = 1
        }

        state.page = +page

        if(page > state.totalPage) {
            state.page = state.totalPage
        }
    },
    createListeners() {
        getFirst.addEventListener('click', () => {
            controls.goTo(1)
            update()
        })

        getLast.addEventListener('click', () => {
            controls.goTo(state.totalPage)
            update()
        })

        getNext.addEventListener('click', () => {
            controls.next()
            update()
        })

        getPrev.addEventListener('click', () => {
            controls.prev()
            update()
        })
    }
}

const list = {
    create(item) {
        const div = document.createElement('div')
        getList = document.querySelector('.list')

        div.classList.add('item')
        div.innerHTML = item

        getList.appendChild(div)
    },
    update() {
        const getList = document.querySelector('.list')
        getList.innerHTML = ""

        let page = state.page - 1
        let start = page * state.perPage
        let end = start + state.perPage

        const paginatedItems = data.slice(start, end)

        paginatedItems.forEach(list.create)
    }
}

const buttons = {
    create(number) {
        const button = document.createElement('div')

        button.innerHTML = number;

        if(state.page == number) {
            button.classList.add('active')
        }

        getNumbers = document.querySelector('.numbers')

        getNumbers.addEventListener('click', (event) => {
            const page = event.target.innerText

            controls.goTo(page)
            update()
        })

        getNumbers.appendChild(button)
    },
    update() {
        let getNumbers = document.querySelector('.numbers')
        getNumbers.innerHTML = ""
        const {maxLeft, maxRight} = buttons.visibleNumbers()

        for(let page = maxLeft; page <= maxRight; page++) {
            buttons.create(page)
        }
    },
    visibleNumbers() {
        const { maxVisibleNumbers } = state
        let maxLeft = (state.page - Math.floor(maxVisibleNumbers / 2))
        let maxRight = (state.page + Math.floor(maxVisibleNumbers / 2))

        if(maxLeft < 1) {
            maxLeft = 1
            maxRight = maxVisibleNumbers
        }

        if(maxRight > state.totalPage) {
            maxLeft = state.totalPage - (maxVisibleNumbers - 1)
            maxRight = state.totalPage

            if(maxLeft < 1) maxLeft = 1
        }

        return {maxLeft, maxRight}
    }
}

function update() {
    list.update()
    buttons.update()
}

function start() {
    update()
    controls.createListeners()
}

start()
