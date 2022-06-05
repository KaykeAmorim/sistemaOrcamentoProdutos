const btnAddSessao = document.getElementById('btnAddSessao')
const btnImprimir = document.getElementById('btnImprimir')
const sessoes = document.getElementById('sessoes')
const totalHTML = document.getElementById('total')
let i = 0;
btnAddSessao.addEventListener('click', addSessao);
btnImprimir.addEventListener('click', imprimir)

function addSessao(){
    var sessao = document.createElement('div')
    
    var titulo = document.createElement('h3')
    titulo.setAttribute('contentEditable',"true")
    titulo.setAttribute('class','mt-5')
    titulo.innerHTML = "Título"
    sessao.appendChild(titulo)

    var cabecalho = getCabecalho()
    sessao.appendChild(cabecalho)
    var hr = document.createElement('hr')
    sessao.appendChild(hr)

    var itens = document.createElement('div')
    itens.setAttribute('id','itens')
    sessao.appendChild(itens)

    var btnAddItem = document.createElement('button')
    btnAddItem.setAttribute('class','btn btn-success d-print-none')
    btnAddItem.innerHTML = "Adicionar item"
    btnAddItem.addEventListener('click', addItem)
    sessao.appendChild(btnAddItem)

    sessoes.appendChild(sessao)
}

function getCabecalho(){
    var element = document.createElement('div')
    element.setAttribute('class','row mt-3')

    var quantidade = document.createElement('h5')
    quantidade.setAttribute('class','col-sm-4')
    quantidade.innerHTML = "Qtd"

    var item = document.createElement('h5')
    item.setAttribute('class','col-sm-4')
    item.innerHTML = "Item"

    var preco = document.createElement('h5')
    preco.setAttribute('class','col-sm-4')
    preco.innerHTML = "Preço"

    var hr = document.createElement('hr')

    element.appendChild(quantidade)
    element.appendChild(item)
    element.appendChild(preco)
    element.appendChild(hr)

    return element

}

function addItem(){
    var sessao = this.parentElement
    var itens = sessao.children[3]
    var item = getItem();
    item.children[0].addEventListener('blur',calcularTotal)
    item.children[2].addEventListener('blur',calcularTotal)
    itens.appendChild(item)
}

function getItem(){
    var element = document.createElement('div')
    element.setAttribute('class','row mt-3')

    var quantidade = document.createElement('h5')
    quantidade.setAttribute('class','col-sm-4')
    quantidade.setAttribute('contentEditable','true')
    quantidade.innerHTML = "0"

    var item = document.createElement('h5')
    item.setAttribute('class','col-sm-4')
    item.setAttribute('contentEditable','true')
    item.innerHTML = "Item"

    var preco = document.createElement('h5')
    preco.setAttribute('class','col-sm-4')
    preco.setAttribute('contentEditable','true')
    preco.innerHTML = "R$ 00,00"

    element.appendChild(quantidade)
    element.appendChild(item)
    element.appendChild(preco)

    return element

}

function calcularTotal(){
    let total = 0;
    for(var i = 0; i <sessoes.childElementCount; i++){
        total += calcularTotalSessao(sessoes.children[i])
    }
    totalHTML.innerHTML = `R$ ${(total.toFixed(2)).toString().replace('.',',')}`
}

function calcularTotalSessao(sessao){
    var valor = new String()
    var qtd = new String()
    var total = 0;
    for(var i = 0; i < sessao.children[3].childElementCount; i++ ){
        valor = (sessao.children[3].children[i].children[2].innerHTML)
        if(valor.indexOf('R$') != -1){
            valor = valor.slice(3)
        }
        valor = Number(valor.replace(',','.'))
        qtd = Number(sessao.children[3].children[i].children[0].innerText)
        total+= qtd * valor
    }
    return total;
}

function imprimir(){
    window.print()
}