const btnAddSessao = document.getElementById('btnAddSessao')
const btnImprimir = document.getElementById('btnImprimir')
const orcamento = document.getElementById('orcamento')
const cliente = document.getElementById('cliente')
const body = document.getElementById('body')
const sessoes = document.getElementById('sessoes')
const totalHTML = document.getElementById('total')
const nomeCliente = document.getElementById('nomeCliente')
const descricaoPedido = document.getElementById('descricaoPedido')
const descricao = document.getElementById('descricao')
const formE = document.forms.formE

descricaoPedido.value = descricao.value
descricaoPedido.addEventListener('blur', function(){
    descricao.value = this.value
})

let INDEX = 0;

let orcamentoJSON = new Array();

orcamentoJSON = JSON.parse(orcamento.value)
nomeCliente.innerHTML = cliente.value

for(var i = 0; i < orcamentoJSON.length; i++){
    addSessao(orcamentoJSON[i])
}

btnAddSessao.onclick = () => {addSessao('')}
btnImprimir.addEventListener('click', imprimir)
nomeCliente.addEventListener('blur',setName)

function addSessao(produto){
    if(produto == ''){
        produto = {sessao:'Título',itens: new Array()}
        orcamentoJSON.push({sessao:"Título", itens:new Array()})
    }
    var div = document.createElement('div')
    div.setAttribute('class','row')
    var sessao = document.createElement('div')
    sessao.setAttribute('class','col-sm-10')
    sessao.setAttribute('id',INDEX)
    INDEX++;
    
    var lixeira = document.createElement('a')
    lixeira.setAttribute('class','col-sm-2 btn btn-light w-75 mt-5 p-3 mx-auto d-print-none text-center')
    var imagem = new Image()
    imagem.src = '/imagens/lixeira.png'
    imagem.classList.add('w-75')
    lixeira.appendChild(imagem)
    lixeira.addEventListener('click',removeSessao)
    
    var titulo = document.createElement('h3')
    titulo.setAttribute('contentEditable',"true")
    titulo.setAttribute('class','mt-5')
    titulo.innerHTML = produto.sessao
    sessao.appendChild(titulo)

    var cabecalho = getCabecalho()
    sessao.appendChild(cabecalho)
    var hr = document.createElement('hr')
    sessao.appendChild(hr)

    var itens = document.createElement('div')
    itens.setAttribute('id','itens')
    sessao.appendChild(itens)

    addItem(sessao.children[0], produto.itens)
    var btnAddItem = document.createElement('button')
    btnAddItem.setAttribute('class','btn btn-success d-print-none')
    btnAddItem.innerHTML = "Adicionar item"
    btnAddItem.onclick = function(){addItem(this,[])}
    sessao.appendChild(btnAddItem)

    div.appendChild(sessao)
    div.appendChild(lixeira)
    sessoes.appendChild(div)
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

function addItem(element,obj){
    var sessao = element.parentElement
    var itens = sessao.children[3]

    if(!obj.length){
        obj.push({qtd:0,item:"item",preco:0.00})
        orcamentoJSON[sessao.id].itens.push({qtd:0, item:"item", preco:0.00})
    }

    for(var i = 0; i < obj.length; i++){
        var item = getItem(obj[i]);
        itens.appendChild(item)
    }
}

function getItem(obj){

    var element = document.createElement('div')
    element.setAttribute('class','row mt-3')

    
    var quantidade = document.createElement('h5')
    quantidade.setAttribute('class','col-sm-4')
    quantidade.setAttribute('contentEditable','true')
    quantidade.innerHTML = obj.qtd
    quantidade.addEventListener('blur', calcularTotal)

    var item = document.createElement('h5')
    item.setAttribute('class','col-sm-4')
    item.setAttribute('contentEditable','true')
    item.innerHTML = obj.item

    var preco = document.createElement('h5')
    preco.setAttribute('class','col-sm-4')
    preco.setAttribute('contentEditable','true')
    preco.innerHTML = `R$ ${(obj.preco.toFixed(2)).toString().replace('.',',')}`
    preco.addEventListener('blur', calcularTotal)

    element.appendChild(quantidade)
    element.appendChild(item)
    element.appendChild(preco)

    return element

}

function calcularTotal(){
    let total = 0;
    for(var i = 0; i <sessoes.childElementCount; i++){
        total += calcularTotalSessao(sessoes.children[i].children[0].children[3])
        orcamentoJSON[i].sessao = (sessoes.children[i].children[0].children[0].innerText)
    }
    totalHTML.innerHTML = `R$ ${(total.toFixed(2)).toString().replace('.',',')}`
    orcamento.value = JSON.stringify(orcamentoJSON)
    localStorage.setItem('docsLoad',JSON.stringify(orcamentoJSON))
}

function calcularTotalSessao(sessao){
    var valor = new String()
    var qtd = new String()
    var total = 0;
    for(var i = 0; i < sessao.childElementCount; i++ ){
        valor = (sessao.children[i].children[2].innerHTML)
        if(valor.indexOf('R$') != -1){
            valor = valor.slice(3)
        }
        valor = Number(valor.replace(',','.'))
        qtd = Number(sessao.children[i].children[0].innerText)
        total+= qtd * valor
        orcamentoJSON[sessao.parentElement.id].itens[i].qtd = qtd
        orcamentoJSON[sessao.parentElement.id].itens[i].item = sessao.children[i].children[1].innerText
        orcamentoJSON[sessao.parentElement.id].itens[i].preco = valor
    }
    return total;
}

function imprimir(){
    window.print();
    formE.submit();
}

function setName(){
    var cliente = document.getElementById('cliente')
    cliente.value = this.innerText
}

function removeSessao(){
    var parent = this.parentElement
    var index = this.parentElement.children[0].id
    orcamentoJSON.splice(index,1)
    localStorage.setItem('docsLoad',JSON.stringify(orcamentoJSON))
    orcamento.value = JSON.stringify(orcamentoJSON)
    parent.remove()
    location.reload()
}