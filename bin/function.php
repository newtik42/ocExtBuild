<?php

function mkdirA1($pathDir) {
    if (!file_exists(DIR_PROJECT . $pathDir)){
        try {
            mkdir(DIR_PROJECT . $pathDir);
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    } 
}

function AddFile($file) {

    if (empty($file))
        return;

    if (in_array($file, $this->ignores))
        return;

    $path_parts = pathinfo($file);

    if($path_parts['basename'] == "version"){
        return;
    }

    if (strlen($path_parts['dirname']) < strlen($this->dir_sourse))
        $path_parts['dirname'] .= '/';

    $path_parts['dirname'] = str_replace($this->dir_sourse, '', $path_parts['dirname']);

    $path_parts['fullfilename'] = $file;


    $this->files[md5($path_parts["fullfilename"])] = $path_parts;
}

function AddFiles($dir = '') {

    if (empty($dir) && !empty($this->dir_sourse))
        $dir = $this->dir_sourse . '*';

    $files = glob($dir);

    foreach ($files as $file) {

        if (is_dir($file)) {
            if (in_array($file, $this->ignores))
                continue;
            $this->AddFiles($file . '/*');
        } else
            $this->AddFile($file);
    }
}


