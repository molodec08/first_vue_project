import '../scss/style.scss';

const App = {
    data() {
        return {
            pageList: [],
            newPageName: ''
        }        
    },
    created() {
            this.updatePageList();
    },
    methods:{
        createPage() {
            const test = new FormData();
            test.set( "name", this.newPageName );
            fetch('./api/createNewHTMLPage.php', {
                method: 'POST',
                body: test
            })
            .then((response) => {
                if (!response.ok) {
                    // Сервер вернул код ответа за границами диапазона [200, 299]
                    alert("Ошибка! Такая страница уже существует!")
                } else {
                    this.updatePageList();
                } 
            })
        },
        updatePageList() {
            fetch("./api", {method: 'get'})
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.pageList = data;
            })
        },
        deleteBlock(page) {
            const test = new FormData();
            test.set( "name", page );
            fetch('./api/deleteHTMLPage.php', {
                method: 'POST',
                body: test
            })
            .then((response) => {
                this.updatePageList();        
            })
        }
    }
}

Vue.createApp(App).mount('#app');

