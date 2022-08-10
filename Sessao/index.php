<?php
//nesse caso tentamos recuperar a sessao atualo para destruir
if ($_SERVER['REQUEST_METHOD'] === 'POST') {//verifica se o metodo é post

    $nome = $_POST['nome']; //pega o valor enviado e atribui na variavel através do metodo
    $senha = $_POST['senha']; //pega o valor enviado e atribui na variavel através do metodo

    if ($nome === 'ze' && $senha === '123') {
        //agora a sessao vai ser iniciada e loga o user
        session_start();

        $_SESSION['user'] = $nome;//guarda o valor de nome em user

        header('Location: home.php');//redireciona para home
    }
    
}


?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="estilo.css" />
    <title>Login</title>
    
</head>
<body>
    
    <h1>Login</h1>

    <form action="index.php" method="POST"> 
        <input type="text" name="nome" placeholder="Seu nome">
        <input type="password" name="senha" placeholder="Sua senha">
        <button>Enviar</button>
    </form>
</body>
</html>