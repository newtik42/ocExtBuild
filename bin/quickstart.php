#!/usr/bin/env php
<?php

mkdirA1("src");
mkdirA1("build");
mkdirA1("doc");
mkdirA1("test");
mkdirA1("temp");
mkdirA1("temp/cache");

$global_config = parse_ini_file(DIR_GLOBAL . "config.ini", true);
$global_config = array_merge($global_config, parse_ini_file(DIR_GLOBAL . "company.ini", true));

if(file_exists(DIR_PROJECT . 'extBuild.ini')){
    
}else{
    copy(DIR_EXTBUILD_TEMPLETE . 'config/config.ini', DIR_PROJECT . 'extBuild.ini');
}
copy(DIR_EXTBUILD_TEMPLETE . 'config/config.ini', DIR_PROJECT . 'extBuild.ini');
$textConfig = file_get_contents(DIR_PROJECT . 'extBuild.ini');


$textConfig = str_replace("__name__", $data['project_name'], $textConfig);
$textConfig = str_replace("__code__", $data['dir_name'], $textConfig);

$textConfig = str_replace("__author__", $global_config['company']['author'], $textConfig);
$textConfig = str_replace("__copyrigth__", $global_config['company']['COPYRIGTH'], $textConfig);
$textConfig = str_replace("__copyrigthshow__", $global_config['company']['COPYRIGTHSHOW'], $textConfig);
$textConfig = str_replace("__web_link__", $global_config['company']['web_link'], $textConfig);

$textConfig .= PHP_EOL.PHP_EOL;


if($cmdOptions->oc_ext || $cmdOptions->oc_mod){
    include_once __DIR__ . "/quickstart/oc_ext.php";
}

file_put_contents(DIR_PROJECT . 'extBuild.ini', $textConfig);







