
<?php
//inicia ou recupera uma sessao
session_start();

//destroi a sessao
session_destroy();

//apagar o cookie salvo no navegador
setcookie(session_name(), '', 0, '/');

header('Location: index.php');

?>
