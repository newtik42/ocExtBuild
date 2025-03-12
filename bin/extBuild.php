#!/usr/bin/env php
<?php

include_once __dir__ . '/../vendor/autoload.php';
include_once __dir__ . '/../autoloader.php';
include_once __dir__ . '/config.php';

include_once __dir__ . '/function.php';

//if(file_exists(DIR_GLOBAL)){
//    mkdir(DIR_GLOBAL, 0777);
//    mkdir(DIR_GLOBAL . 'config/');
//}


$dirProject = realpath('./');

define("DIR_PROJECT", $dirProject . "/");

$params = $argv;
$cmdOptions = new NewTik\ExtBuild\CmdOpts($argv);


$ideTools = new NewTik\IDETools\IDETools(null,$dirProject);

$data = $ideTools->getProjectSetting();

if($cmdOptions->qs){
    include_once __dir__ . '/quickstart.php';
}elseif($cmdOptions->h){
echo <<<XX
extBuild -qs oc_mod -v 3 sync
XX.PHP_EOL;
}






