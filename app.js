if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./ws.js')
            .then((registration) => {
                console.log('Service Worker registrado', registration.scope);
                
                
                document.getElementById('btnNotificacion').addEventListener('click', () => {
                    if (Notification.permission === "granted") {
                        registration.active.postMessage({ type: 'SHOW_NOTIFICATION' });
                    } else if (Notification.permission !== "denied") {
                        Notification.requestPermission().then(permission => {
                            if (permission === "granted") {
                                registration.active.postMessage({ type: 'SHOW_NOTIFICATION' });
                            }
                        });
                    }
                });
            })
            .catch((error) => {
                console.log('Error al registrar el Service Worker:', error);
            });
    });
}
