<?php


class jZend_Loader {
	
	private $_view;
	
	public function __construct($view) {
		$this->_view = $view;
	}
	
	public function loadLibrary($name) {
		$this->loadDirectory(PUBLIC_PATH . '/js/library/' . $name);
	}
	
	public function loadDirectory($directory) {
		$directory = Main_Filesystem_Directory::open($directory);
		foreach ($directory->getFiles(true) as $file) {
			$this->_view->headScript()->appendFile($file->public);
		}
	}
	
	public function loadScript($path) {
		if (file_exists($path)) {
			$file = Main_Filesystem_File::open($path);
			$this->_view->headScript()->appendFile($file->public);
		}
		
	}
	
}