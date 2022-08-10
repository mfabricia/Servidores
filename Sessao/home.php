<?php
    session_start();
    //se nao tiver user definido
    if (isset($_SESSION['user'])) {
        //se tiver user e nao for ze
        if (!$_SESSION['user'] === 'ze') {
            //vai para login
            header('Location: index.php');
            exit;
        }
          //header('Location: index.php');
    }
    else {
        //vai para login
        header('Location: index.php');
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="estilo.css" />
    <title>Home</title>
    
</head>
<body>
    <h1>Bem vindo, você está logado!</h1>
    <a href="logout.php">Sair</a>
</body>
</html>