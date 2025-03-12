<?php
//include_once './../vendor/autoload.php';
include_once './../autoloader.php';

include_once "./../bin/function.php";
//$argv[] = '-t';
//$argv[] = 'dfgfdgfdg';
//
//$argv[] = '-d:12';
//$argv[] = '-v:3';
//$argv[] = '--test';
//
//$argv[] = '-t';
//$argv[] = 'dfgfdgfdg';

$argv = explode(" ", "extBuild -qs -oc_mod -v:3 -sync");
echo '<pre>';
var_dump($argv);
echo '</pre>';
echo '<pre>';
var_dump(CmdOpt($argv));
echo '</pre>';

die;


$cmd = new NewTik\ExtBuild\CommandLine(
<<<'XX'

FTP deployment v3.4
-------------------
Usage:
	deployment <config_file> [-t | --test]

Options:
	-t | --test       Run in test-mode.
	--section <name>  Only deploys the named section.
	--generate        Only generates deployment file.
	--no-progress     Hide the progress indicators.
    -v                Hide the progress indicators.

XX,
['config' => [NewTik\ExtBuild\CommandLine::REALPATH => true],]
);


$_SERVER['argv'] = [
    'deployment',
    __FILE__,
    '-v',
];

$options = $cmd->parse();
echo '<pre>';
var_dump($options);
echo '</pre>';