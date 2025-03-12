<?php
include_once './../vendor/autoload.php';
$argv = explode(" ", "extBuild -qs -oc_mod -v:3 -sync");

$cmd = new NewTik\ExtBuild\CmdOpts($argv);

echo '<pre>';
var_dump($cmd->v);
echo '</pre>';