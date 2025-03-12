<?php

namespace NewTik\ExtBuild;

class FileSystem {
    
    public function searchFiles($dir, $ext = [], $content = '', $ignores = []) {
        
        
        
    }
    
    public static function matchMask(string $path, array $patterns, bool $isDir = false): bool
	{
		$res = false;
		$path = explode('/', ltrim($path, '/'));
		foreach ($patterns as $pattern) {
			$pattern = strtr($pattern, '\\', '/');
			if ($neg = substr($pattern, 0, 1) === '!') {
				$pattern = substr($pattern, 1);
			}

			if (strpos($pattern, '/') === false) { // no slash means base name
				if (fnmatch($pattern, end($path), FNM_CASEFOLD)) {
					$res = !$neg;
				}
				continue;

			} elseif (substr($pattern, -1) === '/') { // trailing slash means directory
				$pattern = trim($pattern, '/');
				if (!$isDir && count($path) <= count(explode('/', $pattern))) {
					continue;
				}
			}

			$parts = explode('/', ltrim($pattern, '/'));
			if (fnmatch(
				implode('/', $neg && $isDir ? array_slice($parts, 0, count($path)) : $parts),
				implode('/', array_slice($path, 0, count($parts))),
				FNM_CASEFOLD | FNM_PATHNAME
			)) {
				$res = !$neg;
			}
		}
		return $res;
	}
    
    public function AddFile($file) {

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

    public function AddFiles($dir = '') {

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
    
}
