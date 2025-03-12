<?php

$global_config = array_merge($global_config, parse_ini_file(DIR_GLOBAL . "opencart_module.ini", true));

$textConfig .= file_get_contents(DIR_EXTBUILD_TEMPLETE . 'config/opencart_module.ini');

$textConfig .= PHP_EOL.PHP_EOL;

$textConfig .= file_get_contents(DIR_EXTBUILD_TEMPLETE . 'config/pacs.ini');


$path = "extension/";

$versions = explode("-", $cmdOptions->v ?? '3x-22-21-15');

$typeExt = $cmdOptions->tExt ?? 'module';


$uses = [];
$traits = [];
$plugins = [];
$files = [];

if($typeExt == "sync"){
        
    $path .= "module/";
    
    $plugins[] = 'ExtraCode';
    
    $files = [];
    
}

$strctyre = $cmdOptions->str ?? 'a-cmlv|c-cmlv';

if(!empty($strctyre)){
    
    $_apps = explode("|", $strctyre);
    
    foreach ($_apps as $_app) {
        
        list($type_app, $mvc) = explode("-", $_app);
        
        if($type_app == "c"){
            $type_app = "catalog";
        }else{
            $type_app = "admin";
        }
        
        foreach ($mvc as $t) {
            echo '<pre>';
            var_dump($t);
            echo '</pre>';
        }
        
    }
    
}

foreach ($versions as $version) {
    $derPac = DIR_PROJECT . "src/" . $version;
    mkdirA1("src/" . $version);
    copy(DIR_EXTBUILD_TEMPLETE.'config/pac.ini', $derPac . '/pac.ini');
    
    
    
}


