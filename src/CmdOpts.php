<?php

namespace NewTik\ExtBuild;

class CmdOpts {
    
    private $options = [];
    private $optionsDefault = [];
    
    /**
     * 
     * @var string
     */
    public $comman = '';

    public function __construct($argv = [], $optionsDefault = []) {

        $this->optionsDefault = $optionsDefault;

        if (!empty($argv)) {
            $this->parser($argv);
        }
    }

    public function parser($argv = []) {

        if (empty($argv)) {
            $argv = $_SERVER['argv'];
        }

        $params = $argv;
        array_shift($params);

        if (count($params) > 0) {

            $this->comman = $params[0];

            $options = [];
            $isValue = false;
            $_key_pre = '';
            foreach ($params as $param) {

                $_key = $this->isArgKey($param);

                if (!$isValue && $_key !== false) {

                    $isValue = true;
                    $_key_pre = $_key;
                    $this->options[$_key_pre] = true;
                    $_value = $this->isArgValue($param);

                    if ($_value !== false) {
                        $isValue = false;
                        $this->options[$_key_pre] = $_value;
                    }

                    continue;
                }

                if ($isValue && $_key !== false) {

                    $options[$_key_pre] = true;
                    $_key_pre = $_key;
                    $this->options[$_key_pre] = true;

                    $_value = $this->isArgValue($param);
                    if ($_value !== false) {
                        $isValue = false;
                        $this->options[$_key_pre] = $_value;
                    }

                    continue;
                }

                if ($isValue) {
                    $this->options[$_key_pre] = $param;
                    $isValue = false;
                }
            }
        }
        return $this->options;
    }

    public function __get($name) {
        return $this->options[$name] ?? ($this->optionsDefault[$name] ?? null);
    }

    private function isArgKey($param) {

        if (substr($param, 0, 2) == "--") {
            $_key = substr($param, 2);
        } elseif (substr($param, 0, 1) == "-") {
            $_key = substr($param, 1);
        } else {
            return false;
        }

        list($_key, ) = explode(":", $_key, 2);

        return $_key;
    }

    private function isArgValue($param) {

        $kv = explode(":", $param, 2);

        if (count($kv) == 2) {
            return $kv[1];
        }

        return false;
    }
}
