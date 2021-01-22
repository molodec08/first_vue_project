import '../scss/style.scss';
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
const axios = require("axios");
const UIkit = require("uikit");
// const fas = require("@fortawesome/fontawesome-free")
const Editor = require("./editor");

window.editor = new Editor();

const App = {
    data() {
        return {
            page: "index.html",
            showLoader: true,
            pageList: [],
            backupList: []
        }        
    },
    methods: {
        onBtnSave() {
            this.showLoader = true;
            window.editor.save(
                () => {
                    this.loadBackupList();
                    this.showLoader = false;
                    UIkit.notification({message: 'Успешно сохранено!', status: 'success'})
                },
                () => {
                    this.showLoader = false;
                    UIkit.notification({message: 'Ошибка сохранения!', status: 'danger'})
                },
            )
        },

        openPage(page) {
            this.page = page;
            this.loadBackupList();
            this.showLoader = true;
            window.editor.open(page, () => {
                this.showLoader = false;
            });
        },

        loadBackupList() {
            axios
                .get("./backups/backups.json")
                .then((res) => {
                    this.backupList = res.data.filter((backup) => {
                        return (backup.page === this.page)
                    });
                })
        },

        restoreBackup(backup) {
            UIkit.modal.confirm("Вы действительно хотите восстановить страницу из этой резеврной копии? Все не сохранённые изменения будут утеряны!",
                { labels: { ok: "Восстановить", cancel: "Отмена" } })
            .then(() => {
                this.showLoader = true;
                return axios.post("./api/restoreBackup.php", {  "page": this.page, "file": backup.file });
            })
            .then(() => {
                window.editor.open(this.page, () => {
                    this.showLoader = false;
                });
            })
        }
    },
    created() {
        window.editor.open(this.page, () => {
            this.showLoader = false;
        });
        axios
            .get("./api/pageList.php")
            .then((res) => {
                this.pageList = res.data;
            });
        this.loadBackupList();
    }
}

Vue.createApp(App).mount('#app');
