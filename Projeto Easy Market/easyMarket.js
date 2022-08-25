//metodo para checar se o usuario e senha estão corretos
function validate_password() {
	var username = document.getElementById("username").value;
	var passw = document.getElementById("passw").value;

	for (var i = 0; i < employees.length; i++) {
		let auxi = employees[i];

		if (auxi["username"] == username) {
			if (auxi["passw"] == passw) {

				alert("Seja bem-vindo " + auxi["name"])
				window.location.href = "redirect.html"
				return

			} else {

				alert("errou a senha")
				
				return 
			}
		}
	}
	alert("nao existe esse usuario com essa matricula")
	return	
}
//metodo para checar se o produto requisitado existe e calcular o preço
var final_price_end = 0;
var y = 1;
function buy_product() {
	var code = document.getElementById("code").value;
    var amount = document.getElementById("amount").value;

    for (var i = 0; i < products.length; i++) {
		let auxi = products[i];

		if (auxi["id"] == code) {
            if(amount != 0) {
				if(amount % 1 == 0){
				let final_price_product = auxi["price"] * amount;
				final_price_end += final_price_product;

				document.getElementById("final_value").innerHTML ="Preço final: R$ "+ final_price_end.toFixed(2);

				add_car(auxi, amount, final_price_product, y);
				y++
				
				return
				}else{
					alert("Digite uma quantidade valida");
					return
				}
			}else{
				alert("Digite uma quantidade a ser adicionada");
				return 
			}
		}     
	}
    alert("nao existe esse produto")
    return
}
//essa função serve para adicionar o que foi pedido na tabela
function add_car(auxi, amount, final_price_product, x) {
    let table_product = document.getElementById("table_cart");
    new_line_cart ="<tr><td>"+auxi["id"]+"</td><td>"+auxi["name"]+"</td><td>"+amount+"</td><td>"+auxi["price"]+"</td><td>"+final_price_product+"</td> <td><button id='button_delete_product_in_cart"+x+"' value='"+x+"' onclick='delete_product_cart(event.target, this)' style='background-color: #733c27; color: white; width: 20px; border: solid 1px #733c27; margin-left: 10px;'>X</button></td></tr>";
    table_product.innerHTML = table_product.innerHTML + new_line_cart;
    
}
//função para apagar algum produto do carrinho
function delete_product_cart(e, x){
	let auxi = 0;
	let line = x.parentNode.parentNode.children;
	auxi = line[4].textContent;

	final_price_end = final_price_end - auxi;

	let auxi1 = document.getElementById("final_value");
	auxi1.innerHTML = "Preço final: R$ "+ final_price_end.toFixed(2);
	
	e.closest("tr").remove();
}
//Funções que redirecionam o usuario para outras telas
function cart_redirect(){
	window.location.href = "carrinho.html";
}
function add_redirect(){
	window.location.href = "adicionarProduto.html";
}
function edit_redirect(){
	window.location.href = "editarProduto.html";
}function remove_redirect(){
	window.location.href = "removerProduto.html";
}
function back_to_redirect(){
	window.location.href = "redirect.html"
}
function back_login(){
	window.location.href = "telaLogin.html"
}
function tel(){
	window.location.href ="https://api.whatsapp.com/send?phone=558499452249"
}
function apresent(){
	window.location.href = "index.html"
}
function finish(){
	let auxi = confirm("Deseja realmente finalizar a venda?")
	if(auxi){
		window.location.href ="carrinho.html"
	}
	else{
		alert("Sua venda não foi finalizada!")
	}
}
//---------------------------------------------------
//adiciona produtos ao banco de dados

function add_product(){
	let name_product = document.getElementById("product_name").value;
	let price_product = document.getElementById("product_price").value;
	let brand_product = document.getElementById("product_brand").value;

	if(name_product.length>1 && price_product.length>1 && brand_product.length>1){
		var products_add= {name: name_product, brand: brand_product, price: price_product};
		let auxi = confirm("Deseja adicionar este produto??")
		if(auxi){
			products.push(products_add);
			console.log(products)
			alert("Produto adicionado com sucesso!!!")
		}else{
			alert("Produto não foi adicionado")
			console.log(products)
		}
	}else{
		alert("Preencha todos os campos para adicionar um produto")
	}

}
//atualiza a tabela com os produtos que poderão ser editados
var new_line = [10];
function products_in_market(){
	let line = document.getElementById("table_edit_product");
	let j = 1;
	
	for(var i = 0; i <products.length; i++){
		let name = products[i].name;
		let id = products[i].id;
		let price = products[i].price;
		let brand = products[i].brand;

		new_line[i] = "<tr id='edit_product"+j+"''><td>"+id+"</td>  <td>"+name+"</td> <td>"+brand+"</td> <td>"+price+" </td> <td><button style='background-color: #733c27; color: white; width: 20px; border: solid 1px #733c27; margin-left: 10px;' value='"+j+"' onclick='edit_product("+j+", this)'>X</button></td></tr>";

		line.innerHTML = line.innerHTML + new_line[i];
		j++;
	}
	
}
//coleta o numero da linha e a referencia do botão dela, usa isto pra modificar pra input os elementos
var auxi_id = "";
function edit_product(x, e){
	let auxi = confirm("Deseja editar este produto")
	
	if(auxi){
		let linha = e.parentNode.parentNode.children;

		let id = linha[0].textContent;
		let prod = linha[1].textContent;
		let brand = linha[2].textContent;
		let price = linha[3].textContent;
		auxi_id = id;

		let line = document.getElementById("edit_product"+x);

		line.innerHTML = "<tr id='edit_product"+x+"'><td>"+id+"</td> <td>	<input id='product_name"+x+"' class='caixa_edicao'type='text' value='"+prod+"'></td> <td>	<input id='product_brand"+x+"' class='caixa_edicao'type='text' value='"+brand+"'></td> <td>	<input id='product_price"+x+"' class='caixa_edicao'type='text' value='"+price+"'></td> <td><button onclick='re_edit_product("+x+")' style='background-color: #733c27; color: white; width: 20px; border: solid 1px #733c27; margin-left: 10px;'>V</button></td></tr>"
	}
	

}
//serve para salvar as mudanças feitas pela função edit_product
function re_edit_product(x){
	let prod = document.getElementById('product_name'+x).value;
	let brand = document.getElementById('product_brand'+x).value;
	let price = document.getElementById('product_price'+x).value;
	
	let all_content = document.getElementById('edit_product'+x);

	all_content.innerHTML = "<tr><td>"+auxi_id+"</td> <td>"+prod+"</td> <td>"+brand+"</td> <td>"+price+"</td> <td><button onclick='edit_product("+x+", this)' style='background-color: #733c27; color: white; width: 20px; border: solid 1px #733c27; margin-left: 10px;'>X</button></td></tr>";

	for (var i = 0; i < products.length; i++) {
		let auxi = products[i];
		if (auxi["id"] == auxi_id) {
			products[i].name = prod;
			products[i].brand = brand;
			products[i].price = price;
		}
	}

	console.log(products)

}
//carrega a lista de produtos a serem removidos
function products_remove(){
	let line = document.getElementById("table_cart");
	let j = 1;
	for(var i = 0; i <products.length; i++){
		let name = products[i].name;
		let id = products[i].id;
		let price = products[i].price;
		let brand = products[i].brand;

		new_line[i] = "<tr id='edit_product"+j+"''><td>"+id+"</td>  <td>"+name+"</td> <td>"+brand+"</td> <td>"+price+" </td> <td><button value='"+j+"' onclick='remove(event.target, this)' style='background-color: #733c27; color: white; width: 20px; border: solid 1px #733c27; margin-left: 10px;' >X</button></td></tr>";

		line.innerHTML = line.innerHTML + new_line[i];
		j++;
	}
}
function remove(e, x){
	let auxi = confirm("Deseja realmente remover este produto do banco de dados?")
	if(auxi){
		e.closest("tr").remove();
	
		let linha = x.parentNode.parentNode.children;
		let id = linha[0].textContent;

		for(var i = 0; i<products.length; i++){
			let auxi = products[i];
			if(auxi["id"] == id){
				products.splice(i, 1)
			}
		}
	console.log(products)
	}else{
		alert("Produto não foi removido")
	}

}