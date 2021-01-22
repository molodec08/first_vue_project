import '../scss/style.scss';

const UIkit = require("uikit");
// const Vue = require("vue");
const Editor = require("./editor");

window.editor = new Editor();

const App = {
    data() {
        return {
            showLoader: true
        }        
    },
    methods: {
        onBtnSave() {
            this.showLoader = true;
            window.editor.save(
                () => {
                    this.showLoader = false;
                    UIkit.notification({message: 'Успешно сохранено!', status: 'success'})
                },
                () => {
                    this.showLoader = false;
                    UIkit.notification({message: 'Ошибка сохранения!', status: 'danger'})
                },
            )
        },
    },
    created() {
        window.editor.open("index.html", () => {
            this.showLoader = false;
        });
    }
}

Vue.createApp(App).mount('#app');
