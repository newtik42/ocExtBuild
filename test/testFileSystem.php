<?php
include_once './../vendor/autoload.php';
include_once './config.php';


$fs = new NewTik\ExtBuild\FileSystem();


$fs->AddFiles(DIR_EXTBUILD_TEMPLETE . 'oc_ext/3x/');


