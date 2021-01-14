import '../scss/style.scss'

const addPage = document.getElementsByClassName('add');

function getPagesList() {
    const allBlock = document.querySelectorAll('div');
    if (allBlock !== null) {
        allBlock.forEach( e => e.remove() );
    }


    fetch("./api", {method: 'get'})
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            data.forEach((file) => {
                const div = document.createElement('div');
                div.classList.add('block');
                div.innerHTML = `<h1>${file}</h1><button class="deleteButton" type="button" id=${file}>Удалить</button>`;
                document.querySelector('body').append(div);
                
            }); 

            const deleteBlock = document.querySelectorAll('.deleteButton');
                console.log(deleteBlock); 
                
            deleteBlock.forEach(e => e.addEventListener('click', () => {
                const test = new FormData();
                test.set( "name", e.id );
                fetch('./api/deleteHTMLPage.php', {
                    method: 'POST',
                    body: test
                })
                .then((response) => {
                    console.log(response.text());
                    if (!response.ok) {
                        // Сервер вернул код ответа за границами диапазона [200, 299]
                        alert("Ошибка! Такая страница уже существует!")
                    } else {
                        getPagesList();
                    }        
                })
            }))
        });

    

}

getPagesList();

addPage[0].addEventListener('click', () => {
    const test = new FormData();
    test.set( "name", document.querySelector('input').value );
    
    fetch('./api/createNewHTMLPage.php', {
        method: 'POST',
        body: test
    })
    .then((response) => {
        if (!response.ok) {
            // Сервер вернул код ответа за границами диапазона [200, 299]
            alert("Ошибка! Такая страница уже существует!")
        } else {
            getPagesList();
        }        
    })
    // .catch(() => alert("Ошибка! Такая страница уже существует!"))
});

