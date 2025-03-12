<?php

include_once __dir__ . '/vendor/newtik/idetools/autoloader.php';

spl_autoload_register(function ($class_name) {
    
    $classs = explode('\\', $class_name);    
    if(current($classs) != 'NewTik') return;    
    array_shift($classs);    
    if(current($classs) != 'ExtBuild') return;    
    array_shift($classs);
    
    include_once __DIR__ . '/src/' . implode('/', $classs) . '.php';
    
});