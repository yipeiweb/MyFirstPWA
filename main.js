//Service worker
    //Comprueba si existe serviceWorker en tu navegador
    if("serviceWorker" in navigator) {
        //Registrar service worker
        navigator.serviceWorker.register("./serviceWorker.js")
            .then(response => null)
            .catch(error => console.log(error))
    }
