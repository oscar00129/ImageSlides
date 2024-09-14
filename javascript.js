const app = Vue.createApp({
    data() {
        return {
            images: [],
            currentImage: 0
        }
    },
    methods: {
        inputChanged(event){
            var files = event.target.files || event.dataTransfer.files;
            if (files && files.length){
                for( let i=0; i<files.length; i++ ){
                    var reader = new FileReader();
                    reader.onload = (evt) => {
                        this.images.push({
                            name: files[i].name,
                            img: evt.target.result
                        })

                        this.images.sort((a, b) => {
                            if (a.name < b.name) {
                                return -1;
                            }
                            if (a.name > b.name) {
                                return 1;
                            }
                            return 0;
                        });
                    }
                    reader.readAsDataURL(files[i]);
                }
            }
            else {
                return;
            }
            window.setInterval(() => {
                this.currentImage++;
                if(this.currentImage >= this.images.length)
                    this.currentImage = 0;
            }, 20000);
        }
    }
})

app.mount('#app');