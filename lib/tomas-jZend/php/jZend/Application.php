<?php


class jZend_Application {
	
	private $_controller;
	protected $loader;
	
	public function __construct($controller) {
		$this->_controller = $controller;
	}
	
	public function bootstrap() {
		$this->bootstrap = new jZend_Bootstrap($this);
		$this->loader = new jZend_Loader($this->getView());
		return $this;
	}
	
	private function _loadInitialJavascripts() {
		$data = array_merge(
			$this->_getRequestParams(), 
			array(
				'module' => ucwords($this->_getModuleName()),
				'controller' => ucwords($this->_getControllerName()),
				'action' => $this->_getActionName(),
			)
		);
		$this->getView()->jQuery()->clearJavascript();
		$this->getView()->jQuery()->addJavascript('var params = ' . Zend_Json::encode($data) . ';');
	}
	
	public function run() {
		$this->_loadInitialJavascripts();
		$this->_loadLibraries();
		$this->_loadBootstrap();
		$this->_loadModule();
		$this->_loadController();
	}
	
	private function _loadModule() {
		$basename = ucwords($this->_getModuleName()) . '.js';
		$dirname = '/js/modules/';
		$this->loader->loadScript(PUBLIC_PATH . $dirname . $basename);
	}
	
	private function _loadController() {
		$basename = ucwords($this->_getControllerName()) . 'Controller.js';
		$dirname = '/js/modules/' . $this->_getModuleName() . '/';
		$this->loader->loadScript(PUBLIC_PATH . $dirname . $basename);	
	}
	
	private function _loadBootstrap() {
		$basename = 'Bootstrap.js';
		$dirname = '/js/';
		$this->loader->loadScript(PUBLIC_PATH . $dirname . $basename);	
	}
	
	private function _loadLibraries() {
		$this->loader->loadLibrary('jZend');
	}
	
	public function loadLibrary($name) {
		$this->loader->loadLibrary($name);
	}
	
	protected function getView() {
		return $this->_controller->view;
	}
	
	private function _getModuleName() {
		return $this->_controller->getRequest()->getModuleName();
	}
	
	private function _getControllerName() {
		return $this->_controller->getRequest()->getControllerName();
	}
	
	private function _getActionName() {
		return $this->_controller->getRequest()->getActionName();
	}
	
	private function _getRequestParams() {
		return $this->_controller->getRequest()->getParams();
	}
	
}