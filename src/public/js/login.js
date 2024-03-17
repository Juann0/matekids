function sendData() {
    let btnSend = document.getElementById('btnSend');
    let usuario = document.getElementById('usuario').value;
    let password = document.getElementById('password').value;
    if (usuario === "" || password === "") {
        alertify.alert('Campos vacios', 'Por favor ingrese todos los campos del inicio de sesión');
        return false;
    }
    btnSend.innerHTML = `<button class="btn btn-primary" type="button" disabled>
    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    Cargando...
  </button>`
    return true;
}