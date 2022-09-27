//tela de login
let Btn = document.querySelector('.fa-eye')

    Btn.addEventListener('click', ()=>{
    let inputSenha = document.querySelector('#senha')
    
    if(inputSenha.getAttribute('type') == 'password'){
        inputSenha.setAttribute('type', 'text')
    } else {
        inputSenha.setAttribute('type', 'password')
    }
    })

    function entrar(){
    let usuario = document.querySelector('#usuario')
    let userLabel = document.querySelector('#userLabel')
    
    let senha = document.querySelector('#senha')
    let senhaLabel = document.querySelector('#senhaLabel')
    
    let msgError = document.querySelector('#msgError')
    let listaUser = []
    
    let userValid = {
        nome: '',
        user: '',
        senha: ''
    }
    
    listaUser = JSON.parse(localStorage.getItem('listaUser'))
    
    listaUser.forEach((item) => {
        if(usuario.value == item.userCad && senha.value == item.senhaCad){
        
        userValid = {
            nome: item.nomeCad,
            user: item.userCad,
            senha: item.senhaCad
        }
        
        }
    })
    
    if(usuario.value == userValid.user && senha.value == userValid.senha){
        window.location.href = './login.html'
        
        let mathRandom = Math.random().toString(16).substr(2)
        let token = mathRandom + mathRandom
        
        localStorage.setItem('token', token)
        localStorage.setItem('userLogado', JSON.stringify(userValid))
    } else {
        userLabel.setAttribute('style', 'color: red')
        usuario.setAttribute('style', 'border-color: red')
        senhaLabel.setAttribute('style', 'color: red')
        senha.setAttribute('style', 'border-color: red')
        msgError.setAttribute('style', 'display: block')
        msgError.innerHTML = 'Usuário ou senha incorretos'
        usuario.focus()
    }
    
    }
//final tela de login

        
        //começo das imagens
        
var VanillaTilt = (function () {
    class t {
    constructor(e, i = {}) {
        (this.updateBind = this.update.bind(this)),
        (this.element = e),
        (this.settings = this.extendSettings(i)),
        (this.fullPageListening = t.isSettingTrue(
        this.settings["full-page-listening"])),
        (this.elementListener = this.getElementListener()),
        this.fullPageListening && this.updateClientSize(),
        this.addEventListeners(),this;
    }
    static isSettingTrue(t) {
    return "" === t || !0 === t || 1 === t;
    }
    getElementListener() {
    if (this.fullPageListening) return window.document;
    }
    addEventListeners() {
        (this.onMouseMoveBind = this.onMouseMove.bind(this)),
        (this.onDeviceOrientationBind = this.onDeviceOrientation.bind(this)),
        this.elementListener.addEventListener("mousemove",this.onMouseMoveBind),
        this && window.addEventListener(
            "deviceorientation",
            this.onDeviceOrientationBind);
    }
    onDeviceOrientation() {
    const a = (this.updateCall = requestAnimationFrame(this.updateBind));
    }
    onMouseMove(t) {
        (this.event = t),
        (this.updateCall = requestAnimationFrame(this.updateBind));
    }
    getValues() {
    let t, e;
    return (
        this.fullPageListening
        ? ((t = this.event.clientX / this.clientWidth),
        (e = this.event.clientY / this.clientHeight))
        : ((t = (this.event.clientX - this.left) / this.width),
        (e = (this.event.clientY - this.top) / this.height)),
        
        {
        tiltX: (
        (this.settings.max - t * this.settings.max * 2)
        ).toFixed(2),
        tiltY: (
        (e * this.settings.max * 2 - this.settings.max)
        )
        }
    );
    }
    update() {
    let t = this.getValues();
    (this.element.style.transform ="perspective(" +this.settings.perspective +"px) rotateX(" +
        ("x" === this.settings.axis ? 0 : t.tiltY) +
        "deg) rotateY(" +
        ("y" === this.settings.axis ? 0 : t.tiltX) +
        "deg) scale3d(" +
        this.settings.scale +
        ", " +
        this.settings.scale +
        ", " +
        this.settings.scale +
        ")"),
        (this.updateCall = null);
    }
updateClientSize() {
    (this.clientWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth),
        (this.clientHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight);
    }
    extendSettings(t) {
    let e = {max: 15,perspective: 1e3,scale: 1,"full-page-listening": !1,},i = {};
    for (var s in e)
        if (s in t) i[s] = t[s];
        else if (this.element.hasAttribute("data-tilt-" + s)) {
        let t = this.element.getAttribute("data-tilt-" + s);
        try {
            i[s] = JSON.parse(t);
        } catch (e) {
            i[s] = t;
        }
        } else i[s] = e[s];
    return i;
    }
    static init(e, i) {
    e instanceof Node && (e = [e]),
        e instanceof NodeList && (e = [].slice.call(e)),
        e instanceof Array &&
        e.forEach((e) => {
        "vanillaTilt" in e || (e.vanillaTilt = new t(e, i));
        });
    }
}
return (
    "undefined" != typeof document &&((window.VanillaTilt = t),
    t.init(document.querySelectorAll("[data-tilt]"))),
    t
);
})();

//tela de se cadastrar

let btn = document.querySelector('#verSenha')
let btnConfirm = document.querySelector('#verConfirmSenha')


let nome = document.querySelector('#nome')
let labelNome = document.querySelector('#labelNome')
let validNome = false

let usuario = document.querySelector('#usuario')
let labelUsuario = document.querySelector('#labelUsuario')
let validUsuario = false

let senha = document.querySelector('#senha')
let labelSenha = document.querySelector('#labelSenha')
let validSenha = false

let confirmSenha = document.querySelector('#confirmSenha')
let labelConfirmSenha = document.querySelector('#labelConfirmSenha')
let validConfirmSenha = false

let msgError = document.querySelector('#msgError')
let msgSuccess = document.querySelector('#msgSuccess')

    nome.addEventListener('keyup', () => {
    if(nome.value.length <= 2){
        labelNome.setAttribute('style', 'color: red')
        labelNome.innerHTML = 'Nome *Insira no minimo 3 caracteres'
        nome.setAttribute('style', 'border-color: red')
        validNome = false
    } else {
        labelNome.setAttribute('style', 'color: green')
        labelNome.innerHTML = 'Nome'
        nome.setAttribute('style', 'border-color: green')
        validNome = true
    }
    })

    usuario.addEventListener('keyup', () => {
    if(usuario.value.length <= 4){
        labelUsuario.setAttribute('style', 'color: red')
        labelUsuario.innerHTML = 'Usuário *Insira no minimo 5 caracteres'
        usuario.setAttribute('style', 'border-color: red')
        validUsuario = false
    } else {
        labelUsuario.setAttribute('style', 'color: green')
        labelUsuario.innerHTML = 'Usuário'
        usuario.setAttribute('style', 'border-color: green')
        validUsuario = true
    }
    })

    senha.addEventListener('keyup', () => {
    if(senha.value.length <= 5){
        labelSenha.setAttribute('style', 'color: red')
        labelSenha.innerHTML = 'Senha *Insira no minimo 6 caracteres'
        senha.setAttribute('style', 'border-color: red')
        validSenha = false
    } else {
        labelSenha.setAttribute('style', 'color: green')
        labelSenha.innerHTML = 'Senha'
        senha.setAttribute('style', 'border-color: green')
        validSenha = true
    }
    })

    confirmSenha.addEventListener('keyup', () => {
    if(senha.value != confirmSenha.value){
        labelConfirmSenha.setAttribute('style', 'color: red')
        labelConfirmSenha.innerHTML = 'Confirmar Senha *As senhas não conferem'
        confirmSenha.setAttribute('style', 'border-color: red')
        validConfirmSenha = false
    } else {
        labelConfirmSenha.setAttribute('style', 'color: green')
        labelConfirmSenha.innerHTML = 'Confirmar Senha'
        confirmSenha.setAttribute('style', 'border-color: green')
        validConfirmSenha = true
    }
    })

    function cadastrar(){
    if(validNome && validUsuario && validSenha && validConfirmSenha){
        let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]')
        
        listaUser.push(
        {
        nomeCad: nome.value,
        userCad: usuario.value,
        senhaCad: senha.value
        }
        )
        
        localStorage.setItem('listaUser', JSON.stringify(listaUser))
        
    
        msgSuccess.setAttribute('style', 'display: block')
        msgSuccess.innerHTML = '<strong>Cadastrando usuário...</strong>'
        msgError.setAttribute('style', 'display: none')
        msgError.innerHTML = ''
        
        setTimeout(()=>{
            window.location.href = './index.html'
        }, 3000)
    
        
    } else {
        msgError.setAttribute('style', 'display: block')
        msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>'
        msgSuccess.innerHTML = ''
        msgSuccess.setAttribute('style', 'display: none')
    }
    }

    btn.addEventListener('click', ()=>{
    let inputSenha = document.querySelector('#senha')
    
    if(inputSenha.getAttribute('type') == 'password'){
        inputSenha.setAttribute('type', 'text')
    } else {
        inputSenha.setAttribute('type', 'password')
    }
    })

    btnConfirm.addEventListener('click', ()=>{
    let inputConfirmSenha = document.querySelector('#confirmSenha')
    
    if(inputConfirmSenha.getAttribute('type') == 'password'){
        inputConfirmSenha.setAttribute('type', 'text')
    } else {
        inputConfirmSenha.setAttribute('type', 'password')
    }
    })

