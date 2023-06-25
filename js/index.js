const formInput = document.querySelector('#formInput');
const cepInput = document.querySelector('#cep');
const inputRua = document.querySelector('#rua');
const inputNumero = document.querySelector('#numero');
const inputComp = document.querySelector('#comp');
const inputBairro = document.querySelector('#bairro');
const inputCidade = document.querySelector('#cidade');
const inputEstado = document.querySelector('#estado');
const btnCad = document.querySelector('#btnCad');
const loadingPage = document.querySelector('#loadingPage');


//Validar CEP Valores
cepInput.addEventListener('keypress', (e) => {
    const onlyNumbers = /[0-9]/
    const key = String.fromCharCode(e.keyCode);//Transformar a tecla em dado numerico

    //Permitir somente numeros
    if (!onlyNumbers.test(key)) {
        e.preventDefault()
        return;
    }
});

//Pegar o evento de digitar
cepInput.addEventListener('keyup', (e) => {
    const cepValue = e.target.value

    //Checar se o input tem o valor correto
    if (cepValue.length === 8){
        searchAdress(cepValue);
    }
});

//Função para consumo de API de endereços
const searchAdress = async (cep) => {
    showLoading();
    cepInput.blur();

    const urlApi = `https:viacep.com.br/ws/${cep}/json`
    const response = await fetch(urlApi);
    const data = await response.json();

    inputRua.value = data.logradouro;
    inputBairro.value = data.bairro;
    inputCidade.value = data.localidade;
    inputEstado.value = data.uf;

    inputRua.removeAttribute('disabled');
    inputNumero.removeAttribute('disabled');
    inputComp.removeAttribute('disabled');
    inputCidade.removeAttribute('disabled');
    inputEstado.removeAttribute('disabled');
    inputBairro.removeAttribute('disabled');

    showLoading();
};

//Função para ocultar ou exibir tela de loader
const showLoading = () => {
    loadingPage.classList.toggle('hide');
}